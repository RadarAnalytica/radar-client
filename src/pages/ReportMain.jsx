import { useRef, useState, useContext, useEffect } from 'react';
import { URL } from '../service/config';
import AuthContext from '../service/AuthContext';
import { formatFullDate } from '../service/utils';
import cursor from './images/cursor.svg';
import upload from './images/upload.svg';
import sucessround from './images/sucessround.svg';
import sucesscheck from './images/sucesscheck.svg';
import failcheck from './images/failcheck.svg';
import failgreycheck from './images/failgreycheck.svg';
import orangeround from './images/orangeround.svg';
import failround from './images/failround.svg';
import trashalt from './images/trash-alt.svg';
import trashIcon from './images/trash-icon.svg';
import styles from './ReportMain.module.css';
import { ServiceFunctions } from '../service/serviceFunctions';
import BottomNavigation from '../components/BottomNavigation';
import Modal from 'react-bootstrap/Modal';
import warningIcon from '../assets/warning.png';
import NoSubscriptionPage from './NoSubscriptionPage';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import FileUploader from '../components/sharedComponents/fileUploader/fileUploader';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import HowToLink from '../components/sharedComponents/howToLink/howToLink';
import ModalDeleteConfirm from "../components/sharedComponents/ModalDeleteConfirm";
import Header from '../components/sharedComponents/header/header';
import NoSubscriptionWarningBlock from '../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { Tooltip } from "antd";
import { useDemoMode } from "@/app/providers";
import DemonstrationSection from '../components/DemonstrationSection';
import { useLocation, Link } from 'react-router-dom';
import { Table as RadarTable } from 'radar-ui';
import moment from 'moment';

const tableConfig = [
  {
    title: 'ID загрузки',
    dataIndex: 'report_number',
    key: 'report_number',
    width: 100,
  },
  {
    title: 'Отчеты',
    dataIndex: 'reports',
    key: 'reports',
    width: 500,
  },
  {
    title: 'Дата начала',
    dataIndex: 'start_date',
    key: 'start_date',
    width: 150,
  },
  {
    title: 'Дата конца',
    dataIndex: 'end_date',
    key: 'end_date',
    width: 150,
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    width: 50,
  },
]

const customCellRender = (value, record, index, dataIndex, setDeleteId) => {

  const getIdResultIcon = (main_report_status, storage_report_status, foreign_country_report_status) => {
    if (main_report_status === 'Done' && storage_report_status === 'Done' && (foreign_country_report_status === null || foreign_country_report_status === 'Done')) {
      return sucessround;
    }
    if (main_report_status === 'Fail' || storage_report_status === 'Fail' || foreign_country_report_status === 'Fail') {
      return failround;
    }
    return orangeround;
  };

  if (dataIndex === 'report_number') {
    return (
      <div className={styles.id}>
        <span className={styles.idResult}>
          <img
            src={getIdResultIcon(
              record.main_report_status,
              record.storage_report_status,
              record.foreign_country_report_status
            )}
            alt='Status Icon'
          />
        </span>
        <span className={styles.idText}>{value}</span>
      </div>
    )
  }
  if (dataIndex === 'reports') {
    return (
      <div className={styles.reports}>
        <div className={styles.reportRow}>
          <span className={styles.reportResult}>
            {record.main_report_status === 'Done' && (
              <img src={sucesscheck} alt='Sucess' />
            )}
            {record.main_report_status === 'Fail' && (
              <img src={failcheck} alt='Fail' />
            )}
          </span>
          <span className={styles.reportText} title={record.main_report_name}>
            {record.main_report_name}
          </span>
        </div>
        {record.foreign_country_report_name && (
          <div className={styles.reportRow}>
            <span className={styles.reportResult}>
              {record.foreign_country_report_status === 'Done' && (
                <img src={sucesscheck} alt='Sucess' />
              )}
              {record.foreign_country_report_status === 'Fail' && (
                <img src={failcheck} alt='Fail' />
              )}
            </span>
            <span className={styles.reportText} title={record.foreign_country_report_name}>
              {record.foreign_country_report_name}
            </span>
          </div>)}
        <div className={styles.reportRow}>
          <span className={styles.reportResult}>
            {record.storage_report_status === 'Done' && (
              <img src={sucesscheck} alt='Sucess' />
            )}
            {record.storage_report_status === 'Fail' && (
              <img src={failcheck} alt='Fail' />
            )}
            {record.storage_report_status === null && (
              <img src={failgreycheck} alt='Fail' />
            )}
          </span>
          <span className={styles.reportText} title={record.storage_report_name}>
            {record.storage_report_name === null ? (
              <span className={styles.failGrey}>
                Отчет по платному хранению
              </span>
            ) : (
              record.storage_report_name
            )}
          </span>
        </div>
      </div>
    )
  }
  if (dataIndex === 'start_date' || dataIndex === 'end_date') {
    return <div className={styles.customCell}>{moment(value).format('DD.MM.YYYY')}</div>;
  }
  if (dataIndex === 'action') {
    return (
      <div className={styles.action}>
        <button className={styles.deleteButton} onClick={() => setDeleteId(record.report_number)}>
          <img src={trashIcon} alt='Delete' />
        </button>
      </div>
    )
  }
  return <div className={styles.customCell}>{value}</div>;
}

