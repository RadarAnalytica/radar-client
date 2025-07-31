import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from './addSkuModal.module.css'
import { addSkuTableConfig } from '../../shared';
import { AddSkuModalFooter } from '../../entities'
import { Modal, Checkbox, ConfigProvider, Pagination, Input, Flex } from 'antd';
import wb_icon from '../../../../assets/wbicon.svg';
import { URL } from '../../../../service/config';
import AuthContext from '../../../../service/AuthContext';
import { fetchFilters } from '../../../../redux/apiServicePagesFiltersState/filterActions';
import { useAppDispatch } from '../../../../redux/hooks';
import { Filters } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent';
import SkuHeader from '../SkuHeader/SkuHeader';

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

const AddSkuModal = ({ isAddSkuModalVisible, setIsAddSkuModalVisible, groupData, getGroupData, initDataFetchingStatus, setDataFetchingStatus, dataFetchingStatus, shops, setAlertState, addSku }) => {
    let checkedListRef = useRef(null)
    const scrollContainerRef = useRef(null)
    const { authToken } = useContext(AuthContext)
    const [tableData, setTableData] = useState()
    const [initData, setInitData] = useState()
    const [isDataLoading, setIsDataLoading] = useState(false)
    const [checkedList, setCheckedList] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState('')
    const [paginationState, setPaginationState] = useState({ current: 1, total: 50, pageSize: 50 });
    const dispatch = useAppDispatch()
    const checkAll = tableData && tableData.length === checkedList.length;
    const indeterminate = tableData && checkedList.length > 0 && checkedList.length < tableData.length;


    const onCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCheckedList([...checkedList, value])
            // if (searchInputValue && checkedListRef?.current && checkedListRef?.current.some(_ => _ === value)) {
            //     let newSavedList = checkedListRef.current;
            //     const index = newSavedList.findIndex(_ => _ === value);
            //     checkedListRef.current = newSavedList.splice(index, 1)
            // }
        } else {
            const index = checkedList.findIndex(_ => _ === value)
            const newList = checkedList
            newList.splice(index, 1)

            if (searchInputValue && checkedListRef?.current && checkedListRef?.current.some(_ => _ === value)) {
                let newSavedList = checkedListRef.current;
                const index = newSavedList.findIndex(_ => _ === value);
                newSavedList.splice(index, 1)
                checkedListRef.current = newSavedList
            }
            setCheckedList([...newList])
        }
    };

    const onCheckAllChange = e => {
        if (searchInputValue && checkedListRef?.current) {
            const newSavedList = checkedListRef?.current;
            tableData.forEach(i => {
                if (newSavedList.some(_ => _ === i.id)) {
                    const index = newSavedList.findIndex(_ => _ === i.id);
                    newSavedList.splice(index, 1)
                }
            })
            checkedListRef.current = newSavedList
        }
        setCheckedList(e.target.checked ? tableData.map(_ => _.id) : []);
    };

    const getProductsList = async (authToken, groupId) => {
        !tableData && setDataFetchingStatus({ ...initDataFetchingStatus, isLoading: true })
        try {
            const res = await fetch(`${URL}/api/product/product_groups/${groupId}/products`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken,
                    'cache': 'no-store'
                },
            })

            if (!res.ok) {
                const parsedData = await res.json()
                setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: parsedData?.detail || 'Что-то пошло не так :(' })
                return;
            }
            const parsedRes = await res.json();
            setTableData(parsedRes.data.products.sort((a, b) => a.article.localeCompare(b.article)))
            setInitData(parsedRes.data.products.sort((a, b) => a.article.localeCompare(b.article)))
            setPaginationState({ ...paginationState, total: parsedRes.data.products.length })
            setCheckedList(parsedRes.data.products.filter(_ => _.in_group).map(_ => _.id))
            //setGroupData(parsedRes.data)
            setDataFetchingStatus(initDataFetchingStatus)
        } catch {
            setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: 'Что-то пошло не так :(' })
        }
    }

    const addProducts = async () => {
        let requestObject = {
            name: groupData.name,
            description: groupData.description,
            product_ids: checkedList
        }
        if (searchInputValue) {
            let ids = [...checkedList, ...checkedListRef.current]
            let normalizedIds = []
            ids.forEach(i => {
                if (!normalizedIds.some(_ => _ === i)) {
                    normalizedIds.push(i)
                }
            })

            requestObject.product_ids = normalizedIds
        }

        try {
            const res = await fetch(`${URL}/api/product/product_groups/${groupData.id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken,
                },
                body: JSON.stringify(requestObject)
            })

            if (!res.ok) {
                const parsedData = await res.json()
                setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: parsedData?.detail || 'Что-то пошло не так :(' })
                return;
            }
            setIsAddSkuModalVisible(false)
            getGroupData(authToken, groupData.id)
            setAlertState({ isVisible: true, message: 'Артикул успешно добавлен' })
            dispatch(fetchFilters(authToken))
            //setGroupData(parsedRes.data)
            //setDataFetchingStatus(initDataFetchingStatus)
        } catch {
            setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: 'Что-то пошло не так :(' })
        }
    }

    const paginationHandler = (page) => {
        setPaginationState({ ...paginationState, current: page })
    }

    const inputKeydownHandler = (e) => {
        if (e && e.key !== 'Enter') return
        searchButtonClickHandler()
    }
    const searchButtonClickHandler = () => {
        const filteredData = getFilteredData(searchInputValue.trim(), initData)
        const newCheckedList = []
        checkedList.forEach(i => {
            if (filteredData.some(_ => _.id === i)) {
                newCheckedList.push(i)
            }
        })
        // Store current checked items before clearing
        checkedListRef.current = [...checkedList];
        setCheckedList(newCheckedList)
        setTableData(filteredData)
    }
    const inputChangeHandler = (e) => {
        if (e.target.value === '') {
            setTableData([...initData])

            if (checkedListRef.current) {
                setCheckedList([...checkedListRef.current, ...checkedList])
            }
        }
        setSearchInputValue(e.target.value)
    }

    useEffect(() => {
        if (groupData && groupData.id) {
            getProductsList(authToken, groupData.id)
        }
    }, [groupData, groupData.products])



    useEffect(() => {
        const paginationNextButton = document.querySelector('.ant-pagination-jump-next')
        const paginationPrevButton = document.querySelector('.ant-pagination-jump-prev')
        const paginationSingleNextButton = document.querySelector('.ant-pagination-next')
        const paginationSinglePrevButton = document.querySelector('.ant-pagination-prev')
        if (paginationNextButton) {
         paginationNextButton.setAttribute('title', 'Следующие 5 страниц')
        }
        if (paginationSingleNextButton) {
         paginationSingleNextButton.setAttribute('title', 'Следующая страница')
        }
        if (paginationSinglePrevButton) {
         paginationSinglePrevButton.setAttribute('title', 'Предыдущая страница')
        }
        if (paginationPrevButton) {
         paginationPrevButton.setAttribute('title', 'Предыдущие 5 страниц')
        }
     }, [paginationState])

    useEffect(() => {
        setPaginationState({ current: 1, total: tableData?.length, pageSize: 50 })
    }, [tableData])

    useEffect(() => {
        if (!isAddSkuModalVisible) {
            setSearchInputValue('')
            setTableData(initData)
            setCheckedList(initData?.filter(_ => _.in_group).map(_ => _.id));
        }
    }, [isAddSkuModalVisible])

    useEffect(() => {
        const { current } = scrollContainerRef;
        current?.scrollTo({ top: 0, behavior: 'smooth', duration: 100 })
    }, [paginationState.current])

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
                <Filters />
                {/* loader */}
                {dataFetchingStatus.isLoading && !tableData &&
                    <div className={styles.modal__loaderWrapper}>
                        <span className='loader'></span>
                    </div>
                }
                {/* main data */}
                {/* {tableData && */}
                {true &&
                    <div className={styles.modal__tableWrapper} ref={scrollContainerRef}>

                    <Flex className={styles.item} gap={20}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#5329FF',
                                    colorBgContainer: 'transparent',
                                    controlInteractiveSize: 20
                                }
                            }}
                        >
                            <Checkbox
                                // checked={checkedList.some(_ => _ === product.id)}
                                // value={product.id}
                                // onChange={onCheckboxChange}
                            />
                        </ConfigProvider>
                        <SkuHeader />
                    </Flex>
                    <Flex className={styles.item} gap={20}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#5329FF',
                                    colorBgContainer: 'transparent',
                                    controlInteractiveSize: 20
                                }
                            }}
                        >
                            <Checkbox
                                // checked={checkedList.some(_ => _ === product.id)}
                                // value={product.id}
                                // onChange={onCheckboxChange}
                            />
                        </ConfigProvider>
                            <SkuHeader />
                    </Flex>


                    </div>}
                <ConfigProvider
                    theme={{
                        token: {
                            colorText: '#5329FF',
                            lineWidth: 0,
                            colorPrimary: '#5329FF'
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
                    <Pagination
                        defaultCurrent={1}
                        current={paginationState.current}
                        onChange={paginationHandler}
                        total={paginationState.total}
                        pageSize={paginationState.pageSize}
                        showSizeChanger={false}
                    //showTotal={(total) => `Всего ${total} товаров`}
                    />
                </ConfigProvider>
            </div>
        </Modal>
    )
}

export default AddSkuModal;