import React, { useState, useEffect } from 'react';
import { Filters } from '@/components/sharedComponents/apiServicePagesFiltersComponent';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import styles from './TrendAnalysisQuery.module.css';
import { useAppSelector } from '@/redux/hooks';
import { ConfigProvider, Form, Input, Button, Flex, Table } from 'antd';
import TrendAnalysisQueryChart from './widget/TrendAnalysisQueryChart';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { formatPrice, fileDownload } from '@/service/utils';
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from "@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock";
import DownloadButton from '@/components/DownloadButton';
import { Table as RadarTable } from 'radar-ui';


const customCellRender = (value, record, index, dataIndex) => {
	return <div className={styles.customCellRender}>{formatPrice(value, '')}</div>;
};

export default function TrendAnalysisQuery() {
	const { isDemoMode } = useDemoMode();
	const { selectedRange } = useAppSelector(state => state.filters);
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

	const NEW_COLUMNS = [
		{
			key: 'timeFrame',
			title: timeFrame === 'month' ? 'Месяц' : 'День',
			dataIndex: 'timeFrame',
			sortable: false,
			fixed: false,
			fixedLeft: 0,
			width: 200,
			minWidth: 200,
			hidden: false,
		},
		{
			key: 'quantity',
			title: 'Частотность запроса',
			dataIndex: 'quantity',
			sortable: false,
			fixed: false,
			width: 200,
			minWidth: 200,
			hidden: false,
			units: ' ',
		},
	];

	const initQuery = () => {
		const url = new URL(location.href);
		const urlQuery = url.searchParams.get('query');
		if (window.history.state?.visited == urlQuery) {
			return null;
		}
		if (urlQuery) {
			return url.searchParams.get('query').trim().toLowerCase();
		}
		return null;
	};
	const [query, setQuery] = useState(initQuery());


	const updateHistoryState = () => {
		const url = new URL(location.href);
		if (query !== window.history.state?.visited && query) {
			url.searchParams.set('query', query);
		} else {
			url.searchParams.delete('query');
		}
		window.history.pushState({ visited: query }, '', url);
	};

	useEffect(() => {
		updateHistoryState();
	}, [query]);

	const [form] = Form.useForm();
	const formQuery = Form.useWatch('query', form);

	const submitQuery = (data) => {
		const query = isDemoMode ? 'платье женское' : data?.query?.trim().toLowerCase();
		if (!query) return;
		setQuery(query);
		setTimeFrame('month');
	};

	useEffect(() => {
		if (isDemoMode) {
			form.setFieldValue('query', 'платье женское');
			submitQuery();
		}
	}, [isDemoMode]);

	useEffect(() => {
		updateData();
	}, [query, timeFrame, selectedRange]);

	const mapResponseToData = (response) => {
		const data = response[query];
		const labels = data.map((el) => Object.keys(el)[0].split(' ').reverse().join(' '));
		const values = data.map((el) => Object.values(el)[0]);

		const dataResult = {
			chart: {
				labels: labels,
				data: values
			}
		};

		dataResult.table = data.map((el, i) => ({
			key: i,
			timeFrame: labels[i],
			quantity: values[i],
		})).reverse();

		setData(dataResult);
	};

	const checkQuery = (query) => {
		if (!query) {
			return true;
		}
		if (query?.trim()) {
			return query.trim().length === 0;
		}
		return true;
	};

	const updateData = async () => {
		if (!query) {
			return;
		}
		setLoading(true);

		try {
			const response = await ServiceFunctions.getTrendAnalysisQuery(
				query,
				timeFrame,
				selectedRange,
			);

			mapResponseToData(response);
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
		try {
			const fileBlob = await ServiceFunctions.getDownloadTrendAnalysisQuery(
				query,
				timeFrame,
				selectedRange,
			);
			fileDownload(fileBlob, `Статистика_запроса.xlsx`);
		} catch (error) {
			console.error('Ошибка скачивания: ', error);
		} finally {
			setDownloadLoading(false);
		}
	};

	return (
		<main className={styles.page}>
			<MobilePlug />

			<aside className={styles.page__sideNavWrapper}>
				<Sidebar />
			</aside>

			<section className={styles.page__content}>
				<div className={styles.page__headerWrapper}>
					<Header title="Анализ трендовой динамики запросов"></Header>
				</div>

				{isDemoMode && <NoSubscriptionWarningBlock />}

				<ConfigProvider
					theme={{
						token: {
							colorBgContainer: 'white',
							borderRadius: 8,
							fontFamily: 'Mulish',
							fontSize: 12,
							fontWeight: 500,
							colorBorder: '#5329FF1A',
							controlHeightLG: 38,
							controlHeight: 38,
						},
						components: {
							Input: {
								activeBorderColor: '#5329FF1A',
								hoverBorderColor: '#5329FF1A',
								activeOutlineColor: 'transparent',
								activeBg: 'transparent',
								hoverBg: 'transparent',
								activeBg: 'transparent',
								activeShadow: 'transparent'
							},
							Form: {
								itemMarginBottom: 0,
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
						}
						// token: {
						// 	Form: {
						// 		itemMarginBottom: 0,
						// 	},
						// 	Input: {
						// 		controlHeightLG: 40,
						// 		paddingBlockLG: 7,
						// 		paddingInlineLG: 16,
						// 		borderRadiusLG: 8,
						// 		fontSize: 16,
						// 		lineHeight: 1,
						// 		colorBorder: '#5329FF80',
						// 		activeBorderColor: '#5329FF',
						// 		hoverBorderColor: '#5329FF',
						// 	},
						// 	Button: {
						// 		paddingInlineLg: 12,
						// 		paddingBlockLg: 8,
						// 		controlHeightLG: 40,
						// 		defaultShadow: 'none',
						// 		defaultBorderColor: 'transparent',
						// 		defaultHoverBorderColor: 'transparent',
						// 		defaultColor: '#1A1A1A80',
						// 		defaultHoverColor: '#1A1A1A',
						// 		defaultBg: 'transparent',
						// 		defaultHoverBg: 'transparent',
						// 		colorPrimary: '#5329FF',
						// 		primaryColor: '#fff',
						// 		colorPrimaryBg: '#5329FF',
						// 		colorPrimaryBorder: '#5329FF',
						// 		colorPrimaryBgHover: '#7a52ff',
						// 		colorPrimaryBorderHover: '#7a52ff',
						// 		colorPrimaryHover: '#7a52ff',
						// 		colorPrimaryActive: '#3818d9',
						// 	},
						// },
					}}
				>
					<div className={styles.control}>
						<p className={styles.control__title}>Поисковой запрос</p>
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
										placeholder="Введите поисковый запрос"
										prefix={
											<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M9.12793 0C14.1687 0.000149462 18.2549 4.08714 18.2549 9.12793C18.2548 11.3852 17.4328 13.4488 16.0752 15.042L20 18.9678L19.4834 19.4834L18.9678 20L15.042 16.0752C13.4488 17.4328 11.3852 18.2548 9.12793 18.2549C4.08714 18.2549 0.000149459 14.1687 0 9.12793C0 4.08705 4.08705 0 9.12793 0ZM9.12793 1.46094C4.89354 1.46094 1.46094 4.89354 1.46094 9.12793C1.46109 13.3622 4.89363 16.7949 9.12793 16.7949C13.3621 16.7948 16.7948 13.3621 16.7949 9.12793C16.7949 4.89363 13.3622 1.46109 9.12793 1.46094Z" fill="#8C8C8C" />
											</svg>
										}
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
									title={isDemoMode && 'Демонстрационный режим'}
									disabled={loading || checkQuery(formQuery) || isDemoMode}
								>
									Найти
								</Button>
							</Flex>
							<div className={styles.example}>
								{'Например: '}
								<button
									className={styles.example__button}
									onClick={() => {
										form.setFieldValue('query', 'Шорты');
										form.submit()
									}}
								>
									Шорты
								</button>
							</div>
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
							<div className={styles.control__header}>
								<p className={styles.control__headerTitle}>Динамика запросов</p>
								<Flex justify="space-between" align="end">
									<Flex gap={4} align="center">
										<button
											className={timeFrame === 'month' ? `${styles.segmented__button} ${styles.segmented__button_active}` : styles.segmented__button}
											onClick={() => setTimeFrame('month')}
											style={{ fontWeight: 500, fontSize: 14 }}
										>
											По месяцам
										</button>
										<button
											className={timeFrame === 'day' ? `${styles.segmented__button} ${styles.segmented__button_active}` : styles.segmented__button}
											onClick={() => setTimeFrame('day')}
											style={{ fontWeight: 500, fontSize: 14 }}
										>
											По дням
										</button>
									</Flex>
									<Flex align="end" gap={16}>
										{timeFrame === 'day' && <Filters
											shopSelect={false}
											timeSelect={true}
											brandSelect={false}
											articleSelect={false}
											groupSelect={false}
										/>}
										<DownloadButton
											loading={downloadLoading}
											handleDownload={handleDownload}
										/>
									</Flex>
								</Flex>
							</div>
							<div className={styles.container}>
								<div className={styles.chart}>
									<TrendAnalysisQueryChart data={data?.chart} />
								</div>

								{data?.table &&
									<div className={styles.table}>
										<RadarTable
											preset='radar-table-default'
											config={NEW_COLUMNS}
											dataSource={data.table}
											bodyRowClassName={styles.bodyRowSpecial}
											paginationContainerStyle={{ display: 'none' }}
											bodyCellWrapperStyle={{
												//fontWeight: 700,
											}}
											bodyCellWrapperClassName={styles.customBodyCellWrapperClassName}
											customCellRender={{
												idx: ['quantity'],
												renderer: customCellRender
											}}
										/>
									</div>
								}
							</div>
						</>
					)}
				</ConfigProvider>
			</section>
		</main>
	);
}
