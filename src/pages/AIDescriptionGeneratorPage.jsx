import { useState, useContext } from "react"
import SideNav from "../components/SideNav"
import TopNav from "../components/TopNav"
import styles from "./AIDescriptionGenerator.module.css"
import magicWand from "./images/magic-wand-2.svg"
import close from "./images/AiMinusIcon.svg"
import open from "./images/AiPlusIcon.svg"
import closebtn from "../assets/closebtn.png";
import closeBtnModal from './images/closeBtnModal.svg'
import { ServiceFunctions } from "../service/serviceFunctions";
import AuthContext from "../service/AuthContext";
import warningIcon from "../assets/warning.png"
import Modal from 'react-bootstrap/Modal';

const AiDescriptionGeneratorPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingNext, setIsLoadingNext] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isVisible, setIsVisible] = useState(true);
    const [keywords, setKeywords] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [nextStep, setNextStep] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productName, setProductName] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [competitorsLinks, setCompetitorsLinks] = useState('')
    const { user, authToken } = useContext(AuthContext);
    const [description, setDescription] = useState();
    const [showModalError, setShowModalError] = useState(false);
    const [dataUpdated, setDataUpdated] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [isModalOpenNewGen, setIsModalOpenNewGen] = useState(false);

    const handleNewGenerator = () => {
        setIsModalOpenNewGen(false);
    };



    const handleShowModalError = () => setShowModalError(true);
    const handleCloseModalError = () => setShowModalError(false);

    const updateAiDescriptionGeneratorKeyword = async (
        token, competitorsLinks
    ) => {
        setIsLoading(true);
        setIsLoadingNext(true)
        setErrorMessage('');
        try {
            const data = await ServiceFunctions.postAiDescriptionGeneratorKeywords(
                token, competitorsLinks
            );

            // Проверка на отсутствие данных
            if (!data || data.length === 0) {
                setErrorMessage("Не правильная ссылка или артикул.");
                handleShowModalError();
            }

            const result = data;

            // Check if data is not empty
            if (result.length > 0) {

                setKeywords(prevKeywords => [...prevKeywords, ...result]);
                setInputValue('');
                setNextStep(true);
                setIsLoading(false);
            }
            else {
                setErrorMessage("Не правильная ссылка или артикул.");
                handleShowModalError();
            }

        } catch (e) {
            if (e.response) {
                setErrorMessage(`Ошибка сервера.`);
            } else if (e.request) {
                setErrorMessage('Ошибка сети: сервер не отвечает.');
            } else {
                console.log(e.errorMessage)
                setErrorMessage(`Ошибка: не удалось найти данный товар.`);
            }
            console.error(e);


        } finally {
            setIsLoadingNext(false)

        }
    };

    const updateAiDescriptionGenerator = async (
        token, productName, shortDescription, keywords
    ) => {

        setErrorMessage('');
        try {
            setIsLoading(true);
            setIsModalOpen(true);
            const data = await ServiceFunctions.postAiDescriptionGenerator(
                token, productName, shortDescription, keywords
            );

            // Проверка на отсутствие данных
            if (!data || data.length === 0) {
                setErrorMessage("Не правильная ссылка или артикул.");
                handleShowModalError();
            }

            const result = data; // Assuming data is already defined and is an array

            // Check if data is not empty
            if (result.length > 0) {
                // Add all values from the data array to the keywords array
                setDescription(result)
            }


        } catch (e) {
            if (e.response) {
                setErrorMessage(`Ошибка сервера.`);
            } else if (e.request) {
                setErrorMessage('Ошибка сети: сервер не отвечает.');
            } else {
                console.log(e.errorMessage)
                setErrorMessage(`Ошибка: не удалось найти данный товар.`);
            }
            console.error(e);

        } finally {
            setIsLoading(false);

        }
    };

    const handleNextStep = async () => {
        const linksArray = competitorsLinks.split('\n').map(link => link.trim()).filter(link => link !== '');
        if (linksArray.length != 0 && linksArray.length < 6) {
            setIsLoading(true);
            setIsButtonVisible(false);
            await updateAiDescriptionGeneratorKeyword(authToken, linksArray)
        } else {
            setErrorMessage("Введите до 5 ссылок на карточки товаров конкурентов");
            handleShowModalError()
        }
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

    const openModal = async () => {

        if (shortDescription.length < 30) {
            setErrorMessage("Краткое описание должно содержать минимум 30 символов.");
            setShowModalError(true);
            return;
        }

        if (productName.length < 5) {
            setErrorMessage("Название товара должно содержать минимум 5 символов.");
            setShowModalError(true);
            return;
        }
        await updateAiDescriptionGenerator(authToken, productName, shortDescription, keywords)

    }
    const onClose = () => {
        setProductName("")
        setShortDescription("")
        setCompetitorsLinks("")
        setNextStep(false)
        setIsModalOpen(false)
    }
    // Function to handle adding keywords
    const handleAddKeyword = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setKeywords([inputValue.trim(), ...keywords]);
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
    const handleRemoveKeyword = (index) => {
        const updatedKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(updatedKeywords);
    };

    // Function to toggle visibility
    const toggleVisibility = () => {
        setIsVisible(!isVisible); // Toggle visibility on each click
    };
    return <div className='dashboard-page'>
        <SideNav />
        <div className={`${styles.generatorPage} dashboard-content pb-3 `}>
            <TopNav title={'Генерация описания AI'}>
                <div className={styles.generatorWrapper}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between" }}>
                        <p className={styles.topNavTitle}>Вам доступно <span style={{ color: "#74717f" }}>5 генераций</span></p>
                        <div className={styles.topNavAdd} onClick={handleNewGenerator}>Добавить генерации</div>
                    </div>
                </div>
            </TopNav>
            {isModalOpenNewGen &&
                <div className={styles.overlay}>

                </div>
            }
            <div className={`${styles.generatorHeader} dash-container container`}>
                <div className={styles.generatorTitleWrapperMain}>
                    <div className={styles.generatorTitleWrapper}>
                        <div><img src={magicWand} /></div>
                        <div className={styles.generatorTitle}>Познакомьтесь с нашим умным генератором описаний</div>
                    </div>
                    <div onClick={toggleVisibility}><img src={isVisible ? close : open} alt={isVisible ? "close" : "open"} /></div>
                </div>
                {isVisible && (
                    <div className={styles.generatorParagsWrapper}>
                        <div className={styles.generatorParag}>
                            Заполните все необходимые поля указав название товара, описание и прикрепите до 5 ссылок на карточки успешных конкурентов.
                        </div>
                        <div className={styles.generatorParag}>
                            После этого система подберет и согласует с вами самые частотные запросы, на которых будет выстраиваться текст. При необходимости удалите ненужные запросы, или добавьте недостающие.
                        </div>
                        <div className={styles.generatorParag}>
                            Далее будет сгенерирован уникальный текст-описание, которое вы сможете использовать для своих целей.
                        </div>
                    </div>
                )}
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
            <div className={`${styles.stepsWrapper} dash-container`}>
                <div className={styles.formContainer}>
                    <div className={styles.stepIndicator}>
                        <span>1 шаг</span>
                    </div>
                    <div className={styles.aboutParag}>О товаре</div>

                    <div>Название товара</div>
                    <input
                        type="text"
                        id="productName"
                        placeholder="Шорты Jony Jenson"
                        className={styles.inputField}
                        value={productName}
                        onChange={getProductName}
                    />

                    <label htmlFor="productDescription">Короткое описание товара</label>
                    <textarea
                        id="productDescription"
                        placeholder="Шорты женские кожаные короткие"
                        className={styles.textArea}
                        value={shortDescription}
                        onChange={getShortDescription}
                    >
                    </textarea>

                    <label htmlFor="competitorLinks">Вставьте до 5 ссылок на карточки товаров конкурентов. Каждую ссылку вводите с новой строки</label>
                    <textarea
                        id="competitorLinks"
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
                </div>
                {isLoadingNext ? (
                    <div
                        className='d-flex flex-column align-items-center justify-content-center'
                        style={{ height: '100%', paddingTop: '25%', paddingLeft: "5%", width: '45%' }}
                    >
                        <span className='loader'></span>
                    </div>
                ) : (
                    nextStep &&
                    <div className={styles.formContainerR}>
                        <div className={styles.stepIndicator}>
                            <span>2 шаг</span>
                        </div>
                        <div className={styles.aboutParag}>Ключевые слова</div>

                        <div>Добавить ключевое слово</div>
                        <form className={styles.inputWrapperR}>
                            <input
                                type="text"
                                placeholder="Пример: Ключевое слово"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className={styles.inputFieldR}
                            />
                            <button className={styles.addButtonR} onClick={handleAddKeyword}>Добавить</button>
                        </form>

                        <div className={styles.keywordList}>
                            {keywords.map((keyword, index) => (
                                <div key={index} className={styles.keyword}>
                                    <div>{keyword}</div>
                                    <div className={styles.removeKeyword} onClick={() => handleRemoveKeyword(index)}>
                                        <img className={styles.closeBtn} src={closebtn} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className={styles.submitBtn} onClick={openModal}>Сгенерировать описание</button>
                    </div>
                )}

            </div>
        </div>
        <div>
            {isModalOpen &&
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalHeaderTitle}>Сгенерированное описание</div>
                            <div onClick={onClose}><img src={closeBtnModal} className={styles.closeBtnModal} /></div>
                        </div>
                        <div className={styles.modalBody}>
                            {isLoading ? (
                                <div className={styles.modalContentLoad}>
                                    <div className={styles.modalTextLoad}>Не закрывайте это окно, генерация занимает несколько минут.</div>
                                    <div className={styles.loaderContainer}>
                                        <span className='loader'></span>
                                    </div>
                                </div>
                            ) : (
                                <p>
                                    {description}
                                </p>
                            )}
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.modalFooterBtnNew} onClick={onClose}>Новая генерация</button>
                            <button className={isCopied ? styles.modalFooterBtnCopied : styles.modalFooterBtnCopy} onClick={handleCopy}>{isCopied ? 'Скопировано!' : 'Скопировать'}</button>
                        </div>
                        {/* {isTooltipVisible && (
                            <div className={styles.tooltip}>
                                Скопировано!
                            </div>
                        )} */}
                    </div>
                </div>
            }
        </div>
    </div >
}
export default AiDescriptionGeneratorPage