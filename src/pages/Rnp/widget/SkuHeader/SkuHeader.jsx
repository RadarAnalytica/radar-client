import {Flex} from 'antd';
import styles from './SkuHeader.module.css';
import wb_icon from '../../../../assets/wbicon.svg';

export default function SkuHeader() {
	return (
		<Flex gap={20}>
				{true && (
			<div className={styles.table__rowImgWrapper}>
				{/* {product[v.photoFieldName] && */}
					<img
						src={
							'https://basket-12.wbbasket.ru/vol1735/part173548/173548176/images/c246x328/1.webp'
						}
						width={45}
						height={60}
						onError={(e) => {
							e.target.onerror = null;
							e.target.style.display = 'none';
						}}
					/>
			</div>
				)}
			<div className={styles.item__description}>
				<div className={styles.item__title}>
					Ремень кожаный для брюк и джинс, резинка в подарок
				</div>
				<Flex gap={8} className={styles.item__info} align="center">
					<Flex gap={8} className={styles.item__article}>
						<img
							src={wb_icon}
							className={styles.item__article_icon}
						/>
						Артикул
					</Flex>
					&bull;
					<span className={styles.item__shop}>Название магазина</span>
				</Flex>
			</div>
		</Flex>
	);
}
