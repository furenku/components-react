export const pickImageSize = (img, bp) => {
    if (!img.sizes || !img.sizes[bp])
        return;
    return img.sizes[bp];
};
//# sourceMappingURL=utils.js.map