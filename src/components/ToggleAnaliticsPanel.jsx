import React, { useEffect, useState, useCallback, useMemo } from 'react';
import '../pages/styles.css';
import Theses from '../pages/images/ThesesAnalyticsHome';
import IMG from '../pages/images/imgAnalytics';
import lightImg from '../pages/images/mainDashboard.png';

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
    (index) => (index === activeIndex ? 'thesesHome2' : 'thesesHome'),
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
        <div>{el.img}</div>
        <div>{el.txt}</div>
      </div>
    ));
  }, [isActive, toggleClass]);

  const renderImage = useMemo(() => {
    if (!isImagesLoaded) {
      return (
        <img
          style={{ width: '96%', marginLeft: '2%', marginTop: '1%' }}
          src={lightImg}
          alt=""
        />
      );
    }
    return isActive
      ? IMG.imgInAnalytics[activeIndex]
      : IMG.imgOnAnalytics[activeIndex];
  }, [isActive, isImagesLoaded, activeIndex]);

  return (
    <div className="InOnAnalytics">
      <div className="btnAnalytics">
        <button
          className={isActive ? 'prime-btn' : 'secondary-btn'}
          style={{ width: '25%', padding: '25px', border: 'none' }}
          onClick={handleExternalClick}
        >
          <span style={{ fontSize: '24px' }}>Внутренняя аналитика</span>
        </button>
        <button
          className={isActive ? 'secondary-btn' : 'prime-btn'}
          style={{ width: '25%', padding: '25px', border: 'none' }}
          onClick={handleInternalClick}
        >
          <span style={{ fontSize: '24px' }}>Внешняя аналитика</span>
        </button>
      </div>

      <div className="blockInOnAnalytics">
        <div
          className="vertical-line"
          style={{ height: `${(activeIndex + 1) * 20}%` }}
        ></div>
        <div style={{ width: '45%', alignItems: 'center', marginLeft: '11px' }}>
          {renderTheses}
        </div>
        <div style={{ width: '55%' }}>{renderImage}</div>
      </div>
    </div>
  );
};

export default ToggleAnalyticsPanel;
