import { Tooltip, ConfigProvider } from 'antd';
import styles from './bar.module.css'
import { formatPrice } from '../../../../service/utils';

const Bar = ({
    titleColor,
    rating,
    data,
    units,
    title,
    hasAdditionalData,
    additionalData,
    additionalDataUnits
}) => {

    return (
        <div className={styles.bar}>
            <p
                className={styles.bar__text}
                style={{
                    color: titleColor || ''
                }}
            >
                {title}
            </p>
            {!rating &&
                    <p className={styles.bar__title}>
                        {formatPrice(data, units)}
                        {hasAdditionalData &&
                        ' / ' + formatPrice(additionalData, additionalDataUnits)}
                    </p>
            }
            {rating &&
                <div className={styles.bar__ratingWrapper}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.093 0.952965C12.4514 0.181233 13.5486 0.181231 13.907 0.952963L17.0154 7.64621C17.1611 7.95996 17.4586 8.17612 17.802 8.21775L25.1282 9.10567C25.9729 9.20804 26.3119 10.2515 25.6887 10.8308L20.2836 15.8554C20.0303 16.0909 19.9166 16.4407 19.9832 16.7802L21.4026 24.0222C21.5663 24.8572 20.6787 25.5021 19.9351 25.0884L13.4862 21.5005C13.1839 21.3323 12.8161 21.3323 12.5138 21.5005L6.0649 25.0884C5.32134 25.5021 4.43373 24.8572 4.59739 24.0222L6.01685 16.7802C6.08339 16.4407 5.96975 16.0909 5.71638 15.8554L0.311264 10.8308C-0.311947 10.2515 0.0270872 9.20804 0.871799 9.10567L8.198 8.21775C8.54142 8.17612 8.83894 7.95996 8.98465 7.64621L12.093 0.952965Z" fill="#FEC53D" />
                    </svg>
                    <p className={styles.bar__title}>{formatPrice(data, units)}</p>
                </div>
            }
        </div>
    )
}

export default Bar;