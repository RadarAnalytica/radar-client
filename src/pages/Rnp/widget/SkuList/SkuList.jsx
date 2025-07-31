import { useState } from 'react';
import { ConfigProvider, Button, Flex } from 'antd';
import SkuTable from '../SkuTable/SkuTable';
import styles from './SkuList.module.css';
import { Filters } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent';
import SkuHeader from '../SkuHeader/SkuHeader';

export default function SkuList({ data, setAddSkuModalShow }) {
	console.log('skuList', data);
	const [view, setView] = useState('sku');
	return (
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
						defaultColor: 'grey',
						contentFontSize: 16,
						fontWeight: 500,
						defaultBorderColor: 'transparent',
						defaultColor: 'rgba(26, 26, 26, 0.5)',
						defaultBg: 'transparent',
						defaultHoverBg: '#EEEAFF',
						defaultHoverColor: '#1a1a1a',
						defaultHoverBorderColor: 'transparent',
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
			<div>
				<Filters />
			</div>
			{view === 'sku' && (
				<>
					<div className={styles.container}>
            <header className={styles.item__header}>
						  <SkuHeader />
            </header>
						<SkuTable
							data={null}
							columns={null}
							defaultExpandAllRows={view === 'sku'}
						/>
					</div>
					<div className={styles.container}>
            <header className={styles.item__header}>
						  <SkuHeader />
            </header>
						<SkuTable
							data={null}
							columns={null}
							defaultExpandAllRows={view === 'sku'}
						/>
					</div>
				</>
			)}
			{view === 'total' && (
        <div className={styles.container}>
          <SkuTable
							data={null}
							columns={null}
							defaultExpandAllRows={view === 'sku'}
						/>
        </div>
      )}
		</ConfigProvider>
	);
}
