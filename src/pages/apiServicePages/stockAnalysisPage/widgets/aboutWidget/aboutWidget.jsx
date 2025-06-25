import styles from './aboutWidget.module.css'
import { Bars } from '../../features';

const AboutWidget = () => {

    return (
        <div className={styles.widget}>
            <Bars.TableBar
                data={[
                    { title: 'Сумма', amount: 5600, amountUnits: '₽'},
                    { title: 'Количество', amount: 10, amountUnits: 'шт'},
                    { title: 'Бренд', amount: 'Test'},
                    { title: 'SKU', amount: '1923232232'},
                    { title: 'BARCODE', amount: '1923232232'},
                    { title: 'Размеры', amount: '1923232232'},
                    { title: 'Категория', amount: '1923232232'},
                    { title: 'Остаток WB', amount: '1923232232'},
                    { title: 'Остаток Склад', amount: '1923232232'},
                ]}
            />
            <Bars.TableBar
                data={[
                    { title: 'Сумма', amount: 5600, amountUnits: '₽'},
                    { title: 'Количество', amount: 10, amountUnits: 'шт'},
                    { title: 'Бренд', amount: 'Test'},
                    { title: 'SKU', amount: '1923232232'},
                    { title: 'BARCODE', amount: '1923232232'},
                    { title: 'Размеры', amount: '1923232232'},
                    { title: 'Категория', amount: '1923232232'},
                    { title: 'Остаток WB', amount: '1923232232'},
                    { title: 'Остаток Склад', amount: '1923232232'},
                ]}
            />
        </div>
    )
}

export default AboutWidget;