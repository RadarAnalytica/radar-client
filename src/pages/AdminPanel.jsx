import React, { useContext, useEffect, useState } from 'react';
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
  const [uniqueEmails, setUniqueEmails] = useState([]);
  const [unreadMessageCounts, setUnreadMessageCounts] = useState({});

  const getAllSupportMessages = async (authToken) => {
    try {
      const response = await ServiceFunctions.getAllSupportMessages(authToken);
      const emails = getUniqueEmails(response);
      setUniqueEmails(emails);

      // Calculate unread messages per user
      const messageCounts = emails.reduce((acc, email) => {
        const unreadCount = response.filter(
          (message) => message.email === email && message.status === false
        ).length;
        return { ...acc, [email]: unreadCount };
      }, {});

      setUnreadMessageCounts(messageCounts);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const getUniqueEmails = (messages) => {
    return [...new Set(messages.map((message) => message.email))];
  };

  useEffect(() => {
    if (user.role === 'admin') {
      getAllSupportMessages(authToken);
    }
  }, []);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  // Create enhanced data for UserDataTable
  const emailsWithUnreadCounts = uniqueEmails.map((email) => ({
    email,
    unreadCount: unreadMessageCounts[email] || 0,
  }));

  return (
    <div className={styles.pageWrapper}>
      <AdminSideNav />
      <div className={styles.scrollableContent}>
        <TopNav title={'Админ панель'} />
        <div className='container dash-container'>
          <UserDataTable data={emailsWithUnreadCounts} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
