import Pandoc from "pandoc-wasm";
import type { Converter } from "./converter";
import { outputFormats, type Format } from "$lib/formats";
import type { Conversion } from "$lib/conversion";

export default class PandocConverter implements Converter {
    private pandoc: Pandoc;
    constructor() {
        this.pandoc = new Pandoc();
    }

    onProgress(_: number) {}

    async init() {
        await this.pandoc.init();
    }

    async convert(conv: Conversion, format: Format) {
        const file = conv.file;
        const text = await file.text();
        this.onProgress(0.5);
        const extension = file.name.split('.')[1];
        const inputFormat = outputFormats.find(f => f.ext === extension);
        const result = await this.pandoc.run({
            text,
            options: { from: inputFormat!.name, to: format.name }
        });
        this.onProgress(1);
        const blob = new Blob(
            [result],
            { type: `${format.category}/${format.ext}` }
        );
        conv.outputSize = blob.size;
        conv.url = URL.createObjectURL(blob)
        conv.data = blob;
    }
}