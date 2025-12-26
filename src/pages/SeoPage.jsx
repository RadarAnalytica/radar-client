import { useState, useContext, useEffect } from 'react';
import styles from './SeoPage.module.css';
import InfoSeoPlate from '../components/InfoSeoPlate';
import SeoCompaire from '../components/SeoCompaire';
import NoSubscriptionPage from './NoSubscriptionPage';
import AuthContext from '../service/AuthContext';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Header from '../components/sharedComponents/header/header';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from "@/app/providers";
import Modal from 'react-bootstrap/Modal';
import { ServiceFunctions } from '@/service/serviceFunctions';
import warningIcon from '../assets/warning.png';

const SeoPage = () => {
  const { authToken, user } = useContext(AuthContext);
  const [groupAInput, setGroupAInput] = useState('');
  const [groupBInput, setGroupBInput] = useState('');
  const [showModalError, setShowModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (user?.subscription_status === 'expired') {
    return <NoSubscriptionPage title={'Сравнение SEO'} />;
  }

  const [compaireData, setCompaireData] = useState({});
  const [linksToSend, setLinksToSend] = useState({});
  const { isDemoMode } = useDemoMode();

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

    if (productA === '' || productB === '') {
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
    setLinksToSend(dataToSend);
  };

  useEffect(() => {
    if (isDemoMode) {
      const groupA = [
        'https://www.wildberries.ru/catalog/81644046',
        'https://www.wildberries.ru/catalog/128033464',
        'https://www.wildberries.ru/catalog/176341521',
        'https://www.wildberries.ru/catalog/60436862',
        'https://www.wildberries.ru/catalog/160006001',
      ];
      const groupB = [
        'https://www.wildberries.ru/catalog/171403718',
        'https://www.wildberries.ru/catalog/212788036',
        'https://www.wildberries.ru/catalog/167539844',
        'https://www.wildberries.ru/catalog/250825960',
        'https://www.wildberries.ru/catalog/169578418',
      ];
      setGroupAInput(groupA.join('\n'));
      setGroupBInput(groupB.join('\n'));
    }
  }, [isDemoMode]);

  return (
    <main className={styles.page}>
      <Helmet>
        <link rel="canonical" href="https://radar-analytica.ru/signup" />
      </Helmet>
      <MobilePlug />
      {/* ------ SIDE BAR ------ */}
      <section className={styles.page__sideNavWrapper}>
        <Sidebar />
      </section>
      {/* ------ CONTENT ------ */}
      <section className={styles.page__content}>
        {/* header */}
        <div className={styles.page__headerWrapper}>
          <Header title={'Сравнение SEO'} hasShadow={false}>
            {Object.keys(compaireData).length > 0 && (
              <div
                className={styles.newTopNavButton}
                onClick={() => setCompaireData({})}
              >
                <span>Новый запрос</span>
              </div>
            )}
          </Header>
        </div>
        {isDemoMode && <NoSubscriptionWarningBlock className="mb-3" />}
        {/* !header */}
        <div className={styles.page__container}>
          {Object.keys(compaireData).length <= 0 && (
            <>
              <InfoSeoPlate
                setCompaireData={setCompaireData}
                setLinksToSend={setLinksToSend}
              />
              <div className={styles.page__mainContent}>
                <div className={styles.infoSeoGroupWrapper}>
                  <span className={styles.infoSeoGroupTitle}>
                    Добавление группы товаров
                  </span>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.groupBox}>
                      <div className={styles.groupBoxTitle}>Группа А</div>
                      <textarea
                        placeholder='Введите до 50 ссылок на товары. Каждую ссылку с новой строки. Пример:
https://www.wildberries.ru/catalog/177307535
https://www.wildberries.ru/catalog/177307899'
                        rows={6}
                        className={styles.groupTextarea}
                        value={groupAInput}
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
                        value={groupBInput}
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
              </div>
            </>
          )}
          {Object.keys(compaireData).length > 0 && (
            <SeoCompaire
              compaireData={compaireData}
              linksToSend={linksToSend}
            />
          )}
        </div>
      </section>
      {/* ---------------------- */}
      <Modal show={showModalError} onHide={handleCloseModalError}>
            <Modal.Header closeButton style={{ border: 'none' }}>
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
    </main>
  );
};

export default SeoPage;
