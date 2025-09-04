import { useState, useEffect } from 'react';
import styles from './pricingCard.module.css'
import { formatPrice } from '../../../../../service/utils';
import { LoadingOutlined } from '@ant-design/icons';

export const PricingCard = ({ item, setModalItem, action, isWidgetActive}) => {

    const [ currentActiveItem, setCurrentActiveItem ] = useState(undefined);

    useEffect(() => {
        if (!isWidgetActive) {
            setCurrentActiveItem(undefined);
        }
    }, [isWidgetActive]);

    return (
        <div
            className={styles.card}
            style={{ borderColor: item.color }}
        >
            <div className={styles.card__header}>
                <h3 className={`${styles.card__title} ${styles.card__title_qt}`}>
                    {item.title}
                </h3>
                {item.discount && <div className={styles.card__bullet}>{item.discount}</div>}
            </div>
            <div className={styles.card__body}>
                <div className={styles.card__infoBlock}>
                    <div className={styles.card__priceWrapper}>
                        <h4
                            className={`${styles.card__title} ${styles.card__title_tt}`}
                        >
                            {formatPrice(item.price.toString(), '₽')}
                        </h4>

                        {item.oldPrice &&
                            <div className={styles.card__oldPrice}>{formatPrice(item.oldPrice.toString(), '₽')}</div>
                        }
                    </div>
                    <button className={styles.card__modalButton} onClick={() => setModalItem(item)}>
                        Что входит?
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5Z" fill="#6083E7" />
                            <path d="M12 18.25C12.4142 18.25 12.75 17.9142 12.75 17.5V11.5C12.75 11.0858 12.4142 10.75 12 10.75C11.5858 10.75 11.25 11.0858 11.25 11.5V17.5C11.25 17.9142 11.5858 18.25 12 18.25Z" fill="white" />
                            <path d="M12 7.5C12.5523 7.5 13 7.94771 13 8.5C13 9.05229 12.5523 9.5 12 9.5C11.4477 9.5 11 9.05229 11 8.5C11 7.94771 11.4477 7.5 12 7.5Z" fill="white" />
                        </svg>
                    </button>
                </div>
                    <button
                        className={styles.card__actionButton}
                        style={{ width: '100%', paddingLeft: 0, paddingRight: 0 }}
                        onClick={() => { action(); setCurrentActiveItem(item) }}
                        disabled={isWidgetActive}
                    >
                        {isWidgetActive && currentActiveItem?.title === item.title && <LoadingOutlined />}
                        {isWidgetActive && currentActiveItem?.title !== item.title && <></>}
                        Активировать
                    </button>
            </div>
        </div>
    )
}