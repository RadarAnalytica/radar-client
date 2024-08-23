import React, { useContext } from 'react';
import NoteMessge from '../pages/images/somethingWrongIcon.png';
import RecommendationMessge from '../pages/images/recommendationsIcon.png';
import OkMessage from '../pages/images/okIcon.png';
import CloseIcon from '../assets/CloseIcon.svg';
import { URL } from '../service/config';
import { useAppDispatch } from '../redux/hooks';
import { fetchMessages } from '../redux/messages/messagesSlice';
import AuthContext from '../service/AuthContext';
import { useSelector } from 'react-redux';
import '../App.css';

export const MessagesDropdown = () => {
  const messages = useSelector((state) => state.messagesSlice.messages);
  const { authToken } = useContext(AuthContext);

  const dispatch = useAppDispatch();
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
    <span className='error-popup-container scrollable-dropdown'>
      <span className='message-popup-table'>
        <span className='message-popup-body'>
          {messages?.map((msg) => (
            <span key={msg.id} className='error-notifications'>
              <span className='message-header'>
                <span className='message-icon-text'>
                  {msg.type === 'note' && (
                    <img src={OkMessage} alt='OkMessge' />
                  )}
                  {msg.type === 'recommendation' && (
                    <img
                      src={RecommendationMessge}
                      alt='recommendationMessge'
                    />
                  )}
                  {msg.type === 'warning' && (
                    <img src={NoteMessge} alt='noteMessge' />
                  )}
                  <p className='message-title'>{msg.title}</p>
                </span>
                <span className='message-date-close'>
                  <span className='message-date'>
                    {(() => {
                      const date = new Date(msg.created_at);
                      const now = new Date();
                      const diff = (now.getTime() - date.getTime()) / 1000;
                      if (diff < 60) {
                        return `${Math.ceil(diff)} сек. назад`;
                      } else if (diff < 3600) {
                        return `${Math.ceil(diff / 60)} мин. назад`;
                      } else if (diff < 7200) {
                        return `${Math.ceil(diff / 3600)} час. назад`;
                      } else {
                        return date.toLocaleString('ru', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        });
                      }
                    })()}
                  </span>

                  <img
                    src={CloseIcon}
                    alt='closeIcon'
                    onClick={() => onDeleteMsg(msg.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </span>
              </span>
              <span className='message-text'>{msg.text}</span>
            </span>
          ))}
        </span>
      </span>
    </span>
  );
};
