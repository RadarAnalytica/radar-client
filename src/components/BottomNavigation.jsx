import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './BottomNavigation.module.css';
import { useAppSelector } from '../redux/hooks';


const menuItemsArray = [
  {path: '/report-main', title: 'Главная', position: 'main'},
  {path: '/weeklyreport-dashboard', title: 'Дашборд', position: 'main'},
  {path: '/weeklyreport-pl', title: 'P&L', position: 'main'},
  {path: '/weeklyreport-month', title: 'По месяцам', position: 'main'},
  {path: '/weeklyreport-goods', title: 'По товарам', position: 'main'},
  {path: '/abc-data-reports', title: 'ABC-анализ', position: 'secondary'},
  {path: '/weeklyreport-penalties', title: 'Штрафы', position: 'secondary'},
  {path: '/schedule', title: 'Графики', position: 'secondary'},
  {path: '/prime-cost', title: 'Себестоимость', position: 'secondary'},
  {path: '/buy-back', title: 'Самовыкупы', position: 'secondary'},
  {path: '/external-expenses', title: 'Внешние расходы', position: 'secondary'},
]


const BottomNavigation = () => {

  const ref = useRef(null)
  const { isSidebarHidden } = useAppSelector(store => store.utils)
  const { pathname } = useLocation()
  const [ isMenuVisible, setIsMenuVisible ] = useState(false)
  const [ mainLinksList, setMainListLinks ] = useState([])
  const [ menuLinksList, setMenuListLinks ] = useState([])
  const isSecondaryLocation = menuLinksList?.some(_ => _.path === pathname)
  const [ menuWidth, setMenuWidth ] = useState(window.innerWidth)


  useEffect(() => {
    setMenuWidth(ref.current.offsetWidth)
    const handleResize = () => {
      let width = menuWidth
      if (ref && ref.current && ref.current.offsetWidth) {
        width = ref.current.offsetWidth
      }
      setMenuWidth(width)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  useEffect(() => {
    if (!isSidebarHidden) {
      setMenuWidth(ref.current.offsetWidth - 200)
    } else {
      setMenuWidth(ref.current.offsetWidth + 200)
    }
  }, [isSidebarHidden])


  useEffect(() => {
    const index = Math.floor(menuWidth / 120);
    const tempArray = [...menuItemsArray]
    let menuArr = []
    let mainArr = []

    if (index < menuItemsArray.length) {
      mainArr = tempArray.slice(0, index)
      menuArr = tempArray.slice(index)
    } else {
      mainArr = tempArray
    }
      setMainListLinks(mainArr)
      setMenuListLinks(menuArr)
  }, [menuWidth])

  return (
    <>
    <div className={styles.bottomNavigation}>
      <div className={isSidebarHidden ? `${styles.bNav__costil} ${styles.bNav__costil_thin}` : styles.bNav__costil}></div>
      <div className={styles.bNav__menuItemsWrapper} ref={ref}>
      {mainLinksList?.map((i, id) => 
        <Link 
          to={i.path} 
          key={id}
          className={i.path === pathname ? styles.navItemActive : styles.navItem}
        >
          {i.title}
        </Link>
      )}

        {menuLinksList && menuLinksList.length > 0 && <button className={isSecondaryLocation ? styles.bNav__menuButtonActive : styles.bNav__menuButton} onClick={() => {setIsMenuVisible(true)}}>
            <span className={styles.bNav__menuDot}></span>
            <span className={styles.bNav__menuDot}></span>
            <span className={styles.bNav__menuDot}></span>
        </button> }

      {isMenuVisible &&
        <div className={styles.bNav__menu} onClick={() => {setIsMenuVisible(false)}}>
          <div className={styles.bNav__menuBar}>
          {menuLinksList?.map((i, id) => 
            <Link 
              to={i.path} 
              key={id + 1}
              className={i.path === pathname ? styles.navItemActive : styles.navItem}
              onClick={() => {setIsMenuVisible(false)}}
            >
              {i.title}
            </Link>
          )}
          </div>
        </div>
      }
      </div>
    </div>
</>
);
};

export default BottomNavigation;
