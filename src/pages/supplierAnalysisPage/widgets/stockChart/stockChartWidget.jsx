import styles from './stockChartWidget.module.css'
import DownloadButton from '../../../../components/DownloadButton';
import { Input, ConfigProvider, Checkbox } from 'antd';
import { formatPrice } from '../../../../service/utils';

const StockChartWidget = ({
    tableConfig,
    tableData,
    title,
    downloadButton,
    customHeader,
    supplier
}) => {

    return (
        <div className={styles.widget}>
            <div className={styles.widget__header}>
                {!customHeader && <p className={styles.widget__title}>{title}</p>}
                {customHeader && customHeader}
                {downloadButton &&
                    <DownloadButton />
                }
            </div>

            <div className={styles.widget__chartWrapper}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#5329FF',
                            fontFamily: 'Mulish',
                        }
                    }}
                >
                    <Input
                        size='large'
                        placeholder='Поставщик для сравнения'
                    />
                </ConfigProvider>

                <div className={styles.widget__controls}>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#5329FF',
                                controlInteractiveSize: 20,
                            }
                        }}
                    >
                        <Checkbox
                            size='large'
                            defaultChecked
                            //checked={i.isActive}
                            //value={i.engName}
                            className={styles.widget__checkbox}
                            //onChange={chartControlsChangeHandler}
                        >
                            <label className={styles.widget__checkboxLabel}>
                                {supplier}
                                <span>{formatPrice(5000, 'шт')}</span>
                            </label>
                        </Checkbox>
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#1BC5D1',
                                controlInteractiveSize: 20,
                            }
                        }}
                    >
                        <Checkbox
                            size='large'
                            defaultChecked
                            //checked={i.isActive}
                            //value={i.engName}
                            className={styles.widget__checkbox}
                            //onChange={chartControlsChangeHandler}
                        >
                            <label className={styles.widget__checkboxLabel}>
                                test
                                <span>{formatPrice(5000, 'шт')}</span>
                            </label>
                        </Checkbox>
                    </ConfigProvider>
                </div>
            </div>
        </div>
    )
}

export default StockChartWidget;