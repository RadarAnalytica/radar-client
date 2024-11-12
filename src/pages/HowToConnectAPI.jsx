import { useEffect, useState } from 'react';
import styles from './HowToConnectAPI.module.css';
import NavbarMainHome from '../components/NavbarMainHome';
import step1v1 from './images/step1-1.jpg';
import highResImage1 from './images/highResStep1-1.svg';
import step1v2 from './images/step1-2.jpg';
import highResImage2 from './images/highResStep1-2.svg';
import step2v1 from './images/step2-1.jpg';
import highResImage3 from './images/highResStep2-1.svg';
import step4v1 from './images/step4-1.jpg';
import highResImage4 from './images/highResStep4-1.svg';
import Steps from '../pages/images/Steps';
import exclamation from './images/ExlamationMark.svg';
import FooterNewVersion from '../components/FooterNewVersion';

const HowToConnectAPI = () => {
  const [isHighResLoaded, setHighResLoaded] = useState({
    image1: false,
    image2: false,
    image3: false,
    image4: false,
  });
  
  useEffect(() => {
    const images = [
      { high: highResImage1, key: 'image1' },
      { high: highResImage2, key: 'image2' },
      { high: highResImage3, key: 'image3' },
      { high: highResImage4, key: 'image4' },
    ];
  
    images.forEach(({high, key}) => {
      const img = new Image();
      img.src = high;
      img.onload = () => {
        setHighResLoaded(prev => ({
          ...prev,
          [key]: true
        }));
      };
    });
  }, []);
  return (
    <div
      className='page-white'
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
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
          <img src={isHighResLoaded ? highResImage1 : step1v1} alt='step1' className={styles.step1Img} />
          <img src={isHighResLoaded ? highResImage2 : step1v2} alt='step2' className={styles.step1Img} />
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
          <img src={isHighResLoaded ? highResImage3 : step2v1} alt='step1' className={styles.step1Img} />
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
          <img src={isHighResLoaded ? highResImage4 : step4v1} alt='step1' className={styles.step1Img} />
        </div>
      </div>
      <FooterNewVersion />
    </div>
  );
};

export default HowToConnectAPI;
