import { useState, useEffect, useCallback } from 'react';
import { radarTableConfig } from '../../shared/configs/tableConfig';
import styles from './tableSettingsWidget.module.css';
import {
    ConfigProvider,
    Modal,
    Form,
    Checkbox,
    Flex,
    Row,
    Col,
    Button,
    Input,
} from 'antd';


const getReplicatedArray = (array, fields) => {
    let replicatedArray = array.map(_ => {
        return {
            ..._,
            hidden: _.children?.every(child => {
                if (child.fixed || fields[child.dataIndex] === undefined) {
                    return undefined;
                } else {
                    return !fields[child.dataIndex];
                }
            }),
            children: _?.children?.map(child => {
                return {
                    ...child,
                    hidden: child.fixed ? undefined : !fields[child.dataIndex]

                };
            })
        };
    });

    replicatedArray = replicatedArray.map(item => {
        return {
            ...item,
            colSpan: item.children?.filter(child => !child.hidden)?.length || 1,
        };
    });
    return replicatedArray;
};


const TableSettingsWidget = ({ tableConfig, setTableConfig }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkAllButtonState, setCheckAllButtonState] = useState('Выбрать все');
    const [searchState, setSearchState] = useState('');
    const [renderList, setRenderList] = useState([]);
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const filter = Form.useWatch('filter', searchForm);

    const getNormalizedArray = useCallback((array, searchState) => {
        let normalizedArray = array.map(_ => _.children).flat().filter(_ => _.title?.toLowerCase().includes(searchState.toLowerCase()));
        return normalizedArray;
    }, [tableConfig, searchState]);

    const сheckAllHandler = () => {
        const values = form.getFieldsValue();
        const keysArr = Object.keys(values);
        const type = keysArr.some(_ => !values[_]) ? 'select' : 'deselect';

        if (type === 'select') {
            keysArr.forEach(_ => {
                form.setFieldValue(_, true);
            });
            setCheckAllButtonState('Снять все');
        }
        if (type === 'deselect') {
            keysArr.forEach(_ => {
                form.setFieldValue(_, false);
            });
            setCheckAllButtonState('Выбрать все');
        }
    };

    const searchHandler = (fields) => {
        setSearchState(fields.filter.trim());
    };

    const updateOptionsConfig = (fields) => {
        const updatedConfig = getReplicatedArray(tableConfig, fields);
        setIsModalOpen(false);
        searchForm.resetFields();
        setSearchState('');
        localStorage.setItem('MonitoringTableConfig', JSON.stringify(updatedConfig));
        setTableConfig((prev) => updatedConfig);
    };

    useEffect(() => {
        if (!filter) {
            searchForm.submit();
        }
    }, [filter]);

    useEffect(() => {
        if (isModalOpen) {
            const values = form.getFieldsValue();
            const keysArr = Object.keys(values);
            if (keysArr.length > 0 && keysArr.some(_ => !values[_])) {
                setCheckAllButtonState('Выбрать все');
            }
            if (keysArr.length > 0 && keysArr.every(_ => values[_])) {
                setCheckAllButtonState('Снять все');
            }
        }
    }, [form, isModalOpen]);

    useEffect(() => {
        setRenderList(getNormalizedArray(tableConfig, searchState));
    }, [tableConfig, searchState]);

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#E7E1FE'
                    },
                    components: {
                        Button: {
                            paddingInlineLG: 7
                        }
                    }
                }}
            >
                <Button
                    size='large'
                    type='primary'
                    onClick={setIsModalOpen}
                    style={{ width: 45, height: 45 }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#5329FF" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.23731 14.2714C0.920898 12.777 0.920898 11.233 1.23731 9.73858C2.45853 9.88161 3.52573 9.47783 3.87339 8.63728C4.22216 7.79562 3.75457 6.75593 2.78859 5.99349C3.62149 4.71321 4.71321 3.62149 5.99349 2.78859C6.75483 3.75347 7.79562 4.22216 8.63728 3.87339C9.47893 3.52463 9.88271 2.45853 9.73858 1.23731C11.233 0.920898 12.777 0.920898 14.2714 1.23731C14.1284 2.45853 14.5322 3.52573 15.3727 3.87339C16.2144 4.22216 17.2541 3.75457 18.0165 2.78859C19.2968 3.62149 20.3885 4.71321 21.2214 5.99349C20.2565 6.75483 19.7878 7.79562 20.1366 8.63728C20.4854 9.47893 21.5515 9.88271 22.7727 9.73858C23.0891 11.233 23.0891 12.777 22.7727 14.2714C21.5515 14.1284 20.4843 14.5322 20.1366 15.3727C19.7878 16.2144 20.2554 17.2541 21.2214 18.0165C20.3885 19.2968 19.2968 20.3885 18.0165 21.2214C17.2552 20.2565 16.2144 19.7878 15.3727 20.1366C14.5311 20.4854 14.1273 21.5515 14.2714 22.7727C12.777 23.0891 11.233 23.0891 9.73858 22.7727C9.88161 21.5515 9.47783 20.4843 8.63728 20.1366C7.79562 19.7878 6.75593 20.2554 5.99349 21.2214C4.71321 20.3885 3.62149 19.2968 2.78859 18.0165C3.75347 17.2552 4.22216 16.2144 3.87339 15.3727C3.52463 14.5311 2.45853 14.1273 1.23731 14.2714ZM3.20337 12.236C4.41359 12.5716 5.41148 13.3384 5.90657 14.5311C6.40056 15.7248 6.23663 16.9735 5.61832 18.0649C5.72394 18.1771 5.83286 18.2861 5.94508 18.3917C7.03758 17.7734 8.28521 17.6105 9.47893 18.1034C10.6716 18.5985 11.4384 19.5964 11.774 20.8066C11.928 20.811 12.082 20.811 12.236 20.8066C12.5716 19.5964 13.3384 18.5985 14.5311 18.1034C15.7248 17.6094 16.9735 17.7734 18.0649 18.3917C18.1771 18.2861 18.2861 18.1771 18.3917 18.0649C17.7734 16.9724 17.6105 15.7248 18.1034 14.5311C18.5985 13.3384 19.5964 12.5716 20.8066 12.236C20.811 12.082 20.811 11.928 20.8066 11.774C19.5964 11.4384 18.5985 10.6716 18.1034 9.47893C17.6094 8.28521 17.7734 7.03648 18.3917 5.94508C18.2857 5.83329 18.1767 5.72433 18.0649 5.61832C16.9724 6.23663 15.7248 6.39946 14.5311 5.90657C13.3384 5.41148 12.5716 4.41359 12.236 3.20337C12.082 3.19929 11.928 3.19929 11.774 3.20337C11.4384 4.41359 10.6716 5.41148 9.47893 5.90657C8.28521 6.40056 7.03648 6.23663 5.94508 5.61832C5.83286 5.72394 5.72394 5.83286 5.61832 5.94508C6.23663 7.03758 6.39946 8.28521 5.90657 9.47893C5.41148 10.6716 4.41359 11.4384 3.20337 11.774C3.19897 11.928 3.19897 12.082 3.20337 12.236ZM12.005 15.3056C11.1296 15.3056 10.2901 14.9579 9.67111 14.3389C9.05213 13.7199 8.70439 12.8804 8.70439 12.005C8.70439 11.1296 9.05213 10.2901 9.67111 9.67111C10.2901 9.05213 11.1296 8.70439 12.005 8.70439C12.8804 8.70439 13.7199 9.05213 14.3389 9.67111C14.9579 10.2901 15.3056 11.1296 15.3056 12.005C15.3056 12.8804 14.9579 13.7199 14.3389 14.3389C13.7199 14.9579 12.8804 15.3056 12.005 15.3056ZM12.005 13.1052C12.2968 13.1052 12.5766 12.9893 12.783 12.783C12.9893 12.5766 13.1052 12.2968 13.1052 12.005C13.1052 11.7132 12.9893 11.4334 12.783 11.227C12.5766 11.0207 12.2968 10.9048 12.005 10.9048C11.7132 10.9048 11.4334 11.0207 11.227 11.227C11.0207 11.4334 10.9048 11.7132 10.9048 12.005C10.9048 12.2968 11.0207 12.5766 11.227 12.783C11.4334 12.9893 11.7132 13.1052 12.005 13.1052Z" fill="#5329FF" />
                    </svg>
                </Button>
            </ConfigProvider>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#5329FF',
                        fontFamily: 'Mulish, sans-serif',
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
                            defaultShadow: false,
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
                            LinkInlinePadding: 0,
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
                        Input: {
                            controlHeight: 45,
                            paddingBlockLG: 9,
                            paddingInlineLG: 16,
                            borderRadiusLG: 8,
                            fontSize: 16,
                            lineHeight: 1,
                        },
                        Form: {
                            itemMarginBottom: 0,
                        },
                    },
                }}
            >
                <Modal
                    footer={null}
                    open={isModalOpen}
                    onClose={() => { form.resetFields(); setSearchState(''); searchForm.resetFields(); setIsModalOpen(false); }}
                    onCancel={() => { form.resetFields(); setSearchState(''); searchForm.resetFields(); setIsModalOpen(false); }}
                    width={1000}
                    closeIcon={
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 7.77813L17.7781 0L20 2.22187L12.2219 10L20 17.7781L17.7781 20L10 12.2219L2.22187 20L0 17.7781L7.77813 10L0 2.22187L2.22187 0L10 7.77813Z" fill="#1A1A1A" fillOpacity="0.5" />
                        </svg>

                    }
                >
                    <div className={styles.modal}>
                        <p className={styles.modal__title}>Настройки таблицы</p>
                        <Flex className={styles.modal__filter} gap={8}>
                            <Form
                                className={styles.modal__searchForm}
                                onFinish={searchHandler}
                                form={searchForm}
                            >
                                <Flex gap={8}>
                                    <Form.Item
                                        className={styles.modal__input}
                                        name="filter"
                                    >
                                        <Input
                                            size="large"
                                            placeholder="Название столбца"
                                            allowClear={{
                                                clearIcon: <svg
                                                    width='15'
                                                    viewBox="0 0 15 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill='#8C8C8C'
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M14.7074 2.60356C15.0979 2.21304 15.0979 1.57987 14.7074 1.18935C14.3168 0.798823 13.6837 0.798823 13.2931 1.18935L7.58602 6.89646L2.08601 1.39645C1.69549 1.00593 1.06232 1.00593 0.671799 1.39645C0.281275 1.78698 0.281275 2.42014 0.671799 2.81067L5.96469 8.10356L0.671799 13.3965C0.281275 13.787 0.281275 14.4201 0.671799 14.8107C1.06232 15.2012 1.69549 15.2012 2.08601 14.8107L7.79313 9.10355L13.2931 14.6036C13.6837 14.9941 14.3168 14.9941 14.7074 14.6036C15.0979 14.213 15.0979 13.5799 14.7074 13.1893L9.41446 7.89645L14.7074 2.60356Z"
                                                    />
                                                </svg>
                                            }}
                                        //onClear={() => setShownColumns(columnsList)}
                                        />
                                    </Form.Item>

                                    <Button
                                        type="primary"
                                        size="large"
                                        iconPosition="start"
                                        htmlType="submit"
                                        icon={
                                            <svg
                                                width="21"
                                                height="21"
                                                viewBox="0 0 21 21"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M1.95312 9.60359C1.95312 5.25404 5.47914 1.72803 9.82869 1.72803C14.1782 1.72803 17.7043 5.25404 17.7043 9.60359C17.7043 13.9531 14.1782 17.4792 9.82869 17.4792C5.47914 17.4792 1.95312 13.9531 1.95312 9.60359ZM9.82869 0.228027C4.65071 0.228027 0.453125 4.42561 0.453125 9.60359C0.453125 14.7816 4.65071 18.9792 9.82869 18.9792C12.1477 18.9792 14.2701 18.1372 15.9068 16.7423L19.9365 20.7721L20.9972 19.7114L16.9674 15.6817C18.3623 14.0449 19.2043 11.9226 19.2043 9.60359C19.2043 4.42561 15.0067 0.228027 9.82869 0.228027Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        }
                                    >
                                        Найти
                                    </Button>
                                </Flex>
                            </Form>
                        </Flex>
                        {!searchState && <div className={styles.check_all}>
                            <Button type='link' size='small' onClick={сheckAllHandler}>
                                {checkAllButtonState}
                            </Button>
                        </div>}
                        <Form
                            form={form}
                            onFinish={updateOptionsConfig}
                            onFieldsChange={(fields) => {
                                const values = form.getFieldsValue();
                                const keysArr = Object.keys(values);
                                if (keysArr.some(_ => !values[_])) {
                                    setCheckAllButtonState('Выбрать все');
                                } else {
                                    setCheckAllButtonState('Снять все');
                                }
                            }}
                        >
                            <Flex gap={[16, 12]} vertical wrap className={styles.modal__list}>
                                {renderList.map((el, i) => !el.fixed && (
                                    <Col span={8} className={styles.item} key={i}>
                                        <Form.Item
                                            name={el?.dataIndex}
                                            valuePropName="checked"
                                            value={el?.dataIndex}
                                            initialValue={!el?.hidden}
                                        >
                                            <Checkbox>
                                                <div
                                                    className={styles.modal__checkboxLabelWrapper} title={el.title}
                                                    onDoubleClick={(e) => e.preventDefault()}
                                                >{el.title}</div>
                                            </Checkbox>
                                        </Form.Item>
                                    </Col>
                                ))}
                            </Flex>
                            <Flex
                                gap={12}
                                justify="end"
                                align="end"
                                className={styles.controls}
                            >
                                <Button
                                    size="large"
                                    type='text'
                                    onClick={() => {
                                        console.log('radarTableConfig', radarTableConfig);
                                        setTableConfig(JSON.parse(JSON.stringify(radarTableConfig)));
                                        localStorage.setItem('MonitoringTableConfig', JSON.stringify(radarTableConfig));
                                        form.resetFields();
                                        setSearchState('');
                                        searchForm.resetFields();
                                        setIsModalOpen(false);
                                        setRenderList((prev) => [...getNormalizedArray(radarTableConfig, searchState)]);
                                        const values = form.getFieldsValue();
                                        const keysArr = Object.keys(values);
                                        const type = keysArr.some(_ => !values[_]) ? 'select' : 'deselect';

                                        if (type === 'select') {
                                            keysArr.forEach(_ => {
                                                form.setFieldValue(_, true);
                                            });
                                            setCheckAllButtonState('Снять все');
                                        }
                                    }}
                                    style={{ color: '#F93C65'}}
                                >
                                    По умолчанию
                                </Button>
                                <Button size="large" onClick={() => { form.resetFields(); setSearchState(''); searchForm.resetFields(); setIsModalOpen(false); }}>
                                    Отменить
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                >
                                    Применить
                                </Button>
                            </Flex>
                        </Form>
                    </div>
                </Modal>
            </ConfigProvider>
        </>
    );
};

export default TableSettingsWidget;
