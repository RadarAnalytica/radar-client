import { useContext, useState, useEffect } from 'react';
import { ServiceFunctions } from '../service/serviceFunctions';
import { fileDownload } from '../service/utils';
import AuthContext from '../service/AuthContext';
import primeCost from './images/prime-cost.svg';
import Modal from 'react-bootstrap/Modal';
import DragDropFile from '../components/DragAndDropFiles';
import BottomNavigation from '../components/BottomNavigation';
import styles from './PrimeCost.module.css';
import doneIcon from "../assets/tick-active.png";
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';
import ErrorModal from '../components/sharedComponents/modals/errorModal/errorModal';
import SuccessModal from '../components/sharedComponents/modals/successModal/successModal';
import NoSubscriptionWarningBlock from '../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from "@/app/providers";
import DemonstrationSection from '@/components/DemonstrationSection';

const PrimeCost = () => {
  const [file, setFile] = useState();
  const { isDemoMode } = useDemoMode();
  const { authToken, user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [costPriceShow, setCostPriceShow] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [costPriceStatus, setCostPriceStatus] = useState();
  const [costPriceUpdated, setCostPriceUpdated] = useState();
  const [showModalError, setShowModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFileUpload, setIsFileUpload] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCostPriceShow = () => {
    handleClose();
    setCostPriceShow(true);
  };
  const handleCostPriceClose = () => {
    setCostPriceShow(false);
  };

  const handleTemplateDownload = async () => {
    const fileBlob = await ServiceFunctions.getCostTemplate(authToken);
    fileDownload(fileBlob, 'Себестоимость.xlsx');
  };

  const handleCostPriceSave = async () => {
    setIsFileUpload(true);
    try {
      await ServiceFunctions.postCostUpdate(authToken, file);
      setShowSuccessPopup(true);
      getCostPiceStatus();
    } catch (error) {
      // Обработка ошибки
      console.error('Ошибка при загрузке файла:', error);
      setErrorMessage(error == 'Error: Unprocessable Entity' ? 'Некорректный формат файла' : 'Ошибка при загрузке файла');
      setShowModalError(true);
    } finally {
      setCostPriceShow(false);
      setTimeout(() => setFile(null), 500);
      setIsFileUpload(false);
    }
  };

  const getCostPiceStatus = async () => {
    try {
      const status = await ServiceFunctions.getCostPriceStatus(
        authToken
      );
      setCostPriceStatus(status.status);
      setCostPriceUpdated(status.updated_at);
    } catch (error) {
      console.error('Failed to fetch Cost Price Status', error);
    }
  };

  useEffect(() => {
    getCostPiceStatus();
  }, []);

  return (
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
          <Header title={'Себестоимость'} titlePrefix={'Отчёт'} hasShadow={false} reportNav={true} />
        </div>

        {isDemoMode &&
          <div className='mb-3'>
            <NoSubscriptionWarningBlock />
          </div>
        }

        {!user.is_report_downloaded &&
          <div className='mb-3'>
            <DemonstrationSection />
          </div>
        }

        <div className={styles.primeCostWrapper}>
          <div className={styles.primeCost}>
            <div className={styles.primeCostBox}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="60" rx="10" fill="#5329FF" fillOpacity="0.15" />
                <path fillRule="evenodd" clipRule="evenodd" d="M26.6011 30.7666C26.2229 29.7445 24.7771 29.7445 24.3989 30.7666L23.8753 32.1816C23.7564 32.503 23.503 32.7564 23.1816 32.8753L21.7666 33.3989C20.7445 33.7771 20.7445 35.2229 21.7666 35.6011L23.1816 36.1247C23.503 36.2436 23.7564 36.497 23.8753 36.8184L24.3989 38.2334C24.7771 39.2556 26.2229 39.2556 26.6011 38.2334L27.1247 36.8184C27.2436 36.497 27.497 36.2436 27.8184 36.1247L29.2334 35.6011C30.2555 35.2229 30.2555 33.7771 29.2334 33.3989L27.8184 32.8753C27.497 32.7564 27.2436 32.503 27.1247 32.1816L26.6011 30.7666ZM25.5 33.8464C25.3127 34.0928 25.0928 34.3127 24.8464 34.5C25.0928 34.6873 25.3127 34.9072 25.5 35.1536C25.6873 34.9072 25.9072 34.6873 26.1536 34.5C25.9072 34.3127 25.6873 34.0928 25.5 33.8464Z" fill="#5329FF" />
                <path fillRule="evenodd" clipRule="evenodd" d="M34.3756 35.9998C34.3962 35.9999 34.4168 36 34.4374 36C39.4425 36 43.5 31.9706 43.5 27C43.5 22.0294 39.4425 18 34.4374 18C29.9469 18 26.2192 21.2434 25.5001 25.5C25.5001 25.5 25.5002 25.5 25.5001 25.5C20.5296 25.5 16.5 29.5294 16.5 34.5C16.5 39.4706 20.5294 43.5 25.5 43.5C29.9596 43.5 33.6616 40.2565 34.3756 35.9998ZM34.4692 33.7499C38.2084 33.7329 41.2344 30.7174 41.2344 27C41.2344 23.2721 38.1913 20.25 34.4374 20.25C31.1017 20.25 28.3273 22.6363 27.7505 25.7837C31.3982 26.7228 34.1508 29.8912 34.4692 33.7499ZM25.5 41.25C29.2279 41.25 32.25 38.2279 32.25 34.5C32.25 30.7721 29.2279 27.75 25.5 27.75C21.7721 27.75 18.75 30.7721 18.75 34.5C18.75 38.2279 21.7721 41.25 25.5 41.25Z" fill="#5329FF" />
              </svg>

              <div className={styles.primeCostBoxText}>
                <span className={styles.title}>Себестоимость</span>
                {costPriceStatus && (
                  <span className={styles.lastDownlaod}>
                    {costPriceStatus}
                  </span>
                )}
                {costPriceUpdated && (
                  <span className={styles.lastDownlaod}>
                    {costPriceUpdated}
                  </span>
                )}
              </div>

              <div className={styles.primeCostBoxButton}>
                <button onClick={() => handleCostPriceShow()}>
                  Загрузить себестоимость
                </button>
              </div>
            </div>
          </div>
        </div>

        <BottomNavigation />
      </section>
      {/* ---------------------- */}
      {/* ------ MODALS ------ */}
      {/* upload */}
      <Modal
        show={costPriceShow}
        onHide={handleCostPriceClose}
        className='add-token-modal'
      >
        <Modal.Header closeButton>
          <div className='d-flex align-items-center gap-2'>
            <div style={{ width: '100%' }}>
              <div className='d-flex justify-content-between'>
                <h4 className='fw-bold mb-0' style={{ fontSize: '18px' }}>Установка себестоимости товара</h4>
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
                  <span style={{ fontSize: '14px' }}>{file ? file.name : ''}</span>
                </div>
                <div>
                  <a
                    href='#'
                    className='link'
                    onClick={() => setFile(null)}
                    style={{ color: 'red', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Удалить
                  </a>
                </div>
              </div>
              <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                <button
                  onClick={handleCostPriceSave}
                  className='prime-btn'
                  style={{ height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '220px' }}
                  disabled={isFileUpload}
                >
                  <span style={{ fontSize: '14px' }}>Сохранить</span>
                </button>


              </div>
              <div className='d-flex justify-content-center w-100 gap-2'>
                <a href='#' className='link' onClick={handleCostPriceClose} style={{ fontSize: '14px'  }}>
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
                <a href='#' className='link' onClick={handleTemplateDownload} style={{ fontSize: '14px' }}>
                  Скачать шаблон
                </a>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
      {/* success */}
      <SuccessModal
        open={showSuccessPopup}
        message='Файл успешно загружен!'
        onClose={() => setShowSuccessPopup(false)}
        onCancel={() => setShowSuccessPopup(false)}
        onOk={() => setShowSuccessPopup(false)}
        footer={null}
      />
      {/* err */}
      <ErrorModal
        open={showModalError}
        message={errorMessage}
        onClose={() => setShowModalError(false)}
        onCancel={() => setShowModalError(false)}
        onOk={() => setShowModalError(false)}
        footer={null}
      />
    </main>
  )
};

export default PrimeCost;
