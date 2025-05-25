export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ImageSize = {
    src: string;
    width: number;
    height: number;
};
export type Dimensions = {
    width: number;
    height: number;
};
export interface Image extends Dimensions {
    name: string;
    src: string;
    alt: string;
    caption: string;
    sizes: {
        [key in Breakpoint]: ImageSize;
    };
    preview: string;
}
export interface ApiImage extends Image {
    id: number | string;
    created_at: string;
}
//# sourceMappingURL=media.d.ts.map