import React from 'react';
import styles from './AdminPanel.module.css';
import AdminSideNav from '../components/AdminSideNav';
import TopNav from '../components/TopNav';
import UserDataTable from '../components/UserDataTable';

const AdminPanel = () => {
  const data = [
    {
      id: 1,
      email: 'test@radar.ru',
      name: 'Test',
      typeOfSubscribe: 'Smart',
      dateOfSubscribe: '01.01.2022',
      isShopActive: true,
      shopsConnected: 3,
      supportMessges: [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.',
          date: '01.01.2022',
          isRead: true,
        },
        {
          id: 2,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.',
          date: '01.01.2022',
          isRead: true,
        },
      ],
    },
    {
        id: 2,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
  ];
  return (
    <div className={styles.pageWrapper}>
      <AdminSideNav />
      <div className='container'>
        <TopNav title={'Админ панель'} />
        <UserDataTable data={data} />
      </div>
    </div>
  );
};

export default AdminPanel;
