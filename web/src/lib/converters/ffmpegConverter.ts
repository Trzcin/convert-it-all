import { FFmpeg } from "@ffmpeg/ffmpeg";
import type { Converter } from "./converter";
import { toBlobURL } from "@ffmpeg/util";
import type { Format } from "$lib/formats";

export default class FFmpegConverter implements Converter {
    private ffmpeg: FFmpeg;
    constructor() {
        this.ffmpeg = new FFmpeg();
    }

    onProgress(_: number) {}

    async init() {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

        this.ffmpeg.on('progress', ({progress}) => {
            this.onProgress(progress);
        })
        
        await this.ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
        });
    }

    async convert(file: File, format: Format): Promise<string> {
        const fileData = await file.arrayBuffer();
        await this.ffmpeg.writeFile(file.name, new Uint8Array(fileData));
        const outputName = `${file.name.split('.')[0]}.${format.ext}`;
        await this.ffmpeg.exec(['-i', file.name, outputName]);
        const output = await this.ffmpeg.readFile(outputName);

        return URL.createObjectURL(new Blob(
            [output],
            { type: `${format.category}/${format.ext}` }
        ));
    }
}