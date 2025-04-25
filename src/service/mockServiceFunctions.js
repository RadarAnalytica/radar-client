import AuthContext from '../service/AuthContext';
import { useContext } from 'react';

const mockShops = [
  {
    "brand_name": "Shop",
    "is_active": true,
    "id": 19999,
    "updated_at": "2025-04-23 08:16:45.163873",
    "is_valid": true,
    "is_primary_collect": true
  },
  {
    "brand_name": "ИП",
    "is_active": true,
    "id": 29999,
    "updated_at": "2025-04-23 08:16:45.163873",
    "is_valid": true,
    "is_primary_collect": true
  }
]

const mockDashBoard = {
  19999: {
      "orderCountList": [ 0, 40, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 54, 41, 62, 48, 47, 95, 88, 60, 117, 82, 70, 72, 87, 25 ],
      "orderAmountList": [ 0, 53273.73, 14015, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62517.9, 76791.19, 57650.4, 83930.27, 66799, 72022, 153645.77, 170122.94, 103383.09, 202928.79, 138563, 115940.32, 130725.45, 165209.77, 44964.56 ],
      "saleCountList": [ 0, 53, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 53, 53, 42, 38, 46, 46, 47, 44, 50, 50, 51, 64, 80, 7 ],
      "saleAmountList": [ 0, 90877, 14004, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50323.81, 87392.53, 86331.16, 65505.3, 45546, 62857.76, 63014.8, 66579.11, 56329.47, 74318.62, 89917.3, 86445.19, 100264.09, 126082.4, 13880 ],
      "orderCount": 1042,
      "orderAmount": 1712483.18,
      "saleCount": 767,
      "saleAmount": 1179668.54,
      "orderCountCompare": "6%",
      "orderAmountCompare": "8%",
      "saleCountCompare": "19%",
      "saleAmountCompare": "11%",
      "buyoutPercent": 100,
      "buyoutPercentCompare": "0%",
      "costPriceAmount": 128372,
      "costPriceAmountCompare": "0%",
      "costPriceCount": 767,
      "returnCount": 0,
      "returnCountCompare": "0%",
      "returnAmount": 0,
      "returnAmountCompare": "0%",
      "averageBill": 1643,
      "averageBillCompare": 1,
      "penalty": 0,
      "additional": 0,
      "commissionWB": 151700.98,
      "commissionWBCompare": "16%",
      "logistics": 52100,
      "logisticsCompare": "6%",
      "proceeds": 1179668.54,
      "proceedsCompare": "11%",
      "marginalProfit": 1051296.54,
      "marginalProfitCompare": "0%",
      "lostSalesCount": 0,
      "lostSalesAmount": 0,
      "grossProfit": 1051296.54,
      "grossProfitCompare": "0%",
      "operatingProfit": 776215.83,
      "operatingProfitCompare": "-4%",
      "netProfit": 776215.83,
      "netProfitCompare": "-4%",
      "averageProfit": 25873.86,
      "averageProfitCompare": "0%",
      "tax": 0,
      "taxCompare": "0%",
      "fbs": { "count": 0, "retail_amount": 0, "cost_amount": 0 },
      "fbo": { "count": 967, "retail_amount": 1938752, "cost_amount": 138633 },
      "toClient": { "count": 407, "retail_amount": 1060997, "cost_amount": 35653 },
      "fromClient": { "count": 64, "retail_amount": 80929, "cost_amount": 7248 },
      "advertAmount": 69811,
      "advertAmountCompare": "13%",
      "advertPercent": 5.9,
      "advertPercentCompare": "0%",
      "commissionWBPercent": 12.9,
      "commissionWBPercentCompare": "4%",
      "logisticsPercent": 4.4,
      "logisticsPercentCompare": "-4%",
      "roi": 192.39,
      "grossProfitAbility": 89.12,
      "operatingProfitAbility": 65.8,
      "ABCAnalysis": { "amountA": 917468.77, "countA": 529, "amountPercentA": 77.77, "countPercentA": 68.97, "amountB": 202051.77, "countB": 189, "amountPercentB": 17.13, "countPercentB": 24.64, "amountC": 60148, "countC": 49, "amountPercentC": 5.1, "countPercentC": 6.39 },
      "storageData": 1468.7269572,
      "storageDataCompare": 39,
      "self_buy": 0,
      "incorrect_attachments": 0,
      "goods_labeling": 0,
      "characteristics_change": 0,
      "acceptance": 0,
      "marginalityRoiChart": [ { "date": "2025-03-25", "roi": 0, "marginality": 0 }, { "date": "2025-03-26", "roi": 687.52, "marginality": 89.68 }, { "date": "2025-03-27", "roi": 1688.24, "marginality": 95.25 }, { "date": "2025-03-28", "roi": 0, "marginality": 0 }, { "date": "2025-03-29", "roi": 0, "marginality": 0 }, { "date": "2025-03-30", "roi": 0, "marginality": 0 }, { "date": "2025-03-31", "roi": 0, "marginality": 0 }, { "date": "2025-04-01", "roi": 0, "marginality": 0 }, { "date": "2025-04-02", "roi": 0, "marginality": 0 }, { "date": "2025-04-03", "roi": 0, "marginality": 0 }, { "date": "2025-04-04", "roi": 0, "marginality": 0 }, { "date": "2025-04-05", "roi": 0, "marginality": 0 }, { "date": "2025-04-06", "roi": 0, "marginality": 0 }, { "date": "2025-04-07", "roi": 0, "marginality": 0 }, { "date": "2025-04-08", "roi": 0, "marginality": 0 }, { "date": "2025-04-09", "roi": 449.97, "marginality": 86.22 }, { "date": "2025-04-10", "roi": 817.73, "marginality": 91.36 }, { "date": "2025-04-11", "roi": 724.05, "marginality": 90.18 }, { "date": "2025-04-12", "roi": 609.13, "marginality": 89.23 }, { "date": "2025-04-13", "roi": 392.59, "marginality": 84.75 }, { "date": "2025-04-14", "roi": 520.58, "marginality": 86.91 }, { "date": "2025-04-15", "roi": 485.86, "marginality": 87.84 }, { "date": "2025-04-16", "roi": 497.62, "marginality": 88.52 }, { "date": "2025-04-17", "roi": 435.23, "marginality": 87.48 }, { "date": "2025-04-18", "roi": 421.96, "marginality": 86.48 }, { "date": "2025-04-19", "roi": 568.28, "marginality": 88.79 }, { "date": "2025-04-20", "roi": 640.16, "marginality": 90.08 }, { "date": "2025-04-21", "roi": 816.94, "marginality": 91.18 }, { "date": "2025-04-22", "roi": 725.16, "marginality": 90.15 }, { "date": "2025-04-23", "roi": 1267.26, "marginality": 94.19 } ],
      "salesAndProfit": [ { "date": "2025-03-25", "sales": 0, "profit": 0 }, { "date": "2025-03-26", "sales": 90877, "profit": 64509.84 }, { "date": "2025-03-27", "sales": 14004, "profit": 11226.79 }, { "date": "2025-03-28", "sales": 0, "profit": 0 }, { "date": "2025-03-29", "sales": 0, "profit": 0 }, { "date": "2025-03-30", "sales": 0, "profit": 0 }, { "date": "2025-03-31", "sales": 0, "profit": 0 }, { "date": "2025-04-01", "sales": 0, "profit": 0 }, { "date": "2025-04-02", "sales": 0, "profit": 0 }, { "date": "2025-04-03", "sales": 0, "profit": 0 }, { "date": "2025-04-04", "sales": 0, "profit": 0 }, { "date": "2025-04-05", "sales": 0, "profit": 0 }, { "date": "2025-04-06", "sales": 0, "profit": 0 }, { "date": "2025-04-07", "sales": 0, "profit": 0 }, { "date": "2025-04-08", "sales": 0, "profit": 0 }, { "date": "2025-04-09", "sales": 50323.81, "profit": 31196.73 }, { "date": "2025-04-10", "sales": 87392.53, "profit": 61738.37 }, { "date": "2025-04-11", "sales": 86331.16, "profit": 61392.35 }, { "date": "2025-04-12", "sales": 65505.3, "profit": 42986.6 }, { "date": "2025-04-13", "sales": 45546, "profit": 27265.44 }, { "date": "2025-04-14", "sales": 62857.76, "profit": 42817.81 }, { "date": "2025-04-15", "sales": 63014.8, "profit": 37240.81 }, { "date": "2025-04-16", "sales": 66579.11, "profit": 38022.91 }, { "date": "2025-04-17", "sales": 56329.47, "profit": 30701.33 }, { "date": "2025-04-18", "sales": 74318.62, "profit": 42402.99 }, { "date": "2025-04-19", "sales": 89917.3, "profit": 57299.99 }, { "date": "2025-04-20", "sales": 86445.19, "profit": 54880.54 }, { "date": "2025-04-21", "sales": 100264.09, "profit": 72242.08 }, { "date": "2025-04-22", "sales": 126082.4, "profit": 90064.46 }, { "date": "2025-04-23", "sales": 13880, "profit": 10226.8 } ],
      "structure": { "retentions": 23.32, "external_expenses": 0, "tax": 0, "profit": 65.8, "costPrice": 10.88 },
      "taxInfo": [ { "wbRealization": 1179668.54, "taxBase": 904587.83, "taxRate": 0, "taxType": "Считать от РС", "taxAmount": 0 } ],
      "revenueByWarehouse": [ { "name": "Белые Столбы", "revenue": 4054.07 }, { "name": "Владикавказ", "revenue": 269646.05 }, { "name": "Екатеринбург - Испытателей 14г", "revenue": 1166.42 }, { "name": "Казань", "revenue": 119683.5 }, { "name": "Коледино", "revenue": 7380.55 }, { "name": "Котовск", "revenue": 55794.16 }, { "name": "Краснодар", "revenue": 149021.94 }, { "name": "Невинномысск", "revenue": 2142.83 }, { "name": "Тула", "revenue": 3450.37 }, { "name": "Чашниково", "revenue": 725.4 }, { "name": "Электросталь", "revenue": 649187.63 } ],
      "is_self_cost": false
  },
  29999: {
    "orderCountList": [
        111,
        134,
        80,
        102,
        88,
        117,
        123,
        116,
        95,
        79,
        115,
        95,
        87,
        85,
        107,
        150,
        96,
        121,
        99,
        101,
        92,
        92,
        91,
        88,
        67,
        83,
        89,
        100,
        89,
        5
    ],
    "orderAmountList": [
        256390.6,
        303573.37,
        179298.53,
        237873.02,
        197572.05,
        272368.31,
        270112,
        284855.91,
        204606.63,
        177680.23,
        276991.14,
        210671.72,
        198158.56,
        199747.26,
        235862.06,
        324783.19,
        211945.59,
        271258.59,
        216003.79,
        222943.63,
        211654.31,
        206593.93,
        202729.92,
        184245.56,
        150915,
        177423.89,
        194291.64,
        219035.21,
        175981.97,
        10587
    ],
    "saleCountList": [
        18,
        33,
        27,
        21,
        24,
        35,
        18,
        24,
        26,
        33,
        26,
        27,
        25,
        14,
        22,
        39,
        25,
        35,
        29,
        29,
        29,
        27,
        27,
        23,
        22,
        23,
        21,
        11,
        18,
        0
    ],
    "saleAmountList": [
        51379.29,
        82711.26,
        68673,
        54248,
        52468,
        91149.57,
        48807,
        64977,
        69666.68,
        91929.69,
        71358.26,
        74500.94,
        67817,
        37256,
        60551.67,
        102530.3,
        61493.1,
        87460,
        79190.01,
        78696.41,
        76578,
        69985.87,
        72795.5,
        55517.22,
        58006.65,
        58388.77,
        43473,
        21719,
        35282.38,
        0
    ],
    "orderCount": 2897,
    "orderAmount": 6486154.61,
    "saleCount": 721,
    "saleAmount": 1890341.57,
    "orderCountCompare": "-21%",
    "orderAmountCompare": "-21%",
    "saleCountCompare": "-23%",
    "saleAmountCompare": "-24%",
    "buyoutPercent": 34.3,
    "buyoutPercentCompare": "3%",
    "costPriceAmount": 535826,
    "costPriceAmountCompare": "0%",
    "costPriceCount": 721,
    "returnCount": 10,
    "returnCountCompare": "-72%",
    "returnAmount": 24860,
    "returnAmountCompare": "-64%",
    "averageBill": 2238,
    "averageBillCompare": 0,
    "penalty": 0,
    "additional": 0,
    "commissionWB": 462284.2000000001,
    "commissionWBCompare": "-24%",
    "logistics": 294535.67,
    "logisticsCompare": "-31%",
    "proceeds": 1890341.57,
    "proceedsCompare": "-24%",
    "marginalProfit": 1354515.57,
    "marginalProfitCompare": "-46%",
    "lostSalesCount": 0,
    "lostSalesAmount": 0,
    "grossProfit": 1354515.57,
    "grossProfitCompare": "-46%",
    "operatingProfit": 426280.04,
    "operatingProfitCompare": "-67%",
    "netProfit": 312859.55,
    "netProfitCompare": "-74%",
    "averageProfit": 10428.65,
    "averageProfitCompare": "0%",
    "tax": 113420.49,
    "taxCompare": "44%",
    "fbs": {
        "count": 0,
        "retail_amount": 0,
        "cost_amount": 0
    },
    "fbo": {
        "count": 5675,
        "retail_amount": 42144250,
        "cost_amount": 3898472
    },
    "toClient": {
        "count": 468,
        "retail_amount": 3446150,
        "cost_amount": 355965
    },
    "fromClient": {
        "count": 299,
        "retail_amount": 1859900,
        "cost_amount": 187445
    },
    "advertAmount": 143675,
    "advertAmountCompare": "12%",
    "advertPercent": 7.6,
    "advertPercentCompare": "49%",
    "commissionWBPercent": 24.5,
    "commissionWBPercentCompare": "0%",
    "logisticsPercent": 15.6,
    "logisticsPercentCompare": "-9%",
    "roi": 21.37,
    "grossProfitAbility": 71.65,
    "operatingProfitAbility": 22.55,
    "ABCAnalysis": {
        "amountA": 1505793.67,
        "countA": 543,
        "amountPercentA": 79.66,
        "countPercentA": 75.31,
        "amountB": 287984.56,
        "countB": 130,
        "amountPercentB": 15.23,
        "countPercentB": 18.03,
        "amountC": 96563.34,
        "countC": 48,
        "amountPercentC": 5.11,
        "countPercentC": 6.66
    },
    "storageData": 27740.664071949934,
    "storageDataCompare": 7,
    "self_buy": 0,
    "incorrect_attachments": 0,
    "goods_labeling": 0,
    "characteristics_change": 0,
    "acceptance": 0,
    "marginalityRoiChart": [
        {
            "date": "2025-03-26",
            "roi": -13.95,
            "marginality": 72.61
        },
        {
            "date": "2025-03-27",
            "roi": 6.25,
            "marginality": 71
        },
        {
            "date": "2025-03-28",
            "roi": 7.04,
            "marginality": 70.8
        },
        {
            "date": "2025-03-29",
            "roi": -6.85,
            "marginality": 71.47
        },
        {
            "date": "2025-03-30",
            "roi": -12.26,
            "marginality": 69.83
        },
        {
            "date": "2025-03-31",
            "roi": 8.05,
            "marginality": 72.18
        },
        {
            "date": "2025-04-01",
            "roi": -17.88,
            "marginality": 71.79
        },
        {
            "date": "2025-04-02",
            "roi": -4.35,
            "marginality": 72.11
        },
        {
            "date": "2025-04-03",
            "roi": 2.81,
            "marginality": 71.89
        },
        {
            "date": "2025-04-04",
            "roi": 14.84,
            "marginality": 72.88
        },
        {
            "date": "2025-04-05",
            "roi": -0.36,
            "marginality": 72.7
        },
        {
            "date": "2025-04-06",
            "roi": 4.63,
            "marginality": 72.43
        },
        {
            "date": "2025-04-07",
            "roi": 1.88,
            "marginality": 72.27
        },
        {
            "date": "2025-04-08",
            "roi": -20.91,
            "marginality": 72.28
        },
        {
            "date": "2025-04-09",
            "roi": 1.92,
            "marginality": 71.61
        },
        {
            "date": "2025-04-10",
            "roi": 12.79,
            "marginality": 71.6
        },
        {
            "date": "2025-04-11",
            "roi": 3.42,
            "marginality": 73.45
        },
        {
            "date": "2025-04-12",
            "roi": 7.36,
            "marginality": 71.83
        },
        {
            "date": "2025-04-13",
            "roi": 15.55,
            "marginality": 72.18
        },
        {
            "date": "2025-04-14",
            "roi": 18.31,
            "marginality": 72.81
        },
        {
            "date": "2025-04-15",
            "roi": 16.8,
            "marginality": 70.83
        },
        {
            "date": "2025-04-16",
            "roi": 15.42,
            "marginality": 73.97
        },
        {
            "date": "2025-04-17",
            "roi": 16.27,
            "marginality": 73.1
        },
        {
            "date": "2025-04-18",
            "roi": 9.83,
            "marginality": 70.61
        },
        {
            "date": "2025-04-19",
            "roi": 16.97,
            "marginality": 72.21
        },
        {
            "date": "2025-04-20",
            "roi": 19.63,
            "marginality": 71.86
        },
        {
            "date": "2025-04-21",
            "roi": 24.08,
            "marginality": 67.42
        },
        {
            "date": "2025-04-22",
            "roi": -9.54,
            "marginality": 61.66
        },
        {
            "date": "2025-04-23",
            "roi": 12.51,
            "marginality": 63.91
        },
        {
            "date": "2025-04-24",
            "roi": -100,
            "marginality": 0
        }
    ],
    "salesAndProfit": [
        {
            "date": "2025-03-26",
            "sales": 51379.29,
            "profit": -7831.29
        },
        {
            "date": "2025-03-27",
            "sales": 82711.26,
            "profit": 4572.54
        },
        {
            "date": "2025-03-28",
            "sales": 68673,
            "profit": 4244.55
        },
        {
            "date": "2025-03-29",
            "sales": 54248,
            "profit": -3747.25
        },
        {
            "date": "2025-03-30",
            "sales": 52468,
            "profit": -6891.15
        },
        {
            "date": "2025-03-31",
            "sales": 91149.57,
            "profit": 6381.29
        },
        {
            "date": "2025-04-01",
            "sales": 48807,
            "profit": -9986.65
        },
        {
            "date": "2025-04-02",
            "sales": 64977,
            "profit": -2777.58
        },
        {
            "date": "2025-04-03",
            "sales": 69666.68,
            "profit": 1792.44
        },
        {
            "date": "2025-04-04",
            "sales": 91929.69,
            "profit": 11163.83
        },
        {
            "date": "2025-04-05",
            "sales": 71358.26,
            "profit": -241.32
        },
        {
            "date": "2025-04-06",
            "sales": 74500.94,
            "profit": 3101.71
        },
        {
            "date": "2025-04-07",
            "sales": 67817,
            "profit": 1174.88
        },
        {
            "date": "2025-04-08",
            "sales": 37256,
            "profit": -9259.63
        },
        {
            "date": "2025-04-09",
            "sales": 60551.67,
            "profit": 1072.45
        },
        {
            "date": "2025-04-10",
            "sales": 102530.3,
            "profit": 10925.79
        },
        {
            "date": "2025-04-11",
            "sales": 61493.1,
            "profit": 1910.83
        },
        {
            "date": "2025-04-12",
            "sales": 87460,
            "profit": 5635.11
        },
        {
            "date": "2025-04-13",
            "sales": 79190.01,
            "profit": 10019.95
        },
        {
            "date": "2025-04-14",
            "sales": 78696.41,
            "profit": 11448.02
        },
        {
            "date": "2025-04-15",
            "sales": 76578,
            "profit": 10352.79
        },
        {
            "date": "2025-04-16",
            "sales": 69985.87,
            "profit": 8787.1
        },
        {
            "date": "2025-04-17",
            "sales": 72795.5,
            "profit": 9576.23
        },
        {
            "date": "2025-04-18",
            "sales": 55517.22,
            "profit": 4669.69
        },
        {
            "date": "2025-04-19",
            "sales": 58006.65,
            "profit": 7911.53
        },
        {
            "date": "2025-04-20",
            "sales": 58388.77,
            "profit": 9006.82
        },
        {
            "date": "2025-04-21",
            "sales": 43473,
            "profit": 8246.77
        },
        {
            "date": "2025-04-22",
            "sales": 21719,
            "profit": -2153.05
        },
        {
            "date": "2025-04-23",
            "sales": 35282.38,
            "profit": 3686.47
        },
        {
            "date": "2025-04-24",
            "sales": 0,
            "profit": 0
        }
    ],
    "structure": {
        "retentions": 60.76,
        "external_expenses": 0,
        "tax": 6,
        "profit": 16.55,
        "costPrice": 28.35
    },
    "taxInfo": [
        {
            "wbRealization": 1890341.57,
            "taxBase": 1890341.57,
            "taxRate": 6,
            "taxType": "УСН-доходы",
            "taxAmount": 113420.49
        }
    ],
    "revenueByWarehouse": [
        {
            "name": "Астана Карагандинское шоссе",
            "revenue": 6592.66
        },
        {
            "name": "Атакент",
            "revenue": 2555.98
        },
        {
            "name": "Белая дача",
            "revenue": 4502.82
        },
        {
            "name": "Волгоград",
            "revenue": 4983
        },
        {
            "name": "Екатеринбург - Испытателей 14г",
            "revenue": 12468.07
        },
        {
            "name": "Казань",
            "revenue": 113335.84
        },
        {
            "name": "Калининград",
            "revenue": 1331.82
        },
        {
            "name": "Коледино",
            "revenue": 201627.43
        },
        {
            "name": "Котовск",
            "revenue": 35459.51
        },
        {
            "name": "Краснодар",
            "revenue": 191808.25
        },
        {
            "name": "Невинномысск",
            "revenue": 14990.5
        },
        {
            "name": "Новосибирск",
            "revenue": 8353.31
        },
        {
            "name": "Подольск",
            "revenue": 2609.28
        },
        {
            "name": "Рязань (Тюшевское)",
            "revenue": 37832.86
        },
        {
            "name": "Санкт-Петербург Уткина Заводь",
            "revenue": 7980.35
        },
        {
            "name": "Тула",
            "revenue": 262513.07
        },
        {
            "name": "Чашниково",
            "revenue": 10569.23
        },
        {
            "name": "Электросталь",
            "revenue": 314427.33
        }
    ],
    "is_self_cost": true
}
}

