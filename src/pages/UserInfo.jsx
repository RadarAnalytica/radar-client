import styles from './UserInfo.module.css';
import AdminSideNav from '../components/AdminSideNav';
import TopNav from '../components/TopNav';
import radarIcon from '../assets/radarIconMessage.svg';
import MessageWindow from '../components/MessageWindow';

const UserInfo = () => {
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
          images: [],
          type: 'user',
        },
        {
          id: 2,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.',
          date: '01.01.2022',
          isRead: true,
          images: [],
          type: 'bot',
        },
        {
            id: 3,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.',
            date: '01.01.2022',
            isRead: true,
            images: [],
            type: 'user',
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
      <div className={styles.scrollableContent}>
        <TopNav title={'Админ панель'} />
        <div className='container dash-container'>
        <div className={styles.aboutUser}>
          <div className={styles.userInfowrapper}>
            <div className={styles.userItemMainTitle}>Общая информация</div>
            <div className={styles.userItemWrapper}>
              <div className={styles.userItemTitle}>Почта</div>
              <div>{data[0].email}</div>
            </div>
            <div className={styles.userItemWrapper}>
              <div className={styles.userItemTitle}>Имя</div>
              <div>{data[0].name}</div>
            </div>
          </div>
          <div className={styles.userInfowrapper}>
            <div className={styles.userItemMainTitle}>Подписки</div>
            <div className={styles.userItemWrapper}>
              <div className={styles.userItemTitle}>Тип подписки</div>
              <div>{data[0].typeOfSubscribe}</div>
            </div>
            <div className={styles.userItemWrapper}>
              <div className={styles.userItemTitle}>Срок подписки</div>
              <div>{data[0].dateOfSubscribe}</div>
            </div>
          </div>
          <div className={styles.userInfowrapper}>
            <div className={styles.userItemMainTitle}>Магазины</div>
            <div className={styles.userItemWrapper}>
              <div className={styles.userItemTitle}>Подключенные магазины</div>
              <div>{data[0].isShopActive ? 'ДА' : 'НЕТ'}</div>
            </div>
            <div className={styles.userItemWrapper}>
              <div className={styles.userItemTitle}>Кол-во подключенных магазинов</div>
              <div>{data[0].shopsConnected}</div>
            </div>
          </div>
        </div>
        <div className={styles.containerBox}>
        <MessageWindow isNoHide={true}/>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
