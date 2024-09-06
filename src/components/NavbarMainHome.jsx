import React, { useContext, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import LogoNavbarSelect from "../pages/images/LogoNavbarSelect";
import { useNavigate } from "react-router-dom";
import AuthContext from "../service/AuthContext";
import RadarAnaliticaMedium from "../pages/images/RadarAnaliticaMedium.svg";
import Steps from "../pages/images/Steps";
import menu from "../assets/menu.png";
import closebtn from "../assets/closebtn.png";

const NavbarMainHome = ({ onlyLogo }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const buttonSignIn = (path) => {
    return (
      <button
        onClick={() => {
          navigate(path);
        }}
        className='prime-btn prime-btn-mobile header-btn header-btn_light'
      >
        <Steps.StepsBlue />
        <p style={{ margin: 0, fontWeight: 600 }}>Войти</p>
      </button>
    );
  };

  return (
    <div className='page-header'>
      <div className='wide_container page-container mobile-container'>
        <img
          src={RadarAnaliticaMedium}
          alt='logo'
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        />
        {!onlyLogo && (
          <div className='widheader-login hide-on-mobile'>
            {user ? (
              user?.subscription_status !== "expired" ? (
                buttonSignIn("/dashboard")
              ) : user?.subscription_status === "expired" ? (
                buttonSignIn("/tariffs")
              ) : null
            ) : (
              <div className='header-btn-wrap'>
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className='prime-btn header-btn'
                >
                  <Steps.StepsWhite />
                  <p style={{ margin: 0, fontWeight: 600 }}>Регистрация</p>
                </button>
                {buttonSignIn("/signin")}
              </div>
            )}
          </div>
        )}
        {/* <div className='home-menu'>
          <Dropdown>
            <Dropdown.Toggle
              style={{
                backgroundColor: 'white',
                color: 'black',
                border: 'none',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              Сервис
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div
                className='mainList'
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div className='oneList'>
                  <Dropdown.Item href='#'>
                    <LogoNavbarSelect.monitoring />
                    Мониторинг запросов и категорий
                  </Dropdown.Item>
                  <Dropdown.Item href='#'>
                    <LogoNavbarSelect.analiz />
                    Анализ собственных продаж
                  </Dropdown.Item>
                  <Dropdown.Item href='#'>
                    <LogoNavbarSelect.econom />
                    Расчет unit – экономики
                  </Dropdown.Item>
                  <Dropdown.Item href='#'>
                    <LogoNavbarSelect.seo />
                    SEO – оптимизация
                  </Dropdown.Item>
                </div>
                <div className='twoList'>
                  <Dropdown.Item href='#'>
                    <LogoNavbarSelect.stock />
                    Расчет поставок по складам
                  </Dropdown.Item>
                  <Dropdown.Item href='#'>
                    <LogoNavbarSelect.tgbot />
                    Телеграм бот (аналитика в телефоне)
                  </Dropdown.Item>
                  <Dropdown.Item href='#'>
                    <LogoNavbarSelect.lk />
                    Оцифровка личного кабинета селлера
                  </Dropdown.Item>
                  <Dropdown.Item href='#'>
                    <LogoNavbarSelect.analits />
                    Расширение для аналитики маркетплейсов
                  </Dropdown.Item>
                </div>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              style={{
                backgroundColor: 'white',
                color: 'black',
                border: 'none',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              Услуги
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href='#'>
                {' '}
                <LogoNavbarSelect.startMarket />
                «START» на Маркетплейсах
              </Dropdown.Item>
              <Dropdown.Item href='#'>
                {' '}
                <LogoNavbarSelect.seo2 />
                SEO – продвижение
              </Dropdown.Item>
              <Dropdown.Item href='#'>
                {' '}
                <LogoNavbarSelect.marketing />
                Комплексный маркетинг
              </Dropdown.Item>
              <Dropdown.Item href='#'>
                {' '}
                <LogoNavbarSelect.specProject />
                Спец. проекты 
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <span className='home-item'>Тарифы</span>
          <span className='home-item'>Контакты</span>
        </div> */}
      </div>
      <div className='mobile-menu-container'>
        {/* Burger Menu Icon */}
        <button className='mobile-menu-button' onClick={toggleMenu}>
          <img src={isOpen ? closebtn : menu} alt='Menu' />
        </button>

        <div
          className={`mobilemenu ${isOpen ? "open" : ""}`}
          style={{ display: isOpen ? "block" : "none" }}
        >
          {/* Insert mobile menu content here */}
          {!onlyLogo && (
            <div className='mobile-menu-content'>
              {user ? (
                user?.subscription_status !== "expired" ? (
                  buttonSignIn("/dashboard")
                ) : user?.subscription_status === "expired" ? (
                  buttonSignIn("/tariffs")
                ) : null
              ) : (
                <div className='header-btn-wrap'>
                  <button
                    onClick={() => {
                      navigate("/signup");
                    }}
                    className='prime-btn prime-btn-mobile header-btn'
                  >
                    <Steps.StepsWhite />
                    <p style={{ margin: 0, fontWeight: 600 }}>Регистрация</p>
                  </button>
                  {buttonSignIn("/signin")}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavbarMainHome;