const mockGeo = {
  "mockStock_data": [ { "mockStockName": "Электросталь", "percent": 55.03, "comparePercent": 55.15, "percentOrder": 30, "comparePercentOrder": -29.64, "orderCount": 223, "orderAmount": 521839.23, "saleCount": 292, "saleAmount": 649187.63, "saleDetails": [ { "district": "Центральный федеральный округ", "amount": 191109.56, "mockStock_percent": 29.4, "common_percent": 16.2 }, { "district": "Сибирский федеральный округ", "amount": 76925.74, "mockStock_percent": 11.8, "common_percent": 6.5 }, { "district": "Южный федеральный округ", "amount": 76082.37, "mockStock_percent": 11.7, "common_percent": 6.4 }, { "district": "Приволжский федеральный округ", "amount": 66936.69, "mockStock_percent": 10.3, "common_percent": 5.7 }, { "district": "Уральский федеральный округ", "amount": 65328.16, "mockStock_percent": 10.1, "common_percent": 5.5 }, { "district": "Северо-Кавказский федеральный округ", "amount": 65301.12, "mockStock_percent": 10.1, "common_percent": 5.5 }, { "district": "Северо-Западный федеральный округ", "amount": 55664.01, "mockStock_percent": 8.6, "common_percent": 4.7 }, { "district": "Дальневосточный федеральный округ", "amount": 42231.72, "mockStock_percent": 6.5, "common_percent": 3.6 }, { "district": "Другой округ", "amount": 9608.26, "mockStock_percent": 1.5, "common_percent": 0.8 } ], "orderDetails": [ { "district": "Центральный федеральный округ", "amount": 191109.56, "mockStock_percent": 36.6, "common_percent": 11.2 }, { "district": "Сибирский федеральный округ", "amount": 76925.74, "mockStock_percent": 14.7, "common_percent": 4.5 }, { "district": "Южный федеральный округ", "amount": 76082.37, "mockStock_percent": 14.6, "common_percent": 4.4 }, { "district": "Приволжский федеральный округ", "amount": 66936.69, "mockStock_percent": 12.8, "common_percent": 3.9 }, { "district": "Уральский федеральный округ", "amount": 65328.16, "mockStock_percent": 12.5, "common_percent": 3.8 }, { "district": "Северо-Кавказский федеральный округ", "amount": 65301.12, "mockStock_percent": 12.5, "common_percent": 3.8 }, { "district": "Северо-Западный федеральный округ", "amount": 55664.01, "mockStock_percent": 10.7, "common_percent": 3.3 }, { "district": "Дальневосточный федеральный округ", "amount": 42231.72, "mockStock_percent": 8.1, "common_percent": 2.5 }, { "district": "Другой округ", "amount": 9608.26, "mockStock_percent": 1.8, "common_percent": 0.6 } ] }, { "mockStockName": "Владикавказ", "percent": 22.86, "comparePercent": 184.08, "percentOrder": 59, "comparePercentOrder": 3888, "orderCount": 446, "orderAmount": 1014956.71, "saleCount": 135, "saleAmount": 269646.05, "saleDetails": [ { "district": "Южный федеральный округ", "amount": 80900.53, "mockStock_percent": 30, "common_percent": 6.9 }, { "district": "Центральный федеральный округ", "amount": 68887.17, "mockStock_percent": 25.5, "common_percent": 5.8 }, { "district": "Северо-Кавказский федеральный округ", "amount": 61044.29, "mockStock_percent": 22.6, "common_percent": 5.2 }, { "district": "Приволжский федеральный округ", "amount": 29289.84, "mockStock_percent": 10.9, "common_percent": 2.5 }, { "district": "Уральский федеральный округ", "amount": 11724.06, "mockStock_percent": 4.3, "common_percent": 1 }, { "district": "Северо-Западный федеральный округ", "amount": 9827.05, "mockStock_percent": 3.6, "common_percent": 0.8 }, { "district": "Другой округ", "amount": 4497.6, "mockStock_percent": 1.7, "common_percent": 0.4 }, { "district": "Сибирский федеральный округ", "amount": 3475.51, "mockStock_percent": 1.3, "common_percent": 0.3 } ], "orderDetails": [ { "district": "Южный федеральный округ", "amount": 80900.53, "mockStock_percent": 8, "common_percent": 4.7 }, { "district": "Центральный федеральный округ", "amount": 68887.17, "mockStock_percent": 6.8, "common_percent": 4 }, { "district": "Северо-Кавказский федеральный округ", "amount": 61044.29, "mockStock_percent": 6, "common_percent": 3.6 }, { "district": "Приволжский федеральный округ", "amount": 29289.84, "mockStock_percent": 2.9, "common_percent": 1.7 }, { "district": "Уральский федеральный округ", "amount": 11724.06, "mockStock_percent": 1.2, "common_percent": 0.7 }, { "district": "Северо-Западный федеральный округ", "amount": 9827.05, "mockStock_percent": 1, "common_percent": 0.6 }, { "district": "Другой округ", "amount": 4497.6, "mockStock_percent": 0.4, "common_percent": 0.3 }, { "district": "Сибирский федеральный округ", "amount": 3475.51, "mockStock_percent": 0.3, "common_percent": 0.2 } ] }, { "mockStockName": "Краснодар", "percent": 12.63, "comparePercent": -71.03, "percentOrder": 10, "comparePercentOrder": -81.05, "orderCount": 159, "orderAmount": 184442.67, "saleCount": 142, "saleAmount": 149021.94, "saleDetails": [ { "district": "Северо-Кавказский федеральный округ", "amount": 45541.55, "mockStock_percent": 30.6, "common_percent": 3.9 }, { "district": "Южный федеральный округ", "amount": 35465.25, "mockStock_percent": 23.8, "common_percent": 3 }, { "district": "Центральный федеральный округ", "amount": 26553.12, "mockStock_percent": 17.8, "common_percent": 2.3 }, { "district": "Уральский федеральный округ", "amount": 17415.87, "mockStock_percent": 11.7, "common_percent": 1.5 }, { "district": "Приволжский федеральный округ", "amount": 10905.35, "mockStock_percent": 7.3, "common_percent": 0.9 }, { "district": "Сибирский федеральный округ", "amount": 4379.92, "mockStock_percent": 2.9, "common_percent": 0.4 }, { "district": "Дальневосточный федеральный округ", "amount": 3495.73, "mockStock_percent": 2.3, "common_percent": 0.3 }, { "district": "Другой округ", "amount": 2798.62, "mockStock_percent": 1.9, "common_percent": 0.2 }, { "district": "Северо-Западный федеральный округ", "amount": 2466.53, "mockStock_percent": 1.7, "common_percent": 0.2 } ], "orderDetails": [ { "district": "Северо-Кавказский федеральный округ", "amount": 45541.55, "mockStock_percent": 24.7, "common_percent": 2.7 }, { "district": "Южный федеральный округ", "amount": 35465.25, "mockStock_percent": 19.2, "common_percent": 2.1 }, { "district": "Центральный федеральный округ", "amount": 26553.12, "mockStock_percent": 14.4, "common_percent": 1.6 }, { "district": "Уральский федеральный округ", "amount": 17415.87, "mockStock_percent": 9.4, "common_percent": 1 }, { "district": "Приволжский федеральный округ", "amount": 10905.35, "mockStock_percent": 5.9, "common_percent": 0.6 }, { "district": "Сибирский федеральный округ", "amount": 4379.92, "mockStock_percent": 2.4, "common_percent": 0.3 }, { "district": "Дальневосточный федеральный округ", "amount": 3495.73, "mockStock_percent": 1.9, "common_percent": 0.2 }, { "district": "Другой округ", "amount": 2798.62, "mockStock_percent": 1.5, "common_percent": 0.2 }, { "district": "Северо-Западный федеральный округ", "amount": 2466.53, "mockStock_percent": 1.3, "common_percent": 0.1 } ] }, { "mockStockName": "Казань", "percent": 10.15, "comparePercent": -35.72, "percentOrder": 5.38, "comparePercentOrder": -65.94, "orderCount": 86, "orderAmount": 92212.87, "saleCount": 121, "saleAmount": 119683.5, "saleDetails": [ { "district": "Приволжский федеральный округ", "amount": 34349.29, "mockStock_percent": 28.7, "common_percent": 2.9 }, { "district": "Центральный федеральный округ", "amount": 21846.36, "mockStock_percent": 18.3, "common_percent": 1.9 }, { "district": "Сибирский федеральный округ", "amount": 19391.32, "mockStock_percent": 16.2, "common_percent": 1.6 }, { "district": "Уральский федеральный округ", "amount": 14998.44, "mockStock_percent": 12.5, "common_percent": 1.3 }, { "district": "Другой округ", "amount": 10554.11, "mockStock_percent": 8.8, "common_percent": 0.9 }, { "district": "Северо-Западный федеральный округ", "amount": 6212.18, "mockStock_percent": 5.2, "common_percent": 0.5 }, { "district": "Дальневосточный федеральный округ", "amount": 5525.97, "mockStock_percent": 4.6, "common_percent": 0.5 }, { "district": "Южный федеральный округ", "amount": 4170.71, "mockStock_percent": 3.5, "common_percent": 0.4 }, { "district": "Северо-Кавказский федеральный округ", "amount": 2635.12, "mockStock_percent": 2.2, "common_percent": 0.2 } ], "orderDetails": [ { "district": "Приволжский федеральный округ", "amount": 34349.29, "mockStock_percent": 37.2, "common_percent": 2 }, { "district": "Центральный федеральный округ", "amount": 21846.36, "mockStock_percent": 23.7, "common_percent": 1.3 }, { "district": "Сибирский федеральный округ", "amount": 19391.32, "mockStock_percent": 21, "common_percent": 1.1 }, { "district": "Уральский федеральный округ", "amount": 14998.44, "mockStock_percent": 16.3, "common_percent": 0.9 }, { "district": "Другой округ", "amount": 10554.11, "mockStock_percent": 11.4, "common_percent": 0.6 }, { "district": "Северо-Западный федеральный округ", "amount": 6212.18, "mockStock_percent": 6.7, "common_percent": 0.4 }, { "district": "Дальневосточный федеральный округ", "amount": 5525.97, "mockStock_percent": 6, "common_percent": 0.3 }, { "district": "Южный федеральный округ", "amount": 4170.71, "mockStock_percent": 4.5, "common_percent": 0.2 }, { "district": "Северо-Кавказский федеральный округ", "amount": 2635.12, "mockStock_percent": 2.9, "common_percent": 0.2 } ] }, { "mockStockName": "Котовск", "percent": 4.73, "comparePercent": 70.71, "percentOrder": 6.95, "comparePercentOrder": 133, "orderCount": 100, "orderAmount": 119081.14, "saleCount": 60, "saleAmount": 55794.16, "saleDetails": [ { "district": "Центральный федеральный округ", "amount": 21627.07, "mockStock_percent": 38.8, "common_percent": 1.8 }, { "district": "Южный федеральный округ", "amount": 11395.99, "mockStock_percent": 20.4, "common_percent": 1 }, { "district": "Северо-Кавказский федеральный округ", "amount": 9625.07, "mockStock_percent": 17.3, "common_percent": 0.8 }, { "district": "Северо-Западный федеральный округ", "amount": 4613.56, "mockStock_percent": 8.3, "common_percent": 0.4 }, { "district": "Приволжский федеральный округ", "amount": 3149.71, "mockStock_percent": 5.6, "common_percent": 0.3 }, { "district": "Уральский федеральный округ", "amount": 2235.1, "mockStock_percent": 4, "common_percent": 0.2 }, { "district": "Другой округ", "amount": 2046.43, "mockStock_percent": 3.7, "common_percent": 0.2 }, { "district": "Сибирский федеральный округ", "amount": 1101.23, "mockStock_percent": 2, "common_percent": 0.1 } ], "orderDetails": [ { "district": "Центральный федеральный округ", "amount": 21627.07, "mockStock_percent": 18.2, "common_percent": 1.3 }, { "district": "Южный федеральный округ", "amount": 11395.99, "mockStock_percent": 9.6, "common_percent": 0.7 }, { "district": "Северо-Кавказский федеральный округ", "amount": 9625.07, "mockStock_percent": 8.1, "common_percent": 0.6 }, { "district": "Северо-Западный федеральный округ", "amount": 4613.56, "mockStock_percent": 3.9, "common_percent": 0.3 }, { "district": "Приволжский федеральный округ", "amount": 3149.71, "mockStock_percent": 2.6, "common_percent": 0.2 }, { "district": "Уральский федеральный округ", "amount": 2235.1, "mockStock_percent": 1.9, "common_percent": 0.1 }, { "district": "Другой округ", "amount": 2046.43, "mockStock_percent": 1.7, "common_percent": 0.1 }, { "district": "Сибирский федеральный округ", "amount": 1101.23, "mockStock_percent": 0.9, "common_percent": 0.1 } ] }, { "mockStockName": "Коледино", "percent": 0.63, "comparePercent": -64.21, "percentOrder": 0.66, "comparePercentOrder": -72.8, "orderCount": 7, "orderAmount": 11247, "saleCount": 6, "saleAmount": 7380.55, "saleDetails": [ { "district": "Центральный федеральный округ", "amount": 3530.9, "mockStock_percent": 47.8, "common_percent": 0.3 }, { "district": "Уральский федеральный округ", "amount": 1509.7, "mockStock_percent": 20.5, "common_percent": 0.1 }, { "district": "Приволжский федеральный округ", "amount": 1117.53, "mockStock_percent": 15.1, "common_percent": 0.1 }, { "district": "Северо-Кавказский федеральный округ", "amount": 633.6, "mockStock_percent": 8.6, "common_percent": 0.1 }, { "district": "Другой округ", "amount": 588.82, "mockStock_percent": 8, "common_percent": 0 } ], "orderDetails": [ { "district": "Центральный федеральный округ", "amount": 3530.9, "mockStock_percent": 31.4, "common_percent": 0.2 }, { "district": "Уральский федеральный округ", "amount": 1509.7, "mockStock_percent": 13.4, "common_percent": 0.1 }, { "district": "Приволжский федеральный округ", "amount": 1117.53, "mockStock_percent": 9.9, "common_percent": 0.1 }, { "district": "Северо-Кавказский федеральный округ", "amount": 633.6, "mockStock_percent": 5.6, "common_percent": 0 }, { "district": "Другой округ", "amount": 588.82, "mockStock_percent": 5.2, "common_percent": 0 } ] }, { "mockStockName": "Белые Столбы", "percent": 0.34, "comparePercent": 100, "percentOrder": 0.27, "comparePercentOrder": -8.98, "orderCount": 4, "orderAmount": 4549.92, "saleCount": 4, "saleAmount": 4054.07, "saleDetails": [ { "district": "Центральный федеральный округ", "amount": 4054.07, "mockStock_percent": 100, "common_percent": 0.3 } ], "orderDetails": [ { "district": "Центральный федеральный округ", "amount": 4054.07, "mockStock_percent": 89.1, "common_percent": 0.2 } ] }, { "mockStockName": "Тула", "percent": 0.29, "comparePercent": -38.77, "percentOrder": 0.32, "comparePercentOrder": 118, "orderCount": 4, "orderAmount": 5438, "saleCount": 3, "saleAmount": 3450.37, "saleDetails": [ { "district": "Центральный федеральный округ", "amount": 2283.95, "mockStock_percent": 66.2, "common_percent": 0.2 }, { "district": "Северо-Кавказский федеральный округ", "amount": 1166.42, "mockStock_percent": 33.8, "common_percent": 0.1 } ], "orderDetails": [ { "district": "Центральный федеральный округ", "amount": 2283.95, "mockStock_percent": 42, "common_percent": 0.1 }, { "district": "Северо-Кавказский федеральный округ", "amount": 1166.42, "mockStock_percent": 21.4, "common_percent": 0.1 } ] }, { "mockStockName": "Невинномысск", "percent": 0.18, "comparePercent": -45.97, "percentOrder": 0.67, "comparePercentOrder": 51, "orderCount": 9, "orderAmount": 11403.37, "saleCount": 2, "saleAmount": 2142.83, "saleDetails": [ { "district": "Северо-Кавказский федеральный округ", "amount": 1101.23, "mockStock_percent": 51.4, "common_percent": 0.1 }, { "district": "Центральный федеральный округ", "amount": 1041.6, "mockStock_percent": 48.6, "common_percent": 0.1 } ], "orderDetails": [ { "district": "Северо-Кавказский федеральный округ", "amount": 1101.23, "mockStock_percent": 9.7, "common_percent": 0.1 }, { "district": "Центральный федеральный округ", "amount": 1041.6, "mockStock_percent": 9.1, "common_percent": 0.1 } ] }, { "mockStockName": "Екатеринбург - Испытателей 14г", "percent": 0.1, "comparePercent": 100, "percentOrder": 0, "comparePercentOrder": 100, "orderCount": 0, "orderAmount": 0, "saleCount": 1, "saleAmount": 1166.42, "saleDetails": [ { "district": "Уральский федеральный округ", "amount": 1166.42, "mockStock_percent": 100, "common_percent": 0.1 } ], "orderDetails": [ { "district": "Уральский федеральный округ", "amount": 1166.42, "mockStock_percent": 0, "common_percent": 0.1 } ] }, { "mockStockName": "Чашниково", "percent": 0.06, "comparePercent": 100, "percentOrder": 0.05, "comparePercentOrder": -71.78, "orderCount": 1, "orderAmount": 936, "saleCount": 1, "saleAmount": 725.4, "saleDetails": [ { "district": "Центральный федеральный округ", "amount": 725.4, "mockStock_percent": 100, "common_percent": 0.1 } ], "orderDetails": [ { "district": "Центральный федеральный округ", "amount": 725.4, "mockStock_percent": 77.5, "common_percent": 0 } ] }, { "mockStockName": "Астана Карагандинское шоссе", "percent": 0, "comparePercent": 100, "percentOrder": 0.08, "comparePercentOrder": -28.54, "orderCount": 1, "orderAmount": 1421, "saleCount": 0, "saleAmount": 0, "saleDetails": [], "orderDetails": [] }, { "mockStockName": "Волгоград", "percent": 0, "comparePercent": 100, "percentOrder": 0.09, "comparePercentOrder": 100, "orderCount": 1, "orderAmount": 1505, "saleCount": 0, "saleAmount": 0, "saleDetails": [], "orderDetails": [] }, { "mockStockName": "Виртуальный Грозный", "percent": 0, "comparePercent": 100, "percentOrder": 0.05, "comparePercentOrder": 100, "orderCount": 1, "orderAmount": 936, "saleCount": 0, "saleAmount": 0, "saleDetails": [], "orderDetails": [] } ], "geo_data": [ { "districtName": "Центральный федеральный округ", "percent": 27, "comparePercent": -28.88, "percentOrder": 25, "comparePercentOrder": -24.32, "orderCount": 252, "orderAmount": 433970, "saleCount": 199, "saleAmount": 318812 }, { "districtName": "Южный федеральный округ", "percent": 16, "comparePercent": 9.85, "percentOrder": 18, "comparePercentOrder": 29, "orderCount": 187, "orderAmount": 309199, "saleCount": 129, "saleAmount": 199896 }, { "districtName": "Северо-Кавказский федеральный округ", "percent": 15, "comparePercent": 58, "percentOrder": 15, "comparePercentOrder": 1.57, "orderCount": 163, "orderAmount": 270487, "saleCount": 114, "saleAmount": 177157 }, { "districtName": "Приволжский федеральный округ", "percent": 11, "comparePercent": -4.19, "percentOrder": 11, "comparePercentOrder": 31, "orderCount": 131, "orderAmount": 197080, "saleCount": 98, "saleAmount": 135145 }, { "districtName": "Уральский федеральный округ", "percent": 8.85, "comparePercent": 39, "percentOrder": 9.27, "comparePercentOrder": 14, "orderCount": 102, "orderAmount": 158717, "saleCount": 70, "saleAmount": 104443 }, { "districtName": "Сибирский федеральный округ", "percent": 8.21, "comparePercent": 35, "percentOrder": 7.62, "comparePercentOrder": 32, "orderCount": 72, "orderAmount": 130455, "saleCount": 61, "saleAmount": 96887 }, { "districtName": "Северо-Западный федеральный округ", "percent": 6.12, "comparePercent": -23.54, "percentOrder": 5.75, "comparePercentOrder": -14.62, "orderCount": 56, "orderAmount": 98550, "saleCount": 41, "saleAmount": 72226 }, { "districtName": "Дальневосточный федеральный округ", "percent": 3.95, "comparePercent": 20, "percentOrder": 4.15, "comparePercentOrder": -17.5, "orderCount": 38, "orderAmount": 71092, "saleCount": 25, "saleAmount": 46572 }, { "districtName": "Другой округ", "percent": 2.42, "comparePercent": 63, "percentOrder": 2.51, "comparePercentOrder": -4.95, "orderCount": 41, "orderAmount": 42933.18, "saleCount": 30, "saleAmount": 28530.54 } ] 
}

