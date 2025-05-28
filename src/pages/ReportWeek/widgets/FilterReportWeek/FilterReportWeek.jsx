import styles from './FilterReportWeek.module.css';
import PeriodsFilterReportWeek from '../PeriodsFilterReportWeek/PeriodsFilterReportWeek';
import { Filters } from '../../../../components/sharedComponents/apiServicePagesFiltersComponent';

function FilterReportWeek({
	period,
	periodOptions,
	setPeriod,
	setLoading,
}) {
	
	return (
		<div className={styles.container}>
			{periodOptions && (
				<div className={styles.item}>
					<PeriodsFilterReportWeek 
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