const ReportMain = () => {
  const { isDemoMode } = useDemoMode();
  const { user, authToken } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openBlock, setOpenBlock] = useState(true);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const getListOfReports = async () => {
    try {
      const result = await ServiceFunctions.getListOfReports(authToken);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getListOfReports();
  }, []);

  const handleDelete = async (id) => {
    try {
      await ServiceFunctions.deleteReport(authToken, id);
      await getListOfReports();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setDeleteId();
    }
  };



  const handleOpenClose = () => {
    setOpenBlock(!openBlock);
  };

  const handleClose = () => setShow(false);

  if (user?.subscription_status === 'expired') {
    return <NoSubscriptionPage title={'Финансовые отчеты'} />;
  }


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
          <Header title={'Главная'} titlePrefix={'Отчёт'} hasShadow={false} reportNav={true} />
        </div>

        {isDemoMode &&
          <div className='mb-3'>
            <NoSubscriptionWarningBlock />
          </div>
        }

        {!user?.is_report_downloaded &&
          <div className='mb-3'>
            <DemonstrationSection />
          </div>
        }


        {/* instruction */}
        <div className={styles.instructionWrapper}>
          <div className={styles.instructionTop}>
            <div className={styles.topTextTitle}>
              <img
                src={cursor}
                alt='Cursor'
                style={{ marginRight: '12px' }}
              />
              Инструкция
            </div>
            <div
              className={styles.lineWrapper}
              onClick={() => handleOpenClose()}
            >
              <span
                className={`${styles.line} ${openBlock ? styles.open : styles.closed
                  }`}
              ></span>
            </div>
          </div>
          {openBlock && (
            <div className={styles.instructionColsWrapper}>
              <div className={styles.blockLeft}>
                <div>
                  <div className={styles.blockLeftText}>
                    В этом разделе вы можете загрузить отчёты Wildberries в
                    нашу систему. После обработки данных алгоритм распределит
                    информацию по интуитивно понятным вкладкам, что позволит
                    вам проанализировать следующие показатели вашего бизнеса:
                  </div>
                  <div>
                    <ul className={styles.blockLeftText}>
                      <li>все виды расходов,</li>
                      <li>доходы,</li>
                      <li>оборот,</li>
                      <li>маржинальность.</li>
                    </ul>
                  </div>
                  <div>
                    <span className={styles.blockLeftTextBold}>
                      Кроме того, вы сможете детализировать эти показатели по
                      каждому артикулу, а также учитывать и добавлять внешние
                      расходы.
                    </span>
                  </div>
                </div>
                <div className={styles.blockCover}>
                  <div>
                    <span className={styles.blockCoverText}>
                      Особенностью алгоритма является то, что он не использует
                      данные по API (как это реализовано в других разделах
                      нашего сервиса), а опирается исключительно на информацию
                      из отчётов Wildberries. Это гарантирует максимальную
                      точность расчётов —{' '}
                      <span className={styles.blockCoverTextBold}>
                        вплоть до копейки.
                      </span>
                    </span>
                  </div>
                </div>
                <div className={styles.blockCoverBottom}>
                  <div>
                    <span className={styles.blockCoverText}>
                      С помощью нашего сервиса вы сможете{' '}
                      <span className={styles.blockCoverTextBold}>
                        анализировать данные за каждую неделю,{' '}
                      </span>
                      для которой Wildberries предоставляет отчёты, что делает
                      работу с бизнес-показателями удобной и эффективной.
                    </span>
                  </div>
                </div>
                <div className={styles.blockCoverBottomBoldText}>
                  <span>Удачи в использовании сервиса!</span>
                </div>


                <div className={styles.page__howToLinkWrapper}>
                  <HowToLink
                    text='Подробная текстовая инструкция'
                    target='_blank'
                    url='https://radar.usedocs.com/article/75939'
                  />
                </div>

              </div>
              <div className={styles.blockRight}>
                <div className={styles.blockRightText}>
                  <div className={styles.blockRightTextTop}>
                    Для начала работы:
                  </div>
                  <div style={{ marginBottom: '5px', fontSize: '14px' }}>
                    1. Ознакомьтесь с короткой видеоинструкцией.
                    <br />
                    2. Загрузите в систему два отчёта (важно загружать их в
                    том виде, в котором они были скачаны из личного кабинета
                    Wildberries):
                  </div>
                  <div>
                    <ul>
                      <li
                        className={styles.rightListText}
                        style={{ marginBottom: '5px' }}
                      >
                        <span className={styles.rightListTextBold}>
                          Детализация еженедельного отчёта:{' '}
                        </span>
                        документ в формате ZIP, скачанный из кабинета
                        Wildberries. Файл не нужно изменять, просто загрузите
                        его в исходном виде.
                      </li>
                      <li className={styles.rightListText}>
                        <span className={styles.rightListTextBold}>
                          Отчёт по платному хранению:{' '}
                        </span>
                        документ за тот же период, что и детализация
                        еженедельного отчёта. В личном кабинете селлера вкладка «Аналитика»,
                        далее вкладка «Отчёты», в отчётах выбрать «Платное хранение», далее
                        выбрать «Отчёт по номенклатурам», после выгружаем отчёт в Excel.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.videoWrapper}>
                  <div className={styles.videoContainer}>
                    <iframe
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
                      src='https://play.boomstream.com/ebiWkmCg?title=0&start=1'
                      frameBorder='0'
                      scrolling='no'
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>


        {/* uploader */}
        <div
          className={styles.uploadContainer}
        >
          {/* Это закоменчен новый загрузчик файлов */}
          <div className={styles.uploadWrapper}>
            <FileUploader
              setShow={setShow}
              setError={setError}
              getListOfReports={getListOfReports}
            />
          </div>
        </div>


        {/* table */}
        {data && data.length > 0 &&
          <div className={styles.tableWrapper}>
            <div className={styles.topTextTitle}>
              Загруженные отчеты
            </div>
            <RadarTable
              config={tableConfig}
              preset='radar-table-default'
              dataSource={data}
              customCellRender={{
                idx: [],
                renderer: (value, record, index, dataIndex) => {
                  return customCellRender(value, record, index, dataIndex, setDeleteId);
                }
              }}
              pagination={false}
              paginationContainerStyle={{ display: 'none' }}
              style={{ width: '100%' }}
              headerCellWrapperStyle={{ backgroundColor: 'white' }}
              headerCellStyle={{ backgroundColor: 'white' }}
              bodyCellWrapperClassName={styles.bodyCellWrapperCustomClassName}
            />
          </div>}

        {/* bottom nav v2 */}
        <BottomNavV2 />
      </section>
      {/* ---------------------- */}
      {/* <BottomNavigation /> */}

      {/* delete confirm */}
      {deleteId && <ModalDeleteConfirm
        onCancel={() => setDeleteId()}
        onOk={() => { handleDelete(deleteId); }}
        title='Вы уверены, что хотите удалить отчет?'
      />}

      {/* modals */}
      <Modal
        show={openModal}
        onHide={() => setOpenModal(false)}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <div className='d-flex align-items-center gap-2'>
            <div style={{ width: '100%' }}>
              <div className='d-flex justify-content-between'>
                <span className='cancel-subscription-modal'>
                  Вы уверены, что хотите удалить отчет?
                </span>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <span className='cancel-subscription-modal-text'>
              Ваши данные могут быть удалены
            </span>
            <div className='button-box'>
              <div className='button-stay' onClick={() => setOpenModal(false)}>
                Не удалять
              </div>
              <div
                className='button-cancel'
                onClick={() => {
                  handleDelete(selectedRowId);
                  setOpenModal(false);
                }}
              >
                Удалить
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div>
            <div className='d-flex gap-3 mb-2 mt-2 align-items-center'>
              <img src={warningIcon} alt='' style={{ height: '3vh' }} />
              <p className='fw-bold mb-0'>Ошибка!</p>
            </div>
            <p className='fs-6 mb-1' style={{ fontWeight: 600 }}>
              {error}
            </p>
          </div>
        </Modal.Header>
      </Modal>
    </main>
  )
};

