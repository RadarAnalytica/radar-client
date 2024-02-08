import React, { useContext, useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../service/AuthContext'
import DashboardFilter from '../components/DashboardFilter'
import MediumPlate from '../components/MediumPlate'
import SmallPlate from '../components/SmallPlate'
import BigChart from '../components/BigChart'
import FinanceTable from '../components/FinanceTable'
import StorageTable from '../components/StorageTable'
import ChartTable from '../components/ChartTable'
import WidePlate from '../components/WidePlate'
import { URL } from '../service/config'

const DashboardPage = () => {

    const [wbData, setWbData] = useState()

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()
    // useEffect(() => {
    //     setTimeout(() => {
    //         if (!user) {
    //             navigate('/development/signin')
    //         }
    //     }, 1000);
    // }, [user])

    const getWBSales = async (user) => {
        const res = await fetch(`${URL}/api/user/sales/${user.id}?dateFrom=2024-01-10`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        })
        const data = await res.json()
        return data
    }

    useEffect(() => {
        user && getWBSales(user).then(data => setWbData(data))
    }, [user])

    const data = [
        {
            name: 'adad',
            price: 123,
            rate: 0.15
        },
        {
            name: 'adad',
            price: 123,
            rate: 0.15
        },
        {
            name: 'adad',
            price: 123,
            rate: 0.15
        },
        {
            name: 'adad',
            price: 123,
            rate: 0.15
        },
        {
            name: 'adad',
            price: 123,
            rate: 0.15
        },
        {
            name: 'adad',
            price: 123,
            rate: 0.15
        },
        {
            name: 'adad',
            price: 123,
            rate: 0.15
        },
    ]

    const data2 = [
        {
            name: 'adad',
            price: 123,
            rate: 0.15
        },
        {
            name: 'adad',
            price: 123,
            rate: 0.15
        },
        {
            name: 'adad',
            price: 123,
            rate: 0.15
        },
        {
            name: 'adad',
            price: 123,
            rate: 0.15
        },
    ]

    const storeData = [
        {
            name: 'adad',
            price: 123,
            rate: 0.15,
            quant: 0.15
        },
        {
            name: 'adad',
            price: 123,
            rate: 0.15,
            quant: 0.15
        },
        {
            name: 'adad',
            price: 123,
            rate: 0.15,
            quant: 0.15
        },
        {
            name: 'adad',
            price: 123,
            rate: 0.15,
            quant: 0.15
        },
    ]

    return (
        <div className='dashboard-page'>
            <SideNav />
            <div className="dashboard-content pb-5">
                <TopNav title={'Сводка продаж'} />
                <DashboardFilter />

                <div className="container p-4 pt-0 d-flex gap-3">
                    <MediumPlate name={'Заказы'} />
                    <MediumPlate name={'Продажи'} />
                    <MediumPlate name={'Возвраты'} />
                    <div className="col d-flex flex-column">
                        <div className='mb-3'>
                            <SmallPlate name={'Процент выкупа'} />
                        </div>
                        <SmallPlate name={'Средний чек'} />
                    </div>
                </div>
                <div className="container p-4 pt-0 pb-3 d-flex gap-3">
                    <div className="col">
                        <BigChart name={'Заказы и продажи'} />
                    </div>
                </div>
                <div className="container p-4 pt-0 pb-3 d-flex gap-3">
                    <div className="col">
                        <SmallPlate name={'Себестоимость проданных товаров'} />
                    </div>
                    <div className="col">
                        <SmallPlate name={'Возвраты'} />
                    </div>
                    <div className="col">
                        <SmallPlate name={'Штрафы WB'} />
                    </div>
                    <div className="col">
                        <SmallPlate name={'Доплаты WB'} />
                    </div>
                </div>
                <div className="container p-4 pt-0 d-flex gap-3">
                    <div className="col">
                        <SmallPlate name={'Комиссия WB'} />
                    </div>
                    <div className="col">
                        <SmallPlate name={'Расходы на логистику'} />
                    </div>
                    <div className="col">
                        <SmallPlate name={'Маржинальная прибыль'} />
                    </div>
                    <div className="col">
                        <SmallPlate name={'Упущенные продажи'} />
                    </div>
                </div>

                <div className="container p-4 pt-0 pb-3 d-flex gap-3" style={{ width: '100%' }}>
                    <div className="wrapper">
                        <FinanceTable title={'Финансы'} data={data} />
                        <StorageTable title={'Склад'} data={storeData} titles={storeData?.map(item => item.name)} subtitles={storeData?.map(item => item.rate)} />
                    </div>
                    <div className="wrapper">
                        <FinanceTable title={'Прибыльность'} data={data2} />
                        <ChartTable />
                    </div>
                </div>
                <div className="container p-4 pt-0 pb-3 d-flex gap-3" style={{ width: '100%' }}>
                    <WidePlate title={'ABC-анализ'} />
                </div>

            </div>
        </div>
    )
}

export default DashboardPage