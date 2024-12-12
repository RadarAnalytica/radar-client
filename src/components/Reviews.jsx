import React, { useState } from "react";
import arrow from "../pages/images/accordStr2.png";

const reviewsIP = [
  { videoSrc: "https://play.boomstream.com/gKgcdLiT?color=transparent&title=0" },
  { videoSrc: "https://play.boomstream.com/MRKkbSYL?color=transparent&title=0" },
  { videoSrc: "https://play.boomstream.com/6pVJWEgn?color=transparent&title=0" },
  { videoSrc: "https://play.boomstream.com/wDxNUSog?color=transparent&title=0" },
  { videoSrc: "https://play.boomstream.com/YdvSIQ0U?color=transparent&title=0" },
];

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const scrollLeft = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? reviewsIP.length - 1 : prevIndex - 1
    );
  };

  const scrollRight = () => {
    setActiveIndex((prevIndex) =>
      (prevIndex + 1) % reviewsIP.length

    );


  };

  return (
    <>
      <div className="scroll-wrapper container">
        <div
          className="scroll-container container"
          style={{
            transform: `translateX(-${(activeIndex + 4) * 255}px)`,
          }}
        >
          {[...reviewsIP, ...reviewsIP, ...reviewsIP].map((el, index) => {
            const isActive = index % reviewsIP.length === activeIndex;
            return (
              <div
                key={index}
                className={`blockReviewsVideos ${isActive ? "active" : ""}`}
                style={{
                  opacity: isActive ? 1 : 0.5,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <div className="video-container">
                  <iframe
                    width="100%"
                    height="100%"
                    src={el.videoSrc}
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="controls">
        <img
          className="arrow arrow-left"
          onClick={scrollLeft}
          src={arrow}
          alt="arrow left"
        />

        <img
          className="arrow arrow-right"
          onClick={scrollRight}
          src={arrow}
          alt="arrow right"
        />
      </div>
    </>
  );
};

export default Reviews;