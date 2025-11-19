import React, { useEffect, useMemo } from 'react';
import styles from './SettingsModal.module.css';
import { 
    ConfigProvider,
    Modal, 
    Form, 
    Checkbox, 
    Button, 
    Flex,
} from 'antd';

interface ISettingsModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onOk: (visibilityMap: Record<string, boolean>) => void;
    barsConfig: Array<Record<string, any>>;
}

const STORAGE_KEY = 'dashboard_cards_visibility';

export const SettingsModal: React.FC<ISettingsModalProps> = (
    {
        isOpen,
        setIsOpen,
        onOk,
        barsConfig,
    }
) => {
    const [form] = Form.useForm();

    // Собираем все карточки из конфига
    const allCards = useMemo(() => {
        const cards: Array<{ id: string; title: string }> = [];
        barsConfig.forEach(row => {
            if (row.children && Array.isArray(row.children)) {
                row.children.forEach(child => {
                    if (child.id && child.title) {
                        cards.push({
                            id: child.id,
                            title: child.title
                        });
                    }
                });
            }
        });
        return cards;
    }, [barsConfig]);

    // Загружаем сохраненные настройки из localStorage
    useEffect(() => {
        if (isOpen) {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const settings = JSON.parse(saved);
                    // Поддержка нового формата (с visibility и order) и старого (только visibility)
                    const visibilityMap = settings.visibility || settings;
                    const formValues: Record<string, boolean> = {};
                    allCards.forEach(card => {
                        formValues[card.id] = visibilityMap[card.id] !== undefined ? visibilityMap[card.id] : true;
                    });
                    form.setFieldsValue(formValues);
                } else {
                    // Если нет сохраненных настроек, устанавливаем все в true
                    const formValues: Record<string, boolean> = {};
                    allCards.forEach(card => {
                        formValues[card.id] = true;
                    });
                    form.setFieldsValue(formValues);
                }
            } catch (error) {
                console.error('Ошибка при загрузке настроек видимости:', error);
            }
        }
    }, [isOpen, allCards, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            // Загружаем текущие настройки, чтобы сохранить порядок
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                let order = null;
                
                if (saved) {
                    const settings = JSON.parse(saved);
                    order = settings.order || null;
                }
                
                // Сохраняем в localStorage с сохранением порядка
                const settings = {
                    visibility: values,
                    order: order
                };
                
                localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
            } catch (error) {
                console.error('Ошибка при сохранении настроек видимости:', error);
            }
            onOk(values);
            setIsOpen(false);
        });
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Mulish, sans-serif',
                    fontSize: 14,
                },
                components: {
                    Modal: {
                        padding: 24,
                        borderRadiusLG: 16,
                        titleFontSize: 24,
                        titleColor: '#1a1a1a',
                    },
                    Button: {
                        paddingInlineSM: 0,
                        paddingBlockLG: 9.5,
                        paddingInlineLG: 12,
                        controlHeightLG: 44,
                        contentFontSize: 16,
                        contentFontSizeSM: 16,
                        colorBorder: '#00000033',
                        defaultColor: '#5329FF',
                        defaultBg: '#e7e1fe',
                        defaultBorderColor: '#e7e1fe',
                        defaultHoverColor: '#5329FF',
                        defaultHoverBg: '#f3f0ff',
                        defaultHoverBorderColor: '#f3f0ff',
                        defaultActiveBorderColor: '#bcb6d9',
                        defaultActiveBg: '#bcb6d9',
                        colorPrimary: '#5329FF',
                        primaryColor: '#fff',
                        colorPrimaryBg: '#5329FF',
                        colorPrimaryBorder: '#5329FF',
                        colorPrimaryBgHover: '#7a52ff',
                        colorPrimaryBorderHover: '#7a52ff',
                        colorPrimaryHover: '#7a52ff',
                        colorPrimaryActive: '#3818d9',
                        colorLink: '#5329FF',
                        colorLinkHover: '#7a52ff',
                        colorLinkActive: '#3818d9',
                    },
                    Checkbox: {
                        fontSize: 16,
                        padding: 8,
                        colorBorder: '#ccc',
                        colorPrimary: '#5329ff',
                        colorPrimaryBorder: '#5329ff',
                        colorPrimaryHover: '#5329ff',
                    },
                    Form: {
                        itemMarginBottom: 0,
                    },
                },
            }}
        >
            <Modal
                open={isOpen}
                onCancel={handleCancel}
                onClose={handleCancel}
                title="Настройки отображения карточек"
                closeIcon={
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 7.77813L17.7781 0L20 2.22187L12.2219 10L20 17.7781L17.7781 20L10 12.2219L2.22187 20L0 17.7781L7.77813 10L0 2.22187L2.22187 0L10 7.77813Z"
                            fill="#1A1A1A"
                            fillOpacity="0.5"
                        />
                    </svg>
                }
                width={1200}
                footer={
                    <Flex
                        gap={12}
                        justify="end"
                        align="end"
                        className={styles.controls}
                    >
                        <Button size="large" onClick={handleCancel}>
                            Отменить
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleOk}
                        >
                            Применить
                        </Button>
                    </Flex>
                }
            >
                <Form form={form} layout="vertical">
                    <Flex gap="16px 12px" wrap className={styles.list}>
                        {allCards.map((card) => (
                            <div key={card.id} className={styles.item}>
                                <Form.Item
                                    name={card.id}
                                    valuePropName="checked"
                                    initialValue={true}
                                    noStyle
                                >
                                    <Checkbox>
                                        {card.title}
                                    </Checkbox>
                                </Form.Item>
                            </div>
                        ))}
                    </Flex>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};