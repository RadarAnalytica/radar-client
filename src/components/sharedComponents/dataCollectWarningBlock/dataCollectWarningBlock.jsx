import styles from './dataCollectWarningBlock.module.css'
import cover from './cover.png'
import header_bg from './header_bg.png'

const DataCollectWarningBlock = ({bigPreview = true}) => {
    return (
        <div className={styles.block}>
            <div className={styles.block__header}>
                <p className={styles.block__title}>Данные вашего магазина уже собираются</p>
                <p className={styles.block__text}>Обычно это занимает до 30 минут</p>
                <div className={styles.block__headerCover}>
                    <img src={header_bg} alt='' />
                </div>
            </div>
            { bigPreview && <div className={styles.block__coverWrapper}>
                <img src={cover} alt='' />
            </div> }
        </div>
    );
}

export default DataCollectWarningBlock;