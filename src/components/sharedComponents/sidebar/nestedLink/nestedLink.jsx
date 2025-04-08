import { useState, useEffect } from 'react';
import NavLink from '../navLink/navLink';
import { useLocation } from 'react-router-dom';
import styles from './nestedLink.module.css'

const NestedLink = ({ title, icon, links, isMenuHidden }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        if (isMenuHidden) {
            setIsOpen(false)
        }
    }, [isMenuHidden])

    useEffect(() => {
        const isInList = links.some(_ => pathname.substring(1) === _.url);
        if (isInList) {
            setIsOpen(true)
        }
    }, [pathname])

    return (
        <div className={styles.nested}>
             {isMenuHidden &&
                <div className={styles.nested__iconWrapper}>
                    {icon}
                </div>
             }
            {!isMenuHidden &&
                <div className={styles.nested__header} onClick={() => { setIsOpen(!isOpen) }}>

                    <div className={styles.nested__titleWrapper}>
                        {icon}
                        {title}
                    </div>
                    <svg width="10" height="10" viewBox="0 0 15 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={isOpen ? `${styles.nested__marker} ${styles.nested__marker_open}` : styles.nested__marker}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.879 8.9142C13.4885 9.30472 12.8553 9.30472 12.4648 8.9142L7.17188 3.62131L1.87898 8.9142C1.48846 9.30472 0.855292 9.30472 0.464768 8.9142C0.0742435 8.52367 0.0742435 7.89051 0.464768 7.49999L7.17188 0.792878L13.879 7.49999C14.2695 7.89051 14.2695 8.52367 13.879 8.9142Z" />
                    </svg>
                </div>}

            <div className={isOpen ? `${styles.nested__body} ${styles.nested__body_open}` : styles.nested__body}>
                {links.map((i, id) => {
                    return (
                        <NavLink url={i.url} title={i.label} key={id} />
                    )
                })}
            </div>
        </div>
    )
}

export default NestedLink;