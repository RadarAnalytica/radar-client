import React from 'react';
import { useNavigate  } from 'react-router-dom';
import Steps from '../pages/images/Steps';
import YellowRadar from '../pages/images/YellowRadarLarge';
import time from '../pages/images/time.png';
import YellowRadarLarge from '../pages/images/YellowRadarLarge';

const StepsTime = ({ redirect }) => {
  const navigate = useNavigate();
  const stepsContent = [
    {
      title: 'Запуск',
      content: `Найдите выгодные товары для выхода на маркетплейсы`,
      afterContent: '1 день',
    },
    {
      title: 'Старт работы',
      content: `Научитесь торговать на примере лидеров, управляйте ценой и поставками, шпионьте за конкурентами`,
      afterContent: '2 дня',
    },
    {
      title: 'Рост',
      content: `Сервис Все-в-одном: сконцентрируйтесь на ключевых метриках для развития торговой матрицы и увеличения прибыли`,
      afterContent: '20 дней',
    },
    {
      title: 'Кризис',
      content: `Спады случаются даже с большими компаниями - это нормально, когда
              вы растете и выходите на новый рынок. Radar поможет найти и
              излечить болезни роста`,
      afterContent: '7 дней',
    },
  ];
  const renderStep = (stepData, index) => {
    return (
      <div className={`steps ${'steps-time' + (index + 1)}`}>
        <div>
          <div
            style={{
              display: 'flex',
              gap: 6,
              alignItems: 'center',
              maxWidth: '102px',
              borderRadius: '8px',
              backgroundColor: '#5329FF0D',
              color: '#5329FF',
              fontWeight: 600,
            }}
          >
            <Steps.StepsBlue />
            <p style={{ margin: 0 }}>{`Шаг ${(index + 1).toString()}`}</p>
          </div>
          <div style={{ fontSize: '25px', fontWeight: '700' }}>
            {stepData.title}
          </div>
          <div style={{ fontSize: '16px' }}>{stepData.content}</div>
        </div>

        <div style={{ fontSize: '20px', fontWeight: '600' }}>
          <img src={time} alt='tims' style={{ width: '20%' }} />{' '}
          {stepData.afterContent}
        </div>
      </div>
    );
  };
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
          alignItems: 'center',
          backgroundColor: '#F7F7F7',
          borderRadius: '18px',
          padding: '20px',
        }}
      >
        <div
          style={{
            paddingRight: '28px',
          }}
        >
          <YellowRadarLarge />
        </div>
        <div
          style={{
            fontSize: '44px',
            width: '90%',
            fontWeight: '700',
            lineHeight: '1.2',
          }}
        >
          поможет на каждом этапе вашего{' '}
          <span style={{ color: 'blue', fontWeight: '800' }}>
            развития на маркетплейсах
          </span>
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
        {stepsContent.map((item, index) => renderStep(item, index))}
        <div className='stepsBtn steps-time5'>
          <div>
            <div
              style={{
                display: 'flex',
                gap: 6,
                alignItems: 'center',
                maxWidth: '102px',
                borderRadius: '8px',
                backgroundColor: '#5329FF',
                color: '#FFF',
                fontWeight: 600,
              }}
            >
              <Steps.StepsWhite />
              <p style={{ margin: 0 }}>Шаг 5</p>
            </div>
            <div style={{ fontSize: '25px', fontWeight: '700' }}>
              {' '}
              Масштабируй свой бизнес
            </div>
            <div style={{ fontSize: '16px' }}>
              Найдите выгодные товары для выхода на маркетплейсы
            </div>
          </div>

          <button
            className='btn-warning'
            style={{ minHeight: '64px', fontSize: '18px' }}
            onClick={() => navigate('/tariffs')}
          >
            Начать работать
          </button>
        </div>
      </div>
    </div>
  );
};
export default StepsTime;
