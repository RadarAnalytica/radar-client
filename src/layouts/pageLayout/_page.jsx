// dont forget to renew imports
import styles from './_page.module.css'
import SideNav from '../../../../components/SideNav'
import Header from '../../components/sharedComponents/header/header'
import TopNav from '../../../../components/TopNav'


// dont forget to rename the component and its export
const _Page = () => {

    return (
        <main className={styles.page}>
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <SideNav />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header title='title' pref />
                </div>
                {/* !header */}
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default _Page;