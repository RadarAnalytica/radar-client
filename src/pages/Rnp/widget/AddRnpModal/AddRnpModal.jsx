import { useState, useEffect, useContext, useRef, useCallback, useMemo } from 'react';
import styles from './addRnpModal.module.css'
import AddRnpModalFooter from './widget/AddRnpModalFooter/AddRnpModalFooter'
import { Modal, Checkbox, ConfigProvider, Pagination, Flex, Tooltip } from 'antd';
import AuthContext from '../../../../service/AuthContext';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
// import { RnpFilters } from '../RnpFilters/RnpFilters';
import { Filters } from './widget/AddRnpFilters/AddRnpFilters';
import RnpItem from '../RnpItem/RnpItem';
import { ServiceFunctions } from '../../../../service/serviceFunctions';
import AddRnpModalSearch from './widget/AddRnpModalSearch/AddRnpModalSearch';
import { close } from '../icons';
import ErrorModal from '../../../../components/sharedComponents/modals/errorModal/errorModal';
import DataCollectWarningBlock from '../../../../components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import { fetchFiltersRnpAdd } from '../../../../redux/filtersRnpAdd/filtersRnpAddActions';
import { actions as filterActions } from '../../../../redux/filtersRnpAdd/filtersRnpAddSlice';
import { actions as rnpSelectedActions } from '../../../../redux/rnpSelected/rnpSelectedSlice'

const AddRnpModal = ({ isAddRnpModalVisible, setIsAddRnpModalVisible, addRnp }) => {
    const dispatch = useAppDispatch();
    const { authToken } = useContext(AuthContext);
    const { shops, activeBrand, selectedRange, activeBrandName, activeGroup, activeCategory } = useAppSelector( (state) => state.filtersRnpAdd );
    const filters = useAppSelector((state) => state.filtersRnpAdd);
    const [ rnpSelected, setRnpSelected ] = useState(null);

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
    // const [rnpInprogress, setRnpInprogress] = useState(false);
    const [localrnpDataArticle, setLocalrnpDataArticle] = useState([]);
    const [search, setSearch] = useState(null);
    const [error, setError] = useState(null);
    const [request, setRequest] = useState(null);
    const initLoad = useRef(true);

    const submitRnpDataArticle = () => {
        addRnp(rnpSelected);
    }

    const selectRnpHandler = (value) => {
        let list = [];
        if (rnpSelected.includes(value)){
            list = rnpSelected.filter((el) => el !== value)
        } else {
            list = [...rnpSelected, value]
        }
        setRnpSelected(list);
    }

    useEffect(() => {
        if ( page !== 1 ){
            setPage(1)
        }
        setRequest((state) => !state);
    }, [search, filters, shops, activeBrand])

    useEffect(() => {
        setRequest((state) => Date.now());
    }, [page])

    useEffect(() => {
        if (!activeBrand || (
            initLoad.current &&
            activeBrand.id !== 0 &&
            (filters.activeBrandName.some(_ => _.value === 'Все') &&
            filters.activeArticle.some(_ => _.value === 'Все') &&
            filters.activeGroup.some(_ => _.value === 'Все') &&
            filters.activeCategory.some(_ => _.value === 'Все'))
        )){
            return
        }

        const abortController = new AbortController();
        const { signal } = abortController;

        const updateData = async () => {
            setLoading(true);
            try {
                const response = await ServiceFunctions.getRnpProducts(
                    authToken,
                    selectedRange,
                    activeBrand.id,
                    filters,
                    page,
                    search,
                    signal
                );
                if (initLoad.current) {
                    initLoad.current = false;
                }
                if (rnpSelected === null) {
					setRnpSelected(response?.rnp_wb_ids || []);
                }

                setLocalrnpDataArticle(response);
                setLoading(false);
            } catch (error) {
				if (error.message !== 'Отмена запроса') {
                    console.error('updaternpDataArticle error', error);
                }
            }
        };

        updateData();

        return () => {
            abortController.abort('Отмена запроса');
        };
    }, [page, request]);

    // useEffect(() => {
    //     return () => {
    //         setPage(1);
    //         setSearch(null);
    //         dispatch(filterActions.setActiveShop(null));
    //     }
    // }, [])

    return (
        <>
            <Modal
                footer={
                    <AddRnpModalFooter
                        addProducts={submitRnpDataArticle}
                        setIsAddRnpModalVisible={setIsAddRnpModalVisible}
                        isDataLoading={loading}
                        submitDisabled={localrnpDataArticle?.length === 0}
                    />
                }
                onOk={() => setIsAddRnpModalVisible(false)}
                onCancel={() => setIsAddRnpModalVisible(false)}
                onClose={() => setIsAddRnpModalVisible(false)}
                open={isAddRnpModalVisible}
                width={1200}
                closeIcon={close}
                centered
            >
                <div className={styles.modal__content}>
                    <div className={styles.modal__header}>
                        <p className={styles.modal__title}>Добавить артикулы</p>
                    </div>
                    <div className=
                    {loading ? styles.hide : styles.control}>
                        <Filters
                            isDataLoading={loading}
                            slice={'filtersRnpAdd'}
                            filterActions={filterActions}
                            fetchFilters={fetchFiltersRnpAdd}
                            timeSelect={false}
                            open={isAddRnpModalVisible}
                            // clearLoad={true}
                        />
                    </div>
                    <div className={loading ? styles.hide : styles.control}><AddRnpModalSearch loading={loading} submitSearch={setSearch} /></div>
                    {/* loader */}
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
                        {loading && <div className={styles.loading}><span className='loader'></span></div>}

                        {!loading && shopStatus && !shopStatus?.is_primary_collect && (
                            <div className={styles.data_collect}>
                                <DataCollectWarningBlock
                                    bigPreview={false}
                                />
                            </div>
                        )}

                        {!loading && shopStatus && shopStatus?.is_primary_collect && localrnpDataArticle && localrnpDataArticle?.data?.length == 0 && (<div className={styles.empty}>Ничего не найдено</div>)}
                        {!loading && shopStatus && shopStatus?.is_primary_collect && localrnpDataArticle && localrnpDataArticle?.data?.length > 0 && (<div className={styles.modal__container}>
                            {localrnpDataArticle?.data?.map((el, i) => (
                                <Flex key={i} className={styles.item} gap={20}>
                                    {(rnpSelected.length >= 25 && !rnpSelected.includes(el.wb_id)) && 
                                      <Tooltip title="Максимальное количество артикулов в РНП - 25" arrow={false}>
                                        <Checkbox
                                            defaultChecked={rnpSelected?.includes(el.wb_id)}
                                            data-value={el.wb_id}
                                            onChange={() => selectRnpHandler(el.wb_id)}
                                            disabled={rnpSelected.length >= 25 && !rnpSelected.includes(el.wb_id)}
                                        />
                                      </Tooltip>
                                    }
                                    {(rnpSelected.length < 25 || rnpSelected.includes(el.wb_id)) && 
                                        <Checkbox
                                            defaultChecked={rnpSelected?.includes(el.wb_id)}
                                            data-value={el.wb_id}
                                            onChange={() => selectRnpHandler(el.wb_id)}
                                            disabled={rnpSelected.length >= 25 && !rnpSelected.includes(el.wb_id)}
                                        />
                                    }
                                    <RnpItem
                                        title={el.title}
                                        photo={el.photo}
                                        rnp={el.wb_id}
                                        shop={el.shop_name}
                                    />
                                </Flex>
                            ))}
                        </div>)}

                        {!loading && shopStatus?.is_primary_collect && <Pagination
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
                            onChange={setPage}
                            total={localrnpDataArticle?.total_count}
                            pageSize={localrnpDataArticle?.per_page}
                            showSizeChanger={false}
                            hideOnSinglePage={true}
                        />}
                    </ConfigProvider>
                </div>
            </Modal>
            <ErrorModal open={!!error} message={error} onCancel={() => setError(null)}/>
        </>
    )
}

export default AddRnpModal;