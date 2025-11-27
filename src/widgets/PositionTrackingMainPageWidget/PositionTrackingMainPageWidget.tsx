import styles from './PositionTrackingMainPageWidget.module.css';
import { Button, Form, ConfigProvider, Input } from 'antd';
import { ProceedToBlock } from '@/features';
import { useNavigate } from 'react-router-dom';



//antd theme
const antdTheme = {
    token: {
        colorBgContainer: 'white',
        colorBorder: '#5329FF1A',
        borderRadius: 8,
        fontFamily: 'Mulish',
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
    const navigate = useNavigate();
    const submitHandler = (fields: Record<string, any>) => {
        createProject(fields.sku);
        // setIsAddModalVisible(true)
    }


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
                        submit={(inputValue) => {
                            let normilizedId: string;
                            if (/^(|\d+)$/.test(inputValue)) {
                                normilizedId = inputValue;
                            } else {
                                const startId = inputValue.indexOf('wildberries.ru/catalog/') + 'wildberries.ru/catalog/'.length;
                                const endId = inputValue.indexOf('/detail.aspx');
                                if (startId === -1 || endId === -1) {
                                    // setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не верный формат артикула. Вставьте только числа или ссылку вида: https://www.wildberries.ru/catalog/ID/detail.aspx' });
                                    return;
                                }
                                normilizedId = inputValue.substring(startId, endId);
                            }
                            navigate(`/position-check/?id=${normilizedId}`);
                        }}
                    />
                    <ProceedToBlock
                        title="Подбор ключей"
                        placeholder="Введите запрос"
                        hasTabs={true}
                        tabsOptions={['Содержит', 'Совпадает полностью']}
                        submit={(inputValue, tab) => {
                            console.log('tab', tab);
                            console.log('inputValue', inputValue);
                            navigate(`/keywords-selection/?query=${inputValue}&match_type=${tab}`);
                        }}
                    />
                    <ProceedToBlock
                        title="Проверка выдачи (SERP)"
                        placeholder="Введите запрос"
                        submit={(inputValue) => {
                            navigate(`/serp-check/?query=${inputValue}`);
                        }}
                    />
                </>
            }
        </div>
    );
};