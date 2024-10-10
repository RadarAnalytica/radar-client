import React, { useState, useEffect, useRef } from 'react';
import styles from './VennDiagram.module.css';

const VennDiagram = ({ groupACount, groupBCount, intersectionCount }) => {
  const [hoverArea, setHoverArea] = useState(null);
  const circleARef = useRef(null);
  const circleBRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const circleA = circleARef.current.getBoundingClientRect();
      const circleB = circleBRef.current.getBoundingClientRect();
      const { clientX, clientY } = event;

      const centerAX = circleA.left + circleA.width / 2;
      const centerAY = circleA.top + circleA.height / 2;
      const centerBX = circleB.left + circleB.width / 2;
      const centerBY = circleB.top + circleB.height / 2;
      const radiusA = circleA.width / 2;
      const radiusB = circleB.width / 2;

      const distanceA = Math.sqrt(
        (clientX - centerAX) ** 2 + (clientY - centerAY) ** 2
      );
      const distanceB = Math.sqrt(
        (clientX - centerBX) ** 2 + (clientY - centerBY) ** 2
      );
      const distanceBetweenCenters = Math.sqrt(
        (centerAX - centerBX) ** 2 + (centerAY - centerBY) ** 2
      );

      if (
        distanceA <= radiusA &&
        distanceB <= radiusB &&
        distanceA + distanceB <=
          distanceBetweenCenters + Math.min(radiusA, radiusB)
      ) {
        setHoverArea('Intersection');
      } else if (distanceA <= radiusA) {
        setHoverArea('A');
      } else if (distanceB <= radiusB) {
        setHoverArea('B');
      } else {
        setHoverArea(null);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.circleContainer}>
      <div ref={circleARef} className={`${styles.circle} ${styles.circleA}`}>
        <span className={styles.circleText}>Группа A</span>
      </div>
      <div ref={circleBRef} className={`${styles.circle} ${styles.circleB}`}>
        <span className={styles.circleText}>Группа B</span>
      </div>
      {hoverArea && (
        <div className={styles.keywordCount}>
          <span className={styles.keywordCountNumber}>
            {hoverArea === 'A' && groupACount}
            {hoverArea === 'B' && groupBCount}
            {hoverArea === 'Intersection' && intersectionCount}
          </span>
          <span className={styles.keywordCountText}>ключевых слов</span>
        </div>
      )}
    </div>
  );
};

export default VennDiagram;
