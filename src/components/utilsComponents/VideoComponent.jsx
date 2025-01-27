import React, { useRef, useState, useEffect } from "react";

const VideoComponent = ({ heavyVideoSrc, lightVideoSrc, preview, style }) => {
    const videoRef = useRef(null);
    const [useHeavyVideo, setUseHeavyVideo] = useState(false);

    useEffect(() => {
        // Preload the heavy video
        const heavyVideo = new Image();
        heavyVideo.src = heavyVideoSrc;

        heavyVideo.onload = () => {
            setUseHeavyVideo(true); // Switch to heavy video when preloaded
        };
    }, [heavyVideoSrc]);

    useEffect(() => {
        if (useHeavyVideo && videoRef.current) {

            const currentTime = videoRef.current.currentTime;
            videoRef.current.src = heavyVideoSrc; // Switch source
            videoRef.current.currentTime = currentTime; // Sync playback time
            videoRef.current.play(); // Resume playback
        }
    }, [useHeavyVideo, heavyVideoSrc]);

    return (
        <div>
            <video
                poster={preview}
                ref={videoRef}
                src={useHeavyVideo ? heavyVideoSrc : lightVideoSrc}
                style={style}
                autoPlay
                loop
                muted
                playsInline
            >
            </video>
        </div>
    );
};

export default VideoComponent;
