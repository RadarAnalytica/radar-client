import styles from "./RadarProductBar.module.css";
import { formatPrice } from "@/service/utils";
import { Link } from "react-router-dom";
import { RadarLoader } from "@/shared";
import wb_icon from '../../../assets/wb_small_main_icon.png';


interface IRadarProductBarProps {
    data?: {
        wb_id_image_link?: string | string[];
        name?: string;
        price?: number;
        wb_id_url?: string;
        wb_id?: string;
        [key: string]: any;
    }
    isLoading?: boolean;
    additionalInfo?: string | React.ReactNode;
    hasWbLink?: boolean;
}

export const RadarProductBar: React.FC<IRadarProductBarProps> = ({ data, isLoading, additionalInfo, hasWbLink = false }) => {



    if (isLoading) {
        return (
            <div className={styles.head}>
                <div className={styles.loaderWrapper}>
                    <RadarLoader loaderStyle={{ height: '138px' }} />
                </div>
            </div>
        );
    }

    return data && (
        <div className={styles.head}>
            <div className={styles.head__gallery}>
                {data?.wb_id_image_link && Array.isArray(data?.wb_id_image_link) && data?.wb_id_image_link.map((i, id) => {
                    if (id === 0) {
                        return (
                            <div className={styles.head__mainPhotoWrapper} key={id}>
                                <img src={i} alt='' width={138} height={182} className={styles.head__galleryMainImage}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        );
                    } else {

                        return id < 4 && (
                            <div className={styles.head__secPhotoWrapper} key={id}>
                                <img src={i} alt='' width={39} height={54} className={styles.head__galleryImage}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>);
                    }
                })}
                {
                    data?.wb_id_image_link && typeof data?.wb_id_image_link === 'string' && (
                        <div className={styles.head__mainPhotoWrapper}>
                            <img src={data?.wb_id_image_link} alt='' width={138} height={182} className={styles.head__galleryMainImage}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    )
                }
            </div>

            <div className={styles.head__titleWrapper}>
                <p className={styles.head__title}>{data?.name || ''}</p>
                {data?.price && <div className={styles.head__priceWrapper}>
                    <p className={styles.head__text}>Цена реализации</p>
                    <p className={styles.head__title}>{formatPrice(data?.price || 0, '₽')}</p>
                </div>}
                {hasWbLink && data?.wb_id &&
                    <Link to={`https://www.wildberries.ru/catalog/${data?.wb_id}/detail.aspx`} target='_blank' className={styles.head__link}>
                        <img src={wb_icon} alt='wb_icon' width={20} height={20} style={{ transform: 'scale(1.2)' }} />
                        {data?.wb_id}
                    </Link>
                }
                {additionalInfo &&
                    <div className={styles.head__priceWrapper}>
                        <p className={styles.head__text}>{additionalInfo}</p>
                    </div>
                }
            </div>
        </div>
    );
};