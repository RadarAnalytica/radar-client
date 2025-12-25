import { useEffect, useState } from 'react';
import styles from './goodsTableCustomHeader.module.css';
import { ConfigProvider, Select } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { actions as supplierAnalysisActions } from '../../../../redux/supplierAnalysis/supplierAnalysisSlice';
import { selectSupplierCurrentBrand, selectSupplierBrands } from '../../../../redux/supplierAnalysis/supplierAnalysisSelectors';
import { fetchSupplierAnalysisBrandsData } from '../../../../redux/supplierAnalysis/supplierAnalysisActions';

const GoodsTableCustomHeader = ({ id }) => {

    const dispatch = useAppDispatch();
    const supplierCurrentBrand = useAppSelector(selectSupplierCurrentBrand);
    const supplierBrands = useAppSelector(selectSupplierBrands);
    const [selectState, setSelectState] = useState(null)

    useEffect(() => {
        if (id) {
            const requestObject = {
                "supplier_id": id,
                "period": 30,
            };
            dispatch(fetchSupplierAnalysisBrandsData(requestObject));
        }
    }, [id]);

    useEffect(() => {
        if (!selectState && supplierCurrentBrand) {
            setSelectState(supplierCurrentBrand)
        }
    }, [selectState, supplierCurrentBrand])

    useEffect(() => {
        const timeout = setTimeout(() => { dispatch(supplierAnalysisActions.setSupplierCurrentBrand(selectState)) }, 100)
        return () => {
            clearTimeout(timeout)
        }
    }, [selectState])

    return (
        <div className={styles.header}>
            <p className={styles.header__title}>Товары поставщика</p>
            <ConfigProvider
                renderEmpty={() => (<div>Нет данных</div>)}
                theme={{
                    token: {
                        colorBgContainer: 'white',
                        colorBorder: '#5329FF1A',
                        borderRadius: 8,
                        fontFamily: 'Manrope',
                        fontSize: 12,
                        fontWeight: 500,
                    },
                    components: {
                        Select: {
                            activeBorderColor: '#5329FF1A',
                            activeOutlineColor: 'transparent',
                            hoverBorderColor: '#5329FF1A',
                            optionActiveBg: 'transparent',
                            optionFontSize: 14,
                            optionSelectedBg: 'transparent',
                            optionSelectedColor: '#5329FF',

                        }
                    }
                }}
            >
                <Select
                    style={{ width: 240 }}
                    size='large'
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    suffixIcon={
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    }
                    options={supplierBrands ? supplierBrands?.map(_ => ({ value: _.brand_id, label: _.brand_name })) : []}
                    value={selectState}
                    // value={[{ value: supplierCurrentBrand, label: supplierBrands?.find(_ => _?.brand_id === supplierCurrentBrand)?.brand_name || '' }]}
                    onChange={setSelectState}
                />
            </ConfigProvider>
        </div>
    );
};

export default GoodsTableCustomHeader;
