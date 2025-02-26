import React from "react";
import styles from './StartPage.module.css'
import { Link } from "react-router-dom";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import PopupBanner from "../components/sharedComponents/popupBanner/PopupBanner";
import TgBanner from "../components/startPageComponents/tgBanner/TgBanner";


  // this is test user object for dev purposes

  // let user = {
  //   email: "modinsv@yandex.ru",
  //   id: 2,
  //   is_confirmed: true,
  //   is_onboarded: true,
  //   is_report_downloaded: true,
  //   is_test_used: true,
  //   role: "employee",
  //   subscription_status: "Smart"
  // }

// Main page for authorized user
const StartPage = () => {

    return (
        <main
            className={styles.startPage}
        >
            <SideNav />
            <section
                className={styles.startPage__content}
            >
                <TopNav title='Главная' /> {/** TopNav expected props = {title?: string, subtitle?: string, children?: React.ReactNode} */}

                
                <div className={styles.startPage__galleryWrapper}>
                    {/* Feel free to create a shared component from this gallery below */}
                    <div className={styles.startPage__gallery}>
                        <div className={styles.gallery__item}></div>

                        <div className={styles.gallery__itemPadding}>
                            <div className={styles.gallery__imgWrapper}></div>
                            <div className={styles.gallery__offerBlock}>
                                <div className={styles.gallery__offerTitleWrapper}>
                                    <p className={styles.gallery__offerTitle}>Оцифруйтесь за 1 минуту</p>
                                    <div className={styles.gallery__subtitleBox}>
                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle opacity="0.2" cx="8" cy="8.5" r="8" fill="white"/>
                                            <rect opacity="0.4" x="3" y="3.5" width="10" height="10" rx="5" fill="white"/>
                                            <rect x="3.25928" y="3.75928" width="9.48143" height="9.48143" rx="4.74072" stroke="white" strokeWidth="0.518569"/>
                                            <circle cx="7.9268" cy="8.4268" r="1.16678" fill="white" stroke="white" strokeWidth="0.777853"/>
                                        </svg>

                                        Новый подход к еженедельным отчетам
                                    </div>
                                </div>
                                <Link
                                    to='/'
                                    className={styles.gallery__offerLink}
                                >
                                    Попробовать
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* -------------------------------------------------------------- */}
                </div>

                <div className={styles.startPage__bannersWrapper}>
                    <PopupBanner 
                        offerTitle='1 300 ₽'
                        offerSubtitle='Платим вам на счет'
                        mainTitle='за каждого нового пользователя'
                        mainSubtitle='Станьте нашим партнером прямо сейчас'
                        description='В этом разделе вы можете загрузить отчёты Wildberries в нашу систему. После обработки данных алгоритм распределит информацию по интуитивно понятным вкладкам, что позволит вам проанализировать следующие показатели вашего бизнеса'
                        steps={{
                            stepsTitle: 'Для начала работы:',
                            stepsArray: [
                                '1. Ознакомьтесь с короткой видеоинструкцией.',
                                '2. Загрузите в систему два отчёта (важно загружать их в том виде, в котором они были скачаны из личного кабинета Wildberries)'
                            ]
                        }}
                    />
                </div>
                <div className={styles.startPage__bannersWrapper}>
                    <PopupBanner 
                        offerTitle='1 300 ₽'
                        offerSubtitle='Платим вам на счет'
                        mainTitle='за каждого нового пользователя'
                        mainSubtitle='Станьте нашим партнером прямо сейчас'
                        description='В этом разделе вы можете загрузить отчёты Wildberries в нашу систему. После обработки данных алгоритм распределит информацию по интуитивно понятным вкладкам, что позволит вам проанализировать следующие показатели вашего бизнеса'
                        steps={{
                            stepsTitle: 'Для начала работы:',
                            stepsArray: [
                                '1. Ознакомьтесь с короткой видеоинструкцией.',
                                '2. Загрузите в систему два отчёта (важно загружать их в том виде, в котором они были скачаны из личного кабинета Wildberries)'
                            ]
                        }}
                    />
                </div>

                <div className={styles.startPage__bannersWrapper}>
                    <TgBanner />
                </div>

            </section>
        </main>
    )
}

export default StartPage;