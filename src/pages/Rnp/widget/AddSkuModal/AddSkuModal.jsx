import React, { useState, useEffect, useContext, useRef, useCallback, useMemo } from 'react';
import styles from './addSkuModal.module.css'
import { addSkuTableConfig } from '../../shared';
import { AddSkuModalFooter } from '../../entities'
import { Modal, Checkbox, ConfigProvider, Pagination, Input, Flex } from 'antd';
import wb_icon from '../../../../assets/wbicon.svg';
import { URL } from '../../../../service/config';
import AuthContext from '../../../../service/AuthContext';
import { fetchFilters } from '../../../../redux/apiServicePagesFiltersState/filterActions';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { Filters } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent';
import SkuHeader from '../SkuHeader/SkuHeader';
import { ServiceFunctions } from '../../../../service/serviceFunctions';

const getFilteredData = (query, data) => {
    let filteredData = data;

    if (data && query) {
        filteredData = data.filter((item) =>
            // item?.sku?.toLowerCase().includes(query.toLowerCase()) ||
            item?.article?.toLowerCase().includes(query.toLowerCase())
            // item?.productName?.toLowerCase().includes(query.toLowerCase())
        );

        filteredData.sort((a, b) => a.article.localeCompare(b.article))
    }

    return filteredData;
}

const AddSkuModal = ({ isAddSkuModalVisible, setIsAddSkuModalVisible, groupData, getGroupData, initDataFetchingStatus, setDataFetchingStatus, dataFetchingStatus, setAlertState, addSku }) => {
    let checkedListRef = useRef(null)
    const scrollContainerRef = useRef(null)
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
    const filters = useAppSelector((state) => state.filters);
    const { activeBrand } = useAppSelector((state) => state.filters);
    const { shops } = useAppSelector((state) => state.shopsSlice);

    const [skuLoading, setSkuLoading] = useState(true);
    const [skuList, setSkuList] = useState(null);

    const updateSkuList = useCallback(async () => {
        setSkuLoading(true);
        try {
            // получение данных по артикулу группы
            const data = ([
                {
                    "id": 1,
                    "photo": "https://basket-12.wbbasket.ru/vol1735/part173548/173548176/images/c246x328/1.webp",
                    "title": "гирлянда круглая золото",
                    "shop": 138,
                    sku: 123321123321
                },
                {
                    "id": 2,
                    "photo": "https://basket-14.wbbasket.ru/vol2154/part215481/215481827/images/c246x328/1.webp",
                    "title": "гирлянда круглая золото",
                    "shop": 138,
                    sku: 123321123321
                },
                {
                    "id": 3,
                    "photo": null,
                    "title": "Ремень кожаный для брюк и джинс",
                    "shop": 138,
                    sku: 123321123321
                }
            ])
            setTimeout(() => {
                setSkuLoading(false);
                setSkuList(data);
            }, 2000);
        } catch(error) {
            console.error('updateSkuList error', error);
        } finally {
            // setSkuLoading(false);
        }
    }, [])

    useEffect(() => {
        console.log('activeBrand')
        if (activeBrand){
            console.log('activeBrand2')
            updateSkuList();
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
    }

    return (
        <Modal
            footer={
                <AddSkuModalFooter
                    addProducts={addSku}
                    setIsAddSkuModalVisible={setIsAddSkuModalVisible}
                    isDataLoading={dataFetchingStatus.isLoading}
                    isCheckedListEmpty={checkedList?.length === 0}
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
                    {/* {tableData && */}
                    {/* {!isDataLoading && data.length > 0 && (<div className={styles.modal__tableWrapper}> */}
                    {skuLoading && <div className={styles.loading}><span className='loader'></span></div>}
                    {!skuLoading && skuList && (<div className={styles.modal__container}>
                        {skuList.map((el, i) => (
                            <Flex key={i} className={styles.item} gap={20}>
                                <Checkbox
                                    // checked={checkedList.some(_ => _ === product.id)}
                                    // value={product.id}
                                    // onChange={onCheckboxChange}
                                />
                                <SkuHeader title={el.title} photo={el.photo} sku={el.sku} shop={shops.find((shop) => (shop.id == el.shop)).brand_name
                                }/>
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
                        current={1}
                        onChange={paginationHandler}
                        // total={paginationState.total}
                        total={0}
                        // pageSize={paginationState.pageSize}
                        pageSize={10}
                        showSizeChanger={false}
                        hideOnSinglePage={true}
                    />
                </ConfigProvider>
            </div>
        </Modal>
    )
}

export default AddSkuModal;