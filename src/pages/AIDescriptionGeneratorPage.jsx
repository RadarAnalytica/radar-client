import { useState } from "react"
import SideNav from "../components/SideNav"
import TopNav from "../components/TopNav"
import styles from "./AIDescriptionGenerator.module.css"
import magicWand from "./images/magic-wand-2.svg"
import close from "./images/AiMinusIcon.svg"
import open from "./images/AiPlusIcon.svg"
import closebtn from "../assets/closebtn.png";
import { Modal } from "bootstrap"
import closeBtnModal from './images/closeBtnModal.svg'
const AiDescriptionGeneratorPage = () => {

    const [isVisible, setIsVisible] = useState(true);
    const [keywords, setKeywords] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [nextStep, setNextStep] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNextStep = () => {
        setNextStep(true)
    }

    const openModal = () => setIsModalOpen(true);
    const onClose = () => setIsModalOpen(false);
    // Function to handle adding keywords
    const handleAddKeyword = (e) => {
        e.preventDefault(); // Prevent the form from submitting
        if (inputValue.trim()) {
            setKeywords([...keywords, inputValue.trim()]);
            setInputValue(''); // Clear the input field
        }
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
                        <p className={styles.topNavTitle}>Вам доступно 3<span style={{ color: "#74717f" }}>/5 генераций</span></p>
                        <div className={styles.topNavAdd}>Добавить генерации</div>
                    </div>
                </div>
            </TopNav>
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
                    />

                    <label htmlFor="productDescription">Короткое описание товара</label>
                    <textarea
                        id="productDescription"
                        placeholder="Шорты женские кожаные короткие"
                        className={styles.textArea}
                    ></textarea>

                    <label htmlFor="competitorLinks">Вставьте до 5 ссылок на карточки товаров конкурентов. Каждую ссылку вводите с новой строки</label>
                    <textarea
                        id="competitorLinks"
                        placeholder={`https://www.wildberries.ru/catalog/177307535\nhttps://www.wildberries.ru/catalog/177307899\nhttps://www.wildberries.ru/catalog/177337832`}
                        className={styles.textArea}
                    ></textarea>

                    <button className={styles.submitBtn} onClick={handleNextStep}>Далее</button>
                </div>
                {nextStep &&
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
                }
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
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum tellus id eleifend efficitur. Sed ornare tortor a tortor interdum sodales vel sed dui. Maecenas viverra est auctor venenatis ullamcorper. Praesent dapibus felis risus, non pharetra diam lobortis eu. Suspendisse potenti. Ut feugiat eros metus, vitae vestibulum enim volutpat tincidunt.
                            </p>
                            <p>
                                Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris egestas molestie turpis sed aliquet. Quisque eget libero quis diam sodales bibendum. In ac convallis sapien. Sed sed aliquet nunc. Nam placerat, risus id posuere rhoncus, nunc tortor tempus quam, eu semper dolor odio quis nibh. Sed porttitor non magna quis aliquam.
                            </p>
                            <p>
                                Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris egestas molestie turpis sed aliquet. Quisque eget libero quis diam sodales bibendum. In ac convallis sapien. Sed sed aliquet nunc. Nam placerat, risus id posuere rhoncus, nunc tortor tempus quam, eu semper dolor odio quis nibh. Sed porttitor non magna quis aliquam.
                            </p>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.modalFooterBtnNew} onClick={onClose}>Новая генерация</button>
                            <button className={styles.modalFooterBtnCopy}>Скопировать</button>
                        </div>
                    </div>
                </div>

            }
        </div>
    </div >
}
export default AiDescriptionGeneratorPage