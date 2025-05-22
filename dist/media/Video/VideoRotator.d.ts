import React from 'react';
interface VideoRotatorProps {
    videos: Array<{
        webm: string;
        mp4: string;
        poster: string;
        duration?: number;
    }>;
    /** Controls if the very first video should be preloaded immediately. Defaults to true. */
    preloadFirstVideo?: boolean;
}
export declare const VideoRotator: React.FC<VideoRotatorProps>;
export {};
//# sourceMappingURL=VideoRotator.d.ts.map