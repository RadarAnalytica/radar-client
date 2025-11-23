import { useState, useEffect } from "react";
import MobilePlug from "@/components/sharedComponents/mobilePlug/mobilePlug";
import styles from "./PositionCheck.module.css";
import Sidebar from "@/components/sharedComponents/sidebar/sidebar";
import Header from "@/components/sharedComponents/header/header";
import { SearchBlock } from "@/features";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { actions as skuAnalysisActions } from "@/redux/skuAnalysis/skuAnalysisSlice";
import ErrorModal from "@/components/sharedComponents/modals/errorModal/errorModal";
import { useDemoMode } from "@/app/providers";

// model
const requestInitState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};


// comp
const PositionCheckPage = () => {
    const dispatch = useAppDispatch();
    const { skuSearchHistory } = useAppSelector(store => store.skuAnalysis);
    const navigate = useNavigate();
    const [requestStatus, setRequestStatus] = useState(requestInitState);
    const { isDemoMode } = useDemoMode();


    const submitHandler = (inputValue: string) => {
        let normilizedId: string;
        if (/^(|\d+)$/.test(inputValue)) {
            normilizedId = inputValue;
        } else {
            const startId = inputValue.indexOf('wildberries.ru/catalog/') + 'wildberries.ru/catalog/'.length;
            const endId = inputValue.indexOf('/detail.aspx');
            if (startId === -1 || endId === -1) {
                setRequestStatus({ ...requestInitState, isError: true, message: 'Не верный формат артикула. Вставьте только числа или ссылку вида: https://www.wildberries.ru/catalog/ID/detail.aspx' });
                return;
            }
            normilizedId = inputValue.substring(startId, endId);
        }
        dispatch(skuAnalysisActions.skuSearchHistoryAdd(normilizedId));
        navigate(`/position-check/${normilizedId}`);
    };

    useEffect(() => {
        if (isDemoMode) {
            navigate('/position-check/236309615');
        }
    }, [isDemoMode]);

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
                    title='Поиск по товару'
                    searchHistory={skuSearchHistory}
                    submitHandler={submitHandler}
                    clearSearchHistoryHandler={() => dispatch(skuAnalysisActions.resetSkuSearchHistory())}
                    demoModeValue=''
                />
            </section>
            {/* ---------------------- */}
            <ErrorModal
                footer={null}
                open={requestStatus.isError}
                onOk={() => setRequestStatus(requestInitState)}
                onClose={() => setRequestStatus(requestInitState)}
                onCancel={() => setRequestStatus(requestInitState)}
                message={requestStatus.message}
            />
        </main>
    );
};

export default PositionCheckPage;