const mockABC = {
  'proceeds': {
    "results": [
        {
            "title": "Комплект шелковый халат с сорочкой",
            "wb_id": 22211111,
            "supplier_id": "7013/черный",
            "amount": 35911.57,
            "amount_percent": 2.91,
            "photo": "https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp",
            "category": "A"
        },
        {
            "title": "Комплект шелковый халат с сорочкой",
            "wb_id": 22111111,
            "supplier_id": "7013/синий",
            "amount": 34779.05,
            "amount_percent": 2.82,
            "photo": "https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp",
            "category": "A"
        },
        {
            "title": "Пижама шелковая с шортами красивая",
            "wb_id": 21111111,
            "supplier_id": "6800/зеленаявишня",
            "amount": 33581.84,
            "amount_percent": 2.72,
            "photo": "https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp",
            "category": "A"
        },
        {
            "title": "Купальник раздельный с высокими шортами",
            "wb_id": 11111111,
            "supplier_id": "22092/бордовый",
            "amount": 25223.56,
            "amount_percent": 2.04,
            "photo": "https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp",
            "category": "A"
        },
        {
            "title": "Купальник танкини больших размеров",
            "wb_id": 11111110,
            "supplier_id": "22092/радужный",
            "amount": 23848.08,
            "amount_percent": 1.93,
            "photo": "https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp",
            "category": "A"
        },
        {
            "title": "Купальник слитный большой размер",
            "wb_id": 11111100,
            "supplier_id": "24008/черный",
            "amount": 23423.81,
            "amount_percent": 1.9,
            "photo": "https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp",
            "category": "B"
        },
        {
            "title": "Пижама шелковая с шортами",
            "wb_id": 11111000,
            "supplier_id": "6800/синий",
            "amount": 11655.68,
            "amount_percent": 0.94,
            "photo": "https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp",
            "category": "B"
        },
        {
            "title": "Купальник слитный спортивный эластичный",
            "wb_id": 11110000,
            "supplier_id": "3417/черный",
            "amount": 5327.28,
            "amount_percent": 0.43,
            "photo": "https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp",
            "category": "C"
        },
        {
            "title": "Слитный купальник для плавания",
            "wb_id": 100000000,
            "supplier_id": "3417/малиновый",
            "amount": 3426.85,
            "amount_percent": 0.28,
            "photo": "https://basket-16.wbbasket.ru/vol2594/part259486/259486755/images/c246x328/1.webp",
            "category": "C"
        },
        {
            "title": "Раздельный купальник шортами больших размеров",
            "wb_id": 11000000,
            "supplier_id": "22092/чернаясетка",
            "amount": 2310.3,
            "amount_percent": 0.19,
            "photo": "https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp",
            "category": "C"
        },
        {
            "title": "Сорочка шелковая больших размеров",
            "wb_id": 11100000,
            "supplier_id": "H260/черная",
            "amount": 1322.76,
            "amount_percent": 0.11,
            "photo": "https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp",
            "category": "C"
        }
    ],
    "is_need_cost": false
  },
  'profit': {
      "results": [
          {
              "title": "Пижама шелковая с шортами красивая",
              "wb_id": 21111111,
              "supplier_id": "6800/зеленаявишня",
              "amount": 7793.21,
              "amount_percent": 2.25,
              "photo": "https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp",
              "category": "A"
          },
          {
              "title": "Комплект шелковый халат с сорочкой",
              "wb_id": 22111111,
              "supplier_id": "7013/синий",
              "amount": 7763.68,
              "amount_percent": 2.24,
              "photo": "https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp",
              "category": "B"
          },
          {
              "title": "Купальник раздельный с высокими шортами",
              "wb_id": 11111111,
              "supplier_id": "22092/бордовый",
              "amount": 7153.02,
              "amount_percent": 2.07,
              "photo": "https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp",
              "category": "B"
          },
          {
              "title": "Комплект шелковый халат с сорочкой",
              "wb_id": 22211111,
              "supplier_id": "7013/черный",
              "amount": 6644.05,
              "amount_percent": 1.92,
              "photo": "https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp",
              "category": "B"
          },
          {
              "title": "Купальник слитный большой размер",
              "wb_id": 11111100,
              "supplier_id": "24008/черный",
              "amount": 5071.98,
              "amount_percent": 1.46,
              "photo": "https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp",
              "category": "B"
          },
          {
              "title": "Пижама шелковая с шортами",
              "wb_id": 11111000,
              "supplier_id": "6800/синий",
              "amount": 3410.69,
              "amount_percent": 0.98,
              "photo": "https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp",
              "category": "C"
          },
          {
              "title": "Купальник слитный большой размер",
              "wb_id": 224668926,
              "supplier_id": "24008/белыйцветок",
              "amount": 3115.37,
              "amount_percent": 0.9,
              "photo": "https://basket-15.wbbasket.ru/vol2246/part224668/224668926/images/c246x328/1.webp",
              "category": "C"
          },
          {
              "title": "Купальник танкини больших размеров",
              "wb_id": 11111110,
              "supplier_id": "22092/радужный",
              "amount": 2593.03,
              "amount_percent": 0.75,
              "photo": "https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp",
              "category": "C"
          },
          {
              "title": "Сорочка шелковая больших размеров",
              "wb_id": 11100000,
              "supplier_id": "H260/черная",
              "amount": 263.66,
              "amount_percent": 0.08,
              "photo": "https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp",
              "category": "C"
          },
          {
              "title": "Купальник слитный спортивный эластичный",
              "wb_id": 11110000,
              "supplier_id": "3417/черный",
              "amount": 7.3,
              "amount_percent": 0,
              "photo": "https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp",
              "category": "C"
          },
          {
              "title": "Раздельный купальник шортами больших размеров",
              "wb_id": 11000000,
              "supplier_id": "22092/чернаясетка",
              "amount": -293.11,
              "amount_percent": 0,
              "photo": "https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp",
              "category": "C"
          },
          {
              "title": "Слитный купальник для плавания",
              "wb_id": 100000000,
              "supplier_id": "3417/малиновый",
              "amount": -2523.41,
              "amount_percent": 0,
              "photo": "https://basket-16.wbbasket.ru/vol2594/part259486/259486755/images/c246x328/1.webp",
              "category": "C"
          }
      ],
      "is_need_cost": false
  }
}

