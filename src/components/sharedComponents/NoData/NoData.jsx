import React from 'react';
import styles from './NoData.module.css';

const NoData = ({ message = 'Нет данных' }) => {
	return (
		<div className={styles.noData}>
			<p>{message}</p>
		</div>
	);
};

export default NoData;
