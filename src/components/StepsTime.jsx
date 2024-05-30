import React from 'react';
import Steps from '../pages/images/Steps';
import YellowRadar from '../pages/images/YellowRadar';
import time from '../pages/images/time.png';

const StepsTime = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '50px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#F7F7F7',
          borderRadius: '18px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '30%',
          }}
        >
          <YellowRadar />
        </div>
        <div style={{ fontSize: '36px', width: '80%', fontWeight: '700' }}>
          поможет на каждом этапе вашего{' '}
          <span style={{ color: 'blue' }}>развития на маркетплейсах</span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',marginTop:'30px'
        }}
      >
        {' '}
        <div className='steps' style={{ transform: 'rotate(-4deg)' }}>
          <div>
            <div>
              <Steps />
            </div>
            <div style={{ fontSize: '25px', fontWeight: '700' }}>Запуск</div>
            <div style={{ fontSize: '16px' }}>
              Найдите выгодные товары для выхода на маркетплейсы
            </div>
          </div>

          <div style={{ fontSize: '20px', fontWeight: '600' }}>
            <img src={time} alt='tims' style={{ width: '20%' }} /> 1 день
          </div>
        </div>
        <div
          className='steps'
          style={{ transform: 'rotate(-3deg)', marginTop: '50px', zIndex: 2 }}
        >
          <div>
            <div>
              <Steps />
            </div>
            <div style={{ fontSize: '25px', fontWeight: '700' }}>
              Старт работы
            </div>
            <div style={{ fontSize: '16px' }}>
              Научитесь торговать на примере лидеров, управляйте ценой и
              поставками, шпионьте за конкурентами
            </div>
          </div>

          <div style={{ fontSize: '20px', fontWeight: '600' }}>
            <img src={time} alt='tims' style={{ width: '20%' }} /> 2 дня
          </div>
        </div>
        <div className='steps' style={{ zIndex: 2 }}>
          <div>
            <div>
              <Steps />
            </div>
            <div style={{ fontSize: '25px', fontWeight: '700' }}>Рост</div>
            <div style={{ fontSize: '16px' }}>
              Сервис Все-в-одном: сконцентрируйтесь на ключевых метриках для
              развития торговой матрицы и увеличения прибыли
            </div>
          </div>

          <div style={{ fontSize: '20px', fontWeight: '600' }}>
            <img src={time} alt='tims' style={{ width: '20%' }} /> 20 дней
          </div>
        </div>
        <div
          className='steps'
          style={{ transform: 'rotate(3deg)', marginTop: '50px', zIndex: 2 }}
        >
          <div>
            <div>
              <Steps />
            </div>
            <div style={{ fontSize: '25px', fontWeight: '700' }}>Кризис</div>
            <div style={{ fontSize: '16px' }}>
              Спады случаются даже с большими компаниями - это нормально, когда
              вы растете и выходите на новый рынок. Radar поможет найти и
              излечить болезни роста
            </div>
          </div>

          <div style={{ fontSize: '20px', fontWeight: '600' }}>
            <img src={time} alt='tims' style={{ width: '20%' }} /> 7 дней
          </div>
        </div>
        <div className='stepsBtn' style={{ transform: 'rotate(5deg)' }}>
          <div>
            <div>
              <Steps />
            </div>
            <div style={{ fontSize: '25px', fontWeight: '700', zIndex: 2 }}>
              Масштабируй свой бизнес
            </div>
            <div style={{ fontSize: '16px' }}>
              Тысячи SKU и большая команда? Продавцы из ТОП-1000 выбирают Radar
              как самый удобный и функциональный
            </div>
          </div>
          <button
            className='btn-warning'
            style={{ minHeight: '64px', fontSize: '18px' }}
          >
            Попробовать бесплатно
          </button>
        </div>
      </div>
    </div>
  );
};
export default StepsTime;
