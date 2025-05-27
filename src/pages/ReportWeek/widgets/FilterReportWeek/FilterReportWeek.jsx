import styles from './FilterReportWeek.module.css';
import PeriodsFilter from '../PeriodsFilter/PeriodsFilter';
import { Filters } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent';


function FilterReportWeek({
	period,
	periodOptions,
	setPeriod,
	setLoading,
}) {
	
	return (
		<div className={styles.container}>
			{/* закоменитил, пока нет поддержки периодов на беке для страницы Отчет по неделям
			{shops && activeBrand && (
				<div className={styles.item}>
					<TimeSelect />
				</div>
			)}
			*/}
			{periodOptions && (
				<div className={styles.item}>
					<PeriodsFilter 
						period={period} 
						periodOptions={periodOptions} 
						setPeriod={setPeriod}
					/>
				</div>)}
			<Filters
				setLoading={setLoading}
				timeSelect={false}
				skuFrequency={false}
			/>
		</div>
	);
}

export default FilterReportWeek;
