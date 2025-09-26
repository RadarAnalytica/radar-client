import AuthContext from '../service/AuthContext';
import { useContext } from 'react';

const mockShops = [
	{
		brand_name: 'Магазин',
		is_active: true,
		id: 19999,
		updated_at: '2025-04-23 08:16:45.163873',
		is_valid: true,
		is_primary_collect: true,
		is_self_cost_set: true,
	},
	// {
	// 	brand_name: 'ИП',
	// 	is_active: true,
	// 	id: 29999,
	// 	updated_at: '2025-04-23 08:16:45.163873',
	// 	is_valid: true,
	// 	is_primary_collect: true,
	// },
];

const mockDashBoard = {
	19999: {
		7: {
			orderCountList: [35, 51, 45, 31, 38, 22, 0],
			orderAmountList: [
				66419.45, 103118.91, 79247.21, 60270.31, 78310.58, 45129, 0,
			],
			saleCountList: [4, 7, 10, 9, 14, 7, 0],
			saleAmountList: [
				9880.9, 12917.93, 18630, 15727.83, 25606, 13803.93, 0,
			],
			orderCount: 222,
			orderAmount: 432495.46,
			saleCount: 48,
			saleAmount: 103390.49,
			orderCountCompare: '51%',
			orderAmountCompare: '25%',
			saleCountCompare: '108%',
			saleAmountCompare: '68%',
			buyoutPercent: 94.1,
			buyoutPercentCompare: '-1%',
			costPriceAmount: 10656,
			costPriceAmountCompare: '0%',
			costPriceCount: 48,
			returnCount: 3,
			returnCountCompare: '-100%',
			returnAmount: 6823.9,
			returnAmountCompare: '0%',
			averageBill: 1948,
			averageBillCompare: -17,
			penalty: 0,
			additional: 0,
			commissionWB: 21986.969999999998,
			commissionWBCompare: '63%',
			logistics: 0,
			logisticsCompare: '0%',
			proceeds: 103390.49,
			proceedsCompare: '68%',
			marginalProfit: 92734.49,
			marginalProfitCompare: '50%',
			lostSalesCount: 0,
			lostSalesAmount: 0,
			grossProfit: 92734.49,
			grossProfitCompare: '50%',
			operatingProfit: 68632.5,
			operatingProfitCompare: '60%',
			netProfit: 21059.4,
			netProfitCompare: '23%',
			averageProfit: 3008.49,
			averageProfitCompare: '0%',
			tax: 47573.1,
			taxCompare: '85%',
			fbs: {
				count: 0,
				retail_amount: 0,
				cost_amount: 0,
			},
			fbo: {
				count: 285,
				retail_amount: 2608480,
				cost_amount: 62826,
			},
			toClient: {
				count: 180,
				retail_amount: 1827000,
				cost_amount: 38628,
			},
			fromClient: {
				count: 110,
				retail_amount: 967750,
				cost_amount: 19758,
			},
			advertAmount: 0,
			advertAmountCompare: '0%',
			advertPercent: 0,
			advertPercentCompare: '0%',
			commissionWBPercent: 21.3,
			commissionWBPercentCompare: '-2%',
			logisticsPercent: 0,
			logisticsPercentCompare: '0%',
			roi: 60.59,
			grossProfitAbility: 89.69,
			operatingProfitAbility: 66.38,
			ABCAnalysis: {
				amountA: 80912.63,
				countA: 35,
				amountPercentA: 78.26,
				countPercentA: 72.92,
				amountB: 16796.86,
				countB: 9,
				amountPercentB: 16.25,
				countPercentB: 18.75,
				amountC: 5681,
				countC: 4,
				amountPercentC: 5.49,
				countPercentC: 8.33,
			},
			storageData: 2115.0237720000005,
			storageDataCompare: -59,
			self_buy: 0,
			incorrect_attachments: 0,
			goods_labeling: 0,
			characteristics_change: 0,
			acceptance: 0,
			marginalityRoiChart: [
				{
					date: '2025-05-09',
					roi: 51.03,
					marginality: 91.01,
				},
				{
					date: '2025-05-10',
					roi: 80.86,
					marginality: 91.23,
				},
				{
					date: '2025-05-11',
					roi: 45.49,
					marginality: 88.08,
				},
				{
					date: '2025-05-12',
					roi: 60.61,
					marginality: 89.49,
				},
				{
					date: '2025-05-13',
					roi: 46.59,
					marginality: 87.86,
				},
				{
					date: '2025-05-14',
					roi: 106.63,
					marginality: 92.25,
				},
				{
					date: '2025-05-15',
					roi: 0,
					marginality: 0,
				},
			],
			salesAndProfit: [
				{
					date: '2025-05-09',
					sales: 9880.9,
					profit: 1917.02,
				},
				{
					date: '2025-05-10',
					sales: 12917.93,
					profit: 3530.34,
				},
				{
					date: '2025-05-11',
					sales: 18630,
					profit: 3256.52,
				},
				{
					date: '2025-05-12',
					sales: 15727.83,
					profit: 3430.12,
				},
				{
					date: '2025-05-13',
					sales: 25606,
					profit: 4507.75,
				},
				{
					date: '2025-05-14',
					sales: 13803.93,
					profit: 4417.65,
				},
				{
					date: '2025-05-15',
					sales: 0,
					profit: 0,
				},
			],
			structure: {
				retentions: 23.31,
				external_expenses: 0,
				tax: 46.01,
				profit: 20.37,
				costPrice: 10.31,
			},
			taxInfo: [
				{
					wbRealization: 103390.49,
					taxBase: 79288.5,
					taxRate: 60,
					taxType: 'Считать от РС',
					taxAmount: 47573.1,
				},
			],
			revenueByWarehouse: [
				{
					name: 'Владимир',
					revenue: 1963,
				},
				{
					name: 'Екатеринбург - Испытателей 14г',
					revenue: 2008.3,
				},
				{
					name: 'Казань',
					revenue: 4022.64,
				},
				{
					name: 'Коледино',
					revenue: 16543.65,
				},
				{
					name: 'Краснодар',
					revenue: 6311.8,
				},
				{
					name: 'Невинномысск',
					revenue: 3278.21,
				},
				{
					name: 'Новосибирск',
					revenue: 4665.14,
				},
				{
					name: 'Подольск',
					revenue: 6040.03,
				},
				{
					name: 'Рязань (Тюшевское)',
					revenue: 1736.5,
				},
				{
					name: 'Самара (Новосемейкино)',
					revenue: 1963,
				},
				{
					name: 'Санкт-Петербург Уткина Заводь',
					revenue: 1963,
				},
				{
					name: 'Тула',
					revenue: 12733.07,
				},
				{
					name: 'Электросталь',
					revenue: 33432.89,
				},
			],
			is_self_cost: true,
		},
		14: {
			orderCountList: [
				16, 11, 23, 16, 19, 23, 39, 35, 51, 45, 31, 38, 22, 0,
			],
			orderAmountList: [
				42061.63, 29982.33, 62175.89, 36567.63, 46260.81, 52940.62,
				75131.43, 66419.45, 103118.91, 79247.21, 60270.31, 78310.58,
				45129, 0,
			],
			saleCountList: [2, 7, 2, 2, 4, 1, 6, 4, 7, 10, 9, 14, 7, 0],
			saleAmountList: [
				4952, 16784, 3588, 4679, 13161, 2182, 12863, 9880.9, 12917.93,
				18630, 15727.83, 25606, 13803.93, 0,
			],
			orderCount: 369,
			orderAmount: 777615.8,
			saleCount: 71,
			saleAmount: 164878.49,
			orderCountCompare: '161%',
			orderAmountCompare: '70%',
			saleCountCompare: '129%',
			saleAmountCompare: '15%',
			buyoutPercent: 94.7,
			buyoutPercentCompare: '16%',
			costPriceAmount: 15762,
			costPriceAmountCompare: '0%',
			costPriceCount: 71,
			returnCount: 4,
			returnCountCompare: '-100%',
			returnAmount: 10102.9,
			returnAmountCompare: '0%',
			averageBill: 2107,
			averageBillCompare: -34,
			penalty: 0,
			additional: 0,
			commissionWB: 35444.82,
			commissionWBCompare: '52%',
			logistics: 0,
			logisticsCompare: '-100%',
			proceeds: 164878.49,
			proceedsCompare: '15%',
			marginalProfit: 149116.49,
			marginalProfitCompare: '4%',
			lostSalesCount: 0,
			lostSalesAmount: 0,
			grossProfit: 149116.49,
			grossProfitCompare: '4%',
			operatingProfit: 106296.84,
			operatingProfitCompare: '0%',
			netProfit: 33061.54,
			netProfitCompare: '-21%',
			averageProfit: 2361.54,
			averageProfitCompare: '0%',
			tax: 73235.3,
			taxCompare: '15%',
			fbs: {
				count: 0,
				retail_amount: 0,
				cost_amount: 0,
			},
			fbo: {
				count: 285,
				retail_amount: 2608480,
				cost_amount: 62826,
			},
			toClient: {
				count: 180,
				retail_amount: 1827000,
				cost_amount: 38628,
			},
			fromClient: {
				count: 110,
				retail_amount: 967750,
				cost_amount: 19758,
			},
			advertAmount: 0,
			advertAmountCompare: '0%',
			advertPercent: 0,
			advertPercentCompare: '0%',
			commissionWBPercent: 21.5,
			commissionWBPercentCompare: '31%',
			logisticsPercent: 0,
			logisticsPercentCompare: '-100%',
			roi: 56.44,
			grossProfitAbility: 90.44,
			operatingProfitAbility: 64.47,
			ABCAnalysis: {
				amountA: 128863.63,
				countA: 54,
				amountPercentA: 78.16,
				countPercentA: 76.06,
				amountB: 26615.86,
				countB: 11,
				amountPercentB: 16.14,
				countPercentB: 15.49,
				amountC: 9399,
				countC: 6,
				amountPercentC: 5.7,
				countPercentC: 8.45,
			},
			storageData: 7374.8342085,
			storageDataCompare: 16,
			self_buy: 0,
			incorrect_attachments: 0,
			goods_labeling: 0,
			characteristics_change: 0,
			acceptance: 0,
			marginalityRoiChart: [
				{
					date: '2025-05-02',
					roi: 4.63,
					marginality: 91.03,
				},
				{
					date: '2025-05-03',
					roi: 53.32,
					marginality: 90.74,
				},
				{
					date: '2025-05-04',
					roi: 23.44,
					marginality: 87.63,
				},
				{
					date: '2025-05-05',
					roi: 242.06,
					marginality: 97.21,
				},
				{
					date: '2025-05-06',
					roi: 62.4,
					marginality: 93.25,
				},
				{
					date: '2025-05-07',
					roi: 18.52,
					marginality: 89.83,
				},
				{
					date: '2025-05-08',
					roi: 47.29,
					marginality: 89.64,
				},
				{
					date: '2025-05-09',
					roi: 51.03,
					marginality: 91.01,
				},
				{
					date: '2025-05-10',
					roi: 80.86,
					marginality: 91.23,
				},
				{
					date: '2025-05-11',
					roi: 45.49,
					marginality: 88.08,
				},
				{
					date: '2025-05-12',
					roi: 60.61,
					marginality: 89.49,
				},
				{
					date: '2025-05-13',
					roi: 46.59,
					marginality: 87.86,
				},
				{
					date: '2025-05-14',
					roi: 106.63,
					marginality: 92.25,
				},
				{
					date: '2025-05-15',
					roi: 0,
					marginality: 0,
				},
			],
			salesAndProfit: [
				{
					date: '2025-05-02',
					sales: 4952,
					profit: 177.92,
				},
				{
					date: '2025-05-03',
					sales: 16784,
					profit: 3303.13,
				},
				{
					date: '2025-05-04',
					sales: 3588,
					profit: 431.82,
				},
				{
					date: '2025-05-05',
					sales: 4679,
					profit: 2617.47,
				},
				{
					date: '2025-05-06',
					sales: 13161,
					profit: 2883.33,
				},
				{
					date: '2025-05-07',
					sales: 2182,
					profit: 234.09,
				},
				{
					date: '2025-05-08',
					sales: 12863,
					profit: 2354.38,
				},
				{
					date: '2025-05-09',
					sales: 9880.9,
					profit: 1917.02,
				},
				{
					date: '2025-05-10',
					sales: 12917.93,
					profit: 3530.34,
				},
				{
					date: '2025-05-11',
					sales: 18630,
					profit: 3256.52,
				},
				{
					date: '2025-05-12',
					sales: 15727.83,
					profit: 3430.12,
				},
				{
					date: '2025-05-13',
					sales: 25606,
					profit: 4507.75,
				},
				{
					date: '2025-05-14',
					sales: 13803.93,
					profit: 4417.65,
				},
				{
					date: '2025-05-15',
					sales: 0,
					profit: 0,
				},
			],
			structure: {
				retentions: 25.97,
				external_expenses: 0,
				tax: 44.42,
				profit: 20.05,
				costPrice: 9.56,
			},
			taxInfo: [
				{
					wbRealization: 164878.49,
					taxBase: 122058.84,
					taxRate: 60,
					taxType: 'Считать от РС',
					taxAmount: 73235.3,
				},
			],
			revenueByWarehouse: [
				{
					name: 'Владимир',
					revenue: 1963,
				},
				{
					name: 'Екатеринбург - Испытателей 14г',
					revenue: 2008.3,
				},
				{
					name: 'Казань',
					revenue: 16027.89,
				},
				{
					name: 'Коледино',
					revenue: 21526.65,
				},
				{
					name: 'Краснодар',
					revenue: 11906.34,
				},
				{
					name: 'Невинномысск',
					revenue: 3278.21,
				},
				{
					name: 'Новосибирск',
					revenue: 8069.43,
				},
				{
					name: 'Подольск',
					revenue: 6040.03,
				},
				{
					name: 'Рязань (Тюшевское)',
					revenue: 4533.77,
				},
				{
					name: 'Самара (Новосемейкино)',
					revenue: 1963,
				},
				{
					name: 'Санкт-Петербург Уткина Заводь',
					revenue: 1963,
				},
				{
					name: 'Тула',
					revenue: 22321.57,
				},
				{
					name: 'Электросталь',
					revenue: 51869.41,
				},
			],
			is_self_cost: true,
		},
		30: {
			orderCountList: [
				0, 40, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 54, 41, 62,
				48, 47, 95, 88, 60, 117, 82, 70, 72, 87, 25,
			],
			orderAmountList: [
				0, 53273.73, 14015, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62517.9,
				76791.19, 57650.4, 83930.27, 66799, 72022, 153645.77, 170122.94,
				103383.09, 202928.79, 138563, 115940.32, 130725.45, 165209.77,
				44964.56,
			],
			saleCountList: [
				0, 53, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 53, 53, 42,
				38, 46, 46, 47, 44, 50, 50, 51, 64, 80, 7,
			],
			saleAmountList: [
				0, 90877, 14004, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50323.81,
				87392.53, 86331.16, 65505.3, 45546, 62857.76, 63014.8, 66579.11,
				56329.47, 74318.62, 89917.3, 86445.19, 100264.09, 126082.4,
				13880,
			],
			orderCount: 1042,
			orderAmount: 1712483.18,
			saleCount: 767,
			saleAmount: 1179668.54,
			orderCountCompare: '6%',
			orderAmountCompare: '8%',
			saleCountCompare: '19%',
			saleAmountCompare: '11%',
			buyoutPercent: 100,
			buyoutPercentCompare: '0%',
			costPriceAmount: 128372,
			costPriceAmountCompare: '0%',
			costPriceCount: 767,
			returnCount: 0,
			returnCountCompare: '0%',
			returnAmount: 0,
			returnAmountCompare: '0%',
			averageBill: 1643,
			averageBillCompare: 1,
			penalty: 0,
			additional: 0,
			commissionWB: 151700.98,
			commissionWBCompare: '16%',
			logistics: 52100,
			logisticsCompare: '6%',
			proceeds: 1179668.54,
			proceedsCompare: '11%',
			marginalProfit: 1051296.54,
			marginalProfitCompare: '0%',
			lostSalesCount: 0,
			lostSalesAmount: 0,
			grossProfit: 1051296.54,
			grossProfitCompare: '0%',
			operatingProfit: 776215.83,
			operatingProfitCompare: '-4%',
			netProfit: 776215.83,
			netProfitCompare: '-4%',
			averageProfit: 25873.86,
			averageProfitCompare: '0%',
			tax: 0,
			taxCompare: '0%',
			fbs: { count: 0, retail_amount: 0, cost_amount: 0 },
			fbo: { count: 967, retail_amount: 1938752, cost_amount: 138633 },
			toClient: {
				count: 407,
				retail_amount: 1060997,
				cost_amount: 35653,
			},
			fromClient: { count: 64, retail_amount: 80929, cost_amount: 7248 },
			advertAmount: 69811,
			advertAmountCompare: '13%',
			advertPercent: 5.9,
			advertPercentCompare: '0%',
			commissionWBPercent: 12.9,
			commissionWBPercentCompare: '4%',
			logisticsPercent: 4.4,
			logisticsPercentCompare: '-4%',
			roi: 192.39,
			grossProfitAbility: 89.12,
			operatingProfitAbility: 65.8,
			ABCAnalysis: {
				amountA: 917468.77,
				countA: 529,
				amountPercentA: 77.77,
				countPercentA: 68.97,
				amountB: 202051.77,
				countB: 189,
				amountPercentB: 17.13,
				countPercentB: 24.64,
				amountC: 60148,
				countC: 49,
				amountPercentC: 5.1,
				countPercentC: 6.39,
			},
			storageData: 1468.7269572,
			storageDataCompare: 39,
			self_buy: 0,
			incorrect_attachments: 0,
			goods_labeling: 0,
			characteristics_change: 0,
			acceptance: 0,
			marginalityRoiChart: [
				{ date: '2025-03-25', roi: 0, marginality: 0 },
				{ date: '2025-03-26', roi: 687.52, marginality: 89.68 },
				{ date: '2025-03-27', roi: 1688.24, marginality: 95.25 },
				{ date: '2025-03-28', roi: 0, marginality: 0 },
				{ date: '2025-03-29', roi: 0, marginality: 0 },
				{ date: '2025-03-30', roi: 0, marginality: 0 },
				{ date: '2025-03-31', roi: 0, marginality: 0 },
				{ date: '2025-04-01', roi: 0, marginality: 0 },
				{ date: '2025-04-02', roi: 0, marginality: 0 },
				{ date: '2025-04-03', roi: 0, marginality: 0 },
				{ date: '2025-04-04', roi: 0, marginality: 0 },
				{ date: '2025-04-05', roi: 0, marginality: 0 },
				{ date: '2025-04-06', roi: 0, marginality: 0 },
				{ date: '2025-04-07', roi: 0, marginality: 0 },
				{ date: '2025-04-08', roi: 0, marginality: 0 },
				{ date: '2025-04-09', roi: 449.97, marginality: 86.22 },
				{ date: '2025-04-10', roi: 817.73, marginality: 91.36 },
				{ date: '2025-04-11', roi: 724.05, marginality: 90.18 },
				{ date: '2025-04-12', roi: 609.13, marginality: 89.23 },
				{ date: '2025-04-13', roi: 392.59, marginality: 84.75 },
				{ date: '2025-04-14', roi: 520.58, marginality: 86.91 },
				{ date: '2025-04-15', roi: 485.86, marginality: 87.84 },
				{ date: '2025-04-16', roi: 497.62, marginality: 88.52 },
				{ date: '2025-04-17', roi: 435.23, marginality: 87.48 },
				{ date: '2025-04-18', roi: 421.96, marginality: 86.48 },
				{ date: '2025-04-19', roi: 568.28, marginality: 88.79 },
				{ date: '2025-04-20', roi: 640.16, marginality: 90.08 },
				{ date: '2025-04-21', roi: 816.94, marginality: 91.18 },
				{ date: '2025-04-22', roi: 725.16, marginality: 90.15 },
				{ date: '2025-04-23', roi: 1267.26, marginality: 94.19 },
			],
			salesAndProfit: [
				{ date: '2025-03-25', sales: 0, profit: 0 },
				{ date: '2025-03-26', sales: 90877, profit: 64509.84 },
				{ date: '2025-03-27', sales: 14004, profit: 11226.79 },
				{ date: '2025-03-28', sales: 0, profit: 0 },
				{ date: '2025-03-29', sales: 0, profit: 0 },
				{ date: '2025-03-30', sales: 0, profit: 0 },
				{ date: '2025-03-31', sales: 0, profit: 0 },
				{ date: '2025-04-01', sales: 0, profit: 0 },
				{ date: '2025-04-02', sales: 0, profit: 0 },
				{ date: '2025-04-03', sales: 0, profit: 0 },
				{ date: '2025-04-04', sales: 0, profit: 0 },
				{ date: '2025-04-05', sales: 0, profit: 0 },
				{ date: '2025-04-06', sales: 0, profit: 0 },
				{ date: '2025-04-07', sales: 0, profit: 0 },
				{ date: '2025-04-08', sales: 0, profit: 0 },
				{ date: '2025-04-09', sales: 50323.81, profit: 31196.73 },
				{ date: '2025-04-10', sales: 87392.53, profit: 61738.37 },
				{ date: '2025-04-11', sales: 86331.16, profit: 61392.35 },
				{ date: '2025-04-12', sales: 65505.3, profit: 42986.6 },
				{ date: '2025-04-13', sales: 45546, profit: 27265.44 },
				{ date: '2025-04-14', sales: 62857.76, profit: 42817.81 },
				{ date: '2025-04-15', sales: 63014.8, profit: 37240.81 },
				{ date: '2025-04-16', sales: 66579.11, profit: 38022.91 },
				{ date: '2025-04-17', sales: 56329.47, profit: 30701.33 },
				{ date: '2025-04-18', sales: 74318.62, profit: 42402.99 },
				{ date: '2025-04-19', sales: 89917.3, profit: 57299.99 },
				{ date: '2025-04-20', sales: 86445.19, profit: 54880.54 },
				{ date: '2025-04-21', sales: 100264.09, profit: 72242.08 },
				{ date: '2025-04-22', sales: 126082.4, profit: 90064.46 },
				{ date: '2025-04-23', sales: 13880, profit: 10226.8 },
			],
			structure: {
				retentions: 23.32,
				external_expenses: 0,
				tax: 0,
				profit: 65.8,
				costPrice: 10.88,
			},
			taxInfo: [
				{
					wbRealization: 1179668.54,
					taxBase: 904587.83,
					taxRate: 0,
					taxType: 'Считать от РС',
					taxAmount: 0,
				},
			],
			revenueByWarehouse: [
				{ name: 'Белые Столбы', revenue: 4054.07 },
				{ name: 'Владикавказ', revenue: 269646.05 },
				{ name: 'Екатеринбург - Испытателей 14г', revenue: 1166.42 },
				{ name: 'Казань', revenue: 119683.5 },
				{ name: 'Коледино', revenue: 7380.55 },
				{ name: 'Котовск', revenue: 55794.16 },
				{ name: 'Краснодар', revenue: 149021.94 },
				{ name: 'Невинномысск', revenue: 2142.83 },
				{ name: 'Тула', revenue: 3450.37 },
				{ name: 'Чашниково', revenue: 725.4 },
				{ name: 'Электросталь', revenue: 649187.63 },
			],
			is_self_cost: false,
		},
		90: {
			orderCountList: [
				38, 14, 18, 45, 29, 24, 20, 23, 26, 21, 24, 18, 11, 13, 31, 13,
				12, 21, 15, 11, 10, 43, 37, 52, 49, 40, 42, 47, 61, 97, 22, 11,
				13, 32, 27, 26, 22, 15, 32, 26, 27, 29, 17, 38, 44, 31, 18, 28,
				17, 20, 13, 19, 17, 15, 24, 14, 18, 23, 14, 23, 20, 22, 10, 7,
				8, 8, 12, 16, 10, 10, 14, 26, 16, 4, 0, 0, 16, 11, 23, 16, 19,
				23, 39, 35, 51, 45, 31, 38, 22, 0,
			],
			orderAmountList: [
				46462, 15666, 18547.8, 59766.84, 36086.69, 30913.61, 22864.29,
				30752.84, 35673.24, 24719.98, 32072, 18932.49, 14079.17,
				17711.58, 46218.03, 20659.7, 16562.64, 34217.62, 20825.82,
				10226, 16118.24, 96197.25, 103535.69, 152748.51, 141463.82,
				113808.39, 126360.58, 144343.66, 176471.76, 276975.43, 78558.24,
				37971, 53687, 121613.25, 94759.69, 98424.01, 74129.93, 49278.29,
				122492.05, 96294.95, 100822, 116759, 65869, 118872.63,
				141211.48, 108091, 62270, 96199.04, 63958, 77893.95, 46683.93,
				61568, 61350, 57030, 77468.97, 49923, 55200.63, 75045.83,
				47013.82, 92931, 72686.19, 74505, 30308, 21513, 34749, 31227,
				39750, 48579.36, 36943, 28926, 39163.41, 81662.82, 50642,
				12124.93, 0, 0, 42061.63, 29982.33, 62175.89, 36567.63,
				46260.81, 52940.62, 75131.43, 66419.45, 103118.91, 79247.21,
				60270.31, 78310.58, 45129, 0,
			],
			saleCountList: [
				8, 4, 11, 9, 9, 9, 6, 12, 4, 8, 8, 5, 11, 6, 7, 2, 8, 4, 9, 6,
				10, 6, 3, 10, 9, 13, 8, 5, 10, 12, 6, 10, 11, 7, 5, 8, 10, 2, 4,
				5, 5, 11, 5, 2, 2, 10, 4, 6, 4, 5, 4, 4, 7, 3, 2, 4, 4, 4, 5, 5,
				7, 2, 4, 2, 2, 4, 3, 2, 6, 1, 3, 4, 2, 5, 0, 0, 2, 7, 2, 2, 4,
				1, 6, 4, 7, 10, 9, 14, 7, 0,
			],
			saleAmountList: [
				12587.79, 3075, 15161, 13156.4, 13608, 10019.09, 7439.99,
				15503.09, 2635, 9874.2, 8810.8, 7515, 17515.65, 8730.05,
				7679.35, 2635.41, 11055.61, 4720.19, 15123.55, 10662.6,
				15448.55, 9081, 5896.62, 21923.02, 17369.96, 37989.91, 25844.4,
				17150, 31276.04, 40583.11, 13244.93, 27000, 33638.65, 16364.6,
				17868.25, 7828.75, 30319.69, 7983, 10355, 14801, 9693, 36927.01,
				10394, 7560, 4520, 29421, 13286, 24034, 13029, 15937, 12489.63,
				11993, 22439, 6689, 4529, 12336, 12060, 13035, 19143, 7597.81,
				22977.79, 6294, 12580, 7703, 4613, 11258, 9237, 5373, 19031,
				293, 10352, 14902, 6535, 17084, 0, 0, 4952, 16784, 3588, 4679,
				13161, 2182, 12863, 9880.9, 12917.93, 18630, 15727.83, 25606,
				13803.93, 0,
			],
			orderCount: 2132,
			orderAmount: 5684746.87,
			saleCount: 462,
			saleAmount: 1279992.61,
			orderCountCompare: '-38%',
			orderAmountCompare: '3%',
			saleCountCompare: '-51%',
			saleAmountCompare: '-26%',
			buyoutPercent: 89.2,
			buyoutPercentCompare: '-2%',
			costPriceAmount: 101454,
			costPriceAmountCompare: '0%',
			costPriceCount: 462,
			returnCount: 56,
			returnCountCompare: '-78%',
			returnAmount: 154670.28,
			returnAmountCompare: '-4%',
			averageBill: 2666,
			averageBillCompare: 70,
			penalty: 0,
			additional: 0,
			commissionWB: 267722.25999999995,
			commissionWBCompare: '-36%',
			logistics: 246285.59999999995,
			logisticsCompare: '-48%',
			proceeds: 1279992.61,
			proceedsCompare: '-26%',
			marginalProfit: 1178538.61,
			marginalProfitCompare: '-32%',
			lostSalesCount: 0,
			lostSalesAmount: 0,
			grossProfit: 1178538.61,
			grossProfitCompare: '-32%',
			operatingProfit: 629486.87,
			operatingProfitCompare: '-21%',
			netProfit: 329082.91,
			netProfitCompare: '2%',
			averageProfit: 3656.48,
			averageProfitCompare: '0%',
			tax: 300403.96,
			taxCompare: '-37%',
			fbs: {
				count: 0,
				retail_amount: 0,
				cost_amount: 0,
			},
			fbo: {
				count: 285,
				retail_amount: 2608480,
				cost_amount: 62826,
			},
			toClient: {
				count: 180,
				retail_amount: 1827000,
				cost_amount: 38628,
			},
			fromClient: {
				count: 110,
				retail_amount: 967750,
				cost_amount: 19758,
			},
			advertAmount: 0,
			advertAmountCompare: '0%',
			advertPercent: 0,
			advertPercentCompare: '0%',
			commissionWBPercent: 20.9,
			commissionWBPercentCompare: '-13%',
			logisticsPercent: 19.2,
			logisticsPercentCompare: '-30%',
			roi: 50.59,
			grossProfitAbility: 92.07,
			operatingProfitAbility: 49.18,
			ABCAnalysis: {
				amountA: 1015581.68,
				countA: 336,
				amountPercentA: 79.34,
				countPercentA: 72.73,
				amountB: 192725.41,
				countB: 81,
				amountPercentB: 15.06,
				countPercentB: 17.53,
				amountC: 71685.52,
				countC: 45,
				amountPercentC: 5.6,
				countPercentC: 9.74,
			},
			storageData: 35043.877881000015,
			storageDataCompare: 20,
			self_buy: 0,
			incorrect_attachments: 0,
			goods_labeling: 0,
			characteristics_change: 0,
			acceptance: 0,
			marginalityRoiChart: [
				{
					date: '2025-02-15',
					roi: -6.07,
					marginality: 85.89,
				},
				{
					date: '2025-02-16',
					roi: -38.83,
					marginality: 78.34,
				},
				{
					date: '2025-02-17',
					roi: 15.59,
					marginality: 82.43,
				},
				{
					date: '2025-02-18',
					roi: -3.87,
					marginality: 86.5,
				},
				{
					date: '2025-02-19',
					roi: 8.93,
					marginality: 85.32,
				},
				{
					date: '2025-02-20',
					roi: -3.82,
					marginality: 84.49,
				},
				{
					date: '2025-02-21',
					roi: -0.55,
					marginality: 85.08,
				},
				{
					date: '2025-02-22',
					roi: 10.67,
					marginality: 82.82,
				},
				{
					date: '2025-02-23',
					roi: -57.74,
					marginality: 83.15,
				},
				{
					date: '2025-02-24',
					roi: -19.63,
					marginality: 82.01,
				},
				{
					date: '2025-02-25',
					roi: -6.06,
					marginality: 82.36,
				},
				{
					date: '2025-02-26',
					roi: 4.9,
					marginality: 85.23,
				},
				{
					date: '2025-02-27',
					roi: 30.76,
					marginality: 87.33,
				},
				{
					date: '2025-02-28',
					roi: 12.07,
					marginality: 84.74,
				},
				{
					date: '2025-03-01',
					roi: -27.59,
					marginality: 82.65,
				},
				{
					date: '2025-03-02',
					roi: -5.81,
					marginality: 83.15,
				},
				{
					date: '2025-03-03',
					roi: 28.05,
					marginality: 83.94,
				},
				{
					date: '2025-03-04',
					roi: -12.55,
					marginality: 81.19,
				},
				{
					date: '2025-03-05',
					roi: 40.76,
					marginality: 86.79,
				},
				{
					date: '2025-03-06',
					roi: 29.07,
					marginality: 87.51,
				},
				{
					date: '2025-03-07',
					roi: 21.08,
					marginality: 85.63,
				},
				{
					date: '2025-03-08',
					roi: -30.84,
					marginality: 87.78,
				},
				{
					date: '2025-03-09',
					roi: -22.68,
					marginality: 88.71,
				},
				{
					date: '2025-03-10',
					roi: -0.97,
					marginality: 89.87,
				},
				{
					date: '2025-03-11',
					roi: -23.36,
					marginality: 91.05,
				},
				{
					date: '2025-03-12',
					roi: 11.96,
					marginality: 92.4,
				},
				{
					date: '2025-03-13',
					roi: 6.75,
					marginality: 93.13,
				},
				{
					date: '2025-03-14',
					roi: -8.79,
					marginality: 94.82,
				},
				{
					date: '2025-03-15',
					roi: -1.9,
					marginality: 93.61,
				},
				{
					date: '2025-03-16',
					roi: 5.23,
					marginality: 93.44,
				},
				{
					date: '2025-03-17',
					roi: -43.4,
					marginality: 93.3,
				},
				{
					date: '2025-03-18',
					roi: -17.07,
					marginality: 93.42,
				},
				{
					date: '2025-03-19',
					roi: 24.33,
					marginality: 92.74,
				},
				{
					date: '2025-03-20',
					roi: -31.7,
					marginality: 94.57,
				},
				{
					date: '2025-03-21',
					roi: 10.62,
					marginality: 93.79,
				},
				{
					date: '2025-03-22',
					roi: -179.24,
					marginality: 94.33,
				},
				{
					date: '2025-03-23',
					roi: 36.28,
					marginality: 92.68,
				},
				{
					date: '2025-03-24',
					roi: 138.46,
					marginality: 97.9,
				},
				{
					date: '2025-03-25',
					roi: 24.32,
					marginality: 91.42,
				},
				{
					date: '2025-03-26',
					roi: 39.49,
					marginality: 92.5,
				},
				{
					date: '2025-03-27',
					roi: 20.08,
					marginality: 88.55,
				},
				{
					date: '2025-03-28',
					roi: 58.95,
					marginality: 93.39,
				},
				{
					date: '2025-03-29',
					roi: 111.57,
					marginality: 95.41,
				},
				{
					date: '2025-03-30',
					roi: 83.52,
					marginality: 98.03,
				},
				{
					date: '2025-03-31',
					roi: 72.1,
					marginality: 97.45,
				},
				{
					date: '2025-04-01',
					roi: 51.47,
					marginality: 92.45,
				},
				{
					date: '2025-04-02',
					roi: 97.29,
					marginality: 95.97,
				},
				{
					date: '2025-04-03',
					roi: 90.17,
					marginality: 95.99,
				},
				{
					date: '2025-04-04',
					roi: 94.94,
					marginality: 95.86,
				},
				{
					date: '2025-04-05',
					roi: 47.48,
					marginality: 93.04,
				},
				{
					date: '2025-04-06',
					roi: 132.46,
					marginality: 97.32,
				},
				{
					date: '2025-04-07',
					roi: 127.79,
					marginality: 97.11,
				},
				{
					date: '2025-04-08',
					roi: 66.63,
					marginality: 94.3,
				},
				{
					date: '2025-04-09',
					roi: 306.68,
					marginality: 98.35,
				},
				{
					date: '2025-04-10',
					roi: 6.47,
					marginality: 90.2,
				},
				{
					date: '2025-04-11',
					roi: 45.28,
					marginality: 92.8,
				},
				{
					date: '2025-04-12',
					roi: 40.92,
					marginality: 92.64,
				},
				{
					date: '2025-04-13',
					roi: 63.8,
					marginality: 95.41,
				},
				{
					date: '2025-04-14',
					roi: 120.73,
					marginality: 96.3,
				},
				{
					date: '2025-04-15',
					roi: 190.72,
					marginality: 96.84,
				},
				{
					date: '2025-04-16',
					roi: 54.6,
					marginality: 93.24,
				},
				{
					date: '2025-04-17',
					roi: 172.37,
					marginality: 100,
				},
				{
					date: '2025-04-18',
					roi: 142.98,
					marginality: 96.18,
				},
				{
					date: '2025-04-19',
					roi: 46.89,
					marginality: 94.24,
				},
				{
					date: '2025-04-20',
					roi: 145.67,
					marginality: 97.09,
				},
				{
					date: '2025-04-21',
					roi: 57.62,
					marginality: 94.23,
				},
				{
					date: '2025-04-22',
					roi: 336.38,
					marginality: 98.69,
				},
				{
					date: '2025-04-23',
					roi: 32.55,
					marginality: 95.87,
				},
				{
					date: '2025-04-24',
					roi: 115.4,
					marginality: 95.33,
				},
				{
					date: '2025-04-25',
					roi: -41.16,
					marginality: 24.23,
				},
				{
					date: '2025-04-26',
					roi: 43.44,
					marginality: 93.57,
				},
				{
					date: '2025-04-27',
					roi: 77.55,
					marginality: 96.17,
				},
				{
					date: '2025-04-28',
					roi: 28.81,
					marginality: 93.21,
				},
				{
					date: '2025-04-29',
					roi: 72.23,
					marginality: 93.5,
				},
				{
					date: '2025-04-30',
					roi: 0,
					marginality: 0,
				},
				{
					date: '2025-05-01',
					roi: 0,
					marginality: 0,
				},
				{
					date: '2025-05-02',
					roi: 4.63,
					marginality: 91.03,
				},
				{
					date: '2025-05-03',
					roi: 53.32,
					marginality: 90.74,
				},
				{
					date: '2025-05-04',
					roi: 23.44,
					marginality: 87.63,
				},
				{
					date: '2025-05-05',
					roi: 242.06,
					marginality: 97.21,
				},
				{
					date: '2025-05-06',
					roi: 62.4,
					marginality: 93.25,
				},
				{
					date: '2025-05-07',
					roi: 18.52,
					marginality: 89.83,
				},
				{
					date: '2025-05-08',
					roi: 47.29,
					marginality: 89.64,
				},
				{
					date: '2025-05-09',
					roi: 51.03,
					marginality: 91.01,
				},
				{
					date: '2025-05-10',
					roi: 80.86,
					marginality: 91.23,
				},
				{
					date: '2025-05-11',
					roi: 45.49,
					marginality: 88.08,
				},
				{
					date: '2025-05-12',
					roi: 60.61,
					marginality: 89.49,
				},
				{
					date: '2025-05-13',
					roi: 46.59,
					marginality: 87.86,
				},
				{
					date: '2025-05-14',
					roi: 106.63,
					marginality: 92.25,
				},
				{
					date: '2025-05-15',
					roi: 0,
					marginality: 0,
				},
			],
			salesAndProfit: [
				{
					date: '2025-02-15',
					sales: 12587.79,
					profit: -1005.71,
				},
				{
					date: '2025-02-16',
					sales: 3075,
					profit: -3290.01,
				},
				{
					date: '2025-02-17',
					sales: 15161,
					profit: 1959.46,
				},
				{
					date: '2025-02-18',
					sales: 13156.4,
					profit: -571.7,
				},
				{
					date: '2025-02-19',
					sales: 13608,
					profit: 1167.86,
				},
				{
					date: '2025-02-20',
					sales: 10019.09,
					profit: -374.33,
				},
				{
					date: '2025-02-21',
					sales: 7439.99,
					profit: -46.84,
				},
				{
					date: '2025-02-22',
					sales: 15503.09,
					profit: 1473.47,
				},
				{
					date: '2025-02-23',
					sales: 2635,
					profit: -3793.56,
				},
				{
					date: '2025-02-24',
					sales: 9874.2,
					profit: -1963.79,
				},
				{
					date: '2025-02-25',
					sales: 8810.8,
					profit: -508.8,
				},
				{
					date: '2025-02-26',
					sales: 7515,
					profit: 374.12,
				},
				{
					date: '2025-02-27',
					sales: 17515.65,
					profit: 3658.31,
				},
				{
					date: '2025-02-28',
					sales: 8730.05,
					profit: 906.27,
				},
				{
					date: '2025-03-01',
					sales: 7679.35,
					profit: -2775.81,
				},
				{
					date: '2025-03-02',
					sales: 2635.41,
					profit: -188.36,
				},
				{
					date: '2025-03-03',
					sales: 11055.61,
					profit: 2061.04,
				},
				{
					date: '2025-03-04',
					sales: 4720.19,
					profit: -862.69,
				},
				{
					date: '2025-03-05',
					sales: 15123.55,
					profit: 3607.68,
				},
				{
					date: '2025-03-06',
					sales: 10662.6,
					profit: 2001.69,
				},
				{
					date: '2025-03-07',
					sales: 15448.55,
					profit: 2483.15,
				},
				{
					date: '2025-03-08',
					sales: 9081,
					profit: -5315.68,
				},
				{
					date: '2025-03-09',
					sales: 5896.62,
					profit: -3775.22,
				},
				{
					date: '2025-03-10',
					sales: 21923.02,
					profit: -262.54,
				},
				{
					date: '2025-03-11',
					sales: 17369.96,
					profit: -6581.28,
				},
				{
					date: '2025-03-12',
					sales: 37989.91,
					profit: 4332.28,
				},
				{
					date: '2025-03-13',
					sales: 25844.4,
					profit: 1885.54,
				},
				{
					date: '2025-03-14',
					sales: 17150,
					profit: -2496.53,
				},
				{
					date: '2025-03-15',
					sales: 31276.04,
					profit: -736.98,
				},
				{
					date: '2025-03-16',
					sales: 40583.11,
					profit: 2367.29,
				},
				{
					date: '2025-03-17',
					sales: 13244.93,
					profit: -8871.36,
				},
				{
					date: '2025-03-18',
					sales: 27000,
					profit: -3904.15,
				},
				{
					date: '2025-03-19',
					sales: 33638.65,
					profit: 6243.39,
				},
				{
					date: '2025-03-20',
					sales: 16364.6,
					profit: -6370.69,
				},
				{
					date: '2025-03-21',
					sales: 17868.25,
					profit: 1898.17,
				},
				{
					date: '2025-03-22',
					sales: 7828.75,
					profit: -19343.14,
				},
				{
					date: '2025-03-23',
					sales: 30319.69,
					profit: 7417.79,
				},
				{
					date: '2025-03-24',
					sales: 7983,
					profit: 3176.69,
				},
				{
					date: '2025-03-25',
					sales: 10355,
					profit: 1364.65,
				},
				{
					date: '2025-03-26',
					sales: 14801,
					profit: 2610.37,
				},
				{
					date: '2025-03-27',
					sales: 9693,
					profit: 1073.41,
				},
				{
					date: '2025-03-28',
					sales: 36927.01,
					profit: 7926.83,
				},
				{
					date: '2025-03-29',
					sales: 10394,
					profit: 3974.29,
				},
				{
					date: '2025-03-30',
					sales: 7560,
					profit: 2965.39,
				},
				{
					date: '2025-03-31',
					sales: 4520,
					profit: 2152.62,
				},
				{
					date: '2025-04-01',
					sales: 29421,
					profit: 5872.48,
				},
				{
					date: '2025-04-02',
					sales: 13286,
					profit: 4397.07,
				},
				{
					date: '2025-04-03',
					sales: 24034,
					profit: 7214.13,
				},
				{
					date: '2025-04-04',
					sales: 13029,
					profit: 4241.1,
				},
				{
					date: '2025-04-05',
					sales: 15937,
					profit: 3098.58,
				},
				{
					date: '2025-04-06',
					sales: 12489.63,
					profit: 4877.24,
				},
				{
					date: '2025-04-07',
					sales: 11993,
					profit: 4479.5,
				},
				{
					date: '2025-04-08',
					sales: 22439,
					profit: 5337.02,
				},
				{
					date: '2025-04-09',
					sales: 6689,
					profit: 4653.11,
				},
				{
					date: '2025-04-10',
					sales: 4529,
					profit: 215.03,
				},
				{
					date: '2025-04-11',
					sales: 12336,
					profit: 2337.01,
				},
				{
					date: '2025-04-12',
					sales: 12060,
					profit: 2170.08,
				},
				{
					date: '2025-04-13',
					sales: 13035,
					profit: 3321.6,
				},
				{
					date: '2025-04-14',
					sales: 19143,
					profit: 6812.85,
				},
				{
					date: '2025-04-15',
					sales: 7597.81,
					profit: 4430.69,
				},
				{
					date: '2025-04-16',
					sales: 22977.79,
					profit: 4766.8,
				},
				{
					date: '2025-04-17',
					sales: 6294,
					profit: 0,
				},
				{
					date: '2025-04-18',
					sales: 12580,
					profit: 5141.26,
				},
				{
					date: '2025-04-19',
					sales: 7703,
					profit: 1518.96,
				},
				{
					date: '2025-04-20',
					sales: 4613,
					profit: 2292.81,
				},
				{
					date: '2025-04-21',
					sales: 11258,
					profit: 2491.41,
				},
				{
					date: '2025-04-22',
					sales: 9237,
					profit: 5959.36,
				},
				{
					date: '2025-04-23',
					sales: 5373,
					profit: 904.5,
				},
				{
					date: '2025-04-24',
					sales: 19031,
					profit: 6569.93,
				},
				{
					date: '2025-04-25',
					sales: 293,
					profit: -565.77,
				},
				{
					date: '2025-04-26',
					sales: 10352,
					profit: 1947.66,
				},
				{
					date: '2025-04-27',
					sales: 14902,
					profit: 4330.44,
				},
				{
					date: '2025-04-28',
					sales: 6535,
					profit: 982.87,
				},
				{
					date: '2025-04-29',
					sales: 17084,
					profit: 3969.36,
				},
				{
					date: '2025-04-30',
					sales: 0,
					profit: 0,
				},
				{
					date: '2025-05-01',
					sales: 0,
					profit: 0,
				},
				{
					date: '2025-05-02',
					sales: 4952,
					profit: 177.92,
				},
				{
					date: '2025-05-03',
					sales: 16784,
					profit: 3303.13,
				},
				{
					date: '2025-05-04',
					sales: 3588,
					profit: 431.82,
				},
				{
					date: '2025-05-05',
					sales: 4679,
					profit: 2617.47,
				},
				{
					date: '2025-05-06',
					sales: 13161,
					profit: 2883.33,
				},
				{
					date: '2025-05-07',
					sales: 2182,
					profit: 234.09,
				},
				{
					date: '2025-05-08',
					sales: 12863,
					profit: 2354.38,
				},
				{
					date: '2025-05-09',
					sales: 9880.9,
					profit: 1917.02,
				},
				{
					date: '2025-05-10',
					sales: 12917.93,
					profit: 3530.34,
				},
				{
					date: '2025-05-11',
					sales: 18630,
					profit: 3256.52,
				},
				{
					date: '2025-05-12',
					sales: 15727.83,
					profit: 3430.12,
				},
				{
					date: '2025-05-13',
					sales: 25606,
					profit: 4507.75,
				},
				{
					date: '2025-05-14',
					sales: 13803.93,
					profit: 4417.65,
				},
				{
					date: '2025-05-15',
					sales: 0,
					profit: 0,
				},
			],
			structure: {
				retentions: 57.95,
				external_expenses: 0,
				tax: 23.47,
				profit: 25.71,
				costPrice: 7.93,
			},
			taxInfo: [
				{
					wbRealization: 1242398.24,
					taxBase: 500673.27,
					taxRate: 60,
					taxType: 'Считать от РС',
					taxAmount: 300403.96,
				},
			],
			revenueByWarehouse: [
				{
					name: 'Невинномысск',
					revenue: 11992.53,
				},
				{
					name: 'Новосибирск',
					revenue: 12052.05,
				},
				{
					name: 'Рязань (Тюшевское)',
					revenue: 8716.47,
				},
				{
					name: 'Белая дача',
					revenue: 1026.8,
				},
				{
					name: 'Калининград',
					revenue: 260.47,
				},
				{
					name: 'Коледино',
					revenue: 258296.98,
				},
				{
					name: 'Владимир',
					revenue: 2704.83,
				},
				{
					name: 'Краснодар',
					revenue: 61083.51,
				},
				{
					name: 'Электросталь',
					revenue: 322935.06,
				},
				{
					name: 'Казань',
					revenue: 69260.18,
				},
				{
					name: 'Санкт-Петербург Уткина Заводь',
					revenue: 10825.93,
				},
				{
					name: 'Атакент',
					revenue: 373.72,
				},
				{
					name: 'Чашниково',
					revenue: 9121.68,
				},
				{
					name: 'Котовск',
					revenue: 6916.54,
				},
				{
					name: 'Волгоград',
					revenue: 3155.9,
				},
				{
					name: 'Подольск',
					revenue: 44002.18,
				},
				{
					name: 'Тула',
					revenue: 136344.82,
				},
				{
					name: 'Екатеринбург - Испытателей 14г',
					revenue: 13949.37,
				},
				{
					name: 'Самара (Новосемейкино)',
					revenue: 1963,
				},
				{
					name: 'СЦ Адыгея',
					revenue: 0,
				},
			],
			is_self_cost: true,
		},
        'custom': {
            "orderCountList": [
                0,
                16,
                11,
                23,
                16,
                19,
                23,
                39,
                35,
                51,
                45,
                31,
                38,
                22,
                0
            ],
            "orderAmountList": [
                0,
                42061.63,
                29982.33,
                62175.89,
                36567.63,
                46260.81,
                52940.62,
                75131.43,
                66419.45,
                103118.91,
                79247.21,
                60270.31,
                78310.58,
                45129,
                0
            ],
            "saleCountList": [
                0,
                2,
                7,
                2,
                2,
                4,
                1,
                6,
                4,
                7,
                10,
                9,
                14,
                7,
                0
            ],
            "saleAmountList": [
                0,
                4952,
                16784,
                3588,
                4679,
                13161,
                2182,
                12863,
                9880.9,
                12917.93,
                18630,
                15727.83,
                25606,
                13803.93,
                0
            ],
            "orderCount": 369,
            "orderAmount": 777615.8,
            "saleCount": 71,
            "saleAmount": 164878.49,
            "orderCountCompare": "101%",
            "orderAmountCompare": "29%",
            "saleCountCompare": "86%",
            "saleAmountCompare": "-6%",
            "buyoutPercent": 94.7,
            "buyoutPercentCompare": "17%",
            "costPriceAmount": 15762,
            "costPriceAmountCompare": "0%",
            "costPriceCount": 71,
            "returnCount": 4,
            "returnCountCompare": "-100%",
            "returnAmount": 10102.9,
            "returnAmountCompare": "0%",
            "averageBill": 2107,
            "averageBillCompare": -36,
            "penalty": 0,
            "additional": 0,
            "commissionWB": 35444.82,
            "commissionWBCompare": "20%",
            "logistics": 0,
            "logisticsCompare": "-100%",
            "proceeds": 164878.49,
            "proceedsCompare": "-6%",
            "marginalProfit": 149116.49,
            "marginalProfitCompare": "-15%",
            "lostSalesCount": 0,
            "lostSalesAmount": 0,
            "grossProfit": 149116.49,
            "grossProfitCompare": "-15%",
            "operatingProfit": 106296.84,
            "operatingProfitCompare": "-18%",
            "netProfit": 33061.54,
            "netProfitCompare": "-36%",
            "averageProfit": 2204.1,
            "averageProfitCompare": "0%",
            "tax": 73235.3,
            "taxCompare": "-6%",
            "fbs": {
                "count": 0,
                "retail_amount": 0,
                "cost_amount": 0
            },
            "fbo": {
                "count": 285,
                "retail_amount": 2608480,
                "cost_amount": 62826
            },
            "toClient": {
                "count": 180,
                "retail_amount": 1827000,
                "cost_amount": 38628
            },
            "fromClient": {
                "count": 110,
                "retail_amount": 967750,
                "cost_amount": 19758
            },
            "advertAmount": 0,
            "advertAmountCompare": "0%",
            "advertPercent": 0,
            "advertPercentCompare": "0%",
            "commissionWBPercent": 21.5,
            "commissionWBPercentCompare": "28%",
            "logisticsPercent": 0,
            "logisticsPercentCompare": "-100%",
            "roi": 56.44,
            "grossProfitAbility": 90.44,
            "operatingProfitAbility": 64.47,
            "ABCAnalysis": {
                "amountA": 128863.63,
                "countA": 54,
                "amountPercentA": 78.16,
                "countPercentA": 76.06,
                "amountB": 26615.86,
                "countB": 11,
                "amountPercentB": 16.14,
                "countPercentB": 15.49,
                "amountC": 9399,
                "countC": 6,
                "amountPercentC": 5.7,
                "countPercentC": 8.45
            },
            "storageData": 7374.8342085,
            "storageDataCompare": 0,
            "self_buy": 0,
            "incorrect_attachments": 0,
            "goods_labeling": 0,
            "characteristics_change": 0,
            "acceptance": 0,
            "marginalityRoiChart": [
                {
                    "date": "2025-05-01",
                    "roi": 0,
                    "marginality": 0
                },
                {
                    "date": "2025-05-02",
                    "roi": 4.63,
                    "marginality": 91.03
                },
                {
                    "date": "2025-05-03",
                    "roi": 53.32,
                    "marginality": 90.74
                },
                {
                    "date": "2025-05-04",
                    "roi": 23.44,
                    "marginality": 87.63
                },
                {
                    "date": "2025-05-05",
                    "roi": 242.06,
                    "marginality": 97.21
                },
                {
                    "date": "2025-05-06",
                    "roi": 62.4,
                    "marginality": 93.25
                },
                {
                    "date": "2025-05-07",
                    "roi": 18.52,
                    "marginality": 89.83
                },
                {
                    "date": "2025-05-08",
                    "roi": 47.29,
                    "marginality": 89.64
                },
                {
                    "date": "2025-05-09",
                    "roi": 51.03,
                    "marginality": 91.01
                },
                {
                    "date": "2025-05-10",
                    "roi": 80.86,
                    "marginality": 91.23
                },
                {
                    "date": "2025-05-11",
                    "roi": 45.49,
                    "marginality": 88.08
                },
                {
                    "date": "2025-05-12",
                    "roi": 60.61,
                    "marginality": 89.49
                },
                {
                    "date": "2025-05-13",
                    "roi": 46.59,
                    "marginality": 87.86
                },
                {
                    "date": "2025-05-14",
                    "roi": 106.63,
                    "marginality": 92.25
                },
                {
                    "date": "2025-05-15",
                    "roi": 0,
                    "marginality": 0
                }
            ],
            "salesAndProfit": [
                {
                    "date": "2025-05-01",
                    "sales": 0,
                    "profit": 0
                },
                {
                    "date": "2025-05-02",
                    "sales": 4952,
                    "profit": 177.92
                },
                {
                    "date": "2025-05-03",
                    "sales": 16784,
                    "profit": 3303.13
                },
                {
                    "date": "2025-05-04",
                    "sales": 3588,
                    "profit": 431.82
                },
                {
                    "date": "2025-05-05",
                    "sales": 4679,
                    "profit": 2617.47
                },
                {
                    "date": "2025-05-06",
                    "sales": 13161,
                    "profit": 2883.33
                },
                {
                    "date": "2025-05-07",
                    "sales": 2182,
                    "profit": 234.09
                },
                {
                    "date": "2025-05-08",
                    "sales": 12863,
                    "profit": 2354.38
                },
                {
                    "date": "2025-05-09",
                    "sales": 9880.9,
                    "profit": 1917.02
                },
                {
                    "date": "2025-05-10",
                    "sales": 12917.93,
                    "profit": 3530.34
                },
                {
                    "date": "2025-05-11",
                    "sales": 18630,
                    "profit": 3256.52
                },
                {
                    "date": "2025-05-12",
                    "sales": 15727.83,
                    "profit": 3430.12
                },
                {
                    "date": "2025-05-13",
                    "sales": 25606,
                    "profit": 4507.75
                },
                {
                    "date": "2025-05-14",
                    "sales": 13803.93,
                    "profit": 4417.65
                },
                {
                    "date": "2025-05-15",
                    "sales": 0,
                    "profit": 0
                }
            ],
            "structure": {
                "retentions": 25.97,
                "external_expenses": 0,
                "tax": 44.42,
                "profit": 20.05,
                "costPrice": 9.56
            },
            "taxInfo": [
                {
                    "wbRealization": 164878.49,
                    "taxBase": 122058.84,
                    "taxRate": 60,
                    "taxType": "Считать от РС",
                    "taxAmount": 73235.3
                }
            ],
            "revenueByWarehouse": [
                {
                    "name": "Владимир",
                    "revenue": 1963
                },
                {
                    "name": "Екатеринбург - Испытателей 14г",
                    "revenue": 2008.3
                },
                {
                    "name": "Казань",
                    "revenue": 16027.89
                },
                {
                    "name": "Коледино",
                    "revenue": 21526.65
                },
                {
                    "name": "Краснодар",
                    "revenue": 11906.34
                },
                {
                    "name": "Невинномысск",
                    "revenue": 3278.21
                },
                {
                    "name": "Новосибирск",
                    "revenue": 8069.43
                },
                {
                    "name": "Подольск",
                    "revenue": 6040.03
                },
                {
                    "name": "Рязань (Тюшевское)",
                    "revenue": 4533.77
                },
                {
                    "name": "Самара (Новосемейкино)",
                    "revenue": 1963
                },
                {
                    "name": "Санкт-Петербург Уткина Заводь",
                    "revenue": 1963
                },
                {
                    "name": "Тула",
                    "revenue": 22321.57
                },
                {
                    "name": "Электросталь",
                    "revenue": 51869.41
                }
            ],
            "is_self_cost": true
        }
	},
	29999: {
		orderCountList: [
			111, 134, 80, 102, 88, 117, 123, 116, 95, 79, 115, 95, 87, 85, 107,
			150, 96, 121, 99, 101, 92, 92, 91, 88, 67, 83, 89, 100, 89, 5,
		],
		orderAmountList: [
			256390.6, 303573.37, 179298.53, 237873.02, 197572.05, 272368.31,
			270112, 284855.91, 204606.63, 177680.23, 276991.14, 210671.72,
			198158.56, 199747.26, 235862.06, 324783.19, 211945.59, 271258.59,
			216003.79, 222943.63, 211654.31, 206593.93, 202729.92, 184245.56,
			150915, 177423.89, 194291.64, 219035.21, 175981.97, 10587,
		],
		saleCountList: [
			18, 33, 27, 21, 24, 35, 18, 24, 26, 33, 26, 27, 25, 14, 22, 39, 25,
			35, 29, 29, 29, 27, 27, 23, 22, 23, 21, 11, 18, 0,
		],
		saleAmountList: [
			51379.29, 82711.26, 68673, 54248, 52468, 91149.57, 48807, 64977,
			69666.68, 91929.69, 71358.26, 74500.94, 67817, 37256, 60551.67,
			102530.3, 61493.1, 87460, 79190.01, 78696.41, 76578, 69985.87,
			72795.5, 55517.22, 58006.65, 58388.77, 43473, 21719, 35282.38, 0,
		],
		orderCount: 2897,
		orderAmount: 6486154.61,
		saleCount: 721,
		saleAmount: 1890341.57,
		orderCountCompare: '-21%',
		orderAmountCompare: '-21%',
		saleCountCompare: '-23%',
		saleAmountCompare: '-24%',
		buyoutPercent: 34.3,
		buyoutPercentCompare: '3%',
		costPriceAmount: 535826,
		costPriceAmountCompare: '0%',
		costPriceCount: 721,
		returnCount: 10,
		returnCountCompare: '-72%',
		returnAmount: 24860,
		returnAmountCompare: '-64%',
		averageBill: 2238,
		averageBillCompare: 0,
		penalty: 0,
		additional: 0,
		commissionWB: 462284.2000000001,
		commissionWBCompare: '-24%',
		logistics: 294535.67,
		logisticsCompare: '-31%',
		proceeds: 1890341.57,
		proceedsCompare: '-24%',
		marginalProfit: 1354515.57,
		marginalProfitCompare: '-46%',
		lostSalesCount: 0,
		lostSalesAmount: 0,
		grossProfit: 1354515.57,
		grossProfitCompare: '-46%',
		operatingProfit: 426280.04,
		operatingProfitCompare: '-67%',
		netProfit: 312859.55,
		netProfitCompare: '-74%',
		averageProfit: 10428.65,
		averageProfitCompare: '0%',
		tax: 113420.49,
		taxCompare: '44%',
		fbs: {
			count: 0,
			retail_amount: 0,
			cost_amount: 0,
		},
		fbo: {
			count: 5675,
			retail_amount: 42144250,
			cost_amount: 3898472,
		},
		toClient: {
			count: 468,
			retail_amount: 3446150,
			cost_amount: 355965,
		},
		fromClient: {
			count: 299,
			retail_amount: 1859900,
			cost_amount: 187445,
		},
		advertAmount: 143675,
		advertAmountCompare: '12%',
		advertPercent: 7.6,
		advertPercentCompare: '49%',
		commissionWBPercent: 24.5,
		commissionWBPercentCompare: '0%',
		logisticsPercent: 15.6,
		logisticsPercentCompare: '-9%',
		roi: 21.37,
		grossProfitAbility: 71.65,
		operatingProfitAbility: 22.55,
		ABCAnalysis: {
			amountA: 1505793.67,
			countA: 543,
			amountPercentA: 79.66,
			countPercentA: 75.31,
			amountB: 287984.56,
			countB: 130,
			amountPercentB: 15.23,
			countPercentB: 18.03,
			amountC: 96563.34,
			countC: 48,
			amountPercentC: 5.11,
			countPercentC: 6.66,
		},
		storageData: 27740.664071949934,
		storageDataCompare: 7,
		self_buy: 0,
		incorrect_attachments: 0,
		goods_labeling: 0,
		characteristics_change: 0,
		acceptance: 0,
		marginalityRoiChart: [
			{
				date: '2025-03-26',
				roi: -13.95,
				marginality: 72.61,
			},
			{
				date: '2025-03-27',
				roi: 6.25,
				marginality: 71,
			},
			{
				date: '2025-03-28',
				roi: 7.04,
				marginality: 70.8,
			},
			{
				date: '2025-03-29',
				roi: -6.85,
				marginality: 71.47,
			},
			{
				date: '2025-03-30',
				roi: -12.26,
				marginality: 69.83,
			},
			{
				date: '2025-03-31',
				roi: 8.05,
				marginality: 72.18,
			},
			{
				date: '2025-04-01',
				roi: -17.88,
				marginality: 71.79,
			},
			{
				date: '2025-04-02',
				roi: -4.35,
				marginality: 72.11,
			},
			{
				date: '2025-04-03',
				roi: 2.81,
				marginality: 71.89,
			},
			{
				date: '2025-04-04',
				roi: 14.84,
				marginality: 72.88,
			},
			{
				date: '2025-04-05',
				roi: -0.36,
				marginality: 72.7,
			},
			{
				date: '2025-04-06',
				roi: 4.63,
				marginality: 72.43,
			},
			{
				date: '2025-04-07',
				roi: 1.88,
				marginality: 72.27,
			},
			{
				date: '2025-04-08',
				roi: -20.91,
				marginality: 72.28,
			},
			{
				date: '2025-04-09',
				roi: 1.92,
				marginality: 71.61,
			},
			{
				date: '2025-04-10',
				roi: 12.79,
				marginality: 71.6,
			},
			{
				date: '2025-04-11',
				roi: 3.42,
				marginality: 73.45,
			},
			{
				date: '2025-04-12',
				roi: 7.36,
				marginality: 71.83,
			},
			{
				date: '2025-04-13',
				roi: 15.55,
				marginality: 72.18,
			},
			{
				date: '2025-04-14',
				roi: 18.31,
				marginality: 72.81,
			},
			{
				date: '2025-04-15',
				roi: 16.8,
				marginality: 70.83,
			},
			{
				date: '2025-04-16',
				roi: 15.42,
				marginality: 73.97,
			},
			{
				date: '2025-04-17',
				roi: 16.27,
				marginality: 73.1,
			},
			{
				date: '2025-04-18',
				roi: 9.83,
				marginality: 70.61,
			},
			{
				date: '2025-04-19',
				roi: 16.97,
				marginality: 72.21,
			},
			{
				date: '2025-04-20',
				roi: 19.63,
				marginality: 71.86,
			},
			{
				date: '2025-04-21',
				roi: 24.08,
				marginality: 67.42,
			},
			{
				date: '2025-04-22',
				roi: -9.54,
				marginality: 61.66,
			},
			{
				date: '2025-04-23',
				roi: 12.51,
				marginality: 63.91,
			},
			{
				date: '2025-04-24',
				roi: -100,
				marginality: 0,
			},
		],
		salesAndProfit: [
			{
				date: '2025-03-26',
				sales: 51379.29,
				profit: -7831.29,
			},
			{
				date: '2025-03-27',
				sales: 82711.26,
				profit: 4572.54,
			},
			{
				date: '2025-03-28',
				sales: 68673,
				profit: 4244.55,
			},
			{
				date: '2025-03-29',
				sales: 54248,
				profit: -3747.25,
			},
			{
				date: '2025-03-30',
				sales: 52468,
				profit: -6891.15,
			},
			{
				date: '2025-03-31',
				sales: 91149.57,
				profit: 6381.29,
			},
			{
				date: '2025-04-01',
				sales: 48807,
				profit: -9986.65,
			},
			{
				date: '2025-04-02',
				sales: 64977,
				profit: -2777.58,
			},
			{
				date: '2025-04-03',
				sales: 69666.68,
				profit: 1792.44,
			},
			{
				date: '2025-04-04',
				sales: 91929.69,
				profit: 11163.83,
			},
			{
				date: '2025-04-05',
				sales: 71358.26,
				profit: -241.32,
			},
			{
				date: '2025-04-06',
				sales: 74500.94,
				profit: 3101.71,
			},
			{
				date: '2025-04-07',
				sales: 67817,
				profit: 1174.88,
			},
			{
				date: '2025-04-08',
				sales: 37256,
				profit: -9259.63,
			},
			{
				date: '2025-04-09',
				sales: 60551.67,
				profit: 1072.45,
			},
			{
				date: '2025-04-10',
				sales: 102530.3,
				profit: 10925.79,
			},
			{
				date: '2025-04-11',
				sales: 61493.1,
				profit: 1910.83,
			},
			{
				date: '2025-04-12',
				sales: 87460,
				profit: 5635.11,
			},
			{
				date: '2025-04-13',
				sales: 79190.01,
				profit: 10019.95,
			},
			{
				date: '2025-04-14',
				sales: 78696.41,
				profit: 11448.02,
			},
			{
				date: '2025-04-15',
				sales: 76578,
				profit: 10352.79,
			},
			{
				date: '2025-04-16',
				sales: 69985.87,
				profit: 8787.1,
			},
			{
				date: '2025-04-17',
				sales: 72795.5,
				profit: 9576.23,
			},
			{
				date: '2025-04-18',
				sales: 55517.22,
				profit: 4669.69,
			},
			{
				date: '2025-04-19',
				sales: 58006.65,
				profit: 7911.53,
			},
			{
				date: '2025-04-20',
				sales: 58388.77,
				profit: 9006.82,
			},
			{
				date: '2025-04-21',
				sales: 43473,
				profit: 8246.77,
			},
			{
				date: '2025-04-22',
				sales: 21719,
				profit: -2153.05,
			},
			{
				date: '2025-04-23',
				sales: 35282.38,
				profit: 3686.47,
			},
			{
				date: '2025-04-24',
				sales: 0,
				profit: 0,
			},
		],
		structure: {
			retentions: 60.76,
			external_expenses: 0,
			tax: 6,
			profit: 16.55,
			costPrice: 28.35,
		},
		taxInfo: [
			{
				wbRealization: 1890341.57,
				taxBase: 1890341.57,
				taxRate: 6,
				taxType: 'УСН-доходы',
				taxAmount: 113420.49,
			},
		],
		revenueByWarehouse: [
			{
				name: 'Астана Карагандинское шоссе',
				revenue: 6592.66,
			},
			{
				name: 'Атакент',
				revenue: 2555.98,
			},
			{
				name: 'Белая дача',
				revenue: 4502.82,
			},
			{
				name: 'Волгоград',
				revenue: 4983,
			},
			{
				name: 'Екатеринбург - Испытателей 14г',
				revenue: 12468.07,
			},
			{
				name: 'Казань',
				revenue: 113335.84,
			},
			{
				name: 'Калининград',
				revenue: 1331.82,
			},
			{
				name: 'Коледино',
				revenue: 201627.43,
			},
			{
				name: 'Котовск',
				revenue: 35459.51,
			},
			{
				name: 'Краснодар',
				revenue: 191808.25,
			},
			{
				name: 'Невинномысск',
				revenue: 14990.5,
			},
			{
				name: 'Новосибирск',
				revenue: 8353.31,
			},
			{
				name: 'Подольск',
				revenue: 2609.28,
			},
			{
				name: 'Рязань (Тюшевское)',
				revenue: 37832.86,
			},
			{
				name: 'Санкт-Петербург Уткина Заводь',
				revenue: 7980.35,
			},
			{
				name: 'Тула',
				revenue: 262513.07,
			},
			{
				name: 'Чашниково',
				revenue: 10569.23,
			},
			{
				name: 'Электросталь',
				revenue: 314427.33,
			},
		],
		is_self_cost: true,
	},
};
const mockDetailChartData = {
	7: [
		{
			'0:03': 1,
		},
		{
			'0:05': 1,
		},
		{
			'0:09': 1,
		},
		{
			'0:10': 2,
		},
		{
			'0:14': 1,
		},
		{
			'0:16': 2,
		},
		{
			'0:17': 2,
		},
		{
			'0:19': 1,
		},
		{
			'0:24': 2,
		},
		{
			'0:26': 1,
		},
		{
			'0:27': 1,
		},
		{
			'0:30': 2,
		},
		{
			'0:32': 2,
		},
		{
			'0:33': 1,
		},
		{
			'0:34': 1,
		},
		{
			'0:37': 1,
		},
		{
			'0:41': 1,
		},
		{
			'0:43': 1,
		},
		{
			'0:46': 1,
		},
		{
			'0:48': 1,
		},
		{
			'0:53': 1,
		},
		{
			'0:54': 3,
		},
		{
			'0:58': 1,
		},
		{
			'1:01': 1,
		},
		{
			'1:02': 1,
		},
		{
			'1:03': 1,
		},
		{
			'1:08': 2,
		},
		{
			'1:11': 1,
		},
		{
			'1:13': 1,
		},
		{
			'1:14': 1,
		},
		{
			'1:15': 1,
		},
		{
			'1:18': 1,
		},
		{
			'1:20': 1,
		},
		{
			'1:22': 1,
		},
		{
			'1:27': 2,
		},
		{
			'1:37': 1,
		},
		{
			'1:39': 1,
		},
		{
			'1:52': 1,
		},
		{
			'2:03': 1,
		},
		{
			'2:05': 1,
		},
		{
			'2:08': 1,
		},
		{
			'2:13': 1,
		},
		{
			'2:26': 1,
		},
		{
			'2:29': 1,
		},
		{
			'2:30': 1,
		},
		{
			'2:33': 3,
		},
		{
			'2:35': 1,
		},
		{
			'2:36': 1,
		},
		{
			'2:37': 1,
		},
		{
			'2:45': 2,
		},
		{
			'2:49': 2,
		},
		{
			'2:50': 1,
		},
		{
			'2:55': 1,
		},
		{
			'2:56': 2,
		},
		{
			'3:01': 1,
		},
		{
			'3:13': 1,
		},
		{
			'3:23': 1,
		},
		{
			'3:24': 2,
		},
		{
			'3:28': 1,
		},
		{
			'3:32': 1,
		},
		{
			'3:33': 1,
		},
		{
			'3:36': 1,
		},
		{
			'3:37': 1,
		},
		{
			'3:39': 1,
		},
		{
			'3:40': 1,
		},
		{
			'3:48': 1,
		},
		{
			'3:51': 2,
		},
		{
			'3:52': 1,
		},
		{
			'3:57': 1,
		},
		{
			'3:59': 1,
		},
		{
			'4:01': 1,
		},
		{
			'4:02': 2,
		},
		{
			'4:06': 2,
		},
		{
			'4:10': 1,
		},
		{
			'4:11': 1,
		},
		{
			'4:14': 1,
		},
		{
			'4:23': 1,
		},
		{
			'4:31': 2,
		},
		{
			'4:32': 1,
		},
		{
			'4:34': 1,
		},
		{
			'4:38': 1,
		},
		{
			'4:49': 1,
		},
		{
			'4:52': 2,
		},
		{
			'4:53': 1,
		},
		{
			'4:55': 1,
		},
		{
			'4:56': 3,
		},
		{
			'4:59': 1,
		},
		{
			'5:02': 1,
		},
		{
			'5:05': 1,
		},
		{
			'5:06': 1,
		},
		{
			'5:09': 3,
		},
		{
			'5:10': 1,
		},
		{
			'5:11': 1,
		},
		{
			'5:13': 1,
		},
		{
			'5:19': 1,
		},
		{
			'5:20': 2,
		},
		{
			'5:22': 1,
		},
		{
			'5:23': 1,
		},
		{
			'5:24': 3,
		},
		{
			'5:25': 2,
		},
		{
			'5:27': 1,
		},
		{
			'5:29': 1,
		},
		{
			'5:36': 1,
		},
		{
			'5:37': 1,
		},
		{
			'5:38': 1,
		},
		{
			'5:45': 1,
		},
		{
			'5:48': 1,
		},
		{
			'5:51': 1,
		},
		{
			'5:52': 2,
		},
		{
			'5:56': 1,
		},
		{
			'5:57': 1,
		},
		{
			'5:58': 1,
		},
		{
			'6:00': 1,
		},
		{
			'6:03': 1,
		},
		{
			'6:06': 1,
		},
		{
			'6:07': 1,
		},
		{
			'6:08': 1,
		},
		{
			'6:10': 1,
		},
		{
			'6:12': 1,
		},
		{
			'6:16': 2,
		},
		{
			'6:17': 1,
		},
		{
			'6:18': 2,
		},
		{
			'6:19': 2,
		},
		{
			'6:24': 2,
		},
		{
			'6:26': 1,
		},
		{
			'6:30': 1,
		},
		{
			'6:31': 2,
		},
		{
			'6:33': 1,
		},
		{
			'6:34': 1,
		},
		{
			'6:35': 1,
		},
		{
			'6:39': 3,
		},
		{
			'6:40': 2,
		},
		{
			'6:41': 2,
		},
		{
			'6:43': 2,
		},
		{
			'6:44': 1,
		},
		{
			'6:47': 4,
		},
		{
			'6:49': 1,
		},
		{
			'6:51': 1,
		},
		{
			'6:54': 1,
		},
		{
			'6:56': 2,
		},
		{
			'6:59': 5,
		},
		{
			'7:01': 1,
		},
		{
			'7:02': 3,
		},
		{
			'7:07': 1,
		},
		{
			'7:08': 2,
		},
		{
			'7:10': 2,
		},
		{
			'7:11': 1,
		},
		{
			'7:12': 1,
		},
		{
			'7:13': 2,
		},
		{
			'7:14': 2,
		},
		{
			'7:16': 1,
		},
		{
			'7:18': 1,
		},
		{
			'7:19': 1,
		},
		{
			'7:21': 1,
		},
		{
			'7:23': 2,
		},
		{
			'7:24': 1,
		},
		{
			'7:25': 1,
		},
		{
			'7:26': 1,
		},
		{
			'7:28': 1,
		},
		{
			'7:31': 2,
		},
		{
			'7:32': 1,
		},
		{
			'7:33': 2,
		},
		{
			'7:36': 2,
		},
		{
			'7:37': 3,
		},
		{
			'7:38': 2,
		},
		{
			'7:39': 1,
		},
		{
			'7:40': 1,
		},
		{
			'7:41': 4,
		},
		{
			'7:49': 2,
		},
		{
			'7:52': 2,
		},
		{
			'7:53': 4,
		},
		{
			'7:54': 3,
		},
		{
			'7:55': 1,
		},
		{
			'7:56': 3,
		},
		{
			'7:58': 1,
		},
		{
			'7:59': 1,
		},
		{
			'8:00': 3,
		},
		{
			'8:01': 1,
		},
		{
			'8:02': 4,
		},
		{
			'8:03': 1,
		},
		{
			'8:05': 2,
		},
		{
			'8:06': 1,
		},
		{
			'8:07': 2,
		},
		{
			'8:08': 2,
		},
		{
			'8:09': 1,
		},
		{
			'8:10': 1,
		},
		{
			'8:12': 3,
		},
		{
			'8:13': 1,
		},
		{
			'8:15': 1,
		},
		{
			'8:17': 1,
		},
		{
			'8:18': 2,
		},
		{
			'8:20': 2,
		},
		{
			'8:21': 2,
		},
		{
			'8:24': 1,
		},
		{
			'8:25': 2,
		},
		{
			'8:26': 1,
		},
		{
			'8:28': 1,
		},
		{
			'8:30': 1,
		},
		{
			'8:31': 1,
		},
		{
			'8:32': 2,
		},
		{
			'8:33': 1,
		},
		{
			'8:34': 1,
		},
		{
			'8:36': 2,
		},
		{
			'8:37': 2,
		},
		{
			'8:38': 2,
		},
		{
			'8:39': 1,
		},
		{
			'8:44': 2,
		},
		{
			'8:45': 2,
		},
		{
			'8:46': 2,
		},
		{
			'8:47': 1,
		},
		{
			'8:49': 1,
		},
		{
			'8:50': 3,
		},
		{
			'8:52': 1,
		},
		{
			'8:53': 2,
		},
		{
			'8:55': 1,
		},
		{
			'8:57': 2,
		},
		{
			'8:58': 1,
		},
		{
			'8:59': 1,
		},
		{
			'9:01': 3,
		},
		{
			'9:02': 1,
		},
		{
			'9:03': 1,
		},
		{
			'9:04': 2,
		},
		{
			'9:08': 2,
		},
		{
			'9:09': 2,
		},
		{
			'9:10': 3,
		},
		{
			'9:12': 2,
		},
		{
			'9:14': 2,
		},
		{
			'9:15': 3,
		},
		{
			'9:16': 1,
		},
		{
			'9:17': 3,
		},
		{
			'9:18': 3,
		},
		{
			'9:21': 1,
		},
		{
			'9:23': 2,
		},
		{
			'9:24': 1,
		},
		{
			'9:25': 2,
		},
		{
			'9:26': 3,
		},
		{
			'9:27': 2,
		},
		{
			'9:28': 1,
		},
		{
			'9:29': 1,
		},
		{
			'9:30': 2,
		},
		{
			'9:31': 1,
		},
		{
			'9:32': 2,
		},
		{
			'9:34': 1,
		},
		{
			'9:36': 1,
		},
		{
			'9:37': 1,
		},
		{
			'9:39': 4,
		},
		{
			'9:40': 4,
		},
		{
			'9:42': 5,
		},
		{
			'9:43': 3,
		},
		{
			'9:44': 1,
		},
		{
			'9:47': 3,
		},
		{
			'9:49': 2,
		},
		{
			'9:50': 3,
		},
		{
			'9:51': 2,
		},
		{
			'9:54': 1,
		},
		{
			'9:55': 1,
		},
		{
			'9:57': 1,
		},
		{
			'9:58': 3,
		},
		{
			'9:59': 3,
		},
		{
			'10:00': 2,
		},
		{
			'10:01': 2,
		},
		{
			'10:02': 1,
		},
		{
			'10:03': 2,
		},
		{
			'10:04': 1,
		},
		{
			'10:06': 1,
		},
		{
			'10:07': 1,
		},
		{
			'10:11': 1,
		},
		{
			'10:12': 1,
		},
		{
			'10:13': 4,
		},
		{
			'10:15': 3,
		},
		{
			'10:16': 2,
		},
		{
			'10:17': 3,
		},
		{
			'10:18': 1,
		},
		{
			'10:20': 1,
		},
		{
			'10:21': 1,
		},
		{
			'10:22': 3,
		},
		{
			'10:23': 3,
		},
		{
			'10:24': 3,
		},
		{
			'10:26': 1,
		},
		{
			'10:27': 1,
		},
		{
			'10:28': 4,
		},
		{
			'10:29': 2,
		},
		{
			'10:31': 2,
		},
		{
			'10:33': 4,
		},
		{
			'10:34': 3,
		},
		{
			'10:35': 1,
		},
		{
			'10:36': 1,
		},
		{
			'10:37': 1,
		},
		{
			'10:38': 2,
		},
		{
			'10:40': 2,
		},
		{
			'10:41': 2,
		},
		{
			'10:42': 3,
		},
		{
			'10:43': 1,
		},
		{
			'10:44': 1,
		},
		{
			'10:45': 1,
		},
		{
			'10:46': 1,
		},
		{
			'10:47': 3,
		},
		{
			'10:48': 1,
		},
		{
			'10:50': 1,
		},
		{
			'10:53': 1,
		},
		{
			'10:54': 2,
		},
		{
			'10:55': 2,
		},
		{
			'10:56': 3,
		},
		{
			'10:57': 2,
		},
		{
			'10:58': 2,
		},
		{
			'10:59': 2,
		},
		{
			'11:00': 1,
		},
		{
			'11:01': 2,
		},
		{
			'11:02': 2,
		},
		{
			'11:03': 3,
		},
		{
			'11:04': 2,
		},
		{
			'11:06': 1,
		},
		{
			'11:08': 2,
		},
		{
			'11:10': 3,
		},
		{
			'11:12': 2,
		},
		{
			'11:13': 2,
		},
		{
			'11:14': 3,
		},
		{
			'11:15': 1,
		},
		{
			'11:16': 3,
		},
		{
			'11:17': 1,
		},
		{
			'11:19': 1,
		},
		{
			'11:21': 1,
		},
		{
			'11:22': 1,
		},
		{
			'11:23': 1,
		},
		{
			'11:25': 1,
		},
		{
			'11:26': 1,
		},
		{
			'11:27': 1,
		},
		{
			'11:29': 5,
		},
		{
			'11:30': 6,
		},
		{
			'11:31': 1,
		},
		{
			'11:32': 2,
		},
		{
			'11:33': 1,
		},
		{
			'11:34': 3,
		},
		{
			'11:35': 5,
		},
		{
			'11:36': 1,
		},
		{
			'11:37': 1,
		},
		{
			'11:38': 2,
		},
		{
			'11:39': 5,
		},
		{
			'11:40': 2,
		},
		{
			'11:41': 2,
		},
		{
			'11:42': 1,
		},
		{
			'11:43': 2,
		},
		{
			'11:44': 5,
		},
		{
			'11:45': 1,
		},
		{
			'11:46': 1,
		},
		{
			'11:47': 1,
		},
		{
			'11:48': 3,
		},
		{
			'11:49': 1,
		},
		{
			'11:51': 2,
		},
		{
			'11:52': 1,
		},
		{
			'11:53': 2,
		},
		{
			'11:54': 3,
		},
		{
			'11:55': 1,
		},
		{
			'11:56': 1,
		},
		{
			'11:57': 2,
		},
		{
			'11:58': 1,
		},
		{
			'11:59': 1,
		},
		{
			'12:00': 2,
		},
		{
			'12:01': 2,
		},
		{
			'12:02': 1,
		},
		{
			'12:03': 4,
		},
		{
			'12:05': 4,
		},
		{
			'12:06': 3,
		},
		{
			'12:07': 2,
		},
		{
			'12:08': 2,
		},
		{
			'12:09': 2,
		},
		{
			'12:13': 3,
		},
		{
			'12:16': 3,
		},
		{
			'12:17': 1,
		},
		{
			'12:19': 3,
		},
		{
			'12:20': 2,
		},
		{
			'12:21': 5,
		},
		{
			'12:22': 3,
		},
		{
			'12:23': 5,
		},
		{
			'12:25': 2,
		},
		{
			'12:26': 1,
		},
		{
			'12:28': 1,
		},
		{
			'12:29': 1,
		},
		{
			'12:30': 1,
		},
		{
			'12:31': 5,
		},
		{
			'12:32': 4,
		},
		{
			'12:33': 2,
		},
		{
			'12:34': 1,
		},
		{
			'12:35': 2,
		},
		{
			'12:36': 4,
		},
		{
			'12:37': 1,
		},
		{
			'12:38': 1,
		},
		{
			'12:39': 2,
		},
		{
			'12:40': 3,
		},
		{
			'12:41': 2,
		},
		{
			'12:42': 3,
		},
		{
			'12:43': 2,
		},
		{
			'12:44': 1,
		},
		{
			'12:45': 2,
		},
		{
			'12:46': 2,
		},
		{
			'12:47': 3,
		},
		{
			'12:48': 3,
		},
		{
			'12:50': 2,
		},
		{
			'12:51': 2,
		},
		{
			'12:52': 1,
		},
		{
			'12:54': 1,
		},
		{
			'12:55': 3,
		},
		{
			'12:56': 1,
		},
		{
			'12:57': 1,
		},
		{
			'12:59': 1,
		},
		{
			'13:00': 2,
		},
		{
			'13:01': 2,
		},
		{
			'13:02': 1,
		},
		{
			'13:03': 3,
		},
		{
			'13:04': 3,
		},
		{
			'13:07': 2,
		},
		{
			'13:11': 3,
		},
		{
			'13:12': 1,
		},
		{
			'13:13': 3,
		},
		{
			'13:15': 4,
		},
		{
			'13:16': 3,
		},
		{
			'13:17': 1,
		},
		{
			'13:18': 3,
		},
		{
			'13:19': 3,
		},
		{
			'13:20': 6,
		},
		{
			'13:22': 3,
		},
		{
			'13:23': 1,
		},
		{
			'13:24': 5,
		},
		{
			'13:26': 1,
		},
		{
			'13:27': 1,
		},
		{
			'13:28': 1,
		},
		{
			'13:29': 2,
		},
		{
			'13:30': 3,
		},
		{
			'13:32': 6,
		},
		{
			'13:33': 4,
		},
		{
			'13:34': 1,
		},
		{
			'13:35': 4,
		},
		{
			'13:36': 1,
		},
		{
			'13:37': 1,
		},
		{
			'13:38': 4,
		},
		{
			'13:39': 4,
		},
		{
			'13:41': 1,
		},
		{
			'13:42': 3,
		},
		{
			'13:43': 2,
		},
		{
			'13:44': 3,
		},
		{
			'13:45': 1,
		},
		{
			'13:47': 1,
		},
		{
			'13:48': 1,
		},
		{
			'13:49': 1,
		},
		{
			'13:50': 1,
		},
		{
			'13:51': 5,
		},
		{
			'13:52': 3,
		},
		{
			'13:53': 5,
		},
		{
			'13:54': 5,
		},
		{
			'13:55': 1,
		},
		{
			'13:56': 1,
		},
		{
			'13:57': 2,
		},
		{
			'13:58': 1,
		},
		{
			'13:59': 1,
		},
		{
			'14:00': 2,
		},
		{
			'14:01': 2,
		},
		{
			'14:02': 5,
		},
		{
			'14:04': 1,
		},
		{
			'14:05': 5,
		},
		{
			'14:06': 3,
		},
		{
			'14:07': 3,
		},
		{
			'14:08': 2,
		},
		{
			'14:09': 2,
		},
		{
			'14:10': 2,
		},
		{
			'14:11': 1,
		},
		{
			'14:12': 2,
		},
		{
			'14:13': 2,
		},
		{
			'14:14': 2,
		},
		{
			'14:15': 2,
		},
		{
			'14:16': 3,
		},
		{
			'14:17': 1,
		},
		{
			'14:18': 4,
		},
		{
			'14:19': 2,
		},
		{
			'14:20': 1,
		},
		{
			'14:22': 3,
		},
		{
			'14:24': 1,
		},
		{
			'14:25': 3,
		},
		{
			'14:28': 1,
		},
		{
			'14:29': 1,
		},
		{
			'14:32': 2,
		},
		{
			'14:33': 1,
		},
		{
			'14:36': 2,
		},
		{
			'14:37': 3,
		},
		{
			'14:38': 3,
		},
		{
			'14:39': 6,
		},
		{
			'14:40': 3,
		},
		{
			'14:41': 1,
		},
		{
			'14:42': 1,
		},
		{
			'14:44': 3,
		},
		{
			'14:45': 1,
		},
		{
			'14:47': 1,
		},
		{
			'14:48': 3,
		},
		{
			'14:50': 1,
		},
		{
			'14:51': 1,
		},
		{
			'14:53': 2,
		},
		{
			'14:54': 1,
		},
		{
			'14:55': 3,
		},
		{
			'14:57': 1,
		},
		{
			'14:58': 3,
		},
		{
			'15:00': 1,
		},
		{
			'15:01': 2,
		},
		{
			'15:02': 1,
		},
		{
			'15:03': 2,
		},
		{
			'15:04': 2,
		},
		{
			'15:05': 2,
		},
		{
			'15:06': 3,
		},
		{
			'15:08': 1,
		},
		{
			'15:09': 1,
		},
		{
			'15:10': 1,
		},
		{
			'15:11': 2,
		},
		{
			'15:12': 2,
		},
		{
			'15:13': 1,
		},
		{
			'15:14': 1,
		},
		{
			'15:15': 2,
		},
		{
			'15:16': 2,
		},
		{
			'15:17': 3,
		},
		{
			'15:19': 1,
		},
		{
			'15:20': 2,
		},
		{
			'15:21': 1,
		},
		{
			'15:22': 4,
		},
		{
			'15:23': 2,
		},
		{
			'15:24': 2,
		},
		{
			'15:25': 3,
		},
		{
			'15:26': 2,
		},
		{
			'15:27': 2,
		},
		{
			'15:29': 1,
		},
		{
			'15:30': 1,
		},
		{
			'15:31': 1,
		},
		{
			'15:32': 2,
		},
		{
			'15:33': 2,
		},
		{
			'15:34': 1,
		},
		{
			'15:35': 1,
		},
		{
			'15:36': 1,
		},
		{
			'15:37': 3,
		},
		{
			'15:38': 4,
		},
		{
			'15:39': 3,
		},
		{
			'15:43': 2,
		},
		{
			'15:45': 3,
		},
		{
			'15:46': 3,
		},
		{
			'15:47': 6,
		},
		{
			'15:50': 2,
		},
		{
			'15:52': 3,
		},
		{
			'15:54': 1,
		},
		{
			'15:57': 3,
		},
		{
			'15:58': 7,
		},
		{
			'15:59': 1,
		},
		{
			'16:01': 2,
		},
		{
			'16:04': 3,
		},
		{
			'16:05': 2,
		},
		{
			'16:06': 2,
		},
		{
			'16:07': 2,
		},
		{
			'16:08': 4,
		},
		{
			'16:10': 1,
		},
		{
			'16:13': 2,
		},
		{
			'16:14': 3,
		},
		{
			'16:15': 3,
		},
		{
			'16:16': 1,
		},
		{
			'16:17': 1,
		},
		{
			'16:18': 1,
		},
		{
			'16:19': 3,
		},
		{
			'16:20': 1,
		},
		{
			'16:22': 3,
		},
		{
			'16:23': 1,
		},
		{
			'16:24': 1,
		},
		{
			'16:25': 1,
		},
		{
			'16:26': 1,
		},
		{
			'16:27': 2,
		},
		{
			'16:29': 3,
		},
		{
			'16:30': 1,
		},
		{
			'16:33': 1,
		},
		{
			'16:34': 1,
		},
		{
			'16:35': 2,
		},
		{
			'16:37': 2,
		},
		{
			'16:38': 1,
		},
		{
			'16:39': 2,
		},
		{
			'16:40': 1,
		},
		{
			'16:41': 1,
		},
		{
			'16:42': 1,
		},
		{
			'16:43': 2,
		},
		{
			'16:44': 1,
		},
		{
			'16:46': 1,
		},
		{
			'16:47': 1,
		},
		{
			'16:48': 3,
		},
		{
			'16:49': 2,
		},
		{
			'16:51': 2,
		},
		{
			'16:52': 3,
		},
		{
			'16:53': 2,
		},
		{
			'16:54': 2,
		},
		{
			'16:56': 1,
		},
		{
			'16:57': 1,
		},
		{
			'16:58': 1,
		},
		{
			'16:59': 1,
		},
		{
			'17:00': 3,
		},
		{
			'17:01': 2,
		},
		{
			'17:02': 1,
		},
		{
			'17:03': 1,
		},
		{
			'17:04': 1,
		},
		{
			'17:05': 3,
		},
		{
			'17:07': 1,
		},
		{
			'17:08': 1,
		},
		{
			'17:09': 3,
		},
		{
			'17:11': 1,
		},
		{
			'17:12': 1,
		},
		{
			'17:13': 2,
		},
		{
			'17:15': 5,
		},
		{
			'17:16': 1,
		},
		{
			'17:17': 2,
		},
		{
			'17:19': 1,
		},
		{
			'17:20': 2,
		},
		{
			'17:23': 3,
		},
		{
			'17:24': 2,
		},
		{
			'17:25': 2,
		},
		{
			'17:26': 2,
		},
		{
			'17:27': 2,
		},
		{
			'17:28': 2,
		},
		{
			'17:29': 1,
		},
		{
			'17:31': 3,
		},
		{
			'17:32': 2,
		},
		{
			'17:33': 2,
		},
		{
			'17:36': 2,
		},
		{
			'17:38': 3,
		},
		{
			'17:39': 3,
		},
		{
			'17:41': 2,
		},
		{
			'17:42': 2,
		},
		{
			'17:43': 4,
		},
		{
			'17:44': 2,
		},
		{
			'17:45': 2,
		},
		{
			'17:46': 1,
		},
		{
			'17:47': 1,
		},
		{
			'17:48': 3,
		},
		{
			'17:49': 1,
		},
		{
			'17:50': 3,
		},
		{
			'17:51': 1,
		},
		{
			'17:52': 2,
		},
		{
			'17:54': 1,
		},
		{
			'17:56': 4,
		},
		{
			'17:57': 2,
		},
		{
			'17:58': 1,
		},
		{
			'17:59': 1,
		},
		{
			'18:00': 2,
		},
		{
			'18:03': 2,
		},
		{
			'18:04': 1,
		},
		{
			'18:05': 1,
		},
		{
			'18:06': 3,
		},
		{
			'18:07': 3,
		},
		{
			'18:08': 1,
		},
		{
			'18:09': 3,
		},
		{
			'18:10': 3,
		},
		{
			'18:11': 1,
		},
		{
			'18:13': 2,
		},
		{
			'18:15': 1,
		},
		{
			'18:16': 1,
		},
		{
			'18:17': 1,
		},
		{
			'18:18': 1,
		},
		{
			'18:19': 5,
		},
		{
			'18:21': 2,
		},
		{
			'18:22': 2,
		},
		{
			'18:24': 1,
		},
		{
			'18:25': 1,
		},
		{
			'18:26': 2,
		},
		{
			'18:27': 1,
		},
		{
			'18:28': 4,
		},
		{
			'18:29': 1,
		},
		{
			'18:30': 3,
		},
		{
			'18:31': 3,
		},
		{
			'18:32': 2,
		},
		{
			'18:33': 1,
		},
		{
			'18:34': 1,
		},
		{
			'18:35': 1,
		},
		{
			'18:36': 2,
		},
		{
			'18:37': 3,
		},
		{
			'18:38': 2,
		},
		{
			'18:40': 3,
		},
		{
			'18:41': 2,
		},
		{
			'18:42': 1,
		},
		{
			'18:44': 5,
		},
		{
			'18:45': 1,
		},
		{
			'18:46': 1,
		},
		{
			'18:47': 8,
		},
		{
			'18:48': 1,
		},
		{
			'18:50': 1,
		},
		{
			'18:51': 2,
		},
		{
			'18:52': 1,
		},
		{
			'18:53': 2,
		},
		{
			'18:54': 3,
		},
		{
			'18:55': 1,
		},
		{
			'18:57': 2,
		},
		{
			'18:58': 6,
		},
		{
			'19:00': 2,
		},
		{
			'19:01': 1,
		},
		{
			'19:02': 3,
		},
		{
			'19:03': 1,
		},
		{
			'19:04': 1,
		},
		{
			'19:06': 2,
		},
		{
			'19:07': 4,
		},
		{
			'19:08': 2,
		},
		{
			'19:09': 2,
		},
		{
			'19:11': 1,
		},
		{
			'19:12': 4,
		},
		{
			'19:13': 2,
		},
		{
			'19:14': 1,
		},
		{
			'19:15': 1,
		},
		{
			'19:16': 1,
		},
		{
			'19:17': 2,
		},
		{
			'19:18': 1,
		},
		{
			'19:19': 2,
		},
		{
			'19:20': 4,
		},
		{
			'19:22': 3,
		},
		{
			'19:24': 1,
		},
		{
			'19:25': 1,
		},
		{
			'19:26': 1,
		},
		{
			'19:28': 1,
		},
		{
			'19:30': 1,
		},
		{
			'19:32': 2,
		},
		{
			'19:33': 1,
		},
		{
			'19:34': 2,
		},
		{
			'19:35': 1,
		},
		{
			'19:36': 3,
		},
		{
			'19:37': 1,
		},
		{
			'19:38': 4,
		},
		{
			'19:39': 1,
		},
		{
			'19:42': 2,
		},
		{
			'19:45': 1,
		},
		{
			'19:46': 1,
		},
		{
			'19:47': 4,
		},
		{
			'19:49': 2,
		},
		{
			'19:51': 2,
		},
		{
			'19:52': 2,
		},
		{
			'19:53': 3,
		},
		{
			'19:54': 1,
		},
		{
			'19:55': 2,
		},
		{
			'19:57': 2,
		},
		{
			'19:58': 1,
		},
		{
			'20:01': 1,
		},
		{
			'20:02': 1,
		},
		{
			'20:03': 1,
		},
		{
			'20:04': 4,
		},
		{
			'20:05': 2,
		},
		{
			'20:06': 1,
		},
		{
			'20:09': 3,
		},
		{
			'20:10': 1,
		},
		{
			'20:11': 2,
		},
		{
			'20:12': 2,
		},
		{
			'20:13': 3,
		},
		{
			'20:15': 3,
		},
		{
			'20:17': 2,
		},
		{
			'20:18': 1,
		},
		{
			'20:20': 2,
		},
		{
			'20:21': 1,
		},
		{
			'20:22': 4,
		},
		{
			'20:23': 1,
		},
		{
			'20:24': 3,
		},
		{
			'20:25': 1,
		},
		{
			'20:26': 2,
		},
		{
			'20:27': 1,
		},
		{
			'20:28': 1,
		},
		{
			'20:30': 2,
		},
		{
			'20:31': 2,
		},
		{
			'20:32': 2,
		},
		{
			'20:35': 2,
		},
		{
			'20:36': 1,
		},
		{
			'20:37': 2,
		},
		{
			'20:38': 1,
		},
		{
			'20:41': 3,
		},
		{
			'20:42': 1,
		},
		{
			'20:43': 3,
		},
		{
			'20:45': 1,
		},
		{
			'20:46': 2,
		},
		{
			'20:47': 1,
		},
		{
			'20:49': 2,
		},
		{
			'20:51': 2,
		},
		{
			'20:53': 1,
		},
		{
			'20:54': 1,
		},
		{
			'20:55': 3,
		},
		{
			'20:56': 2,
		},
		{
			'20:57': 3,
		},
		{
			'20:58': 2,
		},
		{
			'21:00': 1,
		},
		{
			'21:01': 2,
		},
		{
			'21:02': 9,
		},
		{
			'21:03': 3,
		},
		{
			'21:07': 3,
		},
		{
			'21:08': 1,
		},
		{
			'21:09': 2,
		},
		{
			'21:10': 2,
		},
		{
			'21:11': 3,
		},
		{
			'21:12': 2,
		},
		{
			'21:13': 2,
		},
		{
			'21:15': 2,
		},
		{
			'21:16': 3,
		},
		{
			'21:18': 1,
		},
		{
			'21:19': 4,
		},
		{
			'21:21': 5,
		},
		{
			'21:22': 2,
		},
		{
			'21:23': 1,
		},
		{
			'21:24': 3,
		},
		{
			'21:25': 2,
		},
		{
			'21:28': 4,
		},
		{
			'21:29': 2,
		},
		{
			'21:31': 3,
		},
		{
			'21:32': 1,
		},
		{
			'21:33': 1,
		},
		{
			'21:34': 3,
		},
		{
			'21:36': 1,
		},
		{
			'21:37': 1,
		},
		{
			'21:38': 4,
		},
		{
			'21:39': 2,
		},
		{
			'21:41': 1,
		},
		{
			'21:42': 1,
		},
		{
			'21:43': 1,
		},
		{
			'21:44': 1,
		},
		{
			'21:45': 1,
		},
		{
			'21:46': 1,
		},
		{
			'21:47': 2,
		},
		{
			'21:50': 1,
		},
		{
			'21:51': 1,
		},
		{
			'21:52': 5,
		},
		{
			'21:53': 1,
		},
		{
			'21:54': 2,
		},
		{
			'21:55': 3,
		},
		{
			'21:56': 2,
		},
		{
			'21:57': 3,
		},
		{
			'21:58': 1,
		},
		{
			'22:00': 2,
		},
		{
			'22:02': 2,
		},
		{
			'22:03': 2,
		},
		{
			'22:04': 1,
		},
		{
			'22:05': 3,
		},
		{
			'22:06': 3,
		},
		{
			'22:08': 3,
		},
		{
			'22:12': 1,
		},
		{
			'22:14': 1,
		},
		{
			'22:15': 2,
		},
		{
			'22:16': 3,
		},
		{
			'22:18': 2,
		},
		{
			'22:19': 1,
		},
		{
			'22:20': 1,
		},
		{
			'22:22': 2,
		},
		{
			'22:24': 1,
		},
		{
			'22:26': 2,
		},
		{
			'22:29': 1,
		},
		{
			'22:30': 1,
		},
		{
			'22:31': 1,
		},
		{
			'22:33': 2,
		},
		{
			'22:34': 2,
		},
		{
			'22:35': 2,
		},
		{
			'22:36': 1,
		},
		{
			'22:37': 1,
		},
		{
			'22:38': 2,
		},
		{
			'22:40': 1,
		},
		{
			'22:41': 1,
		},
		{
			'22:42': 1,
		},
		{
			'22:43': 2,
		},
		{
			'22:47': 2,
		},
		{
			'22:48': 3,
		},
		{
			'22:49': 1,
		},
		{
			'22:50': 1,
		},
		{
			'22:52': 1,
		},
		{
			'22:54': 4,
		},
		{
			'22:56': 1,
		},
		{
			'22:57': 3,
		},
		{
			'23:00': 1,
		},
		{
			'23:02': 2,
		},
		{
			'23:03': 2,
		},
		{
			'23:04': 1,
		},
		{
			'23:05': 1,
		},
		{
			'23:06': 2,
		},
		{
			'23:07': 1,
		},
		{
			'23:09': 1,
		},
		{
			'23:10': 1,
		},
		{
			'23:12': 1,
		},
		{
			'23:14': 1,
		},
		{
			'23:15': 1,
		},
		{
			'23:22': 1,
		},
		{
			'23:24': 2,
		},
		{
			'23:26': 1,
		},
		{
			'23:27': 3,
		},
		{
			'23:28': 3,
		},
		{
			'23:31': 3,
		},
		{
			'23:32': 1,
		},
		{
			'23:37': 1,
		},
		{
			'23:41': 1,
		},
		{
			'23:44': 1,
		},
		{
			'23:45': 3,
		},
		{
			'23:46': 3,
		},
		{
			'23:47': 1,
		},
		{
			'23:48': 3,
		},
		{
			'23:49': 1,
		},
		{
			'23:50': 1,
		},
		{
			'23:51': 1,
		},
		{
			'23:52': 4,
		},
		{
			'23:55': 1,
		},
		{
			'23:57': 1,
		},
	],
	14: [
		{
			'0:10': 1,
		},
		{
			'0:26': 1,
		},
		{
			'0:32': 2,
		},
		{
			'0:41': 1,
		},
		{
			'1:20': 1,
		},
		{
			'2:30': 1,
		},
		{
			'2:33': 1,
		},
		{
			'2:35': 1,
		},
		{
			'2:36': 1,
		},
		{
			'2:37': 1,
		},
		{
			'3:01': 1,
		},
		{
			'3:37': 1,
		},
		{
			'3:59': 1,
		},
		{
			'4:02': 1,
		},
		{
			'4:31': 1,
		},
		{
			'4:49': 1,
		},
		{
			'4:52': 1,
		},
		{
			'4:56': 1,
		},
		{
			'5:05': 1,
		},
		{
			'5:20': 2,
		},
		{
			'6:07': 1,
		},
		{
			'6:16': 1,
		},
		{
			'6:19': 1,
		},
		{
			'6:26': 1,
		},
		{
			'6:31': 2,
		},
		{
			'6:56': 1,
		},
		{
			'6:59': 3,
		},
		{
			'7:08': 1,
		},
		{
			'7:12': 1,
		},
		{
			'7:18': 1,
		},
		{
			'7:33': 1,
		},
		{
			'7:55': 1,
		},
		{
			'7:59': 1,
		},
		{
			'8:02': 1,
		},
		{
			'8:12': 1,
		},
		{
			'8:32': 1,
		},
		{
			'8:38': 1,
		},
		{
			'8:49': 1,
		},
		{
			'9:01': 3,
		},
		{
			'9:12': 1,
		},
		{
			'9:17': 1,
		},
		{
			'9:18': 2,
		},
		{
			'9:23': 1,
		},
		{
			'9:24': 1,
		},
		{
			'9:26': 2,
		},
		{
			'9:34': 1,
		},
		{
			'9:40': 2,
		},
		{
			'9:42': 1,
		},
		{
			'9:43': 2,
		},
		{
			'9:49': 2,
		},
		{
			'9:50': 2,
		},
		{
			'9:58': 1,
		},
		{
			'10:03': 1,
		},
		{
			'10:13': 3,
		},
		{
			'10:16': 1,
		},
		{
			'10:17': 1,
		},
		{
			'10:21': 1,
		},
		{
			'10:22': 1,
		},
		{
			'10:23': 1,
		},
		{
			'10:24': 1,
		},
		{
			'10:29': 1,
		},
		{
			'10:33': 2,
		},
		{
			'10:36': 1,
		},
		{
			'10:38': 1,
		},
		{
			'10:40': 1,
		},
		{
			'10:46': 1,
		},
		{
			'11:00': 1,
		},
		{
			'11:03': 2,
		},
		{
			'11:04': 1,
		},
		{
			'11:29': 4,
		},
		{
			'11:30': 1,
		},
		{
			'11:36': 1,
		},
		{
			'11:39': 1,
		},
		{
			'11:41': 2,
		},
		{
			'11:43': 1,
		},
		{
			'11:48': 1,
		},
		{
			'11:51': 1,
		},
		{
			'11:57': 1,
		},
		{
			'12:05': 2,
		},
		{
			'12:07': 1,
		},
		{
			'12:08': 2,
		},
		{
			'12:13': 3,
		},
		{
			'12:16': 1,
		},
		{
			'12:20': 1,
		},
		{
			'12:21': 1,
		},
		{
			'12:22': 1,
		},
		{
			'12:23': 1,
		},
		{
			'12:26': 1,
		},
		{
			'12:30': 1,
		},
		{
			'12:32': 2,
		},
		{
			'12:40': 2,
		},
		{
			'12:41': 1,
		},
		{
			'12:42': 1,
		},
		{
			'12:47': 1,
		},
		{
			'12:52': 1,
		},
		{
			'12:57': 1,
		},
		{
			'13:00': 1,
		},
		{
			'13:03': 1,
		},
		{
			'13:04': 1,
		},
		{
			'13:07': 1,
		},
		{
			'13:11': 1,
		},
		{
			'13:15': 1,
		},
		{
			'13:16': 1,
		},
		{
			'13:20': 3,
		},
		{
			'13:26': 1,
		},
		{
			'13:28': 1,
		},
		{
			'13:29': 2,
		},
		{
			'13:30': 1,
		},
		{
			'13:33': 1,
		},
		{
			'13:35': 1,
		},
		{
			'13:36': 1,
		},
		{
			'13:38': 1,
		},
		{
			'13:42': 1,
		},
		{
			'13:43': 1,
		},
		{
			'13:44': 1,
		},
		{
			'13:50': 1,
		},
		{
			'13:51': 2,
		},
		{
			'13:52': 1,
		},
		{
			'13:57': 1,
		},
		{
			'14:02': 3,
		},
		{
			'14:07': 1,
		},
		{
			'14:08': 1,
		},
		{
			'14:16': 1,
		},
		{
			'14:17': 1,
		},
		{
			'14:20': 1,
		},
		{
			'14:25': 1,
		},
		{
			'14:39': 1,
		},
		{
			'14:40': 1,
		},
		{
			'14:48': 1,
		},
		{
			'14:50': 1,
		},
		{
			'14:55': 1,
		},
		{
			'14:58': 2,
		},
		{
			'15:04': 1,
		},
		{
			'15:10': 1,
		},
		{
			'15:14': 1,
		},
		{
			'15:25': 2,
		},
		{
			'15:26': 2,
		},
		{
			'15:27': 1,
		},
		{
			'15:29': 1,
		},
		{
			'15:30': 1,
		},
		{
			'15:38': 1,
		},
		{
			'15:45': 1,
		},
		{
			'15:46': 1,
		},
		{
			'15:50': 1,
		},
		{
			'15:52': 1,
		},
		{
			'15:58': 1,
		},
		{
			'16:13': 1,
		},
		{
			'16:25': 1,
		},
		{
			'16:27': 1,
		},
		{
			'16:29': 2,
		},
		{
			'16:35': 1,
		},
		{
			'16:37': 1,
		},
		{
			'16:38': 1,
		},
		{
			'16:40': 1,
		},
		{
			'16:48': 2,
		},
		{
			'16:52': 2,
		},
		{
			'17:00': 2,
		},
		{
			'17:01': 1,
		},
		{
			'17:04': 1,
		},
		{
			'17:07': 1,
		},
		{
			'17:15': 2,
		},
		{
			'17:20': 2,
		},
		{
			'17:23': 1,
		},
		{
			'17:25': 1,
		},
		{
			'17:27': 1,
		},
		{
			'17:28': 2,
		},
		{
			'17:41': 2,
		},
		{
			'17:51': 1,
		},
		{
			'17:58': 1,
		},
		{
			'18:05': 1,
		},
		{
			'18:13': 2,
		},
		{
			'18:18': 1,
		},
		{
			'18:19': 1,
		},
		{
			'18:40': 1,
		},
		{
			'18:46': 1,
		},
		{
			'18:57': 1,
		},
		{
			'18:58': 2,
		},
		{
			'19:00': 1,
		},
		{
			'19:02': 1,
		},
		{
			'19:07': 1,
		},
		{
			'19:12': 1,
		},
		{
			'19:13': 1,
		},
		{
			'19:20': 1,
		},
		{
			'19:28': 1,
		},
		{
			'19:42': 1,
		},
		{
			'19:47': 1,
		},
		{
			'19:49': 1,
		},
		{
			'19:55': 1,
		},
		{
			'20:01': 1,
		},
		{
			'20:04': 2,
		},
		{
			'20:15': 1,
		},
		{
			'20:17': 2,
		},
		{
			'20:22': 2,
		},
		{
			'20:24': 1,
		},
		{
			'20:26': 1,
		},
		{
			'20:32': 1,
		},
		{
			'20:46': 1,
		},
		{
			'20:53': 1,
		},
		{
			'21:07': 1,
		},
		{
			'21:10': 1,
		},
		{
			'21:21': 2,
		},
		{
			'21:24': 1,
		},
		{
			'21:31': 1,
		},
		{
			'21:33': 1,
		},
		{
			'21:36': 1,
		},
		{
			'21:37': 1,
		},
		{
			'21:42': 1,
		},
		{
			'21:47': 1,
		},
		{
			'21:51': 1,
		},
		{
			'21:52': 5,
		},
		{
			'21:56': 2,
		},
		{
			'22:00': 1,
		},
		{
			'22:05': 1,
		},
		{
			'22:06': 3,
		},
		{
			'22:14': 1,
		},
		{
			'22:24': 1,
		},
		{
			'22:29': 1,
		},
		{
			'22:35': 1,
		},
		{
			'22:48': 2,
		},
		{
			'23:03': 1,
		},
		{
			'23:05': 1,
		},
		{
			'23:06': 1,
		},
		{
			'23:09': 1,
		},
		{
			'23:27': 1,
		},
		{
			'23:28': 1,
		},
		{
			'23:48': 1,
		},
		{
			'23:49': 1,
		},
		{
			'23:52': 4,
		},
	],
	30: [
		{
			'0:42': 1,
		},
		{
			'0:44': 1,
		},
		{
			'0:45': 1,
		},
		{
			'0:48': 1,
		},
		{
			'0:53': 1,
		},
		{
			'1:00': 0,
		},
		{
			'2:34': 1,
		},
		{
			'3:01': 1,
		},
		{
			'4:09': 2,
		},
		{
			'4:26': 1,
		},
		{
			'4:54': 1,
		},
		{
			'5:00': 0,
		},
		{
			'6:09': 1,
		},
		{
			'6:14': 1,
		},
		{
			'6:31': 2,
		},
		{
			'6:41': 1,
		},
		{
			'6:50': 1,
		},
		{
			'7:19': 1,
		},
		{
			'7:35': 1,
		},
		{
			'7:41': 1,
		},
		{
			'7:44': 1,
		},
		{
			'7:47': 1,
		},
		{
			'7:55': 1,
		},
		{
			'8:05': 1,
		},
		{
			'8:19': 1,
		},
		{
			'8:24': 2,
		},
		{
			'8:49': 1,
		},
		{
			'8:53': 1,
		},
		{
			'9:14': 1,
		},
		{
			'9:16': 1,
		},
		{
			'9:17': 1,
		},
		{
			'9:24': 1,
		},
		{
			'9:25': 1,
		},
		{
			'9:31': 1,
		},
		{
			'9:37': 1,
		},
		{
			'9:46': 1,
		},
		{
			'9:57': 1,
		},
		{
			'10:01': 1,
		},
		{
			'10:08': 1,
		},
		{
			'10:38': 1,
		},
		{
			'10:39': 1,
		},
		{
			'10:50': 1,
		},
		{
			'11:02': 1,
		},
		{
			'11:04': 2,
		},
		{
			'11:07': 1,
		},
		{
			'11:09': 1,
		},
		{
			'11:12': 1,
		},
		{
			'11:28': 1,
		},
		{
			'11:38': 1,
		},
		{
			'11:39': 1,
		},
		{
			'11:42': 1,
		},
		{
			'11:54': 1,
		},
		{
			'11:58': 1,
		},
		{
			'12:00': 1,
		},
		{
			'12:02': 1,
		},
		{
			'12:05': 1,
		},
		{
			'12:07': 1,
		},
		{
			'12:09': 1,
		},
		{
			'12:13': 1,
		},
		{
			'12:16': 1,
		},
		{
			'12:26': 1,
		},
		{
			'12:27': 2,
		},
		{
			'12:30': 1,
		},
		{
			'12:33': 1,
		},
		{
			'12:39': 1,
		},
		{
			'12:44': 1,
		},
		{
			'12:50': 1,
		},
		{
			'12:55': 1,
		},
		{
			'12:56': 1,
		},
		{
			'12:58': 1,
		},
		{
			'13:00': 1,
		},
		{
			'13:05': 1,
		},
		{
			'13:07': 2,
		},
		{
			'13:21': 1,
		},
		{
			'13:26': 1,
		},
		{
			'13:28': 1,
		},
		{
			'13:29': 1,
		},
		{
			'13:31': 1,
		},
		{
			'13:35': 1,
		},
		{
			'13:39': 1,
		},
		{
			'13:41': 1,
		},
		{
			'13:44': 1,
		},
		{
			'13:53': 2,
		},
		{
			'13:55': 1,
		},
		{
			'13:56': 2,
		},
		{
			'13:59': 1,
		},
		{
			'14:03': 1,
		},
		{
			'14:07': 1,
		},
		{
			'14:10': 1,
		},
		{
			'14:15': 1,
		},
		{
			'14:16': 1,
		},
		{
			'14:19': 1,
		},
		{
			'14:23': 1,
		},
		{
			'14:30': 1,
		},
		{
			'14:33': 1,
		},
		{
			'14:39': 1,
		},
		{
			'14:41': 1,
		},
		{
			'14:55': 1,
		},
		{
			'15:02': 1,
		},
		{
			'15:03': 1,
		},
		{
			'15:09': 1,
		},
		{
			'15:19': 1,
		},
		{
			'15:21': 1,
		},
		{
			'15:34': 1,
		},
		{
			'15:39': 1,
		},
		{
			'15:48': 1,
		},
		{
			'15:49': 1,
		},
		{
			'15:51': 2,
		},
		{
			'15:53': 1,
		},
		{
			'16:06': 1,
		},
		{
			'16:11': 1,
		},
		{
			'16:12': 1,
		},
		{
			'16:13': 1,
		},
		{
			'16:14': 1,
		},
		{
			'16:21': 2,
		},
		{
			'16:27': 1,
		},
		{
			'16:47': 1,
		},
		{
			'16:55': 1,
		},
		{
			'17:04': 2,
		},
		{
			'17:06': 1,
		},
		{
			'17:09': 1,
		},
		{
			'17:26': 1,
		},
		{
			'17:31': 1,
		},
		{
			'17:32': 2,
		},
		{
			'17:38': 1,
		},
		{
			'17:42': 1,
		},
		{
			'17:46': 1,
		},
		{
			'17:48': 1,
		},
		{
			'17:49': 1,
		},
		{
			'17:56': 1,
		},
		{
			'17:57': 1,
		},
		{
			'17:58': 1,
		},
		{
			'18:03': 1,
		},
		{
			'18:15': 1,
		},
		{
			'18:16': 1,
		},
		{
			'18:19': 2,
		},
		{
			'18:22': 1,
		},
		{
			'18:37': 2,
		},
		{
			'18:47': 1,
		},
		{
			'18:48': 1,
		},
		{
			'18:50': 2,
		},
		{
			'18:52': 1,
		},
		{
			'18:53': 1,
		},
		{
			'18:54': 1,
		},
		{
			'19:01': 1,
		},
		{
			'19:04': 1,
		},
		{
			'19:10': 1,
		},
		{
			'19:16': 2,
		},
		{
			'19:27': 1,
		},
		{
			'19:29': 1,
		},
		{
			'19:37': 1,
		},
		{
			'19:45': 2,
		},
		{
			'19:55': 1,
		},
		{
			'20:07': 2,
		},
		{
			'20:08': 2,
		},
		{
			'20:13': 1,
		},
		{
			'20:14': 1,
		},
		{
			'20:19': 1,
		},
		{
			'20:21': 2,
		},
		{
			'20:32': 1,
		},
		{
			'20:37': 1,
		},
		{
			'20:41': 1,
		},
		{
			'20:46': 1,
		},
		{
			'20:48': 1,
		},
		{
			'20:54': 1,
		},
		{
			'21:01': 1,
		},
		{
			'21:03': 1,
		},
		{
			'21:04': 1,
		},
		{
			'21:07': 1,
		},
		{
			'21:25': 2,
		},
		{
			'21:27': 1,
		},
		{
			'21:29': 2,
		},
		{
			'21:37': 1,
		},
		{
			'21:49': 1,
		},
		{
			'21:53': 1,
		},
		{
			'21:58': 1,
		},
		{
			'22:06': 2,
		},
		{
			'22:14': 1,
		},
		{
			'22:15': 1,
		},
		{
			'22:23': 1,
		},
		{
			'22:25': 1,
		},
		{
			'22:26': 1,
		},
		{
			'22:29': 1,
		},
		{
			'22:30': 1,
		},
		{
			'22:31': 2,
		},
		{
			'22:34': 1,
		},
		{
			'22:35': 1,
		},
		{
			'23:34': 1,
		},
		{
			'23:41': 1,
		},
		{
			'23:57': 1,
		},
	],
	90: [
		{
			'0:01': 1,
		},
		{
			'0:02': 2,
		},
		{
			'0:11': 1,
		},
		{
			'0:12': 4,
		},
		{
			'0:13': 1,
		},
		{
			'0:19': 1,
		},
		{
			'0:23': 1,
		},
		{
			'0:28': 2,
		},
		{
			'0:43': 1,
		},
		{
			'0:47': 1,
		},
		{
			'0:49': 1,
		},
		{
			'0:55': 1,
		},
		{
			'0:56': 1,
		},
		{
			'1:01': 1,
		},
		{
			'1:07': 1,
		},
		{
			'1:14': 1,
		},
		{
			'1:15': 1,
		},
		{
			'1:17': 1,
		},
		{
			'1:28': 1,
		},
		{
			'1:46': 1,
		},
		{
			'1:57': 1,
		},
		{
			'2:08': 1,
		},
		{
			'2:10': 1,
		},
		{
			'2:13': 1,
		},
		{
			'2:21': 1,
		},
		{
			'2:34': 1,
		},
		{
			'2:39': 1,
		},
		{
			'2:41': 1,
		},
		{
			'3:01': 2,
		},
		{
			'3:34': 1,
		},
		{
			'4:14': 1,
		},
		{
			'4:21': 1,
		},
		{
			'4:27': 1,
		},
		{
			'4:32': 2,
		},
		{
			'4:34': 1,
		},
		{
			'5:10': 1,
		},
		{
			'5:13': 1,
		},
		{
			'5:21': 1,
		},
		{
			'5:47': 1,
		},
		{
			'5:48': 3,
		},
		{
			'5:53': 3,
		},
		{
			'5:54': 1,
		},
		{
			'6:09': 1,
		},
		{
			'6:18': 2,
		},
		{
			'6:19': 1,
		},
		{
			'6:37': 1,
		},
		{
			'6:38': 1,
		},
		{
			'6:46': 1,
		},
		{
			'6:47': 3,
		},
		{
			'6:54': 1,
		},
		{
			'7:19': 1,
		},
		{
			'7:28': 3,
		},
		{
			'7:34': 1,
		},
		{
			'7:52': 1,
		},
		{
			'7:56': 1,
		},
		{
			'8:00': 2,
		},
		{
			'8:01': 1,
		},
		{
			'8:02': 1,
		},
		{
			'8:14': 1,
		},
		{
			'8:18': 1,
		},
		{
			'8:24': 2,
		},
		{
			'8:30': 2,
		},
		{
			'8:32': 2,
		},
		{
			'8:36': 2,
		},
		{
			'8:40': 1,
		},
		{
			'8:43': 2,
		},
		{
			'8:45': 1,
		},
		{
			'8:49': 1,
		},
		{
			'8:56': 1,
		},
		{
			'8:58': 2,
		},
		{
			'9:00': 3,
		},
		{
			'9:01': 1,
		},
		{
			'9:04': 1,
		},
		{
			'9:06': 2,
		},
		{
			'9:09': 1,
		},
		{
			'9:16': 1,
		},
		{
			'9:17': 1,
		},
		{
			'9:18': 3,
		},
		{
			'9:19': 2,
		},
		{
			'9:22': 1,
		},
		{
			'9:24': 1,
		},
		{
			'9:26': 1,
		},
		{
			'9:29': 2,
		},
		{
			'9:38': 2,
		},
		{
			'9:42': 1,
		},
		{
			'9:43': 3,
		},
		{
			'9:45': 1,
		},
		{
			'9:51': 2,
		},
		{
			'9:52': 1,
		},
		{
			'9:53': 2,
		},
		{
			'9:56': 3,
		},
		{
			'9:58': 1,
		},
		{
			'10:00': 1,
		},
		{
			'10:01': 1,
		},
		{
			'10:04': 1,
		},
		{
			'10:06': 1,
		},
		{
			'10:12': 2,
		},
		{
			'10:14': 1,
		},
		{
			'10:15': 1,
		},
		{
			'10:19': 1,
		},
		{
			'10:20': 1,
		},
		{
			'10:21': 1,
		},
		{
			'10:22': 1,
		},
		{
			'10:23': 1,
		},
		{
			'10:32': 2,
		},
		{
			'10:33': 1,
		},
		{
			'10:38': 2,
		},
		{
			'10:39': 2,
		},
		{
			'10:40': 1,
		},
		{
			'10:42': 1,
		},
		{
			'10:48': 1,
		},
		{
			'10:50': 1,
		},
		{
			'10:53': 1,
		},
		{
			'10:55': 1,
		},
		{
			'10:56': 1,
		},
		{
			'10:57': 1,
		},
		{
			'10:59': 2,
		},
		{
			'11:00': 1,
		},
		{
			'11:03': 1,
		},
		{
			'11:06': 1,
		},
		{
			'11:08': 1,
		},
		{
			'11:09': 1,
		},
		{
			'11:12': 1,
		},
		{
			'11:15': 1,
		},
		{
			'11:16': 2,
		},
		{
			'11:18': 1,
		},
		{
			'11:19': 3,
		},
		{
			'11:21': 1,
		},
		{
			'11:22': 1,
		},
		{
			'11:25': 1,
		},
		{
			'11:26': 1,
		},
		{
			'11:30': 2,
		},
		{
			'11:34': 1,
		},
		{
			'11:36': 1,
		},
		{
			'11:41': 1,
		},
		{
			'11:42': 2,
		},
		{
			'11:43': 1,
		},
		{
			'11:45': 2,
		},
		{
			'11:46': 1,
		},
		{
			'11:47': 1,
		},
		{
			'11:50': 1,
		},
		{
			'11:51': 3,
		},
		{
			'11:54': 1,
		},
		{
			'11:56': 1,
		},
		{
			'11:57': 2,
		},
		{
			'11:59': 1,
		},
		{
			'12:02': 1,
		},
		{
			'12:08': 4,
		},
		{
			'12:09': 1,
		},
		{
			'12:10': 3,
		},
		{
			'12:15': 2,
		},
		{
			'12:16': 2,
		},
		{
			'12:18': 1,
		},
		{
			'12:20': 1,
		},
		{
			'12:23': 2,
		},
		{
			'12:27': 1,
		},
		{
			'12:28': 1,
		},
		{
			'12:29': 1,
		},
		{
			'12:30': 2,
		},
		{
			'12:34': 1,
		},
		{
			'12:35': 1,
		},
		{
			'12:38': 1,
		},
		{
			'12:40': 1,
		},
		{
			'12:41': 1,
		},
		{
			'12:42': 3,
		},
		{
			'12:46': 2,
		},
		{
			'12:47': 1,
		},
		{
			'12:51': 1,
		},
		{
			'12:52': 1,
		},
		{
			'12:57': 1,
		},
		{
			'13:02': 1,
		},
		{
			'13:04': 1,
		},
		{
			'13:07': 1,
		},
		{
			'13:09': 1,
		},
		{
			'13:10': 1,
		},
		{
			'13:11': 1,
		},
		{
			'13:14': 1,
		},
		{
			'13:38': 1,
		},
		{
			'13:39': 2,
		},
		{
			'13:43': 1,
		},
		{
			'13:46': 1,
		},
		{
			'13:47': 1,
		},
		{
			'13:48': 1,
		},
		{
			'13:49': 1,
		},
		{
			'13:51': 1,
		},
		{
			'13:52': 1,
		},
		{
			'13:57': 2,
		},
		{
			'13:59': 1,
		},
		{
			'14:00': 2,
		},
		{
			'14:01': 1,
		},
		{
			'14:05': 2,
		},
		{
			'14:07': 1,
		},
		{
			'14:08': 3,
		},
		{
			'14:16': 1,
		},
		{
			'14:20': 3,
		},
		{
			'14:22': 1,
		},
		{
			'14:23': 3,
		},
		{
			'14:27': 1,
		},
		{
			'14:35': 3,
		},
		{
			'14:37': 1,
		},
		{
			'14:39': 1,
		},
		{
			'14:44': 2,
		},
		{
			'14:45': 1,
		},
		{
			'14:46': 3,
		},
		{
			'14:49': 1,
		},
		{
			'14:50': 2,
		},
		{
			'14:52': 1,
		},
		{
			'14:53': 1,
		},
		{
			'14:59': 2,
		},
		{
			'15:01': 2,
		},
		{
			'15:03': 1,
		},
		{
			'15:05': 2,
		},
		{
			'15:07': 1,
		},
		{
			'15:08': 1,
		},
		{
			'15:09': 2,
		},
		{
			'15:12': 2,
		},
		{
			'15:13': 1,
		},
		{
			'15:14': 1,
		},
		{
			'15:15': 1,
		},
		{
			'15:20': 1,
		},
		{
			'15:23': 2,
		},
		{
			'15:24': 1,
		},
		{
			'15:28': 1,
		},
		{
			'15:31': 2,
		},
		{
			'15:34': 1,
		},
		{
			'15:39': 4,
		},
		{
			'15:40': 1,
		},
		{
			'15:41': 1,
		},
		{
			'15:43': 1,
		},
		{
			'15:44': 1,
		},
		{
			'15:49': 1,
		},
		{
			'15:57': 2,
		},
		{
			'16:00': 3,
		},
		{
			'16:01': 2,
		},
		{
			'16:02': 3,
		},
		{
			'16:03': 3,
		},
		{
			'16:04': 2,
		},
		{
			'16:07': 1,
		},
		{
			'16:14': 1,
		},
		{
			'16:19': 1,
		},
		{
			'16:21': 1,
		},
		{
			'16:22': 1,
		},
		{
			'16:23': 1,
		},
		{
			'16:24': 2,
		},
		{
			'16:25': 1,
		},
		{
			'16:29': 3,
		},
		{
			'16:37': 3,
		},
		{
			'16:38': 1,
		},
		{
			'16:39': 1,
		},
		{
			'16:40': 1,
		},
		{
			'16:42': 1,
		},
		{
			'16:44': 1,
		},
		{
			'16:48': 1,
		},
		{
			'16:50': 1,
		},
		{
			'16:51': 2,
		},
		{
			'16:55': 1,
		},
		{
			'16:58': 1,
		},
		{
			'17:06': 1,
		},
		{
			'17:09': 1,
		},
		{
			'17:11': 2,
		},
		{
			'17:14': 2,
		},
		{
			'17:15': 2,
		},
		{
			'17:18': 1,
		},
		{
			'17:19': 1,
		},
		{
			'17:21': 1,
		},
		{
			'17:26': 1,
		},
		{
			'17:27': 1,
		},
		{
			'17:29': 1,
		},
		{
			'17:30': 1,
		},
		{
			'17:31': 2,
		},
		{
			'17:32': 1,
		},
		{
			'17:33': 4,
		},
		{
			'17:37': 1,
		},
		{
			'17:38': 2,
		},
		{
			'17:41': 1,
		},
		{
			'17:47': 1,
		},
		{
			'17:48': 1,
		},
		{
			'17:58': 1,
		},
		{
			'18:02': 1,
		},
		{
			'18:05': 3,
		},
		{
			'18:07': 3,
		},
		{
			'18:13': 1,
		},
		{
			'18:17': 1,
		},
		{
			'18:20': 1,
		},
		{
			'18:24': 2,
		},
		{
			'18:25': 1,
		},
		{
			'18:26': 1,
		},
		{
			'18:27': 2,
		},
		{
			'18:29': 1,
		},
		{
			'18:33': 2,
		},
		{
			'18:34': 2,
		},
		{
			'18:35': 1,
		},
		{
			'18:38': 1,
		},
		{
			'18:41': 1,
		},
		{
			'18:49': 1,
		},
		{
			'18:52': 2,
		},
		{
			'18:54': 1,
		},
		{
			'18:58': 4,
		},
		{
			'19:01': 1,
		},
		{
			'19:03': 1,
		},
		{
			'19:10': 1,
		},
		{
			'19:14': 2,
		},
		{
			'19:16': 4,
		},
		{
			'19:17': 1,
		},
		{
			'19:18': 1,
		},
		{
			'19:19': 1,
		},
		{
			'19:21': 1,
		},
		{
			'19:22': 1,
		},
		{
			'19:28': 1,
		},
		{
			'19:29': 2,
		},
		{
			'19:30': 1,
		},
		{
			'19:39': 4,
		},
		{
			'19:42': 1,
		},
		{
			'19:43': 1,
		},
		{
			'19:46': 1,
		},
		{
			'19:47': 1,
		},
		{
			'19:49': 2,
		},
		{
			'19:50': 1,
		},
		{
			'19:51': 1,
		},
		{
			'19:53': 2,
		},
		{
			'20:03': 2,
		},
		{
			'20:04': 1,
		},
		{
			'20:06': 1,
		},
		{
			'20:08': 2,
		},
		{
			'20:09': 1,
		},
		{
			'20:11': 3,
		},
		{
			'20:13': 2,
		},
		{
			'20:20': 1,
		},
		{
			'20:21': 1,
		},
		{
			'20:22': 2,
		},
		{
			'20:23': 6,
		},
		{
			'20:25': 1,
		},
		{
			'20:26': 1,
		},
		{
			'20:27': 2,
		},
		{
			'20:28': 1,
		},
		{
			'20:30': 1,
		},
		{
			'20:32': 1,
		},
		{
			'20:33': 1,
		},
		{
			'20:35': 1,
		},
		{
			'20:37': 1,
		},
		{
			'20:40': 2,
		},
		{
			'20:45': 2,
		},
		{
			'20:47': 4,
		},
		{
			'20:49': 1,
		},
		{
			'20:53': 1,
		},
		{
			'20:54': 2,
		},
		{
			'20:55': 1,
		},
		{
			'20:59': 1,
		},
		{
			'21:01': 2,
		},
		{
			'21:05': 2,
		},
		{
			'21:07': 2,
		},
		{
			'21:12': 1,
		},
		{
			'21:13': 1,
		},
		{
			'21:15': 1,
		},
		{
			'21:16': 1,
		},
		{
			'21:19': 1,
		},
		{
			'21:20': 1,
		},
		{
			'21:23': 1,
		},
		{
			'21:24': 1,
		},
		{
			'21:25': 3,
		},
		{
			'21:27': 1,
		},
		{
			'21:32': 1,
		},
		{
			'21:34': 3,
		},
		{
			'21:38': 1,
		},
		{
			'21:40': 1,
		},
		{
			'21:41': 1,
		},
		{
			'21:43': 1,
		},
		{
			'21:44': 1,
		},
		{
			'21:45': 2,
		},
		{
			'21:47': 1,
		},
		{
			'21:48': 1,
		},
		{
			'21:50': 1,
		},
		{
			'21:51': 2,
		},
		{
			'21:52': 1,
		},
		{
			'21:58': 1,
		},
		{
			'22:00': 1,
		},
		{
			'22:02': 2,
		},
		{
			'22:05': 1,
		},
		{
			'22:08': 1,
		},
		{
			'22:09': 1,
		},
		{
			'22:10': 1,
		},
		{
			'22:15': 3,
		},
		{
			'22:24': 1,
		},
		{
			'22:29': 3,
		},
		{
			'22:30': 1,
		},
		{
			'22:35': 1,
		},
		{
			'22:39': 2,
		},
		{
			'22:41': 1,
		},
		{
			'22:42': 1,
		},
		{
			'22:47': 1,
		},
		{
			'22:48': 1,
		},
		{
			'22:49': 1,
		},
		{
			'22:52': 1,
		},
		{
			'22:53': 2,
		},
		{
			'22:55': 1,
		},
		{
			'22:56': 1,
		},
		{
			'23:05': 1,
		},
		{
			'23:09': 1,
		},
		{
			'23:10': 1,
		},
		{
			'23:12': 2,
		},
		{
			'23:14': 1,
		},
		{
			'23:15': 1,
		},
		{
			'23:19': 1,
		},
		{
			'23:21': 1,
		},
		{
			'23:25': 1,
		},
		{
			'23:32': 1,
		},
		{
			'23:33': 1,
		},
		{
			'23:35': 3,
		},
		{
			'23:50': 1,
		},
		{
			'23:51': 1,
		},
		{
			'23:55': 1,
		},
		{
			'23:57': 1,
		},
		{
			'23:59': 1,
		},
	],
	custom: [
		{
			'0:03': 1,
		},
		{
			'0:05': 1,
		},
		{
			'0:09': 1,
		},
		{
			'0:10': 1,
		},
		{
			'0:16': 1,
		},
		{
			'0:17': 2,
		},
		{
			'0:19': 1,
		},
		{
			'0:27': 1,
		},
		{
			'0:30': 2,
		},
		{
			'0:34': 1,
		},
		{
			'0:37': 1,
		},
		{
			'0:43': 1,
		},
		{
			'0:46': 1,
		},
		{
			'0:48': 1,
		},
		{
			'0:53': 1,
		},
		{
			'0:54': 2,
		},
		{
			'1:03': 1,
		},
		{
			'1:13': 1,
		},
		{
			'1:22': 1,
		},
		{
			'1:27': 1,
		},
		{
			'1:37': 1,
		},
		{
			'1:39': 1,
		},
		{
			'1:52': 1,
		},
		{
			'2:05': 1,
		},
		{
			'2:08': 1,
		},
		{
			'2:13': 1,
		},
		{
			'2:26': 1,
		},
		{
			'2:29': 1,
		},
		{
			'2:33': 2,
		},
		{
			'2:45': 1,
		},
		{
			'2:49': 2,
		},
		{
			'2:50': 1,
		},
		{
			'2:56': 2,
		},
		{
			'3:13': 1,
		},
		{
			'3:23': 1,
		},
		{
			'3:24': 2,
		},
		{
			'3:28': 1,
		},
		{
			'3:32': 1,
		},
		{
			'3:33': 1,
		},
		{
			'3:36': 1,
		},
		{
			'3:48': 1,
		},
		{
			'3:51': 2,
		},
		{
			'3:52': 1,
		},
		{
			'3:57': 1,
		},
		{
			'4:06': 2,
		},
		{
			'4:10': 1,
		},
		{
			'4:11': 1,
		},
		{
			'4:14': 1,
		},
		{
			'4:23': 1,
		},
		{
			'4:31': 1,
		},
		{
			'4:32': 1,
		},
		{
			'4:34': 1,
		},
		{
			'4:38': 1,
		},
		{
			'4:52': 1,
		},
		{
			'4:53': 1,
		},
		{
			'4:55': 1,
		},
		{
			'4:59': 1,
		},
		{
			'5:02': 1,
		},
		{
			'5:09': 3,
		},
		{
			'5:10': 1,
		},
		{
			'5:13': 1,
		},
		{
			'5:19': 1,
		},
		{
			'5:22': 1,
		},
		{
			'5:23': 1,
		},
		{
			'5:24': 2,
		},
		{
			'5:27': 1,
		},
		{
			'5:29': 1,
		},
		{
			'5:37': 1,
		},
		{
			'5:45': 1,
		},
		{
			'5:48': 1,
		},
		{
			'5:52': 2,
		},
		{
			'5:56': 1,
		},
		{
			'5:57': 1,
		},
		{
			'5:58': 1,
		},
		{
			'6:00': 1,
		},
		{
			'6:03': 1,
		},
		{
			'6:08': 1,
		},
		{
			'6:10': 1,
		},
		{
			'6:12': 1,
		},
		{
			'6:17': 1,
		},
		{
			'6:18': 2,
		},
		{
			'6:24': 2,
		},
		{
			'6:33': 1,
		},
		{
			'6:34': 1,
		},
		{
			'6:39': 3,
		},
		{
			'6:40': 1,
		},
		{
			'6:41': 1,
		},
		{
			'6:43': 1,
		},
		{
			'6:44': 1,
		},
		{
			'6:47': 2,
		},
		{
			'6:49': 1,
		},
		{
			'6:51': 1,
		},
		{
			'6:54': 1,
		},
		{
			'6:56': 1,
		},
		{
			'6:59': 2,
		},
		{
			'7:01': 1,
		},
		{
			'7:02': 3,
		},
		{
			'7:10': 1,
		},
		{
			'7:11': 1,
		},
		{
			'7:13': 2,
		},
		{
			'7:14': 2,
		},
		{
			'7:19': 1,
		},
		{
			'7:21': 1,
		},
		{
			'7:23': 2,
		},
		{
			'7:24': 1,
		},
		{
			'7:26': 1,
		},
		{
			'7:28': 1,
		},
		{
			'7:31': 2,
		},
		{
			'7:32': 1,
		},
		{
			'7:36': 2,
		},
		{
			'7:37': 2,
		},
		{
			'7:38': 2,
		},
		{
			'7:39': 1,
		},
		{
			'7:40': 1,
		},
		{
			'7:41': 4,
		},
		{
			'7:49': 1,
		},
		{
			'7:52': 1,
		},
		{
			'7:53': 3,
		},
		{
			'7:54': 3,
		},
		{
			'7:56': 2,
		},
		{
			'7:58': 1,
		},
		{
			'8:00': 3,
		},
		{
			'8:01': 1,
		},
		{
			'8:02': 3,
		},
		{
			'8:03': 1,
		},
		{
			'8:05': 1,
		},
		{
			'8:06': 1,
		},
		{
			'8:07': 2,
		},
		{
			'8:08': 2,
		},
		{
			'8:09': 1,
		},
		{
			'8:10': 1,
		},
		{
			'8:13': 1,
		},
		{
			'8:15': 1,
		},
		{
			'8:17': 1,
		},
		{
			'8:18': 1,
		},
		{
			'8:20': 1,
		},
		{
			'8:21': 2,
		},
		{
			'8:28': 1,
		},
		{
			'8:30': 1,
		},
		{
			'8:31': 1,
		},
		{
			'8:32': 1,
		},
		{
			'8:33': 1,
		},
		{
			'8:34': 1,
		},
		{
			'8:36': 1,
		},
		{
			'8:37': 2,
		},
		{
			'8:39': 1,
		},
		{
			'8:44': 2,
		},
		{
			'8:45': 2,
		},
		{
			'8:46': 2,
		},
		{
			'8:47': 1,
		},
		{
			'8:50': 2,
		},
		{
			'8:52': 1,
		},
		{
			'8:53': 1,
		},
		{
			'8:55': 1,
		},
		{
			'8:57': 2,
		},
		{
			'8:58': 1,
		},
		{
			'8:59': 1,
		},
		{
			'9:03': 1,
		},
		{
			'9:04': 2,
		},
		{
			'9:08': 2,
		},
		{
			'9:09': 2,
		},
		{
			'9:10': 1,
		},
		{
			'9:12': 1,
		},
		{
			'9:14': 2,
		},
		{
			'9:15': 3,
		},
		{
			'9:16': 1,
		},
		{
			'9:17': 1,
		},
		{
			'9:18': 1,
		},
		{
			'9:21': 1,
		},
		{
			'9:25': 2,
		},
		{
			'9:26': 1,
		},
		{
			'9:27': 1,
		},
		{
			'9:28': 1,
		},
		{
			'9:29': 1,
		},
		{
			'9:30': 2,
		},
		{
			'9:31': 1,
		},
		{
			'9:36': 1,
		},
		{
			'9:37': 1,
		},
		{
			'9:39': 2,
		},
		{
			'9:40': 2,
		},
		{
			'9:42': 4,
		},
		{
			'9:47': 1,
		},
		{
			'9:50': 1,
		},
		{
			'9:51': 1,
		},
		{
			'9:54': 1,
		},
		{
			'9:55': 1,
		},
		{
			'9:57': 1,
		},
		{
			'9:58': 2,
		},
		{
			'9:59': 2,
		},
		{
			'10:00': 2,
		},
		{
			'10:01': 2,
		},
		{
			'10:02': 1,
		},
		{
			'10:03': 1,
		},
		{
			'10:04': 1,
		},
		{
			'10:06': 1,
		},
		{
			'10:07': 1,
		},
		{
			'10:11': 1,
		},
		{
			'10:12': 1,
		},
		{
			'10:15': 2,
		},
		{
			'10:16': 1,
		},
		{
			'10:17': 1,
		},
		{
			'10:20': 1,
		},
		{
			'10:22': 1,
		},
		{
			'10:23': 2,
		},
		{
			'10:24': 2,
		},
		{
			'10:26': 1,
		},
		{
			'10:27': 1,
		},
		{
			'10:28': 4,
		},
		{
			'10:29': 1,
		},
		{
			'10:31': 1,
		},
		{
			'10:33': 2,
		},
		{
			'10:34': 2,
		},
		{
			'10:37': 1,
		},
		{
			'10:40': 1,
		},
		{
			'10:41': 2,
		},
		{
			'10:42': 2,
		},
		{
			'10:43': 1,
		},
		{
			'10:45': 1,
		},
		{
			'10:47': 2,
		},
		{
			'10:48': 1,
		},
		{
			'10:50': 1,
		},
		{
			'10:53': 1,
		},
		{
			'10:54': 1,
		},
		{
			'10:55': 1,
		},
		{
			'10:56': 3,
		},
		{
			'10:57': 2,
		},
		{
			'10:58': 2,
		},
		{
			'10:59': 2,
		},
		{
			'11:01': 1,
		},
		{
			'11:02': 2,
		},
		{
			'11:03': 1,
		},
		{
			'11:04': 1,
		},
		{
			'11:06': 1,
		},
		{
			'11:08': 2,
		},
		{
			'11:10': 2,
		},
		{
			'11:12': 1,
		},
		{
			'11:13': 1,
		},
		{
			'11:14': 2,
		},
		{
			'11:15': 1,
		},
		{
			'11:16': 2,
		},
		{
			'11:17': 1,
		},
		{
			'11:19': 1,
		},
		{
			'11:21': 1,
		},
		{
			'11:22': 1,
		},
		{
			'11:23': 1,
		},
		{
			'11:25': 1,
		},
		{
			'11:26': 1,
		},
		{
			'11:27': 1,
		},
		{
			'11:29': 1,
		},
		{
			'11:30': 4,
		},
		{
			'11:31': 1,
		},
		{
			'11:32': 2,
		},
		{
			'11:33': 1,
		},
		{
			'11:34': 2,
		},
		{
			'11:35': 4,
		},
		{
			'11:37': 1,
		},
		{
			'11:38': 2,
		},
		{
			'11:39': 2,
		},
		{
			'11:40': 1,
		},
		{
			'11:42': 1,
		},
		{
			'11:43': 1,
		},
		{
			'11:44': 3,
		},
		{
			'11:45': 1,
		},
		{
			'11:46': 1,
		},
		{
			'11:47': 1,
		},
		{
			'11:48': 2,
		},
		{
			'11:52': 1,
		},
		{
			'11:53': 2,
		},
		{
			'11:54': 3,
		},
		{
			'11:57': 1,
		},
		{
			'11:58': 1,
		},
		{
			'12:00': 2,
		},
		{
			'12:02': 1,
		},
		{
			'12:03': 2,
		},
		{
			'12:05': 1,
		},
		{
			'12:06': 1,
		},
		{
			'12:09': 1,
		},
		{
			'12:16': 2,
		},
		{
			'12:17': 1,
		},
		{
			'12:19': 3,
		},
		{
			'12:20': 1,
		},
		{
			'12:21': 3,
		},
		{
			'12:22': 2,
		},
		{
			'12:23': 3,
		},
		{
			'12:28': 1,
		},
		{
			'12:29': 1,
		},
		{
			'12:31': 5,
		},
		{
			'12:32': 2,
		},
		{
			'12:33': 2,
		},
		{
			'12:34': 1,
		},
		{
			'12:35': 2,
		},
		{
			'12:36': 4,
		},
		{
			'12:37': 1,
		},
		{
			'12:38': 1,
		},
		{
			'12:39': 2,
		},
		{
			'12:40': 1,
		},
		{
			'12:41': 1,
		},
		{
			'12:42': 2,
		},
		{
			'12:43': 1,
		},
		{
			'12:44': 1,
		},
		{
			'12:45': 1,
		},
		{
			'12:46': 1,
		},
		{
			'12:47': 2,
		},
		{
			'12:48': 3,
		},
		{
			'12:51': 2,
		},
		{
			'12:54': 1,
		},
		{
			'12:55': 2,
		},
		{
			'12:56': 1,
		},
		{
			'12:59': 1,
		},
		{
			'13:00': 1,
		},
		{
			'13:01': 2,
		},
		{
			'13:02': 1,
		},
		{
			'13:03': 2,
		},
		{
			'13:04': 2,
		},
		{
			'13:11': 2,
		},
		{
			'13:12': 1,
		},
		{
			'13:13': 3,
		},
		{
			'13:15': 3,
		},
		{
			'13:16': 1,
		},
		{
			'13:17': 1,
		},
		{
			'13:18': 3,
		},
		{
			'13:19': 3,
		},
		{
			'13:20': 2,
		},
		{
			'13:22': 2,
		},
		{
			'13:24': 4,
		},
		{
			'13:30': 1,
		},
		{
			'13:32': 5,
		},
		{
			'13:33': 3,
		},
		{
			'13:34': 1,
		},
		{
			'13:35': 3,
		},
		{
			'13:37': 1,
		},
		{
			'13:38': 2,
		},
		{
			'13:39': 2,
		},
		{
			'13:41': 1,
		},
		{
			'13:42': 1,
		},
		{
			'13:43': 1,
		},
		{
			'13:44': 1,
		},
		{
			'13:45': 1,
		},
		{
			'13:47': 1,
		},
		{
			'13:48': 1,
		},
		{
			'13:51': 2,
		},
		{
			'13:52': 2,
		},
		{
			'13:53': 5,
		},
		{
			'13:54': 4,
		},
		{
			'13:55': 1,
		},
		{
			'13:57': 1,
		},
		{
			'13:58': 1,
		},
		{
			'13:59': 1,
		},
		{
			'14:00': 1,
		},
		{
			'14:01': 1,
		},
		{
			'14:02': 2,
		},
		{
			'14:04': 1,
		},
		{
			'14:05': 5,
		},
		{
			'14:06': 3,
		},
		{
			'14:07': 1,
		},
		{
			'14:09': 2,
		},
		{
			'14:10': 2,
		},
		{
			'14:11': 1,
		},
		{
			'14:12': 2,
		},
		{
			'14:13': 1,
		},
		{
			'14:14': 2,
		},
		{
			'14:15': 1,
		},
		{
			'14:16': 2,
		},
		{
			'14:18': 2,
		},
		{
			'14:19': 2,
		},
		{
			'14:22': 3,
		},
		{
			'14:24': 1,
		},
		{
			'14:25': 2,
		},
		{
			'14:28': 1,
		},
		{
			'14:29': 1,
		},
		{
			'14:32': 1,
		},
		{
			'14:33': 1,
		},
		{
			'14:36': 1,
		},
		{
			'14:37': 1,
		},
		{
			'14:38': 3,
		},
		{
			'14:39': 5,
		},
		{
			'14:40': 2,
		},
		{
			'14:41': 1,
		},
		{
			'14:42': 1,
		},
		{
			'14:44': 3,
		},
		{
			'14:45': 1,
		},
		{
			'14:47': 1,
		},
		{
			'14:48': 1,
		},
		{
			'14:51': 1,
		},
		{
			'14:53': 1,
		},
		{
			'14:54': 1,
		},
		{
			'14:55': 1,
		},
		{
			'14:57': 1,
		},
		{
			'14:58': 1,
		},
		{
			'15:00': 1,
		},
		{
			'15:01': 2,
		},
		{
			'15:02': 1,
		},
		{
			'15:03': 2,
		},
		{
			'15:04': 1,
		},
		{
			'15:05': 2,
		},
		{
			'15:06': 2,
		},
		{
			'15:09': 1,
		},
		{
			'15:11': 2,
		},
		{
			'15:12': 1,
		},
		{
			'15:13': 1,
		},
		{
			'15:15': 2,
		},
		{
			'15:16': 1,
		},
		{
			'15:17': 2,
		},
		{
			'15:19': 1,
		},
		{
			'15:20': 1,
		},
		{
			'15:21': 1,
		},
		{
			'15:22': 4,
		},
		{
			'15:23': 2,
		},
		{
			'15:24': 1,
		},
		{
			'15:25': 1,
		},
		{
			'15:27': 1,
		},
		{
			'15:31': 1,
		},
		{
			'15:32': 2,
		},
		{
			'15:33': 1,
		},
		{
			'15:34': 1,
		},
		{
			'15:36': 1,
		},
		{
			'15:37': 3,
		},
		{
			'15:38': 1,
		},
		{
			'15:39': 3,
		},
		{
			'15:43': 2,
		},
		{
			'15:45': 2,
		},
		{
			'15:46': 2,
		},
		{
			'15:47': 6,
		},
		{
			'15:52': 2,
		},
		{
			'15:54': 1,
		},
		{
			'15:57': 3,
		},
		{
			'15:58': 4,
		},
		{
			'15:59': 1,
		},
		{
			'16:01': 1,
		},
		{
			'16:04': 3,
		},
		{
			'16:05': 2,
		},
		{
			'16:06': 2,
		},
		{
			'16:07': 2,
		},
		{
			'16:08': 4,
		},
		{
			'16:10': 1,
		},
		{
			'16:13': 1,
		},
		{
			'16:14': 2,
		},
		{
			'16:15': 2,
		},
		{
			'16:16': 1,
		},
		{
			'16:18': 1,
		},
		{
			'16:19': 3,
		},
		{
			'16:22': 2,
		},
		{
			'16:24': 1,
		},
		{
			'16:26': 1,
		},
		{
			'16:27': 1,
		},
		{
			'16:29': 1,
		},
		{
			'16:34': 1,
		},
		{
			'16:37': 1,
		},
		{
			'16:39': 2,
		},
		{
			'16:41': 1,
		},
		{
			'16:42': 1,
		},
		{
			'16:43': 1,
		},
		{
			'16:44': 1,
		},
		{
			'16:46': 1,
		},
		{
			'16:49': 1,
		},
		{
			'16:51': 2,
		},
		{
			'16:53': 2,
		},
		{
			'16:56': 1,
		},
		{
			'16:58': 1,
		},
		{
			'16:59': 1,
		},
		{
			'17:00': 1,
		},
		{
			'17:01': 1,
		},
		{
			'17:02': 1,
		},
		{
			'17:03': 1,
		},
		{
			'17:05': 1,
		},
		{
			'17:08': 1,
		},
		{
			'17:09': 3,
		},
		{
			'17:11': 1,
		},
		{
			'17:13': 2,
		},
		{
			'17:15': 3,
		},
		{
			'17:16': 1,
		},
		{
			'17:17': 2,
		},
		{
			'17:19': 1,
		},
		{
			'17:23': 1,
		},
		{
			'17:24': 2,
		},
		{
			'17:25': 1,
		},
		{
			'17:26': 2,
		},
		{
			'17:27': 1,
		},
		{
			'17:29': 1,
		},
		{
			'17:31': 2,
		},
		{
			'17:32': 2,
		},
		{
			'17:36': 1,
		},
		{
			'17:38': 2,
		},
		{
			'17:39': 2,
		},
		{
			'17:42': 2,
		},
		{
			'17:43': 3,
		},
		{
			'17:44': 1,
		},
		{
			'17:45': 1,
		},
		{
			'17:46': 1,
		},
		{
			'17:47': 1,
		},
		{
			'17:48': 2,
		},
		{
			'17:50': 1,
		},
		{
			'17:52': 2,
		},
		{
			'17:54': 1,
		},
		{
			'17:56': 3,
		},
		{
			'17:57': 2,
		},
		{
			'17:59': 1,
		},
		{
			'18:00': 1,
		},
		{
			'18:03': 1,
		},
		{
			'18:04': 1,
		},
		{
			'18:06': 3,
		},
		{
			'18:07': 3,
		},
		{
			'18:08': 1,
		},
		{
			'18:09': 3,
		},
		{
			'18:10': 3,
		},
		{
			'18:11': 1,
		},
		{
			'18:15': 1,
		},
		{
			'18:16': 1,
		},
		{
			'18:17': 1,
		},
		{
			'18:19': 3,
		},
		{
			'18:21': 1,
		},
		{
			'18:22': 2,
		},
		{
			'18:25': 1,
		},
		{
			'18:26': 1,
		},
		{
			'18:27': 1,
		},
		{
			'18:28': 3,
		},
		{
			'18:29': 1,
		},
		{
			'18:30': 2,
		},
		{
			'18:31': 2,
		},
		{
			'18:32': 1,
		},
		{
			'18:34': 1,
		},
		{
			'18:35': 1,
		},
		{
			'18:36': 1,
		},
		{
			'18:37': 3,
		},
		{
			'18:38': 2,
		},
		{
			'18:40': 2,
		},
		{
			'18:41': 2,
		},
		{
			'18:42': 1,
		},
		{
			'18:44': 3,
		},
		{
			'18:45': 1,
		},
		{
			'18:47': 8,
		},
		{
			'18:48': 1,
		},
		{
			'18:50': 1,
		},
		{
			'18:51': 1,
		},
		{
			'18:52': 1,
		},
		{
			'18:53': 1,
		},
		{
			'18:54': 2,
		},
		{
			'18:57': 1,
		},
		{
			'18:58': 4,
		},
		{
			'19:00': 1,
		},
		{
			'19:01': 1,
		},
		{
			'19:02': 2,
		},
		{
			'19:03': 1,
		},
		{
			'19:04': 1,
		},
		{
			'19:06': 2,
		},
		{
			'19:07': 3,
		},
		{
			'19:08': 1,
		},
		{
			'19:09': 2,
		},
		{
			'19:12': 3,
		},
		{
			'19:13': 1,
		},
		{
			'19:15': 1,
		},
		{
			'19:16': 1,
		},
		{
			'19:17': 1,
		},
		{
			'19:19': 2,
		},
		{
			'19:20': 2,
		},
		{
			'19:22': 1,
		},
		{
			'19:25': 1,
		},
		{
			'19:26': 1,
		},
		{
			'19:32': 2,
		},
		{
			'19:33': 1,
		},
		{
			'19:34': 2,
		},
		{
			'19:36': 2,
		},
		{
			'19:37': 1,
		},
		{
			'19:38': 3,
		},
		{
			'19:42': 1,
		},
		{
			'19:45': 1,
		},
		{
			'19:46': 1,
		},
		{
			'19:47': 3,
		},
		{
			'19:51': 2,
		},
		{
			'19:52': 2,
		},
		{
			'19:53': 2,
		},
		{
			'19:54': 1,
		},
		{
			'19:55': 1,
		},
		{
			'19:57': 2,
		},
		{
			'20:02': 1,
		},
		{
			'20:03': 1,
		},
		{
			'20:04': 1,
		},
		{
			'20:05': 2,
		},
		{
			'20:06': 1,
		},
		{
			'20:09': 3,
		},
		{
			'20:10': 1,
		},
		{
			'20:11': 2,
		},
		{
			'20:12': 2,
		},
		{
			'20:13': 3,
		},
		{
			'20:15': 2,
		},
		{
			'20:20': 1,
		},
		{
			'20:21': 1,
		},
		{
			'20:22': 2,
		},
		{
			'20:23': 1,
		},
		{
			'20:24': 1,
		},
		{
			'20:25': 1,
		},
		{
			'20:26': 1,
		},
		{
			'20:27': 1,
		},
		{
			'20:28': 1,
		},
		{
			'20:30': 1,
		},
		{
			'20:31': 1,
		},
		{
			'20:35': 2,
		},
		{
			'20:36': 1,
		},
		{
			'20:37': 2,
		},
		{
			'20:38': 1,
		},
		{
			'20:41': 3,
		},
		{
			'20:42': 1,
		},
		{
			'20:43': 3,
		},
		{
			'20:45': 1,
		},
		{
			'20:47': 1,
		},
		{
			'20:49': 1,
		},
		{
			'20:51': 2,
		},
		{
			'20:55': 2,
		},
		{
			'20:56': 2,
		},
		{
			'20:57': 2,
		},
		{
			'20:58': 2,
		},
		{
			'21:00': 1,
		},
		{
			'21:02': 9,
		},
		{
			'21:03': 3,
		},
		{
			'21:07': 2,
		},
		{
			'21:08': 1,
		},
		{
			'21:09': 2,
		},
		{
			'21:11': 3,
		},
		{
			'21:12': 2,
		},
		{
			'21:13': 2,
		},
		{
			'21:15': 2,
		},
		{
			'21:16': 2,
		},
		{
			'21:18': 1,
		},
		{
			'21:19': 4,
		},
		{
			'21:21': 2,
		},
		{
			'21:22': 1,
		},
		{
			'21:24': 2,
		},
		{
			'21:25': 2,
		},
		{
			'21:28': 4,
		},
		{
			'21:29': 1,
		},
		{
			'21:31': 2,
		},
		{
			'21:32': 1,
		},
		{
			'21:34': 2,
		},
		{
			'21:38': 2,
		},
		{
			'21:39': 2,
		},
		{
			'21:41': 1,
		},
		{
			'21:43': 1,
		},
		{
			'21:44': 1,
		},
		{
			'21:45': 1,
		},
		{
			'21:47': 1,
		},
		{
			'21:50': 1,
		},
		{
			'21:53': 1,
		},
		{
			'21:55': 3,
		},
		{
			'21:57': 3,
		},
		{
			'21:58': 1,
		},
		{
			'22:00': 1,
		},
		{
			'22:02': 1,
		},
		{
			'22:03': 1,
		},
		{
			'22:04': 1,
		},
		{
			'22:05': 2,
		},
		{
			'22:08': 1,
		},
		{
			'22:12': 1,
		},
		{
			'22:15': 2,
		},
		{
			'22:16': 2,
		},
		{
			'22:18': 2,
		},
		{
			'22:19': 1,
		},
		{
			'22:22': 2,
		},
		{
			'22:26': 2,
		},
		{
			'22:31': 1,
		},
		{
			'22:33': 2,
		},
		{
			'22:34': 2,
		},
		{
			'22:35': 1,
		},
		{
			'22:36': 1,
		},
		{
			'22:37': 1,
		},
		{
			'22:38': 1,
		},
		{
			'22:40': 1,
		},
		{
			'22:41': 1,
		},
		{
			'22:42': 1,
		},
		{
			'22:43': 2,
		},
		{
			'22:47': 1,
		},
		{
			'22:48': 1,
		},
		{
			'22:49': 1,
		},
		{
			'22:52': 1,
		},
		{
			'22:54': 4,
		},
		{
			'22:56': 1,
		},
		{
			'22:57': 3,
		},
		{
			'23:00': 1,
		},
		{
			'23:02': 2,
		},
		{
			'23:06': 1,
		},
		{
			'23:07': 1,
		},
		{
			'23:12': 1,
		},
		{
			'23:14': 1,
		},
		{
			'23:15': 1,
		},
		{
			'23:22': 1,
		},
		{
			'23:24': 2,
		},
		{
			'23:26': 1,
		},
		{
			'23:27': 2,
		},
		{
			'23:28': 2,
		},
		{
			'23:31': 1,
		},
		{
			'23:37': 1,
		},
		{
			'23:41': 1,
		},
		{
			'23:44': 1,
		},
		{
			'23:45': 3,
		},
		{
			'23:46': 3,
		},
		{
			'23:47': 1,
		},
		{
			'23:48': 2,
		},
		{
			'23:50': 1,
		},
		{
			'23:51': 1,
		},
		{
			'23:55': 1,
		},
	],
};

