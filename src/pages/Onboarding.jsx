import React, { useContext, useEffect, useState, Suspense } from 'react';
import styles from './Onboarding.module.css';
import { jwtDecode } from 'jwt-decode';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import InputField from '../components/InputField';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ServiceFunctions } from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import { URL } from '../service/config';
import Header from '../components/sharedComponents/header/header';
import Modal from 'react-bootstrap/Modal';
import DragDropFile from '../components/DragAndDropFiles';
import WbIcon from '../assets/wb_small_main_icon.png';
import {
  getFileClickHandler,
  saveFileClickHandler,
} from '../service/getSaveFile';
import NoSubscriptionPage from './NoSubscriptionPage';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import { Modal as AntdModal } from 'antd';
import ErrorModal from '../components/sharedComponents/modals/errorModal/errorModal';



const initRequestStatus = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

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
  const [reqStatus, setReqStatus] = useState(initRequestStatus);
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

  const submitHandler = async (e) => {
    if (!token && !user) {
      e.preventDefault();
    } else {
      let res = await ServiceFunctions.updateToken(brandName, token, authToken)
      if (!res.ok) {
        res = await res.json();
        console.log(res);
        setReqStatus({...initRequestStatus, isError: true, message: res.message || 'Не удалось добавить магазин'});
        return;
      } else {
        setReqStatus({...initRequestStatus, isSuccess: true, message: 'Токен успешно добавлен'});
        return
      }
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
    if (reqStatus.isSuccess) {
      handleShow();
    }
  }, [reqStatus]);

  useEffect(() => {
    ServiceFunctions.getAllShops(authToken).then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        handleClose();
        setReqStatus(initRequestStatus);
      }, 4000);
    }
  }, [show]);

  if (user?.subscription_status === "expired") {
    return <NoSubscriptionPage title={"Подключение API"} />;
  }

  return (
    user && (
      <>
        <main className={styles.page}>
          <MobilePlug />
          {/* ------ SIDE BAR ------ */}
          <section className={styles.page__sideNavWrapper}>
            <Sidebar />
          </section>
          {/* ------ CONTENT ------ */}
          <section className={styles.page__content}>
            {/* header */}
            <div className={styles.page__headerWrapper}>
              <Header title='Подключение API' hasShadow={false} />
            </div>
            {/* !header */}

            <div className={styles.page__blocks}>
              {/* left block */}
              <div className={`${styles.page__block} ${styles.page__block_bg}`}>
                <div className={styles.page__blockHeaderWrapper}>
                  <p className={styles.page__blockTitle}>
                    Укажите токен нового образца
                  </p>
                  <div className={styles.page__officialBar}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="20" height="20" rx="5" fill="white" />
                      <path d="M10.1992 14.4091V4.9126H13.001C14.0985 4.9126 14.8622 4.96233 15.2922 5.06179C15.7267 5.15693 16.1007 5.3191 16.4143 5.54829C16.7681 5.80776 17.0391 6.13858 17.2273 6.54076C17.4199 6.94294 17.5162 7.38619 17.5162 7.87053C17.5162 8.60569 17.328 9.20463 16.9518 9.66735C16.58 10.1257 16.0358 10.4306 15.3191 10.582L17.9999 14.4091H14.9697L12.7121 10.6922V14.4091H10.1992ZM12.7121 9.40139H13.2093C13.7871 9.40139 14.2082 9.30626 14.4725 9.11598C14.7412 8.9257 14.8756 8.62732 14.8756 8.22082C14.8756 7.74512 14.7502 7.40782 14.4994 7.20889C14.253 7.00564 13.8364 6.90401 13.2496 6.90401H12.7121V9.40139Z" fill="#1A1A1A" />
                      <path d="M7.56232 16.0672C7.13329 16.2004 6.67322 15.9693 6.55332 15.5456C5.52568 11.9144 5.53454 8.07751 6.57895 4.4509C6.7008 4.02776 7.16194 3.79863 7.59035 3.9338C8.01875 4.06896 8.25206 4.51723 8.1316 4.94075C7.19009 8.25087 7.18201 11.7484 8.10822 15.0626C8.22672 15.4866 7.99135 15.9339 7.56232 16.0672Z" fill="#F0AD00" />
                      <path d="M3.78232 14.3886C3.3356 14.4856 2.88647 14.2308 2.7985 13.8157C2.28948 11.4139 2.26599 8.94614 2.72922 6.53656C2.80928 6.12012 3.25349 5.85803 3.70199 5.94778C4.15049 6.03754 4.43331 6.44513 4.3547 6.86181C3.94228 9.04797 3.96357 11.285 4.41754 13.4642C4.50406 13.8795 4.22905 14.2916 3.78232 14.3886Z" fill="#F0AD00" />
                    </svg>

                    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.355469 0.353516L2.35547 2.35352M4.35547 4.35352L2.35547 2.35352M2.35547 2.35352L4.35547 0.353516L0.355469 4.35352" stroke="black" />
                    </svg>

                    <img src={WbIcon} alt='' width={20} height={20} style={{ transform: 'scale(1.3) translateX(-1px' }} />
                    Радар Аналитика – Официальный авторизованный сервис Wildberries
                  </div>
                </div>

                <Suspense fallback={null}>
                  <InputField
                    type={'text'}
                    label={'Название'}
                    callback={getBrand}
                    placeholder={'Ваш бренд или юр. лицо'}
                    labelStyle={{
                      fontSize: '12px',
                      margin: 0,
                      lineHeight: 1
                    }}
                    inputStyle={{
                      height: '38px !important',
                      maxHeight: '38px !important',
                      minHeight: '38px',
                      fontSize: '14px',
                    }}
                  />
                </Suspense>
                <Suspense fallback={null}>
                  <InputField
                    type={'text'}
                    label={'Токен'}
                    callback={getToken}
                    placeholder={'Пример: GJys67G7sbNw178F'}
                    labelStyle={{
                      fontSize: '12px',
                      margin: 0,
                      lineHeight: 1
                    }}
                    inputStyle={{
                      height: '38px !important',
                      maxHeight: '38px !important',
                      minHeight: '38px',
                      fontSize: '14px',
                    }}
                  />
                </Suspense>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    height: '100%',
                    width: '100%'
                  }}>
                  <button
                    className={`${styles.page__button}`}
                    onClick={() => {
                      submitHandler();
                    }}
                  >
                    Подключить
                  </button>
                </div>
                <div className={styles.page__buttonHelper}>
                  Тяжело разобраться?
                  <Link href='/'>Полная инструкция</Link>
                </div>
              </div>

              {/* right block */}
              <div className={`${styles.page__block} ${styles.page__block_border}`}>
                <div className={`${styles.page__blockHeaderWrapper} ${styles.page__blockHeaderWrapper_horizontal}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.1033 4.02774C16.0265 2.95088 14.2805 2.95088 13.2037 4.02774L10.6997 6.53166C10.5617 6.6697 10.3934 6.7737 10.2082 6.83543L7.35152 7.78767C5.40685 8.43589 4.8242 10.904 6.27368 12.3535L8.42972 14.5095L3.46967 19.4696C3.17678 19.7625 3.17678 20.2373 3.46967 20.5302C3.76256 20.8231 4.23744 20.8231 4.53033 20.5302L9.49038 15.5702L11.6166 17.6964C13.0661 19.1459 15.5342 18.5632 16.1824 16.6186L17.1347 13.7619C17.1964 13.5767 17.3004 13.4084 17.4384 13.2703L19.9423 10.7664C21.0192 9.68956 21.0192 7.94362 19.9423 6.86675L17.1033 4.02774ZM10.1218 14.0803L12.6773 16.6358C13.3383 17.2967 14.4638 17.031 14.7594 16.1442L15.7116 13.2875C15.847 12.8814 16.0751 12.5124 16.3778 12.2097L18.8817 9.70577C19.3728 9.21469 19.3728 8.41849 18.8817 7.92742L16.0427 5.0884C15.5516 4.59732 14.7554 4.59732 14.2643 5.0884L11.7604 7.59232C11.4577 7.89502 11.0887 8.12309 10.6826 8.25846L7.82586 9.21069C6.93904 9.5063 6.67334 10.6318 7.33434 11.2928L9.91964 13.8781C9.95867 13.9045 9.99577 13.935 10.0303 13.9696C10.0649 14.0041 10.0954 14.0412 10.1218 14.0803Z" fill="#1A1A1A" />
                  </svg>

                  <p className={styles.page__blockTitle}>
                    Что такое токен и как его получить?
                  </p>
                </div>
                <p translate="no" className={`no-translate ${styles.page__blockText}`}>
                  Токен (или АРІ-ключ) - секретный ключ, который Wildberries
                  выдает поставщикам и используемый для получения данных без
                  доступа к личному кабинету.
                </p>
                <ol className={styles.page__list}>
                  <li translate="no" className={`no-translate ${styles.page__blockText}`}>
                    Зайдите в ваш <span>Личный Кабинет</span> на портале Поставщиков
                    Wildberries
                  </li>
                  <li className={`${styles.page__blockText}`}>
                    Перейдите в раздел <span>«Доступ к АРІ»</span>, нажмите на кнопку <span>«Создать
                      новый токен»</span>
                  </li>
                  <li className={`${styles.page__blockText}`}>
                  Далее необходимо выбрать доступ, скругленные кнопки ниже (Контент, Маркетплейс, Статистика, Аналитика, Продвижение, Рекомендации, Вопросы и отзывы, Цены и скидки). <span>Важно:</span> галочка «Только на чтение» должна быть снята.
                  </li>
                  <li translate="no" className={`no-translate ${styles.page__blockText}`}>
                    Нажмите на кнопку <span>«Скопировать»</span> и вставьте токен в текстовое
                    поле <span>«Токен Wildberries»</span> и нажмите кнопку <span>«Подключить»</span>.
                    Готово!
                  </li>
                </ol>
              </div>
            </div>

            {/* modals */}
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
                    width='30'
                    height='30'
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
                      <h4 className={styles.page__blockTitle}>Токен успешно добавлен</h4>
                    </div>
                  </div>
                </div>
              </Modal.Header>
              <Modal.Body>
                <p className={styles.page__blockText} style={{ lineHeight: '140%' }}>
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

            <ErrorModal
              open={reqStatus.isError}
              onClose={() => setReqStatus(initRequestStatus)}
              onCancel={() => setReqStatus(initRequestStatus)}
              onOk={() => setReqStatus(initRequestStatus)}
              message={reqStatus.message}
              footer={null}
            />

            {/* <SettingsModal /> */}
          </section>
          {/* ---------------------- */}
        </main>




      </>
    )
  );
};

export default Onboarding;

const SettingsModal = () => {

  return (
    <AntdModal
      open={open}
      footer={null}
      centered
      width={600}
    >
      <div className={styles.modal__body}>
        <p className={styles.modal__title}>
          API ключ ИП Скориченко Л.С.
        </p>
        <div className={styles.modal__validityBar}>
          <p>Действителен до <span>12.12.2025</span></p>
        </div>

        <p className={styles.page__blockTitle}>
          Права на методы
        </p>

        <div className={styles.modal__tags}>
          {['Контент', 'Маркетплейс', 'Статистика', 'Аналитика', 'Продвижение', 'Вопросы и отзывы', 'Цены и скидки'].map((_, index) => (
            <div key={index} className={styles.modal__tag}>
              {_}
            </div>
          ))}
        </div>

        <p className={styles.page__blockTitle}>
          Права на запись
        </p>

        <div className={styles.modal__tag} style={{ width: 'fit-content' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7.46667" stroke="#5329FF" stroke-width="1.06667" />
            <path d="M9.04492 5.67422C9.20031 6.01105 9.5203 6.24285 9.88867 6.28652L12.3682 6.58047L10.5352 8.27578C10.2628 8.52765 10.1406 8.90313 10.2129 9.26699L10.6992 11.7162L8.52051 10.4965C8.1968 10.3153 7.80222 10.3153 7.47852 10.4965L5.2998 11.7162L5.78613 9.26699C5.85843 8.90314 5.73623 8.52765 5.46387 8.27578L3.63086 6.58047L6.11035 6.28652C6.47873 6.24284 6.79872 6.01107 6.9541 5.67422L7.99902 3.40664L9.04492 5.67422Z" stroke="#5329FF" stroke-width="1.06667" />
          </svg>

          Токен на чтение и редактирование
        </div>

        <div className={styles.modal__footer}>
          <div className={styles.modal__tooltip}>
            Как получить API ключ?
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
              <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
            </svg>
          </div>

          <button className={styles.modal__button}>Изменить</button>
        </div>
      </div>
    </AntdModal>
  )
}