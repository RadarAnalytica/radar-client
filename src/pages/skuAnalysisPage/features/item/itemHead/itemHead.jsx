import styles from './itemHead.module.css'
import { useAppSelector } from '../../../../../redux/hooks';
import { formatPrice } from '../../../../../service/utils';
import { Link } from 'react-router-dom';

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

const ItemHead = () => {

    const { skuMainData, dataStatus } = useAppSelector(store => store.skuAnalysis);
    
    if (dataStatus.isLoading) {
        return (
            <div className={styles.head}>
                <div className={styles.loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }

    return (
        <>
            {skuMainData &&
                <div className={styles.head}>
                    <div className={styles.head__gallery}>
                        {skuMainData?.photo_urls.map((i, id) => {
                            if (id === 0) {
                                return (
                                    <div className={styles.head__mainPhotoWrapper} key={id}>
                                        <img src={i} alt='' width={138} height={182} className={styles.head__galleryMainImage} />
                                    </div>
                                )
                            } else {

                                return id < 4 && (
                                    <div className={styles.head__secPhotoWrapper} key={id}>
                                        <img src={i} alt='' width={39} height={54} className={styles.head__galleryImage} />
                                    </div>)
                            }
                        })}
                    </div>

                    <div className={styles.head__titleWrapper}>
                        <p className={styles.head__title}>{skuMainData.wb_id_name}</p>
                        <div className={styles.head__priceWrapper}>
                            <p className={styles.head__text}>Цена реализации</p>
                            <p className={styles.head__title}>{formatPrice(skuMainData.price, '₽')}</p>
                        </div>
                        <Link
                            to={skuMainData.wb_id_url}
                            target='_blank'
                            className={styles.head__mainLink}
                        >
                           Посмотреть на WB
                        </Link>
                    </div>
                </div>
            }
        </>
    )
}
export default ItemHead;