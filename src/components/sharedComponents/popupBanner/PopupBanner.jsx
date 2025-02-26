import React, { useState } from "react";
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
    description?: string,
    steps?: {
        stepsTitle: string,
        stepsArray: string[]
    }
    
}
    ------------------------
 */



const PopupBanner = ({ mainTitle, mainSubtitle, offerTitle, offerSubtitle, description, steps }) => {

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
                        </p> : ''
                    }

                    {steps &&
                        <div className={styles.banner__steps}>
                            {steps.stepsTitle && <p className={styles.banner__stepsTitle}>{steps.stepsTitle}</p>}
                            <ul className={styles.banner__stepsList}>
                                {steps.stepsArray && steps.stepsArray.map((i, id) =>
                                    <li className={styles.banner__stepsListItem} key={id}>
                                        {i}
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default PopupBanner;