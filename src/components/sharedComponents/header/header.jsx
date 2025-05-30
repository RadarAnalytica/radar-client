import { useState, useContext, useEffect } from 'react';
import styles from './header.module.css'
import Icon from './headerIcon/icon';
import { Popover } from 'antd';
import HeaderMenu from './headerMenu/headerMenu';
import HeaderAlerts from './headerAlerts/headerAlerts';
import AuthContext from '../../../service/AuthContext';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { fetchMessages } from '../../../redux/messages/messagesSlice';

const popoverOptions = {
    arrow: false,
    trigger: 'click',
    placement: 'bottomLeft'
}

const Header = ({ title = 'Radar Analytica', titlePrefix, children }) => {
    const dispatch = useAppDispatch();
    const { user, logout, authToken } = useContext(AuthContext)
    // стейт видимости поповера меню
    const [isMenuPopoverVisible, setIsMenuPopoverVisible] = useState(false);
    // сообщения
    const { messages } = useAppSelector((state) => state.messagesSlice);
    // получение и обновление сообщений
    useEffect(() => {
        let intervalId;
        if (!messages) {
            dispatch(fetchMessages(authToken));
        } else {
            intervalId = setInterval(() => {
                dispatch(fetchMessages(authToken));
            }, 60000);
        }
        return () => { intervalId && clearInterval(intervalId); }
    }, [authToken, messages]);

    useEffect(() => {
        dispatch(fetchMessages(authToken));
    }, []);

    // пропс для кнопки внутри меню
    const menuPopoverCloseHandler = () => {
        setIsMenuPopoverVisible(false);
    };
    // хэндлер видимости поповера меню
    const menuPopoverOpenHandler = (open) => {
        setIsMenuPopoverVisible(open);
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__titleBlock}>
                {typeof title === 'string' ?
                    <h1 className={styles.header__title}>
                        {titlePrefix &&
                            <span className={styles.header__titlePrefix}>{titlePrefix}{' / '}</span>
                        }
                        {title}
                    </h1>
                    :
                    <>{title}</>
                }
            </div>
            {children && children}
            {user &&
                <div className={styles.header__menu}>
                    <Popover
                        {...popoverOptions}
                        className={styles.header__popover}
                        content={<HeaderAlerts messages={messages} />}
                    >
                        <>
                            <Icon type='alert' counter={messages?.length} />
                        </>
                    </Popover>

                    <Popover
                        {...popoverOptions}
                        content={<HeaderMenu popoverCloseHandler={menuPopoverCloseHandler} logout={logout} />}
                        open={isMenuPopoverVisible}
                        onOpenChange={menuPopoverOpenHandler}
                        className={styles.header__popover}
                    >
                        <>
                            <Icon type='menu' />
                        </>
                    </Popover>
                </div>
            }
        </header>
    )

}

/**
 *     user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
 */
export default Header;