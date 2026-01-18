import React, { useState } from 'react'
import styles from './SubscriptionCard.module.css'
import { ISubscription } from '../../shared/models/user/user';
import { getWordDeclension } from '@/service/utils';
import HowToLink from '@/components/sharedComponents/howToLink/howToLink';
import { Link } from 'react-router-dom';
import { Modal, ConfigProvider } from 'antd';

// Icons
const CheckIcon = () => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM7.39016 3.89017C7.53661 3.74372 7.53661 3.50628 7.39016 3.35983C7.24372 3.21339 7.00628 3.21339 6.85983 3.35983L4.375 5.84467L3.14017 4.60984C2.99372 4.46339 2.75628 4.46339 2.60983 4.60984C2.46339 4.75628 2.46339 4.99372 2.60983 5.14017L4.10983 6.64017C4.25628 6.78661 4.49372 6.78661 4.64017 6.64017L7.39016 3.89017Z" fill="#00B69B"/>
    </svg>
);

const ApiIcon = () => (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5.34167 0.380004L1.175 2.98417C0.444048 3.44102 0 4.24219 0 5.10417V10.6663C0 11.5282 0.444049 12.3294 1.175 12.7863L5.34167 15.3904C6.15235 15.8971 7.18099 15.8971 7.99166 15.3904L12.1583 12.7863C12.8893 12.3294 13.3333 11.5282 13.3333 10.6663V5.10417C13.3333 4.24219 12.8893 3.44102 12.1583 2.98417L7.99166 0.380004C7.18099 -0.126668 6.15234 -0.126668 5.34167 0.380004ZM7.70833 7.88208C7.70833 7.30678 7.24196 6.84041 6.66667 6.84041C6.09137 6.84041 5.625 7.30678 5.625 7.88208V7.88808C5.625 8.46338 6.09137 8.92975 6.66667 8.92975C7.24196 8.92975 7.70833 8.46338 7.70833 7.88808V7.88208Z" fill="#363538"/>
    </svg>
);

const SalesIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.77473 3.98136C3.77445 3.97372 3.77431 3.96604 3.77431 3.95833C3.77431 1.77221 5.54652 0 7.73265 0C9.91877 0 11.691 1.77221 11.691 3.95833C11.691 3.96604 11.6908 3.97372 11.6906 3.98136C13.1462 4.15302 14.3397 5.26725 14.5857 6.74367L15.4191 11.7437C15.7577 13.7754 14.1909 15.625 12.1311 15.625H3.33416C1.27436 15.625 -0.29245 13.7754 0.0461785 11.7437L0.879512 6.74367C1.12558 5.26723 2.31903 4.153 3.77473 3.98136ZM5.02431 3.95833C5.02431 2.46256 6.23688 1.25 7.73265 1.25C9.22842 1.25 10.441 2.46256 10.441 3.95833H5.02431ZM4.39921 8.125C4.85945 8.125 5.23254 7.7519 5.23254 7.29167C5.23254 6.83143 4.85945 6.45833 4.39921 6.45833C3.93897 6.45833 3.56588 6.83143 3.56588 7.29167C3.56588 7.7519 3.93897 8.125 4.39921 8.125ZM11.8992 7.29167C11.8992 7.7519 11.5261 8.125 11.0659 8.125C10.6056 8.125 10.2325 7.7519 10.2325 7.29167C10.2325 6.83143 10.6056 6.45833 11.0659 6.45833C11.5261 6.45833 11.8992 6.83143 11.8992 7.29167Z" fill="#363538"/>
    </svg>
);

// Tariff details data structure
interface TariffSection {
    title: string;
    items: string[];
}

interface TariffDetailsModalProps {
    open: boolean;
    onClose: () => void;
    tariffName: string;
    sectionsCount: number;
    apiShopsCount: number;
    salesLimit: string;
    salesNote?: string;
    sections: TariffSection[];
}


interface ISubscriptionCardProps {
    item: ISubscription;
}

