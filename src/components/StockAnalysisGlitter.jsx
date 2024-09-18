import React, { useState } from 'react'
import SideNav from './SideNav'
import TopNav from './TopNav'
import product from '../pages/images/product.svg';
import glitterStar from '../pages/images/glitterstar.svg';
import glityellow from '../pages/images/glityellow.svg';
import glitFile from '../pages/images/glitfile.svg';

import StockAnalysisGlitterFilter from './StockAnalysisGlitterFilter';

import Product from './TabContent/Product';
import CategoryMonitoring from './TabContent/CategoryMonitoring';
import RequestMonitoring from './TabContent/RequestMonitoring';
import Summary from './TabContent/Summary';


const StockAnalysisGlitter = () => {


    const [activeTab, setActiveTab] = useState('summary');
    const [days, setDays] = useState(30);


    function TabContent() {
        switch (activeTab) {
            case 'summary':
                return <Summary days={days} />;
            case 'product':
                return <Product />;
            case 'categoryMonitoring':
                return <CategoryMonitoring />;
            case 'requestMonitoring':
                return <RequestMonitoring />;
            default:
                return ""; // Компонент по умолчанию, если ни одна вкладка не выбрана
        }
    }


    return (
        <div className='dashboard-page'>
            <SideNav />
            <div className="dashboard-content pb-3">
                <TopNav title={'Товарная аналитика'} />
                <div className="container dash-container p-3 pt-0 d-flex gap-3" style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', backgroundColor: 'white', width: '422px', height: '199px', borderRadius: '8px' }}>
                        <div>
                            <img style={{ marginTop: '10px' }} src={product} alt="" />
                        </div>
                        <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                            <p style={{ color: '#8C8C8C', fontSize: '16px', fontWeight: '500', marginBottom: '0' }}>Цена</p>
                            <span style={{ fontSize: '24px', fontWeight: '700' }}>899,00 р</span>
                        </div>


                    </div>
                    <div style={{ backgroundColor: 'white', width: '422px', height: '199px', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <img style={{ marginLeft: '10px' }} src={glitterStar} alt="" />
                            <p style={{ fontSize: '24px', fontWeight: '700', marginLeft: '10px', marginBottom: '0', marginTop: '10px' }} >5.0</p>
                            <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(240, 173, 0, 0.2)', borderRadius: '10px', marginLeft: '60%' }}>
                                <img style={{ marginLeft: '15px', marginTop: '11px' }} src={glityellow} alt="" />
                            </div>
                        </div>
                        <p style={{ color: '#8C8C8C', fontSize: '16px', fontWeight: '500', marginLeft: '10px', marginTop: '-10px' }}>189 отзывов</p>
                        <div style={{ marginLeft: '10px', marginTop: '20%' }}>
                            <a href='#' style={{ textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}>Посмотрреть на  WB</a>
                        </div>
                    </div>
                    <div style={{ backgroundColor: 'white', width: '422px', height: '199px', borderRadius: '8px' }}>
                        <div style={{ marginTop: '5px', marginLeft: '15px' }}>
                            <div style={{ display: 'flex' }} >
                                <div style={{ flexDirection: 'column' }}>
                                    <p style={{ marginBottom: '0', fontSize: '16px', fontWeight: '500', color: '#8C8C8C' }}>Баркод</p>
                                    <p>2000662320049</p>
                                </div>
                                <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(126, 126, 126, 0.2)', borderRadius: '10px', marginLeft: '47%', marginTop: '1%' }}>
                                    <img style={{ marginLeft: '13px', marginTop: '15px' }} src={glitFile} alt="" />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p style={{ marginBottom: '0', fontSize: '16px', fontWeight: '500', color: '#8C8C8C' }}>SKU</p>
                                <p>16367820</p>
                            </div>
                            <div>
                                <p style={{ marginBottom: '0', fontSize: '16px', fontWeight: '500', color: '#8C8C8C' }}>Бренд</p>
                                <p>Название бренда</p>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <p style={{marginLeft: '45px', fontSize: '16px', fontWeight: '500'}}>Период</p> */}
                <div className='filter-tab-container' style={{ marginLeft: '50px' }}>
                    <div>
                        <StockAnalysisGlitterFilter setDays={setDays} />
                    </div>

                    <div className="stock-analysis-tab-container" >
                        <div onClick={() => setActiveTab('summary')} className='stock-analysis-tab-container-item' style={{
                            backgroundColor: activeTab === 'summary' ? '#5329FF1A' : 'transparent'
                        }}>
                            <p style={{ textAlign: 'center' }
                            } > Сводка</p>
                        </div>
                        <div onClick={() => setActiveTab('product')} className='stock-analysis-tab-container-item' style={{ backgroundColor: activeTab === 'product' ? '#5329FF1A' : 'transparent' }}>
                            <p style={{ textAlign: 'center' }}>О продукте</p>
                        </div>
                        <div onClick={() => setActiveTab('categoryMonitoring')} className='stock-analysis-tab-container-item' style={{ cursor: 'pointer', backgroundColor: activeTab === 'categoryMonitoring' ? '#5329FF1A' : 'transparent' }}>
                            <p style={{ textAlign: 'center' }} >Мониторинг категорий</p>
                        </div>
                        <div onClick={() => setActiveTab('requestMonitoring')} className='stock-analysis-tab-container-item' style={{ cursor: 'pointer', backgroundColor: activeTab === 'requestMonitoring' ? '#5329FF1A' : 'transparent' }}>
                            <p style={{ textAlign: 'center' }}>Монтроринг запросов</p>
                        </div>
                    </div>

                </div>
                {TabContent()}

            </div >
        </div >
    )
}

export default StockAnalysisGlitter