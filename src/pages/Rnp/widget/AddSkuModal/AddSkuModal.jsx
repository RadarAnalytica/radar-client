import { useState, useEffect, useContext, useRef, useCallback, useMemo } from 'react';
import styles from './addSkuModal.module.css'
import AddSkuModalFooter from './widget/addSkuModalFooter/addSkuModalFooter'
import { Modal, Checkbox, ConfigProvider, Pagination, Flex, Tooltip } from 'antd';
import AuthContext from '../../../../service/AuthContext';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
// import { RnpFilters } from '../RnpFilters/RnpFilters';
import { Filters } from './widget/filters/Filters';
import SkuItem from '../SkuItem/SkuItem';
import { ServiceFunctions } from '../../../../service/serviceFunctions';
import AddSkuModalSearch from './widget/addSkuModalSearch/AddSkuModalSearch';
import { close } from '../icons';
import ErrorModal from '../../../../components/sharedComponents/modals/errorModal/errorModal';
import DataCollectWarningBlock from '../../../../components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock';
import { fetchFiltersRnpAdd } from '../../../../redux/filtersRnpAdd/filtersRnpAddActions';
import { actions as filterActions } from '../../../../redux/filtersRnpAdd/filtersRnpAddSlice';
import { actions as rnpSelectedActions } from '../../../../redux/rnpSelected/rnpSelectedSlice'

const AddSkuModal = ({ isAddSkuModalVisible, setIsAddSkuModalVisible, addSku }) => {
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
    const [localRnpDataArticle, setLocalRnpDataArticle] = useState([]);
    const [search, setSearch] = useState(null);
    const [error, setError] = useState(null);
    const [request, setRequest] = useState(null);
    const initLoad = useRef(true);

    const submitSkuDataArticle = () => {
        addSku(rnpSelected);
    }

    const selectSkuHandler = (value) => {
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
        setRequest((state) => Date.now());
    }, [search, filters])
    
    useEffect(() => {
        setRequest((state) => Date.now());
    }, [page])

    useEffect(() => {
        if (!activeBrand || (
            initLoad.current &&
            activeBrand.id !== 0 &&
            (filters.activeBrandName.some(_ => _.value === 'Все') ||
            filters.activeArticle.some(_ => _.value === 'Все') ||
            filters.activeGroup.some(_ => _.value === 'Все') ||
            filters.activeCategory.some(_ => _.value === 'Все'))
        )){
            return
        }

        const abortController = new AbortController();
        const { signal } = abortController;

        const updateData = async () => {
            setSkuLoading(true);
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

                setLocalRnpDataArticle(response);
                setLoading(false);
            } catch (error) {
				if (error.message !== 'Отмена запроса') {
                    console.error('updateskuDataArticle error', error);
                }
            }
        };

        updateData();

        return () => {
            abortController.abort('Отмена запроса');
        };
    }, [request]);

    return (
        <>
            <Modal
                footer={
                    <AddRnpModalFooter
                        addProducts={submitRnpDataArticle}
                        setIsAddRnpModalVisible={setIsAddRnpModalVisible}
                        isDataLoading={loading}
                        submitDisabled={localRnpDataArticle?.length === 0}
                    />
                }
                onOk={() => setIsAddSkuModalVisible(false)}
                onCancel={() => setIsAddSkuModalVisible(false)}
                onClose={() => setIsAddSkuModalVisible(false)}
                open={isAddSkuModalVisible}
                width={1200}
                closeIcon={close}
                centered
            >
                <div className={styles.modal__content}>
                    <div className={styles.modal__header}>
                        <p className={styles.modal__title}>Добавить артикулы</p>
                    </div>
                    <div className=
                    {skuLoading ? styles.hide : styles.control}>
                        <Filters
                            isDataLoading={skuLoading}
                            slice={'filtersRnpAdd'}
                            filterActions={filterActions}
                            fetchFilters={fetchFiltersRnpAdd}
                            timeSelect={false}
                            open={isAddSkuModalVisible}
                            // clearLoad={true}
                        />
                    </div>
                    <div className={skuLoading ? styles.hide : styles.control}><AddSkuModalSearch skuLoading={skuLoading} submitSearch={setSearch} /></div>
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
                        {skuLoading && <div className={styles.loading}><span className='loader'></span></div>}

                        {!skuLoading && shopStatus && !shopStatus?.is_primary_collect && (
                            <div className={styles.data_collect}>
                                <DataCollectWarningBlock
                                    bigPreview={false}
                                />
                            </div>
                        )}

                        {!loading && shopStatus && shopStatus?.is_primary_collect && localRnpDataArticle && localRnpDataArticle?.data?.length == 0 && (<div className={styles.empty}>Ничего не найдено</div>)}
                        {!loading && shopStatus && shopStatus?.is_primary_collect && localRnpDataArticle && localRnpDataArticle?.data?.length > 0 && (<div className={styles.modal__container}>
                            {localRnpDataArticle?.data?.map((el, i) => (
                                <Flex key={i} className={styles.item} gap={20}>
                                    {(rnpSelected.length >= 25 && !rnpSelected.includes(el.wb_id)) && 
                                      <Tooltip title="Максимальное количество артикулов в РНП - 25" arrow={false}>
                                        <Checkbox
                                            defaultChecked={rnpSelected?.includes(el.wb_id)}
                                            data-value={el.wb_id}
                                            onChange={() => selectSkuHandler(el.wb_id)}
                                            disabled={rnpSelected.length >= 25 && !rnpSelected.includes(el.wb_id)}
                                        />
                                      </Tooltip>
                                    }
                                    {(rnpSelected.length < 25 || rnpSelected.includes(el.wb_id)) && 
                                        <Checkbox
                                            defaultChecked={rnpSelected?.includes(el.wb_id)}
                                            data-value={el.wb_id}
                                            onChange={() => selectSkuHandler(el.wb_id)}
                                            disabled={rnpSelected.length >= 25 && !rnpSelected.includes(el.wb_id)}
                                        />
                                    }
                                    <SkuItem
                                        title={el.title}
                                        photo={el.photo}
                                        sku={el.wb_id}
                                        shop={el.shop_name}
                                    />
                                </Flex>
                            ))}
                        </div>)}

                        {!skuLoading && shopStatus?.is_primary_collect && <Pagination
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
                            total={localRnpDataArticle?.total_count}
                            pageSize={localRnpDataArticle?.per_page}
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

export default AddSkuModal;