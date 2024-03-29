import Pandoc from "pandoc-wasm";
import type { Converter } from "./converter";
import { outputFormats, type Format } from "$lib/formats";

export default class PandocConverter implements Converter {
    private pandoc: Pandoc;
    constructor() {
        this.pandoc = new Pandoc();
    }

    onProgress(_: number) {}

    async init() {
        await this.pandoc.init();
    }

    async convert(file: File, format: Format): Promise<string> {
        const text = await file.text();
        const extension = file.name.split('.')[1];
        const inputFormat = outputFormats.find(f => f.ext === extension);
        const result = await this.pandoc.run({
            text,
            options: { from: inputFormat!.name, to: format.name }
        });

        return URL.createObjectURL(new Blob(
            [result],
            { type: `${format.category}/${format.ext}` }
        ));
    }
}