import React, { useState } from 'react';
import newbie1 from '../pages/images/newbie1.svg';
import newbie2 from '../pages/images/newbie2.svg';
import newbie3 from '../pages/images/newbie3.svg';
import sellers1 from '../pages/images/sellers1.svg';
import sellers2 from '../pages/images/sellers2.svg';
import sellers3 from '../pages/images/sellers3.svg';
import bussines1 from '../pages/images/bussines1.svg';
import bussines2 from '../pages/images/bussines2.svg';
import bussines3 from '../pages/images/bussines3.svg';
import manager1 from '../pages/images/manager1.svg';
import manager2 from '../pages/images/manager2.svg';
import manager3 from '../pages/images/manager3.svg';
import Steps from '../pages/images/Steps';

const newbie = [
  {
    img:<div>
          <img src={newbie1} alt='Block Main Page' className='imgBox' />
          <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-90px', fontSize: '20px' }} >&#x1f50d;</span>
          <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-50px', fontSize: '20px' }} >&#x1f4c8;</span>
        </div> ,
  },
  {
    img: <div>
          <img src={newbie2} alt='Block Main Page' className='imgBox' />
          <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-90px', fontSize: '20px' }} >&#x1f4ca;</span>
          <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-50px', fontSize: '20px' }} >&#x1f451;</span>
        </div>
  },
  {
    img: <div>
          <img src={newbie3} alt='Block Main Page' className='imgBox' />
          <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-90px', fontSize: '20px' }} >&#x1f4e6;</span>
          <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-50px', fontSize: '20px' }} >&#x1f680;</span>
         </div>
  },
];

const currentSellers = [
  {
    img: <div>
    <img src={sellers1} alt='Block Main Page' className='imgBox' />
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-90px', fontSize: '20px' }} >&#x1f4b8;</span>
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-50px', fontSize: '20px' }} >&#x1f4c8;</span>
   </div>
  },
  {
    img: <div>
    <img src={sellers2} alt='Block Main Page' className='imgBox' />
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-90px', fontSize: '20px' }} >&#x1f4ca;</span>
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-50px', fontSize: '20px' }} >&#x1f4b0;</span>
   </div>
  },
  {
    img: <div>
    <img src={sellers3} alt='Block Main Page' className='imgBox' />
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-90px', fontSize: '20px' }} >&#x1f51d;</span>
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-50px', fontSize: '20px' }} >&#x1f4c8;</span>
   </div>
  },
];

const business = [
  {
    img: <div>
    <img src={bussines1} alt='Block Main Page' className='imgBox' />
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-90px', fontSize: '20px' }} >&#x1f465;</span>
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-50px', fontSize: '20px' }} >&#x1f4dd;</span>
   </div>
  },
  {
    img: <div>
    <img src={bussines2} alt='Block Main Page' className='imgBox' />
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-90px', fontSize: '20px' }} >&#x1f4cd;</span>
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-50px', fontSize: '20px' }} >&#x1f4b0;</span>
   </div>
  },
  {
    img: <div>
    <img src={bussines3} alt='Block Main Page' className='imgBox' />
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-90px', fontSize: '20px' }} >&#x1f4a1;</span>
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-50px', fontSize: '20px' }} >&#x1f44d;</span>
   </div>
  },
];

const manager = [
  {
    img: <div>
    <img src={manager1} alt='Block Main Page' className='imgBox' />
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-90px', fontSize: '20px' }} >&#x1f465;</span>
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-50px', fontSize: '20px' }} >&#x1f4c8;</span>
   </div>
  },
  {
    img: <div>
    <img src={manager2} alt='Block Main Page' className='imgBox' />
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-90px', fontSize: '20px' }} >&#x1f4dd;</span>
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-50px', fontSize: '20px' }} >&#x1f4bb;</span>
   </div>
  },
  {
    img: <div>
    <img src={manager3} alt='Block Main Page' className='imgBox' />
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-90px', fontSize: '20px' }} >&#x1f511;</span>
    <span style={{position: 'absolute', marginTop: '85px', marginLeft: '-50px', fontSize: '20px' }} >&#x1f4ca;</span>
   </div>
  },
];

const BtnHomePage = () => {
  const [currentArray, setCurrentArray] = useState(newbie);
  const [activeButton, setActiveButton] = useState('newbie');

  const handleClick = (array, buttonName) => {
    setCurrentArray(array);
    setActiveButton(buttonName);
  };

  return (
    <>
      <div style={{ fontSize: '40px', color: 'white', fontWeight: '700' }}>
        Кому и для чего нужен наш сервис
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          padding: '5px',
          borderRadius: '10px',
          marginBottom: '20px',
        }}
      >
        <button
          onClick={() => handleClick(newbie, 'newbie')}
          className={activeButton === 'newbie' ? 'prime-btn' : 'secondary-btn'}
          id='btnDop'
        >{activeButton === 'newbie' ? <Steps.Circle /> : <span></span>}
          
          Новички
        </button>
        <button
          onClick={() => handleClick(currentSellers, 'currentSellers')}
          className={
            activeButton === 'currentSellers' ? 'prime-btn' : 'secondary-btn'
          }
          id='btnDop'
        >{activeButton === 'currentSellers' ? <Steps.Circle /> : <span></span>}
          Действующие продавцы
        </button>
        <button
          onClick={() => handleClick(business, 'business')}
          className={
            activeButton === 'business' ? 'prime-btn' : 'secondary-btn'
          }
          id='btnDop'
        >{activeButton === 'business' ? <Steps.Circle /> : <span></span>}
          Крупный бизнес
        </button>
        <button
          onClick={() => handleClick(manager, 'manager')}
          className={activeButton === 'manager' ? 'prime-btn' : 'secondary-btn'}
          id='btnDop'
        >{activeButton === 'manager' ? <Steps.Circle /> : <span></span>}
          Менеджеры маркетплейсов и агентства
        </button>
      </div>
      <div className='widhead-container'>
        {currentArray.map((el) => (
          <div style={{ marginRight: '5px' }}>{el.img}</div>
        ))}
      </div>
    </>
  );
};

export default BtnHomePage;
