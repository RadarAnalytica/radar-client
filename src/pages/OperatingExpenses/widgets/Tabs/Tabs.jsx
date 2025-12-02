import { Flex } from 'antd';
import styles from './Tabs.module.css';

export default function Tabs({ view, setView }) {
	return (
		<Flex gap={4} align="center">
			<button
				className={view === 'expense' ? `${styles.segmented__button} ${styles.segmented__button_active}` : styles.segmented__button}
				onClick={() => { setView('expense'); }}
				style={{ fontWeight: 500, fontSize: 14 }}
			>
				Расходы
			</button>
			<button
				className={view === 'category' ? `${styles.segmented__button} ${styles.segmented__button_active}` : styles.segmented__button}
				onClick={() => { setView('category'); }}
				style={{ fontWeight: 500, fontSize: 14 }}
			>
				Статьи
			</button>
			<button
				className={view === 'template' ? `${styles.segmented__button} ${styles.segmented__button_active}` : styles.segmented__button}
				onClick={() => { setView('template'); }}
				style={{ fontWeight: 500, fontSize: 14 }}
			>
				Запланированные расходы
			</button>
		</Flex>
	);
}

