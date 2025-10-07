import styles from './supplierAnalysisPage.module.css';
import Header from '@/components/sharedComponents/header/header';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { SearchBlock } from './widgets';
import { useDemoMode } from "@/app/providers";

const SupplierAnalysisPage = () => {
  const {isDemoMode} = useDemoMode();

  if (isDemoMode) {
    location.href = '/supplier-analysis/1280805';
    return null;
  }

  return (
    <main className={styles.page}>
      <MobilePlug/>

      <section className={styles.page__sideNavWrapper}>
        <Sidebar/>
      </section>

      <section className={styles.page__content}>
        <div className={styles.page__additionalWrapper}>
          <div className={styles.page__headerWrapper}>
            <Header title='Анализ поставщика'/>
          </div>

          <SearchBlock/>
        </div>
      </section>
    </main>
  );
};

export default SupplierAnalysisPage;
