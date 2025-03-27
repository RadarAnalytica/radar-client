import styles from './plainSelect.module.css'
import { SelectIcon } from '../../shared'

export const PlainSelect = (
    {
        selectId, //string
        label, //string
        value, //string | number
        optionsData, //array
        handler, // (e) => void
    }
) => {

    return (
        <div className={styles.plainSelect}>
            <label
                className={styles.plainSelect__label}
                htmlFor={selectId}
            >
                {label}
            </label>
            <div className={styles.plainSelect__selectWrapper }>
                <select
                    className={styles.plainSelect__select}
                    id={selectId}
                    value={value}
                    onChange={handler}
                >
                    {optionsData &&
                        optionsData?.map((brand) => (
                            <option
                                key={brand.id}
                                value={brand.id}
                            >
                                {brand.brand_name}
                            </option>
                        ))}
                </select>
                <div className={styles.plainSelect__iconWrapper}>
                    <SelectIcon />
                </div>
            </div>
        </div>
    )
}