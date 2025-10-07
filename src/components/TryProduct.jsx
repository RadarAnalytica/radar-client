import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/styles.css";
import BlockImg_x1 from "../pages/images/Dashboard_x1.png";
import BlockImg_x2 from "../pages/images/Dashboard_x2.png";
import SolLabelStartBsn from "../pages/images/SolLabelStartBsn";
import YellowRadarPoint from "../pages/images/YellowRadarPoint";
import CustomButton from "./utilsComponents/CustomButton";
import AuthContext from "../service/AuthContext";
import lowResImage from '../pages/images/imageFonStartBsn_comp.png'; // the low-res image
import highResImage from '../pages/images/imageFonStartBsn.png'; // the high-res image
import ImageComponent from "./utilsComponents/ImageComponent ";
import styles from "../components/TryProduct.module.css";


const TryProduct = ({ redirect }) => {
  const { user } = useContext(AuthContext);
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const [isHighResLoaded, setHighResLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = highResImage;

    img.onload = () => {
      setHighResLoaded(true); // High-res image is fully loaded
    };
  }, []);


  return (
    <>
      <div
        className={` ${styles.widSolutionMainImg} wid-solutionMain ${isHighResLoaded ? 'highResMain' : 'lowResMain'}`}
      >
        <div className={` ${styles.solDescription} sol-description col`} style={{ padding: 0 }}>
          <div className='headStartBsn'>
            <SolLabelStartBsn />
            <div style={{ fontSize: "34px", fontWeight: "700" }}>
              Готовы начать?
            </div>
            <div className='searchTextDiv'>
              Найдите прибыльные товары на маркетплейсе и развивайте свой
              бизнес.
            </div>
            <div className='YellowRadarPoint' style={{ marginTop: "20px" }}>
              <YellowRadarPoint />
            </div>
          </div>

          <div className='d-flex flex-column gap-3'>
            <CustomButton
              text={"Начать работать"}
              action={() => {
                if (currentPath === "/") {
                  if (user) {
                    window.open("/tariffs", "_blank");
                  }
                  if (!user) {
                    navigate("/signup");
                  }
                } else {
                  redirect();
                }
              }}
              className={`white-btn ${styles.whiteBtn}`}
            />
          </div>
        </div>
        <div className={`sol-screenshot sol-screenshot_bottom ${styles.solScreenshotBbottom}`}>
          {/* <img src={BlockImg_x2} alt='' /> */}
          <ImageComponent
            heavyImageSrc={BlockImg_x2}
            lightImageSrc={BlockImg_x1}
          />
        </div>
      </div>
    </>
  );
};

export default TryProduct;
