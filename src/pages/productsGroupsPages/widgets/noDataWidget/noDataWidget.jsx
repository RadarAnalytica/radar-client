import React from 'react'
import styles from './noDataWidget.module.css'
import HowToLink from '../../../../components/sharedComponents/howToLink/howToLink'

const NoDataWidget = ({ type = 'group', mainTitle, mainText, buttonTitle, action }) => {

    return (
        <div className={styles.widget}>
            <div className={styles.widget__howtoWrapper}>
                <HowToLink
                    text='Как использовать?'
                    target='_blank'
                    url='https://radar.usedocs.com/article/76887'
                />
            </div>
            <div className={styles.widget__barWrapper}>
                <div className={type === 'group' ? styles.widget__bar : styles.widget__bar_sku}>
                    <svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" width="60" height="60" rx="10" fill="#5329FF" fillOpacity="0.15" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.8563 25.0619C17.6285 21.4158 20.5241 18.3335 24.1773 18.3335H29.8336C31.4904 18.3335 32.8336 19.6766 32.8336 21.3335C32.8336 21.8858 33.2813 22.3335 33.8336 22.3335H36.9621C40.5187 22.3335 43.3253 25.3499 43.0755 28.8921V30.6668C43.0755 30.7883 43.0539 30.9046 43.0142 31.0123C43.5634 31.9804 43.7132 33.1823 43.2775 34.3498C43.2774 34.3501 43.2773 34.3504 43.2772 34.3507L41.7848 38.3498C41.7653 38.402 41.7415 38.4524 41.7136 38.5006C40.6154 40.4004 38.5611 41.6668 36.2281 41.6668H24.844C22.5087 41.6668 20.4558 40.3987 19.3585 38.5007C18.8825 37.6774 18.5859 36.7354 18.523 35.7286L17.8563 25.0619ZM24.844 39.6668H36.2281C37.7944 39.6668 39.1794 38.8328 39.9418 37.568L41.4034 33.6514C41.4035 33.6511 41.4036 33.6508 41.4037 33.6505C41.8827 32.3672 40.9337 31.0002 39.5639 31.0002H34.5276C32.8483 31.0002 31.5709 29.4922 31.847 27.8358C31.9199 27.3983 31.5826 27.0002 31.1391 27.0002H26.898C24.8271 27.0002 23.0489 28.4728 22.6631 30.5074L22.3446 32.1865L22.3403 32.208L21.6053 35.6679C21.1678 37.7274 22.7385 39.6668 24.844 39.6668ZM33.8198 28.1646C33.7469 28.602 34.0842 29.0002 34.5276 29.0002H39.5639C40.1055 29.0002 40.6144 29.106 41.0755 29.2957V28.8553C41.0755 28.8297 41.0765 28.8042 41.0785 28.7786C41.2629 26.3808 39.367 24.3335 36.9621 24.3335H33.8336C32.1767 24.3335 30.8336 22.9904 30.8336 21.3335C30.8336 20.7812 30.3859 20.3335 29.8336 20.3335H24.1773C21.6778 20.3335 19.6965 22.4424 19.8524 24.9371L20.3043 32.1672L20.3817 31.8031L20.6981 30.1347C21.263 27.1561 23.8663 25.0002 26.898 25.0002H31.1391C32.8184 25.0002 34.0958 26.5081 33.8198 28.1646Z" fill="#5329FF" />
                    </svg>

                    <div className={styles.widget__textWrapper}>
                        <h2 className={styles.widget__title}>{mainTitle}</h2>
                        <p className={styles.widget__subtitle}>{mainText}</p>
                    </div>

                    <button className={styles.widget__createButton} onClick={action}>{buttonTitle}</button>
                </div>
            </div>
        </div>
    )
}

export default NoDataWidget;