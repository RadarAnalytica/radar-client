import React from 'react'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'
import CalculateForm from '../containers/calculate/CalculateForm'
import CalculateResults from '../containers/calculate/CalculateResults'

const Calculate = () => {

    return (
        <div className='calculate-page'>
            <SideNav />
            <div className="calculate-content pb-3">
                <TopNav title={'Калькулятор unit-экономики товара'} />
                <div className="calculate-container dash-container container">
                    <div className="row ps-2 pt-2">
                        <div className="col-8">
                            <CalculateForm />
                        </div>
                        <div className="col-4">
                            <CalculateResults />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculate