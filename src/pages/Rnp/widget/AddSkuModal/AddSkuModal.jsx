import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import styles from './addSkuModal.module.css'
import AddSkuModalFooter from '../addSkuModalFooter/addSkuModalFooter'
import { Modal, Checkbox, ConfigProvider, Pagination, Flex, Form } from 'antd';
import AuthContext from '../../../../service/AuthContext';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { Filters } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent';
import SkuItem from '../SkuItem/SkuItem';
import { ServiceFunctions } from '../../../../service/serviceFunctions';

const AddSkuModal = ({ isAddSkuModalVisible, setIsAddSkuModalVisible, addSku, skuList }) => {
    // 
    const { authToken } = useContext(AuthContext);
    const { activeBrand, selectedRange } = useAppSelector(
        (state) => state.filters
    );
    const filters = useAppSelector((state) => state.filters);
    const { shops } = useAppSelector((state) => state.shopsSlice);
    
    const [paginationState, setPaginationState] = useState(1);
    const [skuLoading, setSkuLoading] = useState(true);
    const [localskuDataArticle, setLocalskuDataArticle] = useState([]);
    const [skuSelected, setSkuSelected] = useState([...skuList]);
    const [search, setSearch] = useState('');
    const [dateRange, setDateRange] = useState(null);

    const updateskuDataArticle = async () => {
        setSkuLoading(true);
        try {
            if (!!activeBrand) {
                const response = await ServiceFunctions.getRnpProducts(
                    authToken,
                    paginationState,
                    search
                )
                setLocalskuDataArticle(response)
                // setPaginationState((state) => ({ ...state, total: response.total_count, pageSize: response.per_page }))
            }
            // const [paginationState, setPaginationState] = useState({ current: 1, total: 50, pageSize: 50 });
            // получение данных по артикулу группы

        } catch(error) {
            console.error('updateskuDataArticle error', error);
        } finally {
            setSkuLoading(false);
        }
    }

    const submitSkuDataArticle = () => {
        addSku(skuSelected);
    }

    const selectSkuHandler = (e) => {
        const value = e.target.value;
        setSkuSelected((list) => {
            if (list.includes(value)){
                return list.filter((el) => el !== value)
            }
            return [...list, value]
        })
    }

    useEffect(() => {
        if (activeBrand && isAddSkuModalVisible){
            updateskuDataArticle();
        }
    }, [isAddSkuModalVisible, activeBrand, shops, filters, paginationState])

    useEffect(() => {
        if (isAddSkuModalVisible) {
            setPaginationState(1);
        }
    }, [isAddSkuModalVisible])

    return (
        <Modal
            footer={
                <AddSkuModalFooter
                    addProducts={submitSkuDataArticle}
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
                        {localskuDataArticle?.data?.map((el, i) => (
                            <Flex key={i} className={styles.item} gap={20}>
                                <Checkbox
                                    defaultChecked={skuSelected.includes(el.product_id)}
                                    value={el.product_id}
                                    onChange={selectSkuHandler}
                                />
                                {skuSelected.includes(el.product_id) ? 1 : 0} - {el.product_id}
                                <SkuItem
                                    title={el.title}
                                    photo={el.photo}
                                    sku={el.wb_id}
                                    shop={el.shop_name}
                                />
                            </Flex>
                        ))}
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
                        current={paginationState}
                        onChange={setPaginationState}
                        total={localskuDataArticle.total_count}
                        pageSize={localskuDataArticle.per_page}
                        showSizeChanger={false}
                        hideOnSinglePage={true}
                    />
                </ConfigProvider>
            </div>
        </Modal>
    )
}

export default AddSkuModal;