const mockGeo = {
    7: {
        "stock_data": [
            {
                mockStockName: 'Электросталь',
                percent: 55.03,
                comparePercent: 55.15,
                percentOrder: 30,
                comparePercentOrder: -29.64,
                orderCount: 223,
                orderAmount: 521839.23,
                saleCount: 292,
                saleAmount: 649187.63,
                saleDetails: [
                    {
                        district: 'Центральный федеральный округ',
                        amount: 191109.56,
                        mockStock_percent: 29.4,
                        common_percent: 16.2,
                    },
                    {
                        district: 'Сибирский федеральный округ',
                        amount: 76925.74,
                        mockStock_percent: 11.8,
                        common_percent: 6.5,
                    },
                    {
                        district: 'Южный федеральный округ',
                        amount: 76082.37,
                        mockStock_percent: 11.7,
                        common_percent: 6.4,
                    },
                    {
                        district: 'Приволжский федеральный округ',
                        amount: 66936.69,
                        mockStock_percent: 10.3,
                        common_percent: 5.7,
                    },
                    {
                        district: 'Уральский федеральный округ',
                        amount: 65328.16,
                        mockStock_percent: 10.1,
                        common_percent: 5.5,
                    },
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 65301.12,
                        mockStock_percent: 10.1,
                        common_percent: 5.5,
                    },
                    {
                        district: 'Северо-Западный федеральный округ',
                        amount: 55664.01,
                        mockStock_percent: 8.6,
                        common_percent: 4.7,
                    },
                    {
                        district: 'Дальневосточный федеральный округ',
                        amount: 42231.72,
                        mockStock_percent: 6.5,
                        common_percent: 3.6,
                    },
                    {
                        district: 'Другой округ',
                        amount: 9608.26,
                        mockStock_percent: 1.5,
                        common_percent: 0.8,
                    },
                ],
                orderDetails: [
                    {
                        district: 'Центральный федеральный округ',
                        amount: 191109.56,
                        mockStock_percent: 36.6,
                        common_percent: 11.2,
                    },
                    {
                        district: 'Сибирский федеральный округ',
                        amount: 76925.74,
                        mockStock_percent: 14.7,
                        common_percent: 4.5,
                    },
                    {
                        district: 'Южный федеральный округ',
                        amount: 76082.37,
                        mockStock_percent: 14.6,
                        common_percent: 4.4,
                    },
                    {
                        district: 'Приволжский федеральный округ',
                        amount: 66936.69,
                        mockStock_percent: 12.8,
                        common_percent: 3.9,
                    },
                    {
                        district: 'Уральский федеральный округ',
                        amount: 65328.16,
                        mockStock_percent: 12.5,
                        common_percent: 3.8,
                    },
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 65301.12,
                        mockStock_percent: 12.5,
                        common_percent: 3.8,
                    },
                    {
                        district: 'Северо-Западный федеральный округ',
                        amount: 55664.01,
                        mockStock_percent: 10.7,
                        common_percent: 3.3,
                    },
                    {
                        district: 'Дальневосточный федеральный округ',
                        amount: 42231.72,
                        mockStock_percent: 8.1,
                        common_percent: 2.5,
                    },
                    {
                        district: 'Другой округ',
                        amount: 9608.26,
                        mockStock_percent: 1.8,
                        common_percent: 0.6,
                    },
                ],
            },
            {
                mockStockName: 'Владикавказ',
                percent: 22.86,
                comparePercent: 184.08,
                percentOrder: 59,
                comparePercentOrder: 3888,
                orderCount: 446,
                orderAmount: 1014956.71,
                saleCount: 135,
                saleAmount: 269646.05,
                saleDetails: [
                    {
                        district: 'Южный федеральный округ',
                        amount: 80900.53,
                        mockStock_percent: 30,
                        common_percent: 6.9,
                    },
                    {
                        district: 'Центральный федеральный округ',
                        amount: 68887.17,
                        mockStock_percent: 25.5,
                        common_percent: 5.8,
                    },
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 61044.29,
                        mockStock_percent: 22.6,
                        common_percent: 5.2,
                    },
                    {
                        district: 'Приволжский федеральный округ',
                        amount: 29289.84,
                        mockStock_percent: 10.9,
                        common_percent: 2.5,
                    },
                    {
                        district: 'Уральский федеральный округ',
                        amount: 11724.06,
                        mockStock_percent: 4.3,
                        common_percent: 1,
                    },
                    {
                        district: 'Северо-Западный федеральный округ',
                        amount: 9827.05,
                        mockStock_percent: 3.6,
                        common_percent: 0.8,
                    },
                    {
                        district: 'Другой округ',
                        amount: 4497.6,
                        mockStock_percent: 1.7,
                        common_percent: 0.4,
                    },
                    {
                        district: 'Сибирский федеральный округ',
                        amount: 3475.51,
                        mockStock_percent: 1.3,
                        common_percent: 0.3,
                    },
                ],
                orderDetails: [
                    {
                        district: 'Южный федеральный округ',
                        amount: 80900.53,
                        mockStock_percent: 8,
                        common_percent: 4.7,
                    },
                    {
                        district: 'Центральный федеральный округ',
                        amount: 68887.17,
                        mockStock_percent: 6.8,
                        common_percent: 4,
                    },
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 61044.29,
                        mockStock_percent: 6,
                        common_percent: 3.6,
                    },
                    {
                        district: 'Приволжский федеральный округ',
                        amount: 29289.84,
                        mockStock_percent: 2.9,
                        common_percent: 1.7,
                    },
                    {
                        district: 'Уральский федеральный округ',
                        amount: 11724.06,
                        mockStock_percent: 1.2,
                        common_percent: 0.7,
                    },
                    {
                        district: 'Северо-Западный федеральный округ',
                        amount: 9827.05,
                        mockStock_percent: 1,
                        common_percent: 0.6,
                    },
                    {
                        district: 'Другой округ',
                        amount: 4497.6,
                        mockStock_percent: 0.4,
                        common_percent: 0.3,
                    },
                    {
                        district: 'Сибирский федеральный округ',
                        amount: 3475.51,
                        mockStock_percent: 0.3,
                        common_percent: 0.2,
                    },
                ],
            },
            {
                mockStockName: 'Краснодар',
                percent: 12.63,
                comparePercent: -71.03,
                percentOrder: 10,
                comparePercentOrder: -81.05,
                orderCount: 159,
                orderAmount: 184442.67,
                saleCount: 142,
                saleAmount: 149021.94,
                saleDetails: [
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 45541.55,
                        mockStock_percent: 30.6,
                        common_percent: 3.9,
                    },
                    {
                        district: 'Южный федеральный округ',
                        amount: 35465.25,
                        mockStock_percent: 23.8,
                        common_percent: 3,
                    },
                    {
                        district: 'Центральный федеральный округ',
                        amount: 26553.12,
                        mockStock_percent: 17.8,
                        common_percent: 2.3,
                    },
                    {
                        district: 'Уральский федеральный округ',
                        amount: 17415.87,
                        mockStock_percent: 11.7,
                        common_percent: 1.5,
                    },
                    {
                        district: 'Приволжский федеральный округ',
                        amount: 10905.35,
                        mockStock_percent: 7.3,
                        common_percent: 0.9,
                    },
                    {
                        district: 'Сибирский федеральный округ',
                        amount: 4379.92,
                        mockStock_percent: 2.9,
                        common_percent: 0.4,
                    },
                    {
                        district: 'Дальневосточный федеральный округ',
                        amount: 3495.73,
                        mockStock_percent: 2.3,
                        common_percent: 0.3,
                    },
                    {
                        district: 'Другой округ',
                        amount: 2798.62,
                        mockStock_percent: 1.9,
                        common_percent: 0.2,
                    },
                    {
                        district: 'Северо-Западный федеральный округ',
                        amount: 2466.53,
                        mockStock_percent: 1.7,
                        common_percent: 0.2,
                    },
                ],
                orderDetails: [
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 45541.55,
                        mockStock_percent: 24.7,
                        common_percent: 2.7,
                    },
                    {
                        district: 'Южный федеральный округ',
                        amount: 35465.25,
                        mockStock_percent: 19.2,
                        common_percent: 2.1,
                    },
                    {
                        district: 'Центральный федеральный округ',
                        amount: 26553.12,
                        mockStock_percent: 14.4,
                        common_percent: 1.6,
                    },
                    {
                        district: 'Уральский федеральный округ',
                        amount: 17415.87,
                        mockStock_percent: 9.4,
                        common_percent: 1,
                    },
                    {
                        district: 'Приволжский федеральный округ',
                        amount: 10905.35,
                        mockStock_percent: 5.9,
                        common_percent: 0.6,
                    },
                    {
                        district: 'Сибирский федеральный округ',
                        amount: 4379.92,
                        mockStock_percent: 2.4,
                        common_percent: 0.3,
                    },
                    {
                        district: 'Дальневосточный федеральный округ',
                        amount: 3495.73,
                        mockStock_percent: 1.9,
                        common_percent: 0.2,
                    },
                    {
                        district: 'Другой округ',
                        amount: 2798.62,
                        mockStock_percent: 1.5,
                        common_percent: 0.2,
                    },
                    {
                        district: 'Северо-Западный федеральный округ',
                        amount: 2466.53,
                        mockStock_percent: 1.3,
                        common_percent: 0.1,
                    },
                ],
            },
            {
                mockStockName: 'Казань',
                percent: 10.15,
                comparePercent: -35.72,
                percentOrder: 5.38,
                comparePercentOrder: -65.94,
                orderCount: 86,
                orderAmount: 92212.87,
                saleCount: 121,
                saleAmount: 119683.5,
                saleDetails: [
                    {
                        district: 'Приволжский федеральный округ',
                        amount: 34349.29,
                        mockStock_percent: 28.7,
                        common_percent: 2.9,
                    },
                    {
                        district: 'Центральный федеральный округ',
                        amount: 21846.36,
                        mockStock_percent: 18.3,
                        common_percent: 1.9,
                    },
                    {
                        district: 'Сибирский федеральный округ',
                        amount: 19391.32,
                        mockStock_percent: 16.2,
                        common_percent: 1.6,
                    },
                    {
                        district: 'Уральский федеральный округ',
                        amount: 14998.44,
                        mockStock_percent: 12.5,
                        common_percent: 1.3,
                    },
                    {
                        district: 'Другой округ',
                        amount: 10554.11,
                        mockStock_percent: 8.8,
                        common_percent: 0.9,
                    },
                    {
                        district: 'Северо-Западный федеральный округ',
                        amount: 6212.18,
                        mockStock_percent: 5.2,
                        common_percent: 0.5,
                    },
                    {
                        district: 'Дальневосточный федеральный округ',
                        amount: 5525.97,
                        mockStock_percent: 4.6,
                        common_percent: 0.5,
                    },
                    {
                        district: 'Южный федеральный округ',
                        amount: 4170.71,
                        mockStock_percent: 3.5,
                        common_percent: 0.4,
                    },
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 2635.12,
                        mockStock_percent: 2.2,
                        common_percent: 0.2,
                    },
                ],
                orderDetails: [
                    {
                        district: 'Приволжский федеральный округ',
                        amount: 34349.29,
                        mockStock_percent: 37.2,
                        common_percent: 2,
                    },
                    {
                        district: 'Центральный федеральный округ',
                        amount: 21846.36,
                        mockStock_percent: 23.7,
                        common_percent: 1.3,
                    },
                    {
                        district: 'Сибирский федеральный округ',
                        amount: 19391.32,
                        mockStock_percent: 21,
                        common_percent: 1.1,
                    },
                    {
                        district: 'Уральский федеральный округ',
                        amount: 14998.44,
                        mockStock_percent: 16.3,
                        common_percent: 0.9,
                    },
                    {
                        district: 'Другой округ',
                        amount: 10554.11,
                        mockStock_percent: 11.4,
                        common_percent: 0.6,
                    },
                    {
                        district: 'Северо-Западный федеральный округ',
                        amount: 6212.18,
                        mockStock_percent: 6.7,
                        common_percent: 0.4,
                    },
                    {
                        district: 'Дальневосточный федеральный округ',
                        amount: 5525.97,
                        mockStock_percent: 6,
                        common_percent: 0.3,
                    },
                    {
                        district: 'Южный федеральный округ',
                        amount: 4170.71,
                        mockStock_percent: 4.5,
                        common_percent: 0.2,
                    },
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 2635.12,
                        mockStock_percent: 2.9,
                        common_percent: 0.2,
                    },
                ],
            },
            {
                mockStockName: 'Котовск',
                percent: 4.73,
                comparePercent: 70.71,
                percentOrder: 6.95,
                comparePercentOrder: 133,
                orderCount: 100,
                orderAmount: 119081.14,
                saleCount: 60,
                saleAmount: 55794.16,
                saleDetails: [
                    {
                        district: 'Центральный федеральный округ',
                        amount: 21627.07,
                        mockStock_percent: 38.8,
                        common_percent: 1.8,
                    },
                    {
                        district: 'Южный федеральный округ',
                        amount: 11395.99,
                        mockStock_percent: 20.4,
                        common_percent: 1,
                    },
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 9625.07,
                        mockStock_percent: 17.3,
                        common_percent: 0.8,
                    },
                    {
                        district: 'Северо-Западный федеральный округ',
                        amount: 4613.56,
                        mockStock_percent: 8.3,
                        common_percent: 0.4,
                    },
                    {
                        district: 'Приволжский федеральный округ',
                        amount: 3149.71,
                        mockStock_percent: 5.6,
                        common_percent: 0.3,
                    },
                    {
                        district: 'Уральский федеральный округ',
                        amount: 2235.1,
                        mockStock_percent: 4,
                        common_percent: 0.2,
                    },
                    {
                        district: 'Другой округ',
                        amount: 2046.43,
                        mockStock_percent: 3.7,
                        common_percent: 0.2,
                    },
                    {
                        district: 'Сибирский федеральный округ',
                        amount: 1101.23,
                        mockStock_percent: 2,
                        common_percent: 0.1,
                    },
                ],
                orderDetails: [
                    {
                        district: 'Центральный федеральный округ',
                        amount: 21627.07,
                        mockStock_percent: 18.2,
                        common_percent: 1.3,
                    },
                    {
                        district: 'Южный федеральный округ',
                        amount: 11395.99,
                        mockStock_percent: 9.6,
                        common_percent: 0.7,
                    },
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 9625.07,
                        mockStock_percent: 8.1,
                        common_percent: 0.6,
                    },
                    {
                        district: 'Северо-Западный федеральный округ',
                        amount: 4613.56,
                        mockStock_percent: 3.9,
                        common_percent: 0.3,
                    },
                    {
                        district: 'Приволжский федеральный округ',
                        amount: 3149.71,
                        mockStock_percent: 2.6,
                        common_percent: 0.2,
                    },
                    {
                        district: 'Уральский федеральный округ',
                        amount: 2235.1,
                        mockStock_percent: 1.9,
                        common_percent: 0.1,
                    },
                    {
                        district: 'Другой округ',
                        amount: 2046.43,
                        mockStock_percent: 1.7,
                        common_percent: 0.1,
                    },
                    {
                        district: 'Сибирский федеральный округ',
                        amount: 1101.23,
                        mockStock_percent: 0.9,
                        common_percent: 0.1,
                    },
                ],
            },
            {
                mockStockName: 'Коледино',
                percent: 0.63,
                comparePercent: -64.21,
                percentOrder: 0.66,
                comparePercentOrder: -72.8,
                orderCount: 7,
                orderAmount: 11247,
                saleCount: 6,
                saleAmount: 7380.55,
                saleDetails: [
                    {
                        district: 'Центральный федеральный округ',
                        amount: 3530.9,
                        mockStock_percent: 47.8,
                        common_percent: 0.3,
                    },
                    {
                        district: 'Уральский федеральный округ',
                        amount: 1509.7,
                        mockStock_percent: 20.5,
                        common_percent: 0.1,
                    },
                    {
                        district: 'Приволжский федеральный округ',
                        amount: 1117.53,
                        mockStock_percent: 15.1,
                        common_percent: 0.1,
                    },
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 633.6,
                        mockStock_percent: 8.6,
                        common_percent: 0.1,
                    },
                    {
                        district: 'Другой округ',
                        amount: 588.82,
                        mockStock_percent: 8,
                        common_percent: 0,
                    },
                ],
                orderDetails: [
                    {
                        district: 'Центральный федеральный округ',
                        amount: 3530.9,
                        mockStock_percent: 31.4,
                        common_percent: 0.2,
                    },
                    {
                        district: 'Уральский федеральный округ',
                        amount: 1509.7,
                        mockStock_percent: 13.4,
                        common_percent: 0.1,
                    },
                    {
                        district: 'Приволжский федеральный округ',
                        amount: 1117.53,
                        mockStock_percent: 9.9,
                        common_percent: 0.1,
                    },
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 633.6,
                        mockStock_percent: 5.6,
                        common_percent: 0,
                    },
                    {
                        district: 'Другой округ',
                        amount: 588.82,
                        mockStock_percent: 5.2,
                        common_percent: 0,
                    },
                ],
            },
            {
                mockStockName: 'Белые Столбы',
                percent: 0.34,
                comparePercent: 100,
                percentOrder: 0.27,
                comparePercentOrder: -8.98,
                orderCount: 4,
                orderAmount: 4549.92,
                saleCount: 4,
                saleAmount: 4054.07,
                saleDetails: [
                    {
                        district: 'Центральный федеральный округ',
                        amount: 4054.07,
                        mockStock_percent: 100,
                        common_percent: 0.3,
                    },
                ],
                orderDetails: [
                    {
                        district: 'Центральный федеральный округ',
                        amount: 4054.07,
                        mockStock_percent: 89.1,
                        common_percent: 0.2,
                    },
                ],
            },
            {
                mockStockName: 'Тула',
                percent: 0.29,
                comparePercent: -38.77,
                percentOrder: 0.32,
                comparePercentOrder: 118,
                orderCount: 4,
                orderAmount: 5438,
                saleCount: 3,
                saleAmount: 3450.37,
                saleDetails: [
                    {
                        district: 'Центральный федеральный округ',
                        amount: 2283.95,
                        mockStock_percent: 66.2,
                        common_percent: 0.2,
                    },
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 1166.42,
                        mockStock_percent: 33.8,
                        common_percent: 0.1,
                    },
                ],
                orderDetails: [
                    {
                        district: 'Центральный федеральный округ',
                        amount: 2283.95,
                        mockStock_percent: 42,
                        common_percent: 0.1,
                    },
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 1166.42,
                        mockStock_percent: 21.4,
                        common_percent: 0.1,
                    },
                ],
            },
            {
                mockStockName: 'Невинномысск',
                percent: 0.18,
                comparePercent: -45.97,
                percentOrder: 0.67,
                comparePercentOrder: 51,
                orderCount: 9,
                orderAmount: 11403.37,
                saleCount: 2,
                saleAmount: 2142.83,
                saleDetails: [
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 1101.23,
                        mockStock_percent: 51.4,
                        common_percent: 0.1,
                    },
                    {
                        district: 'Центральный федеральный округ',
                        amount: 1041.6,
                        mockStock_percent: 48.6,
                        common_percent: 0.1,
                    },
                ],
                orderDetails: [
                    {
                        district: 'Северо-Кавказский федеральный округ',
                        amount: 1101.23,
                        mockStock_percent: 9.7,
                        common_percent: 0.1,
                    },
                    {
                        district: 'Центральный федеральный округ',
                        amount: 1041.6,
                        mockStock_percent: 9.1,
                        common_percent: 0.1,
                    },
                ],
            },
            {
                mockStockName: 'Екатеринбург - Испытателей 14г',
                percent: 0.1,
                comparePercent: 100,
                percentOrder: 0,
                comparePercentOrder: 100,
                orderCount: 0,
                orderAmount: 0,
                saleCount: 1,
                saleAmount: 1166.42,
                saleDetails: [
                    {
                        district: 'Уральский федеральный округ',
                        amount: 1166.42,
                        mockStock_percent: 100,
                        common_percent: 0.1,
                    },
                ],
                orderDetails: [
                    {
                        district: 'Уральский федеральный округ',
                        amount: 1166.42,
                        mockStock_percent: 0,
                        common_percent: 0.1,
                    },
                ],
            },
            {
                mockStockName: 'Чашниково',
                percent: 0.06,
                comparePercent: 100,
                percentOrder: 0.05,
                comparePercentOrder: -71.78,
                orderCount: 1,
                orderAmount: 936,
                saleCount: 1,
                saleAmount: 725.4,
                saleDetails: [
                    {
                        district: 'Центральный федеральный округ',
                        amount: 725.4,
                        mockStock_percent: 100,
                        common_percent: 0.1,
                    },
                ],
                orderDetails: [
                    {
                        district: 'Центральный федеральный округ',
                        amount: 725.4,
                        mockStock_percent: 77.5,
                        common_percent: 0,
                    },
                ],
            },
            {
                mockStockName: 'Астана Карагандинское шоссе',
                percent: 0,
                comparePercent: 100,
                percentOrder: 0.08,
                comparePercentOrder: -28.54,
                orderCount: 1,
                orderAmount: 1421,
                saleCount: 0,
                saleAmount: 0,
                saleDetails: [],
                orderDetails: [],
            },
            {
                mockStockName: 'Волгоград',
                percent: 0,
                comparePercent: 100,
                percentOrder: 0.09,
                comparePercentOrder: 100,
                orderCount: 1,
                orderAmount: 1505,
                saleCount: 0,
                saleAmount: 0,
                saleDetails: [],
                orderDetails: [],
            },
            {
                mockStockName: 'Виртуальный Грозный',
                percent: 0,
                comparePercent: 100,
                percentOrder: 0.05,
                comparePercentOrder: 100,
                orderCount: 1,
                orderAmount: 936,
                saleCount: 0,
                saleAmount: 0,
                saleDetails: [],
                orderDetails: [],
            },
        ],
        "geo_data": [
            {
                districtName: 'Центральный федеральный округ',
                percent: 27,
                comparePercent: -28.88,
                percentOrder: 25,
                comparePercentOrder: -24.32,
                orderCount: 252,
                orderAmount: 433970,
                saleCount: 199,
                saleAmount: 318812,
            },
            {
                districtName: 'Южный федеральный округ',
                percent: 16,
                comparePercent: 9.85,
                percentOrder: 18,
                comparePercentOrder: 29,
                orderCount: 187,
                orderAmount: 309199,
                saleCount: 129,
                saleAmount: 199896,
            },
            {
                districtName: 'Северо-Кавказский федеральный округ',
                percent: 15,
                comparePercent: 58,
                percentOrder: 15,
                comparePercentOrder: 1.57,
                orderCount: 163,
                orderAmount: 270487,
                saleCount: 114,
                saleAmount: 177157,
            },
            {
                districtName: 'Приволжский федеральный округ',
                percent: 11,
                comparePercent: -4.19,
                percentOrder: 11,
                comparePercentOrder: 31,
                orderCount: 131,
                orderAmount: 197080,
                saleCount: 98,
                saleAmount: 135145,
            },
            {
                districtName: 'Уральский федеральный округ',
                percent: 8.85,
                comparePercent: 39,
                percentOrder: 9.27,
                comparePercentOrder: 14,
                orderCount: 102,
                orderAmount: 158717,
                saleCount: 70,
                saleAmount: 104443,
            },
            {
                districtName: 'Сибирский федеральный округ',
                percent: 8.21,
                comparePercent: 35,
                percentOrder: 7.62,
                comparePercentOrder: 32,
                orderCount: 72,
                orderAmount: 130455,
                saleCount: 61,
                saleAmount: 96887,
            },
            {
                districtName: 'Северо-Западный федеральный округ',
                percent: 6.12,
                comparePercent: -23.54,
                percentOrder: 5.75,
                comparePercentOrder: -14.62,
                orderCount: 56,
                orderAmount: 98550,
                saleCount: 41,
                saleAmount: 72226,
            },
            {
                districtName: 'Дальневосточный федеральный округ',
                percent: 3.95,
                comparePercent: 20,
                percentOrder: 4.15,
                comparePercentOrder: -17.5,
                orderCount: 38,
                orderAmount: 71092,
                saleCount: 25,
                saleAmount: 46572,
            },
            {
                districtName: 'Другой округ',
                percent: 2.42,
                comparePercent: 63,
                percentOrder: 2.51,
                comparePercentOrder: -4.95,
                orderCount: 41,
                orderAmount: 42933.18,
                saleCount: 30,
                saleAmount: 28530.54,
            },
        ],
    },
    14: {
        "stock_data": [
            {
                "stockName": "Электросталь",
                "percent": 35.85,
                "comparePercent": -35.76,
                "percentOrder": 52,
                "comparePercentOrder": 9.92,
                "orderCount": 146,
                "orderAmount": 409513.96,
                "saleCount": 28,
                "saleAmount": 51869.41,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 20511.07,
                        "stock_percent": 39.5,
                        "common_percent": 14.2
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 14871.41,
                        "stock_percent": 28.7,
                        "common_percent": 10.3
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 10008.28,
                        "stock_percent": 19.3,
                        "common_percent": 6.9
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 3.8,
                        "common_percent": 1.4
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 3.8,
                        "common_percent": 1.4
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1302.37,
                        "stock_percent": 2.5,
                        "common_percent": 0.9
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1250.28,
                        "stock_percent": 2.4,
                        "common_percent": 0.9
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 20511.07,
                        "stock_percent": 5,
                        "common_percent": 2.6
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 14871.41,
                        "stock_percent": 3.6,
                        "common_percent": 1.9
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 10008.28,
                        "stock_percent": 2.4,
                        "common_percent": 1.3
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 0.5,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 0.5,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1302.37,
                        "stock_percent": 0.3,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1250.28,
                        "stock_percent": 0.3,
                        "common_percent": 0.2
                    }
                ]
            },
            {
                "stockName": "Тула",
                "percent": 15.43,
                "comparePercent": 7.82,
                "percentOrder": 22,
                "comparePercentOrder": 22,
                "orderCount": 61,
                "orderAmount": 178569.92,
                "saleCount": 10,
                "saleAmount": 22321.57,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 17489.57,
                        "stock_percent": 78.4,
                        "common_percent": 12.1
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2416,
                        "stock_percent": 10.8,
                        "common_percent": 1.7
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 2416,
                        "stock_percent": 10.8,
                        "common_percent": 1.7
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 17489.57,
                        "stock_percent": 9.8,
                        "common_percent": 2.2
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2416,
                        "stock_percent": 1.4,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 2416,
                        "stock_percent": 1.4,
                        "common_percent": 0.3
                    }
                ]
            },
            {
                "stockName": "Коледино",
                "percent": 14.88,
                "comparePercent": 100,
                "percentOrder": 21,
                "comparePercentOrder": 18,
                "orderCount": 55,
                "orderAmount": 170934.21,
                "saleCount": 13,
                "saleAmount": 21526.65,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 7894.28,
                        "stock_percent": 36.7,
                        "common_percent": 5.5
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 6342,
                        "stock_percent": 29.5,
                        "common_percent": 4.4
                    },
                    {
                        "district": "Другой округ",
                        "amount": 3775.09,
                        "stock_percent": 17.5,
                        "common_percent": 2.6
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2265,
                        "stock_percent": 10.5,
                        "common_percent": 1.6
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1250.28,
                        "stock_percent": 5.8,
                        "common_percent": 0.9
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 7894.28,
                        "stock_percent": 4.6,
                        "common_percent": 1
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 6342,
                        "stock_percent": 3.7,
                        "common_percent": 0.8
                    },
                    {
                        "district": "Другой округ",
                        "amount": 3775.09,
                        "stock_percent": 2.2,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2265,
                        "stock_percent": 1.3,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1250.28,
                        "stock_percent": 0.7,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Казань",
                "percent": 11.08,
                "comparePercent": -29.07,
                "percentOrder": 9.27,
                "comparePercentOrder": -30.65,
                "orderCount": 24,
                "orderAmount": 72093.44,
                "saleCount": 6,
                "saleAmount": 16027.89,
                "saleDetails": [
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 7324.25,
                        "stock_percent": 45.7,
                        "common_percent": 5.1
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 4098.14,
                        "stock_percent": 25.6,
                        "common_percent": 2.8
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 2340.5,
                        "stock_percent": 14.6,
                        "common_percent": 1.6
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2265,
                        "stock_percent": 14.1,
                        "common_percent": 1.6
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 7324.25,
                        "stock_percent": 10.2,
                        "common_percent": 0.9
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 4098.14,
                        "stock_percent": 5.7,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 2340.5,
                        "stock_percent": 3.2,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2265,
                        "stock_percent": 3.1,
                        "common_percent": 0.3
                    }
                ]
            },
            {
                "stockName": "Краснодар",
                "percent": 8.23,
                "comparePercent": 456.32,
                "percentOrder": 8.59,
                "comparePercentOrder": -13.72,
                "orderCount": 25,
                "orderAmount": 66796,
                "saleCount": 6,
                "saleAmount": 11906.34,
                "saleDetails": [
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 4835.77,
                        "stock_percent": 40.6,
                        "common_percent": 3.3
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 2797.27,
                        "stock_percent": 23.5,
                        "common_percent": 1.9
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2310.3,
                        "stock_percent": 19.4,
                        "common_percent": 1.6
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 16.5,
                        "common_percent": 1.4
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 4835.77,
                        "stock_percent": 7.2,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 2797.27,
                        "stock_percent": 4.2,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2310.3,
                        "stock_percent": 3.5,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 2.9,
                        "common_percent": 0.3
                    }
                ]
            },
            {
                "stockName": "Новосибирск",
                "percent": 5.58,
                "comparePercent": 100,
                "percentOrder": 2.79,
                "comparePercentOrder": 100,
                "orderCount": 5,
                "orderAmount": 21667,
                "saleCount": 2,
                "saleAmount": 8069.43,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 4665.14,
                        "stock_percent": 57.8,
                        "common_percent": 3.2
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 3404.29,
                        "stock_percent": 42.2,
                        "common_percent": 2.4
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 4665.14,
                        "stock_percent": 21.5,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 3404.29,
                        "stock_percent": 15.7,
                        "common_percent": 0.4
                    }
                ]
            },
            {
                "stockName": "Подольск",
                "percent": 4.17,
                "comparePercent": 100,
                "percentOrder": 4.98,
                "comparePercentOrder": -41.94,
                "orderCount": 13,
                "orderAmount": 38688.98,
                "saleCount": 3,
                "saleAmount": 6040.03,
                "saleDetails": [
                    {
                        "district": "Другой округ",
                        "amount": 2038.53,
                        "stock_percent": 33.8,
                        "common_percent": 1.4
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2038.5,
                        "stock_percent": 33.7,
                        "common_percent": 1.4
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 32.5,
                        "common_percent": 1.4
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Другой округ",
                        "amount": 2038.53,
                        "stock_percent": 5.3,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2038.5,
                        "stock_percent": 5.3,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 5.1,
                        "common_percent": 0.3
                    }
                ]
            },
            {
                "stockName": "Рязань (Тюшевское)",
                "percent": 3.13,
                "comparePercent": 100,
                "percentOrder": 1.73,
                "comparePercentOrder": -40.07,
                "orderCount": 5,
                "orderAmount": 13428,
                "saleCount": 2,
                "saleAmount": 4533.77,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 4533.77,
                        "stock_percent": 100,
                        "common_percent": 3.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 4533.77,
                        "stock_percent": 33.8,
                        "common_percent": 0.6
                    }
                ]
            },
            {
                "stockName": "Невинномысск",
                "percent": 2.27,
                "comparePercent": 100,
                "percentOrder": 4.25,
                "comparePercentOrder": 49,
                "orderCount": 9,
                "orderAmount": 33086.5,
                "saleCount": 1,
                "saleAmount": 3278.21,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 3278.21,
                        "stock_percent": 100,
                        "common_percent": 2.3
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 3278.21,
                        "stock_percent": 9.9,
                        "common_percent": 0.4
                    }
                ]
            },
            {
                "stockName": "Екатеринбург - Испытателей 14г",
                "percent": 1.39,
                "comparePercent": -84.89,
                "percentOrder": 0.34,
                "comparePercentOrder": -76.46,
                "orderCount": 1,
                "orderAmount": 2660,
                "saleCount": 1,
                "saleAmount": 2008.3,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2008.3,
                        "stock_percent": 100,
                        "common_percent": 1.4
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2008.3,
                        "stock_percent": 75.5,
                        "common_percent": 0.3
                    }
                ]
            },
            {
                "stockName": "Владимир",
                "percent": 1.36,
                "comparePercent": 100,
                "percentOrder": 0.33,
                "comparePercentOrder": 100,
                "orderCount": 1,
                "orderAmount": 2600,
                "saleCount": 1,
                "saleAmount": 1963,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 100,
                        "common_percent": 1.4
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 75.5,
                        "common_percent": 0.3
                    }
                ]
            },
            {
                "stockName": "Санкт-Петербург Уткина Заводь",
                "percent": 1.36,
                "comparePercent": -80.61,
                "percentOrder": 2.78,
                "comparePercentOrder": 35,
                "orderCount": 6,
                "orderAmount": 21637.87,
                "saleCount": 1,
                "saleAmount": 1963,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 100,
                        "common_percent": 1.4
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 9.1,
                        "common_percent": 0.3
                    }
                ]
            },
            {
                "stockName": "Самара (Новосемейкино)",
                "percent": 1.36,
                "comparePercent": 100,
                "percentOrder": 2,
                "comparePercentOrder": 341,
                "orderCount": 6,
                "orderAmount": 15584,
                "saleCount": 1,
                "saleAmount": 1963,
                "saleDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 100,
                        "common_percent": 1.4
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 12.6,
                        "common_percent": 0.3
                    }
                ]
            },
            {
                "stockName": "Чашниково",
                "percent": 0,
                "comparePercent": 100,
                "percentOrder": 1.35,
                "comparePercentOrder": 100,
                "orderCount": 4,
                "orderAmount": 10522,
                "saleCount": 0,
                "saleAmount": 0,
                "saleDetails": [],
                "orderDetails": []
            },
            {
                "stockName": "Котовск",
                "percent": 0,
                "comparePercent": -100,
                "percentOrder": 0.62,
                "comparePercentOrder": 31,
                "orderCount": 2,
                "orderAmount": 4800,
                "saleCount": 0,
                "saleAmount": 0,
                "saleDetails": [],
                "orderDetails": []
            },
            {
                "stockName": "Астана Карагандинское шоссе",
                "percent": 0,
                "comparePercent": 100,
                "percentOrder": 0.33,
                "comparePercentOrder": 100,
                "orderCount": 1,
                "orderAmount": 2600,
                "saleCount": 0,
                "saleAmount": 0,
                "saleDetails": [],
                "orderDetails": []
            },
            {
                "stockName": "Белая дача",
                "percent": 0,
                "comparePercent": 100,
                "percentOrder": 1.15,
                "comparePercentOrder": 100,
                "orderCount": 3,
                "orderAmount": 8925,
                "saleCount": 0,
                "saleAmount": 0,
                "saleDetails": [],
                "orderDetails": []
            },
            {
                "stockName": "СЦ Адыгея",
                "percent": 0,
                "comparePercent": 100,
                "percentOrder": 0.21,
                "comparePercentOrder": 100,
                "orderCount": 1,
                "orderAmount": 1656,
                "saleCount": 0,
                "saleAmount": 0,
                "saleDetails": [],
                "orderDetails": []
            },
            {
                "stockName": "Атакент",
                "percent": 0,
                "comparePercent": 100,
                "percentOrder": 0.17,
                "comparePercentOrder": 100,
                "orderCount": 1,
                "orderAmount": 1311,
                "saleCount": 0,
                "saleAmount": 0,
                "saleDetails": [],
                "orderDetails": []
            }
        ],
        "geo_data": [
            {
                "districtName": "Центральный федеральный округ",
                "percent": 38,
                "comparePercent": 96,
                "percentOrder": 33,
                "comparePercentOrder": 30,
                "orderCount": 127,
                "orderAmount": 258700,
                "saleCount": 28,
                "saleAmount": 55190
            },
            {
                "districtName": "Северо-Западный федеральный округ",
                "percent": 21,
                "comparePercent": 156,
                "percentOrder": 15,
                "comparePercentOrder": 94,
                "orderCount": 57,
                "orderAmount": 123636,
                "saleCount": 15,
                "saleAmount": 30794
            },
            {
                "districtName": "Приволжский федеральный округ",
                "percent": 12,
                "comparePercent": 57,
                "percentOrder": 17,
                "comparePercentOrder": -4.81,
                "orderCount": 65,
                "orderAmount": 135760,
                "saleCount": 10,
                "saleAmount": 18438
            },
            {
                "districtName": "Уральский федеральный округ",
                "percent": 9.46,
                "comparePercent": -71.3,
                "percentOrder": 8.96,
                "comparePercentOrder": -41.97,
                "orderCount": 31,
                "orderAmount": 69709,
                "saleCount": 7,
                "saleAmount": 13681
            },
            {
                "districtName": "Сибирский федеральный округ",
                "percent": 5.92,
                "comparePercent": -74.1,
                "percentOrder": 5.65,
                "comparePercentOrder": -58.64,
                "orderCount": 19,
                "orderAmount": 43958,
                "saleCount": 4,
                "saleAmount": 8558
            },
            {
                "districtName": "Дальневосточный федеральный округ",
                "percent": 4.56,
                "comparePercent": -33.62,
                "percentOrder": 2.54,
                "comparePercentOrder": -55.49,
                "orderCount": 9,
                "orderAmount": 19715,
                "saleCount": 3,
                "saleAmount": 6602
            },
            {
                "districtName": "Другой округ",
                "percent": 3.78,
                "comparePercent": 100,
                "percentOrder": 8.62,
                "comparePercentOrder": 136,
                "orderCount": 33,
                "orderAmount": 67020.8,
                "saleCount": 4,
                "saleAmount": 5465.69
            },
            {
                "districtName": "Южный федеральный округ",
                "percent": 2.92,
                "comparePercent": 97,
                "percentOrder": 4.33,
                "comparePercentOrder": -54.28,
                "orderCount": 18,
                "orderAmount": 33680,
                "saleCount": 3,
                "saleAmount": 4230
            },
            {
                "districtName": "Северо-Кавказский федеральный округ",
                "percent": 1.18,
                "comparePercent": 100,
                "percentOrder": 3.27,
                "comparePercentOrder": 100,
                "orderCount": 10,
                "orderAmount": 25437,
                "saleCount": 1,
                "saleAmount": 1714
            }
        ]
    },
    30: {
        "stock_data": [
            {
                "stockName": "Электросталь",
                "percent": 38.08,
                "comparePercent": 15.57,
                "percentOrder": 48,
                "comparePercentOrder": 75,
                "orderCount": 212,
                "orderAmount": 670057.21,
                "saleCount": 46,
                "saleAmount": 100950.42,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 29655.62,
                        "stock_percent": 29.4,
                        "common_percent": 11.2
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 22769.27,
                        "stock_percent": 22.6,
                        "common_percent": 8.6
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 15493.53,
                        "stock_percent": 15.3,
                        "common_percent": 5.8
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 14539.04,
                        "stock_percent": 14.4,
                        "common_percent": 5.5
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 9239.68,
                        "stock_percent": 9.2,
                        "common_percent": 3.5
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 6040,
                        "stock_percent": 6,
                        "common_percent": 2.3
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 1.9,
                        "common_percent": 0.7
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1250.28,
                        "stock_percent": 1.2,
                        "common_percent": 0.5
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 29655.62,
                        "stock_percent": 4.4,
                        "common_percent": 2.1
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 22769.27,
                        "stock_percent": 3.4,
                        "common_percent": 1.6
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 15493.53,
                        "stock_percent": 2.3,
                        "common_percent": 1.1
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 14539.04,
                        "stock_percent": 2.2,
                        "common_percent": 1.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 9239.68,
                        "stock_percent": 1.4,
                        "common_percent": 0.7
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 6040,
                        "stock_percent": 0.9,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 0.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1250.28,
                        "stock_percent": 0.2,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Тула",
                "percent": 16.52,
                "comparePercent": 26.33,
                "percentOrder": 19,
                "comparePercentOrder": 2.25,
                "orderCount": 83,
                "orderAmount": 272223.97,
                "saleCount": 17,
                "saleAmount": 43805.8,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 23864.03,
                        "stock_percent": 54.5,
                        "common_percent": 9
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 6072.46,
                        "stock_percent": 13.9,
                        "common_percent": 2.3
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 5866.35,
                        "stock_percent": 13.4,
                        "common_percent": 2.2
                    },
                    {
                        "district": "Другой округ",
                        "amount": 3019.96,
                        "stock_percent": 6.9,
                        "common_percent": 1.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 2567,
                        "stock_percent": 5.9,
                        "common_percent": 1
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2416,
                        "stock_percent": 5.5,
                        "common_percent": 0.9
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 23864.03,
                        "stock_percent": 8.8,
                        "common_percent": 1.7
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 6072.46,
                        "stock_percent": 2.2,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 5866.35,
                        "stock_percent": 2.2,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Другой округ",
                        "amount": 3019.96,
                        "stock_percent": 1.1,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 2567,
                        "stock_percent": 0.9,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2416,
                        "stock_percent": 0.9,
                        "common_percent": 0.2
                    }
                ]
            },
            {
                "stockName": "Коледино",
                "percent": 12.76,
                "comparePercent": -52.48,
                "percentOrder": 20,
                "comparePercentOrder": -38.36,
                "orderCount": 85,
                "orderAmount": 283859.37,
                "saleCount": 20,
                "saleAmount": 33833.03,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 11140.78,
                        "stock_percent": 32.9,
                        "common_percent": 4.2
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 9362,
                        "stock_percent": 27.7,
                        "common_percent": 3.5
                    },
                    {
                        "district": "Другой округ",
                        "amount": 6794.97,
                        "stock_percent": 20.1,
                        "common_percent": 2.6
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 3020,
                        "stock_percent": 8.9,
                        "common_percent": 1.1
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2265,
                        "stock_percent": 6.7,
                        "common_percent": 0.9
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1250.28,
                        "stock_percent": 3.7,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 11140.78,
                        "stock_percent": 3.9,
                        "common_percent": 0.8
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 9362,
                        "stock_percent": 3.3,
                        "common_percent": 0.7
                    },
                    {
                        "district": "Другой округ",
                        "amount": 6794.97,
                        "stock_percent": 2.4,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 3020,
                        "stock_percent": 1.1,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2265,
                        "stock_percent": 0.8,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1250.28,
                        "stock_percent": 0.4,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Казань",
                "percent": 11.23,
                "comparePercent": 129.17,
                "percentOrder": 11,
                "comparePercentOrder": 18,
                "orderCount": 44,
                "orderAmount": 152753.44,
                "saleCount": 10,
                "saleAmount": 29779.44,
                "saleDetails": [
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 12241.56,
                        "stock_percent": 41.1,
                        "common_percent": 4.6
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 9015.45,
                        "stock_percent": 30.3,
                        "common_percent": 3.4
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 5996.96,
                        "stock_percent": 20.1,
                        "common_percent": 2.3
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2265,
                        "stock_percent": 7.6,
                        "common_percent": 0.9
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 260.47,
                        "stock_percent": 0.9,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 12241.56,
                        "stock_percent": 8,
                        "common_percent": 0.9
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 9015.45,
                        "stock_percent": 5.9,
                        "common_percent": 0.7
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 5996.96,
                        "stock_percent": 3.9,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2265,
                        "stock_percent": 1.5,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 260.47,
                        "stock_percent": 0.2,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Краснодар",
                "percent": 4.98,
                "comparePercent": -32.1,
                "percentOrder": 8.37,
                "comparePercentOrder": -2.01,
                "orderCount": 36,
                "orderAmount": 115572,
                "saleCount": 7,
                "saleAmount": 13208.71,
                "saleDetails": [
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 4835.77,
                        "stock_percent": 36.6,
                        "common_percent": 1.8
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 3265.37,
                        "stock_percent": 24.7,
                        "common_percent": 1.2
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 2797.27,
                        "stock_percent": 21.2,
                        "common_percent": 1.1
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2310.3,
                        "stock_percent": 17.5,
                        "common_percent": 0.9
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 4835.77,
                        "stock_percent": 4.2,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 3265.37,
                        "stock_percent": 2.8,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 2797.27,
                        "stock_percent": 2.4,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2310.3,
                        "stock_percent": 2,
                        "common_percent": 0.2
                    }
                ]
            },
            {
                "stockName": "Подольск",
                "percent": 4.11,
                "comparePercent": -53.94,
                "percentOrder": 10,
                "comparePercentOrder": -53.15,
                "orderCount": 30,
                "orderAmount": 144368.11,
                "saleCount": 7,
                "saleAmount": 10898.45,
                "saleDetails": [
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 4858.42,
                        "stock_percent": 44.6,
                        "common_percent": 1.8
                    },
                    {
                        "district": "Другой округ",
                        "amount": 2038.53,
                        "stock_percent": 18.7,
                        "common_percent": 0.8
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2038.5,
                        "stock_percent": 18.7,
                        "common_percent": 0.8
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 18,
                        "common_percent": 0.7
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 4858.42,
                        "stock_percent": 3.4,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Другой округ",
                        "amount": 2038.53,
                        "stock_percent": 1.4,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2038.5,
                        "stock_percent": 1.4,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 1.4,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Екатеринбург - Испытателей 14г",
                "percent": 3.81,
                "comparePercent": 100,
                "percentOrder": 0.96,
                "comparePercentOrder": 26,
                "orderCount": 3,
                "orderAmount": 13209,
                "saleCount": 3,
                "saleAmount": 10098.88,
                "saleDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 4791.23,
                        "stock_percent": 47.4,
                        "common_percent": 1.8
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 3299.35,
                        "stock_percent": 32.7,
                        "common_percent": 1.2
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2008.3,
                        "stock_percent": 19.9,
                        "common_percent": 0.8
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 4791.23,
                        "stock_percent": 36.3,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 3299.35,
                        "stock_percent": 25,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2008.3,
                        "stock_percent": 15.2,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Санкт-Петербург Уткина Заводь",
                "percent": 3.06,
                "comparePercent": 204.7,
                "percentOrder": 2.9,
                "comparePercentOrder": 85,
                "orderCount": 10,
                "orderAmount": 40041.87,
                "saleCount": 3,
                "saleAmount": 8122.28,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 5619.46,
                        "stock_percent": 69.2,
                        "common_percent": 2.1
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2502.82,
                        "stock_percent": 30.8,
                        "common_percent": 0.9
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 5619.46,
                        "stock_percent": 14,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2502.82,
                        "stock_percent": 6.3,
                        "common_percent": 0.2
                    }
                ]
            },
            {
                "stockName": "Новосибирск",
                "percent": 3.04,
                "comparePercent": 183.5,
                "percentOrder": 1.57,
                "comparePercentOrder": 0.83,
                "orderCount": 5,
                "orderAmount": 21667,
                "saleCount": 2,
                "saleAmount": 8069.43,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 4665.14,
                        "stock_percent": 57.8,
                        "common_percent": 1.8
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 3404.29,
                        "stock_percent": 42.2,
                        "common_percent": 1.3
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 4665.14,
                        "stock_percent": 21.5,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 3404.29,
                        "stock_percent": 15.7,
                        "common_percent": 0.2
                    }
                ]
            },
            {
                "stockName": "Рязань (Тюшевское)",
                "percent": 1.71,
                "comparePercent": 101.01,
                "percentOrder": 2.33,
                "comparePercentOrder": 97,
                "orderCount": 9,
                "orderAmount": 32194,
                "saleCount": 2,
                "saleAmount": 4533.77,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 4533.77,
                        "stock_percent": 100,
                        "common_percent": 1.7
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 4533.77,
                        "stock_percent": 14.1,
                        "common_percent": 0.3
                    }
                ]
            },
            {
                "stockName": "Невинномысск",
                "percent": 1.24,
                "comparePercent": 166.81,
                "percentOrder": 3.42,
                "comparePercentOrder": 83,
                "orderCount": 12,
                "orderAmount": 47210.5,
                "saleCount": 1,
                "saleAmount": 3278.21,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 3278.21,
                        "stock_percent": 100,
                        "common_percent": 1.2
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 3278.21,
                        "stock_percent": 6.9,
                        "common_percent": 0.2
                    }
                ]
            },
            {
                "stockName": "Владимир",
                "percent": 0.74,
                "comparePercent": 100,
                "percentOrder": 0.19,
                "comparePercentOrder": -13.1,
                "orderCount": 1,
                "orderAmount": 2600,
                "saleCount": 1,
                "saleAmount": 1963,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 100,
                        "common_percent": 0.7
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 75.5,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Самара (Новосемейкино)",
                "percent": 0.74,
                "comparePercent": 100,
                "percentOrder": 1.27,
                "comparePercentOrder": 217,
                "orderCount": 7,
                "orderAmount": 17516,
                "saleCount": 1,
                "saleAmount": 1963,
                "saleDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 100,
                        "common_percent": 0.7
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 11.2,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Чашниково",
                "percent": 0.57,
                "comparePercent": -68.21,
                "percentOrder": 0.91,
                "comparePercentOrder": -2.6,
                "orderCount": 5,
                "orderAmount": 12523,
                "saleCount": 1,
                "saleAmount": 1510.75,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 1510.75,
                        "stock_percent": 100,
                        "common_percent": 0.6
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 1510.75,
                        "stock_percent": 12.1,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Котовск",
                "percent": 0.57,
                "comparePercent": -18.14,
                "percentOrder": 0.49,
                "comparePercentOrder": -44.88,
                "orderCount": 3,
                "orderAmount": 6801,
                "saleCount": 1,
                "saleAmount": 1510.75,
                "saleDetails": [
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1510.75,
                        "stock_percent": 100,
                        "common_percent": 0.6
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1510.75,
                        "stock_percent": 22.2,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Астана Карагандинское шоссе",
                "percent": 0,
                "comparePercent": 100,
                "percentOrder": 0.19,
                "comparePercentOrder": 7.32,
                "orderCount": 1,
                "orderAmount": 2600,
                "saleCount": 0,
                "saleAmount": 0,
                "saleDetails": [],
                "orderDetails": []
            },
            {
                "stockName": "Белая дача",
                "percent": 0,
                "comparePercent": 100,
                "percentOrder": 0.65,
                "comparePercentOrder": 59,
                "orderCount": 3,
                "orderAmount": 8925,
                "saleCount": 0,
                "saleAmount": 0,
                "saleDetails": [],
                "orderDetails": []
            },
            {
                "stockName": "СЦ Адыгея",
                "percent": 0,
                "comparePercent": 100,
                "percentOrder": 0.12,
                "comparePercentOrder": 100,
                "orderCount": 1,
                "orderAmount": 1656,
                "saleCount": 0,
                "saleAmount": 0,
                "saleDetails": [],
                "orderDetails": []
            },
            {
                "stockName": "Волгоград",
                "percent": 0,
                "comparePercent": -100,
                "percentOrder": 0.35,
                "comparePercentOrder": 66,
                "orderCount": 1,
                "orderAmount": 4843,
                "saleCount": 0,
                "saleAmount": 0,
                "saleDetails": [],
                "orderDetails": []
            },
            {
                "stockName": "Атакент",
                "percent": 0,
                "comparePercent": 100,
                "percentOrder": 0.09,
                "comparePercentOrder": 100,
                "orderCount": 1,
                "orderAmount": 1311,
                "saleCount": 0,
                "saleAmount": 0,
                "saleDetails": [],
                "orderDetails": []
            }
        ],
        "geo_data": [
            {
                "districtName": "Центральный федеральный округ",
                "percent": 29,
                "comparePercent": -8.77,
                "percentOrder": 30,
                "comparePercentOrder": -5.91,
                "orderCount": 180,
                "orderAmount": 423113,
                "saleCount": 39,
                "saleAmount": 77038
            },
            {
                "districtName": "Северо-Западный федеральный округ",
                "percent": 17,
                "comparePercent": 30,
                "percentOrder": 13,
                "comparePercentOrder": -10.82,
                "orderCount": 79,
                "orderAmount": 188515,
                "saleCount": 23,
                "saleAmount": 45541
            },
            {
                "districtName": "Уральский федеральный округ",
                "percent": 16,
                "comparePercent": 137,
                "percentOrder": 11,
                "comparePercentOrder": 24,
                "orderCount": 54,
                "orderAmount": 153375,
                "saleCount": 16,
                "saleAmount": 44176
            },
            {
                "districtName": "Сибирский федеральный округ",
                "percent": 12,
                "comparePercent": 36,
                "percentOrder": 8.6,
                "comparePercentOrder": 6.94,
                "orderCount": 41,
                "orderAmount": 118769,
                "saleCount": 12,
                "saleAmount": 33493
            },
            {
                "districtName": "Приволжский федеральный округ",
                "percent": 12,
                "comparePercent": -39.39,
                "percentOrder": 16,
                "comparePercentOrder": -9.97,
                "orderCount": 93,
                "orderAmount": 226024,
                "saleCount": 16,
                "saleAmount": 33313
            },
            {
                "districtName": "Дальневосточный федеральный округ",
                "percent": 4.77,
                "comparePercent": -6.25,
                "percentOrder": 4.31,
                "comparePercentOrder": 40,
                "orderCount": 21,
                "orderAmount": 59463,
                "saleCount": 5,
                "saleAmount": 12654
            },
            {
                "districtName": "Другой округ",
                "percent": 4.39,
                "comparePercent": 55,
                "percentOrder": 6.2,
                "comparePercentOrder": 111,
                "orderCount": 38,
                "orderAmount": 85611.51,
                "saleCount": 6,
                "saleAmount": 11625.48
            },
            {
                "districtName": "Южный федеральный округ",
                "percent": 2.09,
                "comparePercent": -76.11,
                "percentOrder": 5.82,
                "comparePercentOrder": -41.43,
                "orderCount": 32,
                "orderAmount": 80343,
                "saleCount": 4,
                "saleAmount": 5534
            },
            {
                "districtName": "Северо-Кавказский федеральный округ",
                "percent": 0.65,
                "comparePercent": -51.6,
                "percentOrder": 3.27,
                "comparePercentOrder": 218,
                "orderCount": 14,
                "orderAmount": 45182,
                "saleCount": 1,
                "saleAmount": 1714
            }
        ]
    },
    90: {
        "stock_data": [
            {
                "stockName": "Электросталь",
                "percent": 33.65,
                "comparePercent": -9.54,
                "percentOrder": 36,
                "comparePercentOrder": -26.35,
                "orderCount": 575,
                "orderAmount": 1882702.97,
                "saleCount": 170,
                "saleAmount": 322935.06,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 93038.07,
                        "stock_percent": 28.8,
                        "common_percent": 9.7
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 81982.61,
                        "stock_percent": 25.4,
                        "common_percent": 8.5
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 46083.49,
                        "stock_percent": 14.3,
                        "common_percent": 4.8
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 37298.47,
                        "stock_percent": 11.5,
                        "common_percent": 3.9
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 25806.25,
                        "stock_percent": 8,
                        "common_percent": 2.7
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 12854.63,
                        "stock_percent": 4,
                        "common_percent": 1.3
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 11321.22,
                        "stock_percent": 3.5,
                        "common_percent": 1.2
                    },
                    {
                        "district": "Другой округ",
                        "amount": 11076.57,
                        "stock_percent": 3.4,
                        "common_percent": 1.2
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 3473.75,
                        "stock_percent": 1.1,
                        "common_percent": 0.4
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 93038.07,
                        "stock_percent": 4.9,
                        "common_percent": 1.8
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 81982.61,
                        "stock_percent": 4.4,
                        "common_percent": 1.6
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 46083.49,
                        "stock_percent": 2.4,
                        "common_percent": 0.9
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 37298.47,
                        "stock_percent": 2,
                        "common_percent": 0.7
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 25806.25,
                        "stock_percent": 1.4,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 12854.63,
                        "stock_percent": 0.7,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 11321.22,
                        "stock_percent": 0.6,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Другой округ",
                        "amount": 11076.57,
                        "stock_percent": 0.6,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 3473.75,
                        "stock_percent": 0.2,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Коледино",
                "percent": 26.92,
                "comparePercent": 60.07,
                "percentOrder": 37,
                "comparePercentOrder": 65,
                "orderCount": 534,
                "orderAmount": 1934276.32,
                "saleCount": 135,
                "saleAmount": 258296.98,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 104329.74,
                        "stock_percent": 40.4,
                        "common_percent": 10.9
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 39362.82,
                        "stock_percent": 15.2,
                        "common_percent": 4.1
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 39327.18,
                        "stock_percent": 15.2,
                        "common_percent": 4.1
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 31044.05,
                        "stock_percent": 12,
                        "common_percent": 3.2
                    },
                    {
                        "district": "Другой округ",
                        "amount": 21574.42,
                        "stock_percent": 8.4,
                        "common_percent": 2.2
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 6553.4,
                        "stock_percent": 2.5,
                        "common_percent": 0.7
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 5870.11,
                        "stock_percent": 2.3,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 5647.39,
                        "stock_percent": 2.2,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 4587.87,
                        "stock_percent": 1.8,
                        "common_percent": 0.5
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 104329.74,
                        "stock_percent": 5.4,
                        "common_percent": 2
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 39362.82,
                        "stock_percent": 2,
                        "common_percent": 0.8
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 39327.18,
                        "stock_percent": 2,
                        "common_percent": 0.8
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 31044.05,
                        "stock_percent": 1.6,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Другой округ",
                        "amount": 21574.42,
                        "stock_percent": 1.1,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 6553.4,
                        "stock_percent": 0.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 5870.11,
                        "stock_percent": 0.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 5647.39,
                        "stock_percent": 0.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 4587.87,
                        "stock_percent": 0.2,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Тула",
                "percent": 14.21,
                "comparePercent": 11.29,
                "percentOrder": 17,
                "comparePercentOrder": 10,
                "orderCount": 261,
                "orderAmount": 890433.74,
                "saleCount": 75,
                "saleAmount": 136344.82,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 67407.21,
                        "stock_percent": 49.4,
                        "common_percent": 7
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 22902.46,
                        "stock_percent": 16.8,
                        "common_percent": 2.4
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 10307.26,
                        "stock_percent": 7.6,
                        "common_percent": 1.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 8971.21,
                        "stock_percent": 6.6,
                        "common_percent": 0.9
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 7765.17,
                        "stock_percent": 5.7,
                        "common_percent": 0.8
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 5719.12,
                        "stock_percent": 4.2,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Другой округ",
                        "amount": 5587.1,
                        "stock_percent": 4.1,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 4197.2,
                        "stock_percent": 3.1,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 3488.09,
                        "stock_percent": 2.6,
                        "common_percent": 0.4
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 67407.21,
                        "stock_percent": 7.6,
                        "common_percent": 1.3
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 22902.46,
                        "stock_percent": 2.6,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 10307.26,
                        "stock_percent": 1.2,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 8971.21,
                        "stock_percent": 1,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 7765.17,
                        "stock_percent": 0.9,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 5719.12,
                        "stock_percent": 0.6,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Другой округ",
                        "amount": 5587.1,
                        "stock_percent": 0.6,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 4197.2,
                        "stock_percent": 0.5,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 3488.09,
                        "stock_percent": 0.4,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Казань",
                "percent": 7.22,
                "comparePercent": -41.93,
                "percentOrder": 8.51,
                "comparePercentOrder": -44.53,
                "orderCount": 131,
                "orderAmount": 434116.04,
                "saleCount": 37,
                "saleAmount": 69260.18,
                "saleDetails": [
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 26485.37,
                        "stock_percent": 38.2,
                        "common_percent": 2.8
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 14890.22,
                        "stock_percent": 21.5,
                        "common_percent": 1.6
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 9015.45,
                        "stock_percent": 13,
                        "common_percent": 0.9
                    },
                    {
                        "district": "Другой округ",
                        "amount": 5654.42,
                        "stock_percent": 8.2,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 4766.29,
                        "stock_percent": 6.9,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 2631.16,
                        "stock_percent": 3.8,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 2525.47,
                        "stock_percent": 3.6,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2265,
                        "stock_percent": 3.3,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 1.5,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 26485.37,
                        "stock_percent": 6.1,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 14890.22,
                        "stock_percent": 3.4,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 9015.45,
                        "stock_percent": 2.1,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Другой округ",
                        "amount": 5654.42,
                        "stock_percent": 1.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 4766.29,
                        "stock_percent": 1.1,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 2631.16,
                        "stock_percent": 0.6,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 2525.47,
                        "stock_percent": 0.6,
                        "common_percent": 0
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2265,
                        "stock_percent": 0.5,
                        "common_percent": 0
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 0.2,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Краснодар",
                "percent": 6.37,
                "comparePercent": -24.53,
                "percentOrder": 7.31,
                "comparePercentOrder": -25.68,
                "orderCount": 117,
                "orderAmount": 372952.7,
                "saleCount": 40,
                "saleAmount": 61083.51,
                "saleDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 24924.48,
                        "stock_percent": 40.8,
                        "common_percent": 2.6
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 10055.99,
                        "stock_percent": 16.5,
                        "common_percent": 1
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 6761.02,
                        "stock_percent": 11.1,
                        "common_percent": 0.7
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 6236.71,
                        "stock_percent": 10.2,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 5879.93,
                        "stock_percent": 9.6,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 2797.27,
                        "stock_percent": 4.6,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 2631.17,
                        "stock_percent": 4.3,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 1.6,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Другой округ",
                        "amount": 834.32,
                        "stock_percent": 1.4,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 24924.48,
                        "stock_percent": 6.7,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 10055.99,
                        "stock_percent": 2.7,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 6761.02,
                        "stock_percent": 1.8,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 6236.71,
                        "stock_percent": 1.7,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 5879.93,
                        "stock_percent": 1.6,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 2797.27,
                        "stock_percent": 0.8,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 2631.17,
                        "stock_percent": 0.7,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 0.3,
                        "common_percent": 0
                    },
                    {
                        "district": "Другой округ",
                        "amount": 834.32,
                        "stock_percent": 0.2,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Подольск",
                "percent": 4.59,
                "comparePercent": 1426.51,
                "percentOrder": 12,
                "comparePercentOrder": 1942,
                "orderCount": 111,
                "orderAmount": 654987.09,
                "saleCount": 14,
                "saleAmount": 44002.18,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 11873.13,
                        "stock_percent": 27,
                        "common_percent": 1.2
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 10162.3,
                        "stock_percent": 23.1,
                        "common_percent": 1.1
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 10086.8,
                        "stock_percent": 22.9,
                        "common_percent": 1.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 9841.42,
                        "stock_percent": 22.4,
                        "common_percent": 1
                    },
                    {
                        "district": "Другой округ",
                        "amount": 2038.53,
                        "stock_percent": 4.6,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 11873.13,
                        "stock_percent": 1.8,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 10162.3,
                        "stock_percent": 1.6,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 10086.8,
                        "stock_percent": 1.5,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 9841.42,
                        "stock_percent": 1.5,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Другой округ",
                        "amount": 2038.53,
                        "stock_percent": 0.3,
                        "common_percent": 0
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Екатеринбург - Испытателей 14г",
                "percent": 1.45,
                "comparePercent": -36.1,
                "percentOrder": 0.9,
                "comparePercentOrder": -63.99,
                "orderCount": 16,
                "orderAmount": 46017.55,
                "saleCount": 7,
                "saleAmount": 13949.37,
                "saleDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 4791.23,
                        "stock_percent": 34.3,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 4326.15,
                        "stock_percent": 31,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2906.75,
                        "stock_percent": 20.8,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 6.9,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 6.9,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 4791.23,
                        "stock_percent": 10.4,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 4326.15,
                        "stock_percent": 9.4,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2906.75,
                        "stock_percent": 6.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 2.1,
                        "common_percent": 0
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 2.1,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Новосибирск",
                "percent": 1.26,
                "comparePercent": 127.49,
                "percentOrder": 1.26,
                "comparePercentOrder": 65,
                "orderCount": 17,
                "orderAmount": 64063.3,
                "saleCount": 4,
                "saleAmount": 12052.05,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 4665.14,
                        "stock_percent": 38.7,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 3404.29,
                        "stock_percent": 28.2,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 3020,
                        "stock_percent": 25.1,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 8,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 4665.14,
                        "stock_percent": 7.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 3404.29,
                        "stock_percent": 5.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 3020,
                        "stock_percent": 4.7,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 1.5,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Невинномысск",
                "percent": 1.25,
                "comparePercent": -19.98,
                "percentOrder": 2.17,
                "comparePercentOrder": -4.3,
                "orderCount": 34,
                "orderAmount": 110923.97,
                "saleCount": 9,
                "saleAmount": 11992.53,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 3278.21,
                        "stock_percent": 27.3,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 3080.4,
                        "stock_percent": 25.7,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 2681.75,
                        "stock_percent": 22.4,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Другой округ",
                        "amount": 1026.83,
                        "stock_percent": 8.6,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 962.72,
                        "stock_percent": 8,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 8,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 3278.21,
                        "stock_percent": 3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 3080.4,
                        "stock_percent": 2.8,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 2681.75,
                        "stock_percent": 2.4,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Другой округ",
                        "amount": 1026.83,
                        "stock_percent": 0.9,
                        "common_percent": 0
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 962.72,
                        "stock_percent": 0.9,
                        "common_percent": 0
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 0.9,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Санкт-Петербург Уткина Заводь",
                "percent": 1.13,
                "comparePercent": -45.91,
                "percentOrder": 1.65,
                "comparePercentOrder": -43.35,
                "orderCount": 22,
                "orderAmount": 84110.17,
                "saleCount": 6,
                "saleAmount": 10825.93,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 6952.79,
                        "stock_percent": 64.2,
                        "common_percent": 0.7
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2502.82,
                        "stock_percent": 23.1,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1370.32,
                        "stock_percent": 12.7,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 6952.79,
                        "stock_percent": 8.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2502.82,
                        "stock_percent": 3,
                        "common_percent": 0
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1370.32,
                        "stock_percent": 1.6,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Чашниково",
                "percent": 0.95,
                "comparePercent": 202.23,
                "percentOrder": 0.86,
                "comparePercentOrder": 33,
                "orderCount": 16,
                "orderAmount": 43813.6,
                "saleCount": 5,
                "saleAmount": 9121.68,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 4541.25,
                        "stock_percent": 49.8,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 3617.81,
                        "stock_percent": 39.7,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 10.6,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 4541.25,
                        "stock_percent": 10.4,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 3617.81,
                        "stock_percent": 8.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 2.2,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Рязань (Тюшевское)",
                "percent": 0.91,
                "comparePercent": -56.91,
                "percentOrder": 1.24,
                "comparePercentOrder": -53.67,
                "orderCount": 17,
                "orderAmount": 63087,
                "saleCount": 4,
                "saleAmount": 8716.47,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 4533.77,
                        "stock_percent": 52,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 3155.9,
                        "stock_percent": 36.2,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 11.8,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 4533.77,
                        "stock_percent": 7.2,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 3155.9,
                        "stock_percent": 5,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 1.6,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Котовск",
                "percent": 0.72,
                "comparePercent": -19.79,
                "percentOrder": 0.79,
                "comparePercentOrder": -14.46,
                "orderCount": 14,
                "orderAmount": 40047,
                "saleCount": 6,
                "saleAmount": 6916.54,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2582.1,
                        "stock_percent": 37.3,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1861.07,
                        "stock_percent": 26.9,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1510.75,
                        "stock_percent": 21.8,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 13.9,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2582.1,
                        "stock_percent": 6.4,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1861.07,
                        "stock_percent": 4.6,
                        "common_percent": 0
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1510.75,
                        "stock_percent": 3.8,
                        "common_percent": 0
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 2.4,
                        "common_percent": 0
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Волгоград",
                "percent": 0.33,
                "comparePercent": 100,
                "percentOrder": 0.24,
                "comparePercentOrder": 100,
                "orderCount": 4,
                "orderAmount": 12184.8,
                "saleCount": 1,
                "saleAmount": 3155.9,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 3155.9,
                        "stock_percent": 100,
                        "common_percent": 0.3
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 3155.9,
                        "stock_percent": 25.9,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Владимир",
                "percent": 0.28,
                "comparePercent": -53.24,
                "percentOrder": 0.24,
                "comparePercentOrder": -67.19,
                "orderCount": 5,
                "orderAmount": 12432.61,
                "saleCount": 2,
                "saleAmount": 2704.83,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 72.6,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1768.63,
                        "stock_percent": 65.4,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": -1026.8,
                        "stock_percent": -38,
                        "common_percent": -0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 15.8,
                        "common_percent": 0
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1768.63,
                        "stock_percent": 14.2,
                        "common_percent": 0
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": -1026.8,
                        "stock_percent": -8.3,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Самара (Новосемейкино)",
                "percent": 0.2,
                "comparePercent": 100,
                "percentOrder": 0.52,
                "comparePercentOrder": 100,
                "orderCount": 9,
                "orderAmount": 26636,
                "saleCount": 1,
                "saleAmount": 1963,
                "saleDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 100,
                        "common_percent": 0.2
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 7.4,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Белая дача",
                "percent": 0.11,
                "comparePercent": -36.14,
                "percentOrder": 0.38,
                "comparePercentOrder": 85,
                "orderCount": 6,
                "orderAmount": 19525,
                "saleCount": 1,
                "saleAmount": 1026.8,
                "saleDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 100,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 5.3,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Атакент",
                "percent": 0.04,
                "comparePercent": 11.27,
                "percentOrder": 0.04,
                "comparePercentOrder": 112,
                "orderCount": 2,
                "orderAmount": 1806,
                "saleCount": 1,
                "saleAmount": 373.72,
                "saleDetails": [
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 373.72,
                        "stock_percent": 100,
                        "common_percent": 0
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 373.72,
                        "stock_percent": 20.7,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Калининград",
                "percent": 0.03,
                "comparePercent": 36.09,
                "percentOrder": 0.01,
                "comparePercentOrder": -64.44,
                "orderCount": 1,
                "orderAmount": 345,
                "saleCount": 1,
                "saleAmount": 260.47,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 260.47,
                        "stock_percent": 100,
                        "common_percent": 0
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 260.47,
                        "stock_percent": 75.5,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Астана Карагандинское шоссе",
                "percent": 0,
                "comparePercent": -100,
                "percentOrder": 0.13,
                "comparePercentOrder": -67.41,
                "orderCount": 2,
                "orderAmount": 6600,
                "saleCount": 0,
                "saleAmount": 0,
                "saleDetails": [],
                "orderDetails": []
            },
            {
                "stockName": "СЦ Адыгея",
                "percent": 0,
                "comparePercent": -100,
                "percentOrder": 0.08,
                "comparePercentOrder": -71.37,
                "orderCount": 2,
                "orderAmount": 3933,
                "saleCount": 1,
                "saleAmount": 0,
                "saleDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ]
            }
        ],
        "geo_data": [
            {
                "districtName": "Центральный федеральный округ",
                "percent": 32,
                "comparePercent": 21,
                "percentOrder": 33,
                "comparePercentOrder": 4.96,
                "orderCount": 643,
                "orderAmount": 1712413,
                "saleCount": 174,
                "saleAmount": 310378
            },
            {
                "districtName": "Приволжский федеральный округ",
                "percent": 18,
                "comparePercent": 23,
                "percentOrder": 18,
                "comparePercentOrder": 12,
                "orderCount": 344,
                "orderAmount": 942017,
                "saleCount": 87,
                "saleAmount": 177288
            },
            {
                "districtName": "Северо-Западный федеральный округ",
                "percent": 11,
                "comparePercent": 81,
                "percentOrder": 12,
                "comparePercentOrder": 44,
                "orderCount": 216,
                "orderAmount": 616751,
                "saleCount": 55,
                "saleAmount": 110848
            },
            {
                "districtName": "Сибирский федеральный округ",
                "percent": 10,
                "comparePercent": 29,
                "percentOrder": 8.1,
                "comparePercentOrder": 14,
                "orderCount": 147,
                "orderAmount": 413104,
                "saleCount": 49,
                "saleAmount": 98903
            },
            {
                "districtName": "Южный федеральный округ",
                "percent": 8.53,
                "comparePercent": -45.4,
                "percentOrder": 9.45,
                "comparePercentOrder": -35.47,
                "orderCount": 187,
                "orderAmount": 481806,
                "saleCount": 56,
                "saleAmount": 81892
            },
            {
                "districtName": "Уральский федеральный округ",
                "percent": 8.13,
                "comparePercent": 42,
                "percentOrder": 8.63,
                "comparePercentOrder": 60,
                "orderCount": 155,
                "orderAmount": 440050,
                "saleCount": 37,
                "saleAmount": 78059
            },
            {
                "districtName": "Другой округ",
                "percent": 5.02,
                "comparePercent": -63.33,
                "percentOrder": 4.71,
                "comparePercentOrder": -51.13,
                "orderCount": 116,
                "orderAmount": 240281.68,
                "saleCount": 33,
                "saleAmount": 48204.76
            },
            {
                "districtName": "Дальневосточный федеральный округ",
                "percent": 4.01,
                "comparePercent": 0.68,
                "percentOrder": 3.02,
                "comparePercentOrder": 9.7,
                "orderCount": 49,
                "orderAmount": 154070,
                "saleCount": 15,
                "saleAmount": 38450
            },
            {
                "districtName": "Северо-Кавказский федеральный округ",
                "percent": 1.63,
                "comparePercent": -68.04,
                "percentOrder": 1.97,
                "comparePercentOrder": -47.35,
                "orderCount": 39,
                "orderAmount": 100587.18,
                "saleCount": 14,
                "saleAmount": 15627.18
            }
        ]
    },
    custom: {
        "stock_data": [
            {
                "stockName": "Электросталь",
                "percent": 33.46,
                "comparePercent": -11.07,
                "percentOrder": 36,
                "comparePercentOrder": -26.14,
                "orderCount": 584,
                "orderAmount": 1897045.84,
                "saleCount": 174,
                "saleAmount": 327107.16,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 95155.84,
                        "stock_percent": 29.1,
                        "common_percent": 9.7
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 81982.61,
                        "stock_percent": 25.1,
                        "common_percent": 8.4
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 46083.49,
                        "stock_percent": 14.1,
                        "common_percent": 4.7
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 38325.27,
                        "stock_percent": 11.7,
                        "common_percent": 3.9
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 25806.25,
                        "stock_percent": 7.9,
                        "common_percent": 2.6
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 12854.63,
                        "stock_percent": 3.9,
                        "common_percent": 1.3
                    },
                    {
                        "district": "Другой округ",
                        "amount": 12104.1,
                        "stock_percent": 3.7,
                        "common_percent": 1.2
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 11321.22,
                        "stock_percent": 3.5,
                        "common_percent": 1.2
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 3473.75,
                        "stock_percent": 1.1,
                        "common_percent": 0.4
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 95155.84,
                        "stock_percent": 5,
                        "common_percent": 1.9
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 81982.61,
                        "stock_percent": 4.3,
                        "common_percent": 1.6
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 46083.49,
                        "stock_percent": 2.4,
                        "common_percent": 0.9
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 38325.27,
                        "stock_percent": 2,
                        "common_percent": 0.7
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 25806.25,
                        "stock_percent": 1.4,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 12854.63,
                        "stock_percent": 0.7,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Другой округ",
                        "amount": 12104.1,
                        "stock_percent": 0.6,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 11321.22,
                        "stock_percent": 0.6,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 3473.75,
                        "stock_percent": 0.2,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Коледино",
                "percent": 26.52,
                "comparePercent": 53.08,
                "percentOrder": 37,
                "comparePercentOrder": 65,
                "orderCount": 538,
                "orderAmount": 1940257.32,
                "saleCount": 136,
                "saleAmount": 259323.78,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 104329.74,
                        "stock_percent": 40.2,
                        "common_percent": 10.7
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 40389.62,
                        "stock_percent": 15.6,
                        "common_percent": 4.1
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 39327.18,
                        "stock_percent": 15.2,
                        "common_percent": 4
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 31044.05,
                        "stock_percent": 12,
                        "common_percent": 3.2
                    },
                    {
                        "district": "Другой округ",
                        "amount": 21574.42,
                        "stock_percent": 8.3,
                        "common_percent": 2.2
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 6553.4,
                        "stock_percent": 2.5,
                        "common_percent": 0.7
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 5870.11,
                        "stock_percent": 2.3,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 5647.39,
                        "stock_percent": 2.2,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 4587.87,
                        "stock_percent": 1.8,
                        "common_percent": 0.5
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 104329.74,
                        "stock_percent": 5.4,
                        "common_percent": 2
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 40389.62,
                        "stock_percent": 2.1,
                        "common_percent": 0.8
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 39327.18,
                        "stock_percent": 2,
                        "common_percent": 0.8
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 31044.05,
                        "stock_percent": 1.6,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Другой округ",
                        "amount": 21574.42,
                        "stock_percent": 1.1,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 6553.4,
                        "stock_percent": 0.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 5870.11,
                        "stock_percent": 0.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 5647.39,
                        "stock_percent": 0.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 4587.87,
                        "stock_percent": 0.2,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Тула",
                "percent": 14.05,
                "comparePercent": 13.12,
                "percentOrder": 17,
                "comparePercentOrder": 10,
                "orderCount": 268,
                "orderAmount": 901274.61,
                "saleCount": 76,
                "saleAmount": 137371.62,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 68434.01,
                        "stock_percent": 49.8,
                        "common_percent": 7
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 22902.46,
                        "stock_percent": 16.7,
                        "common_percent": 2.3
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 10307.26,
                        "stock_percent": 7.5,
                        "common_percent": 1.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 8971.21,
                        "stock_percent": 6.5,
                        "common_percent": 0.9
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 7765.17,
                        "stock_percent": 5.7,
                        "common_percent": 0.8
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 5719.12,
                        "stock_percent": 4.2,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Другой округ",
                        "amount": 5587.1,
                        "stock_percent": 4.1,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 4197.2,
                        "stock_percent": 3.1,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 3488.09,
                        "stock_percent": 2.5,
                        "common_percent": 0.4
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 68434.01,
                        "stock_percent": 7.6,
                        "common_percent": 1.3
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 22902.46,
                        "stock_percent": 2.5,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 10307.26,
                        "stock_percent": 1.1,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 8971.21,
                        "stock_percent": 1,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 7765.17,
                        "stock_percent": 0.9,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 5719.12,
                        "stock_percent": 0.6,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Другой округ",
                        "amount": 5587.1,
                        "stock_percent": 0.6,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 4197.2,
                        "stock_percent": 0.5,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 3488.09,
                        "stock_percent": 0.4,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Казань",
                "percent": 7.41,
                "comparePercent": -39.12,
                "percentOrder": 8.51,
                "comparePercentOrder": -44.46,
                "orderCount": 133,
                "orderAmount": 436836.04,
                "saleCount": 40,
                "saleAmount": 72404.74,
                "saleDetails": [
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 27576.34,
                        "stock_percent": 38.1,
                        "common_percent": 2.8
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 15981.19,
                        "stock_percent": 22.1,
                        "common_percent": 1.6
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 9015.45,
                        "stock_percent": 12.5,
                        "common_percent": 0.9
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 5728.91,
                        "stock_percent": 7.9,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Другой округ",
                        "amount": 5654.42,
                        "stock_percent": 7.8,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 2631.16,
                        "stock_percent": 3.6,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 2525.47,
                        "stock_percent": 3.5,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2265,
                        "stock_percent": 3.1,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 1.4,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 27576.34,
                        "stock_percent": 6.3,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 15981.19,
                        "stock_percent": 3.7,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 9015.45,
                        "stock_percent": 2.1,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 5728.91,
                        "stock_percent": 1.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Другой округ",
                        "amount": 5654.42,
                        "stock_percent": 1.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 2631.16,
                        "stock_percent": 0.6,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 2525.47,
                        "stock_percent": 0.6,
                        "common_percent": 0
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 2265,
                        "stock_percent": 0.5,
                        "common_percent": 0
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 0.2,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Краснодар",
                "percent": 6.47,
                "comparePercent": -22.51,
                "percentOrder": 7.34,
                "comparePercentOrder": -25.06,
                "orderCount": 120,
                "orderAmount": 376947.7,
                "saleCount": 42,
                "saleAmount": 63265.58,
                "saleDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 24924.48,
                        "stock_percent": 39.4,
                        "common_percent": 2.5
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 10055.99,
                        "stock_percent": 15.9,
                        "common_percent": 1
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 6970.9,
                        "stock_percent": 11,
                        "common_percent": 0.7
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 6761.02,
                        "stock_percent": 10.7,
                        "common_percent": 0.7
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 6236.71,
                        "stock_percent": 9.9,
                        "common_percent": 0.6
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 2797.27,
                        "stock_percent": 4.4,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 2631.17,
                        "stock_percent": 4.2,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Другой округ",
                        "amount": 1925.42,
                        "stock_percent": 3,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 1.5,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 24924.48,
                        "stock_percent": 6.6,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 10055.99,
                        "stock_percent": 2.7,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 6970.9,
                        "stock_percent": 1.8,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 6761.02,
                        "stock_percent": 1.8,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 6236.71,
                        "stock_percent": 1.7,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 2797.27,
                        "stock_percent": 0.7,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 2631.17,
                        "stock_percent": 0.7,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Другой округ",
                        "amount": 1925.42,
                        "stock_percent": 0.5,
                        "common_percent": 0
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 0.3,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Подольск",
                "percent": 4.5,
                "comparePercent": 1420.14,
                "percentOrder": 12,
                "comparePercentOrder": 1704,
                "orderCount": 111,
                "orderAmount": 654987.09,
                "saleCount": 14,
                "saleAmount": 44002.18,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 11873.13,
                        "stock_percent": 27,
                        "common_percent": 1.2
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 10162.3,
                        "stock_percent": 23.1,
                        "common_percent": 1
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 10086.8,
                        "stock_percent": 22.9,
                        "common_percent": 1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 9841.42,
                        "stock_percent": 22.4,
                        "common_percent": 1
                    },
                    {
                        "district": "Другой округ",
                        "amount": 2038.53,
                        "stock_percent": 4.6,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 11873.13,
                        "stock_percent": 1.8,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 10162.3,
                        "stock_percent": 1.6,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Дальневосточный федеральный округ",
                        "amount": 10086.8,
                        "stock_percent": 1.5,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 9841.42,
                        "stock_percent": 1.5,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Другой округ",
                        "amount": 2038.53,
                        "stock_percent": 0.3,
                        "common_percent": 0
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Невинномысск",
                "percent": 1.49,
                "comparePercent": -3.59,
                "percentOrder": 2.19,
                "comparePercentOrder": -4.1,
                "orderCount": 35,
                "orderAmount": 112283.97,
                "saleCount": 11,
                "saleAmount": 14545.59,
                "saleDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 3677.75,
                        "stock_percent": 25.3,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 3278.21,
                        "stock_percent": 22.5,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 3080.4,
                        "stock_percent": 21.2,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Другой округ",
                        "amount": 2583.89,
                        "stock_percent": 17.8,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 962.72,
                        "stock_percent": 6.6,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 6.6,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 3677.75,
                        "stock_percent": 3.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 3278.21,
                        "stock_percent": 2.9,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 3080.4,
                        "stock_percent": 2.7,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Другой округ",
                        "amount": 2583.89,
                        "stock_percent": 2.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Северо-Кавказский федеральный округ",
                        "amount": 962.72,
                        "stock_percent": 0.9,
                        "common_percent": 0
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 0.9,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Санкт-Петербург Уткина Заводь",
                "percent": 1.45,
                "comparePercent": -19.88,
                "percentOrder": 1.64,
                "comparePercentOrder": -44.41,
                "orderCount": 22,
                "orderAmount": 84110.17,
                "saleCount": 8,
                "saleAmount": 14143.4,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 8082.27,
                        "stock_percent": 57.1,
                        "common_percent": 0.8
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 3558.31,
                        "stock_percent": 25.2,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2502.82,
                        "stock_percent": 17.7,
                        "common_percent": 0.3
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 8082.27,
                        "stock_percent": 9.6,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 3558.31,
                        "stock_percent": 4.2,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2502.82,
                        "stock_percent": 3,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Екатеринбург - Испытателей 14г",
                "percent": 1.43,
                "comparePercent": -39.13,
                "percentOrder": 0.9,
                "comparePercentOrder": -64.15,
                "orderCount": 16,
                "orderAmount": 46017.55,
                "saleCount": 7,
                "saleAmount": 13949.37,
                "saleDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 4791.23,
                        "stock_percent": 34.3,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 4326.15,
                        "stock_percent": 31,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2906.75,
                        "stock_percent": 20.8,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 6.9,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 6.9,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 4791.23,
                        "stock_percent": 10.4,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 4326.15,
                        "stock_percent": 9.4,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2906.75,
                        "stock_percent": 6.3,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 2.1,
                        "common_percent": 0
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 2.1,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Новосибирск",
                "percent": 1.23,
                "comparePercent": 126.54,
                "percentOrder": 1.27,
                "comparePercentOrder": 77,
                "orderCount": 18,
                "orderAmount": 65143.3,
                "saleCount": 4,
                "saleAmount": 12052.05,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 4665.14,
                        "stock_percent": 38.7,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 3404.29,
                        "stock_percent": 28.2,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 3020,
                        "stock_percent": 25.1,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 8,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 4665.14,
                        "stock_percent": 7.2,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 3404.29,
                        "stock_percent": 5.2,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 3020,
                        "stock_percent": 4.6,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 1.5,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Чашниково",
                "percent": 0.93,
                "comparePercent": 126.61,
                "percentOrder": 0.88,
                "comparePercentOrder": 47,
                "orderCount": 17,
                "orderAmount": 45173.6,
                "saleCount": 5,
                "saleAmount": 9121.68,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 4541.25,
                        "stock_percent": 49.8,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 3617.81,
                        "stock_percent": 39.7,
                        "common_percent": 0.4
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 10.6,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 4541.25,
                        "stock_percent": 10.1,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 3617.81,
                        "stock_percent": 8,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 2.1,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Рязань (Тюшевское)",
                "percent": 0.89,
                "comparePercent": -57.09,
                "percentOrder": 1.23,
                "comparePercentOrder": -53.11,
                "orderCount": 17,
                "orderAmount": 63087,
                "saleCount": 4,
                "saleAmount": 8716.47,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 4533.77,
                        "stock_percent": 52,
                        "common_percent": 0.5
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 3155.9,
                        "stock_percent": 36.2,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 11.8,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 4533.77,
                        "stock_percent": 7.2,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 3155.9,
                        "stock_percent": 5,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 1.6,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Котовск",
                "percent": 0.71,
                "comparePercent": -20.12,
                "percentOrder": 0.78,
                "comparePercentOrder": -24.92,
                "orderCount": 14,
                "orderAmount": 40047,
                "saleCount": 6,
                "saleAmount": 6916.54,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2582.1,
                        "stock_percent": 37.3,
                        "common_percent": 0.3
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1861.07,
                        "stock_percent": 26.9,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1510.75,
                        "stock_percent": 21.8,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 13.9,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 2582.1,
                        "stock_percent": 6.4,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1861.07,
                        "stock_percent": 4.6,
                        "common_percent": 0
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1510.75,
                        "stock_percent": 3.8,
                        "common_percent": 0
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": 962.62,
                        "stock_percent": 2.4,
                        "common_percent": 0
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Владимир",
                "percent": 0.38,
                "comparePercent": -26.12,
                "percentOrder": 0.24,
                "comparePercentOrder": -66.79,
                "orderCount": 5,
                "orderAmount": 12432.61,
                "saleCount": 3,
                "saleAmount": 3731.63,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 52.6,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1768.63,
                        "stock_percent": 47.4,
                        "common_percent": 0.2
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 27.5,
                        "common_percent": 0.1
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": -1026.8,
                        "stock_percent": -27.5,
                        "common_percent": -0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 1963,
                        "stock_percent": 15.8,
                        "common_percent": 0
                    },
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 1768.63,
                        "stock_percent": 14.2,
                        "common_percent": 0
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 8.3,
                        "common_percent": 0
                    },
                    {
                        "district": "Приволжский федеральный округ",
                        "amount": -1026.8,
                        "stock_percent": -8.3,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Волгоград",
                "percent": 0.32,
                "comparePercent": 100,
                "percentOrder": 0.24,
                "comparePercentOrder": 100,
                "orderCount": 4,
                "orderAmount": 12184.8,
                "saleCount": 1,
                "saleAmount": 3155.9,
                "saleDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 3155.9,
                        "stock_percent": 100,
                        "common_percent": 0.3
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Центральный федеральный округ",
                        "amount": 3155.9,
                        "stock_percent": 25.9,
                        "common_percent": 0.1
                    }
                ]
            },
            {
                "stockName": "Самара (Новосемейкино)",
                "percent": 0.2,
                "comparePercent": 100,
                "percentOrder": 0.52,
                "comparePercentOrder": 100,
                "orderCount": 9,
                "orderAmount": 26636,
                "saleCount": 1,
                "saleAmount": 1963,
                "saleDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 100,
                        "common_percent": 0.2
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Уральский федеральный округ",
                        "amount": 1963,
                        "stock_percent": 7.4,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Белая дача",
                "percent": 0.11,
                "comparePercent": -36.4,
                "percentOrder": 0.38,
                "comparePercentOrder": 87,
                "orderCount": 6,
                "orderAmount": 19525,
                "saleCount": 1,
                "saleAmount": 1026.8,
                "saleDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 100,
                        "common_percent": 0.1
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 1026.8,
                        "stock_percent": 5.3,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Атакент",
                "percent": 0.04,
                "comparePercent": 10.81,
                "percentOrder": 0.04,
                "comparePercentOrder": 114,
                "orderCount": 2,
                "orderAmount": 1806,
                "saleCount": 1,
                "saleAmount": 373.72,
                "saleDetails": [
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 373.72,
                        "stock_percent": 100,
                        "common_percent": 0
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Сибирский федеральный округ",
                        "amount": 373.72,
                        "stock_percent": 20.7,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Калининград",
                "percent": 0.03,
                "comparePercent": 35.52,
                "percentOrder": 0.01,
                "comparePercentOrder": -64.01,
                "orderCount": 1,
                "orderAmount": 345,
                "saleCount": 1,
                "saleAmount": 260.47,
                "saleDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 260.47,
                        "stock_percent": 100,
                        "common_percent": 0
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Северо-Западный федеральный округ",
                        "amount": 260.47,
                        "stock_percent": 75.5,
                        "common_percent": 0
                    }
                ]
            },
            {
                "stockName": "Астана Карагандинское шоссе",
                "percent": 0,
                "comparePercent": -100,
                "percentOrder": 0.13,
                "comparePercentOrder": -67.02,
                "orderCount": 2,
                "orderAmount": 6600,
                "saleCount": 0,
                "saleAmount": 0,
                "saleDetails": [],
                "orderDetails": []
            },
            {
                "stockName": "СЦ Адыгея",
                "percent": 0,
                "comparePercent": -100,
                "percentOrder": 0.08,
                "comparePercentOrder": -71.02,
                "orderCount": 2,
                "orderAmount": 3933,
                "saleCount": 1,
                "saleAmount": 0,
                "saleDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ],
                "orderDetails": [
                    {
                        "district": "Южный федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    },
                    {
                        "district": "Южный федеральный округ",
                        "amount": 0,
                        "stock_percent": 0,
                        "common_percent": 0
                    }
                ]
            }
        ],
        "geo_data": [
            {
                "districtName": "Центральный федеральный округ",
                "percent": 32,
                "comparePercent": 19,
                "percentOrder": 33,
                "comparePercentOrder": 5.07,
                "orderCount": 652,
                "orderAmount": 1720535,
                "saleCount": 178,
                "saleAmount": 314427
            },
            {
                "districtName": "Приволжский федеральный округ",
                "percent": 18,
                "comparePercent": 20,
                "percentOrder": 18,
                "comparePercentOrder": 12,
                "orderCount": 350,
                "orderAmount": 950283,
                "saleCount": 89,
                "saleAmount": 179334
            },
            {
                "districtName": "Северо-Западный федеральный округ",
                "percent": 11,
                "comparePercent": 79,
                "percentOrder": 12,
                "comparePercentOrder": 42,
                "orderCount": 218,
                "orderAmount": 619297,
                "saleCount": 57,
                "saleAmount": 113053
            },
            {
                "districtName": "Сибирский федеральный округ",
                "percent": 10,
                "comparePercent": 35,
                "percentOrder": 8.11,
                "comparePercentOrder": 12,
                "orderCount": 150,
                "orderAmount": 416177,
                "saleCount": 52,
                "saleAmount": 103110
            },
            {
                "districtName": "Южный федеральный округ",
                "percent": 8.57,
                "comparePercent": -44.19,
                "percentOrder": 9.43,
                "comparePercentOrder": -35.2,
                "orderCount": 189,
                "orderAmount": 483832,
                "saleCount": 58,
                "saleAmount": 83836
            },
            {
                "districtName": "Уральский федеральный округ",
                "percent": 7.98,
                "comparePercent": 42,
                "percentOrder": 8.65,
                "comparePercentOrder": 64,
                "orderCount": 158,
                "orderAmount": 444089,
                "saleCount": 37,
                "saleAmount": 78059
            },
            {
                "districtName": "Другой округ",
                "percent": 5.3,
                "comparePercent": -60.45,
                "percentOrder": 4.72,
                "comparePercentOrder": -50.38,
                "orderCount": 118,
                "orderAmount": 242335,
                "saleCount": 36,
                "saleAmount": 51840.61
            },
            {
                "districtName": "Дальневосточный федеральный округ",
                "percent": 3.93,
                "comparePercent": 0.26,
                "percentOrder": 3,
                "comparePercentOrder": 11,
                "orderCount": 49,
                "orderAmount": 154070,
                "saleCount": 15,
                "saleAmount": 38450
            },
            {
                "districtName": "Северо-Кавказский федеральный округ",
                "percent": 1.6,
                "comparePercent": -70,
                "percentOrder": 1.98,
                "comparePercentOrder": -49.55,
                "orderCount": 40,
                "orderAmount": 101634.18,
                "saleCount": 14,
                "saleAmount": 15627.18
            }
        ]
    }
};

