import { useState, useContext } from 'react';
import styles from './InfoSeoPlate.module.css';
import cursor from '../assets/cursor.svg';
import mash from '../assets/mash.svg';
import fairystick from '../assets/fairystick.svg';
import linkchain from '../assets/linkchain.svg';
import AuthContext from '../service/AuthContext';
import { ServiceFunctions } from '../service/serviceFunctions';
import Modal from 'react-bootstrap/Modal';
import warningIcon from '../assets/warning.png';

const InfoSeoPlate = ({ setCompaireData }) => {
  const { authToken } = useContext(AuthContext);
  const [groupAInput, setGroupAInput] = useState('');
  const [groupBInput, setGroupBInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleShowModalError = () => setShowModalError(true);
  const handleCloseModalError = () => setShowModalError(false);

  const processGroupInput = (input) => {
    return input.split('\n').filter((item) => item.trim() !== '');
  };

  const getSeoCompaireData = async (dataToSend) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await ServiceFunctions.postSeoLinks(authToken, dataToSend);

      //Check if data is not empty
      if (!data || data.length === 0) {
        setErrorMessage('Не правильная ссылка.');
        handleShowModalError();
      }

      const result = data;

      setCompaireData(result);
      setIsLoading(false);
    } catch (e) {
      if (e.response) {
        setErrorMessage(`Ошибка сервера.`);
      } else if (e.request) {
        setErrorMessage('Ошибка сети: сервер не отвечает.');
      } else {
        console.log(e.errorMessage);
        setErrorMessage(`Ошибка: не удалось найти данный товар.`);
      }
      console.error(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedGroupA = processGroupInput(groupAInput);
    const processedGroupB = processGroupInput(groupBInput);

    // Join array elements into a single string, separated by newlines
    const productA = processedGroupA.join('\n');
    const productB = processedGroupB.join('\n');

    if (productA === '' && productB === '') {
      setErrorMessage('Введите ссылки на товары.');
      handleShowModalError();
      return;
    }

    // Prepare data for backend
    const dataToSend = {
      product_a: productA,
      product_b: productB,
    };

    // Send data to backend
    getSeoCompaireData(dataToSend);
  };

  return (
    <>
      {!isLoading && (
        <>
          <div className={styles.infoSeoPlateBox}>
            <div className={styles.infoTitle}>
              <img src={cursor} alt='Cursor' />
              <span>Чем поможет этот инструмент</span>
            </div>
            <div className={styles.infoBody}>
              <div className={styles.infoBodyText}>
                <span>
                  Найдем все запросы, в которых товары их двух групп
                  показывались последние 30 дней. Покажем, какие из запросов
                  пересекаются, а какие уникальны для группы. Что можно делать с
                  помощью этого инструмента:
                </span>
              </div>
              <div className={styles.infoBodyBox}>
                <div className={styles.infoBodyBoxItem}>
                  <img src={mash} alt='Mash' />
                  <span>Сравнить свои поисковые запросы с конкурентами</span>
                </div>
                <div className={styles.infoBodyBoxItem}>
                  <img src={fairystick} alt='Fairystick' />
                  <span>
                    Подобрать уникальные запросы для карточки и продвижения
                  </span>
                </div>
                <div className={styles.infoBodyBoxItem}>
                  <img src={linkchain} alt='Linkchain' />
                  <span>
                    Определить недостающие ключевые слова в своих карточках
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.infoSeoGroupWrapper}>
            <span className={styles.infoSeoGroupTitle}>
              Добавление группы товаров
            </span>
            <form onSubmit={handleSubmit}>
              <div className={styles.groupBox}>
                <div className={styles.groupBoxTitle}>Группа А</div>
                <textarea
                  placeholder='Введите до 50 ссылок на товары. Каждую ссылку с новой строки. Пример:
https://www.wildberries.ru/catalog/177307535
https://www.wildberries.ru/catalog/177307899'
                  rows={6}
                  className={styles.groupTextarea}
                  onChange={(e) => setGroupAInput(e.target.value)}
                />
              </div>
              <div className={styles.groupBox}>
                <div className={styles.groupBoxTitle}>Группа B</div>
                <textarea
                  placeholder='Введите до 50 ссылок на товары. Каждую ссылку с новой строки. Пример:
https://www.wildberries.ru/catalog/177307535
https://www.wildberries.ru/catalog/177307899'
                  rows={6}
                  className={styles.groupTextarea}
                  onChange={(e) => setGroupBInput(e.target.value)}
                />
              </div>

              <div>
                <button type='submit' className={styles.getReportBtn}>
                  Получить отчет
                </button>
              </div>
            </form>
          </div>
          <Modal show={showModalError} onHide={handleCloseModalError}>
            <Modal.Header closeButton>
              <div>
                <div className='d-flex gap-3 mb-2 mt-2 align-items-center'>
                  <img src={warningIcon} alt='' style={{ height: '3vh' }} />
                  <p className='fw-bold mb-0'>Ошибка!</p>
                </div>
                <p className='fs-6 mb-1' style={{ fontWeight: 600 }}>
                  {errorMessage}
                </p>
              </div>
            </Modal.Header>
          </Modal>
        </>
      )}
      {isLoading && (
        <div
          style={{
            minHeight: '85vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className='loader'></div>
        </div>
      )}
    </>
  );
};

export default InfoSeoPlate;
