import React, { useState } from 'react';
import { RadarBar } from '@/shared';
import styles from './BarsGroup.module.css';
import { CompanyData } from '../../data/mockData';
import { format } from 'date-fns';
import { formatPrice } from '@/service/utils';

interface BarsGroupProps {
  data: CompanyData;
  loadData: () => void;
  loading?: boolean;
}

const BarsGroup: React.FC<BarsGroupProps> = ({ data = {}, loadData, loading = false }) => {
  const adSpend = data?.ad_spend || data?.ad_spend_stored;

  return (
    <div className={styles.barsGroup}>
      <div className={styles.fullWidthBar}>
        <div className={styles.campaignBar}>
          <div className={styles.campaignBar__left}>
            <div className={styles.campaignBar__left__title}>
              {data.company_name}
            </div>
            <div className={styles.campaignBar__left__content}>
              <div className={`${styles.campaignBar__badge} ${styles.campaignBar__status} ${data.company_status === 'Активна' ? styles.campaignBar__status_active : data.company_status === 'На паузе' ? styles.campaignBar__status_paused : styles.campaignBar__status_completed}`}>{data.company_status}</div>
              <div className={`${styles.campaignBar__badge} ${styles.campaignBar__type}`}>{data.company_type}</div>
              <div className={styles.campaignBar__created}>
                <span className={styles.campaignBar__label}>Создана:</span>
                <span className={styles.campaignBar__value}>{data?.company_start_date && format(data?.company_start_date, 'dd.MM.yyyy')}</span>
              </div>
              {/* <div className={styles.campaignBar__id}>
                <span className={styles.campaignBar__label}>ID на WB</span>
                <span className={styles.campaignBar__value}><a href={`https://www.wildberries.ru/catalog/${data.company_id}/detail.aspx`} target="_blank">{data.company_id}</a></span>
              </div> */}
            </div>
          </div>
          <div className={styles.campaignBar__right}>
            <div className={styles.campaignBar__budget}>
              <span className={styles.campaignBar__budget__label}>Бюджет</span>
              <span className={styles.campaignBar__budget__value}>{adSpend ? `${formatPrice(adSpend, '₽')}` : '-'}</span>
            </div>
            {/* <button className={styles.refreshButton} onClick={loadData}>
              Обновить
            </button> */}
          </div>
        </div>
      </div>

      {/* Grid of 8 bars - 4 columns, 2 rows */}
      <div className={styles.metricsGrid}>
        <RadarBar
          title="Просмотры"
          mainValue={data.views}
          mainValueUnits=""
          isLoading={loading}
        />
        <RadarBar
          title="Клики"
          mainValue={data.clicks}
          mainValueUnits=""
          isLoading={loading}
        />
        <RadarBar
          title="CTR"
          mainValue={data.view_click}
          mainValueUnits="%"
          isLoading={loading}
        />
        <RadarBar
          title="CPC"
          mainValue={data.cpc}
          mainValueUnits="₽"
          isLoading={loading}
        />
        <RadarBar
          title="Расходы"
          mainValue={data.ad_spend}
          mainValueUnits="₽"
          isLoading={loading}
        />
        <RadarBar
          title="Корзина"
          mainValue={data.cart}
          mainValueUnits="шт"
          isLoading={loading}
        />
        <RadarBar
          title="Заказы"
          mainValue={data.orders}
          mainValueUnits="шт"
          isLoading={loading}
        />
        <RadarBar
          title="ДРР заказы"
          mainValue={data.drr_orders}
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

