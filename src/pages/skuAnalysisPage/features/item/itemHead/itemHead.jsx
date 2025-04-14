import styles from './itemHead.module.css'
import mockImage from './mockImage.png'

const ItemHead = () => {

    return (
        <div className={styles.head}>
            <div className={styles.head__gallery}>
                <div className={styles.head__mainPhotoWrapper}>
                    <img src={mockImage} alt='' width={138} height={182} className={styles.head__galleryMainImage} />
                </div>
                <div className={styles.head__secPhotoWrapper}>
                    <img src={mockImage} alt='' width={39} height={54} className={styles.head__galleryImage} />
                </div>
                <div className={styles.head__secPhotoWrapper}>
                    <img src={mockImage} alt='' width={39} height={54} className={styles.head__galleryImage} />
                </div>
                <div className={styles.head__secPhotoWrapper}>
                    <img src={mockImage} alt='' width={39} height={54} className={styles.head__galleryImage} />
                </div>
            </div>

            <div className={styles.head__titleWrapper}>
                <p className={styles.head__title}>Декоративные блестки синие блестящие в упаковке</p>
                <div className={styles.head__priceWrapper}>
                    <p className={styles.head__text}>Цена реализации</p>
                    <p className={styles.head__title}>899,00 ₽</p>
                </div>
            </div>
        </div>
    )
}
export default ItemHead;