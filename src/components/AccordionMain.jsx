import React from "react";
import "../pages/styles.css";
import Accordion from "react-bootstrap/Accordion";

const AccordionMain = () => {
  return (
    <>
      <div className='qaBlock'>Вопросы и ответы</div>
      <Accordion
        defaultActiveKey='-1'
        style={{ width: "70%", fontSize: "25px" }}
        className='custom-accordion'
      >
        <Accordion.Item eventKey='0' className='custom-accordion-item'>
          <Accordion.Header>
            <div className='custom-accordion-header-text'>
              Зачем мне ваш сервис? Сможет ли он помочь мне?
            </div>
          </Accordion.Header>
          <Accordion.Body className='custom-accordion-body'>
            <p>
              Наш сервис предоставляет возможность в режиме реального времени
              контролировать все финансовые и товарно-учетные метрики. Вы будете
              находиться в курсе всех важных бизнес-показателей и сможете
              принимать правильные стратегические решения.
            </p>
            <p>
              Мы давно занимаемся оцифровкой данных и аналитикой и с
              уверенностью рекомендуем вам попробовать наш “тестовый период”
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1' className='custom-accordion-item'>
          <Accordion.Header>
            <div className='custom-accordion-header-text'>
              Каким образов вы получаете данные? Это безопасно?
            </div>
          </Accordion.Header>
          <Accordion.Body className='custom-accordion-body'>
            <p>
              Данные мы берём из API маркетплейса и из внешних источников
              благодаря продвинутым алгоритмам. Все способы получения данных на
              100% безопасны и официальны. Никаким образом это не может вам
              навредить. Мы внимательно следим за всеми требованиями
              маркетплейса и не противоречим им.
            </p>
            <p>
              Точность данных, которые мы предоставляем примерно 95% и могут
              немного отличаться от данных в отчете маркетплейса. Мы постоянно
              совершенствуем наши алгоритмы, чтобы определять и избавляться от
              неточностей.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2' className='custom-accordion-item'>
          <Accordion.Header>
            <div className='custom-accordion-header-text'>
              Какие маркетплейсы поддерживаются?
            </div>
          </Accordion.Header>
          <Accordion.Body className='custom-accordion-body'>
            <p>
              На данный момент только WILDBERRIES. Наша команда постоянно
              обновляет функционал аналитики, как только в обновлениях мы
              подключим другие маркетплейсы, мы обновим информацию на сайте.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='3' className='custom-accordion-item'>
          <Accordion.Header>
            <div className='custom-accordion-header-text'>
              А я точно смогу разобраться в вашем сервисе?
            </div>
          </Accordion.Header>
          <Accordion.Body className='custom-accordion-body'>
            <p>
              Гарантируем, что да. Навигация в сервисе интуитивно понятна, а
              функционал не отягощен лишним, более того, мы проводили много
              тестов с реальными селлерами и разрабатывали дизайн как раз с
              учетом того, что всё должно быть понятно даже неопытному
              пользователю ПК.
            </p>
            <p>
              У нас есть тестовый период “ 3 дня за 1 рубль”, вы всегда можете
              протестировать сервис перед покупкой и убедиться в его удобстве.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='4' className='custom-accordion-item'>
          <Accordion.Header>
            <div className='custom-accordion-header-text'>
              Я представляю большую компанию, у вас есть какие-то
              “индивидуальные решения”?
            </div>
          </Accordion.Header>
          <Accordion.Body className='custom-accordion-body'>
            <p>
              Да, у нас большой опыт работы с данными и их оцифровкой, мы будем
              рады обсудить с вами ваш запрос и предложить более сложные и
              комплексные варианты работы. Заявки на спец. проекты можно
              отправить на почту: radar-analytica@inbox.ru
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
export default AccordionMain;
