import React, { useState } from 'react';
import SelfCostModal from '../selfCostModal/selfCostModal';
import styles from './selfCostWarningBlock.module.css';
import { Link } from 'react-router-dom';

const SelfCostWarningBlock = ({ shopId, onUpdateDashboard }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);


    return (
        <div className={styles.block}>
            <div className={styles.block__titleWrapper}>
                <svg
                    width='30'
                    height='30'
                    viewBox='0 0 30 30'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <rect
                        width='30'
                        height='30'
                        rx='5'
                        fill='#F0AD00'
                        fillOpacity='0.1'
                    />
                    <path
                        d='M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z'
                        fill='#F0AD00'
                    />
                </svg>
                <p className={styles.block__title}>
                    У ваших товаров отсутствует себестоимость
                </p>
            </div>

            <p className={styles.block__text}>
                Для правильного расчета данных нам нужно знать себестоимость ваших товаров. Данные в блоках «прибыль», «финансы», «себестоимость проданных товаров» не учитывают себестоимость товаров, для которых она неизвестна.
            </p>

            <Link className={styles.block__addButton} to='/selfcost'>
                Заполнить себестоимость
            </Link>

            {/* <SelfCostModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                onUpdateDashboard={onUpdateDashboard}
                shopId={shopId}
            /> */}
        </div>
    );
};

export default SelfCostWarningBlock;
