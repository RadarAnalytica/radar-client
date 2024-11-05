import styles from "./Schedule.module.css"
import SideNav from "../components/SideNav"
import TopNav from "../components/TopNav"
import { useState } from "react"
import BigChart from "../components/BigChart"
import ScheduleBigChart from "../components/ScheduleBigChart"
import ScheduleProfitabilityBigChart from '../components/ScheduleProfitabilityChart'
import StructureRevenue from "../components/StructureRevenue"
import RevenueStorageChart from "../components/RevenueStorageChart"
const Schedule = () => {
    const [selectedBrands, setSelectedBrands] = useState({
        'Бренда 1': true,
        'Бренда 2': false,
    });
    const [selectedYears, setSelectedYears] = useState({
        '2024': true,
        '2023': false,
        '2022': false,
    });
    const [selectedMonths, setSelectedMonths] = useState({
        'Январь': true,
        'Февраль': false,
        'Март': false,
        'Апрель': false,
        'Май': false,
        'Июнь': false,
        'Август': false,
    });
    const [selectedWeeks, setSelectedWeeks] = useState({
        '09.09.2024': true,
        '16.09.2024': false,
        '23.09.2024': false,
        '30.09.2024': false,

    });
    const [selectedGroups, setSelectedGroups] = useState({
        '124356664': true,
        '124356634': false,
        '124356645': false,
        '124353664': false,

    });
    const [selectedArticles, setSelectedArticles] = useState({
        '1243564': true,
        '1253664': false,
        '1243664': false,
        '1243536': false,
        '1243546': false,
        '1243539': false,
        '1243531': false,
    });
    const toggleCheckboxBrands = (brand) => {
        setSelectedBrands((prevState) => ({
            ...prevState,
            [brand]: !prevState[brand],
        }));
    };
    const toggleCheckboxYear = (year) => {
        setSelectedYears((prevState) => ({
            ...prevState,
            [year]: !prevState[year],
        }));
    };
    const toggleCheckboxMonth = (month) => {
        setSelectedMonths((prevState) => ({
            ...prevState,
            [month]: !prevState[month],
        }));
    };
    const toggleCheckboxWeek = (week) => {
        setSelectedWeeks((prevState) => ({
            ...prevState,
            [week]: !prevState[week],
        }));
    };
    const toggleCheckboxGroup = (group) => {
        setSelectedGroups((prevState) => ({
            ...prevState,
            [group]: !prevState[group],
        }));
    };
    const toggleCheckboxArticle = (article) => {
        setSelectedArticles((prevState) => ({
            ...prevState,
            [article]: !prevState[article],
        }));
    };

    const handleClearBrand = () => {
        // Убираем все отметки с чекбоксов
        const clearedBrands = Object.keys(selectedBrands).reduce((acc, brand) => {
            acc[brand] = false;
            return acc;
        }, {});
        setSelectedBrands(clearedBrands);
    };
    const handleClearYear = () => {
        // Убираем все отметки с чекбоксов
        const clearedBrands = Object.keys(selectedYears).reduce((acc, brand) => {
            acc[brand] = false;
            return acc;
        }, {});
        setSelectedYears(clearedBrands);
    };
    const handleClearMonth = () => {
        // Убираем все отметки с чекбоксов
        const clearedBrands = Object.keys(selectedMonths).reduce((acc, brand) => {
            acc[brand] = false;
            return acc;
        }, {});
        setSelectedMonths(clearedBrands);
    };
    const handleClearWeek = () => {
        // Убираем все отметки с чекбоксов
        const clearedBrands = Object.keys(selectedWeeks).reduce((acc, brand) => {
            acc[brand] = false;
            return acc;
        }, {});
        setSelectedWeeks(clearedBrands);
    };
    const handleClearGroup = () => {
        // Убираем все отметки с чекбоксов
        const clearedBrands = Object.keys(selectedGroups).reduce((acc, brand) => {
            acc[brand] = false;
            return acc;
        }, {});
        setSelectedGroups(clearedBrands);
    };
    const handleClearArticle = () => {
        // Убираем все отметки с чекбоксов
        const clearedBrands = Object.keys(selectedArticles).reduce((acc, brand) => {
            acc[brand] = false;
            return acc;
        }, {});
        setSelectedArticles(clearedBrands);
    };
    const handleFiltersCollapse = () => {

        handleClearBrand()
        handleClearYear()
        handleClearMonth()
        handleClearWeek()
        handleClearGroup()
        handleClearArticle()
    }

    return (

        <div className='dashboard-page'>
            <SideNav />
            <div className={`${styles.scheduleMain} dashboard-content pb-3 `}>
                <TopNav title={<><span style={{ color: '#1A1A1A4D' }}>Отчет /</span>  Графики</>} />
                <div className={`${styles.filterCollapse}`} onClick={handleFiltersCollapse}>Свернуть фильтры</div>
                <div className={`${styles.ScheduleHeader} dash-container container`}>

                    <div className={styles.container}>
                        <div className={styles.header}>
                            <span className={styles.title}>Бренд</span>
                            <button className={styles.clearButton} onClick={handleClearBrand}>
                                Снять все
                            </button>
                        </div>
                        <div className={styles.list}>
                            {Object.keys(selectedBrands).map((brand, index) => (
                                <div className={styles.brandItem} key={index}>
                                    <label className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands[brand]}
                                            onChange={() => toggleCheckboxBrands(brand)}
                                            className={styles.checkboxInput}
                                        />
                                        <span className={styles.customCheckbox}></span>
                                    </label>
                                    <span className={styles.brandName}>{brand}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div className={styles.header}>
                            <span className={styles.title}>Год</span>
                            <button className={styles.clearButton} onClick={handleClearYear}>
                                Снять все
                            </button>
                        </div>
                        <div className={styles.list}>
                            {Object.keys(selectedYears).map((year, index) => (
                                <div className={styles.brandItem} key={index}>
                                    <label className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            checked={selectedYears[year]}
                                            onChange={() => toggleCheckboxYear(year)}
                                            className={styles.checkboxInput}
                                        />
                                        <span className={styles.customCheckbox}></span>
                                    </label>
                                    <span className={styles.brandName}>{year}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div className={styles.header}>
                            <span className={styles.title}>Месяц</span>
                            <button className={styles.clearButton} onClick={handleClearMonth}>
                                Снять все
                            </button>
                        </div>
                        <div className={styles.list}>
                            {Object.keys(selectedMonths).map((brand, index) => (
                                <div className={styles.brandItem} key={index}>
                                    <label className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            checked={selectedMonths[brand]}
                                            onChange={() => toggleCheckboxMonth(brand)}
                                            className={styles.checkboxInput}
                                        />
                                        <span className={styles.customCheckbox}></span>
                                    </label>
                                    <span className={styles.brandName}>{brand}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div className={styles.header}>
                            <span className={styles.title}>Неделя</span>
                            <button className={styles.clearButton} onClick={handleClearWeek}>
                                Снять все
                            </button>
                        </div>
                        <div className={styles.list}>
                            {Object.keys(selectedWeeks).map((brand, index) => (
                                <div className={styles.brandItem} key={index}>
                                    <label className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            checked={selectedWeeks[brand]}
                                            onChange={() => toggleCheckboxWeek(brand)}
                                            className={styles.checkboxInput}
                                        />
                                        <span className={styles.customCheckbox}></span>
                                    </label>
                                    <span className={styles.brandName}>{brand}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div className={styles.header}>
                            <span className={styles.title}>Группа</span>
                            <button className={styles.clearButton} onClick={handleClearGroup}>
                                Снять все
                            </button>
                        </div>
                        <div className={styles.list}>
                            {Object.keys(selectedGroups).map((brand, index) => (
                                <div className={styles.brandItem} key={index}>
                                    <label className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            checked={selectedGroups[brand]}
                                            onChange={() => toggleCheckboxGroup(brand)}
                                            className={styles.checkboxInput}
                                        />
                                        <span className={styles.customCheckbox}></span>
                                    </label>
                                    <span className={styles.brandName}>{brand}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div className={styles.header}>
                            <span className={styles.title}>Артикул</span>
                            <button className={styles.clearButton} onClick={handleClearArticle}>
                                Снять все
                            </button>
                        </div>
                        <div className={styles.list}>
                            {Object.keys(selectedArticles).map((brand, index) => (
                                <div className={styles.brandItem} key={index}>
                                    <label className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            checked={selectedArticles[brand]}
                                            onChange={() => toggleCheckboxArticle(brand)}
                                            className={styles.checkboxInput}
                                        />
                                        <span className={styles.customCheckbox}></span>
                                    </label>
                                    <span className={styles.brandName}>{brand}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`${styles.ScheduleBody} dash-container container`}>
                    <div className='container dash-container ' >
                        <ScheduleBigChart />
                    </div>
                    <div className='container dash-container '>
                        <ScheduleProfitabilityBigChart />
                    </div>
                </div>
                <div className={`${styles.ScheduleFooter} dash-container container`}>
                    <StructureRevenue />
                    <RevenueStorageChart />
                </div>
            </div>
        </div >
    )
}
export default Schedule