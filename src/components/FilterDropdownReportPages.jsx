import React from "react";

const FilterDropdownReportPages = ({
  filterOptions,
  activeFilters,
  onFilterChange,
}) => {
  const handleFilterChange = (filterId, value) => {
    onFilterChange(filterId, value);
  };

  return (
    <div className='filter container dash-container p-3 pb-4 pt-0 d-flex'>
      <div className='row'>
        {filterOptions.map((filter) => (
          <div key={filter.id} className='filter-item col'>
            <label
              style={{ fontWeight: 600, marginBottom: '4px ' }}
              htmlFor={filter.id}
            >
              {filter.label}
            </label>
            <select
              style={{
                padding: '1vh 1.75vh',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
              }}
              className='form-control'
              id={filter.id}
              value={activeFilters[filter.id]}
              onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              style={{
                position: 'absolute',
                right: '1.75vw',
                top: '5.5vh',
                width: '1.5vh',
              }}
              viewBox='0 0 28 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2 2L14 14L26 2'
                stroke='rgba(140, 140, 140, 1)'
                strokeWidth='4'
                strokeLinecap='round'
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterDropdownReportPages;
