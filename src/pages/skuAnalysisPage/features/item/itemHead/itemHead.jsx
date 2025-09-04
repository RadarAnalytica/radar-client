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
                    </div>
                    <div className={styles.head__link}>
                        <Link
                            to={skuMainData.supplier_url}
                            target='_blank'
                            style={{ color: 'inherit'}}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.4999 1.75C15.0857 1.75 14.7499 2.08579 14.7499 2.5C14.7499 2.91421 15.0857 3.25 15.4999 3.25H19.4999C19.5746 3.25 19.6478 3.25656 19.7189 3.26913L13.0184 9.96967C12.7255 10.2626 12.7255 10.7374 13.0184 11.0303C13.3113 11.3232 13.7861 11.3232 14.079 11.0303L20.7428 4.36653C20.7475 4.41038 20.7499 4.45491 20.7499 4.5V8.5C20.7499 8.91421 21.0857 9.25 21.4999 9.25C21.9141 9.25 22.2499 8.91421 22.2499 8.5V4.5C22.2499 3.7588 21.9567 3.08609 21.4799 2.59155L21.4765 2.58807C20.9765 2.07129 20.2757 1.75 19.4999 1.75H15.4999Z" fill="currentColor" />
                                <path d="M11.5 2.75018L11.4624 2.75018C9.81192 2.75018 8.52215 2.75017 7.49047 2.84368C6.44067 2.93883 5.58471 3.13551 4.825 3.57413C3.89008 4.1139 3.11372 4.89026 2.57394 5.82518C2.13532 6.5849 1.93864 7.44085 1.84349 8.49066C1.74999 9.52233 1.74999 10.8121 1.75 12.4626V12.5378C1.74999 14.1883 1.74999 15.478 1.84349 16.5097C1.93864 17.5595 2.13532 18.4155 2.57394 19.1752C3.11372 20.1101 3.89008 20.8865 4.825 21.4262C5.58471 21.8649 6.44067 22.0615 7.49047 22.1567C8.52214 22.2502 9.81191 22.2502 11.4624 22.2502H11.5376C13.1881 22.2502 14.4779 22.2502 15.5095 22.1567C16.5593 22.0615 17.4153 21.8649 18.175 21.4262C19.1099 20.8865 19.8863 20.1101 20.4261 19.1752C20.8647 18.4155 21.0614 17.5595 21.1565 16.5097C21.25 15.478 21.25 14.1883 21.25 12.5378V12.5002C21.25 12.086 20.9142 11.7502 20.5 11.7502C20.0858 11.7502 19.75 12.086 19.75 12.5002C19.75 14.1963 19.7493 15.4182 19.6626 16.3743C19.5769 17.3201 19.4119 17.9318 19.127 18.4252C18.7189 19.1321 18.1319 19.7191 17.425 20.1272C16.9316 20.412 16.3199 20.5771 15.3741 20.6628C14.418 20.7495 13.1961 20.7502 11.5 20.7502C9.80389 20.7502 8.58195 20.7495 7.62587 20.6628C6.6801 20.5771 6.06836 20.412 5.575 20.1272C4.86811 19.7191 4.28111 19.1321 3.87298 18.4252C3.58814 17.9318 3.42309 17.3201 3.33737 16.3743C3.25072 15.4182 3.25 14.1963 3.25 12.5002C3.25 10.8041 3.25072 9.58213 3.33737 8.62605C3.42309 7.68028 3.58814 7.06855 3.87298 6.57518C4.2811 5.86829 4.86811 5.28129 5.575 4.87316C6.06836 4.58832 6.6801 4.42327 7.62587 4.33755C8.58195 4.2509 9.80389 4.25018 11.5 4.25018C11.9142 4.25018 12.25 3.9144 12.25 3.50018C12.25 3.08597 11.9142 2.75018 11.5 2.75018Z" fill="currentColor" />
                            </svg>

                        </Link>
                    </div>
                </div>
            }
        </>
    )
}
export default ItemHead;