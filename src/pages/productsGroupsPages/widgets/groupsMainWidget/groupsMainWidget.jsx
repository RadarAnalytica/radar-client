import React, { useState, useContext, useEffect } from 'react';
import styles from './groupsMainWidget.module.css';
import { groupsMainTableConfig, buttonIcons } from '../../shared';
import { Checkbox, ConfigProvider, message } from 'antd';
import { Link } from 'react-router-dom';
import AuthContext from '@/service/AuthContext';
import { GroupEditModal, ConfirmationModal } from '../../features';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchFilters } from '@/redux/apiServicePagesFiltersState/filterActions';
import { fetchApi } from "@/service/fetchApi";

const initConfirmationState = {
  open: false, title: '',
  message: '',
  mainAction: '',
  returnAction: '',
  actionTitle: '',
};

const GroupsMainWidget = ({ setIsAddGroupModalVisible, groupsMainData, getGroupsData, setDataFetchingStatus, initDataFetchingStatus, dataFetchingStatus, setAlertState }) => {
    const { authToken } = useContext(AuthContext);
    const [tableData, setTableData] = useState([]);
    const [checkedList, setCheckedList] = useState([]);
    const [isEditGroupModalVisible, setIsEditGroupModalVisible] = useState(false);
    const [confirmationModalState, setConfirmationModalState] = useState(initConfirmationState);
    const [editedGroupId, setEditedGroupId] = useState();
    const { shops } = useAppSelector((state) => state.shopsSlice);
    const dispatch = useAppDispatch();
    const checkAll = tableData && tableData.length === checkedList.length;
    const indeterminate = tableData && checkedList.length > 0 && checkedList.length < tableData.length;

    const onCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCheckedList([...checkedList, value]);
        } else {
            const index = checkedList.findIndex(_ => _ === value);
            const newList = checkedList;
            newList.splice(index, 1);
            setCheckedList([...newList]);
        }
    };

    const deleteGroup = async (authToken, groupId) => {
        setDataFetchingStatus({ ...initDataFetchingStatus, isLoading: true });
        try {
            // TODO: перенести метод в ServiceFunctions
            const res = await fetchApi(`/api/product/product_groups/${groupId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken
                },
            });

            if (!res.ok) {
                const parsedData = await res.json();
                setDataFetchingStatus({
                  ...initDataFetchingStatus,
                  isError: true,
                  message: parsedData?.detail || 'Что-то пошло не так :('
                });
                return;
            }
            setAlertState({isVisible: true, message: 'Группа успешно удалена'});
            dispatch(fetchFilters({authToken, shopsData: shops}));
            getGroupsData(authToken);
        } catch (e) {
            console.error('Error:', e);
            setDataFetchingStatus({
              ...initDataFetchingStatus,
              isError: true,
              message: 'Что-то пошло не так :('
            });
        }
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? tableData.map(_ => _.group) : []);
    };

    useEffect(() => {
        groupsMainData && setTableData(groupsMainData);
    }, [groupsMainData]);

    useEffect(() => {
        editedGroupId && setIsEditGroupModalVisible(true);
    }, [editedGroupId]);
    useEffect(() => {
        if (!isEditGroupModalVisible) {
            setEditedGroupId(undefined);
        }
    }, [isEditGroupModalVisible]);

    return (
        <div className={styles.widget}>
            <div className={styles.widget__controlsWrapper}>
                <button className={styles.widget__addButton} onClick={() => setIsAddGroupModalVisible(true)}>
                    Создать группу
                </button>
            </div>

            {tableData &&
                <div className={styles.widget__tableWrapper}>

                    {/* table */}
                    <div className={styles.table}>
                        {/* Хэдер */}
                        <div className={styles.table__headerContainer}>
                            <div className={styles.table__header}>
                                {/* Мапим массив значений заголовков */}
                                {tableData && groupsMainTableConfig.values.map((v, id) => {
                                    return (
                                        <div className={styles.table__headerItem} key={id}>

                                            {v.hasSelect &&
                                                <div className={styles.sortControls}>
                                                    <ConfigProvider
                                                        theme={{
                                                            token: {
                                                                colorPrimary: '#5329FF',
                                                                colorBgContainer: 'transparent'
                                                            }
                                                        }}
                                                    >
                                                        <Checkbox
                                                            indeterminate={indeterminate}
                                                            onChange={onCheckAllChange}
                                                            checked={checkAll}
                                                        />
                                                    </ConfigProvider>
                                                </div>
                                            }
                                            <p className={styles.table__headerItemTitle}>{v.ruName}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Тело таблицы */}
                        <div className={styles.table__body}>
                            {/* Мапим данные о товарах */}
                            {tableData && tableData.length > 0 && tableData.map((product, id) => {
                                return (
                                    <div
                                        className={styles.table__row}
                                        key={id}
                                        id={`table_row_${id}`}
                                    >
                                        {/* Для каждого товара мапим заголовки таблицы еще раз и забираем из товара нужны данные (в первой колонке одновременно фото и название) */}
                                        {groupsMainTableConfig.values.map(((v, id) => {

                                            if (v.engName === 'actions') {

                                                return (
                                                    <div className={styles.table__rowItem} key={id}>
                                                        {v.actionTypes.map((a, id) => {
                                                            if (a === 'edit') {
                                                                return (
                                                                    <button className={styles.table__actionButton} key={id} onClick={() => setEditedGroupId(product.id)}>
                                                                        {buttonIcons[a]}
                                                                    </button>
                                                                    // <Link className={styles.table__actionButton} key={id} to={`/groups/${product.id}`}>
                                                                    //     {buttonIcons[a]}
                                                                    // </Link>
                                                                );
                                                            }
                                                            if (a === 'delete') {
                                                                return (
                                                                    <button
                                                                        className={styles.table__actionButton}
                                                                        key={id}
                                                                        //onClick={() => deleteGroup(authToken, product.id)}
                                                                        onClick={() => setConfirmationModalState({open: true, title: 'Удаление группы', actionTitle: 'Удалить', message: `Вы уверены, что хотите удалить группу "${product.name}"?`, mainAction: () => {deleteGroup(authToken, product.id);}, returnAction: () => {setConfirmationModalState(initConfirmationState);}})}
                                                                    >
                                                                        {buttonIcons[a]}
                                                                    </button>
                                                                );
                                                            }
                                                            return (
                                                                <button className={styles.table__actionButton} key={id}>
                                                                    {buttonIcons[a]}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            }
                                            if (v.engName === 'name') {

                                                return (
                                                    <div className={styles.table__rowItem} key={id}>
                                                        <Link to={`/groups/${product.id}`} className={styles.table__rowTitle}>{product[v.engName]}</Link>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div className={styles.table__rowItem} key={id}>
                                                    {v.hasSelect ?
                                                        <>
                                                            <ConfigProvider
                                                                theme={{
                                                                    token: {
                                                                        colorPrimary: '#5329FF',
                                                                        colorBgContainer: 'transparent'
                                                                    }
                                                                }}
                                                            >
                                                                <Checkbox
                                                                    checked={checkedList.some(_ => _ === product.group)}
                                                                    value={product.group}
                                                                    onChange={onCheckboxChange}
                                                                />
                                                            </ConfigProvider>

                                                        </>
                                                        :
                                                        <>
                                                            {product[v.engName]}
                                                        </>
                                                    }

                                                </div>
                                            );
                                        }))}
                                    </div>
                                );
                            })}
                            {/* No data */}
                            {tableData && tableData.length === 0 &&
                                <div className={styles.table__row}>
                                    <div className={`${styles.table__rowItem} ${styles.table__rowItem_wide}`}>
                                        Товары отсутствуют
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {/* !table */}


                </div>}

            <GroupEditModal
                setIsEditGroupModalVisible={setIsEditGroupModalVisible}
                isEditGroupModalVisible={isEditGroupModalVisible}
                dataFetchingStatus={dataFetchingStatus}
                setDataFetchingStatus={setDataFetchingStatus}
                groupId={editedGroupId}
                updateMainData={getGroupsData}
            />

            <ConfirmationModal
                {...confirmationModalState}
            />
        </div>
    );
};

export default GroupsMainWidget;
