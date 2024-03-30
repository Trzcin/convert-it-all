export interface Conversion {
    file: File;
    outputSize: number | undefined;
    error: string | undefined;
    progress: number;
}