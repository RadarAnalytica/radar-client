import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../service/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './AdminPanel.module.css';
import AdminSideNav from '../components/AdminSideNav';
import TopNav from '../components/TopNav';
import UserDataTable from '../components/UserDataTable';
import { ServiceFunctions } from '../service/serviceFunctions';

const AdminPanel = () => {
  const { user, authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [allMessages, setAllMessages] = useState([]);
  const [uniqueEmails, setUniqueEmails] = useState([]);
  console.log('uniqueEmails', uniqueEmails);

  useEffect(() => {
    getAllSupportMessages(authToken);
 }, []);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const getAllSupportMessages = async (authToken) => {
    try {
      const response = await ServiceFunctions.getAllSupportMessages(authToken);
      setAllMessages(response);
      const emails = getUniqueEmails(response);
      setUniqueEmails(emails);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const getUniqueEmails = (messages) => {
    return [...new Set(messages.map(message => message.email))];
  };

  return (
    <div className={styles.pageWrapper}>
      <AdminSideNav />
      <div className={styles.scrollableContent}>
        <TopNav title={'Админ панель'} />
        <div className='container dash-container'>
          <UserDataTable data={uniqueEmails} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
