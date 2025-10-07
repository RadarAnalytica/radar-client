import styles from './itemWidget.module.css';
import { ItemHead, ItemInfo } from '../../features';
import { useAppSelector } from '../../../../redux/hooks';

const ItemWidget = () => {

    const { isSidebarHidden } = useAppSelector(store => store.utils);

    return (
        <div className={isSidebarHidden ? styles.widget : `${styles.widget} ${styles.widget_1col}`}>
            <ItemHead />
            <ItemInfo />
        </div>
    );
};

export default ItemWidget;
