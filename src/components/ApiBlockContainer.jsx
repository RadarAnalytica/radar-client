import styles from "../components/ApiBlockContainer.module.css";
import circle from "../assets/circleApi.svg";

const ApiTitle = ({ title }) => {
    return (
        <div className={styles.titleWrapper}>
            <div className={styles.icon}><img src={circle} /></div>
            <div className={styles.title}>{title}</div>
        </div>
    );
};
const ApiBlockContainer = () => {
    return (
        <div className={styles.apiWrapper}>
            <div className={styles.headerApi}>Получайте актуальные данные по вашим товарам на маркетплейсе</div>
            <div className={styles.apiItemsWrapper}>
                <div className={styles.titleRow}>
                    <ApiTitle title={"Заказы"} />
                    <ApiTitle title={"География заказов"} />
                    <ApiTitle title={"Выкупы"} />
                </div>
                <div className={styles.titleRow}>
                    <ApiTitle title={"SEO-аналитика карточки"} />
                    <ApiTitle title={"Отмены"} />
                    <ApiTitle title={"Возвраты"} />
                </div>
                <div className={styles.titleRow}>
                    <ApiTitle title={"Остатки по складам"} />
                    <ApiTitle title={"Общая статистика за день"} />
                </div>
            </div>

            <div className={styles.apiItemsWrapperMedium}>
                <div className={styles.titleRow}>
                    <ApiTitle title={"Заказы"} />
                    <ApiTitle title={"География заказов"} />
                    <ApiTitle title={"Выкупы"} />
                    <ApiTitle title={"SEO-аналитика карточки"} />

                    <ApiTitle title={"Отмены"} />
                    <ApiTitle title={"Возвраты"} />
                    <ApiTitle title={"Остатки по складам"} />
                    <ApiTitle title={"Общая статистика за день"} />
                </div>

            </div>
        </div>
    );
};
export default ApiBlockContainer;
