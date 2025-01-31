import styles from './SaleTable.module.css';

const TableSectionsEmpty = () => {
  return (
    <>

        {/* Sales Section */}
        <div className={styles.flexContainer}>
          <div className={styles.purchaseCell}>
            <div></div>
            <div className={styles.smallText}>
              
            </div>
          </div>
          <div className={styles.returnCell}>
            <div></div>
            <div className={styles.smallText}>
              
            </div>
          </div>
          <div className={styles.salesCell}>
           
          </div>
          <div className={styles.revenueCell}>
            
          </div>
          <div className={styles.avgPriceCell}>
            
          </div>
          <div className={styles.sppCell}>
            <span></span>
            <span style={{ marginLeft: '4px' }}></span>
          </div>
          {/* <div className={styles.sppCell}>{data.avg_spp} %</div> */}
          <div className={styles.buyoutCell}>
          
          </div>
        </div>
        {/* Self Cost Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.costCell}>
            <div>
        
            </div>
            <div className={styles.smallText}>
         
            </div>
          </div>
          <div className={styles.costPerUnitCell}>
          
          </div>
        </div>
        {/* Commision & Logisitc Section */}
        <div className={styles.flexContainer}>
          <div className={styles.deliveryCountCell}>
        
          </div>
          <div className={styles.commissionCell}>
            <div></div>
            <div className={styles.smallText}>
              
            </div>
          </div>
          <div className={styles.acquiringCell}>
            <div></div>
            <div className={styles.smallText}>
             
            </div>
          </div>
          <div className={styles.logisticsCell}>
          
          </div>
          <div className={styles.logisticsCell}>
            
          </div>
          <div className={styles.logisticsCell}>
            <div></div>
            <div className={styles.smallText}>
            
            </div>
          </div>
          <div className={styles.logisticsCell}>
       
          </div>
        </div>
        {/* Compensation and Penalties Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell}>
       
          </div>
          <div className={styles.defectCompnesaitionCell}>

          </div>
          <div className={styles.defectCompnesaitionCell}>
 
          </div>
          <div className={styles.defectCompnesaitionCell}>
 
          </div>
          <div className={styles.defectCompnesaitionCell}>

          </div>
          {/* ?????? */}
          <div className={styles.defectCompnesaitionCell}>
 
          </div>
        </div>
        {/* Another Keep Section */}
        <div className={styles.flexContainer}>
          <div className={styles.defectCompnesaitionCell}>
            <div></div>
            <div></div>
          </div>
          <div className={styles.defectCompnesaitionCell}>
            <div></div>
            <div></div>
          </div>
          <div className={styles.defectCompnesaitionCell}>
            <div></div>
            <div></div>
          </div>
          <div className={styles.defectCompnesaitionCell}>
            <div></div>
            <div></div>
          </div>
        </div>
        {/* External Expenses Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell}>
      
          </div>
          <div className={styles.defectCompnesaitionCell}>
            <div></div>
            <div></div>
          </div>
          <div className={styles.defectCompnesaitionCell}>
          
          </div>
        </div>
        {/* Tax Section */}
        <div className={styles.flexContainer}>
          <div className={styles.defectCompnesaitionCell}>
          
          </div>
          <div className={styles.defectCompnesaitionCell}>
        
          </div>
          <div className={styles.defectCompnesaitionCell}>
        
          </div>
        </div>
        {/* Finance Section */}
        <div
          className={styles.flexContainer}
          style={{ background: 'rgba(83, 41, 255, 0.05)' }}
        >
          <div className={styles.defectCompnesaitionCell}>
      
          </div>
          <div className={styles.defectCompnesaitionCell}>
      
          </div>
          <div className={styles.defectCompnesaitionCell}>
     
          </div>
          <div
            className={styles.defectCompnesaitionCell}
            style={{ width: '148px' }}
          >
 
          </div>
          <div className={styles.defectCompnesaitionCell}>

          </div>
        </div>
    </>
  );
};

export default TableSectionsEmpty;