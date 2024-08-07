import React, {useEffect, useContext} from 'react';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import TestSub from '../assets/TestSub.svg';
import CloseIcon from '../assets/CloseIcon.svg';
import SunIcon from '../assets/SunIcon.svg';
import SmartSubscription from '../assets/SmartSubscription.svg';
import StatusInfo from '../components/StatusInfo';
import moment from 'moment';
import 'moment/locale/ru';
import { URL } from '../service/config';
import AuthContext from '../service/AuthContext';

const Subscriptions = () => {
  const { user, authToken } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = React.useState([]);

  useEffect(() => {
      const fetchSubscriptions = async () => {
        const response = await fetch(`${URL}/api/user/subscription/all`, {
          method: 'GET',
          headers: {
           'content-type': 'application/json',
            authorization: 'JWT ' + authToken,
          },
        });
        const data = await response.json();
        setSubscriptions(data);
  
      
    }
    fetchSubscriptions();
  }, []);

  const handleRestoreSubscription = async () => {
    try {
      const response = await fetch(
        `${URL}/api/user/subscription/restore/564`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: "JWT " + authToken,
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancelSubscription = async() => {
    try {
      const response = await fetch(
        `${URL}/api/user/subscription/cancel/564`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: "JWT " + authToken,
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const rejectSubscription = ({toggleText}) => {
    return(
      <div className='sub-card-toggle' onClick={handleCancelSubscription}>
        <img src={CloseIcon} alt='Close subscription' className='mr-5' />
        <span>{toggleText}</span>
      </div>
    )
  };

  const restoreSubscription = ({toggleText}) => {
    return (
      <div className='sub-card-toggle' style={{backgroundColor: '#5329FF0D', borderRadius: '8px'}}>
        <span 
          className='d-flex align-items-center' 
          style={{cursor: 'pointer', padding:'8px',}}
          >
         <img 
         src={SunIcon} 
         alt='Restore subscription' 
         className='mr-5' 
         style={{width: 24, height: 24}}
         />
        <span 
        style={{
          color: '#5329FF',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '25px',
          }}
          onClick={handleRestoreSubscription}
          >
            Восстановить подписку
          </span>
        </span>
      </div>
    )
  };

  return (
    <div className='sub-page'>
      <SideNav />
      <div className='sub-page-content'>
        <TopNav title={'Моя подписка'} />
        <div className='container dash-container sub-page-grid'>
          {subscriptions.map((item) => {
            const activeText = item.active ? 'Активна' : 'Неактивна';
            const activeColor = item.active ? '#00B69B' : '#808080';
            const activeWidth = item.active ? 120 : 140;
            const toggleText = item.active
              ? rejectSubscription({toggleText: 'Отказаться от подписки'})
              : restoreSubscription({toggleText: 'Восстановить подписку'});
            const paymentDate = moment(item.validity_period)
              .add(1, 'days')
              .locale('ru')
              .format('DD MMMM')
              const activeTillPeriod = moment(item.validity_period)
              .locale('ru')
              .format('DD MMMM');
            return (
              <div className='sub-card'>
                <div className='sub-card-row'>
                  <div className='sub-card-content-wrap'>
                    <img src={TestSub} alt='subImg' />
                    <div className='sub-card-content'>
                      <span className='sub-card-content-title'>
                        {item.name}
                      </span>
                      <span className='sub-card-content-text'>
                        Действует до {activeTillPeriod}
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
                  <span className='sub-card-content-text sub-card-content-pay'>
                    {`Следующее списание средств ${paymentDate}`}
                  </span>
                )}
                <p className='sub-divider' />
                <div className='sub-card-toggle'>
                 {toggleText}
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
