import { useState, useEffect } from 'react';
import FilterElem from './FilterElem';
import styles from './FilterGroup.module.css';
import { reportFilters } from '../../service/reportConfig'

const NewFilterGroup = ({pageIdent}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [items, setItems] = useState([])
    
    console.log('items', items);
    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
          setItems(['11111', '22222', '33333', '444444', '555555', '666666', '777777', '888888', '999999'])
        }, 1500)
      }, [setIsLoading, setItems])
    
    const handleApplyFilters = () => {

    };
    
    return (
        
        <div className={styles.filterContainer}>
            <p>Test Filter Group</p>
            <button
                className={styles.collapseButton}
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {!isCollapsed ? 'Свернуть фильтры' : 'Развернуть фильтры'}
            </button>
            {!isCollapsed && (
                <>
                  <div className={styles.filterGrid}>
                    {reportFilters[pageIdent].map((elem) => {
                        return (
                            <FilterElem
                                key={elem.filterIdent}
                                title={elem.title}
                                pageIdent={pageIdent}
                                filterIdent={elem.filterIdent}
                                items={items}
                                isLoading={isLoading} />
                        );
                    })}
                  </div>
                  <div className='container dash-container'>
                        <div>
                            <button
                                className={styles.applyButton}
                                onClick={() => handleApplyFilters()}
                            >
                                Применить фильтры
                            </button>
                        </div>
                  </div>
                </>
            )}

            {/* <FilterElem 
                title={title}
                pageIdent={pageIdent}
                filterIdent={titleIdent}
                items={items}
                isLoading={isLoading}
            /> */}
            <p>End Test Filter Group</p>
        </div>
    )
};

export default NewFilterGroup;