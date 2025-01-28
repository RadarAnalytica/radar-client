import React, { useRef, useState, useEffect, useCallback } from "react";

const VideoComponent = ({
    heavyVideoSrc,
    lightVideoSrc,
    style,
    onError,
    onLoad,
    priority = "auto"
}) => {
    const videoRef = useRef(null);
    const [useHeavyVideo, setUseHeavyVideo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Handle video loading errors
    const handleError = useCallback((error) => {
        setError(error);
        setIsLoading(false);
        onError?.(error);
    }, [onError]);

    // Handle successful video loading
    const handleLoad = useCallback(() => {
        setIsLoading(false);
        onLoad?.();
    }, [onLoad]);

    useEffect(() => {
        if (!heavyVideoSrc) return;

        const preloadVideo = document.createElement('video');
        preloadVideo.src = heavyVideoSrc;

        const handlePreloadComplete = () => {
            setUseHeavyVideo(true);
        };

        const handlePreloadError = (error) => {
            console.warn('Failed to preload heavy video:', error);
            // Continue with light video on preload failure
        };

        preloadVideo.addEventListener('loadeddata', handlePreloadComplete);
        preloadVideo.addEventListener('error', handlePreloadError);

        // Clean up listeners
        return () => {
            preloadVideo.removeEventListener('loadeddata', handlePreloadComplete);
            preloadVideo.removeEventListener('error', handlePreloadError);
            preloadVideo.remove(); // Clean up the element
        };
    }, [heavyVideoSrc]);

    useEffect(() => {
        if (!videoRef.current) return;

        const video = videoRef.current;

        if (useHeavyVideo) {
            const currentTime = video.currentTime;

            video.src = heavyVideoSrc;

            // Only set currentTime if video was already playing
            if (!video.paused) {
                video.currentTime = currentTime;
            }

            // Apply loading priority
            if (priority !== 'auto') {
                video.preload = priority;
            }

            // Resume playback if video was playing
            if (!video.paused) {
                video.play().catch(handleError);
            }
        }
    }, [useHeavyVideo, heavyVideoSrc, priority, handleError]);

    // Add event listeners for video element
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.addEventListener('error', handleError);
        video.addEventListener('loadeddata', handleLoad);

        return () => {
            video.removeEventListener('error', handleError);
            video.removeEventListener('loadeddata', handleLoad);
        };
    }, [handleError, handleLoad]);

    if (error) {
        return <div>Failed to load video: {error.message}</div>;
    }

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            <video
                ref={videoRef}
                src={useHeavyVideo ? heavyVideoSrc : lightVideoSrc}
                style={{
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                    ...style
                }}
                autoPlay
                loop
                muted
                playsInline
                poster={lightVideoSrc} // Use light version as poster
            />
        </div>
    );
};

export default VideoComponent;