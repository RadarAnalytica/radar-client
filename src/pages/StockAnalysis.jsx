import React from 'react'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'

const StockAnalysis = () => {

    return (
        <div className='dashboard-page'>
            <SideNav />
            <div className="dashboard-content pb-3">
                <TopNav title={'Товарная аналитика'} />
                <div className="container dash-container p-3 pt-0 d-flex gap-3">
                    page
                </div>
            </div>
        </div>
    )
}

export default StockAnalysis