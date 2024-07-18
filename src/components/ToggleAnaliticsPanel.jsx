import React, { useEffect, useState } from 'react';
import '../pages/styles.css';
import Theses from '../pages/images/ThesesAnalyticsHome';
import IMG from '../pages/images/imgAnalytics';

const ToggleAnaliticsPanel = () => {
  const [isActive, setActive] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % Theses.inTheses.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleClass = (index) => {
    return index === activeIndex ? 'thesesHome2' : 'thesesHome';
  };

  const handleExternalClick = () => {
    setActiveIndex(0);
    setActive(true);
  };

  const handleInternalClick = () => {
    setActiveIndex(0);
    setActive(false);
  };

  return (
    <div className='InOnAnalytics'>
      <div className='btnAnalytics'>
        {' '}
        <button
          className={isActive ? 'prime-btn' : 'secondary-btn'}
          style={{ width: '25%', padding: '25px', border: 'none' }}
          onClick={handleExternalClick}
        >
          <span style={{ fontSize: '24px' }}>Внутренняя аналитика</span>
        </button>
        <button
          className={isActive ? 'secondary-btn' : 'prime-btn'}
          style={{
            width: '25%',
            padding: '25px',
            border: 'none',
          }}
          onClick={handleInternalClick}
        >
          <span style={{ fontSize: '24px' }}>Внешняя аналитика</span>
        </button>
      </div>

      <div className='blockInOnAnalytics '>
        <div
          className='vertical-line'
          style={{ height: `${(activeIndex + 1) * 20}%` }}
        ></div>
        <div style={{ width: '45%', alignItems: 'center', marginLeft: '11px' }}>
          {isActive
            ? Theses.inTheses.map((el, index) => (
                <div key={index} className={toggleClass(index)}>
                  <div>{el.img}</div>
                  <div>{el.txt}</div>
                </div>
              ))
            : Theses.onTheses.map((el, index) => (
                <div key={index} className={toggleClass(index)}>
                  <div>{el.img}</div>
                  <div>{el.txt}</div>
                </div>
              ))}
        </div>
        <div style={{ width: '55%' }}>
          {isActive
            ? IMG.imgInAnalytics[activeIndex]
            : IMG.imgOnAnalytics[activeIndex]}
        </div>
      </div>
    </div>
  );
};

export default ToggleAnaliticsPanel;
