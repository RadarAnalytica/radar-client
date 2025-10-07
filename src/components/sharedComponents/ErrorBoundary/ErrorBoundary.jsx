import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorBoundary.module.css';
import logo from '@/assets/logo.png';
import cover from '@/assets/mobile_plug_cover.png';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    this.enabled = true; // ручное включение/отключение ErrorBoundary
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние так, чтобы следующий рендер показал fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Логируем ошибку в консоль для отладки
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError && this.enabled) {
      // Рендерим fallback UI
      return (
        <div className={styles.errorBoundary}>
          <a href='/main' className={styles.errorBoundary__mainLink}>
            <img src={logo} alt='На главную' />
          </a>
          <p className={styles.errorBoundary__title}>
            Произошла ошибка в приложении
            <span> «Радар–Аналитика»</span>
          </p>
          <div className={styles.errorBoundary__coverWrapper}>
            <img src={cover} alt='' />
          </div>
          <button
            className={styles.errorBoundary__retryButton}
            onClick={() => window.location.reload()}
          >
            Попробовать снова
          </button>
          <div className={styles.errorBoundary__telegram}>
            <p className={styles.errorBoundary__telegramText}>
              Если проблема повторяется, обратитесь в нашу поддержку:
            </p>
            <a
              href="https://t.me/radar_analytica_support"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.errorBoundary__telegramLink}
            >
              @radar_analytica_support
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
