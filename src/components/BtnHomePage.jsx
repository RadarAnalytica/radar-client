import React, { useState } from 'react';
import newbie1 from '../pages/images/new1.png';
import newbie2 from '../pages/images/new2.png';
import newbie3 from '../pages/images/new3.png';
import sellers1 from '../pages/images/sellers11.png';
import sellers2 from '../pages/images/sellers22.png';
import sellers3 from '../pages/images/sellers33.png';
import bussines1 from '../pages/images/bussines1.png';
import bussines2 from '../pages/images/bussines2.png';
import bussines3 from '../pages/images/bussines3.png';
import manager1 from '../pages/images/manager1.png';
import manager2 from '../pages/images/manager2.png';
import manager3 from '../pages/images/manager3.png';
import Steps from '../pages/images/Steps';

const newbie = [
  {
    img: <img src={newbie1} alt='Block Main Page' className='imgBox' />,
  },
  {
    img: <img src={newbie2} alt='Block Main Page' className='imgBox' />,
  },
  {
    img: <img src={newbie3} alt='Block Main Page' className='imgBox' />,
  },
];

const currentSellers = [
  {
    img: <img src={sellers1} alt='Block Main Page' className='imgBox' />,
  },
  {
    img: <img src={sellers2} alt='Block Main Page' className='imgBox' />,
  },
  {
    img: <img src={sellers3} alt='Block Main Page' className='imgBox' />,
  },
];

const business = [
  {
    img: <img src={bussines1} alt='Block Main Page' className='imgBox' />,
  },
  {
    img: <img src={bussines2} alt='Block Main Page' className='imgBox' />,
  },
  {
    img: <img src={bussines3} alt='Block Main Page' className='imgBox' />,
  },
];

const manager = [
  {
    img: <img src={manager1} alt='Block Main Page' className='imgBox' />,
  },
  {
    img: <img src={manager2} alt='Block Main Page' className='imgBox' />,
  },
  {
    img: <img src={manager3} alt='Block Main Page' className='imgBox' />,
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
