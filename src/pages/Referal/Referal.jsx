import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext, useRef, useMemo } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import styles from './Referal.module.css';
import { ServiceFunctions } from '../../service/serviceFunctions';
import { ConfigProvider, Flex, Row, Tooltip, Button, Col, Table } from 'antd';
import { HeaderIcon, TooltipIcon, CopyIcon } from './widgets/icons';
import { formatPrice } from '../../service/utils';
import { format } from 'date-fns';
import ruRU from 'antd/locale/ru_RU';
import SuccessModal from '../../components/sharedComponents/modals/successModal/successModal';
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal';

export default function ReferalPage() {
	const { authToken } = useContext(AuthContext);

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [page, setPage] = useState(1);
	const [loadingWithdrawal, setLoadingWithdrawal] = useState(false);
	const [successModalOpen, setSuccessModalOpen] = useState(false);
	const [errorModalOpen, setErrorModalOpen] = useState(false);

	const TABLE_COLUMNS = useMemo(() => ([
		{
			key: 'transaction_date',
			dataIndex: 'transaction_date',
			title: 'Дата',
			render: (value) => format( new Date(value), 'dd.MM.yyyy HH:mm:SS')
		},
		{
			key: 'bonus_amount',
			dataIndex: 'bonus_amount',
			title: 'Сумма, руб',
			render: (value) => (
				<span
					className={
						value > 0
							? styles.transactions__item_green
							: styles.transactions__item_red
					}
				>
				{value}
			</span>
			)
		},
		{
			// временный ключ, синхронизировать с ключом из бэка
			key: 'addititonal',
			dataIndex: 'addititonal',
			title: 'Примечание',
			render: (value) => (
				value
			)
		}
	]), [])

	const updateData = async () => {
		setLoading(true);
		try {
			const response = await ServiceFunctions.getReferalData(authToken, page);
			setData(response.data);
		} catch (error) {
			console.error('updateData error: ', error);
			setData(null);
		} finally {
			setLoading(false);
		}
	};

	const withdrawalHandler = async () => {
		setLoadingWithdrawal(true);
		try {
			const response = await ServiceFunctions.getWithdrawalRequest(authToken);
			if (response === 'Ok'){
				setSuccessModalOpen(true);
			}
			
		} catch (error) {
			console.error('withdrawalHandler error: ', error);
			setErrorModalOpen(true);
		} finally {
			setLoadingWithdrawal(false);
		}
	}

	useEffect(() => {
		updateData();
	}, [page]);

	const copyInput = useRef();

	const copyHandler = () => {
		navigator.clipboard
			.writeText(data?.referral_link)
			.then(() => {
				copyInput.current.classList.add(styles.partner__input_copied);
				setTimeout(() => {
					copyInput.current.classList.remove(
						styles.partner__input_copied
					);
				}, 1600);
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
				locale={ruRU}
				renderEmpty={ () => (<div>Нет начислений</div>)} 
				theme={{
					token: {
						colorPrimary: '#5329ff',
						colorText: '#5329ff',
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
						Pagination: {
							itemActiveBg: '#EEEAFF',
							itemBg: '#F7F7F7',
							itemColor: '#8C8C8C',
						},
						Table: {
							headerColor: '#8c8c8c',
							headerBg: '#f7f6fe',
							headerBorderRadius: 20,
							selectionColumnWidth: 32,
							cellFontSize: 16,
							borderColor: '#e8e8e8',
							cellPaddingInline: 16,
							cellPaddingBlock: 17,
							bodySortBg: '#f7f6fe',
							headerSortActiveBg: '#e7e1fe',
							headerSortHoverBg: '#e7e1fe',
							rowSelectedBg: '#f7f6fe',
							rowSelectedHoverBg: '#e7e1fe',
							colorText: '#1A1A1A',
							lineHeight: 1.2,
							fontWeightStrong: 500
						},
					},
				}}
			>
				<section className={styles.page__content}>
					{/* header */}
					<div className={styles.page__headerWrapper}>
						<Header title="Реферальная программа"></Header>
					</div>

					{loading && (
						<div className={styles.loading}>
							<span className="loader"></span>
						</div>
					)}

					{!loading && (
						<>
							<div className={styles.container}>
								<Flex
									className={styles.header}
									gap={16}
									align="center"
								>
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
										Приглашайте пользователей и получайте
										пассивный доход
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
											Увеличенный «тестовый период» для
											ваших рефералов
										</p>
										<div className={styles.tile__value}>
											7 дней
										</div>
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
												Начисление вам процента от оплат рефералов
											</span>
											<Tooltip title="Вы получаете % от каждой оплаты подписки ваших рефералов в течение этого срока с момента их регистрации">
												<span>
													<TooltipIcon
														className={
															styles.tile__tooltip
														}
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
										<div className={styles.tile__value}>
											40 %
										</div>
									</Flex>
									<Flex
										vertical
										align="flex-start"
										justify="space-between"
										className={styles.tile}
									>
										<p className={styles.tile__text}>
											Начисление вам от всех последующих оплат рефералов
										</p>
										<div className={styles.tile__value}>
											15 %
										</div>
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
											<div className={styles.info__value}>
												{formatPrice(
													data?.referral_count
												)}
											</div>
										</div>
										<div className={styles.info}>
											<Flex gap={12} align="center">
												<div
													className={
														styles.info__content
													}
												>
													<Flex
														gap={12}
														className={
															styles.info__title
														}
													>
														Баланс
														<span
															className={
																styles.info__title_mark
															}
														>
															Вывод средств от 2
															000 ₽
														</span>
													</Flex>
													<div
														className={
															styles.info__value
														}
													>
														{formatPrice( data?.bonus_balance, '₽' )}
													</div>
												</div>
												<Button
													type="primary"
													size="large"
													className={styles.btn}
													loading={loadingWithdrawal}
													onClick={withdrawalHandler}
													disabled={data?.bonus_balance < 2000}
												>
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
											<span
												className={styles.partner__link}
											>
												{data?.referral_link || '-'}
											</span>
											<CopyIcon
												className={styles.partner__copy}
											/>
										</Flex>
										<p className={styles.partner__text}>
											При переходе по этой ссылке в браузере пользователя будет установлена ваша реферальная метка. Мы проверяем наличие этой метки при регистрации пользователей. Если она будет найдена – пользователь будет зарегистрирован в качестве вашего реферала и вы будете получать процент с его оплат тарифов.
										</p>
									</div>
								</Col>
							</Row>
							<div className={styles.container}>
								<Flex
									className={styles.header}
									gap={16}
									align="center"
								>
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
									<h2 className={styles.title}>
										История начислений
									</h2>
								</Flex>
								<div>
									<div className={styles.transactions}>
										{(!data || data?.transactions?.transactions_data?.length === 0) && (
											<div>Нет начислений</div>
										)}
										{data?.transactions?.transactions_data?.length > 0 && 
											<div className={styles.table_container}>
												<Table
													columns={TABLE_COLUMNS}
													// dataSource={tableData.dataSource.map((el) => el)}
													dataSource={data.transactions.transactions_data.reduce((acc, el) => {
														for (const transaction of el.transactions_history){
															acc.push({
																key: transaction.id,
																addititonal: transaction.bonus_amount === 1500 ? 'Бонус от Радар' : transaction.addititonal,
																...transaction
															})
														}
														return acc
													}, [])}
													pagination={{
														locale: {
															items_per_page: 'записей на странице',
															jump_to: 'Перейти',
															jump_to_confirm: 'подтвердить',
															page: 'Страница',
															prev_page: 'Предыдущая страница',
															next_page: 'Следующая страница',
															prev_5: 'Предыдущие 5 страниц',
															next_5: 'Следующие 5 страниц',
															prev_3: 'Предыдущие 3 страниц',
															next_3: 'Следующие 3 страниц',
														},
														position: ['bottomLeft'],
														defaultCurrent: 1,
														current: page,
														total: data.transactions.total,
														pageSize: data.transactions.per_page,
														showQuickJumper: false,
														showSizeChanger: false,
														onChange: setPage,
														hideOnSinglePage: true,
													}}
												/>
											</div>
										}
									</div>
								</div>
							</div>
						</>
					)}
				</section>
				<SuccessModal
					open={successModalOpen}
					title={'Заявка на вывод направлена'}
					message={'В ближайшее время с Вами свяжутся наши специалисты'}
					onCancel={() => setSuccessModalOpen(false)}
					onOk={() => setSuccessModalOpen(false)}
				/>
				<ErrorModal
					open={errorModalOpen}
					message={'Что-то пошло не так! Попробуйте еще раз'}
					onCancel={() => setErrorModalOpen(false)}
					onOk={() => setErrorModalOpen(false)}
				/>
			</ConfigProvider>
		</main>
	);
}
