import { Flex } from 'antd';
import styles from './SkuItem.module.css';
import wb_icon from '../../../../assets/wbicon.svg';

export default function SkuItem({ title, photo, sku, shop }) {
	return (
		<Flex gap={20}>
			<div className={styles.item__preview}>
					<img
						src={ photo }
						width={45}
						height={60}
						className={styles.item__pic}
						alt=''
						onError={(e) => {
							e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/HHpC6UAAAAASUVORK5CYII=';
						}}
					/>
			</div>
			<div className={styles.item__description}>
				<div className={styles.item__title}>
					{title}
				</div>
				<Flex gap={8} className={styles.item__info} align="center">
					<a href={`https://www.wildberries.ru/catalog/${sku}/detail.aspx`} target='_blank' className={styles.item__link}>
						<Flex gap={8} className={styles.item__article}>
							<img
								src={wb_icon}
								className={styles.item__article_icon}
							/>
							{sku}
						</Flex>
					</a>
					&bull;
					<span className={styles.item__shop}>{shop}</span>
				</Flex>
			</div>
		</Flex>
	);
}
