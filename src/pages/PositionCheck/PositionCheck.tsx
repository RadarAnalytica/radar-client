import MobilePlug from "@/components/sharedComponents/mobilePlug/mobilePlug";
import styles from "./PositionCheck.module.css";
import Sidebar from "@/components/sharedComponents/sidebar/sidebar";
import Header from "@/components/sharedComponents/header/header";
import { SearchBlock } from "@/features";

// const runSearch = () => {
//     let normilizedId: string;
//     if (/^(|\d+)$/.test(inputValue)) {
//         normilizedId = inputValue;
//     } else {
//         const startId = inputValue.indexOf('wildberries.ru/catalog/') + 'wildberries.ru/catalog/'.length;
//         const endId = inputValue.indexOf('/detail.aspx');
//         if (startId === -1 || endId === -1) {
//             setRequestStatus({ ...requestInitState, isError: true, message: 'Не верный формат артикула. Вставьте только числа или ссылку вида: https://www.wildberries.ru/catalog/ID/detail.aspx' });
//             setInputValue('');
//             return;
//         }
//         normilizedId = inputValue.substring(startId, endId);
//     }

//     navigate(`/sku-analysis/${normilizedId}`);
// };

const PositionCheckPage = () => {

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
                    <Header
                        title='Проверка позиций'
                        titlePrefix={null}
                        children={null}
                        videoReviewLink={null}
                        howToLink={null}
                        howToLinkText={null}
                        hasShadow={false}
                    />
                </div>
                {/* !header */}
                <SearchBlock
                    title='Проверка позиций'
                    searchHistory={['1234567890', '1234567891', '1234567892']}
                />
            </section>
            {/* ---------------------- */}
        </main>
    );
};

export default PositionCheckPage;