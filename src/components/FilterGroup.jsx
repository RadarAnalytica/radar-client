import styles from './FilterGroup.module.css';

const FilterGroup = ({
  title,
  options = [],
  selected = [],
  onSelect,
  onClearAll,
  size,
  filterLoading,
}) => {
  const handleTitleDisplay = (e) => {
    const span = e.currentTarget;
    if (span.scrollWidth > span.clientWidth) {
      span.parentElement.setAttribute('title', span.textContent);
    } else {
      span.parentElement.removeAttribute('title');
    }
  };
  // Add safety check to ensure options is an array
  const safeOptions = Array.isArray(options) ? options : [];

  // Add safety check before using includes
  const isSelected = (id) => {
    return Array.isArray(selected) && selected.includes(id);
  };

  const handleSelectAll = () => {
    const allLabels = safeOptions.map((option) => option.label);
    // If all items are selected, clear all. Otherwise, select all
    const shouldSelectAll = selected.length !== safeOptions.length;
    onSelect(shouldSelectAll ? allLabels : []);
  };

  const isAllSelected =
    safeOptions.length > 0 && selected.length === safeOptions.length;

  return (
    <div
      className={size === 'big' ? styles.filterGroupBig : styles.filterGroup}
    >
      <div className={styles.filterHeader}>
        <h3>{title}</h3>
        <button onClick={handleSelectAll} className={styles.clearButton}>
          {isAllSelected ? 'Снять все' : 'Выбрать все'}
        </button>
      </div>
      {filterLoading ? (
        <div
          className='d-flex flex-column align-items-center justify-content-center'
          style={{ height: '100px', marginTop: '40px' }}
        >
          <span className='loader'></span>
        </div>
      ) : (
        <div className={styles.optionsList}>
          {safeOptions.map((option) => (
            <label
              key={option.id}
              className={styles.optionLabel}
              title={option.label}
            >
              <input
                type='checkbox'
                checked={isSelected(option.label)}
                onChange={() => onSelect(option.label)}
                className={styles.checkbox}
              />
              <span
                ref={(el) => el && handleTitleDisplay({ currentTarget: el })}
              >
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterGroup;
