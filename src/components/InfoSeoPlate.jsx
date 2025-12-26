import { useState, useContext, useEffect } from 'react';
import styles from './InfoSeoPlate.module.css';
import cursor from '../assets/cursor.svg';
import mash from '../assets/mash.svg';
import fairystick from '../assets/fairystick.svg';
import linkchain from '../assets/linkchain.svg';
import AuthContext from '../service/AuthContext';
import { ServiceFunctions } from '../service/serviceFunctions';
import { useDemoMode } from "@/app/providers";

const InfoSeoPlate = ({ setCompaireData, setLinksToSend }) => {
  const { authToken } = useContext(AuthContext);
 
  const [isLoading, setIsLoading] = useState(false);
  const { isDemoMode } = useDemoMode();



  return (
    <>
      {!isLoading && (
        <>
          <div className={styles.infoSeoPlateBox}>
            <div className={styles.infoTitle}>
              <img src={cursor} alt='Cursor' />
              <span>Чем поможет этот инструмент</span>
            </div>
            <div className={styles.infoBody}>
              <div className={styles.infoBodyText}>
                <span>
                  Найдем все запросы, в которых товары из двух групп
                  показывались последние 30 дней. Покажем, какие из запросов
                  пересекаются, а какие уникальны для группы. Что можно делать с
                  помощью этого инструмента:
                </span>
              </div>
              <div className={styles.infoBodyBox}>
                <div className={styles.infoBodyBoxItem}>
                  <img src={mash} alt='Mash' />
                  <span>Сравнить свои поисковые запросы с конкурентами</span>
                </div>
                <div className={styles.infoBodyBoxItem}>
                  <img src={fairystick} alt='Fairystick' />
                  <span>
                    Подобрать уникальные запросы для карточки и продвижения
                  </span>
                </div>
                <div className={styles.infoBodyBoxItem}>
                  <img src={linkchain} alt='Linkchain' />
                  <span>
                    Определить недостающие ключевые слова в своих карточках
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {isLoading && (
        <div
          style={{
            minHeight: '85vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className='loader'></div>
        </div>
      )}
    </>
  );
};

export default InfoSeoPlate;
