import React, { useContext, useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../service/AuthContext'

const DashboardPage = () => {

    const [sales, setSales] = useState()

    // const { user } = useContext(AuthContext)

    // const navigate = useNavigate()
    // useEffect(() => {
    //     setTimeout(() => {
    //         if (!user) {
    //             navigate('/signin')
    //         }
    //     }, 200);
    // }, [user])

    // const getWBSales = async () => {
    //     const res = await fetch(`https://statistics-api.wildberries.ru/api/v1/supplier/sales?dateFrom=2024-01-10`, {
    //         method: 'GET',
    //         headers: {
    //             'content-type': 'application/json',
    //             'authorization': 'Bearer '
    //         }
    //     })
    //     const data = await res.json()
    //     return data
    // }

    // useEffect(() => {
    //     getWBSales().then(data => setSales(data))
    // }, [])

    return (
        <div className='dashboard-page'>
            <SideNav />
            <div className="dashboard-content">
                <TopNav title={'Сводка продаж'} />
            </div>
        </div>
    )
}

export default DashboardPage