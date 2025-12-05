import styles from './SearchComponent.module.css';
import { Input, ConfigProvider, Button } from 'antd';

const SearchComponent = ({ searchInputValue, setSearchInputValue, handleSearch, isLoading }) => {
    const inputKeydownHandler = (e) => {
        if (e && e.key !== 'Enter') return;
        handleSearch(searchInputValue.trim());
    };
    
    const searchButtonClickHandler = () => {
        handleSearch(searchInputValue.trim());
    };
    
    const inputChangeHandler = (e) => {
        const value = e.target.value;
        setSearchInputValue(value);
        
        // Если поле очищено, сбрасываем поиск
        if (value === '') {
            handleSearch('');
        }
    };
    
    const clearInputHandler = () => {
        setSearchInputValue('');
        handleSearch('');
    };

    return (
        <div className={styles.widget}>
            <div className={styles.widget__searchBlockWrapper}>
                {/* INPUT */}
                <ConfigProvider
                    theme={{
                        token: {
                            colorBorder: '#5329FF80 !important',
                            fontSize: 14,
                        },
                        components: {
                            Input: {
                                activeBg: 'transparent',
                                hoverBg: 'transparent',
                                colorBgContainer: 'transparent',
                            }
                        }
                    }}
                >
                    <Input
                        size='large'
                        placeholder='Поиск по артикулу'
                        value={searchInputValue}
                        onKeyDown={(e) => inputKeydownHandler(e)}
                        onChange={inputChangeHandler}
                        autoCorrect='off'
                        spellCheck={false}
                        autoComplete='off'
                        style={{
                            fontSize: 14,
                        }}
                        suffix={
                            <button
                                onClick={clearInputHandler}
                                className={`clear-input-button ${searchInputValue ? 'd-flex' : 'd-none'}`}
                                type="button"
                                aria-label="Очистить"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        }
                    />
                </ConfigProvider>
                {/* SEARCH BUTTON */}
                <ConfigProvider
                    wave={{ disabled: true }}
                    theme={{
                        token: {
                            colorPrimary: '#E7E1FE',
                            colorTextLightSolid: '#5329FF',
                            fontSize: 14,
                        },
                        Button: {
                            defaultShadow: 'none',
                            primaryShadow: 'none'
                        }
                    }}
                >
                    <Button
                        type='primary'
                        size='large'
                        onClick={searchButtonClickHandler}
                        loading={isLoading}
                        disabled={isLoading}
                        style={{
                            fontSize: 14,
                        }}
                    >
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.5 9.60353C1.5 5.25398 5.02601 1.72797 9.37556 1.72797C13.7251 1.72797 17.2511 5.25398 17.2511 9.60353C17.2511 13.9531 13.7251 17.4791 9.37556 17.4791C5.02601 17.4791 1.5 13.9531 1.5 9.60353ZM9.37556 0.227966C4.19758 0.227966 0 4.42555 0 9.60353C0 14.7815 4.19758 18.9791 9.37556 18.9791C11.6946 18.9791 13.8169 18.1371 15.4537 16.7423L19.4834 20.772L20.5441 19.7114L16.5143 15.6816C17.9092 14.0449 18.7511 11.9225 18.7511 9.60353C18.7511 4.42555 14.5535 0.227966 9.37556 0.227966Z" fill="#5329FF" />
                        </svg>

                        Найти
                    </Button>
                </ConfigProvider>
            </div>
        </div>
    );
};

export default SearchComponent;

