import styles from './bar.module.css';
import { formatPrice } from '../../../../service/utils';
import { Link } from 'react-router-dom';

const SmallBar = ({ title, data, units }) => {
    return (
        <div className={`${styles.bar} ${styles.bar_small}`}>
            <p className={`${styles.bar__title} ${styles.bar__title_small} `}>{title}</p>
            <p className={`${styles.bar__data} ${styles.bar__data_small}`}>{units && data ? formatPrice(data, units) : data}</p>
        </div>
    );
};
const MediumBar = ({ title, data, rate, units }) => {
    const rateObject = formatRateValue(rate);
    return (
        <div className={`${styles.bar} ${styles.bar_medium}`}>
            <p className={styles.bar__title}>{title}</p>
            <div className={styles.bar__dataWrapper}>
                <p className={styles.bar__data}>{formatPrice(data, units)}</p>
                {rate && rateObject &&
                    <div className={styles.bar__rateWrapper}>
                        {rateObject.icon}
                        <span className={styles.bar__rate} style={{ color: rateObject.color }}>{rateObject.value}</span>
                    </div>
                }
            </div>
        </div>
    );
};

const LargeBar = ({ data, link, title, icon, type }) => {

    return (
        <div className={`${styles.bar} ${styles.bar_large}`}>
            {link && <Link to={link} target='_blank' className={styles.bar__link}>Ссылка на WB</Link>}
            <div className={styles.bar__header}>
                {icon === 'gold' &&
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="60" height="60" rx="10" fill="#FFF5DC" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M43.3334 30C43.3334 25.0154 43.3334 22.5231 42.2616 20.6667C41.5594 19.4505 40.5495 18.4406 39.3334 17.7385C37.4769 16.6667 34.9846 16.6667 30 16.6667C25.0154 16.6667 22.5231 16.6667 20.6667 17.7385C19.4505 18.4406 18.4406 19.4505 17.7385 20.6667C16.6667 22.5231 16.6667 25.0154 16.6667 30C16.6667 34.9846 16.6667 37.4769 17.7385 39.3333C18.4406 40.5495 19.4505 41.5594 20.6667 42.2615C22.5231 43.3333 25.0154 43.3333 30 43.3333C34.9846 43.3333 37.4769 43.3333 39.3334 42.2615C40.5495 41.5594 41.5594 40.5495 42.2616 39.3333C43.3334 37.4769 43.3334 34.9846 43.3334 30ZM31.3334 25.5521C30.7811 25.5521 30.3334 25.9998 30.3334 26.5521C30.3334 27.1044 30.7811 27.5521 31.3334 27.5521H32.6715L30 30.2235L28.7071 28.9306C28.5196 28.7431 28.2652 28.6377 28 28.6377C27.7348 28.6377 27.4804 28.7431 27.2929 28.9306L22.6262 33.5973C22.2357 33.9878 22.2357 34.621 22.6262 35.0115C23.0168 35.402 23.6499 35.402 24.0405 35.0115L28 31.0519L29.2929 32.3448C29.6834 32.7354 30.3166 32.7354 30.7071 32.3448L34.1046 28.9474V30.3233C34.1046 30.8756 34.5523 31.3233 35.1046 31.3233C35.6569 31.3233 36.1046 30.8756 36.1046 30.3233V26.5521C36.1046 25.9998 35.6569 25.5521 35.1046 25.5521H31.3334Z" fill="#FEC53D" />
                    </svg>
                }
                {icon === 'green' &&
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="60" height="60" rx="10" fill="#D9F7E8" />
                        <path d="M37.0031 31.7724C35.9404 31.1651 34.6445 31.1292 33.5498 31.6765L33.0235 31.9397C31.1203 32.8913 28.8802 32.8913 26.977 31.9397L26.4507 31.6765C25.356 31.1292 24.0601 31.1651 22.9974 31.7724L22.5834 32.0089C21.8411 32.4331 21.0176 32.6469 20.1945 32.653L20.7792 37.6232C21.0952 40.3091 23.3715 42.3333 26.076 42.3333L26.3333 42.3334V38.3334C26.3333 36.3083 27.9749 34.6667 30 34.6667C32.025 34.6667 33.6666 36.3083 33.6666 38.3334V42.3334L34.5907 42.3333C37.2951 42.3333 39.5715 40.3091 39.8875 37.6232L40.477 32.6119C39.4376 32.7477 38.3616 32.5487 37.4171 32.0089L37.0031 31.7724Z" fill="#00B69B" />
                        <path d="M31.6666 42.3334V38.3334C31.6666 37.4129 30.9205 36.6667 30 36.6667C29.0795 36.6667 28.3333 37.4129 28.3333 38.3334V42.3334H31.6666Z" fill="#00B69B" />
                        <path d="M32.927 18.1545L31.3152 17.8858C30.4444 17.7407 29.5556 17.7407 28.6849 17.8858L27.0529 18.1578L26.9935 18.75L25.6589 28.9188L25.6582 28.9239L25.5904 29.4618L26.4223 29.8778C28.6746 31.0039 31.3255 31.0039 33.5778 29.8778L34.4097 29.4618L34.3419 28.9239L34.3412 28.9187L33.0086 18.7651L32.927 18.1545Z" fill="#00B69B" />
                        <path d="M36.4475 29.6366L38.9667 31.0762C39.6 31.438 40.3834 31.4111 40.9903 31.0065C41.6073 30.5951 41.9333 29.866 41.8284 29.1319L40.8353 22.1803C40.728 21.4292 40.3059 20.7594 39.6747 20.3386L37.3385 18.7812C36.9005 18.4891 36.3858 18.3333 35.8593 18.3333H34.9686L34.9915 18.5049L36.3256 28.6687L36.4475 29.6366Z" fill="#00B69B" />
                        <path d="M23.5526 29.6366L23.6746 28.6687L23.6752 28.6636L25.0066 18.52L25.0253 18.3333H24.1408C23.6143 18.3333 23.0996 18.4891 22.6616 18.7812L20.3254 20.3386C19.6942 20.7594 19.2721 21.4292 19.1648 22.1803L18.1717 29.1319C18.0668 29.866 18.3928 30.5951 19.0098 31.0065C19.6167 31.4111 20.4001 31.438 21.0334 31.0762L23.5526 29.6366Z" fill="#00B69B" />
                    </svg>

                }
                <p className={styles.bar__heading}>{title}</p>
            </div>
            <div className={type === 'wide' ? `${styles.bar__dataLayout} ${styles.bar__dataLayout_3cols}` : styles.bar__dataLayout}>
                {data && data.map((_, id) => (
                    <div className={styles.bar__dataContainer} key={id}>
                        <p className={`${styles.bar__title} ${styles.bar__title_small}`}>{_.title}</p>
                        <p className={`${styles.bar__data} ${styles.bar__data_small}`}>{formatPrice(_.data, _.units)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


const Bar = {
    Small: SmallBar,
    Medium: MediumBar,
    Large: LargeBar
};
export default Bar;


export const formatRateValue = (value) => {
    let result = {
        value: Math.abs(value).toString(),
        color: '#8C8C8C',
        icon: (
            <div
                style={{
                    width: '12px',
                    marginRight: '10px',
                    height: '2px',
                    background: '#8C8C8C'
                }}
            ></div>
        )
    };
    if (value > 0) {
        result = {
            value: '+ ' + result.value + ' %',
            color: '#00B69B',
            icon: (
                <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 0.544067L16.29 2.83407L11.41 7.71407L7.41 3.71407L0 11.1341L1.41 12.5441L7.41 6.54407L11.41 10.5441L17.71 4.25407L20 6.54407V0.544067H14Z" fill="#00B69B" />
                </svg>
            )
        };
    }
    if (value < 0) {
        result = {
            value: '- ' + result.value + ' %',
            color: '#F93C65',
            icon: (
                <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.9375 12.5441L17.2275 10.2541L12.3475 5.37407L8.3475 9.37407L0.9375 1.95407L2.3475 0.544067L8.3475 6.54407L12.3475 2.54407L18.6475 8.83407L20.9375 6.54407V12.5441H14.9375Z" fill="#F93C65" />
                </svg>

            )
        };
    }
    if (value === 0) {
        result = {
            ...result,
            value: result.value + ' %',
        };
    }

    return result;
};
