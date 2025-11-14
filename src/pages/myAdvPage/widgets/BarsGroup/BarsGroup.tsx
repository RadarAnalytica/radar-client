import React from 'react';
import { RadarBar } from '@/shared';
import styles from './BarsGroup.module.css';

interface BarsGroupProps {
  loading?: boolean;
}

const BarsGroup: React.FC<BarsGroupProps> = ({ loading = false }) => {
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
            <div className={styles.campaignBar__info}>
              <span className={styles.campaignBar__label}>Кампания</span>
              <span className={styles.campaignBar__value}>Название кампании</span>
            </div>
            <div className={styles.campaignBar__info}>
              <span className={styles.campaignBar__label}>Запущена</span>
              <span className={styles.campaignBar__value}>Да</span>
            </div>
            <div className={styles.campaignBar__info}>
              <span className={styles.campaignBar__label}>Ручная</span>
              <span className={styles.campaignBar__value}>Да</span>
            </div>
            <div className={styles.campaignBar__info}>
              <span className={styles.campaignBar__label}>Создана</span>
              <span className={styles.campaignBar__value}>01.01.2024</span>
            </div>
            <div className={styles.campaignBar__info}>
              <span className={styles.campaignBar__label}>ID на WB</span>
              <span className={styles.campaignBar__value}>123456</span>
            </div>
          </div>
          <div className={styles.campaignBar__center}>
            <span className={styles.campaignBar__budgetLabel}>Бюджет</span>
            <span className={styles.campaignBar__budgetValue}>1000₽</span>
          </div>
          <div className={styles.campaignBar__right}>
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
          mainValue="> 100%"
          mainValueUnits=""
          isLoading={loading}
        />
      </div>

      {/* Two bars side by side */}
      <div className={styles.productBars}>
        {/* 10 bar - Product with images */}
        <div className={styles.productBar}>
          <div className={styles.productBar__gallery}>
            <div className={styles.productBar__mainImage}>
              <img src="https://via.placeholder.com/138x182" alt="Product" />
            </div>
            <div className={styles.productBar__imageList}>
              <img src="https://via.placeholder.com/39x54" alt="Product" />
              <img src="https://via.placeholder.com/39x54" alt="Product" />
              <img src="https://via.placeholder.com/39x54" alt="Product" />
            </div>
          </div>
          <div className={styles.productBar__info}>
            <h3 className={styles.productBar__title}>
              Декоративные блестки синие блестящие в упаковке
            </h3>
            <div className={styles.productBar__prices}>
              <div className={styles.productBar__priceItem}>
                <span className={styles.productBar__priceLabel}>Цена реализации</span>
                <span className={styles.productBar__priceValue}>350₽</span>
              </div>
              <div className={styles.productBar__priceItem}>
                <span className={styles.productBar__priceLabel}>В поиске (CPM)</span>
                <span className={styles.productBar__priceValue}>600₽</span>
              </div>
              <div className={styles.productBar__priceItem}>
                <span className={styles.productBar__priceLabel}>В рекомендациях (CPM)</span>
                <span className={styles.productBar__priceValue}>300₽</span>
              </div>
            </div>
          </div>
        </div>

        {/* 11 bar - Product details split in half */}
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
              <span className={styles.detailsBar__value}>4.9 / Отзывы 19</span>
            </div>
          </div>
          <div className={styles.detailsBar__divider}></div>
          <div className={styles.detailsBar__right}>
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
      </div>
    </div>
  );
};

export default BarsGroup;

