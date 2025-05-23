import styles from './underDevelopmentPlugPage.module.css'
import pic from '../../assets/under_dev_plug.png'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'




const UnderDevelopmentPlugPage = () => {

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                <div className={styles.box}>
                    <h2 className={styles.box__title}>В данный момент эта страница находится на ремонте!</h2>
                    <div className={styles.box__imgWrapper}>
                        <img src={pic} alt='' width={700} height={440} />
                    </div>
                    <p className={styles.box__text}>Мы уже знаем о проблеме и активно ее решаем.</p>
                    <p className={`${styles.box__text} ${styles.box__text_small}`}>Спасибо за понимание!</p>
                </div>
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default UnderDevelopmentPlugPage
