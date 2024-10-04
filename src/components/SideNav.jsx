import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import greygrow from "../assets/grey-grow.png";
import purplegrow from "../assets/purple-grow.png";
import goods from "../assets/mygoods.png";
import lightning from "../assets/Lightning 1.png";
import magic from "../assets/magic.png";
import support from "../assets/support.png";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { openSupportWindow, closeSupportWindow } from '../redux/supportWindow/supportWindowSlice';

const SideNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = document.location.href;
  const chunkArray = url ? url.split("/").reverse() : null;
  const productUrl = chunkArray ? chunkArray.includes('product') : false;
  const location = chunkArray ? chunkArray[0] : null;
  const linkPlagin = "https://chromewebstore.google.com/";
  const isOpenSupportWindow = useSelector((state) => state.supportWindowSlice?.isOpenSupportWindow);

  const [active, setActive] = useState("");
  useEffect(() => {
    setActive(location);
  }, [location]);

  const [goodsShown, setGoodsShown] = useState(true);
  const [promotionShown, setPromotionShown] = useState(true);
  const [additionalTools, setAdditionalTools] = useState(true);

  const toggleOpenSupport = () => {
    if (isOpenSupportWindow) {
      dispatch(closeSupportWindow());
    } else {
      dispatch(openSupportWindow());
    }
  }

  return (
    <div className='side-nav'>
      <div>
        <img src={logo} alt='' style={{ maxWidth: "160px" }} />

        <div className='mt-4'>
          <div className='sidenav-el' onClick={() => navigate("/dashboard")}>
            <div className='d-flex align-items-center'>
              <img
                src={active === "dashboard" ? purplegrow : greygrow}
                alt=''
                className='side-nav-icon'
              />
              <span
                className='sidenav-title'
                style={
                  active === "dashboard"
                    ? { fontWeight: "bold", fontSize: "14px", color: "black" }
                    : {}
                }
              >
                Сводка продаж
              </span>
            </div>
          </div>
          <div
            className='sidenav-el'
            onClick={() => setGoodsShown(!goodsShown)}
          >
            <div className='d-flex align-items-center'>
              {location === "orders-map" ||
                location === "supply" ||
                location === "stock-analysis" ? (
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 20 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 7H0V1.003C0 0.449002 0.455 2.19659e-06 0.992 2.19659e-06H19.008C19.1393 -0.000274335 19.2693 0.0255614 19.3905 0.076006C19.5117 0.126451 19.6217 0.200497 19.714 0.293835C19.8063 0.387173 19.8791 0.497939 19.9282 0.619688C19.9773 0.741436 20.0017 0.871735 20 1.003V7H19V17.001C19.0004 17.1318 18.975 17.2614 18.9253 17.3824C18.8756 17.5034 18.8026 17.6134 18.7104 17.7062C18.6182 17.7989 18.5086 17.8726 18.3879 17.923C18.2672 17.9735 18.1378 17.9996 18.007 18H1.993C1.8622 17.9996 1.73276 17.9735 1.61207 17.923C1.49139 17.8726 1.38181 17.7989 1.2896 17.7062C1.19739 17.6134 1.12436 17.5034 1.07467 17.3824C1.02498 17.2614 0.999605 17.1318 1 17.001V7ZM17 7H3V16H17V7ZM2 2V5H18V2H2ZM7 9H13V11H7V9Z'
                    fill='#5329FF'
                  />
                </svg>
              ) : (
                <img src={goods} alt='' className='side-nav-icon' />
              )}
              <span
                className='sidenav-title'
                style={
                  location === "orders-map" ||
                    location === "supply" ||
                    location === "abc-data" ||
                    location === "stock-analysis"
                    ? { fontWeight: "bold", fontSize: "14px", color: "black" }
                    : {}
                }
              >
                Мои товары
              </span>
            </div>
            <span>{goodsShown ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
          </div>
          {goodsShown ? (
            <div>
              <p
                className='sidenav-title ps-4 submenu-item'
                style={
                  location === "supply"
                    ? { fontWeight: "bold", fontSize: "14px", display: "none" }
                    : { display: "none" }
                }
                onClick={() => navigate("/development/supply")}
              >
                {location === "supply" ? (
                  <svg
                    style={{ marginRight: "0.5vw" }}
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='4' cy='4' r='4' fill='#5329FF' />
                  </svg>
                ) : null}
                Расчет поставок
              </p>
              <p
                className='sidenav-title padding-left submenu-item'
                style={
                  location === "orders-map"
                    ? { fontWeight: "bold", fontSize: "14px" }
                    : {}
                }
                onClick={() => navigate("/orders-map")}
              >
                {location === "orders-map" ? (
                  <svg
                    style={{ marginRight: "0.5vw" }}
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='4' cy='4' r='4' fill='#5329FF' />
                  </svg>
                ) : null}
                География заказов
              </p>
              <p
                className='sidenav-title padding-left submenu-item'
                style={
                  // <<<<<<< HEAD
                  location === "abc-data"
                    ? { fontWeight: "bold", fontSize: "14px" }
                    : {}
                }
                onClick={() => navigate("/abc-data")}
              // =======
              //                   location === 'stock-analysis'
              //                     ? { fontWeight: 'bold', fontSize: '14px' }
              //                     : {}
              //                 }
              //                 onClick={() => navigate('/stock-analysis')}
              // >>>>>>> stockAnlysis
              >
                {location === "abc-data" ? (
                  <svg
                    style={{ marginRight: "0.5vw" }}
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='4' cy='4' r='4' fill='#5329FF' />
                  </svg>
                ) : null}
                ABC-анализ
              </p>

              <p
                className='sidenav-title padding-left submenu-item'
                style={
                  location === "stock-analysis" || productUrl
                    ? { fontWeight: "bold", fontSize: "14px", whiteSpace: "nowrap" }
                    : {  }
                }
                onClick={() => navigate("/stock-analysis")}
              >
                {location === "stock-analysis" || productUrl ? (
                  <svg
                    style={{ marginRight: "0.5vw" }}
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='4' cy='4' r='4' fill='#5329FF' />
                  </svg>
                ) : null}
                Товарная аналитика
              </p>
            </div>
          ) : null}
          <div
            className='sidenav-el'
            onClick={() => setPromotionShown(!promotionShown)}
          >
            <div className='d-flex align-items-center'>
              {location === "calculate" || location === "monitoring" ? (
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12.6926 7.43856C12.2589 7.02768 11.9799 6.47997 11.9026 5.88756L11.4996 2.80456L8.76963 4.29056C8.24472 4.57658 7.63729 4.67299 7.04963 4.56356L3.99363 3.99356L4.56363 7.04956C4.67306 7.63723 4.57664 8.24466 4.29063 8.76956L2.80463 11.4996L5.88763 11.9026C6.47968 11.9801 7.027 12.2591 7.43763 12.6926L9.57563 14.9496L10.9116 12.1426C11.1681 11.6031 11.6024 11.1684 12.1416 10.9116L14.9496 9.57556L12.6926 7.43856ZM12.7176 13.0016L10.5046 17.6516C10.4628 17.7395 10.4001 17.8159 10.3221 17.8742C10.2441 17.9325 10.1531 17.9709 10.0569 17.9862C9.96074 18.0015 9.86229 17.9931 9.77008 17.9618C9.67786 17.9305 9.59465 17.8772 9.52763 17.8066L5.98563 14.0676C5.891 13.9678 5.76497 13.9035 5.62863 13.8856L0.521626 13.2176C0.425138 13.2048 0.33319 13.1689 0.253713 13.1127C0.174235 13.0565 0.109614 12.9819 0.0654226 12.8951C0.0212308 12.8084 -0.00120502 12.7123 4.98912e-05 12.615C0.00130481 12.5176 0.0262129 12.4221 0.0726259 12.3366L2.53463 7.81256C2.60008 7.69157 2.62196 7.55176 2.59663 7.41656L1.65363 2.35356C1.63572 2.25773 1.64143 2.15897 1.67028 2.06585C1.69912 1.97272 1.75022 1.88802 1.81915 1.81909C1.88809 1.75015 1.97279 1.69905 2.06591 1.67021C2.15904 1.64137 2.25779 1.63565 2.35363 1.65356L7.41663 2.59656C7.55183 2.6219 7.69164 2.60001 7.81263 2.53456L12.3366 0.0725597C12.4222 0.0261341 12.5179 0.00124625 12.6152 4.56055e-05C12.7126 -0.00115504 12.8088 0.0213677 12.8956 0.0656684C12.9823 0.109969 13.0569 0.174716 13.1131 0.254318C13.1692 0.33392 13.2051 0.425984 13.2176 0.52256L13.8856 5.62856C13.9036 5.7649 13.9678 5.89093 14.0676 5.98556L17.8066 9.52756C17.8773 9.59458 17.9305 9.6778 17.9618 9.77001C17.9931 9.86223 18.0015 9.96068 17.9863 10.0569C17.971 10.153 17.9326 10.2441 17.8743 10.3221C17.816 10.4001 17.7395 10.4627 17.6516 10.5046L13.0016 12.7176C12.8771 12.7768 12.7769 12.8771 12.7176 13.0016ZM13.5146 14.9286L14.9286 13.5146L19.1716 17.7566L17.7566 19.1716L13.5146 14.9286Z'
                    fill='#5329FF'
                  />
                </svg>
              ) : (
                <img src={magic} alt='' className='side-nav-icon' />
              )}
              <span
                className='sidenav-title'
                style={
                  location === "calculate" || location === "monitoring"
                    ? { fontWeight: "bold", fontSize: "14px", color: "black" }
                    : {}
                }
              >
                Продвижение
              </span>
            </div>
            <span>
              {promotionShown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
          {promotionShown ? (
            <div>
              <p
                className='sidenav-title ps-4 submenu-item'
                onClick={() => navigate("/monitoring")}
                style={
                  location === "monitoring"
                    ? { fontWeight: "bold", fontSize: "14px" }
                    : {}
                }
              >
                {location === "monitoring" ? (
                  <svg
                    style={{ marginRight: "0.5vw" }}
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='4' cy='4' r='4' fill='#5329FF' />
                  </svg>
                ) : null}
                Мониторинг запросов
              </p>
              <p
                className='sidenav-title ps-4 submenu-item'
                onClick={() => navigate("/calculate")}
                style={
                  location === "calculate"
                    ? { fontWeight: "bold", fontSize: "14px" }
                    : {}
                }
              >
                {location === "calculate" ? (
                  <svg
                    style={{ marginRight: "0.5vw" }}
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='4' cy='4' r='4' fill='#5329FF' />
                  </svg>
                ) : null}
                Калькулятор unit-экономики товаров
              </p>
            </div>
          ) : null}
          <div
            className={`sidenav-el additional-tools ${additionalTools ? "expanded" : ""
              }`}
            onClick={() => setAdditionalTools(!additionalTools)}
          >
            <div className='d-flex align-items-center'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6 14L13 2V10H18L11 22V14H6Z'
                  stroke='#F0AD00'
                  strokeWidth='2'
                  strokeLinejoin='round'
                />
              </svg>

              {/* <img src={lightning} alt='' className='side-nav-icon' /> */}

              <span
                className='sidenav-title'
                style={
                  location === "abc-data"
                    ? { fontWeight: "", fontSize: "14px", color: "#F0AD00" }
                    : {
                      fontWeight: "",
                      fontSize: "14px",
                      color: "#F0AD00",
                    }
                }
              >
                Дополнительные
                <br />
                инструменты
              </span>
            </div>

            <span>
              {additionalTools ? (
                <IoIosArrowUp color='#F0AD00' />
              ) : (
                <IoIosArrowDown color='#F0AD00' />
              )}
            </span>
          </div>
          {additionalTools ? (
            <div
              style={{
                background: "#F0AD000D",
                borderBottomLeftRadius: "16px",
                borderBottomRightRadius: "16px",
                padding: "5px",
              }}
            >
              <p
                className='sidenav-title ps-4 submenu-item'
                style={
                  location === "plagin"
                    ? { fontWeight: "bold", fontSize: "14px" }
                    : {}
                }
                onClick={() => navigate("")}
              >
                <a
                  href='https://chromewebstore.google.com/detail/radar-%E2%80%93-%D0%B1%D0%B5%D1%81%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D1%82/haelmohfdnapjehnhgncjdnjmchdahhb'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Radar – плагин в браузер
                </a>
              </p>
              {/* <p
                className='sidenav-title ps-4 submenu-item'
                style={
                  location === "abc-data"
                    ? { fontWeight: "bold", fontSize: "14px" }
                    : {}
                }
                onClick={() => navigate("/abc-data")}
              >
                {location === "abc-data" ? (
                  <svg
                    style={{ marginRight: "0.5vw" }}
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='4' cy='4' r='4' fill='#F0AD00' />
                  </svg>
                ) : null}
                Умная таблица Excel
              </p> */}
            </div>
          ) : null}
        </div>
      </div>

      <div
        className='support-block'
        // onClick={() =>
        //   toggleOpenSupport()
        // }
        style={{ cursor: "pointer" }}
      >
        <a>
          <img src={support} alt='' className='support-icon' />
        </a>
        <p className='fw-bold mb-0 mt-2 p-0' style={{ fontSize: "1.8vh" }}>
          Обратиться в поддержку
        </p>
        <p className='m-0 p-0' style={{ fontSize: "1.8vh" }}>
          или предложить идею
        </p>
      </div>
    </div>
  );
};

export default SideNav;
