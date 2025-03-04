import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './BottomNavigation.module.css';


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


const BottomNavigation = ({ isStaticPosition = false }) => {

  const { pathname } = useLocation()
  const [ isMenuVisible, setIsMenuVisible ] = useState(false)
  const mainLinksArr = menuItemsArray.filter(_ => _.position === 'main')
  const secondaryLinksArr = menuItemsArray.filter(_ => _.position === 'secondary')
  const [ mainLinksList, setMainListLinks ] = useState(mainLinksArr)
  const [ menuLinksList, setMenuListLinks ] = useState(mainLinksArr)
  const isSecondaryLocation = secondaryLinksArr.some(_ => _.path === pathname)
  return (
    <>
    {window.screen.width >= 1470 ? 
      <div className={isStaticPosition ? styles.bottomNavigationStatic : styles.bottomNavigation}>
        <div className={styles.bNav__costil}></div>
        <div className={styles.bNav__menuItemsWrapper}>
          {menuItemsArray.map((i, id) => 
            <Link 
              to={i.path} 
              key={id}
              className={i.path === pathname ? styles.navItemActive : styles.navItem}
            >
              {i.title}
            </Link>
          )}
          </div>
      </div>
    :
    <div className={isStaticPosition ? styles.bottomNavigationStatic : styles.bottomNavigation}>
      {mainLinksArr.map((i, id) => 
        <Link 
          to={i.path} 
          key={id}
          className={i.path === pathname ? styles.navItemActive : styles.navItem}
        >
          {i.title}
        </Link>
      )}

      <button className={isSecondaryLocation ? styles.bNav__menuButtonActive : styles.bNav__menuButton} onClick={() => {setIsMenuVisible(true)}}>
          <span className={styles.bNav__menuDot}></span>
          <span className={styles.bNav__menuDot}></span>
          <span className={styles.bNav__menuDot}></span>
      </button>

      {isMenuVisible &&
        <div className={styles.bNav__menu} onClick={() => {setIsMenuVisible(false)}}>
          <div className={styles.bNav__menuBar}>
          {secondaryLinksArr.map((i, id) => 
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
  }
</>
);
};

export default BottomNavigation;
