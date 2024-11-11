import styles from './HowToConnectAPI.module.css';
import NavbarMainHome from '../components/NavbarMainHome';
import step1v1 from './images/step1-1.jpg';
import step1v2 from './images/step1-2.jpg';
import step2v1 from './images/step2-1.jpg';
import step4v1 from './images/step4-1.jpg';
import Steps from '../pages/images/Steps';
import exclamation from './images/ExlamationMark.svg';
import FooterNewVersion from '../components/FooterNewVersion';

const HowToConnectAPI = () => {
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
          <img src={step1v1} alt='step1' className={styles.step1Img} />
          <img src={step1v2} alt='step2' className={styles.step1Img} />
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
          <img src={step2v1} alt='step1' className={styles.step1Img} />
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={exclamation}
                  alt='Exclamtion Mark'
                  style={{ margin: '0 16px 0 16px' }}
                />
                <span>
                  Важно: галочка “Только на чтение” должна быть снята.
                </span>
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
          <div className={styles.stepText}>Нажимаем кнопку «Сохранить»</div>
          <img src={step4v1} alt='step1' className={styles.step1Img} />
        </div>
      </div>
      <FooterNewVersion />
    </div>
  );
};

export default HowToConnectAPI;
