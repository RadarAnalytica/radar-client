import { useEffect, useContext } from 'react'
import styles from './linkedShops.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { AddShopWidget, ShopCardWidget } from './widgets'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { fetchShops } from '../../redux/shops/shopsActions'
import AuthContext from '../../service/AuthContext'


const LinkedShopsPage = () => {
    const { authToken } = useContext(AuthContext)
    const dispatch = useAppDispatch();
    const shops = useAppSelector((state) => state.shopsSlice.shops);
    console.log(shops)

    useEffect(() => {
        (!shops || shops.length === 0) && dispatch(fetchShops(authToken));
      }, [shops]);

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header title='Подключенные магазины' />
                </div>
                {/* !header */}
                <div className={styles.page__layout}>
                    {shops && shops.length > 0 && [...shops].sort((a,b) => a.id - b.id).map(shop => (
                        <ShopCardWidget key={shop.id} />
                    ))}
                    <AddShopWidget />
                </div>
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default LinkedShopsPage