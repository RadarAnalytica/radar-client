import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchBlock.module.css';
import { Input, ConfigProvider, Button } from 'antd';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';

const requestInitState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

interface SearchBlockProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

const SearchBlock: React.FC<SearchBlockProps> = ({ onSearch, loading = false }) => {
  const inputRef = useRef<any>(null);
  const [inputValue, setInputValue] = useState('');
  const [requestStatus, setRequestStatus] = useState(requestInitState);

  const searchSubmitHandler = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e && 'key' in e && e.key && e.key !== 'Enter') return;
    
    if (!inputValue.trim()) {
      setRequestStatus({ 
        ...requestInitState, 
        isError: true, 
        message: 'Введите поисковый запрос' 
      });
      return;
    }

    // Вызываем callback с запросом
    onSearch(inputValue.trim());
    setRequestStatus(requestInitState);
  };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.search}>
      <div className={styles.search__wrapper}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#5329FF',
              fontFamily: 'Mulish',
              fontSize: 16,
            },
            components: {
              Input: {
                activeBorderColor: '#5329FF',
                hoverBorderColor: '#5329FF'
              }
            }
          }}
        >
          <Input
            ref={inputRef}
            placeholder='Поиск по названию компании, id, артикулу товара'
            size='large'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { searchSubmitHandler(e); }}
            className={styles.search__input}
            disabled={loading}
            suffix={
              <button
                  onClick={() => setInputValue('')}
                  className={`clear-input-button ${inputValue ? 'd-flex' : 'd-none'}`}
                  type="button"
                  aria-label="Очистить"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1L1 13M1 1L13 13" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            }
          />
          <Button
            size='large'
            type='primary'
            onClick={searchSubmitHandler}
            className={styles.search__button}
            loading={loading}
            disabled={loading}
          >
            {!loading && (
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.95312 9.60353C1.95312 5.25398 5.47914 1.72797 9.82869 1.72797C14.1782 1.72797 17.7043 5.25398 17.7043 9.60353C17.7043 13.9531 14.1782 17.4791 9.82869 17.4791C5.47914 17.4791 1.95312 13.9531 1.95312 9.60353ZM9.82869 0.227966C4.65071 0.227966 0.453125 4.42555 0.453125 9.60353C0.453125 14.7815 4.65071 18.9791 9.82869 18.9791C12.1477 18.9791 14.2701 18.1371 15.9068 16.7423L19.9365 20.772L20.9972 19.7114L16.9674 15.6816C18.3623 14.0449 19.2043 11.9225 19.2043 9.60353C19.2043 4.42555 15.0067 0.227966 9.82869 0.227966Z" fill="white" />
              </svg>
            )}
            Найти
          </Button>
        </ConfigProvider>
      </div>

      <ErrorModal
        footer={null}
        open={requestStatus.isError}
        onOk={() => setRequestStatus(requestInitState)}
        onClose={() => setRequestStatus(requestInitState)}
        onCancel={() => setRequestStatus(requestInitState)}
        message={requestStatus.message}
      />
    </div>
  );
};

export default SearchBlock;

