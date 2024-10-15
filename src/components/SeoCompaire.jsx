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
  const [sortedData, setSortedData] = useState([]);

  const contentA = compaireData?.products_a ?? [];
  const contentB = compaireData?.products_b ?? [];

  const arrA = Object.keys(compaireData?.keywords_a).map((x) =>
    x.toLowerCase()
  );
  const arrB = Object.keys(compaireData?.keywords_b).map((x) =>
    x.toLowerCase()
  );

  const intersection = arrA.filter((x) => arrB.includes(x));
  const intersectionLength = intersection.length;

  const radioOptions = [
    { value: 'onlyA', label: 'Только А' },
    { value: 'onlyB', label: 'Только B' },
    { value: 'commonAB', label: 'Общие А и В' },
    { value: 'differenceAB', label: 'Разница А минус В' },
    { value: 'differenceBA', label: 'Разница В минус А' },
  ];

  const sortData = useCallback(
    (key) => {
      const { direction } = sortConfig;
      const isAscending = direction === 'asc';
      const newDirection = isAscending ? 'desc' : 'asc';

      const newSortedData = [...sortedData].sort((a, b) => {
        const aValue = key === 'key' ? a.key : a.value;
        const bValue = key === 'key' ? b.key : b.value;

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return isAscending ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          return isAscending
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        } else {
          return 0;
        }
      });

      setSortConfig({ key, direction: newDirection });
      setSortedData(newSortedData);
    },
    [sortedData, sortConfig]
  );

  useEffect(() => {
    const keywordsA = Object.keys(compaireData?.keywords_a || {}).map((x) =>
      x.toLowerCase()
    );
    const keywordsB = Object.keys(compaireData?.keywords_b || {}).map((x) =>
      x.toLowerCase()
    );
    const intersection = keywordsA.filter((x) => keywordsB.includes(x));

    const dataMap = {
      onlyA: Object.entries(compaireData?.keywords_a).map(([key, value]) => ({
        key,
        value,
      })),
      onlyB: Object.entries(compaireData?.keywords_b).map(([key, value]) => ({
        key,
        value,
      })),
      commonAB: intersection.map((key) => ({
        key,
        value: Math.max(
          compaireData?.keywords_a[key] || 0,
          compaireData?.keywords_b[key] || 0
        ),
      })),
      differenceAB: Object.entries(compaireData?.keywords_a || {})
        .filter(([key]) => !keywordsB.includes(key.toLowerCase()))
        .map(([key, value]) => ({ key, value })),
      differenceBA: Object.entries(compaireData?.keywords_b || {})
        .filter(([key]) => !keywordsA.includes(key.toLowerCase()))
        .map(([key, value]) => ({ key, value })),
    };
    setSortedData(dataMap[byOptions] || []);
  }, [byOptions, compaireData]);

  const handleRadioChange = (value) => {
    setByOptions(value);
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeywordClick = (keyword) => {
    const url = `https://www.wildberries.ru/catalog/0/search.aspx?search=${keyword}`;
    window.open(url, '_blank');
  };

  const renderData = useMemo(() => {
    if (Array.isArray(sortedData) && sortedData.length > 0) {
      const filteredData = sortedData.filter((item) => {
        return item.key.toLowerCase().includes(searchQuery.toLowerCase());
      });

      if (filteredData.length === 0) {
        return <div>Ничего не найдено</div>;
      }

      return filteredData.map((item, index) => {
        return (
          <div className={styles.tableContentItem} key={index}>
            <div
              className={styles.tableContentItemKey}
              onClick={() => handleKeywordClick(item.key)}
            >
              {item.key}
            </div>
            <div>{item.value}</div>
          </div>
        );
      });
    }
    return <div>Ничего не найдено</div>;
  }, [sortedData, searchQuery]);

  const renderSortArrows = (columnKey) => {
    return <SortArrows columnKey={columnKey} sortConfig={sortConfig} />;
  };

  const clickProduct = (wb_id) => {
    const url = `https://www.wildberries.ru/catalog/${wb_id}/detail.aspx`;
    window.open(url, '_blank');
  };

  return (
    <div className={styles.seoCompaireWrapper}>
      <div className={styles.topBlock}>
        <div>
          {compaireData &&
            compaireData.keywords_a &&
            compaireData.keywords_b && (
              <VennDiagram
                groupACount={Object.keys(compaireData.keywords_a).length}
                groupBCount={Object.keys(compaireData.keywords_b).length}
                intersectionCount={intersectionLength}
              />
            )}
        </div>
        <div className={styles.seoTableWrapper}>
          <div className={styles.seoTableHeader}>
            <div className={styles.seoTableHeaderItem}>Группа А</div>
            <div className={styles.seoTableHeaderItem}>Группа B</div>
          </div>
          <div className={styles.seoTableContent}>
            <div className={styles.seoTableContentRowWrapper}>
              {contentA.map((item) => (
                <div className={styles.seoTableContentItem} key={item.wb_id}>
                  <img
                    src={item.image}
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
                  <span onClick={() => clickProduct(item.wb_id)}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.seoTableContentRowWrapper}>
              {contentB.map((item) => (
                <div className={styles.seoTableContentItem} key={item.wb_id}>
                  <img
                    src={item.image}
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
                  <span onClick={() => clickProduct(item.wb_id)}>
                    {item.title}
                  </span>
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
