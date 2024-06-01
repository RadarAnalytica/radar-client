import React, { useState, useRef } from 'react';
import defaultPhoto from '../pages/images/defaultPhotoUser.jpg';
import arrow from '../pages/images/accordStr2.png';
import Stars from '../pages/images/Stars';

const reviewsIP = [
  {
    photo: defaultPhoto,
    stars: <Stars />,
    text: 'Куда сходить с семьёй в дни Пасхальной Светлой седмицы? Конечно же в музей яиц! Музей Фаберже находится на набережной реки Фонтанки дом 21 во дворце Нарышкиных-Шуваловых с 2013 года.',
  },
  {
    photo: defaultPhoto,
    stars: <Stars />,
    text: 'Куда сходить с семьёй в дни Пасхальной Светлой седмицы? Конечно же в музей яиц! Музей Фаберже находится на набережной реки Фонтанки дом 21 во дворце Нарышкиных-Шуваловых с 2013 года. Открыт ежедневно с 10 до 20-45. На мой взгляд не очень дёшево. Но если подумать о стоимости самих экспонатов...! Сам музей',
  },
  { photo: defaultPhoto, stars: <Stars />, text: 'fdsfdsfdsfdsf' },
  {
    photo: defaultPhoto,
    stars: <Stars />,
    text: 'Куда сходить с семьёй в дни Пасхальной Светлой седмицы? Конечно же в музей яиц! Музей Фаберже находится на набережной реки Фонтанки дом 21 во дворце Нарышкиных-Шуваловых с 2013 года.',
  },
  {
    photo: defaultPhoto,
    stars: <Stars />,
    text: 'Куда сходить с семьёй в дни Пасхальной Светлой седмицы? Конечно же в музей яиц! Музей Фаберже находится на набережной реки Фонтанки дом 21 во дворце Нарышкиных-Шуваловых с 2013 года. Открыт ежедневно с 10 до 20-45. На мой взгляд не очень дёшево. Но если подумать о стоимости самих экспонатов...! Сам музей',
  },
  { photo: defaultPhoto, stars: <Stars />, text: 'fdsfdsfdsfdsf' },
];

const Reviews = () => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 300;
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 300;
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };
  return (
    <>
      <div
        ref={scrollRef}
        className='scroll-container'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          overflowX: 'auto',
        }}
      >
        {reviewsIP.map((el, index) => (
          <div key={index} className='blockReviews'>
            <div style={{ width: '30%' }}>
              <img src={el.photo} alt='userLogo' className='photoReviewUser' />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '422px',
                fontSize: '18px',
                fontWeight: '600',
              }}
            >
              <div style={{ marginBottom: '10px' }}>{el.stars}</div>
              <div>{el.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <img
          onClick={scrollLeft}
          src={arrow}
          alt='arrow'
          style={{ width: '3%', transform: 'rotate(90deg)', cursor: 'pointer' }}
        />

        <img
          onClick={scrollRight}
          src={arrow}
          alt='arrow'
          style={{
            width: '3%',
            transform: 'rotate(-90deg)',
            cursor: 'pointer',
          }}
        />
      </div>
    </>
  );
};
export default Reviews;
