import React, { useRef, useState, useEffect, useCallback } from "react";

const VideoComponent = ({
    heavyVideoSrc,
    lightVideoSrc,
    preview,
    style,
    onError,
    onLoad,
    priority = "auto"
}) => {
    const videoRef = useRef(null);
    const [useHeavyVideo, setUseHeavyVideo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Detect mobile browser
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Handle video loading errors with more detailed logging
    const handleError = useCallback((error) => {
        const errorDetails = {
            message: error?.message || 'Unknown video error',
            code: videoRef.current?.error?.code,
            details: videoRef.current?.error?.message,
            isMobile,
            browser: navigator.userAgent,
        };

        console.error('Video Error Details:', errorDetails);
        setError(errorDetails);
        setIsLoading(false);
        onError?.(errorDetails);
    }, [onError, isMobile]);

    // Handle successful video loading
    const handleLoad = useCallback(() => {
        setIsLoading(false);
        onLoad?.();
    }, [onLoad]);

    // Initialize video playback
    const initializeVideoPlayback = useCallback(async () => {
        const video = videoRef.current;
        if (!video) return;

        try {
            // Set video attributes specifically for mobile
            video.setAttribute('playsinline', 'true');
            video.setAttribute('webkit-playsinline', 'true');
            video.setAttribute('muted', 'true');

            // Ensure video is muted (especially important for Safari)
            video.muted = true;

            // Try to play the video
            await video.play();
            handleLoad();
        } catch (error) {
            console.warn('Playback initialization error:', error);
            handleError(error);

            // Fallback attempt for mobile
            if (isMobile) {
                try {
                    // Add click event listener to start playback on user interaction
                    const playOnTap = async () => {
                        try {
                            await video.play();
                            document.removeEventListener('touchstart', playOnTap);
                        } catch (err) {
                            handleError(err);
                        }
                    };
                    document.addEventListener('touchstart', playOnTap);
                } catch (fallbackError) {
                    handleError(fallbackError);
                }
            }
        }
    }, [handleLoad, handleError, isMobile]);

    useEffect(() => {
        if (!heavyVideoSrc) return;

        const preloadVideo = document.createElement('video');
        preloadVideo.src = heavyVideoSrc;

        // Add mobile-specific attributes to preload video
        if (isMobile) {
            preloadVideo.setAttribute('playsinline', 'true');
            preloadVideo.setAttribute('webkit-playsinline', 'true');
        }

        const handlePreloadComplete = () => {
            setUseHeavyVideo(true);
        };

        const handlePreloadError = (error) => {
            console.warn('Failed to preload heavy video:', error);
            // Continue with light video on preload failure
        };

        preloadVideo.addEventListener('loadeddata', handlePreloadComplete);
        preloadVideo.addEventListener('error', handlePreloadError);

        return () => {
            preloadVideo.removeEventListener('loadeddata', handlePreloadComplete);
            preloadVideo.removeEventListener('error', handlePreloadError);
            preloadVideo.remove();
        };
    }, [heavyVideoSrc, isMobile]);

    useEffect(() => {
        if (!videoRef.current) return;

        const video = videoRef.current;

        if (useHeavyVideo) {
            const wasPlaying = !video.paused;
            const currentTime = video.currentTime;

            video.src = heavyVideoSrc;

            if (wasPlaying) {
                video.currentTime = currentTime;
                video.play().catch(handleError);
            }

            if (priority !== 'auto') {
                video.preload = priority;
            }
        }
    }, [useHeavyVideo, heavyVideoSrc, priority, handleError]);

    // Initialize playback when component mounts
    useEffect(() => {
        initializeVideoPlayback();
    }, [initializeVideoPlayback]);
    // Add event listeners
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const events = {
            error: handleError,
            loadeddata: handleLoad,
            stalled: () => console.warn('Video stalled'),
            waiting: () => console.warn('Video buffering'),
            suspend: () => console.warn('Video suspended')
        };

        // Add all event listeners
        Object.entries(events).forEach(([event, handler]) => {
            video.addEventListener(event, handler);
        });

        return () => {
            // Remove all event listeners
            Object.entries(events).forEach(([event, handler]) => {
                video.removeEventListener(event, handler);
            });
        };
    }, [handleError, handleLoad]);

    return (
        <div>
            {isLoading && (
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    textAlign: 'center',
                    padding: '1rem'
                }}>
                    Loading video...
                </div>
            )}
            {error && (
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    textAlign: 'center',
                    padding: '1rem',
                    color: 'red'
                }}>
                    Error:{error.message}
                </div>
            )}
            <video
                ref={videoRef}
                src={useHeavyVideo ? heavyVideoSrc : lightVideoSrc}
                style={{
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    ...style
                }}
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline="true"
                poster={preview}
                preload="auto"
            />
        </div>
    );
};

export default VideoComponent;
