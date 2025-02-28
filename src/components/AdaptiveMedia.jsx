import React, { useState, useEffect, lazy, Suspense } from "react";
import LoaderPage from "../pages/LoaderPage";
import VideoComponent from "../components/utilsComponents/VideoComponent";

const AdaptiveMedia = ({ videoMp4, poster, heavyImageSrc, lightImageSrc, style, setIsLoading }) => {
    const [showVideo, setShowVideo] = useState(window.innerWidth > 1080);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setShowVideo(window.innerWidth > 1080);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return showVideo ? (
        <VideoComponent videoMp4={videoMp4} poster={poster} style={style} setIsVideoLoaded={setIsVideoLoaded} />
    ) : (
        <ImageComponent heavyImageSrc={heavyImageSrc} lightImageSrc={lightImageSrc} style={style} />
    );
};

export default AdaptiveMedia;
