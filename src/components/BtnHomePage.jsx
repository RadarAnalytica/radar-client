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
import frame1 from "../pages/images/frame1.png";
import frame2 from "../pages/images/frame1.png";
import frame3 from "../pages/images/frame1.png";
import frame4 from "../pages/images/frame1.png";

const dataImages = {
  newbie: [newbie1, newbie2, newbie3],
  currentSellers: [sellers1, sellers2, sellers3],
  business: [bussines1, bussines2, bussines3],
  manager: [manager1, manager2, manager3],
};
const dataImagesMobile = [frame1, frame2, frame3, frame4];

const whyUs = {
  newbie: {
    title: "Новички",
    functions: [
      "Найти прибыльную нишу и проанализировать спрос",
      "Проанализировать стратегию лидеров рынка",
      "Выбрать товар для запуска бизнеса, который будет продаваться",
    ],
  },
  currentSellers: {
    title: "Действующие продавцы",
    functions: [
      "Масштабировать продажи и показатели ",
      "Проанализировать стратегию лидеров рынка",
      "Выбрать товар для запуска бизнеса, который будет продаваться",
    ],
  },
  business: {
    title: "Крупный бизнес",
    functions: [
      "Найти прибыльную нишу и проанализировать спрос",
      "Проанализировать стратегию лидеров рынка",
      "Выбрать товар для запуска бизнеса, который будет продаваться",
    ],
  },
  manager: {
    title: "Менеджеры маркетплейсов и агентства",
    functions: [
      "Найти прибыльную нишу и проанализировать спрос",
      "Проанализировать стратегию лидеров рынка",
      "Выбрать товар для запуска бизнеса, который будет продаваться",
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

  const renderedTitles = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {dataImagesMobile.map((image, index) => (
          <div key={index} style={{ marginBottom: "20px", width: "100%" }}>
            <img
              src={image}
              alt={`frame-${index}`}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className='widhead-container-title'>
        Кому и для чего нужен наш сервис
      </div>
      <div className='widhead-container-header'>
        <button
          onClick={() => handleClick("newbie")}
          className={activeButton === "newbie" ? "prime-btn" : "secondary-btn"}
          id='btnDop'
        >
          {activeButton === "newbie" ? <Steps.Circle /> : <span></span>}
          Новички
        </button>
        <button
          onClick={() => handleClick("currentSellers")}
          className={
            activeButton === "currentSellers" ? "prime-btn" : "secondary-btn"
          }
          id='btnDop'
        >
          {activeButton === "currentSellers" ? <Steps.Circle /> : <span></span>}
          Действующие продавцы
        </button>
        <button
          onClick={() => handleClick("business")}
          className={
            activeButton === "business" ? "prime-btn" : "secondary-btn"
          }
          id='btnDop'
        >
          {activeButton === "business" ? <Steps.Circle /> : <span></span>}
          Крупный бизнес
        </button>
        <button
          onClick={() => handleClick("manager")}
          className={activeButton === "manager" ? "prime-btn" : "secondary-btn"}
          id='btnDop'
        >
          {activeButton === "manager" ? <Steps.Circle /> : <span></span>}
          Менеджеры маркетплейсов и агентства
        </button>
      </div>
      <div className='widhead-container widhead-container-main'>
        {renderedImages}
      </div>
      <div className='widhead-container-mini'>{renderedTitles()}</div>
    </>
  );
};

export default BtnHomePage;
