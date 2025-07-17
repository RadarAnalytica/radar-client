import styles from './banner.module.css'
import pic from './assets/board.png'
import tgs from './assets/tgs.png'
import { Link } from 'react-router-dom'

const Top = () => {

    return (
        <div className={styles.topWrapper}>
            <div className={styles.textWrapper}>
                <p className={styles.title}>Не разобрались с платформой или не уверены, с чего начать?</p>
                <p className={styles.text}>Проведём персональную демонстрацию Радар Аналитики в течение часа после обращения. Оставьте заявку.</p>
            </div>

            <div className={styles.buttonWrapper}>
                <button className={styles.button}>
                    Получить консультацию
                </button>
                <img src={pic} alt='' width={124} height={124} />
            </div>
        </div>
    )
}

const Bottom = () => {

    return (
        <div className={styles.bottomWrapper}>
            <div className={styles.bottomContainer}>
                <div className={styles.bottomImgWrapper}>
                    <img src={tgs} alt='' />
                </div>
                <div className={`${styles.textWrapper} ${styles.textWrapperBottom}`}>
                    <p className={styles.title}>Не разобрались с платформой или не уверены, с чего начать?</p>
                    <p className={styles.text}>Проведём персональную демонстрацию Радар Аналитики в течение часа после обращения. Оставьте заявку.</p>
                </div>
            </div>
            <div className={`${styles.buttonWrapper} ${styles.buttonWrapperBottom}`}>
                <Link className={styles.button} to='https://t.me/radar_analytica_support' target='_blank'>
                    Перейти
                </Link>
            </div>
        </div>
    )
}









export const Banner = Object.assign({ Top, Bottom })