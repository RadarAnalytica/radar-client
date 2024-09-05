import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Steps from "../pages/images/Steps";
import YellowRadar from "../pages/images/YellowRadarLarge";
import time from "../pages/images/time.png";
import YellowRadarLarge from "../pages/images/YellowRadarLarge";
import AuthContext from "../service/AuthContext";

const StepsTime = ({ redirect }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const stepsContent = [
    {
      title: "Запуск",
      content: `Найдите выгодные товары для выхода на маркетплейсы`,
      afterContent: "1 день",
    },
    {
      title: "Старт работы",
      content: `Научитесь торговать на примере лидеров, управляйте ценой и поставками, шпионьте за конкурентами`,
      afterContent: "2 дня",
    },
    {
      title: "Рост",
      content: `Сервис Все-в-одном: сконцентрируйтесь на ключевых метриках для развития торговой матрицы и увеличения прибыли`,
      afterContent: "20 дней",
    },
    {
      title: "Кризис",
      content: `Спады случаются даже с большими компаниями - это нормально, когда
              вы растете и выходите на новый рынок. Radar поможет найти и
              излечить болезни роста`,
      afterContent: "7 дней",
    },
  ];
  const renderStep = (stepData, index) => {
    return (
      <div className={`steps ${"steps-time" + (index + 1)}`}>
        <div>
          <div className='steps-container'>
            <Steps.StepsBlue />
            <p>{`Шаг ${(index + 1).toString()}`}</p>
          </div>
          <div className='steps-container-title'>{stepData.title}</div>
          <div className='steps-container-content'>{stepData.content}</div>
        </div>

        <div className='steps-container-after-content'>
          <img src={time} alt='tims' />
          {stepData.afterContent}
        </div>
      </div>
    );
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "120px",
      }}
    >
      <div className='stepsTimeHeader' style={{}}>
        <div
          style={{
            paddingRight: "28px",
          }}
        >
          <YellowRadarLarge />
        </div>
        <div className='helpEveryStepText'>
          поможет на каждом этапе вашего{" "}
          <span style={{ color: "blue", fontWeight: "800" }}>
            развития на маркетплейсах
          </span>
        </div>
      </div>
      <div className='stepsTimeItems'>
        {stepsContent.map((item, index) => renderStep(item, index))}
        <div className='stepsBtn steps-time5'>
          <div>
            <div className='stepsBtnBlock'>
              <Steps.StepsWhite />
              <p style={{ margin: 0 }}>Шаг 5</p>
            </div>
            <div style={{ fontSize: "25px", fontWeight: "700" }}>
              Масштабируй свой бизнес
            </div>
            <div style={{ fontSize: "16px" }}>
              Найдите выгодные товары для выхода на маркетплейсы
            </div>
          </div>

          <button
            className='btn-warning'
            style={{ minHeight: "64px", fontSize: "18px" }}
            onClick={() => {
              if (user) {
                window.open("/tariffs", "_blank");
              }
              if (!user) {
                navigate("/signup");
              }
            }}
          >
            Начать работать
          </button>
        </div>
      </div>
    </div>
  );
};
export default StepsTime;
