import React, { useState, useRef } from "react";
import defaultPhoto from "../pages/images/defaultPhotoUser.jpg";
import arrow from "../pages/images/accordStr2.png";
import Stars from "../pages/images/Stars";
import User1 from "../pages/images/User1.JPG";
import User2 from "../pages/images/User2.JPG";
import User3 from "../pages/images/User3.JPG";
import User4 from "../pages/images/User4.JPG";
import User5 from "../pages/images/User5.JPG";

const reviewsIP = [
  {
    photo: User1 || defaultPhoto,
    stars: <Stars />,
    text: `Около года пользовалась умной таблицей от Радар аналитики и когда менеджер сообщила, 
    что теперь доступна полноценная онлайн аналитика сразу купила доступ на три месяца, даже без пробного периода;). 
    За первые три недели использования проблем нет, отдельно отмечу скорость обновления данных, показатели более точные, чем в аналитиках за 15.000₽. Рекомендую!`,
  },
  {
    photo: User2 || defaultPhoto,
    stars: <Stars />,
    text: `Удобный сервис. Раньше не встречал, но однозначно буду рекомендовать, понравилось, 
    что нет нагромождения лишними функциями и разобраться просто. География продаж очень удобная.`,
  },
  {
    photo: User3 || defaultPhoto,
    stars: <Stars />,
    text: `Работаю менеджером, ведем с командой около 17 кабинетов. 
    Больше года пользуюсь уже и ботом от Radara и таблицей, теперь и аналитика появилась. Пока тестирую, все устраивает. 
    То, что можно сколько угодно кабинетов подключать без доплаты - это прямо огонь.`,
  },
  {
    photo: User4 || defaultPhoto,
    stars: <Stars />,
    text: `Все работает быстро и быстро подключилась. Все было понятно. Очень удобный дашборд и в дополнение в браузер.`,
  },
  {
    photo: User5 || defaultPhoto,
    stars: <Stars />,
    text: `Работала с разными аналитиками, брала складчины, ваша сильно удобнее, данные даже более точные, 
    порекомендовала в чате выпускников по обучению, спасибо за сервис!`,
  },
];

const Reviews = () => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      // Находим ширину элемента, который нужно прокрутить
      const itemWidth = scrollWidth / reviewsIP.length; // Предполагается, что все элементы одинаковой ширины
      // Прокручиваем на ширину элемента
      scrollRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth; // Общая ширина контейнера
      // Находим ширину элемента, который нужно прокрутить
      const itemWidth = scrollWidth / reviewsIP.length; // Предполагается, что все элементы одинаковой ширины
      // Прокручиваем на ширину элемента
      scrollRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  return (
    <>
      <div
        ref={scrollRef}
        className='scroll-container'
        style={{
          display: "flex",
          justifyContent: "space-between",
          overflowX: "auto",
        }}
      >
        {reviewsIP.map((el, index) => (
          <div key={index} className='blockReviews'>
            <div className='blockReviewImage'>
              <img src={el.photo} alt='userLogo' className='photoReviewUser' />
            </div>
            <div className='blockReviewsContent'>
              <div style={{ marginBottom: "10px" }}>{el.stars}</div>
              <div className='blockReviewsText'>{el.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <img
          className='arrowReviewsLeft'
          onClick={scrollLeft}
          src={arrow}
          alt='arrow'
        />

        <img
          onClick={scrollRight}
          src={arrow}
          alt='arrow'
          className='arrowReviewsRight'
        />
      </div>
    </>
  );
};
export default Reviews;
