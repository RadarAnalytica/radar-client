import React from 'react';
import '../pages/styles.css';
import '../App.css';
import RadarAnalitica from '../pages/images/RadarAnalitica.svg';
import RadarAnaliticaPng from '../pages/images/RadarAnalitica.png';
import TelegramBot from '../pages/images/TelegramSmall.svg';
import TelegramPng from '../pages/images/TelegramSmall.png';
import DigitIcon from '../pages/images/digit.svg';
import DigitIconPng from '../pages/images/digit.png';
import LimitedFooter from './LimitedFooter';
import ImageComponent from './utilsComponents/ImageComponent ';

const Contacts = () => {
  return (
    <div className='page-wrap'>
      <div className='container custom-container container-xlwidth'>
        <div className='content-wrap'>
          <div
            className='d-flex'
            style={{
              marginTop: '20px',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <div style={{ alignSelf: 'center' }}>
              <ImageComponent
                heavyImageSrc={RadarAnalitica}
                lightImageSrc={RadarAnaliticaPng}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <div className='telegram'>
                <div className='telegram-icon'>
                  <ImageComponent
                    heavyImageSrc={TelegramBot}
                    lightImageSrc={TelegramPng}
                  />
                </div>
                <a className='telegram-link' href='https://t.me/SpyRadar_bot'>
                  Бот Telegram
                </a>
              </div>
              <div>
                <ImageComponent
                  heavyImageSrc={DigitIcon}
                  lightImageSrc={DigitIconPng}
                  style={{ borderRadius: '18px' }}
                />
              </div>
            </div>
          </div>
          <div className='row' style={{ marginTop: '70px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'blue' }}>
              Контакты
            </h3>
            <p style={{ marginBottom: '0', marginTop: '20px' }}>
              Предложения и идеи:
            </p>
            <a style={{ textDecoration: 'none' }} href=''>
              radar-analytica@inbox.ru
            </a>
            <p style={{ marginBottom: '0', marginTop: '20px' }}>
              Сотрудничество:
            </p>
            <a style={{ textDecoration: 'none' }} href=''>
              radar-analytica@inbox.ru
            </a>
            <p style={{ marginBottom: '0', marginTop: '20px' }}>
              Задать вопрос по оцифровке:
            </p>
            <a
              style={{ textDecoration: 'none' }}
              href='https://t.me/media_laba'
            >
              https://t.me/media_laba
            </a>
          </div>
        </div>
        <LimitedFooter />
      </div>
    </div>
  );
};

export default Contacts;
