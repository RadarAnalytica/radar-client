import React, { useRef, useState, useEffect } from "react";

const VideoComponent = ({ heavyVideoSrc, lightVideoSrc, preview, style }) => {
    const lightVideoRef = useRef(null);
    const heavyVideoRef = useRef(null);
    const [isHeavyLoaded, setIsHeavyLoaded] = useState(false);
    const [isInViewport, setIsInViewport] = useState(false);


    const playVideo = async (videoElement) => {
        if (!videoElement) return;

        try {
            videoElement.muted = true;
            videoElement.playsInline = true;
            videoElement.setAttribute('playsinline', '');
            videoElement.setAttribute('webkit-playsinline', '');

            videoElement.loop = true;

            if (isInViewport) {
                await videoElement.play();
            }
        } catch (error) {
            console.log("Autoplay failed:", error);
        }
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInViewport(entry.isIntersecting);
            });
        }, options);

        const lightVideo = lightVideoRef.current;
        const heavyVideo = heavyVideoRef.current;

        if (lightVideo) observer.observe(lightVideo);
        if (heavyVideo) observer.observe(heavyVideo);

        return () => {
            if (lightVideo) observer.unobserve(lightVideo);
            if (heavyVideo) observer.unobserve(heavyVideo);
        };
    }, []);


    useEffect(() => {
        const lightVideo = lightVideoRef.current;
        if (lightVideo && isInViewport) {
            playVideo(lightVideo);
        }
    }, [isInViewport]);

    useEffect(() => {
        const heavyVideo = heavyVideoRef.current;
        if (heavyVideo) {
            heavyVideo.preload = "auto";

            const handleCanPlayThrough = () => {
                setIsHeavyLoaded(true);
                if (isInViewport) {
                    playVideo(heavyVideo);
                }
            };

            heavyVideo.addEventListener("canplaythrough", handleCanPlayThrough);
            return () => {
                heavyVideo.removeEventListener("canplaythrough", handleCanPlayThrough);
            };
        }
    }, [heavyVideoSrc, isInViewport]);


    useEffect(() => {
        const lightVideo = lightVideoRef.current;
        const heavyVideo = heavyVideoRef.current;

        if (!isInViewport) {
            if (lightVideo) lightVideo.pause();
            if (heavyVideo) heavyVideo.pause();
        } else {
            if (!isHeavyLoaded && lightVideo) playVideo(lightVideo);
            if (isHeavyLoaded && heavyVideo) playVideo(heavyVideo);
        }
    }, [isInViewport, isHeavyLoaded]);

    return (
        <div style={{ width: "100%", height: "100%", ...style }}>
            <video
                ref={lightVideoRef}
                src={lightVideoSrc}
                poster={preview}
                style={{
                    width: "100%",
                    height: "100%",
                    display: isHeavyLoaded ? "none" : "block",
                    objectFit: "cover",
                }}
                muted
                playsInline
                preload="auto"
            />
            <video
                ref={heavyVideoRef}
                src={heavyVideoSrc}
                style={{
                    width: "100%",
                    height: "100%",
                    display: isHeavyLoaded ? "block" : "none",
                    objectFit: "cover",
                }}
                muted
                playsInline
                preload="auto"
            />
        </div>
    );
};

export default VideoComponent;