// TariffDetailsModal Component
const TariffDetailsModal: React.FC<TariffDetailsModalProps> = ({
    open,
    onClose,
    tariffName,
    sectionsCount,
    apiShopsCount,
    salesLimit,
    salesNote,
    sections
}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    paddingMD: 16,
                }
            }}
        >
            <Modal
                open={open}
                onCancel={onClose}
                footer={null}
                width={600}
                title={null}
                closeIcon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                }
            >
                <div className={styles.tariffModal}>
                    <h3 className={styles.tariffModal__title}>Что входит в текущий тариф</h3>

                    {/* Tariff Header */}
                    <div className={styles.tariffModal__header}>
                        <div className={styles.tariffModal__tariffName}>
                            <span className={styles.tariffModal__tariffDot}></span>
                            <span>{tariffName}</span>
                        </div>
                        <span className={styles.tariffModal__sectionsCount}>
                            <CheckIcon /> {sectionsCount} {getWordDeclension({ one: 'раздел', few: 'раздела', many: 'разделов' }, sectionsCount)}
                        </span>
                    </div>

                    {/* API Section */}
                    <div className={styles.tariffModal__infoBlock}>
                        <div className={styles.tariffModal__infoRow}>
                            <ApiIcon />
                            <span className={styles.tariffModal__infoLabel}>API</span>
                        </div>
                        <span className={styles.tariffModal__infoValue}>
                            {apiShopsCount} {getWordDeclension({ one: 'подключенный магазин', few: 'подключенных магазина', many: 'подключенных магазинов' }, apiShopsCount)}
                        </span>
                    </div>

                    {/* Sales Section */}
                    <div className={styles.tariffModal__infoBlock}>
                        <div className={styles.tariffModal__infoRow}>
                            <SalesIcon />
                            <span className={styles.tariffModal__infoLabel}>Продажи до {salesLimit}</span>
                        </div>
                        {salesNote && (
                            <span className={styles.tariffModal__infoNote}>{salesNote}</span>
                        )}
                    </div>

                    {/* Feature Sections */}
                    <div className={styles.tariffModal__sections}>
                        {sections.map((section, index) => (
                            <div key={index} className={styles.tariffModal__section}>
                                <span className={styles.tariffModal__sectionTitle}>{section.title}</span>
                                <ul className={styles.tariffModal__sectionList}>
                                    {section.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className={styles.tariffModal__sectionItem}>
                                            <CheckIcon />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    );
};

const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

// Mock data for tariff sections - can be replaced with real data
const getTariffSections = (): TariffSection[] => [
    {
        title: 'Мои Финансы',
        items: ['Сводка продаж', 'Отчет по неделям']
    },
    {
        title: 'Анализ конкурентов',
        items: ['Калькулятор Unit-экономики']
    },
    {
        title: 'Мои товары',
        items: ['Аналитика по товарам', 'Контроль СПП', 'Создание до 5 групп товаров']
    },
    {
        title: 'Моя реклама',
        items: ['Контроль ДРР']
    }
];

export const SubscriptionCard: React.FC<ISubscriptionCardProps> = ({ item }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const paymentDateEndString = item.validity_period;
    const paymentDateValue = new Date(Date.parse(paymentDateEndString));
    paymentDateValue.setDate(paymentDateValue.getDate() + 1);
    const paymentDate = `${paymentDateValue.getDate()} ${months[paymentDateValue.getMonth()]} ${paymentDateValue.getFullYear()} года`;

    const activeTillPeriodValue = new Date(Date.parse(paymentDateEndString));
    const activeTillPeriod = `${activeTillPeriodValue.getDate()} ${months[activeTillPeriodValue.getMonth()]} ${activeTillPeriodValue.getFullYear()} года`;

    return (
        <div className={styles.subscriptionCard}>
            <div className={styles.subscriptionCard__header} style={{ backgroundColor: item.active ? '#00B69B12' : '#F8F8F8' }}>
                <div className={styles.subscriptionCard__titleWrapper}>
                    <div className={styles.subscriptionCard__titleBox}>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: item.active ? '#00B69B' : '#8C8C8C' }}>
                            <path d="M9.375 11.875C10.7557 11.875 11.875 10.7557 11.875 9.375C11.875 7.99429 10.7557 6.875 9.375 6.875C7.99429 6.875 6.875 7.99429 6.875 9.375C6.875 10.7557 7.99429 11.875 9.375 11.875Z" fill="currentColor" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.9976 0H5.44988C2.44 0 0 2.44104 0 5.45221V11.458C0 12.853 0.534509 14.195 1.49353 15.2077L9.15429 23.2975C11.2264 25.4856 14.6799 25.5766 16.8642 23.5006L23.3037 17.3805C25.4837 15.3086 25.5745 11.8618 23.5065 9.67795L15.954 1.70248C14.9248 0.615632 13.4941 0 11.9976 0ZM9.375 13.75C11.7912 13.75 13.75 11.7912 13.75 9.375C13.75 6.95875 11.7912 5 9.375 5C6.95875 5 5 6.95875 5 9.375C5 11.7912 6.95875 13.75 9.375 13.75ZM14.4129 19.4129L19.4129 14.4129C19.779 14.0468 19.779 13.4532 19.4129 13.0871C19.0468 12.721 18.4532 12.721 18.0871 13.0871L13.0871 18.0871C12.721 18.4532 12.721 19.0468 13.0871 19.4129C13.4532 19.779 14.0468 19.779 14.4129 19.4129Z" fill="currentColor" />
                        </svg>
                        <h4 className={styles.subscriptionCard__title}>{item.name}</h4>
                    </div>
                    <span className={styles.subscriptionCard__status} style={{ backgroundColor: item.active ? '#00B69B' : '#8C8C8C' }}>
                        {item.active ? 'Активен' : 'Не активен'}
                    </span>
                </div>

                <div className={styles.subscriptionCard__dates}>
                    {item.active &&
                        <>
                            <span className={styles.subscriptionCard__dateItem}>Действует до {activeTillPeriod}</span>
                            <span className={styles.subscriptionCard__dateItem}>Следующее списание средств {paymentDate}</span>
                        </>
                    }
                    {!item.active &&
                        <>
                            <span className={styles.subscriptionCard__dateItem}>Приостановлено с {paymentDate}</span>
                        </>
                    }
                </div>
            </div>
            {item.active &&
                <div className={styles.subscriptionCard__limitsBlock}>
                    <h5 className={styles.subscriptionCard__subtitle}>Лимиты</h5>
                    <ul className={styles.subscriprionCard__limitsList}>
                        <li className={styles.subscriprionCard__limitsListItem}>
                            <div className={styles.subscriprionCard__limitsItemHeader}>
                                <div className={styles.subscriprionCard__limitsTitleWrapper}>
                                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.34167 0.380004L1.175 2.98417C0.444048 3.44102 0 4.24219 0 5.10417V10.6663C0 11.5282 0.444049 12.3294 1.175 12.7863L5.34167 15.3904C6.15235 15.8971 7.18099 15.8971 7.99166 15.3904L12.1583 12.7863C12.8893 12.3294 13.3333 11.5282 13.3333 10.6663V5.10417C13.3333 4.24219 12.8893 3.44102 12.1583 2.98417L7.99166 0.380004C7.18099 -0.126668 6.15234 -0.126668 5.34167 0.380004ZM7.70833 7.88208C7.70833 7.30678 7.24196 6.84041 6.66667 6.84041C6.09137 6.84041 5.625 7.30678 5.625 7.88208V7.88808C5.625 8.46338 6.09137 8.92975 6.66667 8.92975C7.24196 8.92975 7.70833 8.46338 7.70833 7.88808V7.88208Z" fill="#1A1A1A" />
                                    </svg>
                                    <span className={styles.subscriptionCard__subtitle}>API</span>
                                </div>

                                <div className={styles.subscriptionCard__limitsValues}>
                                    <span className={styles.subscriprionCard__limitsValue}>1</span>
                                    <span className={styles.subscriprionCard__limitsValue}>/</span>
                                    <span className={styles.subscriprionCard__limitsValue}>3 подключенных {getWordDeclension({ one: 'магазин', few: 'магазина', many: 'магазинов' }, 3)}</span>
                                </div>
                            </div>

                            <div className={styles.subscriprionCard__limitsProgressBar}>
                                <div className={styles.subscriprionCard__limitsProgressBarValue} style={{ maxWidth: '33%' }}></div>
                            </div>
                        </li>
                        <li className={`${styles.subscriprionCard__limitsListItem} ${styles.subscriprionCard__limitsListItem_expired}`}>
                            <div className={styles.subscriprionCard__limitsItemHeader}>
                                <div className={styles.subscriprionCard__limitsTitleWrapper}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.77473 3.98136C3.77445 3.97372 3.77431 3.96604 3.77431 3.95833C3.77431 1.77221 5.54652 0 7.73265 0C9.91877 0 11.691 1.77221 11.691 3.95833C11.691 3.96604 11.6908 3.97372 11.6906 3.98136C13.1462 4.15302 14.3397 5.26725 14.5857 6.74367L15.4191 11.7437C15.7577 13.7754 14.1909 15.625 12.1311 15.625H3.33416C1.27436 15.625 -0.29245 13.7754 0.0461785 11.7437L0.879512 6.74367C1.12558 5.26723 2.31903 4.153 3.77473 3.98136ZM5.02431 3.95833C5.02431 2.46256 6.23688 1.25 7.73265 1.25C9.22842 1.25 10.441 2.46256 10.441 3.95833H5.02431ZM4.39921 8.125C4.85945 8.125 5.23254 7.7519 5.23254 7.29167C5.23254 6.83143 4.85945 6.45833 4.39921 6.45833C3.93897 6.45833 3.56588 6.83143 3.56588 7.29167C3.56588 7.7519 3.93897 8.125 4.39921 8.125ZM11.8992 7.29167C11.8992 7.7519 11.5261 8.125 11.0659 8.125C10.6056 8.125 10.2325 7.7519 10.2325 7.29167C10.2325 6.83143 10.6056 6.45833 11.0659 6.45833C11.5261 6.45833 11.8992 6.83143 11.8992 7.29167Z" fill="#1A1A1A" />
                                    </svg>
                                    <span className={styles.subscriptionCard__subtitle}>Продажи</span>
                                </div>

                                <div className={styles.subscriptionCard__limitsValues}>
                                    <span className={styles.subscriprionCard__limitsValue}>5 000 000 ₽</span>
                                    <span className={styles.subscriprionCard__limitsValue}>/</span>
                                    <span className={styles.subscriprionCard__limitsValue}>5 000 000 ₽</span>
                                </div>
                            </div>

                            <div className={styles.subscriprionCard__limitsProgressBar}>
                                <div className={`${styles.subscriprionCard__limitsProgressBarValue} ${styles.subscriprionCard__limitsProgressBarValue_expired}`} style={{ maxWidth: '100%' }}></div>
                            </div>
                        </li>
                        <li className={styles.subscriprionCard__limitsListItem}>
                            <div className={styles.subscriprionCard__limitsItemHeader}>
                                <div className={styles.subscriprionCard__limitsTitleWrapper}>
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.475024 5.45829L2.77899 1.61835C3.3814 0.614329 4.46642 0 5.6373 0H9.3627C10.5336 0 11.6186 0.614329 12.221 1.61835L14.525 5.45829C14.8358 5.97635 15 6.56913 15 7.17328V11.6667C15 13.5076 13.5076 15 11.6667 15H3.33333C1.49238 15 0 13.5076 0 11.6667V7.17328C0 6.56913 0.164193 5.97635 0.475024 5.45829ZM6.16593 5.83333H8.83422C10.105 5.83333 10.9083 4.46815 10.2911 3.35726C9.9972 2.82815 9.4395 2.5 8.83422 2.5H6.16593C5.56065 2.5 5.00295 2.82815 4.709 3.35726C4.09184 4.46815 4.89512 5.83333 6.16593 5.83333Z" fill="#8c8c8c" />
                                    </svg>
                                    <span className={styles.subscriptionCard__subtitle} style={{ color: '#8c8c8c' }}>Создание групп товаров</span>
                                </div>

                                <div className={styles.subscriptionCard__limitsValues}>
                                    <span className={styles.subscriprionCard__limitsValue} style={{ color: '#8c8c8c' }}>30</span>
                                    <span className={styles.subscriprionCard__limitsValue}>/</span>
                                    <span className={styles.subscriprionCard__limitsValue}>30</span>
                                </div>
                            </div>

                            <div className={styles.subscriprionCard__limitsProgressBar}>
                                <div className={styles.subscriprionCard__limitsProgressBarValue} style={{ maxWidth: '100%', backgroundColor: '#8c8c8c' }}></div>
                            </div>
                        </li>
                    </ul>
                </div>
            }

            <div className={styles.subscriprionCard__footer}>
                {item.active &&
                    <>
                        <HowToLink.Button
                            text='Что входит в текущий тариф?'
                            action={() => { setIsModalOpen(true) }}
                        />
                        <button className={`${styles.subscriprionCard__manageSubscriptionButton} ${styles.subscriprionCard__manageSubscriptionButton_deactivate}`}>
                            Отказаться от подписки
                        </button>
                    </>
                }
                {!item.active &&
                    <div className={styles.subscriprionCard__inactiveControls}>
                        <button className={styles.subscriprionCard__restoreButton}>
                            Восстановить подписку
                        </button>
                        <Link
                            to='/settings'
                            state={{ tab: 'tariffs'}}
                            className={styles.subscriprionCard__link}
                        >
                            Перейти к тарифам
                        </Link>
                    </div>
                }
            </div>

            {/* Tariff Details Modal */}
            <TariffDetailsModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tariffName={item.name}
                sectionsCount={7}
                apiShopsCount={1}
                salesLimit="1,5 млн рублей"
                salesNote="Без учета СПП и WB кошелька"
                sections={getTariffSections()}
            />
        </div>
    )
}