const mockStock = [
  {
      "productName": "Сорочка шелковая больших размеров",
      "brandName": "GrenadeFleur",
      "vendorСode": "H260/черная",
      "barCode": "2038988007733",
      "saleSum": 10818.6,
      "quantity": 5,
      "lessReturns": 8555.6,
      "costGoodsSold": 3405,
      "returnsSum": 2263,
      "returnsQuantity": 1,
      "returnsCostSold": 681,
      "costPriceOne": 681,
      "costOfProductmockStockToday": 0,
      "toClient": 4,
      "to_client_sum": 451.4,
      "fromClient": 1,
      "from_client_sum": 150,
      "commissionWB": 2096.11,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 8555.6,
      "marginalProfit": 5150,
      "averageProfit": 57,
      "profitabilityOfProductsSold": 20.29,
      "marginal": 60.19,
      "annualReturnOnInventory": 0,
      "lostRevenue": 0,
      "basic": 7300,
      "maxDiscount": 77,
      "minDiscountPrice": 1679,
      "orderQuantity": 4,
      "orderSum": 6735,
      "purchased": 5,
      "notPurchased": 1,
      "purchasedPercent": 80,
      "completed": 6,
      "orderCountDay": 0,
      "saleCountDay": 0.04,
      "dataRadar": 0,
      "dataWB": 0,
      "photo": "https://basket-12.wbbasket.ru/vol1898/part189869/189869388/images/c246x328/1.webp",
      "nmID": 189869388,
      "sku": "11100000",
      "size": "2XL(56RUS)",
      "category": "Ночные сорочки",
      "costPrice": 681,
      "basePrice": 7300,
      "discount": 77,
      "minPrice": 167900,
      "is_self_cost": true,
      "byRevenue": "C",
      "byProfit": "C"
  },
  {
      "productName": "Пижама шелковая с шортами",
      "brandName": "GrenadeFleur",
      "vendorСode": "6800/синий",
      "barCode": "2040959790551",
      "saleSum": 22492.99,
      "quantity": 11,
      "lessReturns": 22492.99,
      "costGoodsSold": 5940,
      "returnsSum": 0,
      "returnsQuantity": 0,
      "returnsCostSold": 0,
      "costPriceOne": 540,
      "costOfProductmockStockToday": 64800,
      "toClient": 11,
      "to_client_sum": 1317.57,
      "fromClient": 0,
      "from_client_sum": 500,
      "commissionWB": 5510.77,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 22492.99,
      "marginalProfit": 16552,
      "averageProfit": 183,
      "profitabilityOfProductsSold": 31.48,
      "marginal": 73.59,
      "annualReturnOnInventory": 11,
      "lostRevenue": 0,
      "basic": 8300,
      "maxDiscount": 80,
      "minDiscountPrice": 1660,
      "orderQuantity": 23,
      "orderSum": 35171.84,
      "purchased": 11,
      "notPurchased": 0,
      "purchasedPercent": 100,
      "completed": 11,
      "orderCountDay": 0,
      "saleCountDay": 0.12,
      "dataRadar": 120,
      "dataWB": 120,
      "photo": "https://basket-16.wbbasket.ru/vol2435/part243594/243594134/images/c246x328/1.webp",
      "nmID": 243594134,
      "sku": "11111000",
      "size": "L(54Rus)",
      "category": "Пижамы",
      "costPrice": 540,
      "basePrice": 8300,
      "discount": 80,
      "minPrice": 166000,
      "is_self_cost": true,
      "byRevenue": "B",
      "byProfit": "B"
  },
  {
      "productName": "Пижама шелковая с шортами красивая",
      "brandName": "GrenadeFleur",
      "vendorСode": "6800/зеленаявишня",
      "barCode": "2040960085783",
      "saleSum": 41795.89,
      "quantity": 23,
      "lessReturns": 41795.89,
      "costGoodsSold": 12420,
      "returnsSum": 0,
      "returnsQuantity": 0,
      "returnsCostSold": 0,
      "costPriceOne": 540,
      "costOfProductmockStockToday": 100440,
      "toClient": 23,
      "to_client_sum": 2553.06,
      "fromClient": 0,
      "from_client_sum": 1200,
      "commissionWB": 10239.99,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 41795.89,
      "marginalProfit": 29375,
      "averageProfit": 326,
      "profitabilityOfProductsSold": 26.65,
      "marginal": 70.28,
      "annualReturnOnInventory": 11,
      "lostRevenue": 0,
      "basic": 8000,
      "maxDiscount": 78,
      "minDiscountPrice": 1760,
      "orderQuantity": 52,
      "orderSum": 75422.29,
      "purchased": 23,
      "notPurchased": 0,
      "purchasedPercent": 100,
      "completed": 23,
      "orderCountDay": 0,
      "saleCountDay": 0.26,
      "dataRadar": 186,
      "dataWB": 186,
      "photo": "https://basket-16.wbbasket.ru/vol2538/part253821/253821474/images/c246x328/1.webp",
      "nmID": 21111111,
      "sku": "2040960085783",
      "size": "1XL(56Rus)",
      "category": "Пижамы",
      "costPrice": 540,
      "basePrice": 8000,
      "discount": 78,
      "minPrice": 176000,
      "is_self_cost": true,
      "byRevenue": "A",
      "byProfit": "A"
  },
  {
      "productName": "Раздельный купальник шортами больших размеров",
      "brandName": "GrenadeFleur",
      "vendorСode": "22092/чернаясетка",
      "barCode": "2043604242108",
      "saleSum": 0,
      "quantity": 0,
      "lessReturns": 0,
      "costGoodsSold": 0,
      "returnsSum": 0,
      "returnsQuantity": 0,
      "returnsCostSold": 0,
      "costPriceOne": 695,
      "costOfProductmockStockToday": 321090,
      "toClient": 0,
      "to_client_sum": 0,
      "fromClient": 0,
      "from_client_sum": 0,
      "commissionWB": 0,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 0,
      "marginalProfit": 0,
      "averageProfit": 0,
      "profitabilityOfProductsSold": 0,
      "marginal": 0,
      "annualReturnOnInventory": 0,
      "lostRevenue": 0,
      "basic": 7500,
      "maxDiscount": 60,
      "minDiscountPrice": 3000,
      "orderQuantity": 2,
      "orderSum": 4680,
      "purchased": 0,
      "notPurchased": 0,
      "purchasedPercent": 0,
      "completed": 0,
      "orderCountDay": 0,
      "saleCountDay": 0,
      "dataRadar": 462,
      "dataWB": 462,
      "photo": "https://basket-22.wbbasket.ru/vol3877/part387795/387795700/images/c246x328/1.webp",
      "nmID": 387795700,
      "sku": "11000000",
      "size": "3XL(56Rus)",
      "category": "Костюмы купальные",
      "costPrice": 695,
      "basePrice": 7500,
      "discount": 60,
      "minPrice": 300000,
      "is_self_cost": true,
      "byRevenue": "C",
      "byProfit": "C"
  },
  {
      "productName": "Комплект шелковый халат с сорочкой",
      "brandName": "GrenadeFleur",
      "vendorСode": "7013/черный",
      "barCode": "2042766627167",
      "saleSum": 12662,
      "quantity": 5,
      "lessReturns": 12662,
      "costGoodsSold": 3960,
      "returnsSum": 0,
      "returnsQuantity": 0,
      "returnsCostSold": 0,
      "costPriceOne": 792,
      "costOfProductmockStockToday": 161568,
      "toClient": 5,
      "to_client_sum": 1058.63,
      "fromClient": 0,
      "from_client_sum": 450,
      "commissionWB": 3102.18,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 12662,
      "marginalProfit": 8702,
      "averageProfit": 96,
      "profitabilityOfProductsSold": 19.28,
      "marginal": 68.73,
      "annualReturnOnInventory": 2,
      "lostRevenue": 0,
      "basic": 7500,
      "maxDiscount": 69,
      "minDiscountPrice": 2325,
      "orderQuantity": 17,
      "orderSum": 32984,
      "purchased": 5,
      "notPurchased": 0,
      "purchasedPercent": 100,
      "completed": 5,
      "orderCountDay": 0,
      "saleCountDay": 0.06,
      "dataRadar": 204,
      "dataWB": 204,
      "photo": "https://basket-19.wbbasket.ru/vol3269/part326903/326903694/images/c246x328/1.webp",
      "nmID": 22211111,
      "sku": "2042766627167",
      "size": "1XL",
      "category": "Халаты домашние",
      "costPrice": 792,
      "basePrice": 7500,
      "discount": 69,
      "minPrice": 232500,
      "is_self_cost": true,
      "byRevenue": "B",
      "byProfit": "C"
  },
  {
      "productName": "Комплект шелковый халат с сорочкой",
      "brandName": "GrenadeFleur",
      "vendorСode": "7013/синий",
      "barCode": "2042766639177",
      "saleSum": 12812,
      "quantity": 5,
      "lessReturns": 12812,
      "costGoodsSold": 3960,
      "returnsSum": 0,
      "returnsQuantity": 0,
      "returnsCostSold": 0,
      "costPriceOne": 792,
      "costOfProductmockStockToday": 133056,
      "toClient": 5,
      "to_client_sum": 1143.9,
      "fromClient": 0,
      "from_client_sum": 550,
      "commissionWB": 3138.92,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 12812,
      "marginalProfit": 8852,
      "averageProfit": 98,
      "profitabilityOfProductsSold": 17.13,
      "marginal": 69.09,
      "annualReturnOnInventory": 2,
      "lostRevenue": 0,
      "basic": 7500,
      "maxDiscount": 69,
      "minDiscountPrice": 2325,
      "orderQuantity": 17,
      "orderSum": 34229.31,
      "purchased": 5,
      "notPurchased": 0,
      "purchasedPercent": 100,
      "completed": 5,
      "orderCountDay": 0,
      "saleCountDay": 0.06,
      "dataRadar": 168,
      "dataWB": 168,
      "photo": "https://basket-19.wbbasket.ru/vol3269/part326905/326905188/images/c246x328/1.webp",
      "nmID": 22111111,
      "sku": "2042766639177",
      "size": "1XL",
      "category": "Халаты домашние",
      "costPrice": 792,
      "basePrice": 7500,
      "discount": 69,
      "minPrice": 232500,
      "is_self_cost": true,
      "byRevenue": "B",
      "byProfit": "C"
  },
  {
      "productName": "Купальник слитный большой размер",
      "brandName": "GrenadeFleur",
      "vendorСode": "24008/черный",
      "barCode": "2042780580288",
      "saleSum": 11571.96,
      "quantity": 4,
      "lessReturns": 11571.96,
      "costGoodsSold": 3564,
      "returnsSum": 0,
      "returnsQuantity": 0,
      "returnsCostSold": 0,
      "costPriceOne": 891,
      "costOfProductmockStockToday": 283338,
      "toClient": 4,
      "to_client_sum": 817.3600000000001,
      "fromClient": 0,
      "from_client_sum": 500,
      "commissionWB": 2835.12,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 11571.96,
      "marginalProfit": 8007,
      "averageProfit": 88,
      "profitabilityOfProductsSold": 20.39,
      "marginal": 69.19,
      "annualReturnOnInventory": 1,
      "lostRevenue": 0,
      "basic": 7300,
      "maxDiscount": 57,
      "minDiscountPrice": 3139,
      "orderQuantity": 17,
      "orderSum": 40850.53,
      "purchased": 4,
      "notPurchased": 0,
      "purchasedPercent": 100,
      "completed": 4,
      "orderCountDay": 0,
      "saleCountDay": 0.04,
      "dataRadar": 318,
      "dataWB": 318,
      "photo": "https://basket-20.wbbasket.ru/vol3277/part327739/327739022/images/c246x328/1.webp",
      "nmID": 11111100,
      "sku": "2042780580288",
      "size": "2XL(56RUS)",
      "category": "Костюмы купальные",
      "costPrice": 891,
      "basePrice": 7300,
      "discount": 57,
      "minPrice": 313900,
      "is_self_cost": true,
      "byRevenue": "B",
      "byProfit": "C"
  },
  {
      "productName": "Купальник слитный спортивный эластичный",
      "brandName": "GrenadeFleur",
      "vendorСode": "3417/черный",
      "barCode": "2041159967989",
      "saleSum": 0,
      "quantity": 0,
      "lessReturns": 0,
      "costGoodsSold": 0,
      "returnsSum": 0,
      "returnsQuantity": 0,
      "returnsCostSold": 0,
      "costPriceOne": 580,
      "costOfProductmockStockToday": 139200,
      "toClient": 0,
      "to_client_sum": 1236.52,
      "fromClient": 0,
      "from_client_sum": 950,
      "commissionWB": 0,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 0,
      "marginalProfit": 0,
      "averageProfit": 0,
      "profitabilityOfProductsSold": 0,
      "marginal": 0,
      "annualReturnOnInventory": -3,
      "lostRevenue": 0,
      "basic": 7200,
      "maxDiscount": 77,
      "minDiscountPrice": 1656,
      "orderQuantity": 20,
      "orderSum": 42650.99,
      "purchased": 0,
      "notPurchased": 0,
      "purchasedPercent": 0,
      "completed": 0,
      "orderCountDay": 0,
      "saleCountDay": 0,
      "dataRadar": 240,
      "dataWB": 240,
      "photo": "https://basket-16.wbbasket.ru/vol2594/part259486/259486114/images/c246x328/1.webp",
      "nmID": 259486114,
      "sku": "11110000",
      "size": "M(46Rus)",
      "category": "Костюмы купальные",
      "costPrice": 580,
      "basePrice": 7200,
      "discount": 77,
      "minPrice": 165600,
      "is_self_cost": true,
      "byRevenue": "C",
      "byProfit": "C"
  },
  {
      "productName": "Купальник раздельный с высокими шортами",
      "brandName": "GrenadeFleur",
      "vendorСode": "22092/бордовый",
      "barCode": "2037866795236",
      "saleSum": 26305.66,
      "quantity": 10,
      "lessReturns": 26305.66,
      "costGoodsSold": 7670,
      "returnsSum": 0,
      "returnsQuantity": 0,
      "returnsCostSold": 0,
      "costPriceOne": 767,
      "costOfProductmockStockToday": 18408,
      "toClient": 10,
      "to_client_sum": 3841.5000000000014,
      "fromClient": 0,
      "from_client_sum": 1900,
      "commissionWB": 6444.88,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 26305.66,
      "marginalProfit": 18635,
      "averageProfit": 207,
      "profitabilityOfProductsSold": 1.23,
      "marginal": 70.84,
      "annualReturnOnInventory": 2,
      "lostRevenue": 0,
      "basic": 6400,
      "maxDiscount": 64,
      "minDiscountPrice": 2304,
      "orderQuantity": 48,
      "orderSum": 98681.96,
      "purchased": 10,
      "notPurchased": 0,
      "purchasedPercent": 100,
      "completed": 10,
      "orderCountDay": 0,
      "saleCountDay": 0.11,
      "dataRadar": 24,
      "dataWB": 24,
      "photo": "https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp",
      "nmID": 162042528,
      "sku": "2037866795236",
      "size": "2XL(54Rus)",
      "category": "Костюмы купальные",
      "costPrice": 767,
      "basePrice": 6400,
      "discount": 64,
      "minPrice": 230400,
      "is_self_cost": true,
      "byRevenue": "A",
      "byProfit": "C"
  },
  {
      "productName": "Купальник раздельный с высокими шортами",
      "brandName": "GrenadeFleur",
      "vendorСode": "22092/бордовый",
      "barCode": "2037866795243",
      "saleSum": 31873.13,
      "quantity": 12,
      "lessReturns": 31873.13,
      "costGoodsSold": 9204,
      "returnsSum": 0,
      "returnsQuantity": 0,
      "returnsCostSold": 0,
      "costPriceOne": 767,
      "costOfProductmockStockToday": 13806,
      "toClient": 12,
      "to_client_sum": 3280.0600000000013,
      "fromClient": 0,
      "from_client_sum": 1300,
      "commissionWB": 7808.91,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 31873.13,
      "marginalProfit": 22669,
      "averageProfit": 251,
      "profitabilityOfProductsSold": 16.53,
      "marginal": 71.12,
      "annualReturnOnInventory": 38,
      "lostRevenue": 0,
      "basic": 6400,
      "maxDiscount": 64,
      "minDiscountPrice": 2304,
      "orderQuantity": 37,
      "orderSum": 75464.99,
      "purchased": 12,
      "notPurchased": 0,
      "purchasedPercent": 100,
      "completed": 12,
      "orderCountDay": 0,
      "saleCountDay": 0.13,
      "dataRadar": 18,
      "dataWB": 18,
      "photo": "https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp",
      "nmID": 162042528,
      "sku": "2037866795243",
      "size": "3XL(56Rus)",
      "category": "Костюмы купальные",
      "costPrice": 767,
      "basePrice": 6400,
      "discount": 64,
      "minPrice": 230400,
      "is_self_cost": true,
      "byRevenue": "A",
      "byProfit": "B"
  },
  {
      "productName": "Купальник раздельный с высокими шортами",
      "brandName": "GrenadeFleur",
      "vendorСode": "22092/бордовый",
      "barCode": "2037866795250",
      "saleSum": 37361.28,
      "quantity": 14,
      "lessReturns": 37361.28,
      "costGoodsSold": 10738,
      "returnsSum": 0,
      "returnsQuantity": 0,
      "returnsCostSold": 0,
      "costPriceOne": 767,
      "costOfProductmockStockToday": 0,
      "toClient": 14,
      "to_client_sum": 3924.5400000000022,
      "fromClient": 0,
      "from_client_sum": 1700,
      "commissionWB": 9153.51,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 37361.28,
      "marginalProfit": 26623,
      "averageProfit": 295,
      "profitabilityOfProductsSold": 15.35,
      "marginal": 71.26,
      "annualReturnOnInventory": 0,
      "lostRevenue": 0,
      "basic": 6400,
      "maxDiscount": 64,
      "minDiscountPrice": 2304,
      "orderQuantity": 47,
      "orderSum": 95103.39,
      "purchased": 14,
      "notPurchased": 0,
      "purchasedPercent": 100,
      "completed": 14,
      "orderCountDay": 0,
      "saleCountDay": 0.16,
      "dataRadar": 0,
      "dataWB": 0,
      "photo": "https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp",
      "nmID": 162042528,
      "sku": "2037866795250",
      "size": "4XL(58Rus)",
      "category": "Костюмы купальные",
      "costPrice": 767,
      "basePrice": 6400,
      "discount": 64,
      "minPrice": 230400,
      "is_self_cost": true,
      "byRevenue": "A",
      "byProfit": "B"
  },
  {
      "productName": "Купальник раздельный с высокими шортами",
      "brandName": "GrenadeFleur",
      "vendorСode": "22092/бордовый",
      "barCode": "2037866795267",
      "saleSum": 39811.25,
      "quantity": 15,
      "lessReturns": 37187.25,
      "costGoodsSold": 11505,
      "returnsSum": 2624,
      "returnsQuantity": 1,
      "returnsCostSold": 767,
      "costPriceOne": 767,
      "costOfProductmockStockToday": 50622,
      "toClient": 14,
      "to_client_sum": 6083.710000000002,
      "fromClient": 1,
      "from_client_sum": 2800,
      "commissionWB": 9110.86,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 37187.25,
      "marginalProfit": 25682,
      "averageProfit": 285,
      "profitabilityOfProductsSold": -4.83,
      "marginal": 69.06,
      "annualReturnOnInventory": -4,
      "lostRevenue": 0,
      "basic": 6400,
      "maxDiscount": 64,
      "minDiscountPrice": 2304,
      "orderQuantity": 70,
      "orderSum": 144594.31,
      "purchased": 15,
      "notPurchased": 1,
      "purchasedPercent": 93.3,
      "completed": 16,
      "orderCountDay": 0,
      "saleCountDay": 0.16,
      "dataRadar": 66,
      "dataWB": 66,
      "photo": "https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp",
      "nmID": 162042528,
      "sku": "2037866795267",
      "size": "5XL(60Rus)",
      "category": "Костюмы купальные",
      "costPrice": 767,
      "basePrice": 6400,
      "discount": 64,
      "minPrice": 230400,
      "is_self_cost": true,
      "byRevenue": "A",
      "byProfit": "C"
  },
  {
      "productName": "Купальник раздельный с высокими шортами",
      "brandName": "GrenadeFleur",
      "vendorСode": "22092/бордовый",
      "barCode": "2037866795274",
      "saleSum": 71629.31,
      "quantity": 27,
      "lessReturns": 71629.31,
      "costGoodsSold": 20709,
      "returnsSum": 0,
      "returnsQuantity": 0,
      "returnsCostSold": 0,
      "costPriceOne": 767,
      "costOfProductmockStockToday": 0,
      "toClient": 27,
      "to_client_sum": 6094.190000000003,
      "fromClient": 0,
      "from_client_sum": 2200,
      "commissionWB": 17549.16,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 71629.31,
      "marginalProfit": 50920,
      "averageProfit": 565,
      "profitabilityOfProductsSold": 22.2,
      "marginal": 71.09,
      "annualReturnOnInventory": 0,
      "lostRevenue": 0,
      "basic": 6400,
      "maxDiscount": 64,
      "minDiscountPrice": 2304,
      "orderQuantity": 67,
      "orderSum": 138271.33,
      "purchased": 27,
      "notPurchased": 0,
      "purchasedPercent": 100,
      "completed": 27,
      "orderCountDay": 0,
      "saleCountDay": 0.3,
      "dataRadar": 0,
      "dataWB": 0,
      "photo": "https://basket-11.wbbasket.ru/vol1620/part162042/162042528/images/c246x328/1.webp",
      "nmID": 162042528,
      "sku": "2037866795274",
      "size": "6XL(62Rus)",
      "category": "Костюмы купальные",
      "costPrice": 767,
      "basePrice": 6400,
      "discount": 64,
      "minPrice": 230400,
      "is_self_cost": true,
      "byRevenue": "A",
      "byProfit": "A"
  },
  {
      "productName": "Купальник танкини больших размеров",
      "brandName": "GrenadeFleur",
      "vendorСode": "22092/радужный",
      "barCode": "2039511687392",
      "saleSum": 18456.56,
      "quantity": 9,
      "lessReturns": 18456.56,
      "costGoodsSold": 6975,
      "returnsSum": 0,
      "returnsQuantity": 0,
      "returnsCostSold": 0,
      "costPriceOne": 775,
      "costOfProductmockStockToday": 0,
      "toClient": 9,
      "to_client_sum": 1543.79,
      "fromClient": 0,
      "from_client_sum": 500,
      "commissionWB": 4521.83,
      "fines": 0,
      "additionalPayment": 0,
      "serviceExpenses": 0,
      "toPayoff": 18456.56,
      "marginalProfit": 11481,
      "averageProfit": 127,
      "profitabilityOfProductsSold": 14.19,
      "marginal": 62.21,
      "annualReturnOnInventory": 0,
      "lostRevenue": 0,
      "basic": 6300,
      "maxDiscount": 81,
      "minDiscountPrice": 1197,
      "orderQuantity": 18,
      "orderSum": 29252.78,
      "purchased": 9,
      "notPurchased": 0,
      "purchasedPercent": 100,
      "completed": 9,
      "orderCountDay": 0,
      "saleCountDay": 0.1,
      "dataRadar": 0,
      "dataWB": 0,
      "photo": "https://basket-14.wbbasket.ru/vol2104/part210430/210430042/images/c246x328/1.webp",
      "nmID": 11111110,
      "sku": "2039511687392",
      "size": "XL(52Rus)",
      "category": "Костюмы купальные",
      "costPrice": 775,
      "basePrice": 6300,
      "discount": 81,
      "minPrice": 119700,
      "is_self_cost": true,
      "byRevenue": "B",
      "byProfit": "C"
  },
]

