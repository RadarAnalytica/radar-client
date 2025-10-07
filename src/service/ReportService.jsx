import { useDispatch, useSelector } from 'react-redux';
import { URL } from './config';
import { switchPLFilter } from '../redux/reportPL/plFiltersSlice';


export const getFilterData = async (pageIdent, authToken) => {

    switch (pageIdent) {
        case 'dashboard':
            return await getDashboardFilters(authToken);
        case 'pl':
            return await getPLFilters(authToken);
        case 'month':
            return await getMonthFilters(authToken);
        case 'goods':
            return await getGoodsFilters(authToken);
        case 'abc':
            return await getABCFilters(authToken);
        case 'penalty':
            return await getPenaltyFilters(authToken);
        case 'charts':
            return await getChartsFilters(authToken);
        default:
            break;
    }
};

export const useSwitchFilterElem = async (pageIdent, filterIdent, filterElem) => {
    const dispatch = useDispatch();
    switch (pageIdent) {
        case 'dashboard':
            return await getDashboardFilters();
        case 'pl':
            dispatch(switchPLFilter(
                  filterIdent, filterElem
                ));
            return;
        case 'month':
            return await getMonthFilters();
        case 'goods':
            return await getGoodsFilters();
        case 'abc':
            return await getABCFilters();
        case 'penalty':
            return await getPenaltyFilters();
        case 'charts':
            return await getChartsFilters();
        default:
            break;
    }
};

const getDashboardFilters = async (authToken) => {
    const response = await fetch(`${URL}/api/report/v2/get-dashboard-filters`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + authToken,
        },
    });
    const data = await response.json();
    return {
        'wh': Array.from(new Set(data.warehouse_name_filter)),
        'brand': Array.from(new Set(data.brand_name_filter)),
        'year': Array.from(new Set(data.date_sale_filter?.years)),
        'month': Array.from(new Set(data.date_sale_filter?.months)),
        'week': Array.from(new Set(data.date_sale_filter?.weekdays)),
        'group': Array.from(new Set(data.groups_filter)),
    };
};


const getPLFilters = async (authToken) => {
    const response = await fetch(`${URL}/api/report/v2/p_l/filters`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + authToken,
        },
    });
    const data = await response.json();
    return {
        'brand': data.brand_filter,
        'group': data.group_filter,
    };
};

const getMonthFilters = async (authToken) => {
    const response = await fetch(`${URL}/api/report/v2/get-month-product-filters`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + authToken,
        },
    });
    const data = await response.json();
    return {
        'size': data.size_name_filter,
        'vendorCode': data.vendor_code_filter,
        'product': data.title_filter,
        'group': data.groups_filter,
        'brand': data.brand_name_filter,
        'country': data.country_filter,
        'wbId': data.wb_id_filter,
        'subject': data.subject_name_filter,
        'srid': data.srid_filter,
        'year': data.date_sale_filter.years,
        'month': data.date_sale_filter.months,
        'week': data.date_sale_filter.weekdays,
    };
};

const getGoodsFilters = async (authToken) => {
    const response = await fetch(`${URL}/api/report/v2/get-month-product-filters`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + authToken,
        },
    });
    const data = await response.json();
    return {
        'size': data.size_name_filter,
        'vendorCode': data.vendor_code_filter,
        'product': data.title_filter,
        'group': data.groups_filter,
        'brand': data.brand_name_filter,
        'country': data.country_filter,
        'wbId': data.wb_id_filter,
        'subject': data.subject_name_filter,
        'srid': data.srid_filter,
        'year': data.date_sale_filter.years,
        'month': data.date_sale_filter.months,
        'week': data.date_sale_filter.weekdays,
    };
};

const getABCFilters = async (authToken) => {
    const response = await fetch(`${URL}/api/report/v2/abc/filters`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + authToken,
        },
    });
    const data = await response.json();
    return {
        'brand': data.brand_filter,
        'year': data.year_filter,
        'month': data.month_filter,
        'week': data.week_filter,
        'group': data.group_filter,
        'wbId': data.article_filter,
        'product': data.product_filter,
    };
};

const getPenaltyFilters = async (authToken) => {
    const response = await fetch(`${URL}/api/report/v2/get-penalties-filters`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + authToken,
        },
    });
    const data = await response.json();
    return {
        'year': data.date_sale_filter?.years || [],
        'month': data.date_sale_filter?.months || [],
        'week': data.date_sale_filter?.weekdays || [],
        'wbId': data.wb_id_filter,
        'size': data.size_name_filter,
        'srid': data.srid_filter,
        'types': data.action_type_filter,
        'product': data.title_filter,
    };
};

const getChartsFilters = async (authToken) => {
    const response = await fetch(`${URL}/api/report/v2/get-charts-filters`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + authToken,
        },
    });
    const data = await response.json();
    return {
        'brand': data.brand_name_filter,
        'year': data.date_sale_filter?.years || [],
        'month': data.date_sale_filter?.months || [],
        'week': data.date_sale_filter?.weekdays || [],
        'group': data.groups_filter,
        'wbId': data.wb_id_filter,
    };
};
