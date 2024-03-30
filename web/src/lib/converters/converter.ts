import type { Conversion } from "$lib/conversion";
import type { Format, FormatCategory } from "$lib/formats";
import FFmpegConverter from "./ffmpegConverter";
import PandocConverter from "./pandocConverter";
import YamlConverter from "./yamlConverter";

export interface Converter {
    /** Callback fired on progress change. Parameter ranges from 0.0 to 1.0 */
    onProgress(progress: number): void;
    /** Initialize converter */
    init(): Promise<void>;
    convert(conv: Conversion, format: Format): Promise<void>;
}

export function getConverter(category: FormatCategory): Converter {
    if (category === 'image' || category === 'video' || category === 'audio') {
        return new FFmpegConverter();
    } else if (category === 'text') {
        return new PandocConverter();
    } else {
        return new YamlConverter();
    }
}