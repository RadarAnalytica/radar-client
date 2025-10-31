import { useFilters } from '@/app/providers/FiltersProvider';

const FilterLoader = () => {
    const { isFiltersLoading } = useFilters();

    if (!isFiltersLoading) return null;

    return (
        <div className='position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
          <span className='loader'></span>
        </div>
    );
}

export default FilterLoader;