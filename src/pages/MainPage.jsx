import React, { useContext, useState, useEffect, lazy, useLayoutEffect } from 'react';
import './styles.css';
import SolLabelBsn from './images/SolLabelBsn';
// import BlockImg_x1 from './images/Dashboard_x1.png';
// import BlockImg_x2 from './images/Dashboard_x2.png';
import AccordionMain from '../components/AccordionMain';
import manyApi from './images/manyApi.svg';
import manyApiMobile from './images/manyApiMobile.svg';
import manyApiMedium from '../pages/images/blockApiMedium.svg';
import wbLogo from './images/wb_icon.svg'

import FinancialStatements from '../components/FinancialStatements';
import apiBlock from './images/apiblock2.svg';
import startAnalitic from './images/startAnalitic.svg';
import arrowLink from './images/arrowLink.svg';
import BtnHomePage from '../components/BtnHomePage';
import StepsTime from '../components/StepsTime';
// import SelectRate from '../components/SelectRate';
import SelectRateMain from '../components/SelectRateMain';
import NavbarMainHome from '../components/NavbarMainHome';
import AnalyzeWildberries from "../components/AnalyzeWildberries"
import AuthContext from '../service/AuthContext';
import { useNavigate } from 'react-router-dom';
// import LimitedFooter from '../components/LimitedFooter';
import ToggleAnaliticsPanel from '../components/ToggleAnaliticsPanel';
import ReviewsUsers from '../components/ReviewsUsers';
import TryProduct from '../components/TryProduct';
import { useLocation } from 'react-router-dom';
import { URL } from '../service/config';
import lowResImage from './images/imageFon_comp.png';
import highResImage from './images/imageFon.png';
import ligtning from './images/ligtningIcon.svg';
import safety from './images/safety.svg';
import bigData from './images/bigData.svg';
import FooterNewVersion from '../components/FooterNewVersion';
import ApiBlockContainer from "../components/ApiBlockContainer"

import ImageComponent from '../components/utilsComponents/ImageComponent ';
import BlockImg_x1 from './images/Dashboard_x1.png';
import BlockImg_x3 from './images/Dashboard_x3.png';
import { Helmet } from 'react-helmet';

import VideoComponent from '../components/utilsComponents/VideoComponent';
import lowQualityVideo from "../assets/video/WebmLow.webm";
import highQualityVideoWebm from "../assets/video/Webm_1920.webm"
import highQualityVideo from "../assets/video/fixed_video.mp4";
import preview from "../assets/video/firstShot.jpg"
import LoaderPage from "../pages/LoaderPage";

const AdaptiveMedia = lazy(() => import("../components/AdaptiveMedia"));

import styles from "../pages/MainPage.module.css"

const MainPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { user, authToken } = useContext(AuthContext);
  const [isHighResLoaded, setHighResLoaded] = useState(false); // State to track when high-res image is loaded
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Report LCP
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('LCP:', entry.startTime, entry.element);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  }, []);

   // ----- video instruction script ----------------------//
   useLayoutEffect(() => {
    const head = document.querySelector('head');
    const videoscript = head.querySelector('#video_instruction')
   
    const script = document.createElement('script')
    script.src = 'https://app.getreview.com/tags/ugfMbLpl3yqfOvpC/sdk.js'
    script.async = true
    script.id = 'video_instruction'

    if (!videoscript) {
      head.appendChild(script);
    }

    return () => {
      head.removeChild(script);
    }
  }, [])

  // ------------------------------------------------------//

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referral = searchParams.get('referral') || searchParams.get('radar');
    if (referral) {
      // Save the referral code ( to localStorage)
      localStorage.setItem('referralCode', referral);
    }
  }, [location]);

  const redirect = () => {
    if (user?.is_onboarded) {
      user?.subscription_status === 'expired'
        ? navigate('/tariffs')
        : navigate('/dashboard');
    } else {
      navigate('/onboarding');
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
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'JWT ' + authToken,
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

  useEffect(() => {
    const img = new Image();
    img.src = highResImage;

    img.onload = () => {
      // When high-res image is fully loaded, change the state
      setHighResLoaded(true);
    };
  }, [highResImage]);


  return (

    <div
      className='page-white'
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
       <Helmet>
          <title>Radar Analytica — сервис аналитики маркетплейсов для увеличения ваших продаж.</title>
          <meta name="description" content="Радар Аналитика - сервис аналитики для увеличения ваших продаж на маркетплейсах. Анализируйте конкурентов, повышайте показатели своих карточек и контролируйте финансы в одном месте." />
      </Helmet>
      {/* {
        !isVideoLoaded ? (
          <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: '100%', paddingTop: '15%' }}>
            <span className='loader'></span>
          </div>
        ) : <div></div>
      } */}

      <div>
        <div className={`container widbody-container container-xlwidth  ${styles.mainPageContainer}`}>
          <NavbarMainHome />
          <div className={`wid-solution ${styles.widSolution}`} style={{ marginTop: '20px' }}>
            <div className={`sol-description sol-description-top col ${styles.solDescription}`}>
              <div className={`sol-description-label-container ${styles.solDescriptionLabelContainer}`}>
                <SolLabelBsn />
              </div>
              <div
                className={`yellow-radar-small-container ${styles.solDescriptionLabelSmallContainer}`}
                style={{ display: 'flex', justifyContent: 'start'}}
              >
                <h1 className={styles.mainTitle}>
                  <span className={styles.mainTitle__logo}>
                    Radar&nbsp;Analytica
                  </span><br />
                  – сервис аналитики для
                <span className={styles.mainTitle__color}>
                  {' '}
                  увеличения ваших продаж{' '}
                </span>
                на маркетплейсах
                </h1>
              </div>
              <div className={`analyze-competitors-text ${styles.ananlyzeText}`}>
                Анализируйте конкурентов, повышайте показатели своих карточек и
                контролируйте финансы в одном месте.
              </div>

              <div className='d-flex flex-column gap-3 startWorkBtn'>
                <button
                  className='first-screen-action-button'
                  style={{ minHeight: '64px', fontSize: '18px', margin: 0 }}
                  onClick={() => {
                    if (user) {
                      window.open('/tariffs', '_blank');
                    }
                    if (!user) {
                      navigate('/signup');
                    }
                  }}
                >
                  Начать работать
                </button>
              </div>
            </div>
            <div className={`sol-screenshot col-7 ${styles.mainPicture}`}>
            <ImageComponent
              heavyImageSrc={BlockImg_x3}
              lightImageSrc={BlockImg_x1}
            />
              {/* <VideoComponent
              poster={preview}
              videoMp4={highQualityVideo}
              style={{ width: '100%', height: "auto" }}
            /> */}
              {/* <AdaptiveMedia
                videoMp4={highQualityVideo}
                // videoWebm={highQualityVideoWebm}
                setIsVideoLoaded={setIsVideoLoaded}
                poster={preview}
                heavyImageSrc={BlockImg_x2}
                lightImageSrc={BlockImg_x1}
                style={{
                  width: "100%", height: "auto",
                }}
              /> */}
              {/* <Suspense fallback={<LoaderPage />}>
                <AdaptiveMedia
                  videoMp4={highQualityVideo}
                  // videoWebm={highQualityVideoWebm}
                  poster={preview}
                  heavyImageSrc={BlockImg_x2}
                  lightImageSrc={BlockImg_x1}
                  style={{
                    width: "100%", height: "auto",
                  }}
                />
              </Suspense> */}
            </div>
          </div>

          <div className='authorized-service-container'>
            <div className='authorized-service-logo-wrapper'>
              <div className='wb-logo-wrapper'>
                <img src={wbLogo} alt="WB Logo" />
              </div>
              <div className='wb-text-wrapper'>Официальный <br /> авторизованный сервис</div>
            </div>
            <div className='authorized-service-text-wrapper'>Наш сервис успешно прошел проверку Wildberries, подтвердив соответствие всем стандартам, включая требования по информационной безопасности.</div>
          </div>


          <div className='wid-solution-text'>
            <h2 className={`wid-solution-text-p col-8 ${styles.widSolutionText}`}>
              Увеличьте продажи на маркетплейсе <br /> в 2 раза{' '}
              <span style={{ color: 'orange', fontWeight: '800' }}>
                с помощью инструментов Radar
              </span>
            </h2>
          </div>
          <ToggleAnaliticsPanel />

          <div style={{ marginTop: '100px' }}>
            <FinancialStatements />
          </div>

          <div style={{ marginTop: '100px' }}>
            <div className={`widhead-container ${styles.widheadContainer}`}>
              <div className={`mainBlock-api ${styles.mainBlockApi}`}>
                <div className={`personal-account-connect-text  ${styles.personalAccountConnectText}`}>
                  Подключение личного кабинета{' '}
                  <span style={{ color: 'orange', fontWeight: '800' }}>
                    по API
                  </span>
                </div>
                <div className={`receive-data-text ${styles.receiveDataText}`}>
                  Получайте данные по всем вашим магазинам в режиме реального
                  времени в одном месте
                </div>
              </div>
              <div className='widhead-container-image widhead-container-image-mob'>
                <img
                  className={`manyApiLogoMobile ${styles.manyApiLogoMobile}`}
                  src={manyApiMobile}
                  alt='logo'
                  style={{ borderRadius: '15px', width: "100%" }}
                />
              </div>

              <div className='widhead-container-block'>
                <div className='widhead-containe-img'>
                  <div className='widhead-contain-icon'>
                    <img src={ligtning} />
                  </div>
                  <div className={`widhead-contian-title ${styles.widheadContainTitle}`}>Быстро</div>
                  <div className='widhead-contain-parag'>
                    Не успеете выпить
                    <br /> чашку кофе
                  </div>
                  <div className='widhead-contain-check'>
                    <svg
                      width='71'
                      height='43'
                      viewBox='0 0 71 43'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect
                        width='70.772'
                        height='42.3005'
                        rx='21.1503'
                        fill='#5329FF'
                      />
                      <rect
                        x='32.5391'
                        y='4.88086'
                        width='32.5389'
                        height='32.5389'
                        rx='16.2694'
                        fill='white'
                      />
                      <path
                        d='M43 20.5L48 25.5L55.5 18'
                        stroke='#5329FF'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </div>
                <div className='widhead-containe-img'>
                  <div className='widhead-contain-icon'>
                    <img src={safety} />
                  </div>
                  <div className={`widhead-contian-title ${styles.widheadContainTitle}`}>Безопасно</div>
                  <div className='widhead-contain-parag'>
                    Мы обо всем <br />
                    позаботились
                  </div>
                  <div className='widhead-contain-check'>
                    <svg
                      width='71'
                      height='43'
                      viewBox='0 0 71 43'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect
                        width='70.772'
                        height='42.3005'
                        rx='21.1503'
                        fill='#5329FF'
                      />
                      <rect
                        x='32.5391'
                        y='4.88086'
                        width='32.5389'
                        height='32.5389'
                        rx='16.2694'
                        fill='white'
                      />
                      <path
                        d='M43 20.5L48 25.5L55.5 18'
                        stroke='#5329FF'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </div>
                <div className='widhead-containe-img'>
                  <div className='widhead-contain-icon'>
                    <img src={bigData} />
                  </div>
                  <div className={`widhead-contian-title ${styles.widheadContainTitle}`}>
                    Большой объем данных{' '}
                  </div>
                  <div className='widhead-contain-parag'>Важных данных</div>
                  <div className='widhead-contain-check'>
                    <svg
                      width='71'
                      height='43'
                      viewBox='0 0 71 43'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect
                        width='70.772'
                        height='42.3005'
                        rx='21.1503'
                        fill='#5329FF'
                      />
                      <rect
                        x='32.5391'
                        y='4.88086'
                        width='32.5389'
                        height='32.5389'
                        rx='16.2694'
                        fill='white'
                      />
                      <path
                        d='M43 20.5L48 25.5L55.5 18'
                        stroke='#5329FF'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className='widhead-containe-img-mobile'>
                <div className='widhead-contian-title-mobile'>
                  Большой объем данных{' '}
                </div>
                <div className='widhead-contain-mobile'>
                  <div style={{ margin: '10px 0 30px 0px' }}>
                    <div className='widhead-contain-parag'>Важных данных</div>
                    <div className='widhead-contain-check'>
                      <svg
                        width='71'
                        height='43'
                        viewBox='0 0 71 43'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          width='70.772'
                          height='42.3005'
                          rx='21.1503'
                          fill='#5329FF'
                        />
                        <rect
                          x='32.5391'
                          y='4.88086'
                          width='32.5389'
                          height='32.5389'
                          rx='16.2694'
                          fill='white'
                        />
                        <path
                          d='M43 20.5L48 25.5L55.5 18'
                          stroke='#5329FF'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                  </div>
                  <div className='widhead-contain-icon-mobile'>
                    <img src={bigData} />
                  </div>
                </div>
              </div>
            </div>
            <div className={`widhead-container ${styles.widHeadContainerLastLine}`}>
              <div className='widhead-container-image'>
                <img
                  className={`manyApiLogo ${styles.manyApiLogo}`}
                  src={manyApi}
                  alt='logo'
                  style={{ borderRadius: '15px' }}
                />
                <img
                  className='manyApiLogoMedium'
                  src={manyApiMedium}
                  alt='logo'
                  style={{ borderRadius: '15px' }}
                />
              </div>
              <div className={`apiBlock ${styles.apiBlock}`}>
                <ApiBlockContainer />
                {/* <img className='apiBlockImg' src={apiBlock} alt='logo' /> */}
                {/* <img
                className='apiBlockImgMedium'
                src={apiBlockMedium}
                alt='logo'
              /> */}
              </div>
              <div
                className={`blockBtn ${styles.blockBtn}`}
                style={{
                  backgroundImage: `url(${isHighResLoaded ? highResImage : lowResImage
                    })`,
                }}
              >
                <div className={`blockBtnContainer ${styles.blockBtnContainerInner}`}>
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

                  <div className={`readyforStartText ${styles.readyforStartText}`}>Готовы начать?</div>
                  <div className={`profitableStafText ${styles.profitableStafText}`}>
                    Найдите прибыльные товары на маркетплейсе и развивайте свой
                    бизнес.
                  </div>
                  <button
                    className='btn-warning btn-warning-home'
                    onClick={() => {
                      if (user) {
                        window.open('/tariffs', '_blank');
                      }
                      if (!user) {
                        navigate('/signup');
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
            <div style={{ marginTop: '100px' }}>
              <SelectRateMain redirect={redirect} isShowText={false} />
            </div>
            <div style={{ marginTop: '100px' }}>
              <ReviewsUsers />
            </div>
            <div style={{ marginBottom: '100px' }}>
              <AccordionMain />
            </div>
            <div style={{ marginBottom: '100px' }}>
              <TryProduct redirect={redirect} />
            </div>
            <div style={{ marginBottom: '100px' }}>
              <AnalyzeWildberries />
            </div>
          </div>
        </div>
        <FooterNewVersion />
      </div>

    </div >
  );
};
export default MainPage;
