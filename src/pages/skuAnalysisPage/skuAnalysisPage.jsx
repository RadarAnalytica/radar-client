import styles from './skuAnalysisPage.module.css';
import Header from '@/components/sharedComponents/header/header';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { SearchBlock } from './widgets';
import { useDemoMode } from "@/app/providers";

const SkuAnalysisPage = () => {
  const { isDemoMode } = useDemoMode();

  if (isDemoMode) {
    location.href = '/sku-analysis/134386495';
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
            <Header title='Анализ артикула'/>
          </div>

          <SearchBlock/>
        </div>
      </section>
    </main>
  );
};

export default SkuAnalysisPage;
