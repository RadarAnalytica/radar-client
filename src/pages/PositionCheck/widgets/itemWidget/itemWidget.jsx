import styles from './itemWidget.module.css';
import { ItemHead, ItemInfo } from '../../features';
import { useAppSelector } from '../../../../redux/hooks';

const ItemWidget = () => {


    return (
        <div className={styles.widget}>
            <ItemHead />
            <ItemInfo />
        </div>
    );
};

export default ItemWidget;
