import { useState } from 'react'
import styles from './howtoWidget.module.css'
import { Link } from 'react-router-dom'
import { Tooltip, ConfigProvider } from 'antd'

export const HowtoWidget = () => {

    const [isBodyOpen, setIsBodyOpen] = useState(false)

    return (
        <div className={styles.widget}>
            <div className={styles.widget__header}  onClick={() => setIsBodyOpen(!isBodyOpen)}>
                <p className={styles.widget__title}>Раздел «Трендовые запросы» — это уникальный инструмент, основанный на наших данных Big Data.</p>
                <button
                    className={isBodyOpen ? `${styles.widget__openButton} ${styles.widget__openButton_open}` : `${styles.widget__openButton} ${styles.widget__openButton_closed}`}
                    onClick={() => setIsBodyOpen(!isBodyOpen)}
                >
                    {isBodyOpen ? 'Скрыть' : 'Раскрыть'}
                    <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 10L9 2L1 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            {isBodyOpen &&
                <div className={styles.widget__body}>
                    <p className={styles.widget__text}>Он позволяет выявлять поисковые запросы, а значит и товары, пользующиеся спросом и демонстрирующие восходящий тренд.</p>
                    <div className={styles.widget__footer}>
                        <Link
                            className={styles.widget__link}
                            to='https://radar.usedocs.com/article/77127'
                            target='_blank'
                        >
                            Посмотреть пример заполнения
                        </Link>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorTextLightSolid: '#1A1A1A'
                                }
                            }}
                        >
                            <Tooltip
                                title='Логика заполнения примера: показать запросы, которые выросли в частотности в два раза за 60 дней до установленной даты, но исключить низкочастотные запросы (ниже 6000)'
                                color='white'
                                arrow={false}
                                placement='rightBottom'
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"  style={{ cursor: 'pointer' }}>
                                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" stroke-opacity="0.1" strokeWidth="1.5" />
                                    <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                                </svg>
                            </Tooltip>
                        </ConfigProvider>
                    </div>
                </div>
            }
        </div>
    )
}