import { Flex } from 'antd';
import styles from './RnpItem.module.css';
//import wb_icon from '../../../../assets/wbicon.svg';
import wb_icon from './wb_logo.png';

export default function RnpItem({ title, photo, wb_id, shop }) {
	return (
		<Flex gap={20}>
			<div className={styles.item__preview}>
				{photo &&
					<img
						src={photo}
						width={45}
						height={60}
						className={styles.item__pic}
						alt=''
						onError={(e) => {
							e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/HHpC6UAAAAASUVORK5CYII=';
							e.target.style.display = 'none'
						}}
					/>}
			</div>
			<div className={styles.item__description}>
				{<div className={styles.item__title}>
					{title}
				</div>}

				<Flex gap={8} className={styles.item__info} align="center">
					<a href={`https://www.wildberries.ru/catalog/${wb_id}/detail.aspx`} target='_blank' className={styles.item__link}>
						<Flex gap={8} align="center" className={styles.item__article}>
							<img
								src={wb_icon}
								className={styles.item__article_icon}
								width={20}
								height={20}
							/>

							{wb_id}
						</Flex>
					</a>
					&bull;
					<span className={styles.item__shop}>{shop}</span>
				</Flex>
			</div>
		</Flex>
	);
}
