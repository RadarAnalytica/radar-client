import { useState } from 'react';
import styles from './InfoSeoPlate.module.css';
import cursor from '../assets/cursor.svg';
import mash from '../assets/mash.svg';
import fairystick from '../assets/fairystick.svg';
import linkchain from '../assets/linkchain.svg';

const InfoSeoPlate = () => {
    const [groupAInput, setGroupAInput] = useState('');
    const [groupBInput, setGroupBInput] = useState('');

    const processGroupInput = (input) => {
        return input.split('\n').filter(item => item.trim() !== '');
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const processedGroupA = processGroupInput(groupAInput);
        const processedGroupB = processGroupInput(groupBInput);
        
        // Prepare data for backend
        const dataToSend = {
          groupA: processedGroupA,
          groupB: processedGroupB,
        };
      
        // Send dataToSend to backend
        console.log('Data to send:', dataToSend);
      };

  return (
    <>
      <div className={styles.infoSeoPlateBox}>
        <div className={styles.infoTitle}>
          <img src={cursor} alt='Cursor' />
          <span>Чем поможет этот инструмент</span>
        </div>
        <div className={styles.infoBody}>
          <div className={styles.infoBodyText}>
            <span>
              Найдем все запросы, в которых товары их двух групп показывались
              последние 30 дней. Покажем, какие из запросов пересекаются, а
              какие уникальны для группы. Что можно делать с помощью этого
              интрумента:
            </span>
          </div>
          <div className={styles.infoBodyBox}>
            <div className={styles.infoBodyBoxItem}>
              <img src={mash} alt='Mash' />
              <span>Сравните свои поисковые запросы с конкурентами</span>
            </div>
            <div className={styles.infoBodyBoxItem}>
              <img src={fairystick} alt='Fairystick' />
              <span>
                Подберите уникальные запросы для
                <br /> карточки и продвижения
              </span>
            </div>
            <div className={styles.infoBodyBoxItem}>
              <img src={linkchain} alt='Linkchain' />
              <span>
                Определите недостающие ключевые
                <br /> слова в своих карточках
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.infoSeoGroupWrapper}>
        <span className={styles.infoSeoGroupTitle}>
          Добавление группы товаров
        </span>
        <form onSubmit={handleSubmit}>
        <div className={styles.groupBox}>
          <div className={styles.groupBoxTitle}>Группа А</div>
          <textarea
            placeholder=' Введите до 1000 названий товаров или ссылок на них.

            Пример:

            https://www.wildberries.ru/catalog/177307535

            https://www.wildberries.ru/catalog/177307899'
            rows={6}
            className={styles.groupTextarea}
            onChange={(e) => setGroupAInput(e.target.value)}
          />
        </div>
        <div className={styles.groupBox}>
          <div className={styles.groupBoxTitle}>Группа B</div>
          <textarea
            placeholder=' Введите до 1000 названий товаров или ссылок на них.

Пример:

https://www.wildberries.ru/catalog/177307535

https://www.wildberries.ru/catalog/177307899'
            rows={6}
            className={styles.groupTextarea}
            onChange={(e) => setGroupBInput(e.target.value)}
          />
        </div>
       
        <div>
            <button type="submit" className={styles.getReportBtn}>Получить отчет</button>
        </div> 
        </form>
      </div>
    </>
  );
};

export default InfoSeoPlate;
