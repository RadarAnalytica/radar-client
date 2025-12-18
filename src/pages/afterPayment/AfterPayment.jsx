import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import './styles.css';
import styles from './AfterPayment.module.css';
import AuthContext from '../../service/AuthContext';
import { URL } from '../../service/config';
import { PaymentStatus } from '../../widgets';
import { ExternalHeader, ExternalFooter } from '../../widgets';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import { reportError } from '@/service/errorReporting/errorReporter';


// Типы для пропсов компонента
// interface AfterPaymentProps {
//   devMode?: boolean;
// }

// Временная типизация для AuthContext
// interface AuthContextType {
//   authToken?: string;
//   user?: any;
//   [key: string]: any;
// }

const AfterPayment = ({ devMode }) => {
  const { authToken, user, refreshSubscriprionCheck } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState(location?.state?.paymentStatus && location?.state?.paymentStatus === 'success' ? true : false);
  const [error, setError] = useState('Оплата прошла успешно, но нам не удалось обновить ваши данные. Пожалуйста, перезагрузите страницу!')


  const refreshUserToken = async () => {
    const res = await refreshSubscriprionCheck()
    if (res && res?.success) {
      const timeout = setTimeout(() => {
        navigate('/main')
      }, 4000)
    } else {
      reportError({
        error_text: 'Не удалось обновить токен пользователя после оплаты - /after-payment',
        stack_trace: null,
        user: user ? { id: user?.id, email: user?.email } : null,
      });
      setError('Оплата прошла успешно, но нам не удалось обновить ваши данные. Пожалуйста, перезагрузите страницу!')
    }

  };

  useEffect(() => {
    //refreshUser
    let timeout;
    if (!status && !devMode) {
      timeout = setTimeout(() => {
        navigate('/main');
      }, 4000);
    }
    if (status && !devMode) {
      refreshUserToken()
    }
    return () => {timeout && clearTimeout(timeout); };
  }, [status]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        navigate('/main');
      }, 4000);
    }
    return () => {timeout && clearTimeout(timeout); };
  }, [error]);

  return (
    <main className={styles.page}>
      <div className={styles.page__wrapper}>
        <ExternalHeader />
        <div className={styles.page__content}>
          {status && <PaymentStatus.Success />}
          {!status && <PaymentStatus.Fail />}
        </div>
      </div>
      <ExternalFooter />
      {devMode &&
        <button className={styles.switcher} onClick={() => devMode && setStatus(!status)}>Switcher</button>
      }
      <ErrorModal
        footer={null}
        open={error}
        message={error}
      />
    </main>
  );
};

export default AfterPayment;
