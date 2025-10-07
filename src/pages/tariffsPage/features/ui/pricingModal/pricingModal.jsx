import styles from './pricingModal.module.css';
import { formatPrice } from '../../../../../service/utils';


const FEATURES = [
    'Полная аналитика продаж, прибыли, юнит-экономики и всех затрат',
    'Анализ спроса, частотности и сезонных трендов',
    'Расширенная аналитика конкурентов: цены, позиции, структура карточек',
    'Подсветка рисков, просадок и недозагруженных товаров',
    'Мониторинг и прогнозирование трендов и ниш',
    'Анализ позиций карточек в выдаче и работа с ключевыми фразами',
    'Отслеживание эффективности SEO-оформления и оптимизация контента',
];


export const PricingModal = ({ visible, setIsModalVisible, item, action }) => {

    return (
        <section
            className={visible ? `${styles.backdrop} ${styles.backdrop_visible}` : `${styles.backdrop} ${styles.backdrop_invisible}`}
            id='pricing-modal'
            onClick={(e) => {
                if (e.target.id === 'pricing-modal') {
                    setIsModalVisible(false);
                }
            }}
        >
            <div
                className={visible ? `${styles.modal} ${styles.modal_visible}` : `${styles.modal}`}
            >
                <button
                    className={styles.modal__closeButton}
                    onClick={() => setIsModalVisible(false)}
                    aria-label='Закрыть модальное окно тарифов Radar-Analytica'
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill='currentColor' xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.7157 1.28711L1.28711 16.7157M1.28711 1.28711L16.7157 16.7157" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill='currentColor' />
                    </svg>
                </button>


                <header
                    className={styles.modal__header}
                >
                    <h5
                        className={styles.modal__title}
                    >
                        Smart
                    </h5>
                </header>

                <div className={styles.modal__body}>
                    <div className={styles.modal__priceWrapper}>
                        <div className={styles.modal__container}>
                            <h2 className={styles.modal__bodyTitle}>
                                {formatPrice(item?.price.toString() || '', '₽')}
                            </h2>
                            {item?.oldPrice &&
                                <div className={styles.modal__oldPrice}>
                                    {formatPrice(item?.oldPrice.toString(), '₽')}
                                </div>
                            }
                        </div>
                        <button
                            className={styles.modal__actionButton}
                            onClick={action}
                        >
                            Активировать сервис
                        </button>
                    </div>

                    <div className={styles.modal__listWrapper}>
                        <p
                            className={styles.modal__listTitle}
                        >
                            Что включено:
                        </p>

                        <ul className={styles.modal__featuresList}>
                            {FEATURES.map((_, id) => {

                                return (
                                    <li
                                        key={id}
                                        className={styles.modal__listItem}
                                    >
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="30" height="30" rx="6" fill="#E0EBFF" />
                                            <path d="M19.3219 8.5C19.0394 8.5 18.7003 8.54384 18.2671 8.60961C17.8339 8.6973 17.5325 8.785 17.363 8.89461C17.1747 9.00423 16.911 9.28921 16.5343 9.74958C16.1764 10.188 15.7055 10.9115 15.1404 11.8322C14.5753 12.7749 14.0856 13.6737 13.6712 14.5506C13.2945 15.3179 12.9178 16.1729 12.5411 17.0717C12.2774 16.6771 11.9949 16.3702 11.7123 16.129C11.3544 15.844 10.9966 15.6906 10.6764 15.6906C10.3562 15.6906 9.97944 15.8659 9.60273 16.1948C9.20718 16.5455 9 16.9401 9 17.3567C9 17.6855 9.16952 18.0582 9.5274 18.4966C10.036 19.1543 10.4503 19.7681 10.7517 20.3162C10.9777 20.7108 11.1284 20.9739 11.2226 21.1054C11.3356 21.2369 11.4675 21.3465 11.6181 21.4123C11.7688 21.4781 12.0325 21.5 12.3904 21.5C12.899 21.5 13.238 21.4342 13.4452 21.3027C13.6524 21.1712 13.8031 20.9958 13.9161 20.7546C14.0103 20.5354 14.1798 20.1189 14.4058 19.4612C14.9709 17.817 15.7431 16.0852 16.7038 14.3314C17.6644 12.5776 18.5873 11.2184 19.4726 10.2538C19.6986 10.0346 19.8305 9.85919 19.887 9.74958C19.9623 9.61805 20 9.44266 20 9.26728C20 9.04806 19.9247 8.85076 19.7928 8.69731C19.7175 8.58769 19.5291 8.5 19.3219 8.5Z" fill="#737C92" />
                                        </svg>

                                        {_}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
