import { useRef, useState, useContext, useEffect } from 'react';
import { URL } from '../service/config';
import AuthContext from '../service/AuthContext';
import { formatFullDate } from '../service/utils';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
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

const ReportMain = () => {
  const { authToken } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openBlock, setOpenBlock] = useState(true);

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

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${URL}/api/report/upload`, {
        method: 'POST',
        headers: {
          authorization: 'JWT ' + authToken,
        },
        body: formData,
      });

      if (response.ok) {
        await getListOfReports();
        const data = await response.json();
        // Handle successful upload
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFile(files[0]);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFile(files[0]);
  };

  const uploadFile = (e) => {
    // Add upload logic here
    e.stopPropagation();
    handleFileUpload(selectedFile);
    setSelectedFile(null);
  };

  const deleteFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  const handleDelete = async (id) => {
    try {
      await ServiceFunctions.deleteReport(authToken, id);
      await getListOfReports();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getIdResultIcon = (main_report_status, storage_report_status) => {
    if (main_report_status === 'Done' && storage_report_status === 'Done') {
      return sucessround;
    }
    if (main_report_status === 'Done' && storage_report_status === null) {
      return orangeround;
    }
    if (main_report_status === 'Fail' || storage_report_status === 'Fail') {
      return failround;
    }
    if (main_report_status === null || storage_report_status === 'Done') {
      return orangeround;
    }
  };

  const handleOpenClose = () => {
    setOpenBlock(!openBlock);
  };

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'Главная'} subTitle={'Отчёт /'} />
        <div className='container dash-container'>
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
                          анализировать данные за каждую неделю,
                        </span>
                        для которой Wildberries предоставляет отчёты, что делает
                        работу с бизнес-показателями удобной и эффективной.
                      </span>
                    </div>
                  </div>
                  <div className={styles.blockCoverBottomBoldText}>
                    <span>Удачи в использовании сервиса!</span>
                  </div>
                </div>
                <div className={styles.blockRight}>
                  <div className={styles.blockRightText}>
                    <div className={styles.blockRightTextTop}>
                      Для начала работы:
                    </div>
                    <div>
                      1. Ознакомьтесь с короткой видеоинструкцией.
                      <br />
                      2. Загрузите в систему два отчёта (важно загружать их в
                      том виде, в котором они были скачаны из личного кабинета
                      Wildberries):
                    </div>
                    <div>
                      <ul>
                        <li className={styles.rightListText}>
                          <span className={styles.rightListTextBold}>
                            Детализация еженедельного отчёта:
                          </span>
                          документ в формате ZIP, скачанный из кабинета
                          Wildberries. Файл не нужно изменять, просто загрузите
                          его в исходном виде.
                        </li>
                        <li className={styles.rightListText}>
                          <span className={styles.rightListTextBold}>
                            Отчёт по платному хранению:
                          </span>
                          документ за тот же период, что и детализация
                          еженедельного отчёта.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div style={{ height: '300px', background: 'grey' }}>
                    <iframe width="430" height="300" src="https://play.boomstream.com/P2UCApCi" frameborder="0" scrolling="no" allowfullscreen="" ></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='container dash-container'>
          <div
            className={styles.uploadContainer}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div
              className={styles.uploadWrapper}
              onClick={() => fileInputRef.current.click()}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.uploadTitle}>Загрузите отчеты</div>
              {!selectedFile && (
                <div className={styles.uploadIcon}>
                  <img src={upload} alt='upload' />
                </div>
              )}
              <div className={styles.uploadTextWrapper}>
                <div className={styles.uploadText}>
                  {selectedFile ? (
                    <>
                      <span>{selectedFile.name}</span>
                      <div className={styles.uploadButtonWrapper}>
                        <button
                          className={styles.deleteButton}
                          onClick={(e) => deleteFile(e)}
                        >
                          Удалить
                        </button>
                        <button
                          className={styles.uploadButton}
                          onClick={(e) => uploadFile(e)}
                        >
                          Загрузить
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      Перетащите мышкой файл или
                      <span className={styles.uploadTextBlue}>
                        загрузите с компьютера
                      </span>
                    </>
                  )}
                </div>
              </div>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                multiple
              />
            </div>
          </div>
        </div>
        <div className='container dash-container'>
          <div className={styles.uploadTableContainer}>
            <div>
              <div className={styles.tableTitle}>Загруженные отчеты</div>
            </div>
            <div className={styles.uploadTable}>
              <div className={styles.uploadTableHeader}>
                <div className={styles.id}>ID загрузки</div>
                <div className={styles.reports}>Отчеты</div>
                <div className={styles.startDateHead}>Дата начала</div>
                <div className={styles.endDateHead}>Дата конца</div>
                <div className={styles.emptyTitleHead}></div>
              </div>
              {/* Add the data rows */}
              {data.map((row) => (
                <div key={row.id} className={styles.uploadTableRow}>
                  <div className={styles.id}>
                    <span className={styles.idResult}>
                      <img
                        src={getIdResultIcon(
                          row.main_report_status,
                          row.storage_report_status
                        )}
                        alt='Status Icon'
                      />
                    </span>
                    <span className={styles.idText}>{row.report_number}</span>
                  </div>
                  <div className={styles.reports}>
                    <div className={styles.reportRow}>
                      <span className={styles.reportResult}>
                        {row.main_report_status === 'Done' && (
                          <img src={sucesscheck} alt='Sucess' />
                        )}
                        {row.main_report_status === 'Fail' && (
                          <img src={failcheck} alt='Fail' />
                        )}
                      </span>
                      <span className={styles.reportText}>
                        {row.main_report_name}
                      </span>
                    </div>
                    <div className={styles.reportRow}>
                      <span className={styles.reportResult}>
                        {row.storage_report_status === 'Done' && (
                          <img src={sucesscheck} alt='Sucess' />
                        )}
                        {row.storage_report_status === 'Fail' && (
                          <img src={failcheck} alt='Fail' />
                        )}
                        {row.storage_report_status === null && (
                          <img src={failgreycheck} alt='Fail' />
                        )}
                      </span>
                      <span className={styles.reportText}>
                        {row.storage_report_name === null ? (
                          <span className={styles.failGrey}>
                            Отчет по платному хранению
                          </span>
                        ) : (
                          row.storage_report_name
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={styles.startDate}>
                    {formatFullDate(row.start_date)}
                  </div>
                  <div className={styles.endDate}>
                    {formatFullDate(row.end_date)}
                  </div>
                  <div className={styles.emptyTitle}>
                    <img
                      src={trashIcon}
                      alt='Delete icon'
                      onClick={() => {
                        setSelectedRowId(row.report_number);
                        setOpenModal(true);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
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
    </div>
  );
};

export default ReportMain;
