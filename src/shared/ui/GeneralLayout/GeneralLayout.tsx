import React from 'react';
import styles from './GeneralLayout.module.css';
import Header from '@/components/sharedComponents/header/header';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';



interface IGeneralLayoutProps {
    headerProps: {
        title: string | React.ReactNode,
        titlePrefix?: string,
        children?: React.ReactNode,
        videoReviewLink?: string,
        howToLink?: string,
        howToLinkText?: string,
        hasShadow?: boolean,
    },
    children: React.ReactNode 
}


// dont forget to rename the component and its export
export const GeneralLayout: React.FC<IGeneralLayoutProps> = ({ headerProps, children }) => {

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
                    <Header {...headerProps} />
                </div>
                {/* !header */}
                {children}
            </section>
            {/* ---------------------- */}
        </main>
    );
};

