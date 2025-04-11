import React from 'react';
import background from '../pages/images/background-nosubscription.png';
import face from '../pages/images/face.png';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const NoSubscriptionPage = ({title}) => {
  const navigate = useNavigate();
  return (
    <div className="sub-page">
      <MobilePlug />
      <SideNav />
      <div className="background-cover">
        <TopNav title={title} />
        <div className="image-background">
          <img src={background} alt="background" />
          <div className="overlay">
            <div className="informer_nosubscription">
              <img src={face} alt="face" />
              <p>Ваша подписка закончилась ;(</p>
              <span className="informer_text">
                Чтобы продолжить пользоваться сервисом <br />
                выберите один из тарифов и произведите оплату
              </span>
              <button onClick={() => navigate('/tariffs')}>
                Посмотреть тарифы
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoSubscriptionPage;
