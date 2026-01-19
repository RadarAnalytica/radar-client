import { useState, useEffect, useContext, useRef, useCallback, useMemo } from 'react';
import styles from './addRnpModal.module.css';
import AddRnpModalFooter from './widget/AddRnpModalFooter/AddRnpModalFooter';
import { Modal, Checkbox, ConfigProvider, Pagination, Flex, Tooltip } from 'antd';
import AuthContext from '@/service/AuthContext';
import { useAppSelector } from '@/redux/hooks';
import { Filters } from './widget/AddRnpFilters/AddRnpFilters';
import RnpItem from '../RnpItem/RnpItem';
import { ServiceFunctions } from '@/service/serviceFunctions';
import AddRnpModalSearch from './widget/AddRnpModalSearch/AddRnpModalSearch';
import { close } from '../icons';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import DataCollectWarningBlock from '@/components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import { fetchFiltersRnpAdd } from '@/redux/filtersRnpAdd/filtersRnpAddActions';
import { actions as filterActions } from '@/redux/filtersRnpAdd/filtersRnpAddSlice';
import { useDemoMode } from "@/app/providers";
import { RadarLoader } from '@/shared';
import { useAppDispatch } from '@/redux/hooks';

const AddRnpModal = ({ isAddRnpModalVisible, setIsAddRnpModalVisible, addRnp }) => {
    const { authToken, user } = useContext(AuthContext);
    const dispatch = useAppDispatch()
    const { isDemoMode } = useDemoMode();
    const { shops, selectedRange, isFiltersLoaded } = useAppSelector((state) => state.filtersRnpAdd);
    const { activeBrandName, activeBrand } = useAppSelector((state) => state.filtersRnpAdd);
    const filters = useAppSelector((state) => state.filtersRnpAdd);
    const [rnpSelected, setRnpSelected] = useState(null);

    const MAX_RNP_SKU_LIMIT = useMemo(() => {
        let limit = 25 // default limit
        if (user && user.email === 'nastyaaa.355@gmail.com') {
            limit = 210;
        }
        return limit;
    }, [user]);

    const shopStatus = useMemo(() => {
        if (!activeBrand || !shops) return null;

        if (activeBrand.id === 0) {
            return {
                id: 0,
                brand_name: 'Все',
                is_active: shops.some((shop) => shop.is_primary_collect),
                is_valid: true,
                is_primary_collect: shops.some(
                    (shop) => shop.is_primary_collect
                ),
                is_self_cost_set: !shops.some((shop) => !shop.is_self_cost_set),
            };
        }

        return shops.find((shop) => shop.id === activeBrand.id);
    }, [activeBrand, shops]);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [localrnpDataArticle, setLocalrnpDataArticle] = useState(null);
    const [search, setSearch] = useState(null);
    const [error, setError] = useState(null);
    const initLoad = useRef(true);
    const isFirstMount = useRef(true);

    const submitRnpDataArticle = () => {
        addRnp(rnpSelected);
    };

    const selectRnpHandler = (value) => {
        let list = [];
        if (rnpSelected.includes(value)) {
            list = rnpSelected.filter((el) => el !== value);
        } else {
            list = [...rnpSelected, value];
        }
        setRnpSelected(list);
    };

    const updateData = async (currentPage) => {
        if (!loading) {
            setLoading(true)
        }
        try {
            const response = await ServiceFunctions.getRnpProducts(
                authToken,
                selectedRange,
                activeBrand?.id,
                filters,
                currentPage,
                search,
            );
            if (rnpSelected === null) {
                setRnpSelected(response?.rnp_wb_ids || []);
            }
            setLocalrnpDataArticle(response);
            const timeout = setTimeout(() => setLoading(false), 500)
            return () => timepout && clearTimeout(timeout)
        } catch (error) {
            setLoading(false);
            if (error.message !== 'Отмена запроса') {
                console.error('updaternpDataArticle error', error);
            }
        }
    };

    useEffect(() => {
        if (activeBrand && activeBrandName && isFiltersLoaded) {
            setPage(1)
            updateData(1);
        }
        if (!isFiltersLoaded) {
            dispatch(fetchFiltersRnpAdd(authToken));
        }
    }, [search, activeBrand, activeBrandName, isFiltersLoaded]);




    return (
        <>
            <Modal
                footer={null}
                onOk={() => setIsAddRnpModalVisible(false)}
                onCancel={() => setIsAddRnpModalVisible(false)}
                onClose={() => setIsAddRnpModalVisible(false)}
                open={isAddRnpModalVisible}
                width={960}
                closeIcon={close}
                centered
            // loading={loading || !isFiltersLoaded}
            >
                {(loading || !isFiltersLoaded) &&
                    <RadarLoader loaderStyle={{ height: 764 }} />
                }
                {!loading && isFiltersLoaded &&
                    <div className={styles.modal__content}>
                        <div className={styles.modal__header}>
                            <p className={styles.modal__title}>Добавить артикулы</p>
                        </div>
                        <div className={styles.control}>
                            <Filters
                                isDataLoading={loading}
                                slice={'filtersRnpAdd'}
                                filterActions={filterActions}
                                // fetchFilters={fetchFiltersRnpAdd}
                                timeSelect={false}
                                open={isAddRnpModalVisible}
                                articleSelect={false}
                                groupSelect={false}
                                categorySelect={false}
                            />
                        </div>
                        <div className={loading ? styles.hide : styles.control}><AddRnpModalSearch loading={loading} submitSearch={setSearch} /></div>
                        {/* loader */}
                        {/* {(loading || !rnpSelected || !isFiltersLoaded) && <div className={styles.loading}><span className='loader'></span></div>} */}
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorText: '#5329FF',
                                    colorPrimary: '#5329FF',
                                    colorBgTextHover: '#5329FF0D',
                                    controlInteractiveSize: 20
                                },
                                components: {
                                    Pagination: {
                                        itemActiveBg: '#EEEAFF',
                                        itemBg: '#F7F7F7',
                                        itemColor: '#8C8C8C',
                                    }
                                }
                            }}
                        >

                            {!isDemoMode && shopStatus && !shopStatus?.is_primary_collect && (
                                <div className={styles.data_collect}>
                                    <DataCollectWarningBlock
                                        bigPreview={false}
                                    />
                                </div>
                            )}

                            {/* shopStatus && shopStatus?.is_primary_collect */}

                            {shopStatus && shopStatus?.is_primary_collect && localrnpDataArticle && localrnpDataArticle?.data?.length == 0 && (<div className={styles.empty}>Ничего не найдено</div>)}
                            {shopStatus && shopStatus?.is_primary_collect && localrnpDataArticle && localrnpDataArticle?.data?.length > 0 && (<div className={styles.modal__container}>
                                {localrnpDataArticle?.data?.map((el, i) => (
                                    <Flex key={i} className={styles.item} gap={20}>
                                        {(rnpSelected.length >= MAX_RNP_SKU_LIMIT && !rnpSelected.includes(el.wb_id)) &&
                                            <Tooltip title={`Максимальное количество артикулов в РНП - ${MAX_RNP_SKU_LIMIT}`} arrow={false}>
                                                <Checkbox
                                                    defaultChecked={rnpSelected?.includes(el.wb_id)}
                                                    data-value={el.wb_id}
                                                    onChange={() => selectRnpHandler(el.wb_id)}
                                                    disabled={rnpSelected.length >= MAX_RNP_SKU_LIMIT && !rnpSelected.includes(el.wb_id)}
                                                />
                                            </Tooltip>
                                        }
                                        {(rnpSelected.length < MAX_RNP_SKU_LIMIT || rnpSelected.includes(el.wb_id)) &&
                                            <Checkbox
                                                defaultChecked={rnpSelected?.includes(el.wb_id)}
                                                data-value={el.wb_id}
                                                onChange={() => selectRnpHandler(el.wb_id)}
                                                disabled={rnpSelected.length >= MAX_RNP_SKU_LIMIT && !rnpSelected.includes(el.wb_id)}
                                            />
                                        }
                                        <RnpItem
                                            title={el.title}
                                            photo={el.photo}
                                            wb_id={el.wb_id}
                                            shop={el.shop_name}
                                        />
                                    </Flex>
                                ))}
                            </div>)}

                            {shopStatus?.is_primary_collect && <Pagination
                                locale={{
                                    items_per_page: 'записей на странице',
                                    jump_to: 'Перейти',
                                    jump_to_confirm: 'подтвердить',
                                    page: 'Страница',
                                    prev_page: 'Предыдущая страница',
                                    next_page: 'Следующая страница',
                                    prev_5: 'Предыдущие 5 страниц',
                                    next_5: 'Следующие 5 страниц',
                                    prev_3: 'Предыдущие 3 страниц',
                                    next_3: 'Следующие 3 страниц',
                                }}
                                defaultCurrent={1}
                                current={page}
                                onChange={(page) => {
                                    setPage(page);
                                    updateData(page);
                                }}
                                total={localrnpDataArticle?.total_count}
                                pageSize={localrnpDataArticle?.per_page}
                                showSizeChanger={false}
                                hideOnSinglePage={true}
                            />}
                        </ConfigProvider>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <AddRnpModalFooter
                                addProducts={submitRnpDataArticle}
                                setIsAddRnpModalVisible={setIsAddRnpModalVisible}
                                isDataLoading={loading}
                                submitDisabled={localrnpDataArticle?.length === 0}
                            />
                        </div>
                    </div>}
            </Modal>
            <ErrorModal open={!!error} message={error} onCancel={() => setError(null)} />
        </>
    );
};

export default AddRnpModal;
