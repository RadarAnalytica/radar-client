import React, { useContext } from 'react';
import './styles.css';
import SolLabelBsn from './images/SolLabelBsn';
import BlockImg_x1 from './images/Dashboard_x1.png';
import BlockImg_x2 from './images/Dashboard_x2.png';
import BlockImg_x3 from './images/Dashboard_x3.png';
import AccordionMain from '../components/AccordionMain';
import blockApi1 from './images/blockapi1.svg';
import blockApi2 from './images/blockapi2.svg';
import blockApi3 from './images/blockapi3.svg';
import manyApi from './images/manyApi.svg';
import apiBlock from './images/apiblock2.svg';
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

const MainPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const redirect = () => {
    if (user?.is_onboarded) {
      !user.subscription_status ? navigate('/tariffs') : navigate('/dashboard');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className='page-white'>
      <div className='container widbody-container container-xlwidth'>
        <NavbarMainHome />
        <div className='wid-solution' style={{ marginTop: '20px' }}>
          <div className='sol-description col'>
            <div style={{ marginBottom: '20px' }}>
              <SolLabelBsn />
            </div>
            <div>
              <YellowRadarSmall />
            </div>
            <div
              style={{
                fontSize: '34px',
                fontWeight: 'bold',
                marginTop: '16px',
                maxWidth: '500px',
                lineHeight: '42px',
              }}
            >
              – сервис аналитики для{' '}
              <span style={{ color: 'blue', fontWeight: '800' }}>
                увеличения ваших продаж
              </span>{' '}
              на маркетплейсах
            </div>
            <div
              style={{
                fontSize: '20px',
                margin: '16px 0 32px',
                maxWidth: '460px',
              }}
            >
              Анализируйте конкурентов, повышайте показатели своих карточек и
              контролируйте финансы в одном месте.
            </div>

            <div className='d-flex flex-column gap-3'>
              <button
                className='prime-btn'
                style={{ minHeight: '64px', fontSize: '18px', margin: 0 }}
                onClick={() => navigate('/tariffs')}
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
        <div>
          <p
            style={{ fontWeight: 700, fontSize: '42px', marginTop: '100px' }}
            className='col-8'
          >
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
              <div style={{ fontSize: '40px', fontWeight: '700' }}>
                Подключение личного кабинета{' '}
                <span style={{ color: 'orange', fontWeight: '800' }}>
                  по API
                </span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700' }}>
                Получайте данные по всем вашим магазинам в режиме реального
                времени в одном месте
              </div>
            </div>
            <div style={{ width: '25%' }}>
              <img src={blockApi1} alt='logo' style={{ width: '100%' }} />
            </div>
            <div style={{ width: '25%' }}>
              <img src={blockApi2} alt='logo' style={{ width: '100%' }} />
            </div>
            <div style={{ width: '25%' }}>
              <img src={blockApi3} alt='logo' style={{ width: '100%' }} />
            </div>
          </div>
          <div className='widhead-container'>
            <div>
              <img
                src={manyApi}
                alt='logo'
                style={{ width: '100%', borderRadius: '15px' }}
              />
            </div>
            <div>
              <img src={apiBlock} alt='logo' style={{ width: '100%' }} />
            </div>
            <div className='blockBtn'>
              <div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <img src={startAnalitic} alt='start-analitic' />
                  </div>
                  <div>
                    <img src={arrowLink} alt='arrow-link' />
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '44px',
                    fontWeight: '700',
                    color: 'white',
                  }}
                >
                  Готовы начать?
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '20px',
                  }}
                >
                  Найдите прибыльные товары на маркетплейсе и развивайте свой
                  бизнес.
                </div>
                <button
                  className='btn-warning'
                  style={{
                    minHeight: '64px',
                    fontSize: '18px',
                    fontWeight: '700',
                  }}
                  onClick={() => navigate('/tariffs')}
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
            <SelectRate redirect={redirect} />
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
        <LimitedFooter />
      </div>

      {/* <Footer isWide /> */}
    </div>
  );
};
export default MainPage;
