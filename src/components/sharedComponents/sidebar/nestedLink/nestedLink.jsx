import { useState, useEffect } from 'react';
import NavLink from '../navLink/navLink';
import { useLocation } from 'react-router-dom';
import styles from './nestedLink.module.css'

const finReportsUrls = [
    '/weeklyreport-dashboard',
    '/weeklyreport-pl',
    '/weeklyreport-month',
    '/weeklyreport-goods',
    '/abc-data-reports',
    '/weeklyreport-penalties',
    '/schedule',
    '/prime-cost',
    '/buy-back',
    '/external-expenses'
]

const NestedLink = ({ title, icon, links, isMenuHidden }) => {
    const { pathname } = useLocation()
    const [isInList, setIsInList] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        let timeout;
        if (isMenuHidden) {
            setIsOpen(false)
        }
        if (!isMenuHidden && isInList) {
            timeout = setTimeout(() => setIsOpen(true), 100)
        }

        return () => {timeout && clearTimeout(timeout)}
    }, [isMenuHidden, isInList])

    useEffect(() => {
        let isInList;
        isInList = links.some(_ => _.url === pathname && pathname !== '/main');
        console.log(isInList)
        if (!isInList && title === 'Мои финансы' && finReportsUrls.some(_ => _ === pathname) && pathname !== '/main') {
            console.log(pathname)
            isInList = true;
        }
        setIsInList(isInList)
    }, [pathname, links])

    return (
        <div className={isMenuHidden ? `${styles.nested} ${styles.nested_hidden}` : styles.nested}>
            {isMenuHidden &&
                <div
                    className={isInList ? `${styles.nested__iconWrapper} ${styles.nested__iconWrapper_active}` : styles.nested__iconWrapper}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {icon}
                </div>
            }
            {!isMenuHidden &&
                <div className={isOpen || isInList ? `${styles.nested__header} ${styles.nested__header_active}` : styles.nested__header} onClick={() => { setIsOpen(!isOpen) }}>

                    <div className={styles.nested__titleWrapper}>
                        <div className={styles.nested__fullMenuIconWrapper}>
                            {icon}
                        </div>
                        <p className={isOpen || isInList ? `${styles.nested__menuTitle} ${styles.nested__menuTitle_active}` : styles.nested__menuTitle}>{title}</p>
                    </div>
                    <svg width="10" height="10" viewBox="0 0 15 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={isOpen ? `${styles.nested__marker} ${styles.nested__marker_open}` : styles.nested__marker}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.879 8.9142C13.4885 9.30472 12.8553 9.30472 12.4648 8.9142L7.17188 3.62131L1.87898 8.9142C1.48846 9.30472 0.855292 9.30472 0.464768 8.9142C0.0742435 8.52367 0.0742435 7.89051 0.464768 7.49999L7.17188 0.792878L13.879 7.49999C14.2695 7.89051 14.2695 8.52367 13.879 8.9142Z" />
                    </svg>
                </div>}

            <div className={isOpen ? `${styles.nested__body} ${styles.nested__body_open}` : styles.nested__body}>
                {links.map((i, id) => {
                    return i.isActive && (
                        <NavLink url={i.url} title={i.label} key={id} />
                    )
                })}
            </div>
        </div>
    )
}

export default NestedLink;