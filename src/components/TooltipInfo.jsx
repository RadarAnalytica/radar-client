import React, { useState, useRef, useEffect } from "react";

const TooltipInfo = ({ text, style = {} }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    left: "100%",
    right: "auto",
    top: "100%",
  });
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      // Reset position first to ensure correct calculation
      setTooltipPosition({ left: "100%", right: "auto", top: "100%" });

      setTimeout(() => {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        if (tooltipRect.right > windowWidth) {
          // If the tooltip exceeds the right boundary, shift it to the left
          setTooltipPosition({ left: "auto", right: "0", top: "100%" });
        } else {
          // Otherwise, keep it on the right
          setTooltipPosition({ left: "100%", right: "auto", top: "100%" });
        }
      }, 0);
    }
  }, [isVisible]);

  return (
    <div
      className='tooltip-container'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className='info-icon'>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect
            x='0.75'
            y='0.75'
            width='18.5'
            height='18.5'
            rx='9.25'
            stroke='black'
            strokeOpacity='0.1'
            strokeWidth='1.5'
          />
          <path
            d='M8.9 15V7.958H10.5V15H8.9ZM8.9 6.418V5.246H10.5V6.418H8.9Z'
            fill='#1A1A1A'
            fillOpacity='0.5'
          />
        </svg>
      </div>
      {isVisible && (
        <div
          className='tooltip-content'
          style={{ ...tooltipPosition, ...style }}
          ref={tooltipRef}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default TooltipInfo;
