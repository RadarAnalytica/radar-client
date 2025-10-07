import React from 'react';

import saveGlitProduct from '../../pages/images/saveglitproduct.svg';

const Product = ({productBySku}) => {

  return (
    <div className='container dash-container'>
      <div className='product-cont'>
        <div className='product-cont-item'>
          <p className='product-cont-item-p'>
            <span>Название</span>
            <span>{productBySku?.productName}</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>Бренд</span>
            <span>{productBySku?.brandName}</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>Артикул</span>
            <span>{productBySku?.vendorСode}</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>SKU</span>
            <span>{productBySku?.sku}</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>Баркод</span>
            <span>{productBySku?.barCode}</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>Размеры</span>
            <span>{productBySku?.size}</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>Категория</span>
            <span>{productBySku?.category}</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>Остаток WB</span>
            <span>{productBySku?.dataWB}</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>Остаток склад</span>
            <span>{productBySku?.dataRadar - productBySku?.dataWB}</span>
          </p>
        </div>
        <div className='product-cont-item'>
          <p className='product-cont-item-p'>
            <span>Цена</span>
            <span>{productBySku?.basic} ₽</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>Максимальная скидка</span>
            <span>{productBySku?.maxDiscount} %</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>Минимальная цена со скидкой</span>
            <span> {productBySku?.minDiscountPrice} ₽</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>ABC анализ по выручке</span>
            <span>{productBySku?.byRevenue}</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>ABC анализ по прибыли</span>
            <span>{productBySku?.byProfit}</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>Рентабельность реализованной продукции</span>
            <span>{productBySku?.profitabilityOfProductsSold} %</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>Маржинальность</span>
            <span>{productBySku?.marginal} %</span>
          </p>
          <hr style={{ margin: '10px 10px 10px 10px' }}></hr>
          <p className='product-cont-item-p'>
            <span>Годовая рентабельность товарных запасов</span>
            <span>{productBySku?.annualReturnOnInventory} %</span>
          </p>
        </div>
      </div>
      <div className='product-cont-item-wrapper'>
      <div className='product-cont-item-box'>
        <div className='product-cont-item-title'>Редактируемые свойства</div>
        <div style={{ display: 'flex' }}>
          <div style={{ position: 'relative' }}>
            <input className='input-product' type='text' />
            <span className='input-product-span'>₽</span>
          </div>
          <div></div>
        </div>
        <div style={{ marginTop: '8px' }}>
          <img src={saveGlitProduct} alt='' />
        </div>
      </div>
      <div style={{width: '612px'}}></div>
      </div>
    </div>
  );
};

export default Product;
