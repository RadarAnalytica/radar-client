import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Steps from "../pages/images/Steps";
import YellowRadar from "../pages/images/YellowRadarLarge";
import time from "../pages/images/time.png";
import YellowRadarLarge from "../pages/images/YellowRadarLarge";
import AuthContext from "../service/AuthContext";
import YellowRadarSmall from "../pages/images/YelowRadarSmall";
import styles from "../components/StepsTime.module.css"

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
      <div key={index} className={`steps ${"steps-time" + (index + 1)}`}>
        <div>
          <div className='steps-container'>
            <Steps.StepsBlue />
            <p>{`Шаг ${(index + 1).toString()}`}</p>
          </div>
          <div className='steps-container-title'>{stepData.title}</div>
          <div className='steps-container-content'>{stepData.content}</div>
        </div>

        <div className={`steps-container-after-content ${styles.stepsContainerAafterContent}`}>
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
        marginTop: "50px",
      }}
    >
      <div className={`stepsTimeHeader ${styles.stepsTimeHeader}`} style={{}}>
        <div style={{ marginRight: "20px" }} className={`hide-on-mobile ${styles.YellowRadarLarge}`}>
          <YellowRadarLarge />
        </div>
        <div className='mobile-yellow-icon'>
          <YellowRadarSmall />
        </div>
        <h3 className={`helpEveryStepText ${styles.helpEveryStepText}`}>
          поможет на каждом этапе вашего{" "}
          <span style={{ color: "#5329FF", fontWeight: "800" }}>
            развития на маркетплейсах
          </span>
        </h3>
        <div className='helpEveryStepTextMobile'>
          поможет на каждом <br /> этапе вашего{" "}
          <span style={{ color: "#5329FF", fontWeight: "800" }}>
            развития <br />на маркетплейсах
          </span>
        </div>

      </div>
      <div className={`stepsTimeItems ${styles.stepsTimeItems}`}>
        {stepsContent.map((item, index) => renderStep(item, index))}
        <div className={`stepsBtn steps-time5`}>
          <div>
            <div className='stepsBtnBlock'>
              <Steps.StepsWhite />
              <p className='stepsBtnBlockStepText'>Шаг 5</p>
            </div>
            <div className='stepsBtnTitle'>Масштабируй свой бизнес</div>
            <div className='stepsBtnContent'>
              Найдите выгодные товары для выхода на маркетплейсы
            </div>
          </div>

          <button
            className='btn-warning btn-warning-special'
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
    </div >
  );
};
export default StepsTime;
