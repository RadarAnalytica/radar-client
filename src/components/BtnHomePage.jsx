import React, { useCallback, useEffect, useMemo, useState } from "react";
import newbie1 from "../pages/images/newbie1.png";
import newbie2 from "../pages/images/newbie2.png";
import newbie3 from "../pages/images/newbie3.png";
import sellers1 from "../pages/images/sellers1.png";
import sellers2 from "../pages/images/sellers2.png";
import sellers3 from "../pages/images/sellers3.png";
import bussines1 from "../pages/images/bussines1.png";
import bussines2 from "../pages/images/bussines2.png";
import bussines3 from "../pages/images/bussines3.png";
import manager1 from "../pages/images/manager1.png";
import manager2 from "../pages/images/manager2.png";
import manager3 from "../pages/images/manager3.png";
import Steps from "../pages/images/Steps";
import styles from "../components/BtnHomePage.module.css"

const dataImages = {
  newbie: [newbie1, newbie2, newbie3],
  currentSellers: [sellers1, sellers2, sellers3],
  business: [bussines1, bussines2, bussines3],
  manager: [manager1, manager2, manager3],
};

const whyUs = {
  newbie: {
    title: "Новички",
    functions: [
      {
        emoji: "🔍",
        text: "Найти прибыльную нишу и проанализировать спрос",
      },
      { emoji: "📊", text: "Проанализировать стратегию лидеров рынка" },
      {
        emoji: "📦",
        text: "Выбрать товар для запуска бизнеса, который будет продаваться",
      },
    ],
  },
  currentSellers: {
    title: "Действующие продавцы",
    functions: [
      { emoji: "💸", text: "Масштабировать продажи и показатели" },
      {
        emoji: "💰",
        text: "Анализировать тренды и расширять товарную матрицу прибыльными товарами",
      },
      { emoji: "🔝", text: "Вывести товары в ТОП и улучшить SEO-выдачу" },
    ],
  },
  business: {
    title: "Крупный бизнес",
    functions: [
      {
        emoji: "👥",
        text: "Добавить менеджеров и удобно контролировать отчетность",
      },
      {
        emoji: "📍",
        text: "Видеть все финансовые показатели по всем магазинам в одном месте",
      },
      {
        emoji: "💡",
        text: "Принимать стратегически верные решения для развития бизнеса",
      },
    ],
  },
  manager: {
    title: `Менеджеры маркетплейсов и агентства`,
    functions: [
      { emoji: "📈", text: "Добавить всех клиентов в один сервис" },
      {
        emoji: "📝",
        text: "Автоматизировать отчетность и рутинные задачи",
      },
      {
        emoji: "🔑",
        text: "Удобная форма контроля за ключевыми показателями",
      },
    ],
  },
};

const BtnHomePage = () => {
  const [activeButton, setActiveButton] = useState("newbie");

  const handleClick = useCallback((buttonName) => {
    setActiveButton(buttonName);
  }, []);

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    };

    const loadImages = async () => {
      const images = Object.values(dataImages).flat();
      await Promise.all(images.map(loadImage));
    };

    loadImages();
  }, []);

  const renderedImages = useMemo(() => {
    return dataImages[activeButton].map((src, index) => (
      <div
        key={index}
        style={{ marginRight: "5px", position: "relative", maxWidth: "460px" }}
      >
        <img
          style={{ borderRadius: "18px" }}
          src={src}
          alt={"Block Main Page"}
          className='imgBox'
        />
      </div>
    ));
  }, [activeButton]);

  const sections = Object.values(whyUs);
  const renderedTitles = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {sections.map((section, index) => (
          <div key={index} className='card'>
            <div className='cardHeader'>
              <Steps.CircleWhite />
              <p className='cardTitle'>{section.title}</p>
            </div>

            <div className='cardBody'>
              {section.functions.map((func, funcIndex) => (
                <div className='cardContent' key={funcIndex}>
                  <div className='cardImage'>
                    <span>{func.emoji}</span>
                  </div>
                  <div className='cardText'>{func.text}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <h3 className={`widhead-container-title ${styles.widHeadContainerTitle}`}>
        Кому и для чего нужен наш сервис
      </h3>
      <div className={`widhead-container-header  ${styles.widHeadContainerHeader}`}>
        <button
          onClick={() => handleClick("newbie")}
          className={activeButton === "newbie" ? "btnhomepage-main-button" : "secondary-btn"}
          id='btnDop'
        >
          {activeButton === "newbie" ? <Steps.Circle /> : <span></span>}
          Новички
        </button>
        <button
          onClick={() => handleClick("currentSellers")}
          className={
            activeButton === "currentSellers" ? "btnhomepage-main-button" : "secondary-btn"
          }
          id='btnDop'
        >
          {activeButton === "currentSellers" ? <Steps.Circle /> : <span></span>}
          Действующие продавцы
        </button>
        <button
          onClick={() => handleClick("business")}
          className={
            activeButton === "business" ? "btnhomepage-main-button" : "secondary-btn"
          }
          id='btnDop'
        >
          {activeButton === "business" ? <Steps.Circle /> : <span></span>}
          Крупный бизнес
        </button>
        <button
          onClick={() => handleClick("manager")}
          className={activeButton === "manager" ? "btnhomepage-main-button" : "secondary-btn"}
          id='btnDop'
        >
          {activeButton === "manager" ? <Steps.Circle /> : <span></span>}
          Менеджеры маркетплейсов и агентства
        </button>
      </div >
      <div className='widhead-container widhead-container-main'>
        {renderedImages}
      </div>
      <div className='widhead-container-mini'>{renderedTitles()}</div>
    </>
  );
};

export default BtnHomePage;
