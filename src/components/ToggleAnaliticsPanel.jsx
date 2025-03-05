import React, { useEffect, useState, useCallback, useMemo } from "react";
import "../pages/styles.css";
import Theses from "../pages/images/ThesesAnalyticsHome";
import IMG from "../pages/images/imgAnalytics";
import lightImg from "../pages/images/mainDashboard.png";
import styles from "../components/ToggleAnalyticsPanel.module.css"

const ToggleAnalyticsPanel = () => {
  const [isActive, setActive] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  const preloadImages = useCallback(() => {
    const images = [
      ...IMG.imgInAnalytics.map((el) => el.props.src),
      ...IMG.imgOnAnalytics.map((el) => el.props.src),
    ];

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    setIsImagesLoaded(true);
  }, []);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  useEffect(() => {
    if (!isImagesLoaded) return;

    let animationFrameId;
    let lastTime = 0;
    const interval = 2000;

    const animate = (currentTime) => {
      if (currentTime - lastTime >= interval) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % Theses.inTheses.length);
        lastTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isImagesLoaded]);


  const toggleClass = useCallback(
    (index) =>
      `thesesHome ${styles.thesesHomeModule} ${index === activeIndex ? "thesesHome2" : ""}`,
    [activeIndex]
  );

  const handleExternalClick = useCallback(() => {
    setActiveIndex(0);
    setActive(true);
  }, []);

  const handleInternalClick = useCallback(() => {
    setActiveIndex(0);
    setActive(false);
  }, []);

  const renderTheses = useMemo(() => {
    const thesesList = isActive ? Theses.inTheses : Theses.onTheses;
    return thesesList.map((el, index) => (
      <div key={index} className={toggleClass(index)}>
        <div className={`thesesListImages ${styles.thesesListImages}`}>{el.img}</div>
        <div className={`thesesListText ${styles.thesesListText}`}>{el.txt}</div>
      </div>
    ));
  }, [isActive, toggleClass]);

  const renderImage = useMemo(() => {
    if (!isImagesLoaded) {
      return (
        <img
          className="blockInOnAnalyticsImage"
          src={lightImg}
          alt=''
        />
      );
    }
    return isActive
      ? IMG.imgInAnalytics[activeIndex]
      : IMG.imgOnAnalytics[activeIndex];
  }, [isActive, isImagesLoaded, activeIndex]);

  return (
    <div className='InOnAnalytics'>
      <div className={`btnAnalytics ${styles.btnAnalytics}`}>
        <button
          className={` ${styles.btnAnalysticsInternalExternal} btnAnalysticsInternalExternal ${isActive ? "prime-btn" : "secondary-btn"
            }`}
          onClick={handleExternalClick}
        >
          <span className={`secondary-btn-text internal-analytics-btn ${styles.internalAnalyticsBtn}`}>
            Внутренняя аналитика
          </span>
        </button>
        <button
          className={`${styles.btnAnalysticsInternalExternal} btnAnalysticsInternalExternal ${isActive ? "secondary-btn" : "prime-btn"
            }`}
          onClick={handleInternalClick}
        >
          <span className={`secondary-btn-text external-analytics-btn ${styles.externalAnalyticsBtn}`}>
            Внешняя аналитика
          </span>
        </button>
      </div>

      <div className={`blockInOnAnalytics ${styles.blockInOnAnalytics}`}>
        <div
          className={`vertical-line ${styles.verticalLine}`}
          style={{ "--activeIndex": activeIndex }}
        // style={{ height: `${(activeIndex + 1) * 20}%` }}
        ></div>
        <div
          className='blocks'
          style={{ alignItems: "center", marginLeft: "11px" }}
        >
          {renderTheses}
        </div>
        <div className={` ${styles.images} images`}>{renderImage}</div>
      </div>
    </div>
  );
};

export default ToggleAnalyticsPanel;
