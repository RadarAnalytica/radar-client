import React, { useMemo } from 'react';
import AuthContext from '../../service/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../../components/sharedComponents/sidebar/sidebar';
import Header from '../../components/sharedComponents/header/header';
import { ServiceFunctions } from '../../service/serviceFunctions';
import { fileDownload } from '../../service/utils';
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent';
import { NoDataWidget } from '../productsGroupsPages/widgets';
import { AddGroupModal } from '../productsGroupsPages/features';
import { ConfigProvider, Button, Popover } from 'antd';
import AddSkuModal from './widget/AddSkuModal/AddSkuModal';
import styles from './Rnp.module.css';
import ReportTable from '../../components/sharedComponents/ReportTable/ReportTable';
import TableSettingModal from '../../components/sharedComponents/modals/tableSettingModal/TableSettingModal';
import { useAppSelector } from '../../redux/hooks';
import SelfCostWarningBlock from '../../components/sharedComponents/selfCostWraningBlock/selfCostWarningBlock';
import {
	eachWeekOfInterval,
	format,
	formatISO,
	endOfWeek,
	getISOWeek,
} from 'date-fns';
import downloadIcon from '../images/Download.svg';
import DataCollectWarningBlock from '../../components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock'
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

	const [skuList, setSkuList] = useState([]); 
	// const [skuList, setSkuList] = useState([
	// 		{
	// 			title: 'Ремень кожаный для брюк и джинс, резинка в подарок',

	// 		}
	// 	]); 

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
					<SkuList data={skuList} setAddSkuModalShow={setAddSkuModalShow} />
				)}

				{!loading && skuList.length === 0 &&
					<NoDataWidget
						mainTitle='Здесь пока нет ни одного артикула'
						mainText='Добавьте артикулы для отчета «Рука на пульсе»'
						buttonTitle='Добавить'
						action={() => setAddSkuModalShow(true)}
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
					addSku={saveSkuHandler}
				/>
			</section>
    </main>
  )
}