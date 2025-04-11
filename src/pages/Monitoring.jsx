import React from 'react'
import TopNav from '../components/TopNav'
import SideNav from '../components/SideNav'

const Monitoring = () => {

    return (
        <div className='dashboard-page'>
            <MobilePlug />
      <SideNav />
            <div className="dashboard-content pb-3">
                <TopNav title={'Мониторинг запросов'} />
                <div className="container dash-container p-3 pt-0 d-flex gap-3">
                    page
                </div>
            </div>
        </div>
    )
}

export default Monitoring