import React, { useState, useEffect, useRef, useContext } from 'react';
import styles from './MessageWindow.module.css';
import radarIcon from '../assets/radarIconMessage.svg';
import attachFileIcon from '../assets/attachIcon.svg';
import ImageMasonry from './ImageMasonry';
import { useSelector, useDispatch } from 'react-redux';
import ImagePreview from './ImagePreview';
import Modal from 'react-bootstrap/Modal';
import sendButton from '../assets/SendButton.svg';
import { closeSupportWindow } from '../redux/supportWindow/supportWindowSlice';
import { ServiceFunctions } from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';
import warningIcon from '../assets/warning.png';

const MessageWindow = ({ isNoHide, decodedEmail }) => {
  const dispatch = useDispatch();
  const messageListRef = useRef(null);
  const { authToken, user } = useContext(AuthContext);

  const [contextMenu, setContextMenu] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  const isOpenSupportWindow = useSelector(
    (state) => state.supportWindowSlice?.isOpenSupportWindow
  );

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

  const getAllSupportMessages = async (authToken) => {
    try {
      const response = await ServiceFunctions.getAllSupportMessages(authToken);
      const filteredMessages = response.filter(
        (message) => message.email === decodedEmail
      );
      // Get userId directly from filtered messages
      const userId = filteredMessages[0]?.user_id;
      // Update state after getting userId
      setAllMessages(filteredMessages);
      // Call patchMessages with the userId from filtered messages
      if (userId) {
        await patchMessages(authToken, true, userId);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const patchMessages = async (authToken, isAdmin, userId) => {
    try {
      if (user?.role === 'admin' && decodedEmail) {
        await ServiceFunctions.patchSupportMessage(authToken, isAdmin, userId);
      } else {
        await ServiceFunctions.patchSupportMessage(authToken, isAdmin);
      }
    } catch (error) {
      console.error('Error patching messages:', error);
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

  useEffect(() => {
    if (user?.role === 'admin' && decodedEmail) {
      getAllSupportMessages(authToken);
      const interval = setInterval(() => {
        getAllSupportMessages(authToken);
      }, 60000);

      return () => clearInterval(interval);
    } else {
      fetchMessages(authToken);
      const interval = setInterval(() => {
        fetchMessages(authToken);
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [user?.role, decodedEmail]);

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

  const fetchMessages = async (authToken) => {
    try {
      const response = await ServiceFunctions.getSupportMessages(authToken);
      setAllMessages(response);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    const formData = new FormData();

    const requestData = {
      user_id: user?.role === 'admin' ? allMessages[0].user_id : user.id,
      sender: user?.role === 'admin' ? 'admin' : 'client',
      text: newMessage.trim(),
    };

    formData.append('request', JSON.stringify(requestData));

    selectedImages.forEach((file, index) => {
      if (index < 4) {
        formData.append(`file_${index + 1}`, file);
      }
    });

    try {
      const responseData = await ServiceFunctions.sendSupportMessage(
        authToken,
        formData
      );

      if (responseData) {
        // Message sent successfully, now fetch updated messages
        if (user?.role === 'admin') {
          getAllSupportMessages(authToken);
        } else {
          fetchMessages(authToken);
        }
        // Clear the input fields
        setNewMessage('');
        setSelectedImages([]);
        setImagePreviews([]);
      }

      setNewMessage('');
      setSelectedImages([]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
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

      files.forEach((file) => {
        const isValidFormat = [
          'image/jpeg',
          'image/png',
          'image/webp',
        ].includes(file.type);
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
        setError(
          `Файлы не корректного формата (jpg, jpeg, png, webp): ${invalidSizeFiles.join(
            ', '
          )}. `
        );
      }
      if (validFiles.length > 0) {
        setSelectedImages(validFiles);
        setImagePreviews(validFiles.map((file) => URL.createObjectURL(file)));
      }
    };
    input.click();
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        dispatch(closeSupportWindow());
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  useEffect(() => {
    if (
      messageListRef.current &&
      Array.isArray(allMessages) &&
      allMessages.length > 0
    ) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [allMessages, isOpenSupportWindow]);

  const handleImageDoubleClick = (image) => {
    setSelectedImages([image]);
    setPreviewMode(true);
  };

  const handleClose = () => setShow(false);

  const handleAddToCustomLocation = () => {
    setContextMenu(null);
    setPreviewMode(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && newMessage.trim()) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isOpenSupportWindow) {
      patchMessages(authToken, false);
    }
  }, [isOpenSupportWindow]);

  // const warningIcon = require('../assets/warning.png');

  return (
    <div
      className={
        isOpenSupportWindow
          ? styles.container
          : isNoHide
          ? styles.containerNoHide
          : styles.containerHidden
      }
    >
      <div className={styles.header}>
        <img src={radarIcon} alt='Logo' className={styles.logo} />
        <div className={styles.headerText}>
          <span className={styles.title}>Поддержка Радара</span>
          <span className={styles.subtitle}>
            Поддержим в любое время
            <br /> c 10:00 до 20:00
          </span>
        </div>
        {!isNoHide && (
          <button
            onClick={() => dispatch(closeSupportWindow())}
            className={styles.closeButton}
          >
            X
          </button>
        )}
      </div>
      <div className={styles.messageListWrapper}>
        <div className={styles.messageList} ref={messageListRef}>
          {allMessages?.length > 0 &&
            allMessages
              .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
              .map((message) => (
                <span
                  key={message.id}
                  className={
                    message.sender === 'client'
                      ? styles.userMessage
                      : styles.supportMessage
                  }
                >
                  <div>
                    {(message.image_1 ||
                      message.image_2 ||
                      message.image_3 ||
                      message.image_4) && (
                      <ImageMasonry
                        images={[
                          message.image_1,
                          message.image_2,
                          message.image_3,
                          message.image_4,
                        ].filter(Boolean)}
                        onImageClick={handleImageClick}
                        selectedImages={selectedImages}
                        onImageDoubleClick={handleImageDoubleClick}
                      />
                    )}
                    {message.text}
                  </div>
                  <span
                    className={
                      message.sender === 'client'
                        ? styles.messageTimeUser
                        : styles.messageTimeBot
                    }
                  >
                    {new Date(message.created_at + 'Z').toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </span>
                </span>
              ))}

          {imagePreviews.length > 0 && (
            <div className={styles.imagePreviews}>
              {imagePreviews.map((preview, index) => (
                <div key={index} className={styles.imagePreviewItem}>
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className={styles.previewImage}
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className={styles.removeImageButton}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
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
          onKeyDown={handleKeyDown}
          className={styles.input}
          placeholder='Напишите сообщение'
        />
        {selectedImage && (
          <div className={styles.imagePreview}>
            <img src={URL.createObjectURL(selectedImage)} alt='Preview' />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <button
          onClick={handleSendMessage}
          className={
            newMessage.length > 0
              ? styles.sendButtonFullfiled
              : styles.sendButton
          }
        >
          <img src={sendButton} />
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
