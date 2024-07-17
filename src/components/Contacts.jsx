import React from 'react';
import '../pages/styles.css';
import RadarAnalitica from '../pages/images/RadarAnalitica.svg';
import TelegramBot from '../pages/images/TelegramSmall.svg';
import DigitIcon from '../pages/images/digit.svg';
import LimitedFooter from './LimitedFooter';

const Contacts = () => {
  return (
    <div className='page-wrap'>
      <div className='custom-container'>
        <div className='content-wrap'>
          <div className='d-flex' style={{ marginTop: '20px' }}>
            <div>
              <img src={RadarAnalitica} alt='' />
            </div>
            <div className='telegram'>
              <div className='telegram-icon'>
                <img src={TelegramBot} alt='' />
              </div>
              <a className='telegram-link' href='https://t.me/SpyRadar_bot'>
                Бот Telegram
              </a>
            </div>
            <div>
              <img style={{ borderRadius: '18px' }} src={DigitIcon} alt='' />
            </div>
          </div>
          <div className='row' style={{ marginLeft: '20%', marginTop: '70px' }}>
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
