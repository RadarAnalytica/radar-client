import styles from './mobilePlug.module.css'
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import cover from '../../../assets/mobile_plug_cover.png'

const MobilePlug = () => {

    const { userAgent } = navigator;
    const deviceRegexp = /android|iphone|kindle|ipad/i

    const getPlugStyles = () => {
        const body = document.querySelector('body');
        if (deviceRegexp.test(userAgent)) {
            if (body) {body.style.overflow = 'hidden'}
            return styles.plug
        }
        if (body) {body.style.overflow = 'auto'}
        return styles.plug_hidden
    }

    return (
        <div className={getPlugStyles()}>
            <Link to='/main' className={styles.plug__mainLink}>
                <img src={logo} alt='' />
            </Link>
                <p className={styles.plug__title}>
                    Сервис «Радар–Аналитика»
                    <span> недоступен для телефона или планшета.</span>
                </p>
                <div className={styles.plug__coverWrapper}>
                    <img src={cover} alt='' />
                </div>
                <div className={styles.plug__bar}>
                    Пожалуйста, возвращайтесь к&nbsp;нам с&nbsp;компьютера 
                </div>
        </div>
    )
}

export default MobilePlug;