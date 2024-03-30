import type { Format } from "$lib/formats";
import type { Converter } from "./converter";
import YAML from 'yaml';

export default class YamlConverter implements Converter {
    onProgress(_: number) {}

    async init() {}

    async convert(file: File, format: Format): Promise<string> {
        const text = await file.text();
        this.onProgress(0.5);

        let result = '';
        if (format.name === 'yaml') {
            result = YAML.stringify(JSON.parse(text));
        } else if (format.name === 'json') {
            result = JSON.stringify(YAML.parse(text));
        }
        this.onProgress(1);

        return URL.createObjectURL(new Blob(
            [result],
            { type: `${format.category}/${format.ext}` }
        ));
    }
}