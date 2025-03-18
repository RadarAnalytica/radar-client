import { useState } from 'react';
import './styles.css';
import styles from './HowToConnectAPI.module.css';
import NavbarMainHome from '../components/NavbarMainHome';

import step1img1 from '../assets/step1-img1.svg';
import step1img2 from '../assets/step1-img2.svg';
import step2img1 from '../assets/step2-img1.svg';
import step4img1 from '../assets/step4-img1.svg';

import step1img1PNG from '../assets/step1-img1-png.png';
import step1img2PNG from '../assets/step1-img2-png.png';
import step2img1PNG from '../assets/step2-img1-png.png';
import step4img1PNG from '../assets/step4-img1-png.png';

import step1img1PNGLow from '../assets/step1-img1-png-low.png';
import step1img2PNGLow from '../assets/step1-img2-png-low.png';
import step2img1PNGLow from '../assets/step2-img1-png-low.png';
import step4img1PNGLow from '../assets/step4-img1-png-low.png';
import { Helmet } from 'react-helmet';
import Steps from '../pages/images/Steps';
import exclamation from './images/ExlamationMark.svg';
import FooterNewVersion from '../components/FooterNewVersion';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const HowToConnectAPI = () => {

  const [highResLoaded, setHighResLoaded] = useState(false);

  const handleImageLoad = () => {
      setHighResLoaded(true);
  };

  return (
    <div
      className='page-white'
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Helmet>
        <title>Подключение к API Radar Analytica — сервис аналитики маркетплейсов</title>
        <meta name="description" content="API сервиса Radar Analytica — быстрое и удобное подключение Wildberries через API-токен" />
      </Helmet>
      <div className='container widbody-container container-xlwidth'>
        <NavbarMainHome />
        <div className={styles.marginBottom}></div>
        <div className={styles.stepContainer}>
          <div>
            <div
              className='steps-container'
              style={{ backgroundColor: 'rgba(83, 41, 255, 1)' }}
            >
              <Steps.StepsBlue />
              <p style={{ color: 'white' }}>{`Шаг 1`}</p>
            </div>
          </div>
          <div className={styles.stepText}>
            В личном кабинете нажимаем на “шестеренку” и выбираем раздел
            “подключенные магазины”.
          </div>
          <img
            src={isSafari ? (highResLoaded ? step1img1PNG : step1img1PNGLow) : step1img1}
            onLoad={handleImageLoad}
            alt='step1'
            className={styles.step1Img}
          />
          <img
            src={isSafari ? (highResLoaded ? step1img2PNG : step1img2PNGLow) : step1img2}
            onLoad={handleImageLoad}
            alt='step2'
            className={styles.step1Img}
          />
        </div>
        <div className={styles.stepContainer}>
          <div>
            <div
              className='steps-container'
              style={{ backgroundColor: 'rgba(83, 41, 255, 1)' }}
            >
              <Steps.StepsBlue />
              <p style={{ color: 'white' }}>{`Шаг 2`}</p>
            </div>
          </div>
          <div className={styles.stepText}>
            На странице “подключенные магазины” выбираем вариант “Подключить”. 
          </div>
          <img
            src={isSafari ? (highResLoaded ? step2img1PNG : step2img1PNGLow) : step2img1}
            onLoad={handleImageLoad}
            alt='step1'
            className={styles.step1Img}
          />
        </div>
        <div className={styles.stepContainer}>
          <div>
            <div
              className='steps-container'
              style={{ backgroundColor: 'rgba(83, 41, 255, 1)' }}
            >
              <Steps.StepsBlue />
              <p style={{ color: 'white' }}>{`Шаг 3`}</p>
            </div>
          </div>
          <div className={styles.textContainer}>
            <div className={styles.stepText}>
              В поле «Название магазина» вводим название личного кабинета в
              сервисе «Radar Analytica». Можно указать любое удобное и понятное
              название, это не влияет на работу кабинета.
            </div>
            <div className={styles.stepText}>
              В поле «Токен» вставляем API-ключ, который можно скопировать в
              <a
                href='https://seller.wildberries.ru/supplier-settings/access-to-api'
                target='_blank'
                rel='noopener noreferrer'
                style={{ color: 'rgba(83, 41, 255, 1)', marginLeft: '5px' }}
              >
                личном кабинете Wildberries
              </a>
              .Тип ключа — (Контент, Маркетплейс, Статистика, Аналитика,
              Продвижения, Вопросы и отзывы, Цены и скидки).
            </div>
            <div className={styles.stepTextImportant}>
              <div className={styles.stepTextImportantBox}>
                <img
                  src={exclamation}
                  alt='Exclamtion Mark'
                  style={{ margin: '0 16px 0 16px' }}
                />
                Важно: галочка “Только на чтение” должна быть снята.
              </div>
            </div>
          </div>
        </div>
        <div className={styles.stepContainer}>
          <div>
            <div
              className='steps-container'
              style={{ backgroundColor: 'rgba(83, 41, 255, 1)' }}
            >
              <Steps.StepsBlue />
              <p style={{ color: 'white' }}>{`Шаг 4`}</p>
            </div>
          </div>
          <div className={styles.stepText}>Нажимаем кнопку «Сохранить».</div>
          <img
            src={isSafari ? (highResLoaded ? step4img1PNG : step4img1PNGLow) : step4img1}
            onLoad={handleImageLoad}
            alt='step1'
            className={styles.step1Img}
          />
        </div>
      </div>
      <FooterNewVersion />
    </div>
  );
};

export default HowToConnectAPI;
