import React, { useState, useContext, useEffect } from 'react';
import MobilePlug from '../../../../components/sharedComponents/mobilePlug/mobilePlug';
import Header from '../../../../components/sharedComponents/header/header';
import Breadcrumbs from '../../../../components/sharedComponents/header/headerBreadcrumbs/breadcrumbs';
import Sidebar from '../../../../components/sharedComponents/sidebar/sidebar';
import { AddSkuModal } from '../../features';
import { SingleGroupWidget, NoDataWidget } from '../../widgets';
import { useNavigate } from 'react-router-dom';
import styles from './singleGroupPage.module.css'
import AuthContext from '../../../../service/AuthContext';
import ErrorModal from '../../../../components/sharedComponents/modals/errorModal/errorModal';
import { useParams } from 'react-router-dom';
import { URL } from '../../../../service/config';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { fetchShops } from '../../../../redux/shops/shopsActions';


const initDataFetchingStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const mockData = [
    {
        product: 'Some product name',
        brand: 'Some brand name',
        shop: 'Some shop name',
        sku: '0001',
        photo: 'https://basket-16.wbbasket.ru/vol2567/part256714/256714767/images/c246x328/1.webp'
    },
    {
        product: 'Some product name',
        brand: 'Some brand name',
        shop: 'Some shop name',
        sku: '0002',
        photo: 'https://basket-16.wbbasket.ru/vol2567/part256714/256714767/images/c246x328/1.webp'
    },
    {
        product: 'Some product name',
        brand: 'Some brand name',
        shop: 'Some shop name',
        sku: '0003',
        photo: 'https://basket-16.wbbasket.ru/vol2567/part256714/256714767/images/c246x328/1.webp'
    },
]

/**
 * 
 * "data": {
        "name": "000",
        "description": "",
        "id": 8,
        "shop_name": null,
        "products": []
    },
 */

const SingleGroupPage = () => {
    const { authToken, user } = useContext(AuthContext)
    const [dataFetchingStatus, setDataFetchingStatus] = useState(initDataFetchingStatus)
    const [groupData, setGroupData] = useState([])
    const [isAddSkuModalVisible, setIsAddSkuModalVisible] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useAppDispatch()
    const { shops } = useAppSelector((state) => state.shopsSlice);

    // ------- Фетч массива магазинов -------------//
    const fetchShopData = async () => {
        try {
            if (user.subscription_status === null) {
                dispatch(fetchShops('mockData'));
            } else {
                dispatch(fetchShops(authToken));
            }
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    };
    //---------------------------------------------//



    const getGroupData = async (authToken, groupId) => {
        setDataFetchingStatus({ ...initDataFetchingStatus, isLoading: true })
        try {
            const res = await fetch(`${URL}/api/product/product_groups/${groupId}`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken
                },
            })

            if (!res.ok) {
                const parsedData = await res.json()
                setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: parsedData?.detail || 'Что-то пошло не так :(' })
                return;
            }
            const parsedRes = await res.json();
            setGroupData(parsedRes.data)
            setDataFetchingStatus(initDataFetchingStatus)
        } catch {
            setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: 'Что-то пошло не так :(' })
        }
    }

    const deleteGroup = async (authToken, groupId) => {
        try {
            const res = await fetch(`${URL}/api/product/product_groups/${groupId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'JWT ' + authToken
                },
            })

            if (!res.ok) {
                const parsedData = await res.json()
                setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: parsedData?.detail || 'Что-то пошло не так :(' })
                return;
            }
            navigate('/groups')
        } catch {
            setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: 'Что-то пошло не так :(' })
        }
    }

    useEffect(() => {
        params?.group_id && getGroupData(authToken, params.group_id)
    }, [params])

    // 0. Получаем данные магазинов
    useEffect(() => {
        if (!shops || shops.length === 0) {
            fetchShopData();
        }
    }, [shops]);

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
                        title={
                            <Breadcrumbs
                                config={[
                                    { name: 'Группы товаров', slug: '/groups' },
                                    { name: groupData.name },
                                ]}
                                actions={[
                                    { type: 'edit', action: () => { setIsAddSkuModalVisible(true) } },
                                    { type: 'delete', action: () => { deleteGroup(authToken, params?.group_id) } },
                                ]}
                            />
                        }
                    />
                </div>

                {dataFetchingStatus.isLoading &&
                    <div className={styles.page__loaderWrapper}>
                        <span className='loader'></span>
                    </div>
                }
                {!dataFetchingStatus.isLoading && groupData.products && groupData.products.length === 0 &&
                    <NoDataWidget
                        mainTitle='Здесь пока нет ни одного артикула'
                        mainText='Добавьте первый артикул, чтобы начать работу'
                        buttonTitle='Добавить'
                        action={() => setIsAddSkuModalVisible(true)}
                    />
                }
                {!dataFetchingStatus.isLoading && groupData.products && groupData.products.length > 0 &&
                    <SingleGroupWidget
                        setIsAddSkuModalVisible={setIsAddSkuModalVisible}
                        data={groupData}
                        dataFetchingStatus={dataFetchingStatus}
                        initDataFetchingStatus={initDataFetchingStatus}
                        groupId={params.group_id}
                        getGroupData={getGroupData}
                        shops={shops}
                    />
                }
            </section>
            {/* ---------------------- */}


            {/*  modals */}
            <AddSkuModal
                isAddSkuModalVisible={isAddSkuModalVisible}
                setIsAddSkuModalVisible={setIsAddSkuModalVisible}
                setDataFetchingStatus={setDataFetchingStatus}
                groupData={groupData}
                authToken={authToken}
                getGroupData={getGroupData}
                initDataFetchingStatus={initDataFetchingStatus}
                dataFetchingStatus={dataFetchingStatus}
                shops={shops}
            />

            <ErrorModal
                open={dataFetchingStatus.isError}
                message={dataFetchingStatus.message}
                onOk={() => setDataFetchingStatus(initDataFetchingStatus)}
                onCancel={() => setDataFetchingStatus(initDataFetchingStatus)}
                onClose={() => setDataFetchingStatus(initDataFetchingStatus)}
                footer={null}
            />
        </main>
    )
}

export default SingleGroupPage;