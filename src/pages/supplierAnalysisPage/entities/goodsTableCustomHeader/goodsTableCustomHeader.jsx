import styles from './goodsTableCustomHeader.module.css'
import { Select, ConfigProvider } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { actions as supplierAnalysisActions } from '../../../../redux/supplierAnalysis/supplierAnalysisSlice';

const GoodsTableCustomHeader = () => {

    const dispatch = useAppDispatch();
    const { supplierCurrentBrand, supplierBrands } = useAppSelector(store => store.supplierAnalysis)

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