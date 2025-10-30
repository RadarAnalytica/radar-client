import React from "react";
import styles from "./RadarLoader.module.css";

interface IRadarLoaderProps {
   loaderStyle?: React.CSSProperties;
}

export const RadarLoader: React.FC<IRadarLoaderProps> = ({ loaderStyle }) => {

    return (
        <div className={styles.loaderWrapper} style={loaderStyle}>
            <span className='loader'></span>
        </div>
    );
};

export default RadarLoader;