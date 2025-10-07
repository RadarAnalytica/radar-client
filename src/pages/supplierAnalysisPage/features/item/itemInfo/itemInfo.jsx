import styles from './itemInfo.module.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../../redux/hooks';
import { formatPrice } from '../../../../../service/utils';
import moment from 'moment';


/**
 * {
  "wb_id": 93378993,
  "wb_id_url": "https://www.wildberries.ru/catalog/93378993/detail.aspx",
  "wb_id_name": "Ирригатор для зубов портативный",
  "photo_urls": [
    "https://basket-05.wbbasket.ru/vol933/part93378/93378993/images/c246x328/1.webp",
    "https://basket-05.wbbasket.ru/vol933/part93378/93378993/images/c246x328/2.webp",
    "https://basket-05.wbbasket.ru/vol933/part93378/93378993/images/c246x328/3.webp",
    "https://basket-05.wbbasket.ru/vol933/part93378/93378993/images/c246x328/4.webp"
  ],
  "subject_name": "Ирригаторы",
  "price": 1619,
  "brand_name": "Health Body",
  "brand_url": "https://www.wildberries.ru/brands/975102-health-body",
  "supplier_name": "ИП Рязанова Н. В.",
  "supplier_url": "https://www.wildberries.ru/seller/451671",
  "created_date": "2024-10-10",
  "color_amount": 6,
  "color_revenue_percent": 34.1,
  "color_balance_percent": 47.3
}
 */

const ItemInfo = () => {

    const { skuMainData, dataStatus } = useAppSelector(store => store.skuAnalysis);

    if (!skuMainData && dataStatus.isLoading) {
        return (
            <div className={styles.info}>
                <div className={styles.loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        );
    }

    return (
        <>
            {skuMainData &&
                <div className={styles.info}>
                    <div className={styles.info__column}>
                        <p className={styles.info__row}>
                            Артикул <span className={styles.info__color_black}>{skuMainData.wb_id}</span>
                        </p>
                        <p className={styles.info__row}>
                            Предмет <span className={styles.info__color_purple}>{skuMainData.subject_name}</span>
                        </p>
                        <p className={styles.info__row}>
                            Дата появляения на WB <span className={styles.info__color_black}>{moment(skuMainData.created_date).format('DD.MM.YYYY')}</span>
                        </p>
                        <p className={styles.info__row}>
                            Товар представлен <span className={styles.info__color_purple}>В {skuMainData.color_amount} цветах</span> {/** в х цветах */}
                        </p>
                        <p className={styles.info__row}>
                            Доля выручки относительно всех цветов <span className={styles.info__color_black}>{formatPrice(skuMainData.color_revenue_percent, '%')}</span>
                        </p>
                    </div>

                    <div className={styles.info__column}>
                        <p className={styles.info__row}>
                            Доля товарных остатков относительно всех цветов <span className={styles.info__color_black}>{formatPrice(skuMainData.color_balance_percent, '%')}</span>
                        </p>
                        <Link className={styles.info__row} to={skuMainData.supplier_url}>
                            Продавец <span className={styles.info__color_purple}>{skuMainData.supplier_name}</span>
                        </Link>
                        <Link className={styles.info__row} to={skuMainData.brand_url}>
                            Бренд <span className={styles.info__color_purple}>{skuMainData.brand_name}</span>
                        </Link>


                        <Link to={skuMainData.wb_id_url} target='_blank' className={styles.info__mainLink}>Посмотреть на WB</Link>

                    </div>
                </div>
            }
        </>
    );
};
export default ItemInfo;
