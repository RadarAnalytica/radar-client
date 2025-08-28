import styles from './dataCollectWarningBlock.module.css'
//import cover from '../../../assets/dataCollectCover.png'
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
    )
}

export default DataCollectWarningBlock;


/**
 * 
 *   <svg
                    width='30'
                    height='30'
                    viewBox='0 0 30 30'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <rect
                        width='30'
                        height='30'
                        rx='5'
                        fill='#00B69B'
                        fillOpacity='0.1'
                    />
                    <path
                        d='M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z'
                        fill='#00B69B'
                    />
                </svg>
                <p className={styles.block__title}>{title}</p>
 */