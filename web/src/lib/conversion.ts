export interface Conversion {
    file: File;
    outputSize: number | undefined;
    url: string | undefined;
    error: string | undefined;
    progress: number;
}