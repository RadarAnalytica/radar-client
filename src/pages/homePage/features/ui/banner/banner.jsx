import { useContext, useState } from 'react';
import styles from './banner.module.css';
import pic from './assets/board.png';
import tgs from './assets/tgs.png';
import { Link } from 'react-router-dom';
import { URL } from '../../../../../service/config';
import AuthContext from '../../../../../service/AuthContext';
import ErrorModal from '../../../../../components/sharedComponents/modals/errorModal/errorModal';
import SuccessModal from '../../../../../components/sharedComponents/modals/successModal/successModal';

const initRequestState = {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: ''
};

const Top = () => {
    const [reqState, setReqState] = useState(initRequestState);
    const { authToken } = useContext(AuthContext);

    const supportRequestHandler = async () => {
        setReqState({...initRequestState, isLoading: true});
        try {
            let res = await fetch(`${URL}/api/admin/webhook/consult`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'JWT ' + authToken
                }
            });
            if (!res.ok) {
                setReqState({...initRequestState, isError: true, message: 'Не удалось отправить запрос2!'});
                return;
            }

            setReqState({...initRequestState, isSuccess: true});
        } catch {
            setReqState({...initRequestState, isError: true, message: 'Не удалось отправить запрос1!'});
        }
    };

    return (
        <div className={styles.topWrapper}>
            <div className={styles.textWrapper}>
                <p className={styles.title}>Не разобрались с платформой или не уверены, с чего начать?</p>
                <p className={styles.text}>Проведём персональную демонстрацию Радар Аналитики в течение часа после обращения. Оставьте заявку.</p>
            </div>

            <div className={styles.buttonWrapper}>
                <button
                    className={styles.button}
                    onClick={() => {
                        if (!reqState.isLoading) {
                            supportRequestHandler();
                        }
                    }}
                    disabled={reqState.isLoading}
                >
                    Получить консультацию
                </button>
                <img src={pic} alt='' width={124} height={124} />
            </div>

            <ErrorModal
                open={reqState.isError}
                message={reqState.message}
                footer={null}
                onOk={() => setReqState(initRequestState)}
                onClose={() => setReqState(initRequestState)}
                onCancel={() => setReqState(initRequestState)}
            />
            <SuccessModal
                open={reqState.isSuccess}
                message={'Запрос успешно отправлен! Мы свяжемся c Вами в ближайшее время.'}
                footer={null}
                onOk={() => setReqState(initRequestState)}
                onClose={() => setReqState(initRequestState)}
                onCancel={() => setReqState(initRequestState)}
            />
        </div>
    );
};

const Bottom = () => {
    return (
        <div className={styles.bottomWrapper}>
            <div className={styles.bottomContainer}>
                <div className={styles.bottomImgWrapper}>
                    <img src={tgs} alt='' />
                </div>
                <div className={`${styles.textWrapper} ${styles.textWrapperBottom}`}>
                    <p className={styles.title}>Подписывайтесь в Telegram</p>
                    <p className={styles.text}>Обзор e-com новостей и гайды по сервису</p>
                </div>
            </div>
            <div className={`${styles.buttonWrapper} ${styles.buttonWrapperBottom}`}>
                <Link className={styles.button} to='https://t.me/radar_analytica' target='_blank'>
                    Перейти
                </Link>
            </div>
        </div>
    );
};


export const Banner = Object.assign({ Top, Bottom });
