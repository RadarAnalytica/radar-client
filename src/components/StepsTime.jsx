import React from 'react';
import Steps from '../pages/images/Steps';
import YellowRadar from '../pages/images/YellowRadar';
import time from '../pages/images/time.png';

const StepsTime = ({redirect}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '120px',
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
        <div style={{ fontSize: '44px', width: '90%', fontWeight: '700', lineHeight: '1.2' }}>
          поможет на каждом этапе вашего{' '}
          <span style={{ color: 'blue', fontWeight: '800' }}>развития на маркетплейсах</span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px',
        }}
      >
        {' '}
        <div className='steps steps-time1'>
          <div>
            <div>
              <Steps.StepsBlue />
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
          className='steps steps-time2'
          style={{  marginTop: '50px' }}
        >
          <div>
            <div>
              <Steps.StepsBlue />
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
        <div className='steps steps-time3'>
          <div>
            <div>
              <Steps.StepsBlue />
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
          className='steps steps-time4'
          style={{  marginTop: '50px'}}
        >
          <div >
            <div>
              <Steps.StepsBlue />
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
        <div className='stepsBtn steps-time5' >
          <div>
            <div>
              <Steps.StepsWhite />
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
            onClick={() => redirect()}
          >
            Попробовать бесплатно
          </button>
        </div>
      </div>
    </div>
  );
};
export default StepsTime;
