import React from 'react'

import saveGlitProduct from '../../pages/images/saveglitproduct.svg'

const Product = () => {
  return (
    <div >
        <div className='product-cont'>
           <div className='product-cont-item'>
            <p className='product-cont-item-p' >
                <span>Название</span>
                <span>Глиттеры</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>Бренд</span>
                <span>Название бренда</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>Артикул</span>
                <span>00066</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>SKU</span>
                <span>16367820</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>Баркод</span>
                <span>2000662320049</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>Размеры</span>
                <span>0</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>Категория</span>
                <span>Красота</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>Остаток WB</span>
                <span>65</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>Остаток склад</span>
                <span>3</span>
            </p>
           </div> 
           <div className='product-cont-item'>
            <p className='product-cont-item-p' >
                <span>Цена</span>
                <span>899,00 ₽</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>Максимальная скидка</span>
                <span>70 %</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>Минимальная цена со скидкой</span>
                <span>200,00 ₽</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>ABC анализ по выручке</span>
                <span>A</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>ABC анализ по прибыли</span>
                <span>A</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>Рентабельность реализованной продукции</span>
                <span>60 %</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>Маржинальность</span>
                <span>28 %</span>
            </p>
            <hr style={{margin: '10px 10px 10px 10px'}}></hr>
            <p className='product-cont-item-p'>
                <span>Годовая рентабельность товарных запасов</span>
                <span>12 292,5 %</span>
            </p>
            
           </div>
        </div>
        <div style={{width: '644px', height: '221px', backgroundColor: 'white', marginTop: '20px', marginLeft: '50px', borderRadius: '16px'}}>
            <div style={{fontSize: '24px', fontWeight: '700', marginLeft: '20px', marginTop: '30px'}}>
            Редактируемые свойства
            </div>
            <div style={{display: 'flex'}}>
                <div>
                <p style={{fontSize: '16px', fontWeight: '700', color: '#8C8C8C', marginLeft: '20px', marginTop: '10px'}}>Себестоимость</p>
                <input className='input-product' type="text" />
                </div>
                <div>
                <p style={{fontSize: '16px', fontWeight: '700', color: '#8C8C8C', marginLeft: '20px', marginTop: '10px'}}>Кратность короба</p>
                <input className='input-product' type="text" />
                </div>
                
            </div>
            <div style={{marginLeft: '20px', marginTop: '10px'}}>
                <img src={saveGlitProduct} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Product