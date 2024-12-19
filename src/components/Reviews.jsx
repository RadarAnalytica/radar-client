import React, { useState } from "react";
import arrow from "../pages/images/accordStr2.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const reviewsIP = [
  { videoSrc: "https://play.boomstream.com/gKgcdLiT?color=transparent&title=0" },
  { videoSrc: "https://play.boomstream.com/MRKkbSYL?color=transparent&title=0" },
  { videoSrc: "https://play.boomstream.com/6pVJWEgn?color=transparent&title=0" },
  { videoSrc: "https://play.boomstream.com/wDxNUSog?color=transparent&title=0" },
  { videoSrc: "https://play.boomstream.com/YdvSIQ0U?color=transparent&title=0" },
];


const Reviews = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    centerMode: true,
    slidesToScroll: 1,
    nextArrow: <ImageArrow type="next" />,
    prevArrow: <ImageArrow type="prev" />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
          swipe: true,
          centerMode: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          swipeToSlide: true,
          swipe: true,
          centerMode: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          swipe: true,
          centerMode: true,
          arrows: false,
        },
      },
    ],
    draggable: true,
    swipeToSlide: true
  };

  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          {reviewsIP.map((el, index) => (
            <div 
            key={index} 
            className="slider-item"
            >
               <div className="video-wrapper">
               <div className="drag-overlay"></div>
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
        </Slider>
      </div>
    </>
  );
};
function ImageArrow({ type, onClick }) {
  return (
    <img
      className={`arrow ${type === "next" ? "arrow-right" : "arrow-left"}`}
      onClick={onClick}
      src={arrow}
      alt={`arrow ${type}`}
    />
  );
}
export default Reviews;

