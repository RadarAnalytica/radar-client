import React from 'react';
import { useNavigate  } from 'react-router-dom';
import '../pages/styles.css';
import BlockImg_x2 from '../pages/images/Dashboard_x2.png';
import SolLabelStartBsn from '../pages/images/SolLabelStartBsn';
import YellowRadarPoint from '../pages/images/YellowRadarPoint';
import CustomButton from './utilsComponents/CustomButton';

const TryProduct = ({ redirect }) => {
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  return (
    <>
      <div className='wid-solutionMain'>
        <div className='sol-description col' style={{ padding: 0 }}>
          <div className='headStartBsn'>
            <SolLabelStartBsn />
            <div style={{ fontSize: '34px', fontWeight: '700' }}>
              Готовы начать?
            </div>
            <div style={{ fontSize: '22px' }}>
              Найдите прибыльные товары на маркетплейсе и развивайте свой
              бизнес.
            </div>
            <div className='YellowRadarPoint' style={{ marginTop: '20px' }}>
              <YellowRadarPoint />
            </div>
          </div>

          <div className='d-flex flex-column gap-3'>
            <CustomButton
              text={'Начать работать'}
              action={() => {
                if (currentPath === '/') {
                 window.open('/tariffs', '_blank');
                } else {
                  redirect();
                }
              }               
              }
              className={'white-btn'}
            />
          </div>
        </div>
        <div className='sol-screenshot sol-screenshot_bottom'>
          <img src={BlockImg_x2} alt='' />
        </div>
      </div>
    </>
  );
};

export default TryProduct;
