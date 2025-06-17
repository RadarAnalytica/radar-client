import { createSlice } from "@reduxjs/toolkit";

const mockOptions = [
    {value: 'Все бренды'},
    {value: '1'},
    {value: '2'},
    {value: '3'},
]


const initialState = {
    supplierCurrentBrand: 'Все бренды',
    ordersStructureTab: 'По группам цветов',
    stockChartTab: 'Входящие заказы',
    supplierBrands: mockOptions
};

const supplierAnalysisSlice = createSlice({
    name: "supplierAnalysis",
    initialState,
    reducers: {
        setSupplierCurrentBrand: (state, action) => {
            return {
                ...state,
                supplierCurrentBrand: action.payload
            }
        },
        setOrdersStructureTab: (state, action) => {
            return {
                ...state,
                ordersStructureTab: action.payload
            }
        },
        setStockChartTab: (state, action) => {
            return {
                ...state,
                stockChartTab: action.payload
            }
        },
    },
    // extraReducers: (bulder) => {
    //     bulder
    //         .addCase(fetchSkuAnalysisMainChartData.fulfilled, (state, action) => {
    //             state.skuChartData = action.payload;
    //         })
    //     .addCase(fetchSkuAnalysisSkuData.fulfilled, (state, action) => {
    //             state.skuMainData = action.payload;
    //     })
    //     .addCase(fetchSkuAnalysisIndicatorsData.fulfilled, (state, action) => {
    //             state.skuIndicatorsData = action.payload;
    //     })
    //     .addCase(fetchSkuAnalysisMainTableData.fulfilled, (state, action) => {
    //             state.skuMainTableData = action.payload;
    //     })
    //     .addCase(fetchSkuAnalysisByColorTableData.fulfilled, (state, action) => {
    //             state.skuByColorTableData = action.payload;
    //     })
    //     .addCase(fetchSkuAnalysisByWarehousesTableData.fulfilled, (state, action) => {
    //             state.skuByWarehouseTableData = action.payload;
    //     })
    //     .addCase(fetchSkuAnalysisBySizeTableData.fulfilled, (state, action) => {
    //             state.skuBySizeTableData = action.payload;
    //     })
    // }
});

export const { reducer, actions } = supplierAnalysisSlice;