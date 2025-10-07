import React from 'react';
import styles from './IntersectingCircles.module.css';

const IntersectingCircles = ({ color1, color2, colorIntersection, textColorA,textColorB, strockA, strockB }) => {
  const radius = 100;
  const centerAX = 150;
  const centerAY = 150;
  const centerBX = 250;
  const centerBY = 250;

  // Calculate intersection
  const dx = centerBX - centerAX;
  const dy = centerBY - centerAY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const angle = Math.acos(distance / (2 * radius));
  const intersectionHeight = 2 * radius * Math.sin(angle);

  const midpointX = (centerAX + centerBX) / 2;
  const midpointY = (centerAY + centerBY) / 2;

  const intersectionX1 = midpointX - intersectionHeight * dy / (2 * distance);
  const intersectionY1 = midpointY + intersectionHeight * dx / (2 * distance);
  const intersectionX2 = midpointX + intersectionHeight * dy / (2 * distance);
  const intersectionY2 = midpointY - intersectionHeight * dx / (2 * distance);

  const path = `
    M ${intersectionX1} ${intersectionY1}
    A ${radius} ${radius} 0 0 1 ${intersectionX2} ${intersectionY2}
    A ${radius} ${radius} 0 0 1 ${intersectionX1} ${intersectionY1}
  `;

  return (
    <>
    <svg viewBox="0 0 380 380" className={styles.svg}>
      <circle cx={centerAX} cy={centerAY} r={radius} style={{fill: color1, stroke: strockA}}/>
      <circle cx={centerBX} cy={centerBY} r={radius} style={{fill: color2, stroke: strockB}}/>
      <path d={path} style={{fill: colorIntersection}}/>
      <text x={centerAX} y={centerAY} className={styles.label} style={{fill: textColorA}}>Группа A</text>
      <text x={centerBX} y={centerBY} className={styles.label} style={{fill: textColorB}}>Группа B</text>
    </svg>
    </>
  );
};

export default IntersectingCircles;
