import React, { useCallback, useMemo, useState } from 'react';
import newbie1 from '../pages/images/newbie1.png';
import newbie2 from '../pages/images/newbie2.png';
import newbie3 from '../pages/images/newbie3.png';
import sellers1 from '../pages/images/sellers1.png';
import sellers2 from '../pages/images/sellers2.png';
import sellers3 from '../pages/images/sellers3.png';
import bussines1 from '../pages/images/bussines1.png';
import bussines2 from '../pages/images/bussines2.png';
import bussines3 from '../pages/images/bussines3.png';
import manager1 from '../pages/images/manager1.png';
import manager2 from '../pages/images/manager2.png';
import manager3 from '../pages/images/manager3.png';
import Steps from '../pages/images/Steps';

const dataImages = {
  newbie: [newbie1, newbie2, newbie3],
  currentSellers: [sellers1, sellers2, sellers3],
  business: [bussines1, bussines2, bussines3],
  manager: [manager1, manager2, manager3],
};
const BtnHomePage = () => {
  const [activeButton, setActiveButton] = useState('newbie');

  const handleClick = useCallback((buttonName) => {
    setActiveButton(buttonName);
  }, []);

  const renderedImages = useMemo(() => {
    return dataImages[activeButton].map((src, index) => (
      <div
        key={index}
        style={{ marginRight: '5px', position: 'relative', maxWidth: '460px' }}
      >
        <img
          style={{ borderRadius: '18px' }}
          src={src}
          alt={'Block Main Page'}
          className='imgBox'
        />
      </div>
    ));
  }, [activeButton]);

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
          onClick={() => handleClick('newbie')}
          className={activeButton === 'newbie' ? 'prime-btn' : 'secondary-btn'}
          id='btnDop'
        >
          {activeButton === 'newbie' ? <Steps.Circle /> : <span></span>}
          Новички
        </button>
        <button
          onClick={() => handleClick('currentSellers')}
          className={
            activeButton === 'currentSellers' ? 'prime-btn' : 'secondary-btn'
          }
          id='btnDop'
        >
          {activeButton === 'currentSellers' ? <Steps.Circle /> : <span></span>}
          Действующие продавцы
        </button>
        <button
          onClick={() => handleClick('business')}
          className={
            activeButton === 'business' ? 'prime-btn' : 'secondary-btn'
          }
          id='btnDop'
        >
          {activeButton === 'business' ? <Steps.Circle /> : <span></span>}
          Крупный бизнес
        </button>
        <button
          onClick={() => handleClick('manager')}
          className={activeButton === 'manager' ? 'prime-btn' : 'secondary-btn'}
          id='btnDop'
        >
          {activeButton === 'manager' ? <Steps.Circle /> : <span></span>}
          Менеджеры маркетплейсов и агентства
        </button>
      </div>
      <div className='widhead-container'>{renderedImages}</div>
    </>
  );
};

export default BtnHomePage;
