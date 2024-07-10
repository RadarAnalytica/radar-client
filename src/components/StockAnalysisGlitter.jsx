import React, { useState } from 'react'
import SideNav from './SideNav'
import TopNav from './TopNav'
import product from '../pages/images/product.svg';
import glitterStar from '../pages/images/glitterstar.svg';
import glityellow from '../pages/images/glityellow.svg';
import glitFile from '../pages/images/glitfile.svg';
import glitIconBlue from '../pages/images/glittericonblue.svg';
import glitCostPrise from '../pages/images/glitsotprice.svg';
import glitIconGreen from '../pages/images/gliticongreen.svg';
import glitIconReturn from '../pages/images/gliticonreturn.svg';
import glitVectorGreen from '../pages/images/glitvectorgreen.svg';
import StockAnalysisGlitterFilter from './StockAnalysisGlitterFilter';


const StockAnalysisGlitter = () => {
    const [activeTab, setActiveTab] = useState('');
  return (
    <div className='dashboard-page'>
            <SideNav />
            <div className="dashboard-content pb-3">
                <TopNav title={'Товарная аналитика'} />
                <div className="container dash-container p-3 pt-0 d-flex gap-3" style={{justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', backgroundColor: 'white', width: '422px', height: '199px', borderRadius: '8px' }}>
                        <div>
                        <img style={{marginTop: '10px'}} src={product} alt="" />
                        </div>
                        <div style={{marginLeft: '10px', marginTop: '10px'}}>
                        <p style={{color: '#8C8C8C', fontSize: '16px', fontWeight:'500', marginBottom: '0'}}>Цена</p>
                        <span style={{fontSize: '24px', fontWeight: '700'}}>899,00 р</span>
                        </div>
                        
                        
                    </div>
                    <div style={{backgroundColor: 'white', width: '422px', height: '199px', borderRadius: '8px' }}>
                        <div style={{display: 'flex', marginTop: '10px'}}>
                            <img style={{marginLeft: '10px'}} src={glitterStar} alt="" />
                            <p style={{fontSize: '24px', fontWeight: '700', marginLeft: '10px', marginBottom: '0', marginTop: '10px'}} >5.0</p>
                            <div style={{width: '60px', height: '60px', backgroundColor:'rgba(240, 173, 0, 0.2)', borderRadius: '10px', marginLeft: '60%'}}>
                                <img style={{marginLeft: '15px', marginTop: '11px'}} src={glityellow} alt="" />
                            </div>
                        </div>
                        <p style={{color: '#8C8C8C', fontSize: '16px', fontWeight:'500', marginLeft: '10px', marginTop: '-10px'}}>189 отзывов</p>
                        <div style={{marginLeft: '10px', marginTop: '20%'}}>
                        <a href='#' style={{textDecoration: 'none', fontSize: '16px', fontWeight: '600'}}>Посмотрреть на  WB</a>
                        </div>
                    </div>
                    <div style={{backgroundColor: 'white', width: '422px', height: '199px', borderRadius: '8px' }}>
                        <div style={{ marginTop: '5px', marginLeft: '15px'}}>
                           <div style={{display: 'flex'}} >
                                <div style={{flexDirection: 'column'}}>
                                <p style={{marginBottom: '0', fontSize: '16px', fontWeight:'500', color: '#8C8C8C'}}>Баркод</p>
                                <p>2000662320049</p>
                                </div>
                                <div style={{width: '60px', height: '60px', backgroundColor:'rgba(126, 126, 126, 0.2)', borderRadius: '10px', marginLeft: '47%', marginTop:'1%'}}>
                                    <img style={{marginLeft: '13px', marginTop: '15px'}} src={glitFile} alt="" />
                                </div>
                           </div>
                           <div style={{display: 'flex', flexDirection: 'column'}}>
                            <p style={{marginBottom: '0', fontSize: '16px', fontWeight:'500', color: '#8C8C8C'}}>SKU</p>
                            <p>16367820</p>
                           </div>
                           <div>
                            <p style={{marginBottom: '0', fontSize: '16px', fontWeight:'500', color: '#8C8C8C'}}>Бренд</p>
                            <p>Название бренда</p>
                           </div>
                        </div>

                    </div>
                </div>
                    {/* <p style={{marginLeft: '45px', fontSize: '16px', fontWeight: '500'}}>Период</p> */}
                    <div style={{display: 'flex', marginLeft: '30px'}}>
                        <StockAnalysisGlitterFilter />
                        <div style={{ display: 'flex', width: '50%', height: '43px', marginBottom: '0', justifyContent: 'space-between', marginLeft: ' 20px', marginTop: '30px'}}>
                            <div onClick={() => setActiveTab('summary')} style={{width: '90px', borderRadius:'8px', cursor: 'pointer', backgroundColor: activeTab === 'summary' ? '#5329FF1A' : 'transparent'}}>
                                <p style={{ textAlign: 'center', marginTop: '10px'}}>Сводка</p>
                            </div>
                            <div onClick={() => setActiveTab('product')} style={{width: '110px', borderRadius:'8px', cursor: 'pointer', backgroundColor: activeTab === 'product' ? '#5329FF1A' : 'transparent'}}>
                                <p style={{ textAlign: 'center', marginTop: '10px'}}>О продукте</p>
                            </div>
                            <div onClick={() => setActiveTab('categoryMonitoring')} style={{width: '190px', borderRadius:'8px', cursor: 'pointer', backgroundColor: activeTab === 'categoryMonitoring' ? '#5329FF1A' : 'transparent'}}>
                                <p style={{ textAlign: 'center', marginTop: '10px'}} >Мониторинг категорий</p>
                            </div>
                            <div onClick={() => setActiveTab('requestMonitoring')} style={{width: '190px', borderRadius:'8px', cursor: 'pointer', backgroundColor: activeTab === 'requestMonitoring' ? '#5329FF1A' : 'transparent'}}>
                                <p style={{ textAlign: 'center', marginTop: '10px'}}>Монтроринг запросов</p>
                            </div>
                        </div>
                        
                    </div>
                    <div style={{display: 'flex', marginLeft: '45px', width: '93%', justifyContent: 'space-between'}}> 
                        <div style={{ width: '290px', height: '200px', backgroundColor: 'white', borderRadius: '8px'}}>
                            <div style={{ display: 'flex', marginLeft: '10px'}}>
                                <div>
                                    <div style={{fontSize: '14px', fontWeight:'500', color: '#8C8C8C', marginTop: '10px'}}>
                                        Продажи
                                    </div>
                                    <div style={{fontSize: '19px', fontWeight: '700'}}>
                                        35 678.00p
                                    </div>
                                    <div style={{fontSize: '14px', fontWeight:'500', color: '#00B69B'}}>
                                        + 23 678.00 p
                                    </div>
                                </div>
                                <div style={{width: '60px', height: '60px', backgroundColor:'rgba(126, 126, 126, 0.2)', borderRadius: '10px', marginLeft: '35%', marginTop:'4%'}}>
                                <img style={{marginLeft: '14px', marginTop: '13px'}} src={glitIconBlue} alt="" />
                                </div>
                            </div>
                            <div style={{fontSize: '20px', fontWeight: '700', marginTop: '45px',  marginLeft: '10px'}}>
                                117 шт
                            </div>
                            <div style={{fontSize: '14px', fontWeight:'500', color: '#00B69B',  marginLeft: '10px'}}>
                                +117 шт
                            </div>
                        </div>
                        <div style={{ width: '290px', height: '200px', backgroundColor: 'white', borderRadius: '8px'}}>
                        <div style={{ display: 'flex', marginLeft: '10px'}}>
                                <div>
                                    <div style={{width: '150px', fontSize: '14px', fontWeight:'500', color: '#8C8C8C', marginTop: '10px'}}>
                                    Себестоимость проданных товаров
                                    </div>
                                    <div style={{fontSize: '19px', fontWeight: '700'}}>
                                        35 678.00p
                                    </div>
                                    <div style={{fontSize: '14px', fontWeight:'500', color: '#00B69B'}}>
                                        + 14 678.00 p
                                    </div>
                                </div>
                                <div style={{width: '60px', height: '60px', backgroundColor:'rgba(74, 217, 145, 0.2)', borderRadius: '10px', marginLeft: '18%', marginTop:'4%'}}>
                                <img style={{marginLeft: '14px', marginTop: '13px'}} src={glitIconGreen} alt="" />
                                </div>
                            </div>
                            <div>
                                <img style={{ marginLeft: '14px', marginTop: '35px'}} src={glitCostPrise} alt="" />
                            </div>
                            
                        </div>
                        <div style={{ width: '290px', height: '200px', backgroundColor: 'white', borderRadius: '8px'}}>
                        <div style={{ display: 'flex', marginLeft: '10px'}}>
                                <div>
                                    <div style={{fontSize: '14px', fontWeight:'500', color: '#8C8C8C', marginTop: '10px'}}>
                                        Возвраты
                                    </div>
                                    <div style={{fontSize: '19px', fontWeight: '700'}}>
                                        0.00p
                                    </div>
                                    <div style={{fontSize: '14px', fontWeight:'500', color: '#F93C65'}}>
                                        + 1 678.00 p
                                    </div>
                                </div>
                                <div style={{width: '60px', height: '60px', backgroundColor:'rgba(255, 144, 102, 0.2)', borderRadius: '10px', marginLeft: '35%', marginTop:'4%'}}>
                                <img style={{marginLeft: '14px', marginTop: '13px'}} src={glitIconReturn} alt="" />
                                </div>
                            </div>
                            <div style={{fontSize: '20px', fontWeight: '700', marginTop: '45px',  marginLeft: '10px'}}>
                                0 шт
                            </div>
                            <div style={{fontSize: '14px', fontWeight:'500', color: '#F93C65',  marginLeft: '10px'}}>
                                +5 шт
                            </div>
                        </div>
                        <div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '290px', height: '35px', backgroundColor: 'white', borderRadius: '8px'}}>
                                <div  style={{ fontSize: '14px', fontWeight:'500', color: '#8C8C8C', marginLeft: '10px'}}>Штрафы WB</div>
                                <div style={{fontWeight: '700', marginRight: '10px'}}>0,00 р</div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '290px', height: '35px', backgroundColor: 'white', borderRadius: '8px', marginTop: '45px'}}>
                                <div  style={{ fontSize: '14px', fontWeight:'500', color: '#8C8C8C', marginLeft: '10px'}}>Доплаты WB</div>
                                <div style={{fontWeight: '700', marginRight: '10px'}}>0,00 р</div>
                            </div>
                             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '290px', height: '35px', backgroundColor: 'white', borderRadius: '8px', marginTop: '45px'}}>
                                <div  style={{ fontSize: '14px', fontWeight:'500', color: '#8C8C8C', marginLeft: '10px'}}>Комиссия WB</div>
                                <div style={{fontWeight: '700', marginRight: '10px'}}>4 675,00 р</div>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '93%', display: 'flex', justifyContent: 'space-between', marginLeft: '50px', marginTop: '20px'}} >
                        <div style={{ width: '390px', height: '90px', backgroundColor: 'white', borderRadius: '8px'}}>
                            <div style={{ fontSize: '14px', fontWeight:'500', color: '#8C8C8C', marginLeft: '10px', marginTop: '10px'}}>Расходы на логистику к клиенту</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                                <div style={{marginLeft: '10px', fontWeight: '700', fontSize: '22px'}}>4 558,20 р</div>
                                <div style={{marginRight: '10px', fontSize: '14px', color: '#00B69B'}}>-1 558,20 р</div>
                            </div>
                        </div>
                        <div style={{ width: '390px', height: '90px', backgroundColor: 'white', borderRadius: '8px'}}>
                        <div style={{ fontSize: '14px', fontWeight:'500', color: '#8C8C8C', marginLeft: '10px', marginTop: '10px'}}>Расходы на логистику от клиента</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                                <div style={{marginLeft: '10px', fontWeight: '700', fontSize: '22px'}}>370,00 ₽</div>
                                <div style={{marginRight: '10px', fontSize: '14px', color: '#F93C65'}}>+370,00 ₽</div>
                            </div>
                        </div>
                        <div style={{ width: '390px', height: '90px', backgroundColor: 'white', borderRadius: '8px'}}>
                        <div style={{ fontSize: '14px', fontWeight:'500', color: '#8C8C8C', marginLeft: '10px', marginTop: '10px'}}>Маржинальная прибыль</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                                <div style={{marginLeft: '10px', fontWeight: '700', fontSize: '22px'}}>9 330,00 ₽</div>
                                <div style={{marginRight: '10px', fontSize: '14px', color: '#00B69B'}}>+14 383,00 ₽</div>
                            </div>
                        </div>
                    
                    </div>
                    <div style={{width: '93%', display: 'flex', justifyContent: 'space-between', marginLeft: '50px', marginTop: '20px'}} >
                        <div style={{ width: '600px', height: '140px', backgroundColor: 'white', borderRadius: '8px'}}>
                            <div style={{fontSize: '20px', fontWeight: '700', marginTop: '10px', marginLeft: '10px'}}>Товарный остаток</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                                <div style={{marginLeft: '10px', fontSize: '16px'}}>На складе продавца</div>
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight: '10px', fontWeight: '700', fontSize: '16px'}}>65 шт</div>
                                    <div style={{marginRight: '10px', marginTop: '3px', fontWeight: '500', fontSize: '14px', color: '#8C8C8C'}}>120 000,00 ₽</div>
                                </div>
                            </div>
                            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                                <div style={{marginLeft: '10px', fontSize: '16px'}}>На складе WB</div>
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight: '10px', fontWeight: '700', fontSize: '16px'}}>1 шт</div>
                                    <div style={{marginRight: '10px', marginTop: '3px', fontWeight: '500', fontSize: '14px', color: '#8C8C8C'}}>120 000,00 ₽</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '600px', height: '140px', backgroundColor: 'white', borderRadius: '8px'}}>
                            <div style={{fontSize: '20px', fontWeight: '700', marginTop: '10px', marginLeft: '10px'}}>Заказы</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                                <div style={{marginLeft: '10px', fontSize: '16px'}}>Сумма</div>
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight: '10px', fontWeight: '700', fontSize: '16px'}}>5 600,00 ₽</div>
                                    <div style={{marginRight: '10px', marginTop: '3px', fontWeight: '500', fontSize: '14px', color: '#00B69B'}}>+14 383,00 ₽</div>
                                </div>
                            </div>
                            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                                <div style={{marginLeft: '10px', fontSize: '16px'}}>На складе WB</div>
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight: '10px', fontWeight: '700', fontSize: '16px'}}>10 шт</div>
                                    <div style={{marginRight: '10px', marginTop: '3px', fontWeight: '500', fontSize: '14px', color: '#F93C65'}}>-2 шт</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '93%', display: 'flex', justifyContent: 'space-between', marginLeft: '50px', marginTop: '20px'}} >
                        <div style={{ width: '390px', height: '140px', backgroundColor: 'white', borderRadius: '8px'}}>
                            <div style={{ fontSize: '14px', fontWeight:'500', color: '#8C8C8C', marginLeft: '10px', marginTop: '10px'}}>Процент выкупа</div>
                            <div>
                                <div style={{marginLeft: '10px', fontWeight: '700', fontSize: '22px'}}>92,3 %</div>
                            </div>
                            <img src={glitVectorGreen} alt="" />
                        </div>
                        <div style={{ width: '390px', height: '140px', backgroundColor: 'white', borderRadius: '8px'}}>
                        <div style={{ fontSize: '14px', fontWeight:'500', color: '#8C8C8C', marginLeft: '10px', marginTop: '10px'}}>Маржинальность</div>
                            <div>
                                <div style={{marginLeft: '10px', fontWeight: '700', fontSize: '22px'}}>33,3 %</div>
                            </div>
                            <img src={glitVectorGreen} alt="" />
                        </div>
                        <div style={{ width: '390px', height: '140px', backgroundColor: 'white', borderRadius: '8px'}}>
                        <div style={{ fontSize: '14px', fontWeight:'500', color: '#8C8C8C', marginLeft: '10px', marginTop: '10px'}}>Упущенные продажи</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                                <div style={{marginLeft: '10px', fontWeight: '700', fontSize: '22px'}}>1 330,00 ₽</div>
                                <div style={{marginRight: '10px', fontSize: '14px', fontWeight: '700'}}>5 шт</div>
                            </div>
                        </div>
                    
                    </div>
                    
            </div>
    </div>
  )
}

export default StockAnalysisGlitter