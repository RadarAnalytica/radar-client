import styles from './OnboardingWidget.module.css';
import { Link } from 'react-router-dom';

export const OnboardingWidget = () => {
    return (
        <div className={`${styles.onboardingWidget}`}>
            <div className={styles.onboardingWidget__header}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#5329FF" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.9171 19.9999C18.9308 20 18.9445 20 18.9583 20C22.295 20 25 17.3137 25 14C25 10.6863 22.295 8 18.9583 8C15.9646 8 13.4795 10.1623 13.0001 13C13.0001 13 13.0001 13 13.0001 13C9.68639 13 7 15.6863 7 19C7 22.3137 9.68629 25 13 25C15.973 25 18.441 22.8376 18.9171 19.9999ZM18.9795 18.5C21.4723 18.4886 23.4896 16.4783 23.4896 14C23.4896 11.5147 21.4608 9.5 18.9583 9.5C16.7345 9.5 14.8848 11.0909 14.5004 13.1891C16.9322 13.8152 18.7672 15.9275 18.9795 18.5ZM17.5 19C17.5 21.4853 15.4853 23.5 13 23.5C10.5147 23.5 8.5 21.4853 8.5 19C8.5 16.5147 10.5147 14.5 13 14.5C15.4853 14.5 17.5 16.5147 17.5 19Z" fill="#F7F6FE" />
                </svg>


                <div className={styles.onboardingWidget__textWrapper}>
                    <p className={`${styles.onboardingWidget__title} mb-0`}>Вы успешно активировали тестовый период!</p>
                    <p className={styles.onboardingWidget__text}>
                    Чтобы воспользоваться основным функционалом нашей системы, подключите ваш API токен.
                    </p>
                </div>
            </div>
            <Link 
                to='/onboarding'
                className={styles.onboardingWidget__actionButton}
            >
            Подключить API токен
            </Link>
        </div>
    );
};