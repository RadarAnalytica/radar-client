import styles from './extensionScreen.module.css'
import { Link } from 'react-router-dom'
import image from './assets/Image.png'

export const ExtensionScreen = () => {

    return (
        <section className={styles.screen}>
            <div className={styles['screen__mainWrapper']}>
                <h2
                    className={styles.screen__title}
                >
                    Бесплатное расширение
                </h2>

                <div className={styles['screen__block']}>
                    <div className={styles['screen__blockBg']}></div>

                    <div className={styles['screen__textColumn']}>
                        <h3
                            className={styles.screen__heading}
                        >
                            Мгновенный доступ к данным, которые помогают зарабатывать больше
                        </h3>
                        <div
                            style={{ maxWidth: 500 }}
                        >
                            <p className={styles.screen__text}>
                                Полная аналитика по товарам, продажам и&nbsp;конкурентам — там, где вы работаете
                            </p>
                        </div>

                        <div
                            className={styles['screen__bttnWrapper']}
                        >
                            <Link
                                className={styles.screen__link}
                                to='https://chromewebstore.google.com/detail/radar-%E2%80%93-%D0%B1%D0%B5%D1%81%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D1%82/haelmohfdnapjehnhgncjdnjmchdahhb?pli=1'
                                target='_blank'
                            >
                                Подробнее о плагине
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5391 1.53906L18.9999 9.99993L10.5391 18.4608" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.9999 10L1 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>



                    <div className={styles['screen__imgWrapper']}>
                        <img src={image} alt='обложка блока' className={styles['screen__image']} loading='lazy' decoding='async' />
                    </div>
                </div>


            </div>
        </section>
    )
}