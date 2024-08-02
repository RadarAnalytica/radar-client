import React from 'react';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import TestSub from '../assets/TestSub.svg';
import StatusInfo from '../components/StatusInfo';
import moment from 'moment';

const Subscriptions = () => {
  const subData = [
    {
      image: TestSub,
      name: 'Тестовый период',
      active: true,
      validity_period: '09.09.2024',
    },
    {
      image: TestSub,
      name: 'Тестовый период',
      active: true,
      validity_period: '09.09.2024',
    },
    {
      image: TestSub,
      name: 'Тестовый период',
      active: false,
      validity_period: '09.09.2024',
    },
  ];
  return (
    <div className='sub-page'>
      <SideNav />
      <div className='sub-page-content'>
        <TopNav title={'Моя подписка'} />
        <div className='sub-page-grid'>
          {subData.map((item) => {
            const activeText = item.active ? 'Активна' : 'Неактивна';
            const activeColor = item.active ? '#00B69B' : '#808080';
            const activeWidth = item.active ? 120 : 140;
            const toggleText = item.active
              ? 'Отказаться от подписки'
              : 'Восстановить подписку';
            const paymentDate = moment(item.validity_period, 'DD.MM.YYYY')
              .add(1, 'days')
              .format('DD.MM.YYYY');
            return (
              <div className='sub-card'>
                <div className='sub-card-row'>
                  <div className='sub-card-content-wrap'>
                    <img src={item.image} alt='subImg' />
                    <div className='sub-card-content'>
                      <span className='sub-card-content-title'>
                        {item.name}
                      </span>
                      <span className='sub-card-content-text'>
                        {item.validity_period}
                      </span>
                    </div>
                  </div>

                  <StatusInfo
                    title={activeText}
                    fill={activeColor}
                    width={activeWidth}
                  />
                </div>
                {item.active && (
                  <span className='sub-card-content-text sub-card-content-pay'>{`Следующее списание средств 4 августа ${paymentDate}`}</span>
                )}
                <p className='sub-divider' />
                <div className='sub-card-toggle'>
                  <img src='' alt='' />
                  <span>{toggleText}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
