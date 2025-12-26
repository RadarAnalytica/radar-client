import styles from './itemWidget.module.css';
import { ItemHead, ItemInfo } from '../../features';
import { useAppSelector } from '../../../../redux/hooks';
import { RadarProductBar } from '@/shared';

const ItemWidget = () => {

    const { skuMainData, dataStatus } = useAppSelector(store => store.skuAnalysis);

    return (
        <div className={styles.widget}>
            {/* <ItemHead /> */}
            <RadarProductBar
                isLoading={dataStatus.isLoading}
                data={{
                    wb_id_image_link: skuMainData?.photo_urls,
                    name: skuMainData?.wb_id_name,
                    price: skuMainData?.price,
                    wb_id: skuMainData?.wb_id,
                }}
                hasWbLink
            />
            <ItemInfo />
        </div>
    );
};

export default ItemWidget;
