import React, { useState } from 'react';
import { RadarBar } from '@/shared';
import styles from './BarsGroup.module.css';
import image1 from './assets/1.jpg';
import image2 from './assets/2.jpg';
import image3 from './assets/3.jpg';
import image4 from './assets/4.jpg';
import image5 from './assets/5.jpg';

interface BarsGroupProps {
  loading?: boolean;
}

const BarsGroup: React.FC<BarsGroupProps> = ({ loading = false }) => {
  const [images, setImages] = useState([image1, image2, image3, image4, image5]);
  const [currentImage, setCurrentImage] = useState(image1);
  
  const handleRefresh = () => {
    // TODO: Implement refresh logic
    console.log('Refresh clicked');
  };

  return (
    <div className={styles.barsGroup}>
      {/* 1 bar - Full width with campaign info, budget, and refresh button */}
      <div className={styles.fullWidthBar}>
        <div className={styles.campaignBar}>
          <div className={styles.campaignBar__left}>
            <div className={styles.campaignBar__left__title}>
              Кампания
            </div>
            <div className={styles.campaignBar__left__content}>
              <div className={`${styles.campaignBar__badge} ${styles.campaignBar__status}`}>Запущена</div>
              <div className={`${styles.campaignBar__badge} ${styles.campaignBar__type}`}>Ручная</div>
              <div className={styles.campaignBar__created}>
                <span className={styles.campaignBar__label}>Создана:</span>
                <span className={styles.campaignBar__value}>01.01.2024</span>
              </div>
              <div className={styles.campaignBar__id}>
                <span className={styles.campaignBar__label}>ID на WB</span>
                <span className={styles.campaignBar__value}><a href="https://www.wildberries.ru/catalog/123456/detail.aspx" target="_blank">123456</a></span>
              </div>
            </div>
          </div>
          <div className={styles.campaignBar__right}>
            <div className={styles.campaignBar__budget}>
              <span className={styles.campaignBar__budget__label}>Бюджет</span>
              <span className={styles.campaignBar__budget__value}>1000₽</span>
            </div>
            <button className={styles.refreshButton} onClick={handleRefresh}>
              Обновить
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 8 bars - 4 columns, 2 rows */}
      <div className={styles.metricsGrid}>
        <RadarBar
          title="Просмотры"
          mainValue={10000}
          mainValueUnits=""
          isLoading={loading}
        />
        <RadarBar
          title="Клики"
          mainValue={100}
          mainValueUnits=""
          isLoading={loading}
        />
        <RadarBar
          title="CTR"
          mainValue={10}
          mainValueUnits="%"
          isLoading={loading}
        />
        <RadarBar
          title="CPC"
          mainValue={10}
          mainValueUnits="%"
          isLoading={loading}
        />
        <RadarBar
          title="Расходы"
          mainValue={1000}
          mainValueUnits="₽"
          isLoading={loading}
        />
        <RadarBar
          title="Корзина"
          mainValue={10}
          mainValueUnits="шт"
          isLoading={loading}
        />
        <RadarBar
          title="Заказы"
          mainValue={10}
          mainValueUnits="шт"
          isLoading={loading}
        />
        <RadarBar
          title="ДРР заказы"
          mainValuePrefix=">"
          mainValue={100}
          mainValueUnits="%"
          isLoading={loading}
        />
      </div>

      {/* <div className={styles.productBars}>
        <div className={styles.productBar}>
          <div className={styles.productBar__gallery}>
            <div className={styles.productBar__mainImage}>
              <img src={currentImage} alt="Product" />
            </div>
            <div className={styles.productBar__imageList}>
              {images.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt="Product" 
                  onClick={() => setCurrentImage(image)} 
                  role="button"
                />
              ))}
            </div>
          </div>
          <div className={styles.productBar__info}>
            <h3 className={styles.productBar__title}>
              Декоративные блестки синие блестящие в упаковке
            </h3>
            <div className={styles.productBar__prices}>
              <div className={styles.productBar__priceItem}>
                <span className={styles.productBar__priceLabel}>Цена реализации</span>
                <span className={styles.productBar__priceValue}>350 ₽</span>
              </div>
              <div className={styles.productBar__priceItem}>
                <span className={styles.productBar__priceLabel}>В поиске (CPM)</span>
                <span className={styles.productBar__priceValue}>600 ₽</span>
              </div>
              <div className={styles.productBar__priceItem}>
                <span className={styles.productBar__priceLabel}>В рекомендациях (CPM)</span>
                <span className={styles.productBar__priceValue}>300 ₽</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.detailsBar}>
          <div className={styles.detailsBar__left}>
            <div className={styles.detailsBar__item}>
              <span className={styles.detailsBar__label}>Артикул</span>
              <span className={styles.detailsBar__value}>4783009</span>
            </div>
            <div className={styles.detailsBar__item}>
              <span className={styles.detailsBar__label}>Предмет</span>
              <span className={styles.detailsBar__value}>Глиттеры</span>
            </div>
            <div className={styles.detailsBar__item}>
              <span className={styles.detailsBar__label}>Оценка</span>
              <span className={styles.detailsBar__value}>4.9</span>
            </div>
          </div>
          <div className={styles.detailsBar__right}>
          <div className={styles.detailsBar__item}>
              <span className={styles.detailsBar__label}>Отзывы</span>
              <span className={styles.detailsBar__value}>19</span>
            </div>
            <div className={styles.detailsBar__item}>
              <span className={styles.detailsBar__label}>Остатки</span>
              <span className={styles.detailsBar__value}>20 шт</span>
            </div>
            <div className={styles.detailsBar__item}>
              <span className={styles.detailsBar__label}>Акция</span>
              <span className={styles.detailsBar__value}>Название акции</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BarsGroup;

