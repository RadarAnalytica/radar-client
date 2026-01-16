import styles from './TexModal.module.css'
import React, { useEffect, useState, useContext, useMemo } from 'react';
import { ConfigProvider, Modal, Select, Input, Form, Button } from 'antd';
import { SelectIcon } from '@/shared';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import AuthContext from '@/service/AuthContext';
import moment from 'moment';
import { ServiceFunctions } from '@/service/serviceFunctions';



const initRequestStatus = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};


export const TaxModal = ({
    updateDataDashBoard
}) => {
    const { activeBrand, selectedRange } = useAppSelector(store => store.filters)
    const { shops } = useAppSelector(store => store.shopsSlice)
    const [addShopRequestStatus, setAddShopRequestStatus] = useState(initRequestStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { authToken } = useContext(AuthContext)

    const currShop = useMemo(() => {
        return shops?.find(_ => _.id === activeBrand.id) ?? activeBrand
    }, [activeBrand])

    const submitHandler = async (fields: Record<string, string>) => {
            const data = {
                shop_id: activeBrand?.id,
                effective_from: moment().format('YYYY-MM-DD'),
                tax_type: fields?.taxType,
                tax_rate: fields?.taxType === 'Не считать налог' ? 0 : parseInt(fields?.tax),
                vat_rate: fields?.taxType === 'Не считать налог' ? 0 : fields?.vat === 'Без НДС' ? 0 : parseInt(fields?.vat),
            }

            try {
                let res = await ServiceFunctions.setShopTax(authToken, data)
                if (!res.ok) {
                    setAddShopRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось установить налог!' });
                    return;
                }
                setAddShopRequestStatus({ ...initRequestStatus, isLoading: false, isSuccess: true, message: 'Налог успешно установлен' });
            } catch(e) {
                console.error(e);
                setAddShopRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось установить налог!' });
            }
          
    }

    useEffect(() => {
        let timeout;
        if (addShopRequestStatus.isSuccess) {
            updateDataDashBoard(selectedRange, activeBrand.id, authToken)
            setAddShopRequestStatus(initRequestStatus);
        }
        if (addShopRequestStatus.isError) {
            timeout = setTimeout(() => { setAddShopRequestStatus(initRequestStatus); }, 2000);
        }
    }, [addShopRequestStatus]);

    return (
        <>
            <button 
                className={styles.smallButton}
                disabled={activeBrand?.id === 0}
                onClick={() => setIsModalOpen(true)}
                title={activeBrand?.id === 0 && 'Выберите магазин в фильтрах выше'}
            >Изменить</button>
            <TaxSetupModal
                shop={currShop}
                submitHandler={submitHandler}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    )
}





const TaxSetupModal = ({
    shop,
    submitHandler,
    isModalOpen,
    setIsModalOpen
}) => {
    const [form] = Form.useForm();
    const taxType = Form.useWatch('taxType', form);
    const isTaxDisabled = taxType === 'Не считать налог';

    useEffect(() => {
        if (shop) {
            form.setFieldValue('taxType', shop?.tax_type);
            form.setFieldValue('tax', shop?.tax_rate);
            form.setFieldValue('vat', shop?.vat_rate || 'Без НДС');
        } else {
            form.resetFields();
        }
    }, [shop]);

    useEffect(() => {
        if (isTaxDisabled) {
            form.setFieldValue('tax', 0);
            form.setFieldValue('vat', 'Без НДС');
        }
    }, [isTaxDisabled]);

    return (
        <ConfigProvider
            theme={{
                token: {},
                components: {
                    Modal: {
                        borderRadiusLG: 20,
                    }
                }
            }}
        >
            <Modal
                open={isModalOpen}
                closeIcon={
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fillOpacity="0.5" />
                    </svg>
                }
                footer={null}
                width={600}
                centered
                destroyOnHidden
                onCancel={() => { setIsModalOpen(false); form.resetFields(); }}
            >
                <div className={styles.taxModal}>
                    <div className={styles.taxModal__header}>
                        <h2 className={styles.taxModal__title}>Установка налога</h2>
                    </div>

                    <p className={styles.taxModal__description}>
                        Введите процент налога, который наша система будет удерживать в расчетах от ваших показателей
                    </p>

                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#5329FF',
                                fontFamily: 'Manrope',
                                fontSize: 12
                            },
                            components: {
                                Form: {
                                    labelFontSize: 12,
                                },
                                Input: {
                                    activeBorderColor: '#5329FF1A',
                                    hoverBorderColor: '#5329FF1A',
                                    //@ts-ignore
                                    activeOutlineColor: 'transparent',
                                    activeShadow: 'transparent',
                                    controlHeight: 38,
                                    controlHeightLG: 38,
                                    colorBorder: '#5329FF1A',

                                },
                                Button: {
                                    controlHeightLG: 46,
                                },
                                Select: {
                                    activeBorderColor: '#5329FF1A',
                                    activeOutlineColor: 'transparent',
                                    hoverBorderColor: '#5329FF1A',
                                    optionActiveBg: 'transparent',
                                    optionFontSize: 14,
                                    optionSelectedBg: 'transparent',
                                    optionSelectedColor: '#5329FF',
                                }
                            }
                        }}
                    >
                        <Form
                            form={form}
                            layout='vertical'
                            className={styles.taxModal__form}
                            onFinish={submitHandler}
                        >
                            <Form.Item
                                name='taxType'
                                label='Тип налогообложения'
                                className={styles.taxModal__formItem}
                            >
                                <Select
                                    size='large'
                                    suffixIcon={<SelectIcon />}
                                    className={styles.plainSelect__select}
                                    options={[{ value: 'УСН-доходы' }, { value: 'УСН Д-Р' }, { value: 'Не считать налог' }]}
                                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                />
                            </Form.Item>
                            <Form.Item
                                name='tax'
                                label='Ставка налога'
                                className={styles.taxModal__formItem}
                                rules={[
                                    { required: !isTaxDisabled, message: 'Пожалуйста, введите процент налога!' },
                                    () => ({
                                        validator(_, value) {
                                            if (!value || isTaxDisabled) {
                                                return Promise.resolve();
                                            }
                                            if (!/^\d+$/.test(value.toString())) {
                                                return Promise.reject(new Error('Разрешён ввод только цифр!'));
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    placeholder='Например, 6'
                                    size='large'
                                    style={{ width: '100%' }}
                                    disabled={isTaxDisabled}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name='vat'
                                label=' Ставка НДС'
                                className={styles.taxModal__formItem}
                            >
                                <Select
                                    size='large'
                                    suffixIcon={<SelectIcon />}
                                    className={styles.plainSelect__select}
                                    options={[{ value: 'Без НДС' }, { value: '5%' }, { value: '7%' }, { value: '10%' }, { value: '22%' }]}
                                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                    disabled={isTaxDisabled}
                                />
                            </Form.Item>
                            <div className={styles.taxModal__buttonsWrapper}>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#5329FF',
                                            fontSize: 14,
                                            //@ts-ignore
                                            fontWeight: 600,
                                            fontFamily: 'Manrope',
                                            borderRadius: 8,
                                            controlHeight: 46
                                        },
                                        components: {
                                            Button: {
                                                paddingInline: 24,
                                                paddingBlock: 16,
                                                colorBorder: 'transparent',
                                                //@ts-ignore
                                                colorBorderHover: 'transparent',
                                                colorBgContainer: '#F3EEFF',
                                                colorBgContainerHover: '#E9E1FF',
                                                colorText: '#5329FF',
                                                colorTextHover: '#5329FF',
                                                defaultShadow: 'none',
                                                boxShadow: 'none',
                                                controlHeight: 46
                                            },
                                        },
                                    }}
                                >
                                    <Button
                                        type='default'
                                        size='large'
                                        style={{ fontSize: 14, fontWeight: 600 }}
                                        onClick={() => { setIsModalOpen(false); form.resetFields(); }}
                                    >
                                        Отменить
                                    </Button>
                                </ConfigProvider>
                                <Button
                                    htmlType='submit'
                                    type='primary'
                                    style={{ fontSize: 14, height: 46, fontWeight: 600, width: 'max-content', padding: '0 16px', alignSelf: 'flex end', borderRadius: '8px' }}
                                >
                                    Сохранить
                                </Button>
                            </div>
                        </Form>
                    </ConfigProvider>
                </div>
            </Modal>
        </ConfigProvider>
    );
};