const menuItemsArray = [
  {
    path: '/report-main', title: 'Главная', position: 'main', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2 12V19C2 19.55 2.45 20 3 20H8V13H12V20H17C17.55 20 18 19.55 18 19V12L10 4L2 12ZM19.71 9.29L17 6.59V3C17 2.45 16.55 2 16 2C15.45 2 15 2.45 15 3V4.59L10.71 0.3C10.53 0.11 10.28 0 10 0C9.72 0 9.47 0.11 9.29 0.29L0.29 9.29C0.11 9.47 0 9.72 0 10C0 10.55 0.45 11 1 11C1.28 11 1.53 10.89 1.71 10.71L10 2.41L18.29 10.7C18.47 10.89 18.72 11 19 11C19.55 11 20 10.55 20 10C20 9.72 19.89 9.47 19.71 9.29Z" fill="currentColor" />
      </svg>
    )
  },
  {
    path: '/weeklyreport-dashboard', title: 'Дашборд', position: 'main', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6 5C5.45 5 5 5.45 5 6C5 6.55 5.45 7 6 7C6.55 7 7 6.55 7 6C7 5.45 6.55 5 6 5ZM4 9C3.45 9 3 9.45 3 10C3 10.55 3.45 11 4 11C4.55 11 5 10.55 5 10C5 9.45 4.55 9 4 9ZM10 5C10.55 5 11 4.55 11 4C11 3.45 10.55 3 10 3C9.45 3 9 3.45 9 4C9 4.55 9.45 5 10 5ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18ZM16 9C15.45 9 15 9.45 15 10C15 10.55 15.45 11 16 11C16.55 11 17 10.55 17 10C17 9.45 16.55 9 16 9ZM8 14C8 15.1 8.9 16 10 16C11.1 16 12 15.1 12 14C12 13.67 10 6 10 6C10 6 8 13.67 8 14ZM14 5C13.45 5 13 5.45 13 6C13 6.55 13.45 7 14 7C14.55 7 15 6.55 15 6C15 5.45 14.55 5 14 5Z" fill="currentColor" />
      </svg>

    )
  },
  {
    path: '/weeklyreport-pl', title: 'P&L', position: 'main', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M17 10H10V17H17V10ZM17 3H10V9H17V3ZM9 3H3V17H9V3ZM19 0H1C0.45 0 0 0.45 0 1V19C0 19.55 0.45 20 1 20H19C19.55 20 20 19.55 20 19V1C20 0.45 19.55 0 19 0ZM18 18H2V2H18V18Z" fill="currentColor" />
      </svg>

    )
  },
  {
    path: '/weeklyreport-month', title: 'По месяцам', position: 'main', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M15.5556 4.44444C16.2222 4.44444 16.6667 4 16.6667 3.33333V1.11111C16.6667 0.555556 16.2222 0 15.5556 0C14.8889 0 14.4444 0.555556 14.4444 1.11111V3.33333C14.4444 4 14.8889 4.44444 15.5556 4.44444ZM4.44444 4.44444C5.11111 4.44444 5.55556 4 5.55556 3.33333V1.11111C5.55556 0.555556 5.11111 0 4.44444 0C3.77778 0 3.33333 0.555556 3.33333 1.11111V3.33333C3.33333 4 3.77778 4.44444 4.44444 4.44444ZM18.8889 2.22222H17.7778V3.33333C17.7778 4.55556 16.7778 5.55556 15.5556 5.55556C14.3333 5.55556 13.3333 4.55556 13.3333 3.33333V2.22222H6.66667V3.33333C6.66667 4.55556 5.66667 5.55556 4.44444 5.55556C3.22222 5.55556 2.22222 4.55556 2.22222 3.33333V2.22222H1.11111C0.555556 2.22222 0 2.77778 0 3.33333V18.8889C0 19.4444 0.555556 20 1.11111 20H18.8889C19.4444 20 20 19.4444 20 18.8889V3.33333C20 2.77778 19.4444 2.22222 18.8889 2.22222ZM6.66667 17.7778H2.22222V13.3333H6.66667V17.7778ZM6.66667 12.2222H2.22222V7.77778H6.66667V12.2222ZM12.2222 17.7778H7.77778V13.3333H12.2222V17.7778ZM12.2222 12.2222H7.77778V7.77778H12.2222V12.2222ZM17.7778 17.7778H13.3333V13.3333H17.7778V17.7778ZM17.7778 12.2222H13.3333V7.77778H17.7778V12.2222Z" fill="currentColor" />
      </svg>

    )
  },
  {
    path: '/weeklyreport-goods', title: 'По товарам', position: 'main', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 13C19.6 13 20 13.4 20 14C20 14.4 19.8 14.7004 19.5 14.9004L10.5 19.9004C10.3001 20.0003 10.1999 20 10 20C9.80005 20 9.6999 20.0003 9.5 19.9004L0.5 14.9004C0.2 14.7004 0 14.4 0 14C0 13.4 0.4 13 1 13C1.2 13 1.3 13.0002 1.5 13.2002L10 17.9004L18.5 13.0996C18.6999 12.9997 18.8001 13 19 13ZM19 9C19.6 9 20 9.4 20 10C20 10.4 19.8 10.7004 19.5 10.9004L10.5 15.9004C10.3001 16.0003 10.1999 16 10 16C9.80005 16 9.6999 16.0003 9.5 15.9004L0.5 10.9004C0.2 10.7004 0 10.4 0 10C0 9.4 0.4 9 1 9C1.19995 9 1.3001 8.99969 1.5 9.09961L10 13.9004L18.5 9.09961C18.6999 8.99969 18.8001 9 19 9ZM10 1.20776e-08C10.1999 1.20776e-08 10.3001 -0.000312514 10.5 0.0996094L19.5 5.09961C19.8 5.29961 20 5.6 20 6C20 6.4 19.8 6.70039 19.5 6.90039L10.5 11.9004C10.3001 12.0003 10.1999 12 10 12C9.80005 12 9.6999 12.0003 9.5 11.9004L0.5 6.90039C0.2 6.70039 0 6.4 0 6C0 5.6 0.2 5.29961 0.5 5.09961L9.5 0.0996094C9.6999 -0.000312514 9.80005 1.20776e-08 10 1.20776e-08Z" fill="currentColor" />
      </svg>

    )
  },
  {
    path: '/abc-data-reports', title: 'ABC-анализ', position: 'secondary', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M1.33333 0C0.596954 0 0 0.596954 0 1.33333V4C0 4.73638 0.596954 5.33333 1.33333 5.33333L4.13352 5.33415C4.5518 7.39343 5.91931 9.10795 7.75941 10.001C5.91891 10.8926 4.55121 12.6074 4.13325 14.6672L1.33333 14.6667C0.596954 14.6667 0 15.2636 0 16V18.6667C0 19.403 0.596954 20 1.33333 20H8C8.73638 20 9.33333 19.403 9.33333 18.6667V16C9.33333 15.2636 8.73638 14.6667 8 14.6667L5.50122 14.6672C6.07184 12.4492 8.03329 10.7895 10.4005 10.6732L10.6667 10.6667V12C10.6667 12.7364 11.2636 13.3333 12 13.3333H18.6667C19.403 13.3333 20 12.7364 20 12V8C20 7.26362 19.403 6.66667 18.6667 6.66667H12C11.2636 6.66667 10.6667 7.26362 10.6667 8V9.33333C8.18191 9.33333 6.09403 7.63414 5.50162 5.33435L8 5.33333C8.73638 5.33333 9.33333 4.73638 9.33333 4V1.33333C9.33333 0.596954 8.73638 0 8 0H1.33333Z" fill="currentColor" />
      </svg>

    )
  },
  {
    path: '/weeklyreport-penalties', title: 'Штрафы', position: 'secondary', icon: (
      <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.75 0H1.25C0.5625 0 0 0.5625 0 1.25V18.75C0 19.4375 0.5625 20 1.25 20H13.75C14.4375 20 15 19.4375 15 18.75V1.25C15 0.5625 14.4375 0 13.75 0ZM5.00001 17.5H2.50001V15H5.00001V17.5ZM5.00001 13.75H2.50001V11.25H5.00001V13.75ZM5.00001 10H2.50001V7.5H5.00001V10ZM8.75001 17.5H6.25001V15H8.75001V17.5ZM8.75001 13.75H6.25001V11.25H8.75001V13.75ZM8.75001 10H6.25001V7.5H8.75001V10ZM12.5 17.5H10V11.25H12.5V17.5ZM12.5 10H10V7.5H12.5V10ZM12.5 6.25H2.50001V2.5H12.5V6.25Z" fill="currentColor" />
      </svg>

    )
  },
  {
    path: '/schedule', title: 'Графики', position: 'secondary', icon: (
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.25 8.75C5.5625 8.75 5 9.3125 5 10V18.75C5 19.4375 5.5625 20 6.25 20C6.9375 20 7.5 19.4375 7.5 18.75V10C7.5 9.3125 6.9375 8.75 6.25 8.75ZM1.25 11.25C0.5625 11.25 0 11.8125 0 12.5V18.75C0 19.4375 0.5625 20 1.25 20C1.9375 20 2.5 19.4375 2.5 18.75V12.5C2.5 11.8125 1.9375 11.25 1.25 11.25ZM11.25 5C10.5625 5 10 5.5625 10 6.25V18.75C10 19.4375 10.5625 20 11.25 20C11.9375 20 12.5 19.4375 12.5 18.75V6.25C12.5 5.5625 11.9375 5 11.25 5ZM16.25 0C15.5625 0 15 0.5625 15 1.25V18.75C15 19.4375 15.5625 20 16.25 20C16.9375 20 17.5 19.4375 17.5 18.75V1.25C17.5 0.5625 16.9375 0 16.25 0Z" fill="currentColor" />
      </svg>

    )
  },
  {
    path: '/prime-cost', title: 'Себестоимость', position: 'secondary', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.95996 12H18.5205C17.8672 16.52 14 20 9.30664 20C4.17354 19.9999 0.000175717 15.8268 0 10.667C0 5.97378 3.46679 2.10724 7.95996 1.44043V12ZM9.29395 0C15.1871 0.000196198 19.96 4.77378 19.96 10.667H9.29395V0Z" fill="currentColor" />
      </svg>

    )
  },
  {
    path: '/buy-back', title: 'Самовыкупы', position: 'secondary', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M14.825 8.75H19.8875C19.3125 4.2375 15.7625 0.65 11.25 0.0875003V5.175C13 5.625 14.3625 7 14.825 8.75ZM15 10C15 12.7625 12.7625 15 10 15C7.2375 15 5 12.7625 5 10C5 7.2375 7.2375 5 10 5V0C4.475 0 0 4.475 0 10C0 15.525 4.475 20 10 20C15.525 20 20 15.525 20 10H15Z" fill="currentColor" />
      </svg>

    )
  },
  {
    path: '/external-expenses', title: 'Внешние расходы', position: 'secondary', icon: (
      <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5 8.57143H15C15.4 8.57143 15.7143 8.25714 15.7143 7.85714C15.7143 7.45714 15.4 7.14286 15 7.14286H5C4.6 7.14286 4.28571 7.45714 4.28571 7.85714C4.28571 8.25714 4.6 8.57143 5 8.57143ZM21.4286 0H1.42857C0.642857 0 0 0.642857 0 1.42857V18.5714C0 19.3571 0.642857 20 1.42857 20H21.4286C22.2143 20 22.8571 19.3571 22.8571 18.5714V1.42857C22.8571 0.642857 22.2143 0 21.4286 0ZM20 17.1429H2.85714V5.71429H20V17.1429ZM5 11.4286H10.7143C11.1143 11.4286 11.4286 11.1143 11.4286 10.7143C11.4286 10.3143 11.1143 10 10.7143 10H5C4.6 10 4.28571 10.3143 4.28571 10.7143C4.28571 11.1143 4.6 11.4286 5 11.4286ZM5 14.2857H12.1429C12.5429 14.2857 12.8571 13.9714 12.8571 13.5714C12.8571 13.1714 12.5429 12.8571 12.1429 12.8571H5C4.6 12.8571 4.28571 13.1714 4.28571 13.5714C4.28571 13.9714 4.6 14.2857 5 14.2857Z" fill="currentColor" />
      </svg>

    )
  },
];


const BottomNavV2 = ({ type }) => {
  const { pathname } = useLocation();
  return (
    <div className={type === 'header' ? styles.bottomNavV2_header : styles.bottomNavV2}>
      {menuItemsArray?.map((i, id) =>
        <Link
          to={i.path}
          key={id}
          className={i.path === pathname ? styles.navItemActive : styles.navItem}
          title={i.title}
        >
          {i.icon}
        </Link>
      )}
    </div>
  )
}

export default ReportMain;
