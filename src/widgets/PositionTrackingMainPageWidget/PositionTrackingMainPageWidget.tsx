import styles from './PositionTrackingMainPageWidget.module.css';
import { Button, Form, ConfigProvider, Input } from 'antd';
import { ProceedToBlock } from '@/features';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';



//antd theme
const antdTheme = {
    token: {
        colorBgContainer: 'white',
        colorBorder: '#5329FF1A',
        borderRadius: 8,
        fontFamily: 'Manrope',
        fontSize: 14,
        fontWeight: 500,
        controlHeightLG: 38,
        colorPrimary: '#5329FF',
    },
    components: {
        Input: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            activeOutlineColor: 'transparent',
            hoverBg: 'white',
            activeShadow: 'transparent',
            activeBg: 'white',
            controlHeight: 38,
        },
        Button: {
            defaultShadow: 'none',
            primaryShadow: 'none',
            controlHeight: 38,
        }
    }
};


interface IPositionTrackingMainPageWidgetProps {
    hasAddBlock?: boolean;
    hasProceedToBlocks?: boolean;
    setIsAddModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    createProject: (sku: string) => Promise<void>;
    loading: boolean;
}
export const PositionTrackingMainPageWidget: React.FC<IPositionTrackingMainPageWidgetProps> = ({
    hasAddBlock = false,
    hasProceedToBlocks = true,
    setIsAddModalVisible,
    createProject,
    loading,
}) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const submitHandler = useCallback((fields: Record<string, any>) => {
        createProject(fields.sku);
        // setIsAddModalVisible(true)
    }, [createProject]);

    const handlePositionCheckSubmit = useCallback((inputValue: string) => {
        let normilizedId: string;
        if (/^(|\d+)$/.test(inputValue)) {
            normilizedId = inputValue;
        } else {
            const startId = inputValue.indexOf('wildberries.ru/catalog/') + 'wildberries.ru/catalog/'.length;
            const endId = inputValue.indexOf('/detail.aspx');
            if (startId === -1 || endId === -1) {
                setError('Не верный формат артикула. Вставьте только числа или ссылку вида: https://www.wildberries.ru/catalog/ID/detail.aspx')
                return;
            }
            normilizedId = inputValue.substring(startId, endId);
        }
        navigate(`/position-check/${normilizedId}`);
    }, [navigate]);

    const handleKeywordsSelectionSubmit = useCallback((inputValue: string, tab?: string) => {
        navigate(`/keywords-selection/?query=${inputValue}&match_type=${tab}`);
    }, [navigate]);

    const handleSerpCheckSubmit = useCallback((inputValue: string) => {
        navigate(`/serp?query=${inputValue}`);
    }, [navigate]);

    return (
        <div className={`${styles.widget} ${hasAddBlock ? styles.widget_hasAddBlock : styles.widget_noAddBlock}`}>
            {hasAddBlock &&
                <div className={`${styles.addBlock} ${!hasProceedToBlocks ? styles.addBlock_noProceedToBlocks : ''}`}>
                    <div className={styles.addBlock__wrapper}>
                        <p className={styles.addBlock__title}>Добавьте ваш первый артикул, позиции которого хотите начать отлеживать</p>
                        <ConfigProvider theme={antdTheme}>
                            <Form
                                layout='horizontal'
                                className={styles.addBlock__form}
                                onFinish={submitHandler}
                            >
                                <div className={styles.addBlock__formRow}>
                                    <Form.Item
                                        name="sku"
                                        rules={[{ required: true, message: 'Пожалуйста, заполните это поле' }]}
                                        className={styles.addBlock__formItem}
                                    >
                                        <Input placeholder="Введите артикул или ссылку" />
                                    </Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ fontWeight: 600 }}
                                        loading={loading}
                                    >
                                        Добавить
                                    </Button>
                                </div>
                            </Form>
                        </ConfigProvider>
                    </div>
                </div>
            }
            {hasProceedToBlocks &&
                <>
                    <ProceedToBlock
                        title="Проверка позиции"
                        placeholder="Введите артикул"
                        submit={handlePositionCheckSubmit}
                    />
                    <ProceedToBlock
                        title="Подбор ключей"
                        placeholder="Введите запрос"
                        hasTabs={true}
                        tabsOptions={['Содержит', 'Совпадает полностью']}
                        submit={handleKeywordsSelectionSubmit}
                    />
                    <ProceedToBlock
                        title="Проверка выдачи (SERP)"
                        placeholder="Введите запрос"
                        submit={handleSerpCheckSubmit}
                    />
                    <ErrorModal
                        message={error}
                        open={!!error}
                        onCancel={() => setError(null)}
                        onClose={() => setError(null)}
                    />
                </>
            }
        </div>
    );
};