import React, { useRef, useState, useEffect } from "react";

const VideoComponent = ({ heavyVideoSrc, lightVideoSrc, preview, style }) => {
    const videoRef = useRef(null);
    const [useHeavyVideo, setUseHeavyVideo] = useState(false);

    useEffect(() => {

        const preloadVideo = document.createElement("video");
        preloadVideo.src = heavyVideoSrc;
        preloadVideo.preload = "auto";

        preloadVideo.oncanplaythrough = () => {
            setUseHeavyVideo(true);
        };

        preloadVideo.load();
    }, [heavyVideoSrc]);

    useEffect(() => {
        if (useHeavyVideo && videoRef.current) {
            const videoElement = videoRef.current;
            const currentTime = videoElement.currentTime;

            videoElement.pause();
            videoElement.src = heavyVideoSrc;
            videoElement.muted = true;
            videoElement.load();

            videoElement.onloadeddata = () => {
                videoElement.currentTime = currentTime;
                videoElement.play();
            };
        }
    }, [useHeavyVideo, heavyVideoSrc]);

    return (
        <div>
            <video
                poster={preview}
                ref={videoRef}
                src={lightVideoSrc}
                style={style}
                autoPlay
                loop
                muted
                playsInline
            />
        </div>
    );
};

export default VideoComponent;
