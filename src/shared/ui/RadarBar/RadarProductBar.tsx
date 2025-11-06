import styles from "./RadarProductBar.module.css";
import { formatPrice } from "@/service/utils";
import { Link } from "react-router-dom";
import { RadarLoader } from "@/shared";


interface IRadarProductBarProps {
    data?: {
        wb_id_image_link?: string | string[];
        name?: string;
        price?: number;
        wb_id_url?: string;
    }
    isLoading?: boolean;
}

export const RadarProductBar: React.FC<IRadarProductBarProps> = ({ data, isLoading }) => {



    if (isLoading) {
        return (
            <div className={styles.head}>
                <div className={styles.loaderWrapper}>
                    <RadarLoader loaderStyle={{ height: '138px' }} />
                </div>
            </div>
        );
    }

    return data &&(
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
                <div className={styles.head__priceWrapper}>
                    <p className={styles.head__text}>Цена реализации</p>
                    <p className={styles.head__title}>{formatPrice(data?.price || 0, '₽')}</p>
                </div>
            </div>
        </div>
    );
};