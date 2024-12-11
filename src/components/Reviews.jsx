import React, { useState, useCallback } from "react";
import arrow from "../pages/images/accordStr2.png";

const reviewsIP = [
  {
    videoSrc: "https://play.boomstream.com/gKgcdLiT?color=transparent&title=0",
  },
  {
    videoSrc: "https://play.boomstream.com/MRKkbSYL?color=transparent&title=0",
  },
  {
    videoSrc: "https://play.boomstream.com/6pVJWEgn?color=transparent&title=0",
  },
  {
    videoSrc: "https://play.boomstream.com/wDxNUSog?color=transparent&title=0",
  },
  {
    videoSrc: "https://play.boomstream.com/YdvSIQ0U?color=transparent&title=0",
  },
];

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const scrollLeft = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + reviewsIP.length) % reviewsIP.length);
  }, []);

  const scrollRight = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % reviewsIP.length);
  }, []);

  const getDisplayedItems = () => {
    const startIndex = activeIndex - 2;
    return reviewsIP.map((_, i) => {
      const index = (startIndex + i + reviewsIP.length) % reviewsIP.length;
      return reviewsIP[index];
    });
  };

  return (
    <>
      <div className="scroll-container">
        {getDisplayedItems().map((el, index) => (
          <div
            key={index}
            className={`blockReviewsVideos ${index === 2 ? "active" : ""}`}
            style={{
              pointerEvents: index === 2 ? "auto" : "none",
              opacity: index === 2 ? 1 : 0.5,
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
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", width: "100%" }}>
        <img className="arrowReviewsLeft" onClick={scrollLeft} src={arrow} alt="arrow" />
        <img className="arrowReviewsRight" onClick={scrollRight} src={arrow} alt="arrow" />
      </div>
    </>
  );
};

export default Reviews;
