import { useRef, useState, useContext, useEffect } from 'react';
import { URL } from '@/service/config';
import AuthContext from '@/service/AuthContext';
import { formatFullDate } from '@/service/utils';
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
import { ServiceFunctions } from '@/service/serviceFunctions';
import BottomNavigation from '@/components/BottomNavigation';
import Modal from 'react-bootstrap/Modal';
import warningIcon from '@/assets/warning.png';
import NoSubscriptionPage from './NoSubscriptionPage';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import FileUploader from '@/components/sharedComponents/fileUploader/fileUploader';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import HowToLink from '@/components/sharedComponents/howToLink/howToLink';
import ModalDeleteConfirm from "@/components/sharedComponents/ModalDeleteConfirm";
import Header from '@/components/sharedComponents/header/header';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { Tooltip } from "antd";
import { useDemoMode } from "@/app/providers";
import DemonstrationSection from '@/components/DemonstrationSection';
import { useLocation, Link } from 'react-router-dom';
import { Table as RadarTable } from 'radar-ui';
import moment from 'moment';
import { RadarLoader } from '@/shared';

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
  const [isLoading, setIsLoading] = useState(false);
  const getListOfReports = async () => {
    try {
      setIsLoading(true);
      const result = await ServiceFunctions.getListOfReports(authToken);
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
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
          <Header title={'Главная'} titlePrefix={'Отчёт'} hasShadow={false} />
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
          <div className={styles.uploadWrapper}>
            <FileUploader
              setShow={setShow}
              setError={setError}
              getListOfReports={getListOfReports}
            />
          </div>
        </div>

        {isLoading &&
          <div className={styles.tableWrapper}>
            <RadarLoader loaderStyle={{ height: '50vh', backgroundColor: 'white' }} />
          </div>}


        {/* table */}
        {data && data.length > 0 && !isLoading &&
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

        <BottomNavigation />
      </section>
      {/* ---------------------- */}
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

export default ReportMain;
