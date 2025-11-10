import styles from './PositionTrackingMainPageWidget.module.css';
import { Button, Form, ConfigProvider, Input } from 'antd';
import { ProceedToBlock } from '@/features';



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
}
export const PositionTrackingMainPageWidget: React.FC<IPositionTrackingMainPageWidgetProps> = ({
    hasAddBlock = false,
}) => {


    return (
        <div className={`${styles.widget} ${hasAddBlock ? styles.widget_hasAddBlock : styles.widget_noAddBlock}`}>
            {hasAddBlock &&
                <div className={styles.addBlock}>
                    <div className={styles.addBlock__wrapper}>
                        <p className={styles.addBlock__title}>Добавьте ваш первый артикул, позиции которого хотите начать отлеживать</p>
                        <ConfigProvider theme={antdTheme}>
                            <Form
                                layout='horizontal'
                                className={styles.addBlock__form}
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
                                >
                                    Добавить
                                </Button>
                            </Form>
                        </ConfigProvider>
                    </div>
                </div>
            }
            <ProceedToBlock
                title="Проверка позиции"
                placeholder="Введите артикул"
                tabsOptions={['Аналитика товара', 'Тренды']}
                submitHandler={() => { }}
            />
            <ProceedToBlock
                title="Подбор ключей"
                placeholder="Введите запрос"
                hasTabs={true}
                tabsOptions={['Аналитика товара', 'Тренды']}
                submitHandler={() => { }}
            />
            <ProceedToBlock
                title="Проверка выдачи (SERP)"
                placeholder="Введите запрос"
                tabsOptions={['Аналитика товара', 'Тренды']}
                submitHandler={() => { }}
            />
        </div>
    );
};