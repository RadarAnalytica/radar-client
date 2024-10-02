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
      {
        id: 3,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 4,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 5,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 6,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 7,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 8,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 9,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 10,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 11,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 12,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 13,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 14,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 15,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 16,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 17,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 18,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 19,
        email: 'modinsv@yandex.ru',
        name: 'Modin',
        typeOfSubscribe: 'Smart',
        dateOfSubscribe: '01.01.2022',
        isShopActive: true,
        shopsConnected: 1,
      },
      {
        id: 20,
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
      <div className={styles.scrollableContent}>
      <div>
        <TopNav title={'Админ панель'} />
        <div className='container dash-container'>
        <UserDataTable data={data} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminPanel;
