import React, { useReducer } from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext, useRef } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import styles from './Referal.module.css';
import { ServiceFunctions } from '../../service/serviceFunctions';
import { ConfigProvider, Flex, Row, Tooltip, Button, Col } from 'antd';
import { HeaderIcon, TooltipIcon, CopyIcon } from './widgets/icons';
import { formatPrice } from '../../service/utils';

export default function ReferalPage() {
	const { authToken } = useContext(AuthContext);
	// const [url, setUrl] = useState(null)
	const [url, setUrl] = useState(null);

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	const updateData = async () => {
		setLoading(true)
		try{

			const response = await ServiceFunctions.getReferalData();
			// if (!response.ok) {
			// 	throw new Error(response.status);
			// }

			setUrl('https://www.figma.com/design/IwCuoaCiPGvM2nZE9teriW/%D0%92%D0%B5%D0%B1-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81?node-id=9238-13715&t=OFgMQ5RasRjCfp4y-0');
			setData({
				url: 'https://www.figma.com/design/IwCuoaCiPGvM2nZE9teriW/%D0%92%D0%B5%D0%B1-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81?node-id=9238-13715&t=OFgMQ5RasRjCfp4y-0',
				count: 10,
				sum: 110
			})
		} catch (error) {
				console.error('updateData error: ', error)
		} finally {
			setLoading(false)
		}
	} 

	useEffect(() => {
		updateData();
	}, [])

	const copyInput = useRef();

	const copyHandler = () => {
		navigator.clipboard
			.writeText(url)
			.then(() => {
				copyInput.current.classList.add(styles.partner__input_copied)
				setTimeout(() => {
					copyInput.current.classList.remove(styles.partner__input_copied)
				}, 1600)
			})
			.catch((err) =>
				console.error('Ошибка при копировании текста: ', err)
			);
	};

	return (
		<main className={styles.page}>
			<MobilePlug />
			{/* ------ SIDE BAR ------ */}
			<section className={styles.page__sideNavWrapper}>
				<Sidebar />
			</section>
			{/* ------ CONTENT ------ */}
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#5329ff',
						colorText: '#fff',
					},
					components: {
						Button: {
							defaultBorderColor: 'transparent',
							defaultHoverBorderColor: 'transparent',
							defaultBg: 'transparent',
							defaultHoverBg: 'transparent',
							defaultActiveBorderColor: 'transparent',
							defaultActiveBg: 'transparent',
							defaultHoverBg: 'transparent',
							primaryColor: '#fff',
							paddingInlineLG: 9.5,
							defaultShadow: false,
							controlHeightLG: 45,
							paddingBlockLG: 9.5,
							paddingInlineLG: 12,
							controlHeightLG: 45,
						},
					},
				}}
			>
				<section className={styles.page__content}>
					{/* header */}
					<div className={styles.page__headerWrapper}>
						<Header title="Реферальная программа"></Header>
					</div>
					
					{loading && <div className={styles.loading}>
								<span className='loader'></span>
						</div>}

					{!loading && <>
						<div className={styles.container}>
							<Flex className={styles.header} gap={16} align="center">
								<Flex
									vertical
									align="center"
									justify="center"
									className={styles.header__icon}
								>
									<HeaderIcon
										className={styles.header__icon_icon}
									/>
								</Flex>
								<h2 className={styles.title}>
									Приглашайте пользователей и получайте пассивный
									доход
								</h2>
							</Flex>
							<Flex className={styles.tiles} gap={8}>
								<Flex
									vertical
									align="flex-start"
									justify="space-between"
									className={styles.tile}
								>
									<p className={styles.tile__text}>
										Увеличенный «тестовый период» для ваших
										рефералов
									</p>
									<div className={styles.tile__value}>7 дней</div>
								</Flex>
								<Flex
									vertical
									align="flex-start"
									justify="space-between"
									className={styles.tile}
								>
									<Flex
										className={styles.tile__text}
										gap={8}
										align="start"
									>
										<span>
											Начисление вам процента от оплат
											рефералов
										</span>
										<Tooltip title="Начисление вам процента от оплат рефералов">
											<span>
												<TooltipIcon
													className={styles.tile__tooltip}
												/>
											</span>
										</Tooltip>
									</Flex>
									<div className={styles.tile__value}>
										180 дней
									</div>
								</Flex>
								<Flex
									vertical
									align="flex-start"
									justify="space-between"
									className={styles.tile}
								>
									<p className={styles.tile__text}>
										Начисление вам от первой оплаты рефералов
									</p>
									<div className={styles.tile__value}>40 %</div>
								</Flex>
								<Flex
									vertical
									align="flex-start"
									justify="space-between"
									className={styles.tile}
								>
									<p className={styles.tile__text}>
										Начисление вам от всех последующих оплат
										рефералов
									</p>
									<div className={styles.tile__value}>15 %</div>
								</Flex>
							</Flex>
						</div>
						<Row gutter={20}>
							<Col span={12}>
							<Flex vertical gap={20}>
									<div className={styles.info}>
										<p className={styles.info__title}>
											Кол-во рефералов, чел
										</p>
										<div className={styles.info__value}>{formatPrice(data?.count)}</div>
									</div>
									<div className={styles.info}>
										<Flex gap={12} align="center">
											<div className={styles.info__content}>
												<Flex gap={12} className={styles.info__title}>
													Баланс
													<span
														className={
															styles.info__title_mark
														}
													>
														Вывод средств от 2 000 ₽
													</span>
												</Flex>
												<div className={styles.info__value}>
													{formatPrice(data?.sum, '₽')}
												</div>
											</div>
											<Button type="primary" size="large" className={styles.btn}>
												Вывести
											</Button>
										</Flex>
									</div>
								</Flex>
							</Col>
							<Col span={12}>
								<div className={styles.partner}>
									<h3 className={styles.partner__title}>
										Моя партнерская ссылка
									</h3>
									<Flex
										className={styles.partner__input}
										gap={12}
										align="center"
										onClick={copyHandler}
										ref={copyInput}
									>
										<span className={styles.partner__link}>
											{data?.url}
										</span>
										<CopyIcon
											className={styles.partner__copy}
										/>
									</Flex>
									<p className={styles.partner__text}>
										При переходе по этой ссылке в браузере
										пользователя будет установлена ваша
										реферальная метка. Мы проверям наличие этой
										метки при регистрации пользователей. Если
										она будет найдена – пользователь будет
										зарегистрирован в качестве вашего реферала и
										вы будете получать процент с его оплат
										тарифов.
									</p>
								</div>
							</Col>
						</Row>
						<div className={styles.container}>
							<Flex className={styles.header} gap={16} align="center">
								<Flex
									vertical
									align="center"
									justify="center"
									className={styles.header__icon_orange}
								>
									<HeaderIcon
										className={styles.header__icon_icon}
									/>
								</Flex>
								<h2 className={styles.title}>История начислений</h2>
							</Flex>
							<div>
								<div className={styles.charge_item_empty}>
									Нет начислений
								</div>
							</div>
						</div>
					</>}
				</section>
			</ConfigProvider>
		</main>
	);
}
