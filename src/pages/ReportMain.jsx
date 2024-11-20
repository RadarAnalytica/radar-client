import { useRef, useState, useContext } from 'react';
import { URL } from '../service/config';
import AuthContext from '../service/AuthContext';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import cursor from './images/cursor.svg';
import upload from './images/upload.svg';
import sucessround from './images/sucessround.svg';
import sucesscheck from './images/sucesscheck.svg';
import trashalt from './images/trash-alt.svg';
import styles from './ReportMain.module.css';

const ReportMain = () => {
  const { authToken } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  console.log('selectedRows', selectedRows);

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDeleteSelected = () => {
    // Add delete logic here
    setSelectedRows([]);
  };

  const data = [
    {
      id: 1,
      idUpload: '123456789',
      reports: [
        {
          dilivery: 'success',
          doc: 'Детализация еженедельного отчета',
        },
        {
          dilivery: 'success',
          doc: 'Отчет по платному хранению',
        },
      ],
      startDate: '01.10.2024',
      endDate: '10.10.2024',
    },
    {
      id: 2,
      idUpload: '1234565677687',
      reports: [
        {
          dilivery: 'success',
          doc: 'Детализация еженедельного отчета',
        },
        {
          dilivery: 'success',
          doc: 'Отчет по платному хранению',
        },
      ],
      startDate: '05.10.2024',
      endDate: '15.10.2024',
    },
  ];

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
        const data = await response.json();
        // Handle successful upload
        console.log('Upload successful:', data);
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

  const uploadFile = () => {
    // Add upload logic here
    handleFileUpload(selectedFile);
    setSelectedFile(null);
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
              <div>-</div>
            </div>
            <div className={styles.instructionColsWrapper}>
              <div className={styles.blockLeft}>
                <div>
                  <div className={styles.blockLeftText}>
                    В этом разделе вы можете загрузить отчёты Wildberries в нашу
                    систему. После обработки данных алгоритм распределит
                    информацию по интуитивно понятным вкладкам, что позволит вам
                    проанализировать следующие показатели вашего бизнеса:
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
                      </span>{' '}
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
                    2. Загрузите в систему два отчёта (важно загружать их в том
                    виде, в котором они были скачаны из личного кабинета
                    Wildberries):
                  </div>
                  <div>
                    <ul>
                      <li className={styles.rightListText}>
                        <span className={styles.rightListTextBold}>
                          Детализация еженедельного отчёта:
                        </span>{' '}
                        документ в формате ZIP, скачанный из кабинета
                        Wildberries. Файл не нужно изменять, просто загрузите
                        его в исходном виде.
                      </li>
                      <li className={styles.rightListText}>
                        <span className={styles.rightListTextBold}>
                          Отчёт по платному хранению:
                        </span>{' '}
                        документ за тот же период, что и детализация
                        еженедельного отчёта.
                      </li>
                    </ul>
                  </div>
                </div>
                <div style={{ height: '300px', background: 'grey' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className='container dash-container'>
          <div
            className={styles.uploadContainer}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={styles.uploadWrapper}>
              <div className={styles.uploadTitle}>Загрузить отчеты</div>
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
                        <button className={styles.deleteButton}>Удалить</button>
                        <button
                          className={styles.uploadButton}
                          onClick={uploadFile}
                        >
                          Загрузить
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      Перетащи мышкой файл или
                      <span
                        className={styles.uploadTextBlue}
                        onClick={() => fileInputRef.current.click()}
                        style={{ cursor: 'pointer' }}
                      >
                        загрузи с компьютера
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
              {selectedRows.length > 0 && (
                <div className={styles.deleteSection}>
                  <span className={styles.deleteSectionText}>
                    Выбрано: {selectedRows.length}
                  </span>
                  <button
                    className={styles.deleteButton}
                    onClick={handleDeleteSelected}
                  >
                    <img src={trashalt} alt='Delete' />
                    Удалить
                  </button>
                </div>
              )}
              <div></div>
            </div>
            <div className={styles.uploadTable}>
              <div className={styles.uploadTableHeader}>
                <div className={styles.id}>ID загрузки</div>
                <div className={styles.reports}>Отчеты</div>
                <div className={styles.startDateHead}>Дата начала</div>
                <div className={styles.endDateHead}>Дата конца</div>
              </div>
              {/* Add the data rows */}
              {data.map((row) => (
                <div key={row.id} className={styles.uploadTableRow}>
                  <div className={styles.id}>
                    <div className={styles.checkbox}>
                      <input
                        type='checkbox'
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleCheckboxChange(row.id)}
                        style={{
                          width: '30px',
                          height: '30px',
                          marginRight: '8px',
                        }}
                      />
                    </div>
                    <span className={styles.idResult}>
                      <img src={sucessround} alt='Sucess' />
                    </span>
                    <span className={styles.idText}>{row.idUpload}</span>
                  </div>
                  <div className={styles.reports}>
                    {row.reports.map((report, index) => (
                      <div key={index} className={styles.reportRow}>
                        <span className={styles.reportResult}>
                          {report.dilivery === 'success' && (
                            <img src={sucesscheck} alt='Sucess' />
                          )}
                        </span>
                        <span className={styles.reportText}>{report.doc}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.startDate}>{row.startDate}</div>
                  <div className={styles.endDate}>{row.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportMain;
