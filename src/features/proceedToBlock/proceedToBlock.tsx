import React, { useState } from 'react';
import styles from './proceedToBlock.module.css';
import { Form, Input, ConfigProvider, Segmented, Button } from 'antd';


//antd
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
            colorPrimary: '#5329FF1A',
            colorPrimaryHover: '#5329FF1A',
        },
        Segmented: {
            itemActiveBg: '#5329FF1A',
            itemSelectedBg: '#5329FF1A',
            trackBg: 'transparent',
            trackPadding: 0,
            itemHoverBg: '#5329FF10',
            itemColor: '#1A1A1A80',
            itemSelectedColor: '#1A1A1A',
            itemHoverColor: '#1A1A1A',
        }
    }
};

// model
interface IProceedToBlockProps {
    title: string;
    hasTabs?: boolean;
    tabsOptions?: Array<string>;
    placeholder?: string;
    submit: (inputValue: string, tab: string | undefined) => void;
}
export const ProceedToBlock: React.FC<IProceedToBlockProps> = ({
    title,
    hasTabs = false,
    tabsOptions = [],
    placeholder,
    submit
}) => {
    const [ tabs, setTabs ] = useState<string | undefined>(tabsOptions?.[0] ?? undefined);
    const [form] = Form.useForm();
    const submitHandler = (fields: Record<string, any>) => {
        submit(fields.inputValue, tabs ?? undefined);
    };

    return (
        <div className={styles.block}>
            <p className={styles.block__title}>{title}</p>
            <ConfigProvider theme={antdTheme}>
                <Form
                    layout="vertical"
                    className={styles.block__form}
                    onFinish={submitHandler}
                    form={form}
                >
                    {hasTabs && tabsOptions &&
                        <Form.Item
                            name="tab"
                            className={styles.block__formItem}
                        >
                            <Segmented
                                options={tabsOptions}
                                style={{ width: '100%' }}
                                value={tabs}
                                onChange={(value) => setTabs(value)}
                            />
                        </Form.Item>
                    }
                    <div className={styles.block__formInputWrapper}>
                        <Form.Item
                            name="inputValue"
                            className={styles.block__formItem}
                        >
                            <Input placeholder={placeholder} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.21967 1.28033C8.92678 0.987436 8.92678 0.512562 9.21967 0.219669C9.51256 -0.0732236 9.98744 -0.073223 10.2803 0.219671L13.2783 3.2176C13.4152 3.35348 13.5 3.54184 13.5 3.75001C13.5 3.94314 13.427 4.11922 13.3071 4.25217C13.2984 4.26176 13.2895 4.27116 13.2803 4.28034L10.2803 7.28033C9.98744 7.57322 9.51256 7.57322 9.21967 7.28033C8.92678 6.98744 8.92678 6.51256 9.21967 6.21967L10.9393 4.5H0.75C0.335787 4.5 0 4.16421 0 3.75C0 3.33579 0.335787 3 0.75 3H10.9393L9.21967 1.28033Z" fill="#5329FF" />
                            </svg>
                        </Button>
                    </div>
                </Form>
            </ConfigProvider>
        </div>
    );
};