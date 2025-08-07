import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import styles from './addSkuModal.module.css'
import AddSkuModalFooter from '../addSkuModalFooter/addSkuModalFooter'
import { Modal, Checkbox, ConfigProvider, Pagination, Flex, Form } from 'antd';
import AuthContext from '../../../../service/AuthContext';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { Filters } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent';
import SkuItem from '../SkuItem/SkuItem';
import { ServiceFunctions } from '../../../../service/serviceFunctions';

const AddSkuModal = ({ isAddSkuModalVisible, setIsAddSkuModalVisible, addSku, skuDataArticle=[] }) => {
    const [tableData, setTableData] = useState()
    const [initData, setInitData] = useState()
    const [isDataLoading, setIsDataLoading] = useState(false)
    const [checkedList, setCheckedList] = useState([]);
    const [paginationState, setPaginationState] = useState({ current: 1, total: 50, pageSize: 50 });
    const dispatch = useAppDispatch()
    const checkAll = tableData && tableData.length === checkedList.length;
    const indeterminate = tableData && checkedList.length > 0 && checkedList.length < tableData.length;
    
    // 
    const { authToken } = useContext(AuthContext);
    const { activeBrand, selectedRange } = useAppSelector(
        (state) => state.filters
    );
    const filters = useAppSelector((state) => state.filters);
    const { shops } = useAppSelector((state) => state.shopsSlice);

    const [skuLoading, setSkuLoading] = useState(true);
    const [localskuDataArticle, setLocalskuDataArticle] = useState([]);
    const [skuSelected, setSkuSelected] = useState(skuDataArticle?.map((el) => el.article_data.product_id))
    
    const [page, setPage] = useState(1);
    const [dateRange, setDateRange] = useState(null);

    const [submitStatus, setSubmitStatus] = useState(false);

    const updateskuDataArticle = useCallback(async () => {
        setSkuLoading(true);
        try {
            const response = await ServiceFunctions.getRnpProducts(
                authToken,
                selectedRange,
                activeBrand.id,
                filters,
                page,
                dateRange,
                paginationState.current
            )
            setLocalskuDataArticle(response.data)
            setPaginationState({ current: response.page, total: response.total_count, pageSize: response.per_page })
            // const [paginationState, setPaginationState] = useState({ current: 1, total: 50, pageSize: 50 });
            // получение данных по артикулу группы

        } catch(error) {
            console.error('updateskuDataArticle error', error);
        } finally {
            setSkuLoading(false);
        }
    }, [])

    const submitskuDataArticle = () => {
        addSku(skuSelected);
        setIsAddSkuModalVisible(false);
    }

    useEffect(() => {
        if (activeBrand){
            updateskuDataArticle();
        }
    }, [isAddSkuModalVisible, activeBrand, shops, filters])

    // console.log('filters', filters)
    // console.log('shops', shops)
    // console.log('activeBrand', activeBrand)

    useEffect(() => {
        setPaginationState({ current: 1, total: tableData?.length, pageSize: 50 })
    }, [tableData])

    const paginationHandler = (page) => {
        console.log('paginationHandler', page)
        setPaginationState((state) => ({
            ...state,
            current: page
        }))
    }

    return (
        <Modal
            footer={
                <AddSkuModalFooter
                    addProducts={submitskuDataArticle}
                    setIsAddSkuModalVisible={setIsAddSkuModalVisible}
                    isDataLoading={skuLoading}
                    isCheckedListEmpty={localskuDataArticle?.length === 0}
                />
            }
            onOk={() => setIsAddSkuModalVisible(false)}
            onCancel={() => setIsAddSkuModalVisible(false)}
            onClose={() => setIsAddSkuModalVisible(false)}
            open={isAddSkuModalVisible}
            width={1200}
            centered
        >
            <div className={styles.modal}>
                <div className={styles.modal__header}>
                    <p className={styles.modal__title}>Добавьте артикулы</p>
                </div>
                <Filters timeSelect={false} />
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

                    {!skuLoading && localskuDataArticle && (<div className={styles.modal__container}>
                        <Checkbox.Group
                            className={styles.group}
                            value={skuSelected}
                            onChange={setSkuSelected}
                            >
                        {localskuDataArticle?.map((el, i) => (
                            <Flex key={i} className={styles.item} gap={20}>
                                <Checkbox
                                    value={el.product_id}
                                    // defaultChecked={skuDataArticle?.some(_ => _.id === el.id)}
                                />
                                <SkuItem
                                    title={el.title}
                                    photo={el.photo}
                                    sku={el.wb_id}
                                    shop={el.shop_name}
                                />
                            </Flex>
                        ))}
                        </Checkbox.Group>
                    </div>)}

                    <Pagination
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
                        current={paginationState.current}
                        onChange={paginationHandler}
                        total={paginationState.total}
                        pageSize={paginationState.pageSize}
                        showSizeChanger={false}
                        hideOnSinglePage={true}
                    />
                </ConfigProvider>
            </div>
        </Modal>
    )
}

export default AddSkuModal;