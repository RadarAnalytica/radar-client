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
                    {!isOpen &&
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 24V1" stroke="#5329FF" strokeWidth="2" strokeLinecap="round" />
                            <path d="M24 12.5L1 12.5" stroke="#5329FF" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    }
                    {isOpen &&
                        <svg width="25" height="3" viewBox="0 0 25 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 1.5L1 1.5" stroke="#5329FF" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    }
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
                                Мы развиваем партнерскую сеть и <b>предлагаем вам зарабатывать вместе с Радар-Аналитикой.</b> Получайте <b>до 1300</b> рублей за каждого привлеченного клиента, который зарегистрируется по вашей персональной ссылке. 
                            </p>

                            <p className={styles.banner__barText}>
                                <b>Прозрачные условия</b> – вы всегда видите результаты. <b>Еженедельные выплаты</b> – стабильный доход без задержек. <b>Легкий старт</b> – приглашайте друзей и зарабатывайте.
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