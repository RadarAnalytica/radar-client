import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const AccordionMain = () => {
  return (
    <>
      <div style={{ marginTop: '50px', fontSize: '44px', fontWeight: '700' }}>
        Вопросы и ответы
      </div>
      <Accordion
        defaultActiveKey='-1'
        style={{ width: '70%', fontSize: '25px' }}
      >
        <Accordion.Item eventKey='0' style={{ backgroundColor: '#5329FF0D' }}>
          <Accordion.Header>
            <div style={{ fontSize: '25px' }}>
              Чем мне поможет ваш сервис? Сможет ли он окупить инвестиции?
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <p>Наш сервис поможет вам несколькими способами.</p>{' '}
            <p>
              С помощью анализа ниши вы сможете подобрать такую категорию, где
              конкуренция не слишком высокая, а популярность и продажи на
              хорошем уровне.
            </p>{' '}
            <p>
              Анализ конкурентов поможет выявить выигрышные стратегии и
              скопировать их, а также не допустить ошибок, которые совершают
              другие.
            </p>
            <p>
              Личный кабинет Wildberries и Ozon позволит выявить убыточные
              товары и избавиться от них, а также оптимизировать поставки.
            </p>
            <p>
              В среднем наши клиенты увеличивают выручку на 44% за 3 месяца
              использования сервиса (по сравнению с периодом 3 месяца до начала
              использования сервиса).
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1' style={{ backgroundColor: '#5329FF0D' }}>
          <Accordion.Header>
            <div style={{ fontSize: '25px' }}>
              Откуда вы берёте данные? Насколько они точные?
            </div>
          </Accordion.Header>
          <Accordion.Body>Что-то надо написать</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2' style={{ backgroundColor: '#5329FF0D' }}>
          <Accordion.Header>
            <div style={{ fontSize: '25px' }}>
              Какие маркетплейсы поддерживаются?
            </div>
          </Accordion.Header>
          <Accordion.Body>Что-то надо написать</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='3' style={{ backgroundColor: '#5329FF0D' }}>
          <Accordion.Header>
            <div style={{ fontSize: '25px' }}>
              Ваш сервис выглядит круто, но я боюсь, что у меня не получится в
              нём разобраться
            </div>
          </Accordion.Header>
          <Accordion.Body>Что-то надо написать</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='4' style={{ backgroundColor: '#5329FF0D' }}>
          <Accordion.Header>
            <div style={{ fontSize: '25px' }}>
              Не хочу платить за аналитику, пока не начну зарабатывать
            </div>
          </Accordion.Header>
          <Accordion.Body>Что-то надо написать</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='5' style={{ backgroundColor: '#5329FF0D' }}>
          <Accordion.Header>
            <div style={{ fontSize: '25px' }}>
              Я представляю крупную компанию, можете ли вы что-то сделать
              специально для нас?
            </div>
          </Accordion.Header>
          <Accordion.Body>Что-то надо написать</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
export default AccordionMain;
