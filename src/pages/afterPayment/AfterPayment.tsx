import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import styles from './AfterPayment.module.css';
import AuthContext from '../../service/AuthContext'
import { URL } from '../../service/config';
import { PaymentStatus } from '../../widgets';
import { ExternalHeader, ExternalFooter } from '../../widgets';


// Типы для пропсов компонента
interface AfterPaymentProps {
  devMode?: boolean;
}

// Временная типизация для AuthContext
interface AuthContextType {
  authToken?: string;
  user?: any;
  [key: string]: any;
}

const AfterPayment: React.FC<AfterPaymentProps> = ({ devMode }) => {
  const { authToken, user } = useContext(AuthContext as React.Context<AuthContextType>);
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState(location?.state?.paymentStatus && location?.state?.paymentStatus === 'success' ? true : false)

  //const status = location?.state?.paymentStatus && location?.state?.paymentStatus === 'success' ? true : false;

  const refreshUserToken = async () => {
    try {
      const response = await fetch(`${URL}/api/user/refresh`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'JWT ' + authToken,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        return data.token;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      refreshUserToken().then((res) => {
        !devMode && navigate('/main')
      })
    }, 5000);

    return () => { clearTimeout(timeout) }
  }, []);

  const tryAgain = () => {
    navigate('/main')
  };

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
    </main>
  )
};

export default AfterPayment;
