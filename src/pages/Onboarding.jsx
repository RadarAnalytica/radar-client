import React, { useContext, useEffect, useState, Suspense } from 'react';
import { jwtDecode } from 'jwt-decode';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import InputField from '../components/InputField';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ServiceFunctions } from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import { URL } from '../service/config';

import Modal from 'react-bootstrap/Modal';
import DragDropFile from '../components/DragAndDropFiles';
//import WbIcon from '../assets/WbIcon';
import {
  getFileClickHandler,
  saveFileClickHandler,
} from '../service/getSaveFile';
import NoSubscriptionPage from './NoSubscriptionPage';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';

const Onboarding = () => {
  const { user, authToken, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeShop, setActiveShop] = useState();
  const [brandName, setBrandName] = useState();
  const [token, setToken] = useState();
  const [file, setFile] = useState();
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [costPriceShow, setCostPriceShow] = useState(false);

  const getBrand = (e) => setBrandName(e.target.value);
  const getToken = (e) => setToken(e.target.value);

  const updateIsOnboarded = () => {
    ServiceFunctions.refreshUser(authToken).then((data) => {
      setUser(jwtDecode(data?.token));
      navigate('/dashboard');
    });
  };

  const handleClose = () => {
    updateIsOnboarded();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleCostPriceClose = () => setCostPriceShow(false);

  const submitHandler = (e) => {
    if (!token && !user) {
      e.preventDefault();
    } else {
      ServiceFunctions.updateToken(brandName, token, authToken)
        .then((data) => {
          console.log('Токен успешно добавлен');
        })
        .finally(handleShow());
    }
  };
  const checkIdQueryParam = () => {
    const searchParams = new URLSearchParams(location.search);
    const idQueryParam = searchParams.get('id');
    if (idQueryParam && parseInt(idQueryParam) !== user.id) {
      logout();
      navigate('/signin');
    } else {
      return;
    }
  };

  useEffect(() => {
    if (location.search) {
      checkIdQueryParam();
    }
  }, [location.search]);

  useEffect(() => {
    ServiceFunctions.getAllShops(authToken).then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        handleClose();
      }, 4000);
    }
  }, [show]);

  if (user?.subscription_status === "expired") {
    return <NoSubscriptionPage title={"Подключение API"} />;
  }

  return (
    user && (
      <div className='onboarding-page'>
        <MobilePlug />
        <div style={{ height: '100vh' }}>
          <Sidebar />
        </div>
        {/* <SideNav /> */}
        <div className='boarding-content w-100' style={{ padding: '0 32px' }}>
          <TopNav title={'Подключение API'} />

          <div
            className='container dash-container d-flex'
            style={{ gap: '20px' }}
          >
            <div className='onboard-form-block col'>
              <p style={{ fontWeight: 700, fontSize: 24, width: '90%' }}>
                Укажите токен нового образца, чтобы продолжить пользоваться
                всеми возможностями нашего сервиса
              </p>
              <Suspense fallback={null}>
                <InputField
                  type={'text'}
                  label={'Название'}
                  callback={getBrand}
                  placeholder={'Ваш бренд или юр. лицо'}
                />
              </Suspense>
              <Suspense fallback={null}>
                <InputField
                  type={'text'}
                  label={'Токен'}
                  callback={getToken}
                  placeholder={'Пример: GJys67G7sbNw178F'}
                />
              </Suspense>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  height: '100%'
                }}>
                <button
                  className='prime-btn'
                  style={{ height: '7vh' }}
                  onClick={() => {
                    submitHandler();
                  }}
                >
                  Начать работать
                </button>
              </div>
            </div>
            <div className='onboard-description col'>
              <p style={{ fontWeight: 700, fontSize: 24, width: '90%' }}>
                Что такое токен и как его получить?
              </p>
              <p translate="no" className='no-translate'>
                Токен (или АРІ-ключ) - секретный ключ, который Wildberries
                выдает поставщикам и используемый для получения данных без
                доступа к личному кабинету.
              </p>
              <ol>
                <li translate="no" className='no-translate'>
                  Зайдите в ваш Личный Кабинет на портале Поставщиков
                  Wildberries
                </li>
                <li>
                  Перейдите в раздел «Доступ к АРІ», нажмите на кнопку «Создать
                  новый токен»
                </li>
                <li>
                  Далее необходимо выбрать доступ, скругленные кнопки ниже
                  (Контент, Маркетплейс, Статистика, Аналитика, Продвижение,
                  Вопросы и отзывы, Цены и скидки). Важно: галочка
                  «Только на чтение» должна быть снята.
                </li>
                <li translate="no" className='no-translate'>
                  Нажмите на кнопку «Скопировать» и вставьте токен в текстовое
                  поле «Токен Wildberries» и нажмите кнопку «Подключить».
                  Готово!
                </li>
              </ol>
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={() => {
            handleClose();
          }}
          className='add-token-modal'
        >
          <Modal.Header closeButton>
            <div className='d-flex align-items-center gap-2'>
              <svg
                width='60'
                height='60'
                viewBox='0 0 60 60'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  width='60'
                  height='60'
                  rx='12'
                  fill='#00B69B'
                  fillOpacity='0.1'
                />
                <path
                  d='M26.6248 35.8244L43.4153 19L46 21.5878L26.6248 41L15 29.353L17.5829 26.7652L26.6248 35.8244Z'
                  fill='#00B69B'
                />
              </svg>
              <div style={{ width: '100%' }}>
                <div className='d-flex justify-content-between'>
                  <h4 className='fw-bold mb-0'>Токен успешно добавлен</h4>
                </div>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <p>
              Ваш токен успешно подключен к сервису и находится на проверке. В
              ближайшее время данные начнут отображаться в разделе{' '}
              <Link onClick={handleClose} className='link' style={{ padding: '0' }}>
                Сводка продаж
              </Link>
            </p>
            {/* <div className="d-flex justify-content-between">
                        <div className="grey-block d-flex align-items-center">
                            <p className='col mb-0' style={{ fontSize: '14px' }}>
                                Для максимального использования всего функционала, внесите себестоимость ваших товаров
                            </p>
                            <button className='prime-btn col'
                                style={{ fontSize: '13px', height: '75%', padding: '12px 12px' }}
                                onClick={handleCostPriceShow}
                            >
                                Внести себестоимость товаров
                            </button>
                        </div>
                    </div> */}
          </Modal.Body>
        </Modal>

        {/* SELFCOST */}
        <Modal
          show={costPriceShow}
          onHide={handleCostPriceClose}
          className='add-token-modal'
        >
          <Modal.Header closeButton>
            <div className='d-flex align-items-center gap-2'>
              <div style={{ width: '100%' }}>
                <div className='d-flex justify-content-between'>
                  <h4 className='fw-bold mb-0'>
                    Установка себестоимости товара
                  </h4>
                </div>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            {file ? (
              <div>
                <div className='d-flex align-items-center justify-content-between w-100 mt-2 gap-2'>
                  <div className='d-flex gap-2'>
                    <svg
                      width='17'
                      height='23'
                      viewBox='0 0 17 23'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M14 21.75H3C1.75736 21.75 0.75 20.7426 0.75 19.5V3.5C0.75 2.25736 1.75736 1.25 3 1.25H10.8588L16.25 6.32405V19.5C16.25 20.7426 15.2426 21.75 14 21.75Z'
                        stroke='black'
                        strokeOpacity='0.5'
                        strokeWidth='1.5'
                      />
                    </svg>
                    <span>{file ? file.name : ''}</span>
                  </div>
                  <div>
                    <a
                      href='#'
                      className='link'
                      onClick={() => setFile(null)}
                      style={{ color: 'red', cursor: 'pointer' }}
                    >
                      Удалить
                    </a>
                  </div>
                </div>
                <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                  <button
                    onClick={() => {
                      saveFileClickHandler(file, authToken, activeShop.id);
                      setFile(null);
                      handleCostPriceClose();
                    }}
                    className='prime-btn'
                    style={{ height: '52px' }}
                  >
                    Сохранить
                  </button>
                </div>
                <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                  <a href='#' className='link' onClick={handleCostPriceClose}>
                    Отмена
                  </a>
                </div>
              </div>
            ) : (
              <div className='d-flex flex-column align-items-center justify-content-around w-100'>
                {/* <div className="file-block d-flex flex-column align-items-center justify-content-around w-100 mt-2 gap-2">
                                    <svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 11C17.5147 11 15.5 13.0147 15.5 15.5V16C15.5 18.4853 17.5147 20.5 20 20.5C22.4853 20.5 24.5 18.4853 24.5 16V15.5C24.5 13.0147 22.4853 11 20 11Z" fill="#5329FF" />
                                        <path d="M11.5 47H53.5C58.4706 47 62.5 42.9706 62.5 38V30L47.8422 21.4198C44.3822 19.3944 39.9996 19.902 37.0941 22.6647L26.75 32.5L11.5 47Z" fill="#5329FF" />
                                        <path d="M11.5 47H53.5C58.4706 47 62.5 42.9706 62.5 38V30M11.5 47H10C5.30558 47 1.5 43.1944 1.5 38.5V38.5M11.5 47L26.75 32.5M62.5 30V10C62.5 5.02944 58.4706 1 53.5 1H10.5C5.52944 1 1.5 5.02944 1.5 10V38.5M62.5 30L47.8422 21.4198C44.3822 19.3944 39.9996 19.902 37.0941 22.6647L26.75 32.5M26.75 32.5L21.1388 29.258C17.7739 27.3138 13.5411 27.749 10.6422 30.3373L1.5 38.5M24.5 15.5V16C24.5 18.4853 22.4853 20.5 20 20.5V20.5C17.5147 20.5 15.5 18.4853 15.5 16V15.5C15.5 13.0147 17.5147 11 20 11V11C22.4853 11 24.5 13.0147 24.5 15.5Z" stroke="#5329FF" strokeWidth="1.5" />
                                    </svg>
                                    <h5 className='fw-bold'>Перетащите файл сюда</h5>
                                    <span className='clue-text'>или нажмите на кнопку</span>
                                    <button className='prime-btn' style={{ padding: '16px 20px' }}
                                        onClick={() => setShowDelete(false)}>
                                        Выбрать файл
                                    </button>
                                </div> */}
                <DragDropFile files={file} setFiles={setFile} />
                <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                  <a
                    href='#'
                    className='link'
                    onClick={() =>
                      getFileClickHandler(authToken, activeShop.id)
                    }
                  >
                    Скачать шаблон
                  </a>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    )
  );
};

export default Onboarding;
