import styles from './goodsTableCustomHeader.module.css'
import { Select, ConfigProvider } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { fetchSupplierAnalysisBrandsData } from '../../../../redux/supplierAnalysis/supplierAnalysisActions';
import { actions as supplierAnalysisActions } from '../../../../redux/supplierAnalysis/supplierAnalysisSlice';

const GoodsTableCustomHeader = ({ id }) => {

    const dispatch = useAppDispatch();
    const { supplierCurrentBrand, supplierBrands } = useAppSelector(store => store.supplierAnalysis)

    useEffect(() => {

        if (id) {
            const requestObject = {
                "supplier_id": id,
                "period": 30,
                // "date_from": "2025-07-30",
                // "date_to": "2025-07-30",
                // "page": 1,
                // "limit": 25,
                // "sorting": {
                //     "sort_field": "revenue",
                //     "sort_order": "DESC"
                // }
            }
            dispatch(fetchSupplierAnalysisBrandsData(requestObject))
        }

    }, [id])

    return (
        <div className={styles.header}>
            <p className={styles.header__title}>Товары поставщика</p>
            <ConfigProvider
                renderEmpty={() => (<div style={{ cursor: 'default' }}>Нет данных</div>)}
                theme={{
                    token: {
                        colorBgContainer: '#EAEAF1',
                        colorBorder: 'transparent',
                        borderRadius: 8,
                        fontFamily: 'Mulish',
                        fontSize: 14,
                    },
                    components: {
                        Select: {
                            activeBorderColor: 'transparent',
                            activeOutlineColor: 'transparent',
                            hoverBorderColor: 'transparent',
                            optionActiveBg: 'transparent',
                            optionFontSize: 16,
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
                    variant="filled"
                    options={supplierBrands}
                    value={supplierCurrentBrand}
                    onChange={(value) => dispatch(supplierAnalysisActions.setSupplierCurrentBrand(value))}
                />
            </ConfigProvider>
        </div>
    )
}

export default GoodsTableCustomHeader;