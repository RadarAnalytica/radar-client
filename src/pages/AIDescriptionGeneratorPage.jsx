import { useState, useContext, useEffect } from 'react';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import styles from './AIDescriptionGenerator.module.css';
import magicWand from './images/magic-wand-2.svg';
import close from './images/AiMinusIcon.svg';
import open from './images/AiPlusIcon.svg';
import closebtn from '../assets/closebtn.png';
import closeBtnModal from './images/closeBtnModal.svg';
import { ServiceFunctions } from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';
import warningIcon from '../assets/warning.png';
import Modal from 'react-bootstrap/Modal';
import AiDescriptionGeneratorTariffs from '../components/AiDescriptionGeneratorTariffs';
import { redirect } from 'react-router-dom';
import { ProductContext } from '../service/ProductContext';
import AddKeyImg from './images/addkeyword.svg';
import {
  saveFileClickHandler,
} from '../service/fileService';
import DragDropFile from '../components/DragAndDropFiles';
import NoSubscriptionPage from './NoSubscriptionPage';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';
import ErrorModal from '../components/sharedComponents/modals/errorModal/errorModal';
import { Input, Form, Button, ConfigProvider } from 'antd';

const AiDescriptionGeneratorPage = () => {
  const {
    productName,
    setProductName,
    shortDescription,
    setShortDescription,
    keywords,
    addKeyword,
    addKeywords,
    removeKeyword,
    inputValue,
    setInputValue,
    competitorsLinks,
    setCompetitorsLinks,
    removeAllKeywords,
  } = useContext(ProductContext);


  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  //const [keywords, setKeywords] = useState([]);
  //const [inputValue, setInputValue] = useState('');
  const [nextStep, setNextStep] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [productName, setProductName] = useState('')
  //const [shortDescription, setShortDescription] = useState('')
  //const [competitorsLinks, setCompetitorsLinks] = useState('')
  const { user, authToken } = useContext(AuthContext);
  const [description, setDescription] = useState();
  const [showModalError, setShowModalError] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isModalOpenNewGen, setIsModalOpenNewGen] = useState(false);
  const [amountGenerations, setAmountGenerations] = useState('');
  const [idGenerator, setIdGenerator] = useState(null);
  const [modalIsShowKeywordsFile, setModalisShowKeywordsFile] = useState(false);
  const [file, setFile] = useState();
  const [isFileUpload, setIsFileUpload] = useState();
  const [form] = Form.useForm()


  const handleNewGenerator = () => {
    setIsModalOpenNewGen(true);
  };

  const getGenerationsAmount = async () => {
    // setLoading(true);
    try {
      const data = await ServiceFunctions.getUserGenerationsAmount(authToken);
      if (data.toString()) {
        setAmountGenerations(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    getGenerationsAmount(); // Call the function when the component is mounted
  }, [isModalOpenNewGen]);

  const handleShowModalError = () => setShowModalError(true);
  const handleCloseModalError = () => setShowModalError(false);


  // -------------------first step request----------------------------//
  const updateAiDescriptionGeneratorKeyword = async (
    token,
    competitorsLinks
  ) => {
    setIsLoading(true);
    setIsLoadingNext(true);
    setIsButtonVisible(false);
    setErrorMessage('');
    try {
      let res = await ServiceFunctions.postAiDescriptionGeneratorKeywords(
        token,
        competitorsLinks
      );

      if (!res.ok) {
        setErrorMessage('Что-то пошло не так! Попробуйте еще раз');
        handleShowModalError();
        return
      }

      res = await res.json()
      // Проверка на отсутствие данных
      if (!res || res.length === 0) {
        setErrorMessage('Не правильная ссылка или артикул.');
        handleShowModalError();
        return
      }

      const result = res;

      // Check if data is not empty
      if (result.length > 0) {
        addKeyword(result);
        setInputValue('');
        setNextStep(true);
      } else {
        setErrorMessage('Не правильная ссылка или артикул.');
        handleShowModalError();
      }
    } catch (e) {
      console.error('Ошибка сервера:', e)
      if (e.response) {
        setErrorMessage(`Ошибка сервера.`);
      } else if (e.request) {
        setErrorMessage('Ошибка сети: сервер не отвечает.');
      } else {
        setErrorMessage(`Ошибка: не удалось найти данный товар.`);
      }
      handleShowModalError();
    } finally {
      setIsLoading(false);
      setIsLoadingNext(false);
      setIsButtonVisible(true);
    }
  };
  // ----------------------------------------------------------------//

  const updateAiDescriptionGenerator = async (
    token,
    productName,
    shortDescription,
    keywords
  ) => {
    setErrorMessage('');
    try {
      setIsLoading(true);
      setIsModalOpen(true);

      const savedId = localStorage.getItem('generatedId');
      if (!savedId || savedId === null) {
        let res = await ServiceFunctions.postAiDescriptionGenerator(
          token,
          productName,
          shortDescription,
          keywords
        );
        console.log('id', res)

        if (!res.ok) {
          setErrorMessage('Что-то пошло не так!');
          handleShowModalError();
          return
        }

        // Проверка на отсутствие данных
        if (!res || res.length === 0) {
          setErrorMessage('Не правильная ссылка или артикул.');
          handleShowModalError();
          return
        }

        res = await res.json()
        if (res && Number.isInteger(res)) {
          localStorage.setItem('generatedId', res);
        }

      } else {
        console.log('ID exists:', savedId);
      }
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
    } finally {
    }
  };

  const fetchUserGenerationsData = async (token, setDescription) => {
    const savedId = localStorage.getItem('generatedId');

    if (!savedId || savedId === null) {
      console.error('No ID found in local storage.');
      setIsLoading(false);
      setErrorMessage('Что-то пошло не так!');
      handleShowModalError();
      return;
    }

    setIsLoading(true); // Start loading state

    const intervalId = setInterval(async () => {

      if (!savedId || savedId === null) {
        console.error('No ID found in local storage.');
        setIsLoading(false);
        setErrorMessage('Что-то пошло не так!');
        clearInterval(intervalId); // Clear the interval
        handleShowModalError();
        return;
      }
      try {
        const data = await ServiceFunctions.getUserGenerationsData(
          token,
          savedId
        );

        const res = data.result;

        // Check if the result is valid
        if (res && res.length > 0) {
          setDescription(res); // Set the fetched data
          localStorage.removeItem('generatedId');
          setIsLoading(false); // Stop loading state
          getGenerationsAmount()
          clearInterval(intervalId); // Clear the interval
        } else {
          console.log('Result is null or empty, retrying...');
        }
      } catch (error) {
        console.error('Failed to fetch user generations data:', error);
        setIsLoading(false); // Stop loading state on error
        clearInterval(intervalId); // Clear the interval to stop further requests
      }
    }, 1000); // Check every 1 second
  };

  // const handleNextStep = async () => {
  //   if (!!!productName || !!!shortDescription || competitorsLinks.length === 0) {
  //     setErrorMessage('Пожалуйста, заполните все поля!');
  //     handleShowModalError();
  //     return;
  //   }

  //   const linksArray = competitorsLinks
  //     .split('\n')
  //     .map((link) => link.trim())
  //     .filter((link) => link !== '');
  //   if (linksArray.length != 0 && linksArray.length < 6) {
  //     await updateAiDescriptionGeneratorKeyword(authToken, linksArray);
  //   } else {
  //     setErrorMessage('Введите до 5 ссылок на карточки товаров конкурентов');
  //     handleShowModalError();
  //   }
  // };


  const stepOneFormSubmit = async (fields) => {
    const linksArray = fields?.competitorLinks?.split('\n').map((link) => link.trim()).filter((link) => link !== '');

    linksArray && linksArray.length > 0 && await updateAiDescriptionGeneratorKeyword(authToken, linksArray);
  }


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(description);
      // Показываем тултип после успешного копирования
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    } catch (err) {
      console.error('Ошибка при копировании текста: ', err);
      alert('Не удалось скопировать описание.');
    }
  };




  // --------------------- steptwo submit --------------------------//
  const openModal = async () => {
    const { productName, productDescription } = form.getFieldsValue()
    if (productDescription.length < 30) {
      setErrorMessage('Краткое описание должно содержать минимум 30 символов.');
      setShowModalError(true);
      return;
    }

    if (productName.length < 5) {
      setErrorMessage('Название товара должно содержать минимум 5 символов.');
      setShowModalError(true);
      return;
    }

    // await updateAiDescriptionGenerator(
    //   authToken,
    //   productName,
    //   shortDescription,
    //   keywords
    // );
    await updateAiDescriptionGenerator(
      authToken,
      productName,
      productDescription,
      keywords
    );

    try {
      await fetchUserGenerationsData(authToken, setDescription); // Используйте токен для получения данных
      setIsModalOpen(true); // Откройте модальное окно после получения данных
    } catch (error) {
      console.error('Error fetching user generations data:', error);
      setErrorMessage(
        'Не удалось получить данные. Пожалуйста, попробуйте еще раз.'
      );
    }
  };
  // ------------------------------------------------------------//
  const onClose = () => {
    form.resetFields()
    removeAllKeywords();
    setProductName('');
    setShortDescription('');
    setCompetitorsLinks('');
    setNextStep(false);
    setIsModalOpen(false);
    setIsButtonVisible(true);
    getGenerationsAmount()
  };
  const onCloseNew = () => {
    form.resetFields()
    setProductName('');
    setShortDescription('');
    setCompetitorsLinks('');
    setNextStep(false);
    setIsModalOpen(false);
    setIsButtonVisible(true);
    getGenerationsAmount()
  };
  // Function to handle adding keywords
  const handleAddKeyword = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addKeywords(inputValue.trim());
      setInputValue('');
    }
  };
  //Function to get ProductName
  const getProductName = (e) => {
    setProductName(e.target.value);
  };

  //Function to get shortDescription
  const getShortDescription = (e) => {
    setShortDescription(e.target.value);
  };

  //Function to get cometitorsLinks
  const getCompetitorsLinks = (e) => {
    setCompetitorsLinks(e.target.value);
  };

  // Function to handle removing keywords
  const handleRemoveKeyword = (keyword) => {
    removeKeyword(keyword);
  };

  // Function to toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Toggle visibility on each click
  };

  // Check if keywords already exist in context on mount
  useEffect(() => {
    if (keywords.length > 0) {
      // If there are already keywords, set next step to true
      setNextStep(true);
      setIsButtonVisible(false);
    }
  }, [keywords, setNextStep]);

  useEffect(() => {
    const fetchData = async () => {
      const storedId = localStorage.getItem('generatedId');
      if (storedId) {
        const parsedId = parseInt(storedId, 10);

        try {
          const response = await ServiceFunctions.getUserGenerationsData(
            authToken,
            parsedId
          ); // Fetch data
          setProductName(response.product_title);
          setShortDescription(response.short_description);
          setNextStep(true);
          addKeyword(response.keywords);
          setIsLoading(true);
          setIsModalOpen(true);
          setDescription(response.result); // Set the fetched data
          localStorage.removeItem('generatedId');
          setIsLoading(false);
        } catch (err) {
          // setError('Failed to fetch data');  // Handle error
        } finally {
          // setIsLoading(false);  // Stop loading
        }
      } else {
        // setLoading(false);  // Stop loading if no ID found
      }
    };

    fetchData(); // Call the function on component mount
  }, [authToken]);

  const handleAddKeywordFile = () => {
    setModalisShowKeywordsFile(true);
  };
  const handleCloseAddKeywordFile = () => {
    setModalisShowKeywordsFile(false);
  };
  const handleSaveClick = async () => {
    setIsFileUpload(true)
    try {
      const newKeywords = await saveFileClickHandler(file, authToken); // Отправляем файл и получаем ключевые слова
      addKeyword(newKeywords); // Обновляем ключевые слова в контексте
      handleCloseAddKeywordFile(); // Закрываем модалку
    } catch (error) {
      // Обработка ошибки
      console.error('Ошибка при отправке файла:', error);
      setModalisShowKeywordsFile(false);
      setErrorMessage(error == 'Error: Unprocessable Entity' ? 'Некорректный формат файла' : 'Ошибка при загрузке файла');
      setShowModalError(true);
    } finally {
      setTimeout(() => setFile(null), 500)  // Сбрасываем состояние файла после отправки
      setIsFileUpload(false)
    }
  };

  if (user?.subscription_status === 'expired') {
    return <NoSubscriptionPage title={'Генерация описания AI'} />;
  }

  return (
    <div className='dashboard-page'>
      <MobilePlug />
      <div style={{ height: '100vh' }}>
        <Sidebar />
      </div>
      <div className={`${styles.generatorPage} dashboard-content pb-3 `} style={{ padding: '0 32px' }}>
        <div style={{ width: '100%', padding: '0', margin: '20px 0' }}>
          <Header
            title={'Генерация описания AI'}
          >
            <div className={styles.generatorWrapper}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <p className={styles.topNavTitle}>
                  Вам {amountGenerations === 1 ? 'доступнa' : 'доступно'}{' '}
                  <span style={{ color: '#74717f' }}>
                    {amountGenerations.toString()}{' '}
                    {amountGenerations === 1 ? 'генерация' : 'генераций'}
                  </span>
                </p>
                <div className={styles.topNavAdd} onClick={handleNewGenerator}>
                  Добавить генерации
                </div>
              </div>
            </div>
          </Header>
        </div>
        {isModalOpenNewGen && (
          <AiDescriptionGeneratorTariffs
            redirect={redirect}
            setIsModalOpenNewGen={setIsModalOpenNewGen}
          />
        )}
        <div className={`${styles.generatorHeader} dash-container container`}>
          <div className={styles.generatorTitleWrapperMain}>
            <div className={styles.generatorTitleWrapper}>
              <div>
                <img src={magicWand} />
              </div>
              <div className={styles.generatorTitle}>
                Познакомьтесь с нашим умным генератором описаний
              </div>
            </div>
            <div onClick={toggleVisibility}>
              <img
                src={isVisible ? close : open}
                alt={isVisible ? 'close' : 'open'}
              />
            </div>
          </div>
          {isVisible && (
            <div className={styles.generatorParagsWrapper}>
              <div className={styles.generatorParag}>
                Заполните все необходимые поля, указав название товара, описание и прикрепив до 5 ссылок на карточки успешных конкурентов.
              </div>
              <div className={styles.generatorParag}>
                После этого система подберет и согласует с вами самые частотные запросы, на которых будет выстраиваться текст. При необходимости удалите ненужные запросы или добавьте недостающие.
              </div>
              <div className={styles.generatorParag}>
                Далее будет сгенерирован уникальный текст-описание, который вы сможете использовать для своих целей.
              </div>
            </div>
          )}
        </div>















        {/* FORM */}
        <div className={styles.page__blocksWrapper}>
          {/* step one */}
          <div className={styles.page__stepOneFormWrapper}>
            <span className={styles.page__formStepCounter}>
              1 шаг
            </span>
            <p className={styles.page__stepOneFormTitle}>О товаре</p>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#5329FF',
                  fontFamily: 'Mulish',
                },
                components: {
                  Form: {
                    labelFontSize: 18
                  }
                }
              }}
            >
              <Form
                layout='vertical'
                style={{ width: '100%', border: 'none' }}
                className={styles.form}
                form={form}
                onFinish={stepOneFormSubmit}
                disabled={nextStep}
              >
                <Form.Item
                  name='productName'
                  label='Название товара'
                  style={{ width: '100%', margin: 0 }}
                  rules={[
                    { required: true, message: 'Пожалуйста, заполните это поле!' },
                    { max: 255, message: 'Название не должно быть длиннее 255 символов.' },
                    () => ({
                      validator(_, value) {
                        if (value && !value.trim()) {
                          return Promise.reject(new Error('Пожалуйста, заполните поле корректно'))
                        }
                        return Promise.resolve()
                      },
                    }),
                  ]}
                >
                  <Input
                    style={{ height: 44 }}
                    placeholder='Шорты Jony Jenson'
                    size='large'
                  />
                </Form.Item>
                <Form.Item
                  name='productDescription'
                  label='Короткое описание товара'
                  style={{ width: '100%', margin: 0 }}
                  rules={[
                    { required: true, message: 'Пожалуйста, заполните это поле!' },
                    { min: 30, message: 'Короткое описание товара не должно быть короче 30 символов.' },
                    { max: 255, message: 'Короткое описание товара не должно быть длиннее 255 символов.' },
                    () => ({
                      validator(_, value) {
                        if (value && !value.trim()) {
                          return Promise.reject(new Error('Пожалуйста, заполните поле корректно!'))
                        }
                        return Promise.resolve()
                      },
                    }),
                  ]}
                >
                  <Input.TextArea
                    placeholder='Шорты Jony Jenson'
                    size='large'
                    autoSize={{ minRows: 4, maxRows: 4 }}
                  />
                </Form.Item>
                <Form.Item
                  name='competitorLinks'
                  label=' Вставьте до 5 ссылок на карточки товаров конкурентов. Каждую ссылку вводите с новой строки'
                  style={{ width: '100%', margin: 0 }}
                  rules={[
                    //{ required: true, message: 'Пожалуйста, заполните это поле!' },
                    () => ({
                      validator(_, value) {
                        if (!value) {
                          return Promise.reject(new Error('Пожалуйста, заполните это поле!'))
                        }
                        if (value && !value.trim()) {
                          return Promise.reject(new Error('Пожалуйста, заполните поле корректно'))
                        }
                        const arr = value.split('\n')
                        if (arr && arr.length > 5) {
                          return Promise.reject(new Error('Пожалуйста, ввудите не более 5 ссылок!'))
                        }
                        return Promise.resolve()
                      },
                    }),
                  ]}
                >
                  <Input.TextArea
                    placeholder={`https://www.wildberries.ru/catalog/177307535\nhttps://www.wildberries.ru/catalog/177307899\nhttps://www.wildberries.ru/catalog/177337832`}
                    size='large'
                    autoSize={{ minRows: 4, maxRows: 4 }}
                  />
                </Form.Item>

                <Button
                  htmlType='submit'
                  type='primary'
                  size='large'
                  style={{ fontWeight: 700, height: 60 }}
                  loading={isLoading}
                >
                  Далее
                </Button>
              </Form>
            </ConfigProvider>
          </div>






          {/* loader */}
          {isLoadingNext && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{
                height: '100%',
                paddingTop: '25%',
                paddingLeft: '5%',
                width: '45%',
              }}
            >
              <span className='loader'></span>
            </div>
          )}






          {/* step two */}
          {nextStep && !isLoadingNext && (
            <div className={styles.formContainerR}>
              <div>
                <span className={styles.page__formStepCounter}>
                  2 шаг
                </span>
                <p className={styles.page__stepOneFormTitle} style={{ margin: '20px 0' }}>Ключевые слова</p>
              </div>

              <div className={styles.addKeywordFileWrapper}>
                <div>Добавить ключевое слово</div>
                <div
                  className={styles.addKeywordButtonWrapper}
                  onClick={handleAddKeywordFile}
                >
                  <div className={styles.addKeywordButtonWrapperImg}>
                    <img src={AddKeyImg} />
                  </div>
                  <div className={styles.addKeywordButtonWrapperText}>
                    Загрузить ключевые слова
                  </div>
                </div>
              </div>
              <form
                style={{
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <input
                  type='text'
                  placeholder='Пример: Ключевое слово'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className={styles.inputFieldR}
                  style={{ height: 44 }}
                />
                <button
                  className={styles.addButtonR}
                  onClick={handleAddKeyword}
                >
                  Добавить
                </button>
              </form>

              <div className={styles.keywordList}>
                {keywords.map((keyword, index) => (
                  <div key={index} className={styles.keyword}>
                    <div>{keyword}</div>
                    <div
                      className={styles.removeKeyword}
                      onClick={() => handleRemoveKeyword(keyword)}
                    >
                      <img className={styles.closeBtn} src={closebtn} />
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.stepTwo__buttonsWrapper}>
                <button
                  className={styles.backButton}
                  onClick={() => setNextStep(false)}
                >
                  Вернуться к шагу 1
                </button>
                <button className={styles.submitBtn} onClick={() => {
                  if (amountGenerations === 0) {
                    setErrorMessage('К сожалению у вас закончился лимит генераций!');
                    handleShowModalError();
                  } else {
                    openModal()
                  }
                 
                }}>
                  Сгенерировать описание
                </button>
              </div>
            </div>
          )}
        </div>


        {/* <div className={`${styles.stepsWrapper} dash-container`}> */}
        {/* <div className={styles.formContainer}>
            <div className={styles.stepIndicator}>
              <span>1 шаг</span>
            </div>
            <div className={styles.aboutParag}>О товаре</div>

            <div>Название товара</div>
            <input
              type='text'
              id='productName'
              placeholder='Шорты Jony Jenson'
              className={styles.inputField}
              value={productName}
              onChange={getProductName}
            />

            <label htmlFor='productDescription'>Короткое описание товара</label>
            <textarea
              id='productDescription'
              placeholder='Шорты женские кожаные короткие'
              className={styles.textArea}
              value={shortDescription}
              onChange={getShortDescription}
            ></textarea>

            <label htmlFor='competitorLinks'>
              Вставьте до 5 ссылок на карточки товаров конкурентов. Каждую
              ссылку вводите с новой строки
            </label>
            <textarea
              id='competitorLinks'
              placeholder={`https://www.wildberries.ru/catalog/177307535\nhttps://www.wildberries.ru/catalog/177307899\nhttps://www.wildberries.ru/catalog/177337832`}
              className={styles.textArea}
              value={competitorsLinks}
              onChange={getCompetitorsLinks}
            ></textarea>

            {isButtonVisible && (
              <button className={styles.submitBtn} onClick={handleNextStep}>
                Далее
              </button>
            )}
          </div> */}
        {/* {isLoadingNext ? (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{
                height: '100%',
                paddingTop: '25%',
                paddingLeft: '5%',
                width: '45%',
              }}
            >
              <span className='loader'></span>
            </div>
          ) : (
            nextStep && (
              <div className={styles.formContainerR}>
                <div className={styles.stepIndicator}>
                  <span>2 шаг</span>
                </div>
                <div className={styles.aboutParag}>Ключевые слова</div>

                <div className={styles.addKeywordFileWrapper}>
                  <div>Добавить ключевое слово</div>
                  <div
                    className={styles.addKeywordButtonWrapper}
                    onClick={handleAddKeywordFile}
                  >
                    <div className={styles.addKeywordButtonWrapperImg}>
                      <img src={AddKeyImg} />
                    </div>
                    <div className={styles.addKeywordButtonWrapperText}>
                      Загрузить ключевые слова
                    </div>
                  </div>
                </div>
                <form className={styles.inputWrapperR}>
                  <input
                    type='text'
                    placeholder='Пример: Ключевое слово'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={styles.inputFieldR}
                  />
                  <button
                    className={styles.addButtonR}
                    onClick={handleAddKeyword}
                  >
                    Добавить
                  </button>
                </form>

                <div className={styles.keywordList}>
                  {keywords.map((keyword, index) => (
                    <div key={index} className={styles.keyword}>
                      <div>{keyword}</div>
                      <div
                        className={styles.removeKeyword}
                        onClick={() => handleRemoveKeyword(keyword)}
                      >
                        <img className={styles.closeBtn} src={closebtn} />
                      </div>
                    </div>
                  ))}
                </div>

                <button className={styles.submitBtn} onClick={openModal}>
                  Сгенерировать описание
                </button>
              </div>
            )
          )} */}
        {/* </div> */}
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderTitle}>
                Сгенерированное описание
              </div>
              <div onClick={onClose}>
                <img src={closeBtnModal} className={styles.closeBtnModal} />
              </div>
            </div>
            <div className={styles.modalBody}>
              {isLoading ? (
                <div className={styles.modalContentLoad}>
                  <div className={styles.modalTextLoad}>
                    Не закрывайте это окно, генерация занимает несколько
                    минут.
                  </div>
                  <div className={styles.loaderContainer}>
                    <span className='loader'></span>
                  </div>
                </div>
              ) : (
                <p>{description}</p>
              )}
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.modalFooterBtnNew}
                onClick={onCloseNew}
              >
                Новая генерация
              </button>
              <button
                className={
                  isCopied
                    ? styles.modalFooterBtnCopied
                    : styles.modalFooterBtnCopy
                }
                onClick={handleCopy}
              >
                {isCopied ? 'Скопировано!' : 'Скопировать'}
              </button>
            </div>
            {/* {isTooltipVisible && (
                          <div className={styles.tooltip}>
                              Скопировано!
                          </div>
                      )} */}
          </div>
        </div>
      )}
      <Modal
        show={modalIsShowKeywordsFile}
        onHide={handleCloseAddKeywordFile}
        className='add-token-modal'
      >
        <Modal.Header closeButton>
          <div className='d-flex align-items-center gap-2'>
            <div style={{ width: '100%' }}>
              <div className='d-flex justify-content-between'>
                <h4 className='fw-bold mb-0'>Загрузить ключевые слова</h4>
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
                  // onClick={() => {
                  //     saveFileClickHandler(file, authToken);
                  //     setFile(null);
                  //     handleCloseAddKeywordFile();
                  // }}
                  onClick={handleSaveClick}
                  className='prime-btn'
                  style={{ height: '52px' }}
                  disabled={isFileUpload}
                >
                  Сохранить
                </button>
              </div>
              <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                <a
                  href='#'
                  className='link'
                  onClick={handleCloseAddKeywordFile}
                >
                  Отмена
                </a>
              </div>
            </div>
          ) : (
            <div className='d-flex flex-column align-items-center justify-content-around w-100'>
              <DragDropFile files={file} setFiles={setFile} />
              <div className={styles.fileDescription}>
                <div className={styles.fileDescriptionText}>
                  Слова в файле расположить построчно в первой колонке первого листа.
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <ErrorModal
        open={showModalError}
        message={errorMessage}
        onClose={handleCloseModalError}
        onCancel={handleCloseModalError}
        onOk={handleCloseModalError}
        footer={null}
      />
    </div>
  );
};
export default AiDescriptionGeneratorPage;
