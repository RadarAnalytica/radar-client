import React, { useContext, useState, useEffect } from "react";
import "./styles.css";
import SolLabelBsn from "./images/SolLabelBsn";
import BlockImg_x1 from "./images/Dashboard_x1.png";
import BlockImg_x2 from "./images/Dashboard_x2.png";
import BlockImg_x3 from "./images/Dashboard_x3.png";
import AccordionMain from "../components/AccordionMain";
import blockApi1 from "./images/blockapi1.svg";
import blockApi2 from "./images/blockapi2.svg";
import blockApi3 from "./images/blockapi3.svg";
import blockApi3Mobile from "./images/blockApi3Mobile.svg";
import manyApi from "./images/manyApi.svg";
import manyApiMobile from "./images/manyApiMobile.svg";

import apiBlock from "./images/apiblock2.svg";
import startAnalitic from "./images/startAnalitic.svg";
import arrowLink from "./images/arrowLink.svg";
import BtnHomePage from "../components/BtnHomePage";
import StepsTime from "../components/StepsTime";
import SelectRate from "../components/SelectRate";
import SolLabelStartBsn from "./images/SolLabelStartBsn";
import YellowRadarPoint from "./images/YellowRadarPoint";
import YellowRadarSmall from "./images/YelowRadarSmall";
import NavbarMainHome from "../components/NavbarMainHome";
import Reviews from "../components/Reviews";
import AuthContext from "../service/AuthContext";
import { useNavigate } from "react-router-dom";
import LimitedFooter from "../components/LimitedFooter";
import ToggleAnaliticsPanel from "../components/ToggleAnaliticsPanel";
import ImageComponent from "../components/utilsComponents/ImageComponent ";
import ReviewsUsers from "../components/ReviewsUsers";
import TryProduct from "../components/TryProduct";

import { URL } from "../service/config";

const MainPage = () => {
  const navigate = useNavigate();
  const { user, authToken } = useContext(AuthContext);

  const redirect = () => {
    if (user?.is_onboarded) {
      user?.subscription_status === "expired"
        ? navigate("/tariffs")
        : navigate("/dashboard");
    } else {
      navigate("/onboarding");
    }
  };

  useEffect(() => {
    if (user) {
      const refreshToken = async () => {
        await refreshUserToken();
      };

      // Initial token refresh
      refreshToken();

      // Set up interval to refresh token every minute
      const intervalId = setInterval(refreshToken, 60000); // 60000 milliseconds = 1 minute

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, []);

  const refreshUserToken = async () => {
    try {
      const response = await fetch(`${URL}/api/user/refresh`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "JWT " + authToken,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        return data.token;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  return (
    <div className='page-white'>
      <div className='container widbody-container container-xlwidth'>
        <NavbarMainHome />
        <div className='wid-solution' style={{ marginTop: "20px" }}>
          <div className='sol-description col'>
            <div className='sol-description-label-container'>
              <SolLabelBsn />
            </div>
            <div>
              <YellowRadarSmall />
            </div>
            <div className='sales-increase-text'>
              – сервис аналитики для
              <span className='sales-increse-text-span'>
                {" "}
                увеличения ваших продаж{" "}
              </span>
              на маркетплейсах
            </div>
            <div className='analyze-competitors-text'>
              Анализируйте конкурентов, повышайте показатели своих карточек и
              контролируйте финансы в одном месте.
            </div>

            <div className='d-flex flex-column gap-3'>
              <button
                className='prime-btn'
                style={{ minHeight: "64px", fontSize: "18px", margin: 0 }}
                onClick={() => {
                  if (user) {
                    window.open("/tariffs", "_blank");
                  }
                  if (!user) {
                    navigate("/signup");
                  }
                }}
              >
                Начать работать
              </button>
            </div>
          </div>
          <div className='sol-screenshot col-7'>
            <ImageComponent
              heavyImageSrc={BlockImg_x3}
              lightImageSrc={BlockImg_x1}
            />
          </div>
        </div>

        <div className='wid-solution-text'>
          <p className='wid-solution-text-p col-8'>
            Увеличьте продажи на маркетплейсе <br /> в 2 раза{" "}
            <span style={{ color: "orange", fontWeight: "800" }}>
              с помощью инструментов Radar
            </span>
          </p>
        </div>
        <ToggleAnaliticsPanel />

        <div style={{ marginTop: "100px" }}>
          <div className='widhead-container'>
            <div className='mainBlock-api'>
              <div className='personal-account-connect-text'>
                Подключение личного кабинета
                <span style={{ color: "orange", fontWeight: "800" }}>
                  по API
                </span>
              </div>
              <div className='receive-data-text'>
                Получайте данные по всем вашим магазинам в режиме реального
                времени в одном месте
              </div>
            </div>
            <div className='widhead-container-block'>
              <div className='widhead-containe-img'>
                <img src={blockApi1} alt='logo' />
              </div>
              <div className='widhead-containe-img'>
                <img src={blockApi2} alt='logo' />
              </div>
              <div className='widhead-containe-img'>
                <img
                  src={blockApi3}
                  className='widhead-container-img3-main'
                  alt='logo'
                />
                <img
                  src={blockApi3Mobile}
                  className='widhead-container-img3-mini'
                  alt='logo'
                />
              </div>
            </div>
          </div>
          <div className='widhead-container'>
            <div className='widhead-container-image'>
              <img
                className='manyApiLogo'
                src={manyApi}
                alt='logo'
                style={{ borderRadius: "15px" }}
              />
              <img
                className='manyApiLogoMobile'
                src={manyApiMobile}
                alt='logo'
                style={{ borderRadius: "15px" }}
              />
            </div>
            <div className='apiBlock'>
              <img className='apiBlockImg' src={apiBlock} alt='logo' />
            </div>
            <div className='blockBtn'>
              <div className='blockBtnContainer'>
                <div className='blockBtnContainerHeader'>
                  <div className='blockBtnContainerImageBlock'>
                    <img
                      className='blockBtnContainerImage'
                      src={startAnalitic}
                      alt='start-analitic'
                    />
                  </div>
                  <div className='blockBtnContainerArrowImgBlock'>
                    <img
                      className='blockBtnContainerArrowImg'
                      src={arrowLink}
                      alt='arrow-link'
                    />
                  </div>
                </div>

                <div className='readyforStartText'>Готовы начать?</div>
                <div className='profitableStafText'>
                  Найдите прибыльные товары на маркетплейсе и развивайте свой
                  бизнес.
                </div>
                <button
                  className='btn-warning btn-warning-home'
                  onClick={() => {
                    if (user) {
                      window.open("/tariffs", "_blank");
                    }
                    if (!user) {
                      navigate("/signup");
                    }
                  }}
                >
                  Начать работать
                </button>
              </div>
            </div>
          </div>
          <div className='mainBlockFourBtn'>
            <BtnHomePage />
          </div>
          <div>
            <StepsTime redirect={redirect} />
          </div>
          <div style={{ marginTop: "100px" }}>
            <SelectRate redirect={redirect} />
          </div>
          <div style={{ marginTop: "100px" }}>
            <ReviewsUsers />
          </div>
          <div style={{ marginBottom: "100px" }}>
            <AccordionMain />
          </div>
          <div style={{ marginBottom: "100px" }}>
            <TryProduct redirect={redirect} />
          </div>
        </div>
        <LimitedFooter />
      </div>

      {/* <Footer isWide /> */}
    </div>
  );
};
export default MainPage;
