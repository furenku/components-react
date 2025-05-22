import React from 'react';
interface VideoProps {
    videoSources: {
        webm: string;
        mp4: string;
    };
    poster: string;
    className?: string;
    onEnded?: () => void;
    /** Preload the video immediately if true, otherwise lazy load on intersection. Defaults to false. */
    preloadImmediately?: boolean;
}
export declare const Video: React.ForwardRefExoticComponent<VideoProps & React.RefAttributes<HTMLVideoElement>>;
export {};
//# sourceMappingURL=Video.d.ts.map