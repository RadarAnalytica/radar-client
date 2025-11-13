import React, { useState, useRef, useEffect } from 'react';
import styles from './searchBlock.module.css';
import { Input, ConfigProvider, Button } from 'antd';
import { useDemoMode } from '@/app/providers';



const inputAntdTheme = {
    token: {
        colorBgContainer: 'white',
        colorBorder: '#5329FF1A',
        borderRadius: 8,
        fontFamily: 'Mulish',
        fontSize: 12,
        fontWeight: 500,
        controlHeightLG: 38,
    },
    components: {
        Input: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            activeOutlineColor: 'transparent',
            activeBg: 'transparent',
            hoverBg: 'transparent',
            activeShadow: 'transparent'
        }
    }
}

const buttonAntdTheme = {
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
}

interface ISearchBlockProps {
    title?: string | React.ReactNode;
    hasBackground?: boolean;
    submitHandler?: (value: string) => void;
    searchHistory?: string[];
    clearSearchHistoryHandler?: () => void;
    placeholder?: string;
    searchButtonText?: string;
    layout?: 'horizontal' | 'vertical';
    lines?: number;
    style?: React.CSSProperties;
    disableEnter?: boolean,
    demoModeValue: string
}

export const SearchBlock: React.FC<ISearchBlockProps> = ({
    title,
    hasBackground = true,
    submitHandler,
    searchHistory,
    clearSearchHistoryHandler,
    placeholder = 'Артикул или ссылка',
    searchButtonText = 'Найти',
    layout = 'horizontal',
    lines = 1,
    style,
    disableEnter = false,
    demoModeValue = ''
}) => {


    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const { isDemoMode } = useDemoMode();

    const historyButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { id } = e.target as HTMLButtonElement;
        setInputValue(id);
        runSearch(id);
    };

    const runSearch = (id?: string) => {
        if (id) {
            submitHandler(id);
            return;
        }
        submitHandler(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key !== 'Enter' || disableEnter) return;
        runSearch();
    };

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (isDemoMode) {
            setInputValue(demoModeValue)
            runSearch(demoModeValue);
        }
    }, [isDemoMode])

    return (
        <div className={`${styles.search} ${hasBackground ? styles.search_background : ''}`} style={style}>
            {typeof title === 'string' && <p className={styles.search__title}>{title}</p>}
            {typeof title !== 'string' && title}
            <div className={`${styles.search__wrapper} ${layout === 'vertical' ? styles.search__wrapper_vertical : ''}`}>
                <ConfigProvider
                    renderEmpty={() => (<div>Нет данных</div>)}
                    theme={inputAntdTheme}
                >
                    {lines > 1 ? (
                        <Input.TextArea
                            ref={inputRef}
                            placeholder={placeholder}
                            size='large'
                            value={inputValue}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => handleKeyDown(e)}
                            className={styles.search__input}
                            autoSize={{ minRows: lines, maxRows: lines }}
                        />
                    ) : (
                        <Input
                            prefix={
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.12793 0C14.1687 0.000149462 18.2549 4.08714 18.2549 9.12793C18.2548 11.3852 17.4328 13.4488 16.0752 15.042L20 18.9678L19.4834 19.4834L18.9678 20L15.042 16.0752C13.4488 17.4328 11.3852 18.2548 9.12793 18.2549C4.08714 18.2549 0.000149459 14.1687 0 9.12793C0 4.08705 4.08705 0 9.12793 0ZM9.12793 1.46094C4.89354 1.46094 1.46094 4.89354 1.46094 9.12793C1.46109 13.3622 4.89363 16.7949 9.12793 16.7949C13.3621 16.7948 16.7948 13.3621 16.7949 9.12793C16.7949 4.89363 13.3622 1.46109 9.12793 1.46094Z" fill="#8C8C8C" />
                                </svg>

                            }
                            ref={inputRef}
                            placeholder={placeholder}
                            size='large'
                            value={inputValue}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={styles.search__input}
                        />
                    )}
                </ConfigProvider>
                <ConfigProvider
                    theme={buttonAntdTheme}
                >
                    <Button
                        size='large'
                        type='primary'
                        onClick={() => runSearch()}
                        className={styles.search__button}
                    >
                        <svg width="18" height="18" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.95312 9.60353C1.95312 5.25398 5.47914 1.72797 9.82869 1.72797C14.1782 1.72797 17.7043 5.25398 17.7043 9.60353C17.7043 13.9531 14.1782 17.4791 9.82869 17.4791C5.47914 17.4791 1.95312 13.9531 1.95312 9.60353ZM9.82869 0.227966C4.65071 0.227966 0.453125 4.42555 0.453125 9.60353C0.453125 14.7815 4.65071 18.9791 9.82869 18.9791C12.1477 18.9791 14.2701 18.1371 15.9068 16.7423L19.9365 20.772L20.9972 19.7114L16.9674 15.6816C18.3623 14.0449 19.2043 11.9225 19.2043 9.60353C19.2043 4.42555 15.0067 0.227966 9.82869 0.227966Z" fill="white" />
                        </svg>

                        {searchButtonText}
                    </Button>
                </ConfigProvider>

            </div>
            {
                searchHistory && searchHistory.length > 0 &&
                <div className={styles.search__searchHistory}>
                    {searchHistory.map((i: string, id: number) => {

                        return (
                            <button
                                className={styles.search__historyItem}
                                key={id}
                                id={i}
                                onClick={historyButtonClickHandler}
                            >
                                {i}
                            </button>
                        );
                    })}

                    <button className={styles.search__historyDeleteButton} onClick={() => clearSearchHistoryHandler()}>
                        Очистить историю
                    </button>
                </div>
            }
        </div >
    );
};

