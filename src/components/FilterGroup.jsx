import styles from './FilterGroup.module.css';

const FilterGroup = ({ title, options, selected, onSelect, onClearAll }) => {
  return (
    <div className={styles.filterGroup}>
      <div className={styles.filterHeader}>
        <h3>{title}</h3>
        <button onClick={onClearAll} className={styles.clearButton}>
          Снять все
        </button>
      </div>
      <div className={styles.optionsList}>
        {options.map((option) => (
          <label key={option.id} className={styles.optionLabel}>
            <input
              type='checkbox'
              checked={selected.includes(option.id)}
              onChange={() => onSelect(option.id)}
              className={styles.checkbox}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;
