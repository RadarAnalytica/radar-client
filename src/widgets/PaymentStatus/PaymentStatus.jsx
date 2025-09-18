import styles from './PaymentStatus.module.css'
import classNames from 'classnames/bind'
import successImage from './success.png'
import failImage from './fail.png'
import { Link } from 'react-router-dom'

const Success = () => {
    return (
        <section className={`${styles.widget} ${styles.widget_success}`}>
            <div className={styles.widget_textBlock}>
                <h1 className={styles.widget__title}>Оплата прошла успешно!</h1>
                <p className={styles.widget__text}>Скоро вы будете перенаправлены на страницу сервиса</p>
            </div>
            <div className={styles.widget_imgWrapper}>
                <img src={successImage} alt="Payment Success" decoding='async' />
            </div>
        </section>
    )
}
const Fail = () => {
    return (
        <section className={`${styles.widget} ${styles.widget_fail}`}>
            <div className={styles.widget_textBlock}>
                <h1 className={styles.widget__title}>Что-то пошло не так!</h1>
                <p className={styles.widget__text}>Попробуйте вернуться и провести оплату еще раз</p>
                <div className={styles.widget_buttonWrapper}>
                    <Link
                        to='/main'
                        className={styles.widget__link}
                    >
                        Попробовать еще раз
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5391 1.03906L18.9999 9.49993L10.5391 17.9608" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.9999 9.5L1 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
            <div className={styles.widget_imgWrapper}>
                <img src={failImage} alt="Payment Fail" decoding='async' />
            </div>
        </section >
    )
}


export const PaymentStatus = Object.assign({ Success, Fail })