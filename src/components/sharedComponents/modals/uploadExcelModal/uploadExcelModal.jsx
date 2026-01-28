import React, { useState, useEffect, useRef } from 'react';
import { ConfigProvider, Button } from 'antd';
import Modal from 'react-bootstrap/Modal';
import DragDropFile from '@/components/DragAndDropFiles';
import { formatPrice } from '@/service/utils';
import styles from './uploadExcelModal.module.css';

const UploadExcelModal = ({
  open,
  onClose,
  onUpload,
  loading = false,
  error = null,
  result = null,
  onDownloadTemplate = null,
  title = 'Загрузка файла',
  file: externalFile = null,
  setFile: setExternalFile = null
}) => {
  const [file, setFile] = useState(null);
  const timeoutRef = useRef(null);
  
  // Используем внешний файл если он передан, иначе внутренний
  const currentFile = externalFile !== null ? externalFile : file;
  const setCurrentFile = setExternalFile || setFile;

  useEffect(() => {
    if (!open) {
      setCurrentFile(null);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [open, setCurrentFile]);

  useEffect(() => {
    if (result && result.error_count === 0) {
      timeoutRef.current = setTimeout(() => {
        handleClose();
      }, 2000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const handleClose = () => {
    if (loading) return;
    setCurrentFile(null);
    onClose();
  };

  const handleUpload = () => {
    if (currentFile && onUpload) {
      onUpload(currentFile);
    }
  };

  const handleTemplateDownload = (e) => {
    e.preventDefault();
    if (onDownloadTemplate) {
      onDownloadTemplate();
    }
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      className='add-token-modal'
    >
      <Modal.Header closeButton>
        <div className='d-flex align-items-center gap-2'>
          <div style={{ width: '100%' }}>
            <div className='d-flex justify-content-between'>
              <h4 className='fw-bold mb-0' style={{ fontSize: '18px' }}>{title}</h4>
            </div>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        {currentFile ? (
          <div>
            <div className='d-flex align-items-center justify-content-between w-100 mt-2 gap-2'>
              <div className='d-flex gap-2'>
                <svg
                  width='17'
                  height='23'
                  viewBox='0 0 17 23'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M14 21.75H3C1.75736 21.75 0.75 20.7426 0.75 19.5V3.5C0.75 2.25736 1.75736 1.25 3 1.25H10.8588L16.25 6.32405V19.5C16.25 20.7426 15.2426 21.75 14 21.75Z'
                    stroke='black'
                    strokeOpacity='0.5'
                    strokeWidth='1.5'
                  />
                </svg>
                <span style={{ fontSize: '14px' }}>{currentFile.name}</span>
              </div>
              <div>
                <button
                  className={styles.textButton}
                  onClick={() => setCurrentFile(null)}
                  style={{ color: 'red', cursor: 'pointer', fontSize: '14px' }}
                  disabled={loading}
                >
                  Удалить
                </button>
              </div>
            </div>
            <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
              <ConfigProvider
                wave={{ disabled: true }}
                theme={{
                  token: {
                    colorPrimary: '#5329FF',
                    colorTextLightSolid: 'white',
                    fontSize: 14,
                    controlHeightLG: 46,
                    fontWeight: 600,
                  },
                  Button: {
                    defaultShadow: 'none',
                    primaryShadow: 'none',
                    paddingInlineLG: 12,
                    controlHeightLG: 38,
                  }
                }}
              >
                <Button
                  type='primary'
                  size='large'
                  loading={loading}
                  onClick={handleUpload}
                  style={{ fontWeight: 600, fontSize: 14, margin: '10px 0', width: '100%' }}
                >
                  Сохранить
                </Button>
              </ConfigProvider>
            </div>
            <div className='d-flex justify-content-center w-100 gap-2'>
              <button
                className={styles.textButton}
                onClick={handleClose}
                style={{ fontSize: '14px' }}
                disabled={loading}
              >
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <div className='d-flex flex-column align-items-center justify-content-around w-100'>
            <DragDropFile files={currentFile} setFiles={setCurrentFile} disabled={loading || !!error} />
            {onDownloadTemplate && (
              <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                <a href='#' className='link' onClick={handleTemplateDownload} style={{ fontSize: '14px' }}>
                  Скачать шаблон
                </a>
              </div>
            )}
          </div>
        )}
        {error && (
          <div style={{ color: 'red', fontSize: '14px', textAlign: 'left', width: '100%', marginTop: '10px' }}>
            {error}
          </div>
        )}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '10px' }}>
            {Object.keys(result).map((key) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '10px' }}>
                <span style={{ fontSize: '14px', lineHeight: '1' }}>{result[key].title}:&nbsp;</span>
                <span style={{ fontSize: '14px', lineHeight: '1' }}>{formatPrice(result[key].value, ' ')}</span>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UploadExcelModal;