const mockABC = {
    7: {
        proceeds: {
            results: [
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22211111,
                    supplier_id: '7013/черный',
                    amount: 35911.57,
                    amount_percent: 2.91,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22111111,
                    supplier_id: '7013/синий',
                    amount: 34779.05,
                    amount_percent: 2.82,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Пижама шелковая с шортами красивая',
                    wb_id: 21111111,
                    supplier_id: '6800/зеленаявишня',
                    amount: 33581.84,
                    amount_percent: 2.72,
                    photo: 'https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник раздельный с высокими шортами',
                    wb_id: 11111111,
                    supplier_id: '22092/бордовый',
                    amount: 25223.56,
                    amount_percent: 2.04,
                    photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник танкини больших размеров',
                    wb_id: 11111110,
                    supplier_id: '22092/радужный',
                    amount: 23848.08,
                    amount_percent: 1.93,
                    photo: 'https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 11111100,
                    supplier_id: '24008/черный',
                    amount: 23423.81,
                    amount_percent: 1.9,
                    photo: 'https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Пижама шелковая с шортами',
                    wb_id: 11111000,
                    supplier_id: '6800/синий',
                    amount: 11655.68,
                    amount_percent: 0.94,
                    photo: 'https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник слитный спортивный эластичный',
                    wb_id: 11110000,
                    supplier_id: '3417/черный',
                    amount: 5327.28,
                    amount_percent: 0.43,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Слитный купальник для плавания',
                    wb_id: 100000000,
                    supplier_id: '3417/малиновый',
                    amount: 3426.85,
                    amount_percent: 0.28,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486755/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Раздельный купальник шортами больших размеров',
                    wb_id: 11000000,
                    supplier_id: '22092/чернаясетка',
                    amount: 2310.3,
                    amount_percent: 0.19,
                    photo: 'https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Сорочка шелковая больших размеров',
                    wb_id: 11100000,
                    supplier_id: 'H260/черная',
                    amount: 1322.76,
                    amount_percent: 0.11,
                    photo: 'https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp',
                    category: 'C',
                },
            ],
            is_need_cost: false,
        },
        profit: {
            results: [
                {
                    title: 'Пижама шелковая с шортами красивая',
                    wb_id: 21111111,
                    supplier_id: '6800/зеленаявишня',
                    amount: 7793.21,
                    amount_percent: 2.25,
                    photo: 'https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22111111,
                    supplier_id: '7013/синий',
                    amount: 7763.68,
                    amount_percent: 2.24,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник раздельный с высокими шортами',
                    wb_id: 11111111,
                    supplier_id: '22092/бордовый',
                    amount: 7153.02,
                    amount_percent: 2.07,
                    photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22211111,
                    supplier_id: '7013/черный',
                    amount: 6644.05,
                    amount_percent: 1.92,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 11111100,
                    supplier_id: '24008/черный',
                    amount: 5071.98,
                    amount_percent: 1.46,
                    photo: 'https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Пижама шелковая с шортами',
                    wb_id: 11111000,
                    supplier_id: '6800/синий',
                    amount: 3410.69,
                    amount_percent: 0.98,
                    photo: 'https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 224668926,
                    supplier_id: '24008/белыйцветок',
                    amount: 3115.37,
                    amount_percent: 0.9,
                    photo: 'https://basket-15.wbbasket.ru/vol2246/part224668/224668926/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник танкини больших размеров',
                    wb_id: 11111110,
                    supplier_id: '22092/радужный',
                    amount: 2593.03,
                    amount_percent: 0.75,
                    photo: 'https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Сорочка шелковая больших размеров',
                    wb_id: 11100000,
                    supplier_id: 'H260/черная',
                    amount: 263.66,
                    amount_percent: 0.08,
                    photo: 'https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник слитный спортивный эластичный',
                    wb_id: 11110000,
                    supplier_id: '3417/черный',
                    amount: 7.3,
                    amount_percent: 0,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Раздельный купальник шортами больших размеров',
                    wb_id: 11000000,
                    supplier_id: '22092/чернаясетка',
                    amount: -293.11,
                    amount_percent: 0,
                    photo: 'https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Слитный купальник для плавания',
                    wb_id: 100000000,
                    supplier_id: '3417/малиновый',
                    amount: -2523.41,
                    amount_percent: 0,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486755/images/c246x328/1.webp',
                    category: 'C',
                },
            ],
            is_need_cost: false,
        },
    },
	14: {
        proceeds: {
            results: [
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22211111,
                    supplier_id: '7013/черный',
                    amount: 35911.57,
                    amount_percent: 2.91,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22111111,
                    supplier_id: '7013/синий',
                    amount: 34779.05,
                    amount_percent: 2.82,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Пижама шелковая с шортами красивая',
                    wb_id: 21111111,
                    supplier_id: '6800/зеленаявишня',
                    amount: 33581.84,
                    amount_percent: 2.72,
                    photo: 'https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник раздельный с высокими шортами',
                    wb_id: 11111111,
                    supplier_id: '22092/бордовый',
                    amount: 25223.56,
                    amount_percent: 2.04,
                    photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник танкини больших размеров',
                    wb_id: 11111110,
                    supplier_id: '22092/радужный',
                    amount: 23848.08,
                    amount_percent: 1.93,
                    photo: 'https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 11111100,
                    supplier_id: '24008/черный',
                    amount: 23423.81,
                    amount_percent: 1.9,
                    photo: 'https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Пижама шелковая с шортами',
                    wb_id: 11111000,
                    supplier_id: '6800/синий',
                    amount: 11655.68,
                    amount_percent: 0.94,
                    photo: 'https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник слитный спортивный эластичный',
                    wb_id: 11110000,
                    supplier_id: '3417/черный',
                    amount: 5327.28,
                    amount_percent: 0.43,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Слитный купальник для плавания',
                    wb_id: 100000000,
                    supplier_id: '3417/малиновый',
                    amount: 3426.85,
                    amount_percent: 0.28,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486755/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Раздельный купальник шортами больших размеров',
                    wb_id: 11000000,
                    supplier_id: '22092/чернаясетка',
                    amount: 2310.3,
                    amount_percent: 0.19,
                    photo: 'https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Сорочка шелковая больших размеров',
                    wb_id: 11100000,
                    supplier_id: 'H260/черная',
                    amount: 1322.76,
                    amount_percent: 0.11,
                    photo: 'https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp',
                    category: 'C',
                },
            ],
            is_need_cost: false,
        },
        profit: {
            results: [
                {
                    title: 'Пижама шелковая с шортами красивая',
                    wb_id: 21111111,
                    supplier_id: '6800/зеленаявишня',
                    amount: 7793.21,
                    amount_percent: 2.25,
                    photo: 'https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22111111,
                    supplier_id: '7013/синий',
                    amount: 7763.68,
                    amount_percent: 2.24,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник раздельный с высокими шортами',
                    wb_id: 11111111,
                    supplier_id: '22092/бордовый',
                    amount: 7153.02,
                    amount_percent: 2.07,
                    photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22211111,
                    supplier_id: '7013/черный',
                    amount: 6644.05,
                    amount_percent: 1.92,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 11111100,
                    supplier_id: '24008/черный',
                    amount: 5071.98,
                    amount_percent: 1.46,
                    photo: 'https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Пижама шелковая с шортами',
                    wb_id: 11111000,
                    supplier_id: '6800/синий',
                    amount: 3410.69,
                    amount_percent: 0.98,
                    photo: 'https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 224668926,
                    supplier_id: '24008/белыйцветок',
                    amount: 3115.37,
                    amount_percent: 0.9,
                    photo: 'https://basket-15.wbbasket.ru/vol2246/part224668/224668926/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник танкини больших размеров',
                    wb_id: 11111110,
                    supplier_id: '22092/радужный',
                    amount: 2593.03,
                    amount_percent: 0.75,
                    photo: 'https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Сорочка шелковая больших размеров',
                    wb_id: 11100000,
                    supplier_id: 'H260/черная',
                    amount: 263.66,
                    amount_percent: 0.08,
                    photo: 'https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник слитный спортивный эластичный',
                    wb_id: 11110000,
                    supplier_id: '3417/черный',
                    amount: 7.3,
                    amount_percent: 0,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Раздельный купальник шортами больших размеров',
                    wb_id: 11000000,
                    supplier_id: '22092/чернаясетка',
                    amount: -293.11,
                    amount_percent: 0,
                    photo: 'https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Слитный купальник для плавания',
                    wb_id: 100000000,
                    supplier_id: '3417/малиновый',
                    amount: -2523.41,
                    amount_percent: 0,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486755/images/c246x328/1.webp',
                    category: 'C',
                },
            ],
            is_need_cost: false,
        },
    },
    30: {
        proceeds: {
            results: [
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22211111,
                    supplier_id: '7013/черный',
                    amount: 35911.57,
                    amount_percent: 2.91,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22111111,
                    supplier_id: '7013/синий',
                    amount: 34779.05,
                    amount_percent: 2.82,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Пижама шелковая с шортами красивая',
                    wb_id: 21111111,
                    supplier_id: '6800/зеленаявишня',
                    amount: 33581.84,
                    amount_percent: 2.72,
                    photo: 'https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник раздельный с высокими шортами',
                    wb_id: 11111111,
                    supplier_id: '22092/бордовый',
                    amount: 25223.56,
                    amount_percent: 2.04,
                    photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник танкини больших размеров',
                    wb_id: 11111110,
                    supplier_id: '22092/радужный',
                    amount: 23848.08,
                    amount_percent: 1.93,
                    photo: 'https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 11111100,
                    supplier_id: '24008/черный',
                    amount: 23423.81,
                    amount_percent: 1.9,
                    photo: 'https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Пижама шелковая с шортами',
                    wb_id: 11111000,
                    supplier_id: '6800/синий',
                    amount: 11655.68,
                    amount_percent: 0.94,
                    photo: 'https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник слитный спортивный эластичный',
                    wb_id: 11110000,
                    supplier_id: '3417/черный',
                    amount: 5327.28,
                    amount_percent: 0.43,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Слитный купальник для плавания',
                    wb_id: 100000000,
                    supplier_id: '3417/малиновый',
                    amount: 3426.85,
                    amount_percent: 0.28,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486755/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Раздельный купальник шортами больших размеров',
                    wb_id: 11000000,
                    supplier_id: '22092/чернаясетка',
                    amount: 2310.3,
                    amount_percent: 0.19,
                    photo: 'https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Сорочка шелковая больших размеров',
                    wb_id: 11100000,
                    supplier_id: 'H260/черная',
                    amount: 1322.76,
                    amount_percent: 0.11,
                    photo: 'https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp',
                    category: 'C',
                },
            ],
            is_need_cost: false,
        },
        profit: {
            results: [
                {
                    title: 'Пижама шелковая с шортами красивая',
                    wb_id: 21111111,
                    supplier_id: '6800/зеленаявишня',
                    amount: 7793.21,
                    amount_percent: 2.25,
                    photo: 'https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22111111,
                    supplier_id: '7013/синий',
                    amount: 7763.68,
                    amount_percent: 2.24,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник раздельный с высокими шортами',
                    wb_id: 11111111,
                    supplier_id: '22092/бордовый',
                    amount: 7153.02,
                    amount_percent: 2.07,
                    photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22211111,
                    supplier_id: '7013/черный',
                    amount: 6644.05,
                    amount_percent: 1.92,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 11111100,
                    supplier_id: '24008/черный',
                    amount: 5071.98,
                    amount_percent: 1.46,
                    photo: 'https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Пижама шелковая с шортами',
                    wb_id: 11111000,
                    supplier_id: '6800/синий',
                    amount: 3410.69,
                    amount_percent: 0.98,
                    photo: 'https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 224668926,
                    supplier_id: '24008/белыйцветок',
                    amount: 3115.37,
                    amount_percent: 0.9,
                    photo: 'https://basket-15.wbbasket.ru/vol2246/part224668/224668926/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник танкини больших размеров',
                    wb_id: 11111110,
                    supplier_id: '22092/радужный',
                    amount: 2593.03,
                    amount_percent: 0.75,
                    photo: 'https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Сорочка шелковая больших размеров',
                    wb_id: 11100000,
                    supplier_id: 'H260/черная',
                    amount: 263.66,
                    amount_percent: 0.08,
                    photo: 'https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник слитный спортивный эластичный',
                    wb_id: 11110000,
                    supplier_id: '3417/черный',
                    amount: 7.3,
                    amount_percent: 0,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Раздельный купальник шортами больших размеров',
                    wb_id: 11000000,
                    supplier_id: '22092/чернаясетка',
                    amount: -293.11,
                    amount_percent: 0,
                    photo: 'https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Слитный купальник для плавания',
                    wb_id: 100000000,
                    supplier_id: '3417/малиновый',
                    amount: -2523.41,
                    amount_percent: 0,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486755/images/c246x328/1.webp',
                    category: 'C',
                },
            ],
            is_need_cost: false,
        },
    },
    90: {
        proceeds: {
            results: [
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22211111,
                    supplier_id: '7013/черный',
                    amount: 35911.57,
                    amount_percent: 2.91,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22111111,
                    supplier_id: '7013/синий',
                    amount: 34779.05,
                    amount_percent: 2.82,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Пижама шелковая с шортами красивая',
                    wb_id: 21111111,
                    supplier_id: '6800/зеленаявишня',
                    amount: 33581.84,
                    amount_percent: 2.72,
                    photo: 'https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник раздельный с высокими шортами',
                    wb_id: 11111111,
                    supplier_id: '22092/бордовый',
                    amount: 25223.56,
                    amount_percent: 2.04,
                    photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник танкини больших размеров',
                    wb_id: 11111110,
                    supplier_id: '22092/радужный',
                    amount: 23848.08,
                    amount_percent: 1.93,
                    photo: 'https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 11111100,
                    supplier_id: '24008/черный',
                    amount: 23423.81,
                    amount_percent: 1.9,
                    photo: 'https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Пижама шелковая с шортами',
                    wb_id: 11111000,
                    supplier_id: '6800/синий',
                    amount: 11655.68,
                    amount_percent: 0.94,
                    photo: 'https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник слитный спортивный эластичный',
                    wb_id: 11110000,
                    supplier_id: '3417/черный',
                    amount: 5327.28,
                    amount_percent: 0.43,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Слитный купальник для плавания',
                    wb_id: 100000000,
                    supplier_id: '3417/малиновый',
                    amount: 3426.85,
                    amount_percent: 0.28,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486755/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Раздельный купальник шортами больших размеров',
                    wb_id: 11000000,
                    supplier_id: '22092/чернаясетка',
                    amount: 2310.3,
                    amount_percent: 0.19,
                    photo: 'https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Сорочка шелковая больших размеров',
                    wb_id: 11100000,
                    supplier_id: 'H260/черная',
                    amount: 1322.76,
                    amount_percent: 0.11,
                    photo: 'https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp',
                    category: 'C',
                },
            ],
            is_need_cost: false,
        },
        profit: {
            results: [
                {
                    title: 'Пижама шелковая с шортами красивая',
                    wb_id: 21111111,
                    supplier_id: '6800/зеленаявишня',
                    amount: 7793.21,
                    amount_percent: 2.25,
                    photo: 'https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22111111,
                    supplier_id: '7013/синий',
                    amount: 7763.68,
                    amount_percent: 2.24,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник раздельный с высокими шортами',
                    wb_id: 11111111,
                    supplier_id: '22092/бордовый',
                    amount: 7153.02,
                    amount_percent: 2.07,
                    photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22211111,
                    supplier_id: '7013/черный',
                    amount: 6644.05,
                    amount_percent: 1.92,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 11111100,
                    supplier_id: '24008/черный',
                    amount: 5071.98,
                    amount_percent: 1.46,
                    photo: 'https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Пижама шелковая с шортами',
                    wb_id: 11111000,
                    supplier_id: '6800/синий',
                    amount: 3410.69,
                    amount_percent: 0.98,
                    photo: 'https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 224668926,
                    supplier_id: '24008/белыйцветок',
                    amount: 3115.37,
                    amount_percent: 0.9,
                    photo: 'https://basket-15.wbbasket.ru/vol2246/part224668/224668926/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник танкини больших размеров',
                    wb_id: 11111110,
                    supplier_id: '22092/радужный',
                    amount: 2593.03,
                    amount_percent: 0.75,
                    photo: 'https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Сорочка шелковая больших размеров',
                    wb_id: 11100000,
                    supplier_id: 'H260/черная',
                    amount: 263.66,
                    amount_percent: 0.08,
                    photo: 'https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник слитный спортивный эластичный',
                    wb_id: 11110000,
                    supplier_id: '3417/черный',
                    amount: 7.3,
                    amount_percent: 0,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Раздельный купальник шортами больших размеров',
                    wb_id: 11000000,
                    supplier_id: '22092/чернаясетка',
                    amount: -293.11,
                    amount_percent: 0,
                    photo: 'https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Слитный купальник для плавания',
                    wb_id: 100000000,
                    supplier_id: '3417/малиновый',
                    amount: -2523.41,
                    amount_percent: 0,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486755/images/c246x328/1.webp',
                    category: 'C',
                },
            ],
            is_need_cost: false,
        },
    },
    custom: {
        proceeds: {
            results: [
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22211111,
                    supplier_id: '7013/черный',
                    amount: 35911.57,
                    amount_percent: 2.91,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22111111,
                    supplier_id: '7013/синий',
                    amount: 34779.05,
                    amount_percent: 2.82,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Пижама шелковая с шортами красивая',
                    wb_id: 21111111,
                    supplier_id: '6800/зеленаявишня',
                    amount: 33581.84,
                    amount_percent: 2.72,
                    photo: 'https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник раздельный с высокими шортами',
                    wb_id: 11111111,
                    supplier_id: '22092/бордовый',
                    amount: 25223.56,
                    amount_percent: 2.04,
                    photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник танкини больших размеров',
                    wb_id: 11111110,
                    supplier_id: '22092/радужный',
                    amount: 23848.08,
                    amount_percent: 1.93,
                    photo: 'https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 11111100,
                    supplier_id: '24008/черный',
                    amount: 23423.81,
                    amount_percent: 1.9,
                    photo: 'https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Пижама шелковая с шортами',
                    wb_id: 11111000,
                    supplier_id: '6800/синий',
                    amount: 11655.68,
                    amount_percent: 0.94,
                    photo: 'https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник слитный спортивный эластичный',
                    wb_id: 11110000,
                    supplier_id: '3417/черный',
                    amount: 5327.28,
                    amount_percent: 0.43,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Слитный купальник для плавания',
                    wb_id: 100000000,
                    supplier_id: '3417/малиновый',
                    amount: 3426.85,
                    amount_percent: 0.28,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486755/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Раздельный купальник шортами больших размеров',
                    wb_id: 11000000,
                    supplier_id: '22092/чернаясетка',
                    amount: 2310.3,
                    amount_percent: 0.19,
                    photo: 'https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Сорочка шелковая больших размеров',
                    wb_id: 11100000,
                    supplier_id: 'H260/черная',
                    amount: 1322.76,
                    amount_percent: 0.11,
                    photo: 'https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp',
                    category: 'C',
                },
            ],
            is_need_cost: false,
        },
        profit: {
            results: [
                {
                    title: 'Пижама шелковая с шортами красивая',
                    wb_id: 21111111,
                    supplier_id: '6800/зеленаявишня',
                    amount: 7793.21,
                    amount_percent: 2.25,
                    photo: 'https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp',
                    category: 'A',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22111111,
                    supplier_id: '7013/синий',
                    amount: 7763.68,
                    amount_percent: 2.24,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник раздельный с высокими шортами',
                    wb_id: 11111111,
                    supplier_id: '22092/бордовый',
                    amount: 7153.02,
                    amount_percent: 2.07,
                    photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Комплект шелковый халат с сорочкой',
                    wb_id: 22211111,
                    supplier_id: '7013/черный',
                    amount: 6644.05,
                    amount_percent: 1.92,
                    photo: 'https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 11111100,
                    supplier_id: '24008/черный',
                    amount: 5071.98,
                    amount_percent: 1.46,
                    photo: 'https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp',
                    category: 'B',
                },
                {
                    title: 'Пижама шелковая с шортами',
                    wb_id: 11111000,
                    supplier_id: '6800/синий',
                    amount: 3410.69,
                    amount_percent: 0.98,
                    photo: 'https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник слитный большой размер',
                    wb_id: 224668926,
                    supplier_id: '24008/белыйцветок',
                    amount: 3115.37,
                    amount_percent: 0.9,
                    photo: 'https://basket-15.wbbasket.ru/vol2246/part224668/224668926/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник танкини больших размеров',
                    wb_id: 11111110,
                    supplier_id: '22092/радужный',
                    amount: 2593.03,
                    amount_percent: 0.75,
                    photo: 'https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Сорочка шелковая больших размеров',
                    wb_id: 11100000,
                    supplier_id: 'H260/черная',
                    amount: 263.66,
                    amount_percent: 0.08,
                    photo: 'https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Купальник слитный спортивный эластичный',
                    wb_id: 11110000,
                    supplier_id: '3417/черный',
                    amount: 7.3,
                    amount_percent: 0,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Раздельный купальник шортами больших размеров',
                    wb_id: 11000000,
                    supplier_id: '22092/чернаясетка',
                    amount: -293.11,
                    amount_percent: 0,
                    photo: 'https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp',
                    category: 'C',
                },
                {
                    title: 'Слитный купальник для плавания',
                    wb_id: 100000000,
                    supplier_id: '3417/малиновый',
                    amount: -2523.41,
                    amount_percent: 0,
                    photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486755/images/c246x328/1.webp',
                    category: 'C',
                },
            ],
            is_need_cost: false,
        },
    },
};