const mockDetailChartData = {
  '7': [
    {
        "0:03": 1
    },
    {
        "0:05": 1
    },
    {
        "0:09": 1
    },
    {
        "0:10": 2
    },
    {
        "0:14": 1
    },
    {
        "0:16": 2
    },
    {
        "0:17": 2
    },
    {
        "0:19": 1
    },
    {
        "0:24": 2
    },
    {
        "0:26": 1
    },
    {
        "0:27": 1
    },
    {
        "0:30": 2
    },
    {
        "0:32": 2
    },
    {
        "0:33": 1
    },
    {
        "0:34": 1
    },
    {
        "0:37": 1
    },
    {
        "0:41": 1
    },
    {
        "0:43": 1
    },
    {
        "0:46": 1
    },
    {
        "0:48": 1
    },
    {
        "0:53": 1
    },
    {
        "0:54": 3
    },
    {
        "0:58": 1
    },
    {
        "1:01": 1
    },
    {
        "1:02": 1
    },
    {
        "1:03": 1
    },
    {
        "1:08": 2
    },
    {
        "1:11": 1
    },
    {
        "1:13": 1
    },
    {
        "1:14": 1
    },
    {
        "1:15": 1
    },
    {
        "1:18": 1
    },
    {
        "1:20": 1
    },
    {
        "1:22": 1
    },
    {
        "1:27": 2
    },
    {
        "1:37": 1
    },
    {
        "1:39": 1
    },
    {
        "1:52": 1
    },
    {
        "2:03": 1
    },
    {
        "2:05": 1
    },
    {
        "2:08": 1
    },
    {
        "2:13": 1
    },
    {
        "2:26": 1
    },
    {
        "2:29": 1
    },
    {
        "2:30": 1
    },
    {
        "2:33": 3
    },
    {
        "2:35": 1
    },
    {
        "2:36": 1
    },
    {
        "2:37": 1
    },
    {
        "2:45": 2
    },
    {
        "2:49": 2
    },
    {
        "2:50": 1
    },
    {
        "2:55": 1
    },
    {
        "2:56": 2
    },
    {
        "3:01": 1
    },
    {
        "3:13": 1
    },
    {
        "3:23": 1
    },
    {
        "3:24": 2
    },
    {
        "3:28": 1
    },
    {
        "3:32": 1
    },
    {
        "3:33": 1
    },
    {
        "3:36": 1
    },
    {
        "3:37": 1
    },
    {
        "3:39": 1
    },
    {
        "3:40": 1
    },
    {
        "3:48": 1
    },
    {
        "3:51": 2
    },
    {
        "3:52": 1
    },
    {
        "3:57": 1
    },
    {
        "3:59": 1
    },
    {
        "4:01": 1
    },
    {
        "4:02": 2
    },
    {
        "4:06": 2
    },
    {
        "4:10": 1
    },
    {
        "4:11": 1
    },
    {
        "4:14": 1
    },
    {
        "4:23": 1
    },
    {
        "4:31": 2
    },
    {
        "4:32": 1
    },
    {
        "4:34": 1
    },
    {
        "4:38": 1
    },
    {
        "4:49": 1
    },
    {
        "4:52": 2
    },
    {
        "4:53": 1
    },
    {
        "4:55": 1
    },
    {
        "4:56": 3
    },
    {
        "4:59": 1
    },
    {
        "5:02": 1
    },
    {
        "5:05": 1
    },
    {
        "5:06": 1
    },
    {
        "5:09": 3
    },
    {
        "5:10": 1
    },
    {
        "5:11": 1
    },
    {
        "5:13": 1
    },
    {
        "5:19": 1
    },
    {
        "5:20": 2
    },
    {
        "5:22": 1
    },
    {
        "5:23": 1
    },
    {
        "5:24": 3
    },
    {
        "5:25": 2
    },
    {
        "5:27": 1
    },
    {
        "5:29": 1
    },
    {
        "5:36": 1
    },
    {
        "5:37": 1
    },
    {
        "5:38": 1
    },
    {
        "5:45": 1
    },
    {
        "5:48": 1
    },
    {
        "5:51": 1
    },
    {
        "5:52": 2
    },
    {
        "5:56": 1
    },
    {
        "5:57": 1
    },
    {
        "5:58": 1
    },
    {
        "6:00": 1
    },
    {
        "6:03": 1
    },
    {
        "6:06": 1
    },
    {
        "6:07": 1
    },
    {
        "6:08": 1
    },
    {
        "6:10": 1
    },
    {
        "6:12": 1
    },
    {
        "6:16": 2
    },
    {
        "6:17": 1
    },
    {
        "6:18": 2
    },
    {
        "6:19": 2
    },
    {
        "6:24": 2
    },
    {
        "6:26": 1
    },
    {
        "6:30": 1
    },
    {
        "6:31": 2
    },
    {
        "6:33": 1
    },
    {
        "6:34": 1
    },
    {
        "6:35": 1
    },
    {
        "6:39": 3
    },
    {
        "6:40": 2
    },
    {
        "6:41": 2
    },
    {
        "6:43": 2
    },
    {
        "6:44": 1
    },
    {
        "6:47": 4
    },
    {
        "6:49": 1
    },
    {
        "6:51": 1
    },
    {
        "6:54": 1
    },
    {
        "6:56": 2
    },
    {
        "6:59": 5
    },
    {
        "7:01": 1
    },
    {
        "7:02": 3
    },
    {
        "7:07": 1
    },
    {
        "7:08": 2
    },
    {
        "7:10": 2
    },
    {
        "7:11": 1
    },
    {
        "7:12": 1
    },
    {
        "7:13": 2
    },
    {
        "7:14": 2
    },
    {
        "7:16": 1
    },
    {
        "7:18": 1
    },
    {
        "7:19": 1
    },
    {
        "7:21": 1
    },
    {
        "7:23": 2
    },
    {
        "7:24": 1
    },
    {
        "7:25": 1
    },
    {
        "7:26": 1
    },
    {
        "7:28": 1
    },
    {
        "7:31": 2
    },
    {
        "7:32": 1
    },
    {
        "7:33": 2
    },
    {
        "7:36": 2
    },
    {
        "7:37": 3
    },
    {
        "7:38": 2
    },
    {
        "7:39": 1
    },
    {
        "7:40": 1
    },
    {
        "7:41": 4
    },
    {
        "7:49": 2
    },
    {
        "7:52": 2
    },
    {
        "7:53": 4
    },
    {
        "7:54": 3
    },
    {
        "7:55": 1
    },
    {
        "7:56": 3
    },
    {
        "7:58": 1
    },
    {
        "7:59": 1
    },
    {
        "8:00": 3
    },
    {
        "8:01": 1
    },
    {
        "8:02": 4
    },
    {
        "8:03": 1
    },
    {
        "8:05": 2
    },
    {
        "8:06": 1
    },
    {
        "8:07": 2
    },
    {
        "8:08": 2
    },
    {
        "8:09": 1
    },
    {
        "8:10": 1
    },
    {
        "8:12": 3
    },
    {
        "8:13": 1
    },
    {
        "8:15": 1
    },
    {
        "8:17": 1
    },
    {
        "8:18": 2
    },
    {
        "8:20": 2
    },
    {
        "8:21": 2
    },
    {
        "8:24": 1
    },
    {
        "8:25": 2
    },
    {
        "8:26": 1
    },
    {
        "8:28": 1
    },
    {
        "8:30": 1
    },
    {
        "8:31": 1
    },
    {
        "8:32": 2
    },
    {
        "8:33": 1
    },
    {
        "8:34": 1
    },
    {
        "8:36": 2
    },
    {
        "8:37": 2
    },
    {
        "8:38": 2
    },
    {
        "8:39": 1
    },
    {
        "8:44": 2
    },
    {
        "8:45": 2
    },
    {
        "8:46": 2
    },
    {
        "8:47": 1
    },
    {
        "8:49": 1
    },
    {
        "8:50": 3
    },
    {
        "8:52": 1
    },
    {
        "8:53": 2
    },
    {
        "8:55": 1
    },
    {
        "8:57": 2
    },
    {
        "8:58": 1
    },
    {
        "8:59": 1
    },
    {
        "9:01": 3
    },
    {
        "9:02": 1
    },
    {
        "9:03": 1
    },
    {
        "9:04": 2
    },
    {
        "9:08": 2
    },
    {
        "9:09": 2
    },
    {
        "9:10": 3
    },
    {
        "9:12": 2
    },
    {
        "9:14": 2
    },
    {
        "9:15": 3
    },
    {
        "9:16": 1
    },
    {
        "9:17": 3
    },
    {
        "9:18": 3
    },
    {
        "9:21": 1
    },
    {
        "9:23": 2
    },
    {
        "9:24": 1
    },
    {
        "9:25": 2
    },
    {
        "9:26": 3
    },
    {
        "9:27": 2
    },
    {
        "9:28": 1
    },
    {
        "9:29": 1
    },
    {
        "9:30": 2
    },
    {
        "9:31": 1
    },
    {
        "9:32": 2
    },
    {
        "9:34": 1
    },
    {
        "9:36": 1
    },
    {
        "9:37": 1
    },
    {
        "9:39": 4
    },
    {
        "9:40": 4
    },
    {
        "9:42": 5
    },
    {
        "9:43": 3
    },
    {
        "9:44": 1
    },
    {
        "9:47": 3
    },
    {
        "9:49": 2
    },
    {
        "9:50": 3
    },
    {
        "9:51": 2
    },
    {
        "9:54": 1
    },
    {
        "9:55": 1
    },
    {
        "9:57": 1
    },
    {
        "9:58": 3
    },
    {
        "9:59": 3
    },
    {
        "10:00": 2
    },
    {
        "10:01": 2
    },
    {
        "10:02": 1
    },
    {
        "10:03": 2
    },
    {
        "10:04": 1
    },
    {
        "10:06": 1
    },
    {
        "10:07": 1
    },
    {
        "10:11": 1
    },
    {
        "10:12": 1
    },
    {
        "10:13": 4
    },
    {
        "10:15": 3
    },
    {
        "10:16": 2
    },
    {
        "10:17": 3
    },
    {
        "10:18": 1
    },
    {
        "10:20": 1
    },
    {
        "10:21": 1
    },
    {
        "10:22": 3
    },
    {
        "10:23": 3
    },
    {
        "10:24": 3
    },
    {
        "10:26": 1
    },
    {
        "10:27": 1
    },
    {
        "10:28": 4
    },
    {
        "10:29": 2
    },
    {
        "10:31": 2
    },
    {
        "10:33": 4
    },
    {
        "10:34": 3
    },
    {
        "10:35": 1
    },
    {
        "10:36": 1
    },
    {
        "10:37": 1
    },
    {
        "10:38": 2
    },
    {
        "10:40": 2
    },
    {
        "10:41": 2
    },
    {
        "10:42": 3
    },
    {
        "10:43": 1
    },
    {
        "10:44": 1
    },
    {
        "10:45": 1
    },
    {
        "10:46": 1
    },
    {
        "10:47": 3
    },
    {
        "10:48": 1
    },
    {
        "10:50": 1
    },
    {
        "10:53": 1
    },
    {
        "10:54": 2
    },
    {
        "10:55": 2
    },
    {
        "10:56": 3
    },
    {
        "10:57": 2
    },
    {
        "10:58": 2
    },
    {
        "10:59": 2
    },
    {
        "11:00": 1
    },
    {
        "11:01": 2
    },
    {
        "11:02": 2
    },
    {
        "11:03": 3
    },
    {
        "11:04": 2
    },
    {
        "11:06": 1
    },
    {
        "11:08": 2
    },
    {
        "11:10": 3
    },
    {
        "11:12": 2
    },
    {
        "11:13": 2
    },
    {
        "11:14": 3
    },
    {
        "11:15": 1
    },
    {
        "11:16": 3
    },
    {
        "11:17": 1
    },
    {
        "11:19": 1
    },
    {
        "11:21": 1
    },
    {
        "11:22": 1
    },
    {
        "11:23": 1
    },
    {
        "11:25": 1
    },
    {
        "11:26": 1
    },
    {
        "11:27": 1
    },
    {
        "11:29": 5
    },
    {
        "11:30": 6
    },
    {
        "11:31": 1
    },
    {
        "11:32": 2
    },
    {
        "11:33": 1
    },
    {
        "11:34": 3
    },
    {
        "11:35": 5
    },
    {
        "11:36": 1
    },
    {
        "11:37": 1
    },
    {
        "11:38": 2
    },
    {
        "11:39": 5
    },
    {
        "11:40": 2
    },
    {
        "11:41": 2
    },
    {
        "11:42": 1
    },
    {
        "11:43": 2
    },
    {
        "11:44": 5
    },
    {
        "11:45": 1
    },
    {
        "11:46": 1
    },
    {
        "11:47": 1
    },
    {
        "11:48": 3
    },
    {
        "11:49": 1
    },
    {
        "11:51": 2
    },
    {
        "11:52": 1
    },
    {
        "11:53": 2
    },
    {
        "11:54": 3
    },
    {
        "11:55": 1
    },
    {
        "11:56": 1
    },
    {
        "11:57": 2
    },
    {
        "11:58": 1
    },
    {
        "11:59": 1
    },
    {
        "12:00": 2
    },
    {
        "12:01": 2
    },
    {
        "12:02": 1
    },
    {
        "12:03": 4
    },
    {
        "12:05": 4
    },
    {
        "12:06": 3
    },
    {
        "12:07": 2
    },
    {
        "12:08": 2
    },
    {
        "12:09": 2
    },
    {
        "12:13": 3
    },
    {
        "12:16": 3
    },
    {
        "12:17": 1
    },
    {
        "12:19": 3
    },
    {
        "12:20": 2
    },
    {
        "12:21": 5
    },
    {
        "12:22": 3
    },
    {
        "12:23": 5
    },
    {
        "12:25": 2
    },
    {
        "12:26": 1
    },
    {
        "12:28": 1
    },
    {
        "12:29": 1
    },
    {
        "12:30": 1
    },
    {
        "12:31": 5
    },
    {
        "12:32": 4
    },
    {
        "12:33": 2
    },
    {
        "12:34": 1
    },
    {
        "12:35": 2
    },
    {
        "12:36": 4
    },
    {
        "12:37": 1
    },
    {
        "12:38": 1
    },
    {
        "12:39": 2
    },
    {
        "12:40": 3
    },
    {
        "12:41": 2
    },
    {
        "12:42": 3
    },
    {
        "12:43": 2
    },
    {
        "12:44": 1
    },
    {
        "12:45": 2
    },
    {
        "12:46": 2
    },
    {
        "12:47": 3
    },
    {
        "12:48": 3
    },
    {
        "12:50": 2
    },
    {
        "12:51": 2
    },
    {
        "12:52": 1
    },
    {
        "12:54": 1
    },
    {
        "12:55": 3
    },
    {
        "12:56": 1
    },
    {
        "12:57": 1
    },
    {
        "12:59": 1
    },
    {
        "13:00": 2
    },
    {
        "13:01": 2
    },
    {
        "13:02": 1
    },
    {
        "13:03": 3
    },
    {
        "13:04": 3
    },
    {
        "13:07": 2
    },
    {
        "13:11": 3
    },
    {
        "13:12": 1
    },
    {
        "13:13": 3
    },
    {
        "13:15": 4
    },
    {
        "13:16": 3
    },
    {
        "13:17": 1
    },
    {
        "13:18": 3
    },
    {
        "13:19": 3
    },
    {
        "13:20": 6
    },
    {
        "13:22": 3
    },
    {
        "13:23": 1
    },
    {
        "13:24": 5
    },
    {
        "13:26": 1
    },
    {
        "13:27": 1
    },
    {
        "13:28": 1
    },
    {
        "13:29": 2
    },
    {
        "13:30": 3
    },
    {
        "13:32": 6
    },
    {
        "13:33": 4
    },
    {
        "13:34": 1
    },
    {
        "13:35": 4
    },
    {
        "13:36": 1
    },
    {
        "13:37": 1
    },
    {
        "13:38": 4
    },
    {
        "13:39": 4
    },
    {
        "13:41": 1
    },
    {
        "13:42": 3
    },
    {
        "13:43": 2
    },
    {
        "13:44": 3
    },
    {
        "13:45": 1
    },
    {
        "13:47": 1
    },
    {
        "13:48": 1
    },
    {
        "13:49": 1
    },
    {
        "13:50": 1
    },
    {
        "13:51": 5
    },
    {
        "13:52": 3
    },
    {
        "13:53": 5
    },
    {
        "13:54": 5
    },
    {
        "13:55": 1
    },
    {
        "13:56": 1
    },
    {
        "13:57": 2
    },
    {
        "13:58": 1
    },
    {
        "13:59": 1
    },
    {
        "14:00": 2
    },
    {
        "14:01": 2
    },
    {
        "14:02": 5
    },
    {
        "14:04": 1
    },
    {
        "14:05": 5
    },
    {
        "14:06": 3
    },
    {
        "14:07": 3
    },
    {
        "14:08": 2
    },
    {
        "14:09": 2
    },
    {
        "14:10": 2
    },
    {
        "14:11": 1
    },
    {
        "14:12": 2
    },
    {
        "14:13": 2
    },
    {
        "14:14": 2
    },
    {
        "14:15": 2
    },
    {
        "14:16": 3
    },
    {
        "14:17": 1
    },
    {
        "14:18": 4
    },
    {
        "14:19": 2
    },
    {
        "14:20": 1
    },
    {
        "14:22": 3
    },
    {
        "14:24": 1
    },
    {
        "14:25": 3
    },
    {
        "14:28": 1
    },
    {
        "14:29": 1
    },
    {
        "14:32": 2
    },
    {
        "14:33": 1
    },
    {
        "14:36": 2
    },
    {
        "14:37": 3
    },
    {
        "14:38": 3
    },
    {
        "14:39": 6
    },
    {
        "14:40": 3
    },
    {
        "14:41": 1
    },
    {
        "14:42": 1
    },
    {
        "14:44": 3
    },
    {
        "14:45": 1
    },
    {
        "14:47": 1
    },
    {
        "14:48": 3
    },
    {
        "14:50": 1
    },
    {
        "14:51": 1
    },
    {
        "14:53": 2
    },
    {
        "14:54": 1
    },
    {
        "14:55": 3
    },
    {
        "14:57": 1
    },
    {
        "14:58": 3
    },
    {
        "15:00": 1
    },
    {
        "15:01": 2
    },
    {
        "15:02": 1
    },
    {
        "15:03": 2
    },
    {
        "15:04": 2
    },
    {
        "15:05": 2
    },
    {
        "15:06": 3
    },
    {
        "15:08": 1
    },
    {
        "15:09": 1
    },
    {
        "15:10": 1
    },
    {
        "15:11": 2
    },
    {
        "15:12": 2
    },
    {
        "15:13": 1
    },
    {
        "15:14": 1
    },
    {
        "15:15": 2
    },
    {
        "15:16": 2
    },
    {
        "15:17": 3
    },
    {
        "15:19": 1
    },
    {
        "15:20": 2
    },
    {
        "15:21": 1
    },
    {
        "15:22": 4
    },
    {
        "15:23": 2
    },
    {
        "15:24": 2
    },
    {
        "15:25": 3
    },
    {
        "15:26": 2
    },
    {
        "15:27": 2
    },
    {
        "15:29": 1
    },
    {
        "15:30": 1
    },
    {
        "15:31": 1
    },
    {
        "15:32": 2
    },
    {
        "15:33": 2
    },
    {
        "15:34": 1
    },
    {
        "15:35": 1
    },
    {
        "15:36": 1
    },
    {
        "15:37": 3
    },
    {
        "15:38": 4
    },
    {
        "15:39": 3
    },
    {
        "15:43": 2
    },
    {
        "15:45": 3
    },
    {
        "15:46": 3
    },
    {
        "15:47": 6
    },
    {
        "15:50": 2
    },
    {
        "15:52": 3
    },
    {
        "15:54": 1
    },
    {
        "15:57": 3
    },
    {
        "15:58": 7
    },
    {
        "15:59": 1
    },
    {
        "16:01": 2
    },
    {
        "16:04": 3
    },
    {
        "16:05": 2
    },
    {
        "16:06": 2
    },
    {
        "16:07": 2
    },
    {
        "16:08": 4
    },
    {
        "16:10": 1
    },
    {
        "16:13": 2
    },
    {
        "16:14": 3
    },
    {
        "16:15": 3
    },
    {
        "16:16": 1
    },
    {
        "16:17": 1
    },
    {
        "16:18": 1
    },
    {
        "16:19": 3
    },
    {
        "16:20": 1
    },
    {
        "16:22": 3
    },
    {
        "16:23": 1
    },
    {
        "16:24": 1
    },
    {
        "16:25": 1
    },
    {
        "16:26": 1
    },
    {
        "16:27": 2
    },
    {
        "16:29": 3
    },
    {
        "16:30": 1
    },
    {
        "16:33": 1
    },
    {
        "16:34": 1
    },
    {
        "16:35": 2
    },
    {
        "16:37": 2
    },
    {
        "16:38": 1
    },
    {
        "16:39": 2
    },
    {
        "16:40": 1
    },
    {
        "16:41": 1
    },
    {
        "16:42": 1
    },
    {
        "16:43": 2
    },
    {
        "16:44": 1
    },
    {
        "16:46": 1
    },
    {
        "16:47": 1
    },
    {
        "16:48": 3
    },
    {
        "16:49": 2
    },
    {
        "16:51": 2
    },
    {
        "16:52": 3
    },
    {
        "16:53": 2
    },
    {
        "16:54": 2
    },
    {
        "16:56": 1
    },
    {
        "16:57": 1
    },
    {
        "16:58": 1
    },
    {
        "16:59": 1
    },
    {
        "17:00": 3
    },
    {
        "17:01": 2
    },
    {
        "17:02": 1
    },
    {
        "17:03": 1
    },
    {
        "17:04": 1
    },
    {
        "17:05": 3
    },
    {
        "17:07": 1
    },
    {
        "17:08": 1
    },
    {
        "17:09": 3
    },
    {
        "17:11": 1
    },
    {
        "17:12": 1
    },
    {
        "17:13": 2
    },
    {
        "17:15": 5
    },
    {
        "17:16": 1
    },
    {
        "17:17": 2
    },
    {
        "17:19": 1
    },
    {
        "17:20": 2
    },
    {
        "17:23": 3
    },
    {
        "17:24": 2
    },
    {
        "17:25": 2
    },
    {
        "17:26": 2
    },
    {
        "17:27": 2
    },
    {
        "17:28": 2
    },
    {
        "17:29": 1
    },
    {
        "17:31": 3
    },
    {
        "17:32": 2
    },
    {
        "17:33": 2
    },
    {
        "17:36": 2
    },
    {
        "17:38": 3
    },
    {
        "17:39": 3
    },
    {
        "17:41": 2
    },
    {
        "17:42": 2
    },
    {
        "17:43": 4
    },
    {
        "17:44": 2
    },
    {
        "17:45": 2
    },
    {
        "17:46": 1
    },
    {
        "17:47": 1
    },
    {
        "17:48": 3
    },
    {
        "17:49": 1
    },
    {
        "17:50": 3
    },
    {
        "17:51": 1
    },
    {
        "17:52": 2
    },
    {
        "17:54": 1
    },
    {
        "17:56": 4
    },
    {
        "17:57": 2
    },
    {
        "17:58": 1
    },
    {
        "17:59": 1
    },
    {
        "18:00": 2
    },
    {
        "18:03": 2
    },
    {
        "18:04": 1
    },
    {
        "18:05": 1
    },
    {
        "18:06": 3
    },
    {
        "18:07": 3
    },
    {
        "18:08": 1
    },
    {
        "18:09": 3
    },
    {
        "18:10": 3
    },
    {
        "18:11": 1
    },
    {
        "18:13": 2
    },
    {
        "18:15": 1
    },
    {
        "18:16": 1
    },
    {
        "18:17": 1
    },
    {
        "18:18": 1
    },
    {
        "18:19": 5
    },
    {
        "18:21": 2
    },
    {
        "18:22": 2
    },
    {
        "18:24": 1
    },
    {
        "18:25": 1
    },
    {
        "18:26": 2
    },
    {
        "18:27": 1
    },
    {
        "18:28": 4
    },
    {
        "18:29": 1
    },
    {
        "18:30": 3
    },
    {
        "18:31": 3
    },
    {
        "18:32": 2
    },
    {
        "18:33": 1
    },
    {
        "18:34": 1
    },
    {
        "18:35": 1
    },
    {
        "18:36": 2
    },
    {
        "18:37": 3
    },
    {
        "18:38": 2
    },
    {
        "18:40": 3
    },
    {
        "18:41": 2
    },
    {
        "18:42": 1
    },
    {
        "18:44": 5
    },
    {
        "18:45": 1
    },
    {
        "18:46": 1
    },
    {
        "18:47": 8
    },
    {
        "18:48": 1
    },
    {
        "18:50": 1
    },
    {
        "18:51": 2
    },
    {
        "18:52": 1
    },
    {
        "18:53": 2
    },
    {
        "18:54": 3
    },
    {
        "18:55": 1
    },
    {
        "18:57": 2
    },
    {
        "18:58": 6
    },
    {
        "19:00": 2
    },
    {
        "19:01": 1
    },
    {
        "19:02": 3
    },
    {
        "19:03": 1
    },
    {
        "19:04": 1
    },
    {
        "19:06": 2
    },
    {
        "19:07": 4
    },
    {
        "19:08": 2
    },
    {
        "19:09": 2
    },
    {
        "19:11": 1
    },
    {
        "19:12": 4
    },
    {
        "19:13": 2
    },
    {
        "19:14": 1
    },
    {
        "19:15": 1
    },
    {
        "19:16": 1
    },
    {
        "19:17": 2
    },
    {
        "19:18": 1
    },
    {
        "19:19": 2
    },
    {
        "19:20": 4
    },
    {
        "19:22": 3
    },
    {
        "19:24": 1
    },
    {
        "19:25": 1
    },
    {
        "19:26": 1
    },
    {
        "19:28": 1
    },
    {
        "19:30": 1
    },
    {
        "19:32": 2
    },
    {
        "19:33": 1
    },
    {
        "19:34": 2
    },
    {
        "19:35": 1
    },
    {
        "19:36": 3
    },
    {
        "19:37": 1
    },
    {
        "19:38": 4
    },
    {
        "19:39": 1
    },
    {
        "19:42": 2
    },
    {
        "19:45": 1
    },
    {
        "19:46": 1
    },
    {
        "19:47": 4
    },
    {
        "19:49": 2
    },
    {
        "19:51": 2
    },
    {
        "19:52": 2
    },
    {
        "19:53": 3
    },
    {
        "19:54": 1
    },
    {
        "19:55": 2
    },
    {
        "19:57": 2
    },
    {
        "19:58": 1
    },
    {
        "20:01": 1
    },
    {
        "20:02": 1
    },
    {
        "20:03": 1
    },
    {
        "20:04": 4
    },
    {
        "20:05": 2
    },
    {
        "20:06": 1
    },
    {
        "20:09": 3
    },
    {
        "20:10": 1
    },
    {
        "20:11": 2
    },
    {
        "20:12": 2
    },
    {
        "20:13": 3
    },
    {
        "20:15": 3
    },
    {
        "20:17": 2
    },
    {
        "20:18": 1
    },
    {
        "20:20": 2
    },
    {
        "20:21": 1
    },
    {
        "20:22": 4
    },
    {
        "20:23": 1
    },
    {
        "20:24": 3
    },
    {
        "20:25": 1
    },
    {
        "20:26": 2
    },
    {
        "20:27": 1
    },
    {
        "20:28": 1
    },
    {
        "20:30": 2
    },
    {
        "20:31": 2
    },
    {
        "20:32": 2
    },
    {
        "20:35": 2
    },
    {
        "20:36": 1
    },
    {
        "20:37": 2
    },
    {
        "20:38": 1
    },
    {
        "20:41": 3
    },
    {
        "20:42": 1
    },
    {
        "20:43": 3
    },
    {
        "20:45": 1
    },
    {
        "20:46": 2
    },
    {
        "20:47": 1
    },
    {
        "20:49": 2
    },
    {
        "20:51": 2
    },
    {
        "20:53": 1
    },
    {
        "20:54": 1
    },
    {
        "20:55": 3
    },
    {
        "20:56": 2
    },
    {
        "20:57": 3
    },
    {
        "20:58": 2
    },
    {
        "21:00": 1
    },
    {
        "21:01": 2
    },
    {
        "21:02": 9
    },
    {
        "21:03": 3
    },
    {
        "21:07": 3
    },
    {
        "21:08": 1
    },
    {
        "21:09": 2
    },
    {
        "21:10": 2
    },
    {
        "21:11": 3
    },
    {
        "21:12": 2
    },
    {
        "21:13": 2
    },
    {
        "21:15": 2
    },
    {
        "21:16": 3
    },
    {
        "21:18": 1
    },
    {
        "21:19": 4
    },
    {
        "21:21": 5
    },
    {
        "21:22": 2
    },
    {
        "21:23": 1
    },
    {
        "21:24": 3
    },
    {
        "21:25": 2
    },
    {
        "21:28": 4
    },
    {
        "21:29": 2
    },
    {
        "21:31": 3
    },
    {
        "21:32": 1
    },
    {
        "21:33": 1
    },
    {
        "21:34": 3
    },
    {
        "21:36": 1
    },
    {
        "21:37": 1
    },
    {
        "21:38": 4
    },
    {
        "21:39": 2
    },
    {
        "21:41": 1
    },
    {
        "21:42": 1
    },
    {
        "21:43": 1
    },
    {
        "21:44": 1
    },
    {
        "21:45": 1
    },
    {
        "21:46": 1
    },
    {
        "21:47": 2
    },
    {
        "21:50": 1
    },
    {
        "21:51": 1
    },
    {
        "21:52": 5
    },
    {
        "21:53": 1
    },
    {
        "21:54": 2
    },
    {
        "21:55": 3
    },
    {
        "21:56": 2
    },
    {
        "21:57": 3
    },
    {
        "21:58": 1
    },
    {
        "22:00": 2
    },
    {
        "22:02": 2
    },
    {
        "22:03": 2
    },
    {
        "22:04": 1
    },
    {
        "22:05": 3
    },
    {
        "22:06": 3
    },
    {
        "22:08": 3
    },
    {
        "22:12": 1
    },
    {
        "22:14": 1
    },
    {
        "22:15": 2
    },
    {
        "22:16": 3
    },
    {
        "22:18": 2
    },
    {
        "22:19": 1
    },
    {
        "22:20": 1
    },
    {
        "22:22": 2
    },
    {
        "22:24": 1
    },
    {
        "22:26": 2
    },
    {
        "22:29": 1
    },
    {
        "22:30": 1
    },
    {
        "22:31": 1
    },
    {
        "22:33": 2
    },
    {
        "22:34": 2
    },
    {
        "22:35": 2
    },
    {
        "22:36": 1
    },
    {
        "22:37": 1
    },
    {
        "22:38": 2
    },
    {
        "22:40": 1
    },
    {
        "22:41": 1
    },
    {
        "22:42": 1
    },
    {
        "22:43": 2
    },
    {
        "22:47": 2
    },
    {
        "22:48": 3
    },
    {
        "22:49": 1
    },
    {
        "22:50": 1
    },
    {
        "22:52": 1
    },
    {
        "22:54": 4
    },
    {
        "22:56": 1
    },
    {
        "22:57": 3
    },
    {
        "23:00": 1
    },
    {
        "23:02": 2
    },
    {
        "23:03": 2
    },
    {
        "23:04": 1
    },
    {
        "23:05": 1
    },
    {
        "23:06": 2
    },
    {
        "23:07": 1
    },
    {
        "23:09": 1
    },
    {
        "23:10": 1
    },
    {
        "23:12": 1
    },
    {
        "23:14": 1
    },
    {
        "23:15": 1
    },
    {
        "23:22": 1
    },
    {
        "23:24": 2
    },
    {
        "23:26": 1
    },
    {
        "23:27": 3
    },
    {
        "23:28": 3
    },
    {
        "23:31": 3
    },
    {
        "23:32": 1
    },
    {
        "23:37": 1
    },
    {
        "23:41": 1
    },
    {
        "23:44": 1
    },
    {
        "23:45": 3
    },
    {
        "23:46": 3
    },
    {
        "23:47": 1
    },
    {
        "23:48": 3
    },
    {
        "23:49": 1
    },
    {
        "23:50": 1
    },
    {
        "23:51": 1
    },
    {
        "23:52": 4
    },
    {
        "23:55": 1
    },
    {
        "23:57": 1
    }
  ],
  '14': [
    {
        "0:10": 1
    },
    {
        "0:26": 1
    },
    {
        "0:32": 2
    },
    {
        "0:41": 1
    },
    {
        "1:20": 1
    },
    {
        "2:30": 1
    },
    {
        "2:33": 1
    },
    {
        "2:35": 1
    },
    {
        "2:36": 1
    },
    {
        "2:37": 1
    },
    {
        "3:01": 1
    },
    {
        "3:37": 1
    },
    {
        "3:59": 1
    },
    {
        "4:02": 1
    },
    {
        "4:31": 1
    },
    {
        "4:49": 1
    },
    {
        "4:52": 1
    },
    {
        "4:56": 1
    },
    {
        "5:05": 1
    },
    {
        "5:20": 2
    },
    {
        "6:07": 1
    },
    {
        "6:16": 1
    },
    {
        "6:19": 1
    },
    {
        "6:26": 1
    },
    {
        "6:31": 2
    },
    {
        "6:56": 1
    },
    {
        "6:59": 3
    },
    {
        "7:08": 1
    },
    {
        "7:12": 1
    },
    {
        "7:18": 1
    },
    {
        "7:33": 1
    },
    {
        "7:55": 1
    },
    {
        "7:59": 1
    },
    {
        "8:02": 1
    },
    {
        "8:12": 1
    },
    {
        "8:32": 1
    },
    {
        "8:38": 1
    },
    {
        "8:49": 1
    },
    {
        "9:01": 3
    },
    {
        "9:12": 1
    },
    {
        "9:17": 1
    },
    {
        "9:18": 2
    },
    {
        "9:23": 1
    },
    {
        "9:24": 1
    },
    {
        "9:26": 2
    },
    {
        "9:34": 1
    },
    {
        "9:40": 2
    },
    {
        "9:42": 1
    },
    {
        "9:43": 2
    },
    {
        "9:49": 2
    },
    {
        "9:50": 2
    },
    {
        "9:58": 1
    },
    {
        "10:03": 1
    },
    {
        "10:13": 3
    },
    {
        "10:16": 1
    },
    {
        "10:17": 1
    },
    {
        "10:21": 1
    },
    {
        "10:22": 1
    },
    {
        "10:23": 1
    },
    {
        "10:24": 1
    },
    {
        "10:29": 1
    },
    {
        "10:33": 2
    },
    {
        "10:36": 1
    },
    {
        "10:38": 1
    },
    {
        "10:40": 1
    },
    {
        "10:46": 1
    },
    {
        "11:00": 1
    },
    {
        "11:03": 2
    },
    {
        "11:04": 1
    },
    {
        "11:29": 4
    },
    {
        "11:30": 1
    },
    {
        "11:36": 1
    },
    {
        "11:39": 1
    },
    {
        "11:41": 2
    },
    {
        "11:43": 1
    },
    {
        "11:48": 1
    },
    {
        "11:51": 1
    },
    {
        "11:57": 1
    },
    {
        "12:05": 2
    },
    {
        "12:07": 1
    },
    {
        "12:08": 2
    },
    {
        "12:13": 3
    },
    {
        "12:16": 1
    },
    {
        "12:20": 1
    },
    {
        "12:21": 1
    },
    {
        "12:22": 1
    },
    {
        "12:23": 1
    },
    {
        "12:26": 1
    },
    {
        "12:30": 1
    },
    {
        "12:32": 2
    },
    {
        "12:40": 2
    },
    {
        "12:41": 1
    },
    {
        "12:42": 1
    },
    {
        "12:47": 1
    },
    {
        "12:52": 1
    },
    {
        "12:57": 1
    },
    {
        "13:00": 1
    },
    {
        "13:03": 1
    },
    {
        "13:04": 1
    },
    {
        "13:07": 1
    },
    {
        "13:11": 1
    },
    {
        "13:15": 1
    },
    {
        "13:16": 1
    },
    {
        "13:20": 3
    },
    {
        "13:26": 1
    },
    {
        "13:28": 1
    },
    {
        "13:29": 2
    },
    {
        "13:30": 1
    },
    {
        "13:33": 1
    },
    {
        "13:35": 1
    },
    {
        "13:36": 1
    },
    {
        "13:38": 1
    },
    {
        "13:42": 1
    },
    {
        "13:43": 1
    },
    {
        "13:44": 1
    },
    {
        "13:50": 1
    },
    {
        "13:51": 2
    },
    {
        "13:52": 1
    },
    {
        "13:57": 1
    },
    {
        "14:02": 3
    },
    {
        "14:07": 1
    },
    {
        "14:08": 1
    },
    {
        "14:16": 1
    },
    {
        "14:17": 1
    },
    {
        "14:20": 1
    },
    {
        "14:25": 1
    },
    {
        "14:39": 1
    },
    {
        "14:40": 1
    },
    {
        "14:48": 1
    },
    {
        "14:50": 1
    },
    {
        "14:55": 1
    },
    {
        "14:58": 2
    },
    {
        "15:04": 1
    },
    {
        "15:10": 1
    },
    {
        "15:14": 1
    },
    {
        "15:25": 2
    },
    {
        "15:26": 2
    },
    {
        "15:27": 1
    },
    {
        "15:29": 1
    },
    {
        "15:30": 1
    },
    {
        "15:38": 1
    },
    {
        "15:45": 1
    },
    {
        "15:46": 1
    },
    {
        "15:50": 1
    },
    {
        "15:52": 1
    },
    {
        "15:58": 1
    },
    {
        "16:13": 1
    },
    {
        "16:25": 1
    },
    {
        "16:27": 1
    },
    {
        "16:29": 2
    },
    {
        "16:35": 1
    },
    {
        "16:37": 1
    },
    {
        "16:38": 1
    },
    {
        "16:40": 1
    },
    {
        "16:48": 2
    },
    {
        "16:52": 2
    },
    {
        "17:00": 2
    },
    {
        "17:01": 1
    },
    {
        "17:04": 1
    },
    {
        "17:07": 1
    },
    {
        "17:15": 2
    },
    {
        "17:20": 2
    },
    {
        "17:23": 1
    },
    {
        "17:25": 1
    },
    {
        "17:27": 1
    },
    {
        "17:28": 2
    },
    {
        "17:41": 2
    },
    {
        "17:51": 1
    },
    {
        "17:58": 1
    },
    {
        "18:05": 1
    },
    {
        "18:13": 2
    },
    {
        "18:18": 1
    },
    {
        "18:19": 1
    },
    {
        "18:40": 1
    },
    {
        "18:46": 1
    },
    {
        "18:57": 1
    },
    {
        "18:58": 2
    },
    {
        "19:00": 1
    },
    {
        "19:02": 1
    },
    {
        "19:07": 1
    },
    {
        "19:12": 1
    },
    {
        "19:13": 1
    },
    {
        "19:20": 1
    },
    {
        "19:28": 1
    },
    {
        "19:42": 1
    },
    {
        "19:47": 1
    },
    {
        "19:49": 1
    },
    {
        "19:55": 1
    },
    {
        "20:01": 1
    },
    {
        "20:04": 2
    },
    {
        "20:15": 1
    },
    {
        "20:17": 2
    },
    {
        "20:22": 2
    },
    {
        "20:24": 1
    },
    {
        "20:26": 1
    },
    {
        "20:32": 1
    },
    {
        "20:46": 1
    },
    {
        "20:53": 1
    },
    {
        "21:07": 1
    },
    {
        "21:10": 1
    },
    {
        "21:21": 2
    },
    {
        "21:24": 1
    },
    {
        "21:31": 1
    },
    {
        "21:33": 1
    },
    {
        "21:36": 1
    },
    {
        "21:37": 1
    },
    {
        "21:42": 1
    },
    {
        "21:47": 1
    },
    {
        "21:51": 1
    },
    {
        "21:52": 5
    },
    {
        "21:56": 2
    },
    {
        "22:00": 1
    },
    {
        "22:05": 1
    },
    {
        "22:06": 3
    },
    {
        "22:14": 1
    },
    {
        "22:24": 1
    },
    {
        "22:29": 1
    },
    {
        "22:35": 1
    },
    {
        "22:48": 2
    },
    {
        "23:03": 1
    },
    {
        "23:05": 1
    },
    {
        "23:06": 1
    },
    {
        "23:09": 1
    },
    {
        "23:27": 1
    },
    {
        "23:28": 1
    },
    {
        "23:48": 1
    },
    {
        "23:49": 1
    },
    {
        "23:52": 4
    }
],
  '30': [
    {
        "0:42": 1
    },
    {
        "0:44": 1
    },
    {
        "0:45": 1
    },
    {
        "0:48": 1
    },
    {
        "0:53": 1
    },
    {
        "1:00": 0
    },
    {
        "2:34": 1
    },
    {
        "3:01": 1
    },
    {
        "4:09": 2
    },
    {
        "4:26": 1
    },
    {
        "4:54": 1
    },
    {
        "5:00": 0
    },
    {
        "6:09": 1
    },
    {
        "6:14": 1
    },
    {
        "6:31": 2
    },
    {
        "6:41": 1
    },
    {
        "6:50": 1
    },
    {
        "7:19": 1
    },
    {
        "7:35": 1
    },
    {
        "7:41": 1
    },
    {
        "7:44": 1
    },
    {
        "7:47": 1
    },
    {
        "7:55": 1
    },
    {
        "8:05": 1
    },
    {
        "8:19": 1
    },
    {
        "8:24": 2
    },
    {
        "8:49": 1
    },
    {
        "8:53": 1
    },
    {
        "9:14": 1
    },
    {
        "9:16": 1
    },
    {
        "9:17": 1
    },
    {
        "9:24": 1
    },
    {
        "9:25": 1
    },
    {
        "9:31": 1
    },
    {
        "9:37": 1
    },
    {
        "9:46": 1
    },
    {
        "9:57": 1
    },
    {
        "10:01": 1
    },
    {
        "10:08": 1
    },
    {
        "10:38": 1
    },
    {
        "10:39": 1
    },
    {
        "10:50": 1
    },
    {
        "11:02": 1
    },
    {
        "11:04": 2
    },
    {
        "11:07": 1
    },
    {
        "11:09": 1
    },
    {
        "11:12": 1
    },
    {
        "11:28": 1
    },
    {
        "11:38": 1
    },
    {
        "11:39": 1
    },
    {
        "11:42": 1
    },
    {
        "11:54": 1
    },
    {
        "11:58": 1
    },
    {
        "12:00": 1
    },
    {
        "12:02": 1
    },
    {
        "12:05": 1
    },
    {
        "12:07": 1
    },
    {
        "12:09": 1
    },
    {
        "12:13": 1
    },
    {
        "12:16": 1
    },
    {
        "12:26": 1
    },
    {
        "12:27": 2
    },
    {
        "12:30": 1
    },
    {
        "12:33": 1
    },
    {
        "12:39": 1
    },
    {
        "12:44": 1
    },
    {
        "12:50": 1
    },
    {
        "12:55": 1
    },
    {
        "12:56": 1
    },
    {
        "12:58": 1
    },
    {
        "13:00": 1
    },
    {
        "13:05": 1
    },
    {
        "13:07": 2
    },
    {
        "13:21": 1
    },
    {
        "13:26": 1
    },
    {
        "13:28": 1
    },
    {
        "13:29": 1
    },
    {
        "13:31": 1
    },
    {
        "13:35": 1
    },
    {
        "13:39": 1
    },
    {
        "13:41": 1
    },
    {
        "13:44": 1
    },
    {
        "13:53": 2
    },
    {
        "13:55": 1
    },
    {
        "13:56": 2
    },
    {
        "13:59": 1
    },
    {
        "14:03": 1
    },
    {
        "14:07": 1
    },
    {
        "14:10": 1
    },
    {
        "14:15": 1
    },
    {
        "14:16": 1
    },
    {
        "14:19": 1
    },
    {
        "14:23": 1
    },
    {
        "14:30": 1
    },
    {
        "14:33": 1
    },
    {
        "14:39": 1
    },
    {
        "14:41": 1
    },
    {
        "14:55": 1
    },
    {
        "15:02": 1
    },
    {
        "15:03": 1
    },
    {
        "15:09": 1
    },
    {
        "15:19": 1
    },
    {
        "15:21": 1
    },
    {
        "15:34": 1
    },
    {
        "15:39": 1
    },
    {
        "15:48": 1
    },
    {
        "15:49": 1
    },
    {
        "15:51": 2
    },
    {
        "15:53": 1
    },
    {
        "16:06": 1
    },
    {
        "16:11": 1
    },
    {
        "16:12": 1
    },
    {
        "16:13": 1
    },
    {
        "16:14": 1
    },
    {
        "16:21": 2
    },
    {
        "16:27": 1
    },
    {
        "16:47": 1
    },
    {
        "16:55": 1
    },
    {
        "17:04": 2
    },
    {
        "17:06": 1
    },
    {
        "17:09": 1
    },
    {
        "17:26": 1
    },
    {
        "17:31": 1
    },
    {
        "17:32": 2
    },
    {
        "17:38": 1
    },
    {
        "17:42": 1
    },
    {
        "17:46": 1
    },
    {
        "17:48": 1
    },
    {
        "17:49": 1
    },
    {
        "17:56": 1
    },
    {
        "17:57": 1
    },
    {
        "17:58": 1
    },
    {
        "18:03": 1
    },
    {
        "18:15": 1
    },
    {
        "18:16": 1
    },
    {
        "18:19": 2
    },
    {
        "18:22": 1
    },
    {
        "18:37": 2
    },
    {
        "18:47": 1
    },
    {
        "18:48": 1
    },
    {
        "18:50": 2
    },
    {
        "18:52": 1
    },
    {
        "18:53": 1
    },
    {
        "18:54": 1
    },
    {
        "19:01": 1
    },
    {
        "19:04": 1
    },
    {
        "19:10": 1
    },
    {
        "19:16": 2
    },
    {
        "19:27": 1
    },
    {
        "19:29": 1
    },
    {
        "19:37": 1
    },
    {
        "19:45": 2
    },
    {
        "19:55": 1
    },
    {
        "20:07": 2
    },
    {
        "20:08": 2
    },
    {
        "20:13": 1
    },
    {
        "20:14": 1
    },
    {
        "20:19": 1
    },
    {
        "20:21": 2
    },
    {
        "20:32": 1
    },
    {
        "20:37": 1
    },
    {
        "20:41": 1
    },
    {
        "20:46": 1
    },
    {
        "20:48": 1
    },
    {
        "20:54": 1
    },
    {
        "21:01": 1
    },
    {
        "21:03": 1
    },
    {
        "21:04": 1
    },
    {
        "21:07": 1
    },
    {
        "21:25": 2
    },
    {
        "21:27": 1
    },
    {
        "21:29": 2
    },
    {
        "21:37": 1
    },
    {
        "21:49": 1
    },
    {
        "21:53": 1
    },
    {
        "21:58": 1
    },
    {
        "22:06": 2
    },
    {
        "22:14": 1
    },
    {
        "22:15": 1
    },
    {
        "22:23": 1
    },
    {
        "22:25": 1
    },
    {
        "22:26": 1
    },
    {
        "22:29": 1
    },
    {
        "22:30": 1
    },
    {
        "22:31": 2
    },
    {
        "22:34": 1
    },
    {
        "22:35": 1
    },
    {
        "23:34": 1
    },
    {
        "23:41": 1
    },
    {
        "23:57": 1
    }
],
  '90': [
    {
        "0:01": 1
    },
    {
        "0:02": 2
    },
    {
        "0:11": 1
    },
    {
        "0:12": 4
    },
    {
        "0:13": 1
    },
    {
        "0:19": 1
    },
    {
        "0:23": 1
    },
    {
        "0:28": 2
    },
    {
        "0:43": 1
    },
    {
        "0:47": 1
    },
    {
        "0:49": 1
    },
    {
        "0:55": 1
    },
    {
        "0:56": 1
    },
    {
        "1:01": 1
    },
    {
        "1:07": 1
    },
    {
        "1:14": 1
    },
    {
        "1:15": 1
    },
    {
        "1:17": 1
    },
    {
        "1:28": 1
    },
    {
        "1:46": 1
    },
    {
        "1:57": 1
    },
    {
        "2:08": 1
    },
    {
        "2:10": 1
    },
    {
        "2:13": 1
    },
    {
        "2:21": 1
    },
    {
        "2:34": 1
    },
    {
        "2:39": 1
    },
    {
        "2:41": 1
    },
    {
        "3:01": 2
    },
    {
        "3:34": 1
    },
    {
        "4:14": 1
    },
    {
        "4:21": 1
    },
    {
        "4:27": 1
    },
    {
        "4:32": 2
    },
    {
        "4:34": 1
    },
    {
        "5:10": 1
    },
    {
        "5:13": 1
    },
    {
        "5:21": 1
    },
    {
        "5:47": 1
    },
    {
        "5:48": 3
    },
    {
        "5:53": 3
    },
    {
        "5:54": 1
    },
    {
        "6:09": 1
    },
    {
        "6:18": 2
    },
    {
        "6:19": 1
    },
    {
        "6:37": 1
    },
    {
        "6:38": 1
    },
    {
        "6:46": 1
    },
    {
        "6:47": 3
    },
    {
        "6:54": 1
    },
    {
        "7:19": 1
    },
    {
        "7:28": 3
    },
    {
        "7:34": 1
    },
    {
        "7:52": 1
    },
    {
        "7:56": 1
    },
    {
        "8:00": 2
    },
    {
        "8:01": 1
    },
    {
        "8:02": 1
    },
    {
        "8:14": 1
    },
    {
        "8:18": 1
    },
    {
        "8:24": 2
    },
    {
        "8:30": 2
    },
    {
        "8:32": 2
    },
    {
        "8:36": 2
    },
    {
        "8:40": 1
    },
    {
        "8:43": 2
    },
    {
        "8:45": 1
    },
    {
        "8:49": 1
    },
    {
        "8:56": 1
    },
    {
        "8:58": 2
    },
    {
        "9:00": 3
    },
    {
        "9:01": 1
    },
    {
        "9:04": 1
    },
    {
        "9:06": 2
    },
    {
        "9:09": 1
    },
    {
        "9:16": 1
    },
    {
        "9:17": 1
    },
    {
        "9:18": 3
    },
    {
        "9:19": 2
    },
    {
        "9:22": 1
    },
    {
        "9:24": 1
    },
    {
        "9:26": 1
    },
    {
        "9:29": 2
    },
    {
        "9:38": 2
    },
    {
        "9:42": 1
    },
    {
        "9:43": 3
    },
    {
        "9:45": 1
    },
    {
        "9:51": 2
    },
    {
        "9:52": 1
    },
    {
        "9:53": 2
    },
    {
        "9:56": 3
    },
    {
        "9:58": 1
    },
    {
        "10:00": 1
    },
    {
        "10:01": 1
    },
    {
        "10:04": 1
    },
    {
        "10:06": 1
    },
    {
        "10:12": 2
    },
    {
        "10:14": 1
    },
    {
        "10:15": 1
    },
    {
        "10:19": 1
    },
    {
        "10:20": 1
    },
    {
        "10:21": 1
    },
    {
        "10:22": 1
    },
    {
        "10:23": 1
    },
    {
        "10:32": 2
    },
    {
        "10:33": 1
    },
    {
        "10:38": 2
    },
    {
        "10:39": 2
    },
    {
        "10:40": 1
    },
    {
        "10:42": 1
    },
    {
        "10:48": 1
    },
    {
        "10:50": 1
    },
    {
        "10:53": 1
    },
    {
        "10:55": 1
    },
    {
        "10:56": 1
    },
    {
        "10:57": 1
    },
    {
        "10:59": 2
    },
    {
        "11:00": 1
    },
    {
        "11:03": 1
    },
    {
        "11:06": 1
    },
    {
        "11:08": 1
    },
    {
        "11:09": 1
    },
    {
        "11:12": 1
    },
    {
        "11:15": 1
    },
    {
        "11:16": 2
    },
    {
        "11:18": 1
    },
    {
        "11:19": 3
    },
    {
        "11:21": 1
    },
    {
        "11:22": 1
    },
    {
        "11:25": 1
    },
    {
        "11:26": 1
    },
    {
        "11:30": 2
    },
    {
        "11:34": 1
    },
    {
        "11:36": 1
    },
    {
        "11:41": 1
    },
    {
        "11:42": 2
    },
    {
        "11:43": 1
    },
    {
        "11:45": 2
    },
    {
        "11:46": 1
    },
    {
        "11:47": 1
    },
    {
        "11:50": 1
    },
    {
        "11:51": 3
    },
    {
        "11:54": 1
    },
    {
        "11:56": 1
    },
    {
        "11:57": 2
    },
    {
        "11:59": 1
    },
    {
        "12:02": 1
    },
    {
        "12:08": 4
    },
    {
        "12:09": 1
    },
    {
        "12:10": 3
    },
    {
        "12:15": 2
    },
    {
        "12:16": 2
    },
    {
        "12:18": 1
    },
    {
        "12:20": 1
    },
    {
        "12:23": 2
    },
    {
        "12:27": 1
    },
    {
        "12:28": 1
    },
    {
        "12:29": 1
    },
    {
        "12:30": 2
    },
    {
        "12:34": 1
    },
    {
        "12:35": 1
    },
    {
        "12:38": 1
    },
    {
        "12:40": 1
    },
    {
        "12:41": 1
    },
    {
        "12:42": 3
    },
    {
        "12:46": 2
    },
    {
        "12:47": 1
    },
    {
        "12:51": 1
    },
    {
        "12:52": 1
    },
    {
        "12:57": 1
    },
    {
        "13:02": 1
    },
    {
        "13:04": 1
    },
    {
        "13:07": 1
    },
    {
        "13:09": 1
    },
    {
        "13:10": 1
    },
    {
        "13:11": 1
    },
    {
        "13:14": 1
    },
    {
        "13:38": 1
    },
    {
        "13:39": 2
    },
    {
        "13:43": 1
    },
    {
        "13:46": 1
    },
    {
        "13:47": 1
    },
    {
        "13:48": 1
    },
    {
        "13:49": 1
    },
    {
        "13:51": 1
    },
    {
        "13:52": 1
    },
    {
        "13:57": 2
    },
    {
        "13:59": 1
    },
    {
        "14:00": 2
    },
    {
        "14:01": 1
    },
    {
        "14:05": 2
    },
    {
        "14:07": 1
    },
    {
        "14:08": 3
    },
    {
        "14:16": 1
    },
    {
        "14:20": 3
    },
    {
        "14:22": 1
    },
    {
        "14:23": 3
    },
    {
        "14:27": 1
    },
    {
        "14:35": 3
    },
    {
        "14:37": 1
    },
    {
        "14:39": 1
    },
    {
        "14:44": 2
    },
    {
        "14:45": 1
    },
    {
        "14:46": 3
    },
    {
        "14:49": 1
    },
    {
        "14:50": 2
    },
    {
        "14:52": 1
    },
    {
        "14:53": 1
    },
    {
        "14:59": 2
    },
    {
        "15:01": 2
    },
    {
        "15:03": 1
    },
    {
        "15:05": 2
    },
    {
        "15:07": 1
    },
    {
        "15:08": 1
    },
    {
        "15:09": 2
    },
    {
        "15:12": 2
    },
    {
        "15:13": 1
    },
    {
        "15:14": 1
    },
    {
        "15:15": 1
    },
    {
        "15:20": 1
    },
    {
        "15:23": 2
    },
    {
        "15:24": 1
    },
    {
        "15:28": 1
    },
    {
        "15:31": 2
    },
    {
        "15:34": 1
    },
    {
        "15:39": 4
    },
    {
        "15:40": 1
    },
    {
        "15:41": 1
    },
    {
        "15:43": 1
    },
    {
        "15:44": 1
    },
    {
        "15:49": 1
    },
    {
        "15:57": 2
    },
    {
        "16:00": 3
    },
    {
        "16:01": 2
    },
    {
        "16:02": 3
    },
    {
        "16:03": 3
    },
    {
        "16:04": 2
    },
    {
        "16:07": 1
    },
    {
        "16:14": 1
    },
    {
        "16:19": 1
    },
    {
        "16:21": 1
    },
    {
        "16:22": 1
    },
    {
        "16:23": 1
    },
    {
        "16:24": 2
    },
    {
        "16:25": 1
    },
    {
        "16:29": 3
    },
    {
        "16:37": 3
    },
    {
        "16:38": 1
    },
    {
        "16:39": 1
    },
    {
        "16:40": 1
    },
    {
        "16:42": 1
    },
    {
        "16:44": 1
    },
    {
        "16:48": 1
    },
    {
        "16:50": 1
    },
    {
        "16:51": 2
    },
    {
        "16:55": 1
    },
    {
        "16:58": 1
    },
    {
        "17:06": 1
    },
    {
        "17:09": 1
    },
    {
        "17:11": 2
    },
    {
        "17:14": 2
    },
    {
        "17:15": 2
    },
    {
        "17:18": 1
    },
    {
        "17:19": 1
    },
    {
        "17:21": 1
    },
    {
        "17:26": 1
    },
    {
        "17:27": 1
    },
    {
        "17:29": 1
    },
    {
        "17:30": 1
    },
    {
        "17:31": 2
    },
    {
        "17:32": 1
    },
    {
        "17:33": 4
    },
    {
        "17:37": 1
    },
    {
        "17:38": 2
    },
    {
        "17:41": 1
    },
    {
        "17:47": 1
    },
    {
        "17:48": 1
    },
    {
        "17:58": 1
    },
    {
        "18:02": 1
    },
    {
        "18:05": 3
    },
    {
        "18:07": 3
    },
    {
        "18:13": 1
    },
    {
        "18:17": 1
    },
    {
        "18:20": 1
    },
    {
        "18:24": 2
    },
    {
        "18:25": 1
    },
    {
        "18:26": 1
    },
    {
        "18:27": 2
    },
    {
        "18:29": 1
    },
    {
        "18:33": 2
    },
    {
        "18:34": 2
    },
    {
        "18:35": 1
    },
    {
        "18:38": 1
    },
    {
        "18:41": 1
    },
    {
        "18:49": 1
    },
    {
        "18:52": 2
    },
    {
        "18:54": 1
    },
    {
        "18:58": 4
    },
    {
        "19:01": 1
    },
    {
        "19:03": 1
    },
    {
        "19:10": 1
    },
    {
        "19:14": 2
    },
    {
        "19:16": 4
    },
    {
        "19:17": 1
    },
    {
        "19:18": 1
    },
    {
        "19:19": 1
    },
    {
        "19:21": 1
    },
    {
        "19:22": 1
    },
    {
        "19:28": 1
    },
    {
        "19:29": 2
    },
    {
        "19:30": 1
    },
    {
        "19:39": 4
    },
    {
        "19:42": 1
    },
    {
        "19:43": 1
    },
    {
        "19:46": 1
    },
    {
        "19:47": 1
    },
    {
        "19:49": 2
    },
    {
        "19:50": 1
    },
    {
        "19:51": 1
    },
    {
        "19:53": 2
    },
    {
        "20:03": 2
    },
    {
        "20:04": 1
    },
    {
        "20:06": 1
    },
    {
        "20:08": 2
    },
    {
        "20:09": 1
    },
    {
        "20:11": 3
    },
    {
        "20:13": 2
    },
    {
        "20:20": 1
    },
    {
        "20:21": 1
    },
    {
        "20:22": 2
    },
    {
        "20:23": 6
    },
    {
        "20:25": 1
    },
    {
        "20:26": 1
    },
    {
        "20:27": 2
    },
    {
        "20:28": 1
    },
    {
        "20:30": 1
    },
    {
        "20:32": 1
    },
    {
        "20:33": 1
    },
    {
        "20:35": 1
    },
    {
        "20:37": 1
    },
    {
        "20:40": 2
    },
    {
        "20:45": 2
    },
    {
        "20:47": 4
    },
    {
        "20:49": 1
    },
    {
        "20:53": 1
    },
    {
        "20:54": 2
    },
    {
        "20:55": 1
    },
    {
        "20:59": 1
    },
    {
        "21:01": 2
    },
    {
        "21:05": 2
    },
    {
        "21:07": 2
    },
    {
        "21:12": 1
    },
    {
        "21:13": 1
    },
    {
        "21:15": 1
    },
    {
        "21:16": 1
    },
    {
        "21:19": 1
    },
    {
        "21:20": 1
    },
    {
        "21:23": 1
    },
    {
        "21:24": 1
    },
    {
        "21:25": 3
    },
    {
        "21:27": 1
    },
    {
        "21:32": 1
    },
    {
        "21:34": 3
    },
    {
        "21:38": 1
    },
    {
        "21:40": 1
    },
    {
        "21:41": 1
    },
    {
        "21:43": 1
    },
    {
        "21:44": 1
    },
    {
        "21:45": 2
    },
    {
        "21:47": 1
    },
    {
        "21:48": 1
    },
    {
        "21:50": 1
    },
    {
        "21:51": 2
    },
    {
        "21:52": 1
    },
    {
        "21:58": 1
    },
    {
        "22:00": 1
    },
    {
        "22:02": 2
    },
    {
        "22:05": 1
    },
    {
        "22:08": 1
    },
    {
        "22:09": 1
    },
    {
        "22:10": 1
    },
    {
        "22:15": 3
    },
    {
        "22:24": 1
    },
    {
        "22:29": 3
    },
    {
        "22:30": 1
    },
    {
        "22:35": 1
    },
    {
        "22:39": 2
    },
    {
        "22:41": 1
    },
    {
        "22:42": 1
    },
    {
        "22:47": 1
    },
    {
        "22:48": 1
    },
    {
        "22:49": 1
    },
    {
        "22:52": 1
    },
    {
        "22:53": 2
    },
    {
        "22:55": 1
    },
    {
        "22:56": 1
    },
    {
        "23:05": 1
    },
    {
        "23:09": 1
    },
    {
        "23:10": 1
    },
    {
        "23:12": 2
    },
    {
        "23:14": 1
    },
    {
        "23:15": 1
    },
    {
        "23:19": 1
    },
    {
        "23:21": 1
    },
    {
        "23:25": 1
    },
    {
        "23:32": 1
    },
    {
        "23:33": 1
    },
    {
        "23:35": 3
    },
    {
        "23:50": 1
    },
    {
        "23:51": 1
    },
    {
        "23:55": 1
    },
    {
        "23:57": 1
    },
    {
        "23:59": 1
    }
],
  'custom': [
    {
        "0:03": 1
    },
    {
        "0:05": 1
    },
    {
        "0:09": 1
    },
    {
        "0:10": 1
    },
    {
        "0:16": 1
    },
    {
        "0:17": 2
    },
    {
        "0:19": 1
    },
    {
        "0:27": 1
    },
    {
        "0:30": 2
    },
    {
        "0:34": 1
    },
    {
        "0:37": 1
    },
    {
        "0:43": 1
    },
    {
        "0:46": 1
    },
    {
        "0:48": 1
    },
    {
        "0:53": 1
    },
    {
        "0:54": 2
    },
    {
        "1:03": 1
    },
    {
        "1:13": 1
    },
    {
        "1:22": 1
    },
    {
        "1:27": 1
    },
    {
        "1:37": 1
    },
    {
        "1:39": 1
    },
    {
        "1:52": 1
    },
    {
        "2:05": 1
    },
    {
        "2:08": 1
    },
    {
        "2:13": 1
    },
    {
        "2:26": 1
    },
    {
        "2:29": 1
    },
    {
        "2:33": 2
    },
    {
        "2:45": 1
    },
    {
        "2:49": 2
    },
    {
        "2:50": 1
    },
    {
        "2:56": 2
    },
    {
        "3:13": 1
    },
    {
        "3:23": 1
    },
    {
        "3:24": 2
    },
    {
        "3:28": 1
    },
    {
        "3:32": 1
    },
    {
        "3:33": 1
    },
    {
        "3:36": 1
    },
    {
        "3:48": 1
    },
    {
        "3:51": 2
    },
    {
        "3:52": 1
    },
    {
        "3:57": 1
    },
    {
        "4:06": 2
    },
    {
        "4:10": 1
    },
    {
        "4:11": 1
    },
    {
        "4:14": 1
    },
    {
        "4:23": 1
    },
    {
        "4:31": 1
    },
    {
        "4:32": 1
    },
    {
        "4:34": 1
    },
    {
        "4:38": 1
    },
    {
        "4:52": 1
    },
    {
        "4:53": 1
    },
    {
        "4:55": 1
    },
    {
        "4:59": 1
    },
    {
        "5:02": 1
    },
    {
        "5:09": 3
    },
    {
        "5:10": 1
    },
    {
        "5:13": 1
    },
    {
        "5:19": 1
    },
    {
        "5:22": 1
    },
    {
        "5:23": 1
    },
    {
        "5:24": 2
    },
    {
        "5:27": 1
    },
    {
        "5:29": 1
    },
    {
        "5:37": 1
    },
    {
        "5:45": 1
    },
    {
        "5:48": 1
    },
    {
        "5:52": 2
    },
    {
        "5:56": 1
    },
    {
        "5:57": 1
    },
    {
        "5:58": 1
    },
    {
        "6:00": 1
    },
    {
        "6:03": 1
    },
    {
        "6:08": 1
    },
    {
        "6:10": 1
    },
    {
        "6:12": 1
    },
    {
        "6:17": 1
    },
    {
        "6:18": 2
    },
    {
        "6:24": 2
    },
    {
        "6:33": 1
    },
    {
        "6:34": 1
    },
    {
        "6:39": 3
    },
    {
        "6:40": 1
    },
    {
        "6:41": 1
    },
    {
        "6:43": 1
    },
    {
        "6:44": 1
    },
    {
        "6:47": 2
    },
    {
        "6:49": 1
    },
    {
        "6:51": 1
    },
    {
        "6:54": 1
    },
    {
        "6:56": 1
    },
    {
        "6:59": 2
    },
    {
        "7:01": 1
    },
    {
        "7:02": 3
    },
    {
        "7:10": 1
    },
    {
        "7:11": 1
    },
    {
        "7:13": 2
    },
    {
        "7:14": 2
    },
    {
        "7:19": 1
    },
    {
        "7:21": 1
    },
    {
        "7:23": 2
    },
    {
        "7:24": 1
    },
    {
        "7:26": 1
    },
    {
        "7:28": 1
    },
    {
        "7:31": 2
    },
    {
        "7:32": 1
    },
    {
        "7:36": 2
    },
    {
        "7:37": 2
    },
    {
        "7:38": 2
    },
    {
        "7:39": 1
    },
    {
        "7:40": 1
    },
    {
        "7:41": 4
    },
    {
        "7:49": 1
    },
    {
        "7:52": 1
    },
    {
        "7:53": 3
    },
    {
        "7:54": 3
    },
    {
        "7:56": 2
    },
    {
        "7:58": 1
    },
    {
        "8:00": 3
    },
    {
        "8:01": 1
    },
    {
        "8:02": 3
    },
    {
        "8:03": 1
    },
    {
        "8:05": 1
    },
    {
        "8:06": 1
    },
    {
        "8:07": 2
    },
    {
        "8:08": 2
    },
    {
        "8:09": 1
    },
    {
        "8:10": 1
    },
    {
        "8:13": 1
    },
    {
        "8:15": 1
    },
    {
        "8:17": 1
    },
    {
        "8:18": 1
    },
    {
        "8:20": 1
    },
    {
        "8:21": 2
    },
    {
        "8:28": 1
    },
    {
        "8:30": 1
    },
    {
        "8:31": 1
    },
    {
        "8:32": 1
    },
    {
        "8:33": 1
    },
    {
        "8:34": 1
    },
    {
        "8:36": 1
    },
    {
        "8:37": 2
    },
    {
        "8:39": 1
    },
    {
        "8:44": 2
    },
    {
        "8:45": 2
    },
    {
        "8:46": 2
    },
    {
        "8:47": 1
    },
    {
        "8:50": 2
    },
    {
        "8:52": 1
    },
    {
        "8:53": 1
    },
    {
        "8:55": 1
    },
    {
        "8:57": 2
    },
    {
        "8:58": 1
    },
    {
        "8:59": 1
    },
    {
        "9:03": 1
    },
    {
        "9:04": 2
    },
    {
        "9:08": 2
    },
    {
        "9:09": 2
    },
    {
        "9:10": 1
    },
    {
        "9:12": 1
    },
    {
        "9:14": 2
    },
    {
        "9:15": 3
    },
    {
        "9:16": 1
    },
    {
        "9:17": 1
    },
    {
        "9:18": 1
    },
    {
        "9:21": 1
    },
    {
        "9:25": 2
    },
    {
        "9:26": 1
    },
    {
        "9:27": 1
    },
    {
        "9:28": 1
    },
    {
        "9:29": 1
    },
    {
        "9:30": 2
    },
    {
        "9:31": 1
    },
    {
        "9:36": 1
    },
    {
        "9:37": 1
    },
    {
        "9:39": 2
    },
    {
        "9:40": 2
    },
    {
        "9:42": 4
    },
    {
        "9:47": 1
    },
    {
        "9:50": 1
    },
    {
        "9:51": 1
    },
    {
        "9:54": 1
    },
    {
        "9:55": 1
    },
    {
        "9:57": 1
    },
    {
        "9:58": 2
    },
    {
        "9:59": 2
    },
    {
        "10:00": 2
    },
    {
        "10:01": 2
    },
    {
        "10:02": 1
    },
    {
        "10:03": 1
    },
    {
        "10:04": 1
    },
    {
        "10:06": 1
    },
    {
        "10:07": 1
    },
    {
        "10:11": 1
    },
    {
        "10:12": 1
    },
    {
        "10:15": 2
    },
    {
        "10:16": 1
    },
    {
        "10:17": 1
    },
    {
        "10:20": 1
    },
    {
        "10:22": 1
    },
    {
        "10:23": 2
    },
    {
        "10:24": 2
    },
    {
        "10:26": 1
    },
    {
        "10:27": 1
    },
    {
        "10:28": 4
    },
    {
        "10:29": 1
    },
    {
        "10:31": 1
    },
    {
        "10:33": 2
    },
    {
        "10:34": 2
    },
    {
        "10:37": 1
    },
    {
        "10:40": 1
    },
    {
        "10:41": 2
    },
    {
        "10:42": 2
    },
    {
        "10:43": 1
    },
    {
        "10:45": 1
    },
    {
        "10:47": 2
    },
    {
        "10:48": 1
    },
    {
        "10:50": 1
    },
    {
        "10:53": 1
    },
    {
        "10:54": 1
    },
    {
        "10:55": 1
    },
    {
        "10:56": 3
    },
    {
        "10:57": 2
    },
    {
        "10:58": 2
    },
    {
        "10:59": 2
    },
    {
        "11:01": 1
    },
    {
        "11:02": 2
    },
    {
        "11:03": 1
    },
    {
        "11:04": 1
    },
    {
        "11:06": 1
    },
    {
        "11:08": 2
    },
    {
        "11:10": 2
    },
    {
        "11:12": 1
    },
    {
        "11:13": 1
    },
    {
        "11:14": 2
    },
    {
        "11:15": 1
    },
    {
        "11:16": 2
    },
    {
        "11:17": 1
    },
    {
        "11:19": 1
    },
    {
        "11:21": 1
    },
    {
        "11:22": 1
    },
    {
        "11:23": 1
    },
    {
        "11:25": 1
    },
    {
        "11:26": 1
    },
    {
        "11:27": 1
    },
    {
        "11:29": 1
    },
    {
        "11:30": 4
    },
    {
        "11:31": 1
    },
    {
        "11:32": 2
    },
    {
        "11:33": 1
    },
    {
        "11:34": 2
    },
    {
        "11:35": 4
    },
    {
        "11:37": 1
    },
    {
        "11:38": 2
    },
    {
        "11:39": 2
    },
    {
        "11:40": 1
    },
    {
        "11:42": 1
    },
    {
        "11:43": 1
    },
    {
        "11:44": 3
    },
    {
        "11:45": 1
    },
    {
        "11:46": 1
    },
    {
        "11:47": 1
    },
    {
        "11:48": 2
    },
    {
        "11:52": 1
    },
    {
        "11:53": 2
    },
    {
        "11:54": 3
    },
    {
        "11:57": 1
    },
    {
        "11:58": 1
    },
    {
        "12:00": 2
    },
    {
        "12:02": 1
    },
    {
        "12:03": 2
    },
    {
        "12:05": 1
    },
    {
        "12:06": 1
    },
    {
        "12:09": 1
    },
    {
        "12:16": 2
    },
    {
        "12:17": 1
    },
    {
        "12:19": 3
    },
    {
        "12:20": 1
    },
    {
        "12:21": 3
    },
    {
        "12:22": 2
    },
    {
        "12:23": 3
    },
    {
        "12:28": 1
    },
    {
        "12:29": 1
    },
    {
        "12:31": 5
    },
    {
        "12:32": 2
    },
    {
        "12:33": 2
    },
    {
        "12:34": 1
    },
    {
        "12:35": 2
    },
    {
        "12:36": 4
    },
    {
        "12:37": 1
    },
    {
        "12:38": 1
    },
    {
        "12:39": 2
    },
    {
        "12:40": 1
    },
    {
        "12:41": 1
    },
    {
        "12:42": 2
    },
    {
        "12:43": 1
    },
    {
        "12:44": 1
    },
    {
        "12:45": 1
    },
    {
        "12:46": 1
    },
    {
        "12:47": 2
    },
    {
        "12:48": 3
    },
    {
        "12:51": 2
    },
    {
        "12:54": 1
    },
    {
        "12:55": 2
    },
    {
        "12:56": 1
    },
    {
        "12:59": 1
    },
    {
        "13:00": 1
    },
    {
        "13:01": 2
    },
    {
        "13:02": 1
    },
    {
        "13:03": 2
    },
    {
        "13:04": 2
    },
    {
        "13:11": 2
    },
    {
        "13:12": 1
    },
    {
        "13:13": 3
    },
    {
        "13:15": 3
    },
    {
        "13:16": 1
    },
    {
        "13:17": 1
    },
    {
        "13:18": 3
    },
    {
        "13:19": 3
    },
    {
        "13:20": 2
    },
    {
        "13:22": 2
    },
    {
        "13:24": 4
    },
    {
        "13:30": 1
    },
    {
        "13:32": 5
    },
    {
        "13:33": 3
    },
    {
        "13:34": 1
    },
    {
        "13:35": 3
    },
    {
        "13:37": 1
    },
    {
        "13:38": 2
    },
    {
        "13:39": 2
    },
    {
        "13:41": 1
    },
    {
        "13:42": 1
    },
    {
        "13:43": 1
    },
    {
        "13:44": 1
    },
    {
        "13:45": 1
    },
    {
        "13:47": 1
    },
    {
        "13:48": 1
    },
    {
        "13:51": 2
    },
    {
        "13:52": 2
    },
    {
        "13:53": 5
    },
    {
        "13:54": 4
    },
    {
        "13:55": 1
    },
    {
        "13:57": 1
    },
    {
        "13:58": 1
    },
    {
        "13:59": 1
    },
    {
        "14:00": 1
    },
    {
        "14:01": 1
    },
    {
        "14:02": 2
    },
    {
        "14:04": 1
    },
    {
        "14:05": 5
    },
    {
        "14:06": 3
    },
    {
        "14:07": 1
    },
    {
        "14:09": 2
    },
    {
        "14:10": 2
    },
    {
        "14:11": 1
    },
    {
        "14:12": 2
    },
    {
        "14:13": 1
    },
    {
        "14:14": 2
    },
    {
        "14:15": 1
    },
    {
        "14:16": 2
    },
    {
        "14:18": 2
    },
    {
        "14:19": 2
    },
    {
        "14:22": 3
    },
    {
        "14:24": 1
    },
    {
        "14:25": 2
    },
    {
        "14:28": 1
    },
    {
        "14:29": 1
    },
    {
        "14:32": 1
    },
    {
        "14:33": 1
    },
    {
        "14:36": 1
    },
    {
        "14:37": 1
    },
    {
        "14:38": 3
    },
    {
        "14:39": 5
    },
    {
        "14:40": 2
    },
    {
        "14:41": 1
    },
    {
        "14:42": 1
    },
    {
        "14:44": 3
    },
    {
        "14:45": 1
    },
    {
        "14:47": 1
    },
    {
        "14:48": 1
    },
    {
        "14:51": 1
    },
    {
        "14:53": 1
    },
    {
        "14:54": 1
    },
    {
        "14:55": 1
    },
    {
        "14:57": 1
    },
    {
        "14:58": 1
    },
    {
        "15:00": 1
    },
    {
        "15:01": 2
    },
    {
        "15:02": 1
    },
    {
        "15:03": 2
    },
    {
        "15:04": 1
    },
    {
        "15:05": 2
    },
    {
        "15:06": 2
    },
    {
        "15:09": 1
    },
    {
        "15:11": 2
    },
    {
        "15:12": 1
    },
    {
        "15:13": 1
    },
    {
        "15:15": 2
    },
    {
        "15:16": 1
    },
    {
        "15:17": 2
    },
    {
        "15:19": 1
    },
    {
        "15:20": 1
    },
    {
        "15:21": 1
    },
    {
        "15:22": 4
    },
    {
        "15:23": 2
    },
    {
        "15:24": 1
    },
    {
        "15:25": 1
    },
    {
        "15:27": 1
    },
    {
        "15:31": 1
    },
    {
        "15:32": 2
    },
    {
        "15:33": 1
    },
    {
        "15:34": 1
    },
    {
        "15:36": 1
    },
    {
        "15:37": 3
    },
    {
        "15:38": 1
    },
    {
        "15:39": 3
    },
    {
        "15:43": 2
    },
    {
        "15:45": 2
    },
    {
        "15:46": 2
    },
    {
        "15:47": 6
    },
    {
        "15:52": 2
    },
    {
        "15:54": 1
    },
    {
        "15:57": 3
    },
    {
        "15:58": 4
    },
    {
        "15:59": 1
    },
    {
        "16:01": 1
    },
    {
        "16:04": 3
    },
    {
        "16:05": 2
    },
    {
        "16:06": 2
    },
    {
        "16:07": 2
    },
    {
        "16:08": 4
    },
    {
        "16:10": 1
    },
    {
        "16:13": 1
    },
    {
        "16:14": 2
    },
    {
        "16:15": 2
    },
    {
        "16:16": 1
    },
    {
        "16:18": 1
    },
    {
        "16:19": 3
    },
    {
        "16:22": 2
    },
    {
        "16:24": 1
    },
    {
        "16:26": 1
    },
    {
        "16:27": 1
    },
    {
        "16:29": 1
    },
    {
        "16:34": 1
    },
    {
        "16:37": 1
    },
    {
        "16:39": 2
    },
    {
        "16:41": 1
    },
    {
        "16:42": 1
    },
    {
        "16:43": 1
    },
    {
        "16:44": 1
    },
    {
        "16:46": 1
    },
    {
        "16:49": 1
    },
    {
        "16:51": 2
    },
    {
        "16:53": 2
    },
    {
        "16:56": 1
    },
    {
        "16:58": 1
    },
    {
        "16:59": 1
    },
    {
        "17:00": 1
    },
    {
        "17:01": 1
    },
    {
        "17:02": 1
    },
    {
        "17:03": 1
    },
    {
        "17:05": 1
    },
    {
        "17:08": 1
    },
    {
        "17:09": 3
    },
    {
        "17:11": 1
    },
    {
        "17:13": 2
    },
    {
        "17:15": 3
    },
    {
        "17:16": 1
    },
    {
        "17:17": 2
    },
    {
        "17:19": 1
    },
    {
        "17:23": 1
    },
    {
        "17:24": 2
    },
    {
        "17:25": 1
    },
    {
        "17:26": 2
    },
    {
        "17:27": 1
    },
    {
        "17:29": 1
    },
    {
        "17:31": 2
    },
    {
        "17:32": 2
    },
    {
        "17:36": 1
    },
    {
        "17:38": 2
    },
    {
        "17:39": 2
    },
    {
        "17:42": 2
    },
    {
        "17:43": 3
    },
    {
        "17:44": 1
    },
    {
        "17:45": 1
    },
    {
        "17:46": 1
    },
    {
        "17:47": 1
    },
    {
        "17:48": 2
    },
    {
        "17:50": 1
    },
    {
        "17:52": 2
    },
    {
        "17:54": 1
    },
    {
        "17:56": 3
    },
    {
        "17:57": 2
    },
    {
        "17:59": 1
    },
    {
        "18:00": 1
    },
    {
        "18:03": 1
    },
    {
        "18:04": 1
    },
    {
        "18:06": 3
    },
    {
        "18:07": 3
    },
    {
        "18:08": 1
    },
    {
        "18:09": 3
    },
    {
        "18:10": 3
    },
    {
        "18:11": 1
    },
    {
        "18:15": 1
    },
    {
        "18:16": 1
    },
    {
        "18:17": 1
    },
    {
        "18:19": 3
    },
    {
        "18:21": 1
    },
    {
        "18:22": 2
    },
    {
        "18:25": 1
    },
    {
        "18:26": 1
    },
    {
        "18:27": 1
    },
    {
        "18:28": 3
    },
    {
        "18:29": 1
    },
    {
        "18:30": 2
    },
    {
        "18:31": 2
    },
    {
        "18:32": 1
    },
    {
        "18:34": 1
    },
    {
        "18:35": 1
    },
    {
        "18:36": 1
    },
    {
        "18:37": 3
    },
    {
        "18:38": 2
    },
    {
        "18:40": 2
    },
    {
        "18:41": 2
    },
    {
        "18:42": 1
    },
    {
        "18:44": 3
    },
    {
        "18:45": 1
    },
    {
        "18:47": 8
    },
    {
        "18:48": 1
    },
    {
        "18:50": 1
    },
    {
        "18:51": 1
    },
    {
        "18:52": 1
    },
    {
        "18:53": 1
    },
    {
        "18:54": 2
    },
    {
        "18:57": 1
    },
    {
        "18:58": 4
    },
    {
        "19:00": 1
    },
    {
        "19:01": 1
    },
    {
        "19:02": 2
    },
    {
        "19:03": 1
    },
    {
        "19:04": 1
    },
    {
        "19:06": 2
    },
    {
        "19:07": 3
    },
    {
        "19:08": 1
    },
    {
        "19:09": 2
    },
    {
        "19:12": 3
    },
    {
        "19:13": 1
    },
    {
        "19:15": 1
    },
    {
        "19:16": 1
    },
    {
        "19:17": 1
    },
    {
        "19:19": 2
    },
    {
        "19:20": 2
    },
    {
        "19:22": 1
    },
    {
        "19:25": 1
    },
    {
        "19:26": 1
    },
    {
        "19:32": 2
    },
    {
        "19:33": 1
    },
    {
        "19:34": 2
    },
    {
        "19:36": 2
    },
    {
        "19:37": 1
    },
    {
        "19:38": 3
    },
    {
        "19:42": 1
    },
    {
        "19:45": 1
    },
    {
        "19:46": 1
    },
    {
        "19:47": 3
    },
    {
        "19:51": 2
    },
    {
        "19:52": 2
    },
    {
        "19:53": 2
    },
    {
        "19:54": 1
    },
    {
        "19:55": 1
    },
    {
        "19:57": 2
    },
    {
        "20:02": 1
    },
    {
        "20:03": 1
    },
    {
        "20:04": 1
    },
    {
        "20:05": 2
    },
    {
        "20:06": 1
    },
    {
        "20:09": 3
    },
    {
        "20:10": 1
    },
    {
        "20:11": 2
    },
    {
        "20:12": 2
    },
    {
        "20:13": 3
    },
    {
        "20:15": 2
    },
    {
        "20:20": 1
    },
    {
        "20:21": 1
    },
    {
        "20:22": 2
    },
    {
        "20:23": 1
    },
    {
        "20:24": 1
    },
    {
        "20:25": 1
    },
    {
        "20:26": 1
    },
    {
        "20:27": 1
    },
    {
        "20:28": 1
    },
    {
        "20:30": 1
    },
    {
        "20:31": 1
    },
    {
        "20:35": 2
    },
    {
        "20:36": 1
    },
    {
        "20:37": 2
    },
    {
        "20:38": 1
    },
    {
        "20:41": 3
    },
    {
        "20:42": 1
    },
    {
        "20:43": 3
    },
    {
        "20:45": 1
    },
    {
        "20:47": 1
    },
    {
        "20:49": 1
    },
    {
        "20:51": 2
    },
    {
        "20:55": 2
    },
    {
        "20:56": 2
    },
    {
        "20:57": 2
    },
    {
        "20:58": 2
    },
    {
        "21:00": 1
    },
    {
        "21:02": 9
    },
    {
        "21:03": 3
    },
    {
        "21:07": 2
    },
    {
        "21:08": 1
    },
    {
        "21:09": 2
    },
    {
        "21:11": 3
    },
    {
        "21:12": 2
    },
    {
        "21:13": 2
    },
    {
        "21:15": 2
    },
    {
        "21:16": 2
    },
    {
        "21:18": 1
    },
    {
        "21:19": 4
    },
    {
        "21:21": 2
    },
    {
        "21:22": 1
    },
    {
        "21:24": 2
    },
    {
        "21:25": 2
    },
    {
        "21:28": 4
    },
    {
        "21:29": 1
    },
    {
        "21:31": 2
    },
    {
        "21:32": 1
    },
    {
        "21:34": 2
    },
    {
        "21:38": 2
    },
    {
        "21:39": 2
    },
    {
        "21:41": 1
    },
    {
        "21:43": 1
    },
    {
        "21:44": 1
    },
    {
        "21:45": 1
    },
    {
        "21:47": 1
    },
    {
        "21:50": 1
    },
    {
        "21:53": 1
    },
    {
        "21:55": 3
    },
    {
        "21:57": 3
    },
    {
        "21:58": 1
    },
    {
        "22:00": 1
    },
    {
        "22:02": 1
    },
    {
        "22:03": 1
    },
    {
        "22:04": 1
    },
    {
        "22:05": 2
    },
    {
        "22:08": 1
    },
    {
        "22:12": 1
    },
    {
        "22:15": 2
    },
    {
        "22:16": 2
    },
    {
        "22:18": 2
    },
    {
        "22:19": 1
    },
    {
        "22:22": 2
    },
    {
        "22:26": 2
    },
    {
        "22:31": 1
    },
    {
        "22:33": 2
    },
    {
        "22:34": 2
    },
    {
        "22:35": 1
    },
    {
        "22:36": 1
    },
    {
        "22:37": 1
    },
    {
        "22:38": 1
    },
    {
        "22:40": 1
    },
    {
        "22:41": 1
    },
    {
        "22:42": 1
    },
    {
        "22:43": 2
    },
    {
        "22:47": 1
    },
    {
        "22:48": 1
    },
    {
        "22:49": 1
    },
    {
        "22:52": 1
    },
    {
        "22:54": 4
    },
    {
        "22:56": 1
    },
    {
        "22:57": 3
    },
    {
        "23:00": 1
    },
    {
        "23:02": 2
    },
    {
        "23:06": 1
    },
    {
        "23:07": 1
    },
    {
        "23:12": 1
    },
    {
        "23:14": 1
    },
    {
        "23:15": 1
    },
    {
        "23:22": 1
    },
    {
        "23:24": 2
    },
    {
        "23:26": 1
    },
    {
        "23:27": 2
    },
    {
        "23:28": 2
    },
    {
        "23:31": 1
    },
    {
        "23:37": 1
    },
    {
        "23:41": 1
    },
    {
        "23:44": 1
    },
    {
        "23:45": 3
    },
    {
        "23:46": 3
    },
    {
        "23:47": 1
    },
    {
        "23:48": 2
    },
    {
        "23:50": 1
    },
    {
        "23:51": 1
    },
    {
        "23:55": 1
    }
]
}

export async function mockGetAllShops(params) {
  console.log('mockGetAllShops', params)

  return mockShops
}

export async function mockGetDashBoard(selectedRange, idShop) {
  return mockDashBoard[idShop]
}

export async function mockGetAbcData(viewType) {
  return mockABC[viewType]
}

export async function mockGetGeographyData() {
  return mockGeo
}

export async function mockGetAnalysisData() {
  return mockStock
}

export async function mockGetChartDetailData(selectedRangeDetail){
  if (selectedRangeDetail.from || selectedRangeDetail.to){
    return mockDetailChartData['custom']
  }
  return mockDetailChartData[selectedRangeDetail.period]
}

export function checkMockData(){
    const { user } = useContext(AuthContext);
    console.log(user)
    console.log(user['subscription_status'] === null);
    return user['subscription_status'] === null
}