import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from './PopupBanner.module.css'


/**
 * 
 * 
 --- expected this props ----
 type TProps = {
    mainTitle?: string,
    mainSubtitle?: string,
    offerTitle?: string,
    offerSubtitle?: string,
    sideBarText?: string
    
}
    ------------------------
 */



const PopupBanner = ({ mainTitle, mainSubtitle, offerTitle, offerSubtitle, description, sideBarText }) => {

    const [isOpen, setIsOpen] = useState(false) //boolean

    return (
        <div className={styles.banner} onClick={() => { setIsOpen(!isOpen) }}>
            <div className={styles.banner__head}>
                <div className={styles.banner__infoWrapper}>
                    <div className={styles.banner__offerBlock}>
                        {offerSubtitle && <p className={styles.banner__offerSubtitle}>{offerSubtitle}</p>}
                        {offerTitle && <p className={styles.banner__offerTitle}>{offerTitle}</p>}
                    </div>
                    <div className={styles.banner__titleBlock}>
                        {mainTitle && <p className={styles.banner__mainTitle}>{mainTitle}</p>}
                        {mainSubtitle && <p className={styles.banner__mainSubitle}>{mainSubtitle}</p>}
                    </div>
                </div>

                <button className={styles.banner__button}>
                    {!isOpen && 'Подробнее'}
                    {isOpen && 'Скрыть'}
                </button>
            </div>



            {isOpen &&
                <div className={styles.banner__body}>
                    {description ?
                        <p className={styles.banner__description}>
                            {description}
                        </p> 
                        :
                        
                        <div className={styles.banner__bar}>
                            <p className={styles.banner__barText}>
                                Мы развиваем партнерскую сеть и <b>предлагаем вам зарабатывать вместе с&nbsp;Радар-Аналитикой.</b> Получайте <b>до 1300</b> рублей за&nbsp;каждого привлеченного клиента, который зарегистрируется по&nbsp;вашей персональной ссылке. 
                            </p>

                            <p className={styles.banner__barText}>
                                <b>Прозрачные условия</b> – вы всегда видите результаты.<br/><b>Еженедельные выплаты</b> – стабильный доход без задержек.<br/><b>Легкий старт</b> – приглашайте друзей и зарабатывайте.
                            </p>
                        </div>
                    }


                        <div className={styles.banner__steps}>
                            {sideBarText && <p className={styles.banner__sidebarText}>{sideBarText}</p>}
                            <Link
                                className={styles.banner__tgLink}
                                to='https://t.me/radar_analytica_support'
                                target="blank"
                            >
                                Написать в Telegram
                            </Link>
                        </div>
                </div>
            }
        </div>
    )
}

export default PopupBanner;