import React, { useContext, useState, useEffect } from 'react';
import './styles.css';
import SolLabelBsn from './images/SolLabelBsn';
import BlockImg_x1 from './images/Dashboard_x1.png';
import BlockImg_x2 from './images/Dashboard_x2.png';
import BlockImg_x3 from './images/Dashboard_x3.png';
import AccordionMain from '../components/AccordionMain';
import blockApi1 from './images/blockapi1.svg';
import blockApi2 from './images/blockapi2.svg';
import blockApi3 from './images/blockapi3.svg';
import blockApi3Mobile from './images/blockApi3Mobile.svg';
import manyApi from './images/manyApi.svg';
import manyApiMobile from './images/manyApiMobile.svg';
import manyApiMedium from '../pages/images/blockApiMedium.svg';

import apiBlock from './images/apiblock2.svg';
import apiBlockMedium from './images/apiBlockMedium.svg';
import startAnalitic from './images/startAnalitic.svg';
import arrowLink from './images/arrowLink.svg';
import BtnHomePage from '../components/BtnHomePage';
import StepsTime from '../components/StepsTime';
import SelectRate from '../components/SelectRate';
import SolLabelStartBsn from './images/SolLabelStartBsn';
import YellowRadarPoint from './images/YellowRadarPoint';
import YellowRadarSmall from './images/YelowRadarSmall';
import NavbarMainHome from '../components/NavbarMainHome';
import Reviews from '../components/Reviews';
import AuthContext from '../service/AuthContext';
import { useNavigate } from 'react-router-dom';
import LimitedFooter from '../components/LimitedFooter';
import ToggleAnaliticsPanel from '../components/ToggleAnaliticsPanel';
import ImageComponent from '../components/utilsComponents/ImageComponent ';
import ReviewsUsers from '../components/ReviewsUsers';
import TryProduct from '../components/TryProduct';
import { useLocation } from 'react-router-dom';
import { URL } from '../service/config';
import lowResImage from './images/imageFon_comp.png'; //  the low-res image
import highResImage from './images/imageFon.png'; //  the high-res image
import ligtning from './images/ligtningIcon.svg';
import safety from './images/safety.svg';
import bigData from './images/bigData.svg';
import FooterNewVersion from '../components/FooterNewVersion';

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, authToken } = useContext(AuthContext);
  const [isHighResLoaded, setHighResLoaded] = useState(false); // State to track when high-res image is loaded

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
      <div className='container widbody-container container-xlwidth'>
        <NavbarMainHome />
        <div className='wid-solution' style={{ marginTop: '20px' }}>
          <div className='sol-description sol-description-top col'>
            <div className='sol-description-label-container'>
              <SolLabelBsn />
            </div>
            <div
              className='yellow-radar-small-container'
              style={{ display: 'flex', justifyContent: 'start' }}
            >
              <YellowRadarSmall />
            </div>
            <div className='sales-increase-text'>
              – сервис аналитики для
              <span className='sales-increse-text-span'>
                {' '}
                увеличения ваших продаж{' '}
              </span>
              на маркетплейсах
            </div>
            <div className='analyze-competitors-text'>
              Анализируйте конкурентов, повышайте показатели своих карточек и
              контролируйте финансы в одном месте.
            </div>

            <div className='d-flex flex-column gap-3 startWorkBtn'>
              <button
                className='prime-btn'
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
          <div className='sol-screenshot col-7'>
            <ImageComponent
              heavyImageSrc={BlockImg_x3}
              lightImageSrc={BlockImg_x1}
            />
          </div>
        </div>

        <div className='wid-solution-text'>
          <p className='wid-solution-text-p col-8'>
            Увеличьте продажи на маркетплейсе <br /> в 2 раза{' '}
            <span style={{ color: 'orange', fontWeight: '800' }}>
              с помощью инструментов Radar
            </span>
          </p>
        </div>
        <ToggleAnaliticsPanel />

        <div style={{ marginTop: '100px' }}>
          <div className='widhead-container'>
            <div className='mainBlock-api'>
              <div className='personal-account-connect-text'>
                Подключение личного кабинета{' '}
                <span style={{ color: 'orange', fontWeight: '800' }}>
                  по API
                </span>
              </div>
              <div className='receive-data-text'>
                Получайте данные по всем вашим магазинам в режиме реального
                времени в одном месте
              </div>
            </div>
            <div className='widhead-container-image widhead-container-image-mob'>
              <img
                className='manyApiLogoMobile'
                src={manyApiMobile}
                alt='logo'
                style={{ borderRadius: '15px' }}
              />
            </div>

            <div className='widhead-container-block'>
              <div className='widhead-containe-img'>
                <div className='widhead-contain-icon'>
                  <img src={ligtning} />
                </div>
                <div className='widhead-contian-title'>Быстро</div>
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
                      stroke-width='1.5'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
              </div>
              <div className='widhead-containe-img'>
                <div className='widhead-contain-icon'>
                  <img src={safety} />
                </div>
                <div className='widhead-contian-title'>Безопасно</div>
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
                      stroke-width='1.5'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
              </div>
              <div className='widhead-containe-img'>
                <div className='widhead-contain-icon'>
                  <img src={bigData} />
                </div>
                <div className='widhead-contian-title'>
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
                      stroke-width='1.5'
                      stroke-linecap='round'
                      stroke-linejoin='round'
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
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
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
          <div className='widhead-container'>
            <div className='widhead-container-image'>
              <img
                className='manyApiLogo'
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
            <div className='apiBlock'>
              <img className='apiBlockImg' src={apiBlock} alt='logo' />
              <img
                className='apiBlockImgMedium'
                src={apiBlockMedium}
                alt='logo'
              />
            </div>
            <div
              className='blockBtn'
              style={{
                backgroundImage: `url(${
                  isHighResLoaded ? highResImage : lowResImage
                })`,
              }}
            >
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
            <SelectRate redirect={redirect} isShowText={false} />
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
        </div>
      </div>
      <FooterNewVersion />
    </div>
  );
};
export default MainPage;
