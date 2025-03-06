import styles from './ApiBlock.module.css';
import manyApi from '../../pages/images/manyApi.svg';
import manyApiMobile from '../../pages/images/manyApiMobile.svg';
import ligtning from '../../pages/images/ligtningIcon.svg';
import safety from '../../pages/images/safety.svg';
import bigData from '../../pages/images/bigData.svg';
import manyApiMedium from '../../pages/images/manyApi.svg';
//import wbLogo from '../../pages/images/wb_icon.svg'
import startAnalitic from '../../pages/images/startAnalitic.svg';
import arrowLink from '../../pages/images/arrowLink.svg';
import ApiBlockContainer from '../ApiBlockContainer';
import lowResImage from '../../pages/images/imageFon_comp.png';
import highResImage from '../../pages/images/imageFon.png';
import { Link } from 'react-router-dom';


const ApiBlock = () => {

    return (
        <section className={styles.apiBlock}>
            <div className={styles.apiBlock__header}>
                <div className={styles.apiBlock__headerTitle}>
                    Подключение личного кабинета{' '}
                    <span>
                        по API
                    </span>
                </div>
                <div className={styles.apiBlock__headerSubtitle}>
                    Получайте данные по всем вашим магазинам в режиме реального
                    времени в одном месте
                </div>
            </div>

            <div className={styles.apiBlock__advCard}>
                <div className={styles.apiBlock__advCardIcon}>
                    <img src={ligtning} />
                </div>
                <div className={styles.apiBlock__advCardTextWrapper}>
                    <div className={styles.apiBlock__advCardTitle}>Быстро</div>
                    <div className={styles.apiBlock__advCardSubtitle}>
                        Не успеете выпить
                        <br /> чашку кофе
                    </div>
                </div>
                <div className={styles.apiBlock__checkIconWrapper}>
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

            <div className={styles.apiBlock__advCard}>
                <div className={styles.apiBlock__advCardIcon}>
                    <img src={safety} />
                </div>
                <div className={styles.apiBlock__advCardTextWrapper}>
                    <div className={styles.apiBlock__advCardTitle}>Безопасно</div>
                    <div className={styles.apiBlock__advCardSubtitle}>
                        Мы обо всем <br />
                        позаботились
                    </div>
                </div>
                <div className={styles.apiBlock__checkIconWrapper}>
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

            <div className={styles.apiBlock__advCard}>
                <div className={`${styles.apiBlock__advCardIcon} ${styles.apiBlock__advCardIcon_mobile}`}>
                    <img src={bigData} />
                </div>

                <div className={styles.apiBlock__advCardTextWrapper}>
                    <div className={styles.apiBlock__advCardTitle}>
                        Большой объем данных{' '}
                    </div>
                    <div className={styles.apiBlock__advCardSubtitle}>Важных данных</div>
                </div>
                <div className={styles.apiBlock__checkIconWrapper}>
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


            {/* это картинка со слоом апи */}
            <div className={styles.apiBlock__image}>
            </div>

            <div className={styles.apiBlock__wrapper}>
                <ApiBlockContainer />
            </div>
            
            <div
                className={styles.apiBlock__lead}
                style={{
                  backgroundImage: `url(${highResImage})`,
                //   backgroundImage: `url(${isHighResLoaded ? highResImage : lowResImage
                //     })`,
                }}
            >
                <div className={styles.lead}>
                  <div className={styles.lead__header}>
                    <div className={styles.lead__fakeButton}>
                      <img
                        src={startAnalitic}
                        alt='start-analitic'
                      />
                    </div>
                    <Link className={styles.lead__arrowLink} to='/signup'>
                      <img
                        src={arrowLink}
                        alt='arrow-link'
                      />
                    </Link>
                  </div>

                  <div className={styles.lead__textWrapper}>
                    <div className={styles.lead__title}>Готовы начать?</div>
                    <div className={styles.lead__subtitle}>
                        Найдите прибыльные товары на маркетплейсе и развивайте свой
                        бизнес.
                    </div>
                  </div>

                  <Link className={styles.lead__textLink} to='/signup'>
                    Начать работать
                  </Link>
                </div>
            </div>
           
        </section >
    )
}

export default ApiBlock;