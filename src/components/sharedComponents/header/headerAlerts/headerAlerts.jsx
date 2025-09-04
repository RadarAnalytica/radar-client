import styles from './headerAlerts.module.css'
import NoteMessge from '../../../../pages/images/somethingWrongIcon.png';
import RecommendationMessge from '../../../../pages/images/recommendationsIcon.png';
import OkMessage from '../../../../pages/images/okIcon.png';
import CloseIcon from '../../../../assets/CloseIcon.svg';
import { useAppDispatch } from '../../../../redux/hooks';
import { fetchMessages } from '../../../../redux/messages/messagesSlice';
import { URL } from '../../../../service/config';
import moment from 'moment/moment';
import { useContext } from 'react';
import AuthContext from '../../../../service/AuthContext';

const HeaderAlerts = ({ messages }) => {
    const sortedMessages = messages ? [...messages].sort((a,b) => {
        const aDate = moment(a.created_at);
        const bDate = moment(b.created_at);
        if (aDate > bDate) {
            return -1
        } else {
            return 1
        }
    }) : undefined;
    const dispatch = useAppDispatch();
    const { authToken } = useContext(AuthContext)

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
        <ul className={styles.list}>
            <div className={styles.list__blur}></div>
            {sortedMessages && sortedMessages.length > 0 && sortedMessages.map(m => {
                const icon = m.type === 'note' ? OkMessage : m.type === 'recommendation' ? RecommendationMessge : m.type === 'warning' ? NoteMessge : RecommendationMessge;
                return (
                    <li key={m.id} id={`message_id_${m.id}`} className={styles.list__item}>
                        <div className={styles.list__itemHeader}>
                            <div className={styles.list__itemHeaderWrapper}>
                                <img src={icon} alt='' />
                                <p className={styles.list__title}>{m.title}</p>
                            </div>
                            <div className={`${styles.list__itemHeaderWrapper} ${styles.list__itemHeaderWrapper_end}`}>
                                <p className={styles.list__text}>{moment(m.created_at).format('DD.MM.YYYY')}</p>
                                <button
                                    className={styles.list__deleteButton}
                                    onClick={() => { 
                                        const item = document.querySelector(`#message_id_${m.id}`)
                                        if (item) {
                                            //item.style.transition = 'max-height .3s'
                                            item.style.opacity = '0'
                                            item.style.maxHeight = '0px'
                                           
                                            
                                        }
                                        onDeleteMsg(m.id) 
                                    }}
                                >
                                    <img src={CloseIcon} alt='' />
                                </button>
                            </div>
                        </div>
                        <div className={styles.list__itemBody}>
                            {m.text}
                        </div>
                    </li>
                )
            }
            )}

            {(!!!sortedMessages || (sortedMessages && sortedMessages.length === 0)) &&
            <div className={styles.list__noMessages}>
                 <img src={OkMessage} alt='' />
                 <p className={styles.list__title}>Нет новых сообщений!</p>
            </div>
            }
            <div className={styles.list__blur_bottom}></div>
        </ul>
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