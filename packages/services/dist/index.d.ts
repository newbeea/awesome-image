interface ImageOptions {
    width?: number;
    height?: number;
    blur?: number;
    quantity?: number;
    format?: string;
}
interface ImageUrlGenerator {
    (url: string, options: ImageOptions): string;
}

declare const imageUrlGeneratorFP: ImageUrlGenerator;

declare const imageUrlGeneratorFastly: ImageUrlGenerator;

declare const imageUrlGeneratorImagekit: ImageUrlGenerator;

declare const imageUrlGeneratorUpyun: ImageUrlGenerator;

export { imageUrlGeneratorFP, imageUrlGeneratorFastly, imageUrlGeneratorImagekit, imageUrlGeneratorUpyun };
