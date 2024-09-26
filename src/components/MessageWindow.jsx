import React, { useState, useEffect } from 'react';
import styles from './MessageWindow.module.css';
import radarIcon from '../assets/radarIconMessage.svg';
import serchIcon from '../assets/searchIcon.svg';
import attachFileIcon from '../assets/attachIcon.svg';
import ImageMasonry from './ImageMasonry';
import { useSelector } from 'react-redux';
import { openSupportWindow, closeSupportWindow } from '../redux/supportWindow/supportWindowSlice';

const MessageWindow = () => {

  const isOpenSupportWindow = useSelector((state) => state.supportWindowSlice?.isOpenSupportWindow);
  const url1 = 'https://images.unsplash.com/photo-1727294810027-220b285828e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8';
  const url2 = 'https://cdn.jpg.wtf/futurico/46/a0/1727335730-46a0a489235c7089de08802158ec6256.jpeg?w=700';
  const url3 = 'https://cdn.jpg.wtf/futurico/75/67/1727331055-7567f0dd6bde2165d9d54ae61489dffb.jpeg?w=700';
  const url4 = 'https://cdn.jpg.wtf/futurico/75/67/1727331055-7567f0dd6bde2165d9d54ae61489dffb.jpeg?w=700';
  const [messages, setMessages] = useState([
    {id: Date.now(), text: 'Здравствуйте, чем я могу помочь?', type: 'bot', images: [`${url1}`, `${url3}`]},
    {id: Date.now(), text: 'Hello, how can I help you today?', type: 'user', images: [`${url1}`, `${url2}`, `${url3}`, `${url4}`, `${url4}`]},
    {id: Date.now(), text: 'Спасибо за обращение', type: 'bot', images: []},
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://api.example.com/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage, type: 'user' }]);
      setNewMessage('');
    }
  };



  return (
    <div className={isOpenSupportWindow ? styles.container : styles.containerHidden}>
      <div className={styles.header}>
        <img src={radarIcon} alt="Logo" className={styles.logo} />
        <div className={styles.headerText}>
          <span className={styles.title}>Поддержка Радара</span>
          <span className={styles.subtitle}>Поддержим в любое время</span>
        </div>
        <div className={styles.searchIcon}>
          <img src={serchIcon} alt="Search" />
        </div>
      </div>
      <div className={styles.messageListWrapper}>
      <div className={styles.messageList}>
        {messages.map((message) => (
          <>
          <div key={message.id} className={message.type === 'user' ? styles.userMessage : styles.supportMessage}>
            {message.text}
            {message.images && message.images.length > 0 && (
                <ImageMasonry images={message.images} />
              )}
            {/* {message.images && message.images.length > 0 && (
          message.images.length <= 2 ? (
            <div className={styles.simpleImageLayout}>
              {message.images.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} className={styles.messageImage} />
              ))}
            </div>
          ) : (
            <ImageMasonry images={message.images} />
          )
        )} */}
          </div>
          <span className={message.type === 'user' ? styles.messageTimeUser : styles.messageTimeBot}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </>
        ))}
      </div>
      </div>
      <div className={styles.inputArea}>
        <img src={attachFileIcon} alt="Attach file"/>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.input}
          placeholder="Напишите сообщение"
        />
        <button onClick={handleSendMessage} className={styles.sendButton}>
        &#8594;
        </button>
      </div>
    </div>
  );
};

export default MessageWindow;