import styles from './FilterGroup.module.css';

const FilterGroup = ({
  title,
  options = [],
  selected = [],
  onSelect,
  onClearAll,
  size,
}) => {
  // Add safety check to ensure options is an array
  const safeOptions = Array.isArray(options) ? options : [];

  // Add safety check before using includes
  const isSelected = (id) => {
    return Array.isArray(selected) && selected.includes(id);
  };

  return (
    <div
      className={size === 'big' ? styles.filterGroupBig : styles.filterGroup}
    >
      <div className={styles.filterHeader}>
        <h3>{title}</h3>
        <button onClick={onClearAll} className={styles.clearButton}>
          Снять все
        </button>
      </div>
      <div className={styles.optionsList}>
        {safeOptions.map((option) => (
          <label key={option.id} className={styles.optionLabel}>
            <input
              type='checkbox'
              checked={isSelected(option.label)}
              onChange={() => onSelect(option.label)}
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
