import styles from './stockChartWidget.module.css'
import DownloadButton from '../../../../components/DownloadButton';
import { Input, ConfigProvider, Checkbox } from 'antd';

const StockChartWidget = ({
    tableConfig,
    tableData,
    title,
    downloadButton,
    customHeader
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
            </div>
        </div>
    )
}

export default StockChartWidget;