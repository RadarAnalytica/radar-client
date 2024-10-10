import { useState, useMemo, useCallback, useEffect } from 'react';
import styles from './SeoCompaire.module.css';
import RadioGroup from './RadioGroup';
import SearchButton from '../assets/searchstock.svg';
import SortArrows from './SortArrows';
import VennDiagram from './VennDiagram';

const SeoCompaire = ({ compaireData }) => {
  const [byOptions, setByOptions] = useState('onlyA');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [sortedData, setSortedData] = useState(compaireData?.product_a || []);

  const contentA = [
    {
      id: 1,
      photo: '',
      productName: 'Товар 1',
    },
    {
      id: 2,
      photo: '',
      productName: 'Товар 1',
    },
    {
      id: 3,
      photo: '',
      productName: 'Товар 1',
    },
    {
      id: 4,
      photo: '',
      productName: 'Товар 1',
    },
    {
      id: 5,
      photo: '',
      productName: 'Товар 1',
    },
    {
      id: 6,
      photo: '',
      productName: 'Товар 1',
    },
  ];

  const contentB = [
    {
      id: 1,
      photo: '',
      productName: 'Товар 1',
    },
    {
      id: 2,
      photo: '',
      productName: 'Товар 1',
    },
    {
      id: 3,
      photo: '',
      productName: 'Товар 1',
    },
    {
      id: 4,
      photo: '',
      productName: 'Товар 1',
    },
    {
      id: 5,
      photo: '',
      productName: 'Товар 1',
    },
    {
      id: 6,
      photo: '',
      productName: 'Товар 1',
    },
  ];

  const radioOptions = [
    { value: 'onlyA', label: 'Только А' },
    { value: 'onlyB', label: 'Только B' },
    { value: 'commonAB', label: 'Общие А и В' },
    { value: 'differenceAB', label: 'Разница А минус В' },
    { value: 'differenceBA', label: 'Разница В минус А' },
  ];

  const sortData = useCallback(
    (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }

      const newSortedData = [...sortedData].sort((a, b) => {
        const aKey = Object.keys(a)[0];
        const bKey = Object.keys(b)[0];
        const aValue = a[aKey];
        const bValue = b[bKey];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return direction === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
          return direction === 'asc'
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        }
      });

      setSortConfig({ key, direction });
      setSortedData(newSortedData);
    },
    [sortedData, sortConfig]
  );

  useEffect(() => {
    const dataMap = {
      onlyA: compaireData?.product_a,
      onlyB: compaireData?.product_b,
      commonAB: compaireData?.intersection,
      differenceAB: compaireData?.difference_a_b,
      differenceBA: compaireData?.difference_b_a,
    };
    setSortedData(dataMap[byOptions] || []);
  }, [byOptions, compaireData]);

  const handleRadioChange = (value) => {
    setByOptions(value);
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderData = useMemo(() => {
    if (Array.isArray(sortedData) && sortedData.length > 0) {
      const filteredData = sortedData.filter((item) => {
        const key = Object.keys(item)[0];
        return key.toLowerCase().includes(searchQuery.toLowerCase());
      });

      return filteredData.map((item, index) => {
        const key = Object.keys(item)[0];
        const value = item[key];
        return (
          <div className={styles.tableContentItem} key={index}>
            <div>{key}</div>
            <div>{value}</div>
          </div>
        );
      });
    }
    return <div>Ничего не найдено</div>;
  }, [sortedData, searchQuery]);

  const renderSortArrows = (columnKey) => {
    return <SortArrows columnKey={columnKey} sortConfig={sortConfig} />;
  };

  return (
    <div className={styles.seoCompaireWrapper}>
      <div className={styles.topBlock}>
        <div>
          <VennDiagram
            groupACount={compaireData?.product_a.length}
            groupBCount={compaireData?.product_b.length}
            intersectionCount={compaireData?.intersection?.length}
          />
        </div>
        <div className={styles.seoTableWrapper}>
          <div className={styles.seoTableHeader}>
            <div className={styles.seoTableHeaderItem}>Группа А</div>
            <div className={styles.seoTableHeaderItem}>Группа Б</div>
          </div>
          <div className={styles.seoTableContent}>
            <div>
              {contentA.map((item) => (
                <div className={styles.seoTableContentItem} key={item.id}>
                  <img
                    src={item.photo}
                    style={{
                      width: '30px',
                      height: '40px',
                      objectFit: 'cover',
                      borderRadius: '3px',
                    }}
                    onError={(e) => {
                      e.target.style.backgroundColor = '#D3D3D3';
                      e.target.alt = '';
                      e.target.src =
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/HHpC6UAAAAASUVORK5CYII=';
                    }}
                  />
                  {item.productName}
                </div>
              ))}
            </div>
            <div>
              {contentB.map((item) => (
                <div className={styles.seoTableContentItem} key={item.id}>
                  <img
                    src={item.photo}
                    style={{
                      width: '30px',
                      height: '40px',
                      objectFit: 'cover',
                      borderRadius: '3px',
                    }}
                    onError={(e) => {
                      e.target.style.backgroundColor = '#D3D3D3';
                      e.target.alt = '';
                      e.target.src =
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/HHpC6UAAAAASUVORK5CYII=';
                    }}
                  />
                  {item.productName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBlock}>
        <div className={styles.radioButtonsWrapper}>
          <RadioGroup
            options={radioOptions}
            name='options'
            defaultValue='onlyA'
            onChange={handleRadioChange}
          />
        </div>
        <div className={styles.search}>
          <input
            type='text'
            placeholder='Поиск по ключевым словам'
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchQuery}
            // style={{ marginLeft: '20px' }}
          />

          <img
            src={SearchButton}
            alt='Search'
            //  onClick={handleFilterSearch}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <div>Ключевые слова</div>
            <div onClick={() => sortData('wb')}>
              Частота WB
              {renderSortArrows('wb')}
            </div>
          </div>
          <div className={styles.tableContent}>{renderData}</div>
        </div>
      </div>
    </div>
  );
};
export default SeoCompaire;
