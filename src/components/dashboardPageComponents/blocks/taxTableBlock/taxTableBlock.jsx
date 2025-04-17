import styles from './taxTableBlock.module.css'

const TaxTableBlock = ({ dataDashBoard, loading }) => {

    if (loading) {
        return (
            <div className={styles.block}>
                <div className={styles.bar__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.block}>
            <p className={styles.block__title}>Налоги</p>
            <div className={styles.block__chart}>

            </div>
        </div >
    )
}

export default TaxTableBlock;