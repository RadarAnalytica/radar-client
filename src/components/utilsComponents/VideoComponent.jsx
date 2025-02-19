import React, { useRef, useEffect } from "react";

const VideoComponent = ({
    style,
    poster,
    videoMp4,
    videoWebm,
    className
}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // для попытки воспроизведения
        const attemptPlay = async () => {
            try {
                await video.play();
            } catch (err) {
                console.log('Автовоспроизведение не удалось, попробуем после взаимодействия');
            }
        };

        // воспроизвести при загрузке метаданных
        video.addEventListener('loadedmetadata', attemptPlay);

        // воспроизвести при скролле или клику/нажатию на страницу
        const playOnInteraction = () => {
            attemptPlay();
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('click', playOnInteraction);
        };

        document.addEventListener('touchstart', playOnInteraction);
        document.addEventListener('click', playOnInteraction);

        return () => {
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('click', playOnInteraction);
            video.removeEventListener('loadedmetadata', attemptPlay);
        };
    }, []);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                ...style,
                position: 'relative',
                overflow: 'hidden'
            }}
            className={className}
        >
            <video
                ref={videoRef}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                }}
                poster={poster}
                playsInline
                autoPlay
                muted
                loop
                preload="metadata"
                webkit-playsinline="true"
            >
                {videoMp4 && <source src={videoMp4} type="video/mp4" />}
                {videoWebm && <source src={videoWebm} type="video/webm" />}
            </video>
        </div>
    );
};

VideoComponent.defaultProps = {
    style: {},
    className: '',
    videoMp4: null,
    videoWebm: null,
    poster: null
};

export default VideoComponent;
