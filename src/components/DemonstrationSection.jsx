import exclamation from '../assets/exclamation.svg';
import styles from './DemonstrationSection.module.css';
import { useNavigate } from 'react-router-dom';

const DemonstrationSection = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.demonstrationBox}>
      <div className={styles.titleBox}>
        <img src={exclamation} alt='exclamation' />
        <span className={styles.demonstrationTextTitle}>
          Вы смотрите на демонстрацию страницы
        </span>
      </div>
      <div className={styles.demonstrationTextBox}>
        <span className={styles.demonstrationText}>
          Для того, чтобы данные появились, загрузите отчеты на странице{' '}
          <span className={styles.textBold}>Главная</span>
        </span>
      </div>
      <div>
        <button
          className={styles.buttonNavigate}
          onClick={() => navigate('/report-main')}
        >
          На главную
        </button>
      </div>
    </div>
  );
};

export default DemonstrationSection;
