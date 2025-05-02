import { TimeSelect, PlainSelect } from "../../../../components/sharedComponents/apiServicePagesFiltersComponent/features"
import styles from './ReportFilter.module.css'
function Filter({
  shopOptions,
  brandOptions,
  groupOptions,
  itemOptions
}){
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <TimeSelect />
      </div>
      <div className={styles.item}>
        <PlainSelect id='shop' label={'Магазины'} optionsData={shopOptions} />
      </div>
      <div className={styles.item}>
        <PlainSelect id='brand' label={'Бренды'} optionsData={brandOptions} />
      </div>
      <div className={styles.item}>
        <PlainSelect id='group' label={'Группы'} optionsData={groupOptions} />
      </div>
      <div className={styles.item}>
        <PlainSelect id='item' label={'Артикулы'} optionsData={itemOptions} />
      </div>
    </div>
  )
}

export default Filter