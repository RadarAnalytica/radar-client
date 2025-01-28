import React, { useRef, useState, useEffect } from "react";

const VideoComponent = ({ heavyVideoSrc, lightVideoSrc, preview, style }) => {
    const videoRef = useRef(null);
    const [useHeavyVideo, setUseHeavyVideo] = useState(false);

    useEffect(() => {
        const heavyVideo = document.createElement("video");
        heavyVideo.src = heavyVideoSrc;

        heavyVideo.oncanplaythrough = () => {
            setUseHeavyVideo(true);
        };
    }, [heavyVideoSrc]);

    useEffect(() => {
        if (useHeavyVideo && videoRef.current) {
            const heavyVideo = document.createElement("video");
            heavyVideo.src = heavyVideoSrc;

            heavyVideo.onloadedmetadata = () => {
                const currentTime = videoRef.current.currentTime;
                videoRef.current.src = heavyVideoSrc;
                videoRef.current.currentTime = currentTime;
                videoRef.current.play();
            };
        }
    }, [useHeavyVideo, heavyVideoSrc]);

    return (
        <div>
            <video
                poster={preview}
                key={useHeavyVideo ? heavyVideoSrc : lightVideoSrc}
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
