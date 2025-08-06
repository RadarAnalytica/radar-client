import React, { useMemo } from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import { NoDataWidget } from '../productsGroupsPages/widgets';
import AddSkuModal from './widget/AddSkuModal/AddSkuModal';
import styles from './Rnp.module.css';
import { useAppSelector } from '../../redux/hooks';
import downloadIcon from '../images/Download.svg';
import SkuList from './widget/SkuList/SkuList';

const initAlertState = {
    isVisible: false,
    message: '',
}

export default function Rnp() {
  const { authToken } = useContext(AuthContext);
	const { activeBrand, selectedRange } = useAppSelector(
		(state) => state.filters
	);
	const filters = useAppSelector((state) => state.filters);
	const { shops } = useAppSelector((state) => state.shopsSlice);
  const shopStatus = useMemo(() => {
      if (!activeBrand || !shops) return null;
      
      if (activeBrand.id === 0) {
          return {
              id: 0,
              brand_name: 'Все',
              is_active: shops.some(shop => shop.is_primary_collect),
              is_valid: true,
              is_primary_collect: shops.some(shop => shop.is_primary_collect),
              is_self_cost_set: !shops.some(shop => !shop.is_self_cost_set)
          };
      }
      
      return shops.find(shop => shop.id === activeBrand.id);
  }, [activeBrand, shops]);
  const [loading, setLoading] = useState(false);

	const [addSkuModalShow, setAddSkuModalShow] = useState(false)
		const [alertState, setAlertState] = useState(initAlertState);

	// -----------

	// const [skuList, setSkuList] = useState([]); 
	const [skuList, setSkuList] = useState([
		{
				"id": 1,
				"photo": "https://basket-12.wbbasket.ru/vol1735/part173548/173548176/images/c246x328/1.webp",
				"title": "гирлянда круглая золото",
				"shop": 138,
				sku: 123321123321
		},
		{
			"id": 2,
			"photo": "https://basket-14.wbbasket.ru/vol2154/part215481/215481827/images/c246x328/1.webp",
			"title": "гирлянда круглая золото",
			"shop": 138,
			sku: 123321123321
		},
	]); 

	function saveSkuHandler () {
		setSkuList([
			{
				title: 'Ремень кожаный для брюк и джинс, резинка в подарок',

			}
		])
	}

	// ------------

	const getGroupData = async (authToken, groupId) => {
			try {
				setLoading(true)
					const res = await fetch(`${URL}/api/product/product_groups/${groupId}`, {
							headers: {
									'content-type': 'application/json',
									'authorization': 'JWT ' + authToken
							},
					})

					if (!res.ok) {
							const parsedData = await res.json()
							setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: parsedData?.detail || 'Что-то пошло не так :(' })
							return;
					}
					const parsedRes = await res.json();
					let sortedData = parsedRes.data
					sortedData = {
							...sortedData,
							products: sortedData.products.sort((a, b) => a.article.localeCompare(b.article))
					}
					setSkuList(sortedData)
					setDataFetchingStatus(initDataFetchingStatus)
			} catch {
					setDataFetchingStatus({ ...initDataFetchingStatus, isError: true, message: 'Что-то пошло не так :(' })
			}
	}



  return(
    <main className={styles.page}>
			<MobilePlug />
			{/* ------ SIDE BAR ------ */}
			<section className={styles.page__sideNavWrapper}>
				<Sidebar />
			</section>
			{/* ------ CONTENT ------ */}
			<section className={styles.page__content}>
				{/* header */}
				<div className={styles.page__headerWrapper}>
					<Header title="Рука на пульсе"></Header>
				</div>



				{/* 
				{!loading && shopStatus && !shopStatus?.is_self_cost_set && (
					<SelfCostWarningBlock />
				)}
				{!loading && !shopStatus?.is_primary_collect && (
						<DataCollectWarningBlock
								title='Ваши данные еще формируются и обрабатываются.'
						/>
				)}
				*/} 

				{!loading && skuList.length !== 0 && (
					<SkuList data={skuList} setAddSkuModalShow={setAddSkuModalShow} setSkuList={setSkuList} />
				)}

				{!loading && skuList.length === 0 &&
					<NoDataWidget
						mainTitle='Здесь пока нет ни одного артикула'
						mainText='Добавьте артикулы для отчета «Рука на пульсе»'
						buttonTitle='Добавить'
						action={() => setAddSkuModalShow(true)}
						how={false}
					/>
				}

				<AddSkuModal
					isAddSkuModalVisible={addSkuModalShow}
					setIsAddSkuModalVisible={setAddSkuModalShow}
					setDataFetchingStatus={console.log}
					groupData={skuList}
					getGroupData={getGroupData}
					initDataFetchingStatus={{}}
					authToken={authToken}
					shops={shops}
					setAlertState={setAlertState}
					dataFetchingStatus={{isLoading: loading}}
					addSku={setSkuList}
					skuList={skuList}
				/>
			</section>
    </main>
  )
}