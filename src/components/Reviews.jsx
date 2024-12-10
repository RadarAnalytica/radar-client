import React, { useState, useRef, useCallback } from "react";
import defaultPhoto from "../pages/images/defaultPhotoUser.jpg";
import arrow from "../pages/images/accordStr2.png";
import Stars from "../pages/images/Stars";
import User1 from "../pages/images/User1.JPG";
import User2 from "../pages/images/User2.JPG";
import User3 from "../pages/images/User3.JPG";
import User4 from "../pages/images/User4.JPG";
import User5 from "../pages/images/User5.JPG";
const reviewsIP = [
  {
    video: (
      <iframe
        width="100%"
        height="100%"
        src="https://play.boomstream.com/P2UCApCi?size=auto"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title="Review Video 1"
      ></iframe>
    ),

  },
  {
    video: (
      <iframe
        width="100%"
        height="100%"
        src="https://play.boomstream.com/cx149c1B?size=cover"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title="Review Video 2"
      ></iframe>
    ),

  },
  {
    video: (
      <iframe
        width="100%"
        height="100%"
        src="https://play.boomstream.com/P2UCApCi?size=cover"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title="Review Video 1"
      ></iframe>
    ),
  },
  {
    video: (
      <iframe
        width="100%"
        height="100%"
        src="https://play.boomstream.com/P2UCApCi?size=cover"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title="Review Video 1"
      ></iframe>
    ),
  },
  {
    video: (
      <iframe
        width="100%"
        height="100%"
        src="https://play.boomstream.com/P2UCApCi?size=cover"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title="Review Video 1"
      ></iframe>
    ),
  },
  // Add more reviews with iframe if necessary...
];
const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Start with the 3rd div as active

  const scrollLeft = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + reviewsIP.length) % reviewsIP.length);
  }, []);

  const scrollRight = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % reviewsIP.length);
  }, []);

  // Calculate displayed items based on activeIndex
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
          >
            <div className="video-container">
              {el.video} {/* Render the iframe here */}
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
