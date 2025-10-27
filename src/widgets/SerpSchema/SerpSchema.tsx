import { useEffect } from "react";
import styles from "./SerpSchema.module.css";
import { Popover } from "antd";
import wb_icon from './wb_icon.png'
import { Link } from "react-router-dom";
import { formatPrice } from "@/service/utils";

interface IProduct {
    wb_id: number;
    wb_id_image_link: string;
    name: string;
    number: number;
    ad: boolean;
    price: number;
    base_price: number;
    feedbacks: number;
    rating: number;
    pics: number;
}


export const SerpSchema = ({ products }: { products: IProduct[] }) => {

    return (
        <div className={styles.schema}>
            {products.map((_, index) => {

                if (_.ad) {
                    return (
                        <Popover
                            title={<TooltipContent product={_} />}
                            placement='rightBottom'
                            color='white'
                            arrow={false}
                            key={index}
                            destroyTooltipOnHide
                            style={{ width: '424px' }}
                        >
                            <div className={`${styles.schema__icon} ${styles.schema__icon_adv}`} />
                        </Popover>
                    )
                }
                return (<div className={styles.schema__icon} key={index} />)
            })}
        </div>
    );
};



const TooltipContent = ({ product }: { product: IProduct }) => {
    useEffect(() => {
        document.documentElement.scrollTop = document.documentElement.clientHeight;
        document.documentElement.scrollLeft = document.documentElement.clientWidth;
    }, []);
    return (
        <div className={styles.tooltipContent}>
            <div className={styles.tooltipContent__header}>
                <div className={styles.tooltipContent__imgWrapper}>
                    <img
                        src={product.wb_id_image_link}
                        alt={product.name}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                </div>
                <div className={styles.tooltipContent__titleBlock}>
                    <p className={styles.tooltipContent__title}>{product.name}</p>
                    <Link to={`https://www.wildberries.ru/catalog/${product.wb_id}/detail.aspx`} target='_blank' className={styles.tooltipContent__skuBlock}>
                        <img src={wb_icon} alt='wb_icon' width={20} height={20} style={{ transform: 'scale(1.2)' }} />
                        {product.wb_id}
                    </Link>
                </div>
            </div>
            <div className={styles.tooltipContent__body}>
                <div className={styles.tooltipContent__column}>
                    <p className={styles.tooltipContent__title} style={{ color: '#8C8C8C', lineHeight: '140%' }}>Реклама</p>
                    <p className={styles.tooltipContent__columnItem}>Тип: <span>Реклама</span></p>
                    <p className={styles.tooltipContent__columnItem}>Позиция: <span>{product.number}</span></p>
                </div>
                <div className={styles.tooltipContent__column}>
                    <p className={styles.tooltipContent__title} style={{ color: '#8C8C8C', lineHeight: '140%' }}>Дополнительно</p>
                    <p className={styles.tooltipContent__columnItem}>Цена: <span>{formatPrice(product.base_price, '₽')}</span></p>
                    <p className={styles.tooltipContent__columnItem}>Цена со скидкой: <span style={{ color: '#5329FF' }}>{formatPrice(product.price, '₽')}</span></p>
                    <p className={styles.tooltipContent__columnItem}>Фото: <span>{product.pics}</span></p>
                    <p className={styles.tooltipContent__columnItem}>Рейтинг: <span>{product.rating}</span></p>
                    <p className={styles.tooltipContent__columnItem}>Отзывы: <span>{product.feedbacks}</span></p>
                </div>
            </div>
        </div>
    );
};