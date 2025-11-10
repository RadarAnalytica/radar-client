import Header from '@/components/sharedComponents/header/header';
import styles from './PositionTrackingMainPage.module.css';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import { PositionTrackingMainPageWidget } from '@/widgets/PositionTrackingMainPageWidget/PositionTrackingMainPageWidget';
import { RadarBar } from '@/shared';
import { PlainSelect } from '@/components/sharedComponents/apiServicePagesFiltersComponent/features/plainSelect/plainSelect';
import { MainChart } from '@/features';
const PositionTrackingMainPage = () => {
    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header
                        title='Трекинг позиций'
                        titlePrefix=''
                        videoReviewLink=''
                        howToLink=''
                        howToLinkText=''
                        hasShadow={false}
                        children={null}
                    />
                </div>
                {/* !header */}

                {/* main widget */}
                <PositionTrackingMainPageWidget hasAddBlock={true} />

                {/* info bars */}
                <div className={styles.page__barsWrapper}>
                    <RadarBar
                        title="Активные товары"
                        mainValue={1}
                        isLoading={false}
                        actionButtonParams={{
                            text: 'Добавить новый товар к отслеживаню',
                            action: () => { },
                            style: {
                                backgroundColor: 'transparent',
                                alignSelf: 'flex-end'
                            }
                        }}
                    />
                    <RadarBar
                        title="Магазины"
                        mainValue={2}
                        isLoading={false}
                    />
                    <RadarBar
                        title="Проект"
                        mainValue={1}
                        isLoading={false}
                        actionButtonParams={{
                            text: 'Управлять',
                            action: () => { },
                            style: {
                                backgroundColor: 'transparent',
                                alignSelf: 'flex-end'
                            }
                        }}
                    />
                </div>

                {/* settings block */}
                <div className={styles.page__container}>
                    <p className={styles.page__title}>Динамика</p>
                    <div className={styles.page__selectWrapper}>
                        <PlainSelect
                            selectId='brandSelect'
                            label=''
                            value={1}
                            optionsData={[{ value: 1, label: '1' }, { value: 2, label: '2' }]}
                            handler={(value: number) => {
                                //setActiveFilter(filtersData?.find((item) => item.dest === value) || null);
                            }}
                            mode={undefined}
                            allowClear={false}
                            disabled={false}
                        />
                        <PlainSelect
                            selectId='brandSelect'
                            label=''
                            value={1}
                            optionsData={[{ value: 1, label: '1' }, { value: 2, label: '2' }]}
                            handler={(value: number) => {
                                //setActiveFilter(filtersData?.find((item) => item.dest === value) || null);
                            }}
                            mode={undefined}
                            allowClear={false}
                            disabled={false}
                        />
                    </div>
                </div>

                <div className={styles.page__chartWrapper}>
                    <MainChart
                        loading={false}
                        chartData={[]}
                        hasControls={true}
                        controlsOptions={[]}
                    />
                </div>
            </section>
            {/* ---------------------- */}
        </main>
    );
};

export default PositionTrackingMainPage;