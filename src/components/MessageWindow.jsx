import React, { useState, useEffect, useRef } from 'react';
import styles from './MessageWindow.module.css';
import radarIcon from '../assets/radarIconMessage.svg';
import serchIcon from '../assets/searchIcon.svg';
import attachFileIcon from '../assets/attachIcon.svg';
import ImageMasonry from './ImageMasonry';
import { useSelector } from 'react-redux';
import ImagePreview from './ImagePreview';
import Modal from 'react-bootstrap/Modal';

const MessageWindow = ({isNoHide}) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('')

  const handleImageClick = (image, event) => {
    if (event && event.type === 'contextmenu') {
      event.preventDefault();
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
      });
    } else {
      setSelectedImages((prev) =>
        prev.includes(image)
          ? prev.filter((img) => img !== image)
          : [...prev, image]
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenu && !event.target.closest('.contextMenu')) {
        setContextMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu]);

  const handleDownloadImages = () => {
    selectedImages.forEach((imageUrl, index) => {
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `image-${index + 1}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        });
    });
    setContextMenu(null);
  };

  const isOpenSupportWindow = useSelector(
    (state) => state.supportWindowSlice?.isOpenSupportWindow
  );
  const url1 =
    'https://images.unsplash.com/photo-1727294810027-220b285828e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8';
  const url2 =
    'https://cdn.jpg.wtf/futurico/46/a0/1727335730-46a0a489235c7089de08802158ec6256.jpeg?w=700';
  const url3 =
    'https://cdn.jpg.wtf/futurico/75/67/1727331055-7567f0dd6bde2165d9d54ae61489dffb.jpeg?w=700';
  const url4 =
    'https://cdn.jpg.wtf/futurico/ca/d3/1727121512-cad341337e1018385ab54118e61ccbee.png';
  const url5 =
    'https://cdn.jpg.wtf/futurico/cb/67/1727121507-cb673c03d211b42140f13f267d6e0d3b.png';
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      text: 'Здравствуйте, чем я могу помочь?',
      type: 'bot',
      images: [`${url1}`],
    },
    {
      id: Date.now(),
      text: 'Hello, how can I help you today?',
      type: 'user',
      images: [`${url5}`, `${url2}`, `${url3}`, `${url4}`],
    },
    { id: Date.now(), text: 'Спасибо за обращение', type: 'bot', images: [] },
  ]);

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
      setMessages([
        ...messages,
        { id: Date.now(), text: newMessage, type: 'user' },
      ]);
      setNewMessage('');
    }
  };

  const handleAttachClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg,.jpeg,.png,.webp';
    input.multiple = true; // Allow multiple file selection
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
       const validFiles = [];
    const invalidSizeFiles = [];
    const invalidFormatFiles = [];

    files.forEach(file => {
      const isValidFormat = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB in bytes

      if (isValidFormat && isValidSize) {
        validFiles.push(file);
      } else if (!isValidSize) {
        invalidSizeFiles.push(file.name);
      } else {
        invalidFormatFiles.push(file.name);
      }
    });
    if (files.length > 4) {
      setShow(true);
          setError('Вы можете выбрать максимум 4 изображения');
    }
    if (invalidSizeFiles.length > 0) {
      setShow(true);
      setError(`Файлы привышают лимит 5MB: ${invalidSizeFiles.join(', ')}. `);
    }
    if (invalidFormatFiles.length > 0) {
      setShow(true);
      setError(`Файлы не корректного формата (jpg, jpeg, png, webp): ${invalidSizeFiles.join(', ')}. `);
    }
    if (validFiles.length > 0) {
      setSelectedImages(validFiles);
    }
     };
    input.click();
  };

  const handleClose = () => setShow(false);

  const handleAddToCustomLocation = () => {
    setContextMenu(null);
    setPreviewMode(true);
  };

  const warningIcon = require('../assets/warning.png')

  return (
    <div
      className={
        isOpenSupportWindow ? styles.container : isNoHide ? styles.containerNoHide : styles.containerHidden
      }
    >
      <div className={styles.header}>
        <img src={radarIcon} alt='Logo' className={styles.logo} />
        <div className={styles.headerText}>
          <span className={styles.title}>Поддержка Радара</span>
          <span className={styles.subtitle}>Поддержим в любое время</span>
        </div>
        <div className={styles.searchIcon}>
          <img src={serchIcon} alt='Search' />
        </div>
      </div>
      <div className={styles.messageListWrapper}>
        <div className={styles.messageList}>
          {messages.map((message) => (
            <>
              <div
                key={message.id}
                className={
                  message.type === 'user'
                    ? styles.userMessage
                    : styles.supportMessage
                }
              >
                {message.images && message.images.length > 0 && (
                  <ImageMasonry
                    images={message.images}
                    onImageClick={handleImageClick}
                    selectedImages={selectedImages}
                  />
                )}
                {message.text}
              </div>
              <span
                className={
                  message.type === 'user'
                    ? styles.messageTimeUser
                    : styles.messageTimeBot
                }
              >
                {new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </>
          ))}
        </div>
      </div>
      <div className={styles.inputArea}>
        <img
          src={attachFileIcon}
          alt='Attach file'
          onClick={handleAttachClick}
          style={{ cursor: 'pointer' }}
        />
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.input}
          placeholder='Напишите сообщение'
        />
        {selectedImage && (
          <div className={styles.imagePreview}>
            <img src={URL.createObjectURL(selectedImage)} alt='Preview' />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <button onClick={handleSendMessage} className={styles.sendButton}>
          &#8594;
        </button>
      </div>
      {contextMenu && (
        <div
          className={`${styles.contextMenu} contextMenu`}
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button onClick={handleDownloadImages}>Скачать</button>
          <button onClick={handleAddToCustomLocation}>Посмотреть</button>
        </div>
      )}
      {previewMode && (
        <ImagePreview
          images={selectedImages}
          onClose={() => setPreviewMode(false)}
        />
      )}
       <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <div>
              <div className='d-flex gap-3 mb-2 mt-2 align-items-center'>
                <img src={warningIcon} alt='' style={{ height: '3vh' }} />
                <p className='fw-bold mb-0'>Ошибка!</p>
              </div>
              <p className='fs-6 mb-1' style={{ fontWeight: 600 }}>
                {error}
              </p>
            </div>
          </Modal.Header>
        </Modal>
    </div>
  );
};

export default MessageWindow;