const mockStock = [
	{
		productName: 'Сорочка шелковая больших размеров',
		brandName: 'GrenadeFleur',
		vendorСode: 'H260/черная',
		barCode: '2038988007733',
		saleSum: 10818.6,
		quantity: 5,
		lessReturns: 8555.6,
		costGoodsSold: 3405,
		returnsSum: 2263,
		returnsQuantity: 1,
		returnsCostSold: 681,
		costPriceOne: 681,
		costOfProductmockStockToday: 0,
		toClient: 4,
		to_client_sum: 451.4,
		fromClient: 1,
		from_client_sum: 150,
		commissionWB: 2096.11,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 8555.6,
		marginalProfit: 5150,
		averageProfit: 57,
		profitabilityOfProductsSold: 20.29,
		marginal: 60.19,
		annualReturnOnInventory: 0,
		lostRevenue: 0,
		basic: 7300,
		maxDiscount: 77,
		minDiscountPrice: 1679,
		orderQuantity: 4,
		orderSum: 6735,
		purchased: 5,
		notPurchased: 1,
		purchasedPercent: 80,
		completed: 6,
		orderCountDay: 0,
		saleCountDay: 0.04,
		dataRadar: 0,
		dataWB: 0,
		photo: 'https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp',
		nmID: 189869388,
		sku: '11100000',
		size: '2XL(56RUS)',
		category: 'Ночные сорочки',
		costPrice: 681,
		basePrice: 7300,
		discount: 77,
		minPrice: 167900,
		is_self_cost: true,
		byRevenue: 'C',
		byProfit: 'C',
	},
	{
		productName: 'Пижама шелковая с шортами',
		brandName: 'GrenadeFleur',
		vendorСode: '6800/синий',
		barCode: '2040959790551',
		saleSum: 22492.99,
		quantity: 11,
		lessReturns: 22492.99,
		costGoodsSold: 5940,
		returnsSum: 0,
		returnsQuantity: 0,
		returnsCostSold: 0,
		costPriceOne: 540,
		costOfProductmockStockToday: 64800,
		toClient: 11,
		to_client_sum: 1317.57,
		fromClient: 0,
		from_client_sum: 500,
		commissionWB: 5510.77,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 22492.99,
		marginalProfit: 16552,
		averageProfit: 183,
		profitabilityOfProductsSold: 31.48,
		marginal: 73.59,
		annualReturnOnInventory: 11,
		lostRevenue: 0,
		basic: 8300,
		maxDiscount: 80,
		minDiscountPrice: 1660,
		orderQuantity: 23,
		orderSum: 35171.84,
		purchased: 11,
		notPurchased: 0,
		purchasedPercent: 100,
		completed: 11,
		orderCountDay: 0,
		saleCountDay: 0.12,
		dataRadar: 120,
		dataWB: 120,
		photo: 'https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp',
		nmID: 243594134,
		sku: '11111000',
		size: 'L(54Rus)',
		category: 'Пижамы',
		costPrice: 540,
		basePrice: 8300,
		discount: 80,
		minPrice: 166000,
		is_self_cost: true,
		byRevenue: 'B',
		byProfit: 'B',
	},
	{
		productName: 'Пижама шелковая с шортами красивая',
		brandName: 'GrenadeFleur',
		vendorСode: '6800/зеленаявишня',
		barCode: '2040960085783',
		saleSum: 41795.89,
		quantity: 23,
		lessReturns: 41795.89,
		costGoodsSold: 12420,
		returnsSum: 0,
		returnsQuantity: 0,
		returnsCostSold: 0,
		costPriceOne: 540,
		costOfProductmockStockToday: 100440,
		toClient: 23,
		to_client_sum: 2553.06,
		fromClient: 0,
		from_client_sum: 1200,
		commissionWB: 10239.99,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 41795.89,
		marginalProfit: 29375,
		averageProfit: 326,
		profitabilityOfProductsSold: 26.65,
		marginal: 70.28,
		annualReturnOnInventory: 11,
		lostRevenue: 0,
		basic: 8000,
		maxDiscount: 78,
		minDiscountPrice: 1760,
		orderQuantity: 52,
		orderSum: 75422.29,
		purchased: 23,
		notPurchased: 0,
		purchasedPercent: 100,
		completed: 23,
		orderCountDay: 0,
		saleCountDay: 0.26,
		dataRadar: 186,
		dataWB: 186,
		photo: 'https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp',
		nmID: 21111111,
		sku: '2040960085783',
		size: '1XL(56Rus)',
		category: 'Пижамы',
		costPrice: 540,
		basePrice: 8000,
		discount: 78,
		minPrice: 176000,
		is_self_cost: true,
		byRevenue: 'A',
		byProfit: 'A',
	},
	{
		productName: 'Раздельный купальник шортами больших размеров',
		brandName: 'GrenadeFleur',
		vendorСode: '22092/чернаясетка',
		barCode: '2043604242108',
		saleSum: 0,
		quantity: 0,
		lessReturns: 0,
		costGoodsSold: 0,
		returnsSum: 0,
		returnsQuantity: 0,
		returnsCostSold: 0,
		costPriceOne: 695,
		costOfProductmockStockToday: 321090,
		toClient: 0,
		to_client_sum: 0,
		fromClient: 0,
		from_client_sum: 0,
		commissionWB: 0,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 0,
		marginalProfit: 0,
		averageProfit: 0,
		profitabilityOfProductsSold: 0,
		marginal: 0,
		annualReturnOnInventory: 0,
		lostRevenue: 0,
		basic: 7500,
		maxDiscount: 60,
		minDiscountPrice: 3000,
		orderQuantity: 2,
		orderSum: 4680,
		purchased: 0,
		notPurchased: 0,
		purchasedPercent: 0,
		completed: 0,
		orderCountDay: 0,
		saleCountDay: 0,
		dataRadar: 462,
		dataWB: 462,
		photo: 'https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp',
		nmID: 387795700,
		sku: '11000000',
		size: '3XL(56Rus)',
		category: 'Костюмы купальные',
		costPrice: 695,
		basePrice: 7500,
		discount: 60,
		minPrice: 300000,
		is_self_cost: true,
		byRevenue: 'C',
		byProfit: 'C',
	},
	{
		productName: 'Комплект шелковый халат с сорочкой',
		brandName: 'GrenadeFleur',
		vendorСode: '7013/черный',
		barCode: '2042766627167',
		saleSum: 12662,
		quantity: 5,
		lessReturns: 12662,
		costGoodsSold: 3960,
		returnsSum: 0,
		returnsQuantity: 0,
		returnsCostSold: 0,
		costPriceOne: 792,
		costOfProductmockStockToday: 161568,
		toClient: 5,
		to_client_sum: 1058.63,
		fromClient: 0,
		from_client_sum: 450,
		commissionWB: 3102.18,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 12662,
		marginalProfit: 8702,
		averageProfit: 96,
		profitabilityOfProductsSold: 19.28,
		marginal: 68.73,
		annualReturnOnInventory: 2,
		lostRevenue: 0,
		basic: 7500,
		maxDiscount: 69,
		minDiscountPrice: 2325,
		orderQuantity: 17,
		orderSum: 32984,
		purchased: 5,
		notPurchased: 0,
		purchasedPercent: 100,
		completed: 5,
		orderCountDay: 0,
		saleCountDay: 0.06,
		dataRadar: 204,
		dataWB: 204,
		photo: 'https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp',
		nmID: 22211111,
		sku: '2042766627167',
		size: '1XL',
		category: 'Халаты домашние',
		costPrice: 792,
		basePrice: 7500,
		discount: 69,
		minPrice: 232500,
		is_self_cost: true,
		byRevenue: 'B',
		byProfit: 'C',
	},
	{
		productName: 'Комплект шелковый халат с сорочкой',
		brandName: 'GrenadeFleur',
		vendorСode: '7013/синий',
		barCode: '2042766639177',
		saleSum: 12812,
		quantity: 5,
		lessReturns: 12812,
		costGoodsSold: 3960,
		returnsSum: 0,
		returnsQuantity: 0,
		returnsCostSold: 0,
		costPriceOne: 792,
		costOfProductmockStockToday: 133056,
		toClient: 5,
		to_client_sum: 1143.9,
		fromClient: 0,
		from_client_sum: 550,
		commissionWB: 3138.92,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 12812,
		marginalProfit: 8852,
		averageProfit: 98,
		profitabilityOfProductsSold: 17.13,
		marginal: 69.09,
		annualReturnOnInventory: 2,
		lostRevenue: 0,
		basic: 7500,
		maxDiscount: 69,
		minDiscountPrice: 2325,
		orderQuantity: 17,
		orderSum: 34229.31,
		purchased: 5,
		notPurchased: 0,
		purchasedPercent: 100,
		completed: 5,
		orderCountDay: 0,
		saleCountDay: 0.06,
		dataRadar: 168,
		dataWB: 168,
		photo: 'https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp',
		nmID: 22111111,
		sku: '2042766639177',
		size: '1XL',
		category: 'Халаты домашние',
		costPrice: 792,
		basePrice: 7500,
		discount: 69,
		minPrice: 232500,
		is_self_cost: true,
		byRevenue: 'B',
		byProfit: 'C',
	},
	{
		productName: 'Купальник слитный большой размер',
		brandName: 'GrenadeFleur',
		vendorСode: '24008/черный',
		barCode: '2042780580288',
		saleSum: 11571.96,
		quantity: 4,
		lessReturns: 11571.96,
		costGoodsSold: 3564,
		returnsSum: 0,
		returnsQuantity: 0,
		returnsCostSold: 0,
		costPriceOne: 891,
		costOfProductmockStockToday: 283338,
		toClient: 4,
		to_client_sum: 817.3600000000001,
		fromClient: 0,
		from_client_sum: 500,
		commissionWB: 2835.12,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 11571.96,
		marginalProfit: 8007,
		averageProfit: 88,
		profitabilityOfProductsSold: 20.39,
		marginal: 69.19,
		annualReturnOnInventory: 1,
		lostRevenue: 0,
		basic: 7300,
		maxDiscount: 57,
		minDiscountPrice: 3139,
		orderQuantity: 17,
		orderSum: 40850.53,
		purchased: 4,
		notPurchased: 0,
		purchasedPercent: 100,
		completed: 4,
		orderCountDay: 0,
		saleCountDay: 0.04,
		dataRadar: 318,
		dataWB: 318,
		photo: 'https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp',
		nmID: 11111100,
		sku: '2042780580288',
		size: '2XL(56RUS)',
		category: 'Костюмы купальные',
		costPrice: 891,
		basePrice: 7300,
		discount: 57,
		minPrice: 313900,
		is_self_cost: true,
		byRevenue: 'B',
		byProfit: 'C',
	},
	{
		productName: 'Купальник слитный спортивный эластичный',
		brandName: 'GrenadeFleur',
		vendorСode: '3417/черный',
		barCode: '2041159967989',
		saleSum: 0,
		quantity: 0,
		lessReturns: 0,
		costGoodsSold: 0,
		returnsSum: 0,
		returnsQuantity: 0,
		returnsCostSold: 0,
		costPriceOne: 580,
		costOfProductmockStockToday: 139200,
		toClient: 0,
		to_client_sum: 1236.52,
		fromClient: 0,
		from_client_sum: 950,
		commissionWB: 0,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 0,
		marginalProfit: 0,
		averageProfit: 0,
		profitabilityOfProductsSold: 0,
		marginal: 0,
		annualReturnOnInventory: -3,
		lostRevenue: 0,
		basic: 7200,
		maxDiscount: 77,
		minDiscountPrice: 1656,
		orderQuantity: 20,
		orderSum: 42650.99,
		purchased: 0,
		notPurchased: 0,
		purchasedPercent: 0,
		completed: 0,
		orderCountDay: 0,
		saleCountDay: 0,
		dataRadar: 240,
		dataWB: 240,
		photo: 'https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp',
		nmID: 259486114,
		sku: '11110000',
		size: 'M(46Rus)',
		category: 'Костюмы купальные',
		costPrice: 580,
		basePrice: 7200,
		discount: 77,
		minPrice: 165600,
		is_self_cost: true,
		byRevenue: 'C',
		byProfit: 'C',
	},
	{
		productName: 'Купальник раздельный с высокими шортами',
		brandName: 'GrenadeFleur',
		vendorСode: '22092/бордовый',
		barCode: '2037866795236',
		saleSum: 26305.66,
		quantity: 10,
		lessReturns: 26305.66,
		costGoodsSold: 7670,
		returnsSum: 0,
		returnsQuantity: 0,
		returnsCostSold: 0,
		costPriceOne: 767,
		costOfProductmockStockToday: 18408,
		toClient: 10,
		to_client_sum: 3841.5000000000014,
		fromClient: 0,
		from_client_sum: 1900,
		commissionWB: 6444.88,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 26305.66,
		marginalProfit: 18635,
		averageProfit: 207,
		profitabilityOfProductsSold: 1.23,
		marginal: 70.84,
		annualReturnOnInventory: 2,
		lostRevenue: 0,
		basic: 6400,
		maxDiscount: 64,
		minDiscountPrice: 2304,
		orderQuantity: 48,
		orderSum: 98681.96,
		purchased: 10,
		notPurchased: 0,
		purchasedPercent: 100,
		completed: 10,
		orderCountDay: 0,
		saleCountDay: 0.11,
		dataRadar: 24,
		dataWB: 24,
		photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
		nmID: 162042528,
		sku: '2037866795236',
		size: '2XL(54Rus)',
		category: 'Костюмы купальные',
		costPrice: 767,
		basePrice: 6400,
		discount: 64,
		minPrice: 230400,
		is_self_cost: true,
		byRevenue: 'A',
		byProfit: 'C',
	},
	{
		productName: 'Купальник раздельный с высокими шортами',
		brandName: 'GrenadeFleur',
		vendorСode: '22092/бордовый',
		barCode: '2037866795243',
		saleSum: 31873.13,
		quantity: 12,
		lessReturns: 31873.13,
		costGoodsSold: 9204,
		returnsSum: 0,
		returnsQuantity: 0,
		returnsCostSold: 0,
		costPriceOne: 767,
		costOfProductmockStockToday: 13806,
		toClient: 12,
		to_client_sum: 3280.0600000000013,
		fromClient: 0,
		from_client_sum: 1300,
		commissionWB: 7808.91,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 31873.13,
		marginalProfit: 22669,
		averageProfit: 251,
		profitabilityOfProductsSold: 16.53,
		marginal: 71.12,
		annualReturnOnInventory: 38,
		lostRevenue: 0,
		basic: 6400,
		maxDiscount: 64,
		minDiscountPrice: 2304,
		orderQuantity: 37,
		orderSum: 75464.99,
		purchased: 12,
		notPurchased: 0,
		purchasedPercent: 100,
		completed: 12,
		orderCountDay: 0,
		saleCountDay: 0.13,
		dataRadar: 18,
		dataWB: 18,
		photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
		nmID: 162042528,
		sku: '2037866795243',
		size: '3XL(56Rus)',
		category: 'Костюмы купальные',
		costPrice: 767,
		basePrice: 6400,
		discount: 64,
		minPrice: 230400,
		is_self_cost: true,
		byRevenue: 'A',
		byProfit: 'B',
	},
	{
		productName: 'Купальник раздельный с высокими шортами',
		brandName: 'GrenadeFleur',
		vendorСode: '22092/бордовый',
		barCode: '2037866795250',
		saleSum: 37361.28,
		quantity: 14,
		lessReturns: 37361.28,
		costGoodsSold: 10738,
		returnsSum: 0,
		returnsQuantity: 0,
		returnsCostSold: 0,
		costPriceOne: 767,
		costOfProductmockStockToday: 0,
		toClient: 14,
		to_client_sum: 3924.5400000000022,
		fromClient: 0,
		from_client_sum: 1700,
		commissionWB: 9153.51,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 37361.28,
		marginalProfit: 26623,
		averageProfit: 295,
		profitabilityOfProductsSold: 15.35,
		marginal: 71.26,
		annualReturnOnInventory: 0,
		lostRevenue: 0,
		basic: 6400,
		maxDiscount: 64,
		minDiscountPrice: 2304,
		orderQuantity: 47,
		orderSum: 95103.39,
		purchased: 14,
		notPurchased: 0,
		purchasedPercent: 100,
		completed: 14,
		orderCountDay: 0,
		saleCountDay: 0.16,
		dataRadar: 0,
		dataWB: 0,
		photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
		nmID: 162042528,
		sku: '2037866795250',
		size: '4XL(58Rus)',
		category: 'Костюмы купальные',
		costPrice: 767,
		basePrice: 6400,
		discount: 64,
		minPrice: 230400,
		is_self_cost: true,
		byRevenue: 'A',
		byProfit: 'B',
	},
	{
		productName: 'Купальник раздельный с высокими шортами',
		brandName: 'GrenadeFleur',
		vendorСode: '22092/бордовый',
		barCode: '2037866795267',
		saleSum: 39811.25,
		quantity: 15,
		lessReturns: 37187.25,
		costGoodsSold: 11505,
		returnsSum: 2624,
		returnsQuantity: 1,
		returnsCostSold: 767,
		costPriceOne: 767,
		costOfProductmockStockToday: 50622,
		toClient: 14,
		to_client_sum: 6083.710000000002,
		fromClient: 1,
		from_client_sum: 2800,
		commissionWB: 9110.86,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 37187.25,
		marginalProfit: 25682,
		averageProfit: 285,
		profitabilityOfProductsSold: -4.83,
		marginal: 69.06,
		annualReturnOnInventory: -4,
		lostRevenue: 0,
		basic: 6400,
		maxDiscount: 64,
		minDiscountPrice: 2304,
		orderQuantity: 70,
		orderSum: 144594.31,
		purchased: 15,
		notPurchased: 1,
		purchasedPercent: 93.3,
		completed: 16,
		orderCountDay: 0,
		saleCountDay: 0.16,
		dataRadar: 66,
		dataWB: 66,
		photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
		nmID: 162042528,
		sku: '2037866795267',
		size: '5XL(60Rus)',
		category: 'Костюмы купальные',
		costPrice: 767,
		basePrice: 6400,
		discount: 64,
		minPrice: 230400,
		is_self_cost: true,
		byRevenue: 'A',
		byProfit: 'C',
	},
	{
		productName: 'Купальник раздельный с высокими шортами',
		brandName: 'GrenadeFleur',
		vendorСode: '22092/бордовый',
		barCode: '2037866795274',
		saleSum: 71629.31,
		quantity: 27,
		lessReturns: 71629.31,
		costGoodsSold: 20709,
		returnsSum: 0,
		returnsQuantity: 0,
		returnsCostSold: 0,
		costPriceOne: 767,
		costOfProductmockStockToday: 0,
		toClient: 27,
		to_client_sum: 6094.190000000003,
		fromClient: 0,
		from_client_sum: 2200,
		commissionWB: 17549.16,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 71629.31,
		marginalProfit: 50920,
		averageProfit: 565,
		profitabilityOfProductsSold: 22.2,
		marginal: 71.09,
		annualReturnOnInventory: 0,
		lostRevenue: 0,
		basic: 6400,
		maxDiscount: 64,
		minDiscountPrice: 2304,
		orderQuantity: 67,
		orderSum: 138271.33,
		purchased: 27,
		notPurchased: 0,
		purchasedPercent: 100,
		completed: 27,
		orderCountDay: 0,
		saleCountDay: 0.3,
		dataRadar: 0,
		dataWB: 0,
		photo: 'https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp',
		nmID: 162042528,
		sku: '2037866795274',
		size: '6XL(62Rus)',
		category: 'Костюмы купальные',
		costPrice: 767,
		basePrice: 6400,
		discount: 64,
		minPrice: 230400,
		is_self_cost: true,
		byRevenue: 'A',
		byProfit: 'A',
	},
	{
		productName: 'Купальник танкини больших размеров',
		brandName: 'GrenadeFleur',
		vendorСode: '22092/радужный',
		barCode: '2039511687392',
		saleSum: 18456.56,
		quantity: 9,
		lessReturns: 18456.56,
		costGoodsSold: 6975,
		returnsSum: 0,
		returnsQuantity: 0,
		returnsCostSold: 0,
		costPriceOne: 775,
		costOfProductmockStockToday: 0,
		toClient: 9,
		to_client_sum: 1543.79,
		fromClient: 0,
		from_client_sum: 500,
		commissionWB: 4521.83,
		fines: 0,
		additionalPayment: 0,
		serviceExpenses: 0,
		toPayoff: 18456.56,
		marginalProfit: 11481,
		averageProfit: 127,
		profitabilityOfProductsSold: 14.19,
		marginal: 62.21,
		annualReturnOnInventory: 0,
		lostRevenue: 0,
		basic: 6300,
		maxDiscount: 81,
		minDiscountPrice: 1197,
		orderQuantity: 18,
		orderSum: 29252.78,
		purchased: 9,
		notPurchased: 0,
		purchasedPercent: 100,
		completed: 9,
		orderCountDay: 0,
		saleCountDay: 0.1,
		dataRadar: 0,
		dataWB: 0,
		photo: 'https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp',
		nmID: 11111110,
		sku: '2039511687392',
		size: 'XL(52Rus)',
		category: 'Костюмы купальные',
		costPrice: 775,
		basePrice: 6300,
		discount: 81,
		minPrice: 119700,
		is_self_cost: true,
		byRevenue: 'B',
		byProfit: 'C',
	},
];



export async function mockGetAllShops() {
	return mockShops;
}

function getRange(selectedRange){
    return selectedRange.to ? 'custom' : selectedRange.period;
}

export async function mockGetDashBoard(selectedRange, idShop) {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockDashBoard[19999][getRange(selectedRange)])
        }, 1500)
    })
	return promise;
}

export async function mockGetAbcData(viewType, selectedRange) {
    console.log(viewType, selectedRange)
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockABC[getRange(selectedRange)][viewType])
        }, 1500)
    })
	return promise;
}

export async function mockGetGeographyData(selectedRange) {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockGeo[getRange(selectedRange)])
        }, 500)
    })
	return promise;
}

export async function mockGetAnalysisData() {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockStock)
        }, 1500)
    })
	return promise;
	// return mockStock;
}

export async function mockGetChartDetailData(selectedRange) {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockDetailChartData[getRange(selectedRange)])
        }, 1500)
    })
	return promise;
}