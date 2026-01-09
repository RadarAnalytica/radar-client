import { useState } from 'react'
import styles from './headerAlerts.module.css';
import NoteMessge from '../../../../pages/images/somethingWrongIcon.png';
import RecommendationMessge from '../../../../pages/images/recommendationsIcon.png';
import OkMessage from '../../../../pages/images/okIcon.png';
import CloseIcon from '../../../../assets/CloseIcon.svg';
import { useAppDispatch } from '../../../../redux/hooks';
import { fetchMessages } from '../../../../redux/messages/messagesSlice';
import { URL } from '../../../../service/config';
import moment from 'moment/moment';
import 'moment/locale/ru';
import { useContext } from 'react';
import AuthContext from '../../../../service/AuthContext';
import { Segmented, ConfigProvider } from 'antd';

const segmentedTheme = {
    token: {
        fontSize: 14,
        fontWeight: 500,
    },
    components: {
        Segmented: {
            itemActiveBg: '#5329FF1A',
            itemSelectedBg: '#5329FF1A',
            trackBg: 'transparent',
            trackPadding: 0,
            itemHoverBg: '#5329FF10',
            itemColor: '#1A1A1A80',
            itemSelectedColor: '#1A1A1A',
            itemHoverColor: '#1A1A1A',
        }
    }
}

const HeaderAlerts = ({ messages, closeHandler }) => {

    const [tabState, setTabState] = useState('Все')


    const sortedMessages = messages ? [...messages].sort((a, b) => {
        const aDate = moment(a.created_at);
        const bDate = moment(b.created_at);
        if (aDate > bDate) {
            return -1;
        } else {
            return 1;
        }
    }) : undefined;
    const dispatch = useAppDispatch();
    const { authToken } = useContext(AuthContext);

    const onDeleteMsg = async (messageId) => {
        try {
            await fetch(`${URL}/api/msg/${messageId}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: 'JWT ' + authToken,
                },
            });
            dispatch(fetchMessages(authToken));
        } catch (error) {
            console.error(error);
        }
        return;
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modal__header}>
                <button className={styles.modal__closeButton} onClick={closeHandler}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fillOpacity="0.5" />
                    </svg>
                </button>
                <p className={styles.modal__title}>Уведомления</p>
                <div
                    className={styles.modal__controls}
                    style={{ height: 32 }} // <---- Temporary thing. To delete it when code below will be uncommented
                >
                    {/* <ConfigProvider
                        theme={segmentedTheme}
                    >
                        <Segmented
                            value={tabState}
                            options={['Все', 'Непрочитанные']}
                            onChange={setTabState}
                        />
                    </ConfigProvider>

                    <button className={styles.modal__readAllButton}>
                        Прочитать все
                    </button> */}
                </div>
                {/* <div className={styles.list__blur}></div> */}
            </div>
            <ul className={styles.list}>

                {sortedMessages && sortedMessages.length > 0 && sortedMessages.map(m => {
                    //const icon = m.type === 'note' ? OkMessage : m.type === 'recommendation' ? RecommendationMessge : m.type === 'warning' ? NoteMessge : RecommendationMessge;
                    const isNew = m?.unread

                    return (
                        <MessageItem
                            key={m.id}
                            m={m}
                            isNew={isNew}
                            onDeleteMsg={onDeleteMsg}
                        />
                    )
                }
                )}

                {(!sortedMessages || (sortedMessages && sortedMessages.length === 0)) &&
                    <div className={styles.list__noMessages}>
                        <img src={OkMessage} alt='' width={20} height={20} />
                        <p className={styles.list__title}>Нет новых сообщений!</p>
                    </div>
                }
                {/* <div className={styles.list__blur_bottom}></div> */}
            </ul>
        </div>
    );
};


const MessageItem = ({
    isNew,
    m,
    onDeleteMsg
}) => {

    const [isMessageOpen, setIsMessageOpen] = useState(false)

    return (
        <li
            id={`message_id_${m.id}`}
            className={isNew ? `${styles.list__item} ${styles.list__item_new}` : styles.list__item}
            onClick={() => setIsMessageOpen(!isMessageOpen)}
        >
            {isNew &&
                <span className={styles.list__newLabel}>Новое</span>
            }
            <div className={isMessageOpen ? styles.list__itemBody : styles.list__itemBody_short}>
                {m.text}
            </div>
            <div className={styles.list__itemHeader}>
                {/* <div className={styles.list__itemHeaderWrapper}>
                <img src={icon} alt='' />
                <p className={styles.list__title}>{m.title}</p>
            </div> */}
                <div className={`${styles.list__itemHeaderWrapper} ${styles.list__itemHeaderWrapper_end}`}>
                    <p className={styles.list__text}>{moment(m.created_at).locale('ru').format('D MMMM, HH:mm')}</p>
                </div>
            </div>

            <button
                className={styles.list__deleteButton}
                onClick={() => {
                    // const item = document.querySelector(`#message_id_${m.id}`);
                    // if (item) {
                    //     //item.style.transition = 'max-height .3s'
                    //     item.style.opacity = '0';
                    //     item.style.maxHeight = '0px';


                    // }
                    onDeleteMsg(m.id);
                }}
            >
                <img src={CloseIcon} alt='' width={10} height={10} />
            </button>
        </li>
    )
}


export default HeaderAlerts;

/**
 * created_at
:
"2024-09-30 14:07:41.138966"
id
:
159
text
:
"в целях уточнения расчетов отдельных параметров по магазину Test (no collect) установите себестоимость продуктов"
title
:
"Установка себестоимости"
type
:
"recommendation"
 */
