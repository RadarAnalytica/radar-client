// base
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext } from 'react';
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import styles from './TrendAnalysisQuery.module.css';
import { useAppSelector } from '../../redux/hooks';

// page
import { ConfigProvider, Form, Input, Button, Flex, Table } from 'antd';
import TrendAnalysisQueryChart from './widget/TrendAnalysisQueryChart';
import { ServiceFunctions } from '../../service/serviceFunctions';
import { differenceInDays } from 'date-fns';
import { formatPrice, fileDownload } from '../../service/utils';

export default function TrendAnalysisQuery() {
	const { selectedRange } = useAppSelector(
		(state) => state.filters
	);
	const [loading, setLoading] = useState(false);
	const [timeFrame, setTimeFrame] = useState('month');
	const [data, setData] = useState(null);
	const [downloadLoading, setDownloadLoading] = useState(false);

	const COLUMNS = [
		{
			title: timeFrame === 'month' ? 'Месяц' : 'День',
			dataIndex: 'timeFrame',
			key: 'timeFrame',
		},
		{
			title: 'Частотность запроса',
			dataIndex: 'quantity',
			key: 'quantity',
			render: (value) => <b>{formatPrice(value)}</b>
		},
	];

	const initQuery = () => {
		const url = new URL(location.href);
		const urlQuery = url.searchParams.get('query');
		if (window.history.state?.visited == urlQuery){
			return null
		}
		if (urlQuery) {
			return url.searchParams.get('query').trim();
		}
		return null;
	};
	const [query, setQuery] = useState(initQuery());

	
	const updateHistoryState = () => {
		const url = new URL(location.href);
		if (query !== window.history.state?.visited && query){
			url.searchParams.set('query', query);
		} else {
			url.searchParams.delete('query');
		}
		window.history.pushState({visited: query}, '', url)
	}
	
	useEffect(() => {
		updateHistoryState()
	}, [query])

	const [form] = Form.useForm();

  const formQuery = Form.useWatch('query', form);

	const submitQuery = (data) => {
		// проверка на пустоту
		if (data.query && !data.query.trim()){
			return
		}
		const query = data.query.trim();

		setQuery(query);
		setTimeFrame('month');
	};

	useEffect(() => {
		updateData();
	}, [query, timeFrame, selectedRange]);

	const mapResponseToData = (response) => {

		const data = response[query];

		const labels = data.map((el) => Object.keys(el)[0].split(' ').reverse().join(' '))
		const values = data.map((el) => Object.values(el)[0])

		const dataResult = {
			chart: {
				labels: labels,
				data: values
			}
		}

		dataResult.table = data.map((el, i) => ({
			key: i,
			timeFrame: labels[i],
			quantity: values[i],
		})).reverse()

		setData(dataResult);
	}

	const checkQuery = (query) => {
		if (!query){
			return true
		}
		if (query?.trim()){
			return query.trim().length == 0;
		}
		return true
	}

	const updateData = async () => {
		if (!query) {
			return;
		}
		setLoading(true);
		// Обновление ссылки с поисковым запросом
		// const url = new URL(location);
		// url.searchParams.set('query', query)
		// window.history.pushState({visited: query}, '', url);

		try {
				const response = await ServiceFunctions.getTrendAnalysisQuery(
					query,
					timeFrame,
					selectedRange,
				);

				mapResponseToData(response)
		} catch (e) {
			console.error(e);
			setData([]);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	};

	const handleDownload = async () => {
		setDownloadLoading(true);
		try{
			const fileBlob = await ServiceFunctions.getDownloadTrendAnalysisQuery(
				query,
				timeFrame,
				selectedRange,
			);
			fileDownload(fileBlob, `Статистика_запроса.xlsx`);
		} catch(error) {
			console.error('Ошибка скачивания: ', error)
		} finally {
			setDownloadLoading(false);
		}
	}

	return (
		<main className={styles.page}>
			<MobilePlug />
			{/* ------ SIDE BAR ------ */}
			<aside className={styles.page__sideNavWrapper}>
				<Sidebar />
			</aside>
			{/* ------ CONTENT ------ */}
			<section className={styles.page__content}>
				{/* header */}
				<div className={styles.page__headerWrapper}>
					<Header title="Анализ трендовой динамики запросов"></Header>
				</div>
				<ConfigProvider
					theme={{
						token: {
							Form: {
								itemMarginBottom: 0,
							},
							Input: {
								controlHeightLG: 40,
								paddingBlockLG: 7,
								paddingInlineLG: 16,
								borderRadiusLG: 8,
								fontSize: 16,
								lineHeight: 1,
								colorBorder: '#5329FF80',
								activeBorderColor: '#5329FF',
								hoverBorderColor: '#5329FF',
							},
							Button: {
								paddingInlineLg: 12,
								paddingBlockLg: 8,
								controlHeightLG: 40,
								defaultShadow: 'none',
								defaultBorderColor: 'transparent',
								defaultHoverBorderColor: 'transparent',
								defaultColor: '#1A1A1A80',
								defaultHoverColor: '#1A1A1A',
								defaultBg: 'transparent',
								defaultHoverBg: 'transparent',
								colorPrimary: '#5329FF',
								primaryColor: '#fff',
								colorPrimaryBg: '#5329FF',
								colorPrimaryBorder: '#5329FF',
								colorPrimaryBgHover: '#7a52ff',
								colorPrimaryBorderHover: '#7a52ff',
								colorPrimaryHover: '#7a52ff',
								colorPrimaryActive: '#3818d9',
							},
						},
					}}
				>
					<div className={styles.control}>
						<Form form={form} className={styles.form} onFinish={submitQuery}>
							<Flex gap={8}>
								<Form.Item
									initialValue={query}
									name="query"
									className={styles.input}
									required={true}
								>
									<Input
										size="large"
										placeholder="Введите поисковый запрос, например: «платье»"
										allowClear={{
											clearIcon: (
												<svg
													width='15'
													viewBox="0 0 15 16"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fill='#8C8C8C'
														fillRule="evenodd"
														clipRule="evenodd"
														d="M14.7074 2.60356C15.0979 2.21304 15.0979 1.57987 14.7074 1.18935C14.3168 0.798823 13.6837 0.798823 13.2931 1.18935L7.58602 6.89646L2.08601 1.39645C1.69549 1.00593 1.06232 1.00593 0.671799 1.39645C0.281275 1.78698 0.281275 2.42014 0.671799 2.81067L5.96469 8.10356L0.671799 13.3965C0.281275 13.787 0.281275 14.4201 0.671799 14.8107C1.06232 15.2012 1.69549 15.2012 2.08601 14.8107L7.79313 9.10355L13.2931 14.6036C13.6837 14.9941 14.3168 14.9941 14.7074 14.6036C15.0979 14.213 15.0979 13.5799 14.7074 13.1893L9.41446 7.89645L14.7074 2.60356Z"
													/>
												</svg>
											),
										}}
									></Input>
								</Form.Item>
								<Button
									className={styles.btn}
									type="primary"
									size="large"
									icon={
										<svg
											width="21"
											height="21"
											viewBox="0 0 21 21"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M1.95312 9.60359C1.95312 5.25404 5.47914 1.72803 9.82869 1.72803C14.1782 1.72803 17.7043 5.25404 17.7043 9.60359C17.7043 13.9531 14.1782 17.4792 9.82869 17.4792C5.47914 17.4792 1.95312 13.9531 1.95312 9.60359ZM9.82869 0.228027C4.65071 0.228027 0.453125 4.42561 0.453125 9.60359C0.453125 14.7816 4.65071 18.9792 9.82869 18.9792C12.1477 18.9792 14.2701 18.1372 15.9068 16.7423L19.9365 20.7721L20.9972 19.7114L16.9674 15.6817C18.3623 14.0449 19.2043 11.9226 19.2043 9.60359C19.2043 4.42561 15.0067 0.228027 9.82869 0.228027Z"
												fill="currentColor"
											/>
										</svg>
									}
									htmlType="submit"
									// disabled={loading || (!formQuery && !(formQuery?.trim()))}
									disabled={loading || checkQuery(formQuery)}
								>
									Найти
								</Button>
							</Flex>
						</Form>
					</div>

					{loading && (
						<div className={styles.container_loading}>
							<div
								className="d-flex flex-column align-items-center justify-content-center"
								style={{
									height: '100%',
									width: '100%',
									position: 'absolute',
									top: 0,
									left: 0,
								}}
							>
								<span className="loader"></span>
							</div>
						</div>
					)}
					{!loading && query && (
						<>
							<Flex justify="space-between" align="end">
								<Flex>
									<Button
										size="large"
										className={`${styles.btn_timeFrame} ${timeFrame === 'month'
												? `${styles.btn_active}`
												: ''}`}
										onClick={() => setTimeFrame('month')}
									>
										По месяцам
									</Button>
									<Button
										size="large"
										className={`${styles.btn_timeFrame} ${timeFrame === 'day'
												? `${styles.btn_active}`
												: ''}
										`}
										onClick={() => setTimeFrame('day')}
									>
										По дням
									</Button>
								</Flex>
								<Flex align="end" gap={16}>
									{timeFrame === 'day' && <Filters
										shopSelect={false}
										timeSelect={true}
										brandSelect={false}
										articleSelect={false}
										groupSelect={false}
									/>}
									<Button
										className={styles.btn}
										type="primary"
										size="large"
										icon={
											<svg
												width="18"
												height="17"
												viewBox="0 0 18 17"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M9.9 6.70002H14.4L9 12.1L3.6 6.70002H8.1V0.400024H9.9V6.70002ZM1.8 14.8H16.2V8.50002H18V15.7C18 15.9387 17.9052 16.1676 17.7364 16.3364C17.5676 16.5052 17.3387 16.6 17.1 16.6H0.9C0.661305 16.6 0.432387 16.5052 0.263604 16.3364C0.0948211 16.1676 0 15.9387 0 15.7V8.50002H1.8V14.8Z"
													fill="currentColor"
												/>
											</svg>
										}
										loading={downloadLoading}
										onClick={handleDownload}
									>
										Скачать Excel
									</Button>
								</Flex>
							</Flex>
							<div className={styles.container}>
								<div className={styles.chart}>
									<TrendAnalysisQueryChart data={data?.chart} />
								</div>
								<div className={styles.table}>
									<ConfigProvider
										renderEmpty={() => (
											<div>Нет данных</div>
										)}
										theme={{
											components: {
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
													headerSortActiveBg:
														'#e7e1fe',
													headerSortHoverBg:
														'#e7e1fe',
													rowSelectedBg: '#f7f6fe',
													rowSelectedHoverBg:
														'#e7e1fe',
													colorText: '#1A1A1A',
													lineHeight: 1.2,
													fontWeightStrong: 500,
												},
												Checkbox: {
													colorBorder: '#ccc',
													colorPrimary: '#5329ff',
													colorPrimaryBorder:
														'#5329ff',
													colorPrimaryHover:
														'#5329ff',
												},
											},
										}}
									>
										<Table
											columns={COLUMNS}
											dataSource={data?.table}
											pagination={false}
											showSorterTooltip={false}
											tableLayout='fixed'
										></Table>
									</ConfigProvider>
								</div>
							</div>
						</>
					)}
				</ConfigProvider>
			</section>
		</main>
	);
}
