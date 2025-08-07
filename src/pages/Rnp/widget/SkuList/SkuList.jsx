import { useEffect, useState } from 'react';
import { ConfigProvider, Button, Flex } from 'antd';
import SkuTable from '../SkuTable/SkuTable';
import styles from './SkuList.module.css';
import { Filters } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent';
import SkuHeader from '../SkuItem/SkuItem';
import { useAppSelector } from '../../../../redux/hooks';
import { grip, remove, expand } from '../icons';

export default function SkuList({ data, setAddSkuModalShow, setSkuList,  }) {
	console.log('skuList', data);
	const { shops } = useAppSelector((state) => state.shopsSlice);
	const [view, setView] = useState('sku');
	const [expanded, setExpanded] = useState(null);
	useEffect(() => {
		if (data?.length > 0){
			setExpanded(data[0].id)
		}
	}, [data, setAddSkuModalShow])

	const expandHandler = (value) => {
		setExpanded((id) => id !== value ? value : null)
	}
	
	const removeHandler = (value) => {
		setSkuList((list) => list.filter((el) => el.id !== value))
	}


	return (
		<>
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#EEEAFF',
					colorTextLightSolid: '#1a1a1a',
					fontSize: 16,
					borderRadius: 8,
				},
				components: {
					Button: {
						paddingBlockLG: 10,
						paddingInlineLG: 20,
						controlHeightLG: 45,
						defaultShadow: false,
						contentFontSize: 16,
						fontWeight: 500,
						defaultBorderColor: 'transparent',
						defaultColor: 'rgba(26, 26, 26, 0.5)',
						defaultBg: 'transparent',
						defaultHoverBg: '#EEEAFF',
						defaultHoverColor: '#1a1a1a',
						defaultHoverBorderColor: 'transparent',
						defaultActiveColor: 'rgba(26, 26, 26, 1)',
						defaultActiveBg: '#EEEAFF',
						defaultActiveBorderColor: '#EEEAFF',
					},
				},
			}}
		>
			<Flex justify='space-between'>
        <Flex>
          <Button
            type={view === 'sku' ? 'primary' : 'default'}
            size="large"
            onClick={() => setView('sku')}
          >
            По артикулам
          </Button>
          <Button
            type={view === 'total' ? 'primary' : 'default'}
            size="large"
            onClick={() => setView('total')}
          >
            Сводный
          </Button>
        </Flex>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#5329ff',
              colorText: '#fff'
            },
            components: {
              Button: {
                primaryColor: '#fff',
              }
            }
          }

            }>
          <Button
            type='primary'
            size='large'
            onClick={setAddSkuModalShow}
          >
            Добавить артикул
          </Button>
        </ConfigProvider>
			</Flex>
		</ConfigProvider>
			<div>
				<Filters />
			</div>
			<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#EEEAFF',
					colorTextLightSolid: '#1a1a1a',
					fontSize: 16,
					borderRadius: 8,
				},
				components: {
					Button: {
						paddingBlockLG: 10,
						paddingInlineLG: 20,
						controlHeightLG: 45,
						defaultShadow: false,
						contentFontSize: 16,
						fontWeight: 500,
						defaultBorderColor: 'transparent',
						defaultColor: 'rgba(26, 26, 26, 0.5)',
						defaultBg: 'transparent',
						defaultHoverBg: '#EEEAFF',
						defaultHoverColor: '#1a1a1a',
						defaultHoverBorderColor: 'transparent',
						defaultActiveColor: 'rgba(26, 26, 26, 1)',
						defaultActiveBg: '#EEEAFF',
						defaultActiveBorderColor: '#EEEAFF',
					},
				},
			}}
		>
			{view === 'sku' && (
				<>
					{data?.map((el, i) => (
						<div key={i} className={styles.item}>
							<header className={styles.item__header}>
								<Flex gap={20} align='center'>
									<Button
										className={styles.item__button}
										icon={grip} />
									<div className={styles.item__product}>
										<SkuHeader title={el.article_data.title} photo={el.article_data.photo} sku={el.article_data.wb_id} shop={el.article_data.shop_name} />
									</div>
									<Button
										className={styles.item__button}
										onClick={() => removeHandler(el.id)}
										icon={remove} />
									<Button
										className={`${styles.item__button} ${expanded === el.id && styles.item__button_expand}`}
										value={el.id}
										onClick={() => expandHandler(el.id)}
										icon={expand}
									></Button>
								</Flex>
							</header>
							{expanded === el.id && <div className={`${styles.item__table} ${styles.item}`}><SkuTable
								data={el.table.rows}
								columns={el.table.columns}
								defaultExpandAllRows={view === 'sku'}
							/></div>}
						</div>
					))}
				</>
			)}
			{view === 'total' && (
        <div className={styles.item}>
          {/* <SkuTable
							data={null}
							columns={null}
							defaultExpandAllRows={view === 'sku'}
						/> */}
        </div>
      )}
			</ConfigProvider>
		</>
	);
}
