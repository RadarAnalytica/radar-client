import styles from './SeoCompaire.module.css';

const SeoCompaire = () => {
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
    return (
        <div className={styles.seoCompaireWrapper}>
            <div className={styles.topBlock}>
                <div>s</div>
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
                    <div className={styles.radioButtons}>
                    <input type="radio" id="onlyA" name="options" value="onlyA"/>
                    <label htmlFor="onlyA">Только А</label>
                    </div>
                    <div className={styles.radioButtons}>
                    <input type="radio" id="onlyB" name="options" value="onlyB"/>
                    <label htmlFor="onlyB">Только B</label>
                    </div>
                    <div className={styles.radioButtons}>
                    <input type="radio" id="commonAB" name="options" value="commonAB"/>
                    <label htmlFor="commonAB">Общие А и В</label>
                    </div>
                    <div className={styles.radioButtons}>
                    <input type="radio" id="differenceAB" name="options" value="differenceAB"/>
                    <label htmlFor="differenceAB">Разница А минус В</label>
                    </div>
                    <div className={styles.radioButtons}>
                    <input type="radio" id="differenceBA" name="options" value="differenceBA"/>
                    <label htmlFor="differenceBA">Разница А минус В</label>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SeoCompaire;