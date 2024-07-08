import React, { useState } from 'react';
import OrangeLabelSelect from '../pages/images/OrangeLabelSelect';
import logoStart from '../pages/images/logoForCardStart.png';
import logoPro from '../pages/images/logoForCardPro.png';
import logoProPlus from '../pages/images/logoForCardProPlus.png';
import Steps from '../pages/images/Steps';
import StartLogo from '../assets/startlogo.svg';
import FireLogo from '../assets/firelogo.svg';

const SelectRate = ({redirect}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('1month');

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column', marginTop: '100px' }}
      >
        <div className='doughnut-content'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(83, 41, 255, 1)',
              padding: '20px',
              borderRadius: '20px',
              width: '50%',
            }}
          >
            <div
              style={{
                fontWeight: '700',
                fontSize: '32px',
                color: 'white',
                width: '100%',
              }}
            >
              Здесь есть всё, что нужно любому бизнесу на маркетплейсе
            </div>
            <div className='OrangeLabel'>
              <OrangeLabelSelect />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '10px',
            }}
          >
            <div style={{ fontSize: '46px', fontWeight: '700' }}>
              Выберите тариф, который подойдет{' '}
              <span style={{ color: '#F0AD00' }}>именно Вам</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#1A1A1A08',
                padding: '5px',
                borderRadius: '10px',
              }}
            >
              <button
                onClick={() => handlePeriodChange('1month')}
                className={
                  selectedPeriod === '1month' ? 'prime-btn' : 'secondary-btn'
                }
                id='btnDop'
              >
                {selectedPeriod === '1month' ? <Steps.Circle /> : <span></span>}
                1 месяц
              </button>
              <button
                onClick={() => handlePeriodChange('3month')}
                className={
                  selectedPeriod === '3month' ? 'prime-btn' : 'secondary-btn'
                }
                id='btnDop'
              >
                {selectedPeriod === '3month' ? <Steps.Circle /> : <span></span>}
                3 месяца{' '}
                <span>-10%</span>
              </button>
              <button
                onClick={() => handlePeriodChange('6month')}
                className={
                  selectedPeriod === '6month' ? 'prime-btn' : 'secondary-btn'
                }
                id='btnDop'
              >
                {selectedPeriod === '6month' ? <Steps.Circle /> : <span></span>}
                6 месяцев{' '}
                <span>до -60%</span>
              </button>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='cardsPriceStart'>
            <div className='HeadCardStart'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {' '}
                <div
                  style={{
                    color: '#F0AD00',
                    fontWeight: '700',
                    fontSize: '30px',
                  }}
                >
                  Start
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#F0AD00',
                    borderRadius: '10px',
                    padding: '4px',
                    color: 'white',
                    fontSize: '18px',
                  }}
                >
                  <img src={StartLogo} style={{ width: '20%' }} />{' '}
                  <div>Для начала</div>
                </div>
              </div>
              <div className='selectPrice'>
                {' '}
                {selectedPeriod === '1month' && (
                  <span className='priceCardOne'>2 990 ₽</span>
                )}
                {selectedPeriod === '3month' && (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span className='priceCardOne'>8 073 ₽</span>
                    <span
                      style={{
                        marginLeft: '10px',
                        textDecoration: 'line-through',
                      }}
                    >
                      8 970 ₽
                    </span>
                    <span
                      style={{
                        marginLeft: '10px',
                        color: '#5329FF',
                        backgroundColor: '#5329FF1A',
                        fontWeight: '700',
                      }}
                    >
                      -10%
                    </span>
                  </span>
                )}
                {selectedPeriod === '6month' && (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span className='priceCardOne'>10 764 ₽</span>
                    <span
                      style={{
                        marginLeft: '10px',
                        textDecoration: 'line-through',
                      }}
                    >
                      17 940 ₽
                    </span>
                    <span
                      style={{
                        marginLeft: '10px',
                        color: '#5329FF',
                        backgroundColor: '#5329FF1A',
                        fontWeight: '700',
                      }}
                    >
                      -40%
                    </span>
                  </span>
                )}
                <div>В месяц</div>
              </div>

              <button
                className='btn-warning'
                style={{
                  minHeight: '64px',
                  fontSize: '18px',
                  marginTop: '15px',
                }}
                onClick={() => redirect()}
              >
                Попробовать бесплатно
              </button>
            </div>
            <div className='bodyCardStart'>
              <div className='labelCard'>
                Оборот селлера:
                <div style={{ fontSize: '20px', fontWeight: '500' }}>
                  До 1 млн Р / мес
                </div>
              </div>
              <div className='labelCard'>
                Функционал
                <div style={{ fontSize: '20px', fontWeight: '500' }}>
                  Полный функционал
                </div>
              </div>
              <div className='labelCard'>
                Количество магазинов:
                <div style={{ fontSize: '20px', fontWeight: '500' }}>1</div>
              </div>
            </div>
          </div>
          <div className='cardsPricePro'>
            <div className='HeadCardPro'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {' '}
                <div
                  style={{
                    color: '#5329FF',
                    fontWeight: '700',
                    fontSize: '30px',
                  }}
                >
                  PRO
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#5329FF',
                    borderRadius: '10px',
                    padding: '4px',
                    color: 'white',
                    fontSize: '18px',
                  }}
                >
                  <img src={FireLogo} style={{ width: '20%' }} />{' '}
                  <div>Популярно</div>
                </div>
              </div>
              <div className='selectPrice'>
                {' '}
                {selectedPeriod === '1month' && (
                  <span className='priceCardOne'>4 490 ₽</span>
                )}
                {selectedPeriod === '3month' && (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span className='priceCardOne'>12 123 ₽</span>
                    <span
                      style={{
                        marginLeft: '10px',
                        textDecoration: 'line-through',
                      }}
                    >
                      13 470 ₽
                    </span>
                    <span
                      style={{
                        marginLeft: '10px',
                        color: '#5329FF',
                        backgroundColor: '#5329FF1A',
                        fontWeight: '700',
                      }}
                    >
                      -10%
                    </span>
                  </span>
                )}
                {selectedPeriod === '6month' && (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span className='priceCardOne'>13 470 ₽</span>
                    <span
                      style={{
                        marginLeft: '10px',
                        textDecoration: 'line-through',
                      }}
                    >
                      26 940 ₽
                    </span>
                    <span
                      style={{
                        marginLeft: '10px',
                        color: '#5329FF',
                        backgroundColor: '#5329FF1A',
                        fontWeight: '700',
                      }}
                    >
                      -50%
                    </span>
                  </span>
                )}
                <div>В месяц</div>
              </div>

              <button
                className='prime-btn'
                style={{
                  minHeight: '64px',
                  fontSize: '18px',
                  marginTop: '15px',
                }}
                onClick={() => redirect()}
              >
                Попробовать бесплатно
              </button>
            </div>
            <div className='bodyCardStart'>
              <div className='labelCard'>
                Оборот селлера:
                <div style={{ fontSize: '20px', fontWeight: '500' }}>
                  До 6 млн Р / мес
                </div>
              </div>
              <div className='labelCard'>
                Функционал
                <div style={{ fontSize: '20px', fontWeight: '500' }}>
                  Полный функционал
                </div>
              </div>
              <div className='labelCard'>
                Количество магазинов:
                <div style={{ fontSize: '20px', fontWeight: '500' }}>До 3</div>
              </div>
              <div className='bonusPro'>
                Бонус:
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '500',
                  }}
                >
                  <Steps.CircleOkBlue />
                  <span style={{ marginLeft: '5px' }}>Личный менеджер</span>
                </div>
              </div>
            </div>
          </div>
          <div className='cardsPriceProPlus'>
            <div className='HeadCardProPlus'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {' '}
                <div
                  style={{
                    color: '#0069FF',
                    fontWeight: '700',
                    fontSize: '30px',
                  }}
                >
                  PRO +
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: 'black',
                    borderRadius: '10px',
                    padding: '4px',
                    color: 'white',
                    fontSize: '18px',
                  }}
                >
                  <img src={logoProPlus} style={{ width: '20%' }} />{' '}
                  <div>Лучший выбор</div>
                </div>
              </div>
              <div className='selectPrice'>
                {' '}
                {selectedPeriod === '1month' && (
                  <span className='priceCardOne'>5 490 ₽</span>
                )}
                {selectedPeriod === '3month' && (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span className='priceCardOne'>14 823 ₽</span>
                    <span
                      style={{
                        marginLeft: '10px',
                        textDecoration: 'line-through',
                      }}
                    >
                      16 470 ₽
                    </span>
                    <span
                      style={{
                        marginLeft: '10px',
                        color: '#5329FF',
                        backgroundColor: '#5329FF1A',
                        fontWeight: '700',
                      }}
                    >
                      -10%
                    </span>
                  </span>
                )}
                {selectedPeriod === '6month' && (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span className='priceCardOne'>19 764 ₽</span>
                    <span
                      style={{
                        marginLeft: '10px',
                        textDecoration: 'line-through',
                      }}
                    >
                      32 940 ₽
                    </span>
                    <span
                      style={{
                        marginLeft: '10px',
                        color: '#5329FF',
                        backgroundColor: '#5329FF1A',
                        fontWeight: '700',
                      }}
                    >
                      -60%
                    </span>
                  </span>
                )}
                <div>В месяц</div>
              </div>

              <button
                className='btn-black'
                style={{
                  minHeight: '64px',
                  fontSize: '18px',
                  marginTop: '15px',
                }}
                onClick={() => redirect()}
              >
                Попробовать бесплатно
              </button>
            </div>
            <div className='bodyCardProPlus'>
              <div className='labelCard'>
                Оборот селлера:
                <div style={{ fontSize: '20px', fontWeight: '500' }}>
                  Более 6 млн Р / мес
                </div>
              </div>
              <div className='labelCard'>
                Функционал
                <div style={{ fontSize: '20px', fontWeight: '500' }}>
                  Полный функционал
                </div>
              </div>
              <div className='labelCard'>
                Количество магазинов:
                <div style={{ fontSize: '20px', fontWeight: '500' }}>До 15</div>
              </div>
              <div className='bonusProPlus'>
                Бонус:
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '500',
                  }}
                >
                  <div>
                    <Steps.CircleOkWhite />
                    <span style={{ marginLeft: '5px' }}>Личный менеджер</span>
                  </div>
                  <div>
                    <Steps.CircleOkWhite />
                    <span style={{ marginLeft: '5px' }}>
                      приоритетная поддержка
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SelectRate;
