import styles from './itemInfo.module.css'
import { Link } from 'react-router-dom';

const ItemInfo = () => {

    return (
        <div className={styles.info}>
            <div className={styles.info__column}>
                <p className={styles.info__row}>
                    Артикул <span className={styles.info__color_black}>4783009</span>
                </p>
                <p className={styles.info__row}>
                    Предмет <span className={styles.info__color_purple}>Глиттеры</span>
                </p>
                <p className={styles.info__row}>
                    Дата появляения на WB <span className={styles.info__color_black}>01.01.2025</span>
                </p>
                <p className={styles.info__row}>
                    Товар представлен <span className={styles.info__color_purple}>в 4 цветах</span>
                </p>
                <p className={styles.info__row}>
                    Доля выручки относительно всех цветов <span className={styles.info__color_black}>50%</span>
                </p>
            </div>

            <div className={styles.info__column}>
                <p className={styles.info__row}>
                    Доля товарных остатков относительно всех цветов <span className={styles.info__color_black}>45%</span>
                </p>
                <p className={styles.info__row}>
                    Продавец <span className={styles.info__color_purple}>ООО РНВ</span>
                </p>
                <p className={styles.info__row}>
                    Бренд <span className={styles.info__color_purple}>Glitter brand</span>
                </p>


                <Link to='/' className={styles.info__mainLink}>Посмотреть на WB</Link>

            </div>
        </div>
    )
}
export default ItemInfo;