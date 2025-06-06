import React from 'react';
import './styles.css';
import LimitedFooter from '../components/LimitedFooter';
import NavbarMainHome from '../components/NavbarMainHome';
import FooterNewVersion from '../components/FooterNewVersion';
import styles from '../pages/Politics.module.css'
import { Helmet } from 'react-helmet-async';

const PublicOffer = () => {
  return (
    <div className='instruction-page'>
      <Helmet>
        <title>Публичная оферта сервиса Radar Analytica</title>
        <meta name="description" content="Публичная оферта сервиса Радар Аналитика. Права и обязанности Сторон. Предмет Лицензионного договора. Порядок заключения Лицензионного договора." />
      </Helmet>
      <div className='container instruction-container col-10 container-xlwidth'>
        <NavbarMainHome onlyLogo />

        <div className='container col-10 pt-5 pb-5'>
          <h4
            className={`mb-4 ${styles.politicsHeader}`}
            style={{
              color: 'rgba(83, 41, 255, 1)',
              fontWeight: 'bold',
            }}
          >
            Публичная оферта
          </h4>

          <div className={`${styles.politicsWrapper}`} style={{ fontWeight: 600 }}>
            Настоящий Лицензионный договор устанавливает условия использования
            Сервиса и заключается между любым лицом, использующим Сервис (далее
            — «Лицензиат»), и Индивидуальным предпринимателем Скориченко Лианой
            Сергеевной, зарегистрированной ОГРНИП 322237500349495 от 26.09.2022,
            и действующей согласно законодательству Российской Федерации (далее
            – «Лицензиар»).
            <br />
            <br />
            Под понятием Сервиса понимается – Сервис Radar Analytica,
            размещенный по адресу в сети интернет https://radar-analytica.ru
            (далее по тексту – Сервис). Лицензионный договор заключается путем
            акцепта настоящей публичной оферты Лицензиара.
            <br />
            <br />
            Начало использования интернет-сайта https://radar-analytica.ru
            означает полное согласие со всеми условиями настоящего Договора и
            его надлежащее заключение в порядке, предусмотренном в ст. 435 и п.
            2 ст. 437 Гражданского кодекса Российской Федерации. Публичная
            оферта и условия пользования Сервисом являются официальными
            документами Лицензиара и публикуются на сайте
            https://radar-analytica.ru. Условия пользования Сервисом,
            размещаемые на сайте https://radar-analytica.ru, являются
            приложениями к настоящей Оферте. Любое использование функционала
            интернет-сайта https://radar-analytica.ru означает полное и
            безоговорочное принятие условий настоящей Оферты.
            <br />
            <br />
            Настоящее соглашение адресовано неограниченному кругу лиц. В
            публичном соглашении цена товаров, работ или услуг одинакова для
            потребителей соответствующей категории. Иные условия публичного
            соглашения не могут устанавливаться исходя из преимуществ отдельных
            потребителей или оказания им предпочтения, за исключением случаев,
            если законом или иными правовыми актами допускается предоставление
            льгот отдельным категориям потребителей. Акцепт - полное и
            безоговорочное принятие Лицензиатом условий Соглашения. Безусловным
            принятием (безусловным акцептом) в соответствии со статьей 438
            Гражданского Кодекса РФ условий настоящего соглашения считается
            регистрация Акцептом (принятием) данной оферты (заключением
            Лицензионного договора) является факт регистрации Лицензиата в
            Сервисе, при котором Лицензиат обязан подтвердить ознакомление и
            дать свое согласие с условиями настоящей оферты. При акцептировании
            данной оферты Лицензиат дает Лицензиару согласие на обработку
            персональных данных в соответствии с требованиями Федерального
            закона "О персональных данных" от 27.07.2006 N 152-ФЗ.
            <br />
            <br />
            Оферта вступает в силу с даты размещения в сети Интернет по адресу
            https://radar-analytica.ru и действует до даты отзыва Оферты
            Лицензиаром. Факт удаления с указанного сайта Оферты является ее
            отзывом. В случае изменения условий Оферты, изменения вступают в
            силу после размещения измененного текста Оферты в сети Интернет на
            сайте https://radar-analytica.ru.
            <br />
            <br />
            <br />
            <br />
            1. Предмет Лицензионного договора. Порядок заключения Лицензионного
            договора. <br />
            <br />
            1.1. Предметом настоящего Лицензионного договора является
            предоставление Лицензиаром прав на использование Сервиса Лицензиату
            на условиях простой (неисключительной) лицензии путем предоставления
            доступа к Сервису.
            <br />
            1.2. Территория, на которой допускается использование Лицензиатом
            Сервиса, устанавливается как вся территория страны Лицензиата.
            <br />
            1.3. Сервис является результатом интеллектуальной деятельности
            Лицензиара (или) привлеченных им третьих лиц и защищается
            законодательством Российской Федерации об интеллектуальной
            собственности (часть 4 Гражданского кодекса РФ). Все исключительные
            права на Сервис, сопровождающие его материалы и любые его копии,
            принадлежности, а также иные материалы, в том числе руководства
            пользователя, справочная информация, в полном объеме принадлежат
            Лицензиару.
            <br />
            1.4. Право на использование Сервисом предоставляется Лицензиату
            исключительно на условиях, способами и в объеме, оговоренных
            настоящим Лицензионным договором, на условиях простой
            (неисключительной) лицензии. Лицензиат не вправе без письменного
            согласия Лицензиара предоставлять право использования Сервиса другим
            лицам по сублицензионному договору.
            <br />
            1.5. Настоящим Лицензиат принимает и соглашается с тем, что
            Лицензиар не ограничен вправе заключать сделки (соглашения,
            договоры) в отношении Сервиса с любыми третьими лицами на любых
            условиях, определенных Лицензиаром самостоятельно без необходимости
            предварительного (последующего) согласия (уведомления) об этом
            Лицензиата.
            <br />
            1.6. Использование Сервиса включает в себя в том числе следующее:
            <br />
            1.6.1. Мониторинг данных о контенте, ценах, скидках,
            представленности в категориях и ключевых словах товаров на сайтах,
            выбранных Лицензиатом при оформлении лицензии на Сервис;
            <br />
            1.6.2. Консультирование по вопросу анализа и интерпретации данных;
            <br />
            1.6.3. Консультирование по вопросу работы Сервиса.
            <br />
            1.7. Акцептом оферты признается момент, когда Лицензиат оформил
            регистрацию в Сервисе. С этого момента Лицензионный договор
            считается заключенным.
            <br />
            1.8. Регистрируясь в Сервисе, Лицензиат подтверждает, что:
            <ul>
              <li>является дееспособным гражданином;</li>
              <li>
                ознакомлен с действующей редакцией оферты и согласен с ее
                условиями;
              </li>
              <li>
                принимает на себя обязательство оплатить лицензионное
                вознаграждение на условиях, предусмотренных настоящим
                Лицензионным договором;
              </li>
              <li>
                предоставил достоверную информацию при регистрации в Сервисе;
              </li>
              <li>
                передает Лицензиару для обработки в целях заключения и
                исполнения Лицензионного договора свои персональные данные:
                Фамилия, имя, отчество, номер телефона, адрес электронной почты
                (для Заказчика-гражданина) (п. 5 ч. 1 ст. 6 Закона о
                персональных данных);
              </li>
              <li>
                дает согласие на обработку переданных персональных данных в
                целях выполнения условий настоящего Лицензионного договора, а
                также направления ему сообщений рекламного и информационного
                характера о Сервисе, скидках, акциях, контроля удовлетворенности
                потребителей (для Лицензиата-гражданина) (п. 1 ч. 1 ст. 6 Закона
                о персональных данных). Заказчик вправе отозвать согласие,
                уведомив Лицензиара письменно по адресу его электронной почты
                info@radar-analytica.ru; Лицензиат вправе отозвать согласие,
                уведомив Лицензиара письменно по адресу его электронной почты.
              </li>
            </ul>
            <br />
            <br />
            <br />
            2.Права и обязанности Сторон. <br />
            <br />
            2.1. Права и обязанности Лицензиара:
            <br />
            2.1.1. Лицензиар вправе получать вознаграждение за предоставление
            доступа к Сервису в соответствии с условиями настоящего
            Лицензионного договора;
            <br />
            2.1.2. Лицензиар имеет право обновлять содержание Сервиса по
            собственному усмотрению. Лицензиар не несет перед Лицензиатом
            ответственности за модификацию результата. Лицензиар вправе сообщать
            Лицензиату о некоторых из произведенных модификаций.
            <br />
            2.1.3. Лицензиар, предварительно уведомив Лицензиата о необходимости
            таких действий, вправе вносить, редактировать или удалять любую
            информацию по собственному усмотрению, в том числе изменять
            количество и состав данных, которые анализируются;
            <br />
            2.1.4. Лицензиар обязуется воздержаться от каких-либо действий,
            способных затруднить осуществление Лицензиатом предоставленных ему
            возможностей пользования Сервисом.
            <br />
            2.1.5. Лицензиар обязуется предоставить Лицензиату Базовую
            техническую поддержку, ограничиваясь 2 часами в месяц.
            <br />
            2.1.6. Лицензиар не несет ответственности за несанкционированное
            использование Сервиса третьими лицами.
            <br />
            2.2. Права и обязанности Лицензиата:
            <br />
            2.2.1. Лицензиат вправе использовать Сервис на условиях и в
            пределах, предусмотренных настоящим Лицензионным договором и
            приложениями к нему;
            <br />
            2.2.2. Лицензиат обязуется не передавать третьим лицам (включая
            своих клиентов) данные, предоставленные Сервисом, если иное не
            указано в приложении, и не использовать такие данные в целях, не
            разрешенных настоящим Лицензионным договором, в том числе, образом,
            способным привести к нанесению ущерба коммерческим интересам и
            репутации Сервиса. Публичная демонстрация отчетов и других данных,
            полученных в результате использования Сервиса, в какой бы то ни было
            форме (посредством информационно- телекоммуникационных сетей,
            включая сеть “Интернет“, на общественных мероприятиях и т.д.)
            запрещена;
            <br />
            2.2.3. Лицензиат обязуется предоставить доступ к Сервису и данным
            исключительно уполномоченным сотрудникам, с которыми у Лицензиата
            имеется соглашение о неразглашении конфиденциальной информации,
            содержание которого обеспечивает во всяком случае не меньший уровень
            защиты конфиденциальной информации, чем предусмотренный настоящим
            Лицензионным договором;
            <br />
            2.2.4. Лицензиат гарантирует исполнение принятых в соответствии с
            настоящим Лицензионным договором обязательств;
            <br />
            2.2.5. Лицензиат самостоятельно несет ответственность перед третьими
            лицами за все действия, совершенные с использованием Сервиса, а
            также риск возможных неблагоприятных последствий для себя и для
            Сервиса;
            <br />
            2.2.6. Лицензиат признает и соглашается с тем, что все
            интеллектуальные права, в том числе исключительное право на Сервис,
            товарный знак, знак обслуживания и иные результаты интеллектуальной
            деятельности Лицензиара, в том числе, размещенные на Сайте,
            принадлежат Лицензиару;
            <br />
            2.2.7. Лицензиат обязуется не использовать никаких средств либо
            программ ЭВМ для вмешательства в процесс пользования Сервисом;
            <br />
            2.2.8. Лицензиат обязуется заключать со своими клиентами соглашения
            о неразглашении конфиденциальной информации, обеспечивающие степень
            защиты, по меньшей мере равную той, которая предусмотрена настоящим
            Лицензионным договором, до предоставления таким клиентам любых
            результатов использования Сервиса;
            <br />
            2.2.9. Настоящим Лицензионным договором Лицензиат подтверждает, что
            несет риск несоответствия результатов пользования Сервисом своим
            пожеланиям и потребностям;
            <br />
            2.2.10. Лицензиар не несёт ответственности за какие-либо убытки,
            возникшие вследствие ненадлежащего использования или невозможности
            использования Сервиса, возникшие по вине Лицензиата;
            <br />
            2.2.11. Лицензиат обязуется не использовать информацию, полученную в
            результате предоставления услуг, для запрещенной законодательством
            деятельности.
            <br />
            <br />
            <br />
            <br />
            3. Вознаграждение Лицензиара и порядок расчетов.
            <br />
            <br />
            3.1. Лицензионное вознаграждение за пользование Сервисом
            оплачивается в виде оплаты подписки на выбранный Лицензиатом срок
            авансовым платежом в размере 100%. Стоимость пользования Сервисом
            указана на страницах оформления подписки на сайте
            https://radar-analytica.ru и в настройках профиля (учетной записи
            Лицензиата). Информация о новых тарифах публикуется также на сайте
            radar-analytica.ru.
            <br />
            3.2. Информация о дате следующего списания стоимости подписки
            указывается в разделе «Подписка» в настройках профиля (учетной
            записи) Лицензиата на сайте radar-analytica.ru.
            <br />
            3.3. Лицензиат обязуется оплачивать Лицензиару вознаграждение в
            порядке 100% предоплаты.
            <br />
            3.4. Лицензиар вправе изменить размер и порядок оплаты по
            Лицензионному договору, предварительно уведомив об этом Лицензиата
            не менее, чем за 30 (тридцать) календарных дней.
            <br />
            3.5. Новые условия, касающиеся суммы и условий расчетов, применяются
            только к условиям Сервиса по Лицензионному договору, которые не были
            оплачены Лицензиатом на момент вступления новых условий в силу.
            <br />
            3.6. В случае досрочного отказа Лицензиата от пользования Сервисом
            возврат лицензионного вознаграждения не производится. За Лицензиатом
            сохраняется право использовать Сервис до окончания срока действия
            лицензии.
            <br />
            3.7. Способы оплаты:
            <br />
            3.7.1. Оплата Подписки осуществляется посредством банковских карт
            Visa, MasterCard, Maestro, МИР (обращаем Ваше внимание, что номер
            карты должен содержать только 16 символов);
            <br />— сообщать в уполномоченный орган по защите прав субъектов
            персональных данных по запросу этого органа необходимую информацию в
            течение 30 дней с даты получения такого запроса;
            <br />
            Лицензиат обязуется использовать только банковскую карту, владельцем
            которой он является, и в отношении которой между банком и
            Лицензиатом заключен соответствующий договор. В случае, если
            Лицензиат намеренно использует банковскую карту иного лица, то он
            самостоятельно несет ответственность за ущерб, который может быть
            причинен законному владельцу указанной карты в результате
            вышеперечисленных действий Лицензиата.
            <br />
            3.7.2. Вход в зарегистрированную учетную запись Лицензиата
            осуществляется путем его Авторизации.
            <br />
            3.7.3. В случае утери информации и/или невозможности войти в свою
            учетную запись, Лицензиат может ее возобновить, обратившись по
            электронной почте: info@radar-analytica.ru .
            <br />
            3.8. Автоматическое продление Подписки:
            <br />
            3.8.1. Оплата Подписки может осуществляться без непосредственного
            участия Лицензиата, но с его предварительного согласия (путем
            установки соответствующего флажка при оформлении подписки на сайте
            https://radar-analytica.ru) на постоянной основе посредством
            автоматического списания денежных средств с банковского счета
            Лицензиата, согласно правилам и условиям банка и/или платежной
            системы, при условии наличия денежных средств на таком счете. Данный
            пункт, в числе прочих действий Лицензиата на Сервисе, является
            согласием Лицензиата на договорное списание денежных средств его
            обслуживающим банком с его счета по окончании пробного периода при
            оформлении Подписки и/или иного периода, например, в рамках
            проведения рекламной акции посредством использования промокода.
            Списание денежных средств за Подписку происходит систематически
            ежемесячно в дату первого платежа, осуществленного Лицензиатом. В
            случае отсутствия средств на счете Лицензиата на момент
            осуществления автоматического списания, автоматическое списание
            может быть повторено до момента успешного списания средств в срок до
            60 (шестидесяти) календарных дней с момента первой попытки такого
            автоматического списания. Следующий срок Подписки равен сроку
            текущей Подписки.
            <br />
            3.8.2. Функция автопродления работает до момента ее отключения
            Лицензиатом. Отключить автопродление Подписки Лицензиат может в
            любой момент в личном кабинете.
            <br />
            3.8.3. Для осуществления проверки подлинности данных банковской
            карты, указанных Лицензиатом в целях оформления Подписки, возможно
            резервирование денежных средств, находящихся на соответствующих
            банковских счетах Лицензиата, банком-эмитентом, на сумму, не
            превышающую 60 (шестьдесят) рублей.
            <br />
            3.8.4. После успешного прохождения проверки подлинности данных
            банковской карты банкомэмитентом банковская карта Лицензиата
            считается привязанной, а функция «Автоматическое пополнение счета
            посредством банковской карты» - подключенной. Разблокировка суммы,
            зарезервированной при проверке подлинности банковской карты,
            производится в сроки, определяемые банком-эмитентом и не зависит от
            Лицензиара.
            <br />
            3.8.5. В случае утраты/замены банковской карты и при намерении
            продолжения пользования Подпиской Лицензиат обязуется указать
            реквизиты и пройти верификацию новой банковской карты. Полученное
            Сервисом на адрес электронной почты заявление Лицензиата об утрате
            банковской карты является основанием для приостановления операций по
            Автопродлению Подписки по утраченной банковской карте. После
            повторной верификации банковской карты, указанной ранее, и/или
            верификации новой банковской карты действующему Лицензиату (в том
            числе Лицензиату, которому ранее был предоставлен Пробный доступ к
            Сервису) новый пробный период не предоставляется.
            <br />
            3.8.6. Лицензиат соглашается, что если в последний день оплаченного
            срока Подписки на привязанной к профилю (учетной записи) Лицензиата
            банковской карте недостаточно денежных средств для оплаты следующего
            срока Подписки, то Сервис вправе приостановить Подписку со дня,
            следующего за последним днем оплаченного срока. Лицензиат признает и
            соглашается, что Сервис не обязан предоставлять Лицензиату Подписку
            до момента успешной оплаты следующего периода Подписки.
            <br />
            3.9. Пробный период:
            <br />
            3.9.1. Сервис вправе предоставить новым Лицензиатам тестовый доступ
            к Сервису продолжительностью 3 (три) календарных дня или 72
            (семьдесят два) часа стоимостью 10 (Десять) рублей. Пробный период
            исчисляется с даты верификации банковской карты Лицензиата в
            Сервисе, т.е. получения Сервисом подтверждения от Оператора платежей
            в соответствии с его данными. Для целей настоящего Лицензионного
            договора новым считается Лицензиат, использующий банковскую карту,
            которая ранее не использовалась в Сервисе для оплаты Подписки.
            <br />
            3.9.2. Автоматические платежи с безакцептным списанием действуют до
            момента отказа от подписки в личном кабинете Лицензиата с момента
            получения тестового доступа согласно п. 3.9.1.
            <br />
            3.9.2. Автоматические платежи с попытками безакцептного списания
            действуют до 60 (Шестидесяти) календарных дней и завершаются
            автоматически в случае отсутствия денежных средств на привязанной
            карте Лицензиата.
            <br />
            3.9.3. Сервис в рамках проведения маркетинговых мероприятий
            (рекламных акций и т.д.) вправе предоставить Лицензиату на время
            проведения таких мероприятий пробный доступ к Сервису на срок,
            отличный от срока, указанного в п. 3.9.1 настоящего Лицензионного
            договора.
            <br />
            3.10. Возврат:
            <br />
            3.10.1. Лицензиат вправе аннулировать свой аккаунт в течение 3
            (трех) календарных дней после оплаты Сервиса, если он считает
            качество работы Сервиса неудовлетворительным. Для аннулирования
            аккаунта необходимо отправить письмо на адрес:
            info@radar-analytica.ru с указанием своего логина и описанием
            ситуации. Если аннулирование произошло в указанный в настоящем
            пункте срок, Лицензиар производит полный возврат денежных средств
            Лицензиату. Возврат средств возможен только на те же реквизиты, с
            которых была произведена оплата.
            <br />
            <br />
            <br />
            <br />
            4. Гарантии и ограничения.
            <br />
            <br />
            4.1. Лицензиар обязуется приложить разумные усилия для избегания
            ошибок и недоработок при пользовании Сервисом по настоящему
            Лицензионному договору;
            <br />
            4.2. Лицензиар гарантирует Лицензиату, что обладает необходимыми
            компетенцией, образованием, знаниями и опытом работы.
            <br />
            4.3. Доступ к Сервису предоставляется «как есть». Лицензиар не
            предоставляет гарантии качества или пригодности для определенной
            цели при пользовании Сервисом. В случае если из-за обстоятельств,
            зависящих от работы маркетплейса, невозможно воспользоваться
            Сервисом, то денежные средства по настоящему соглашению возврату не
            подлежат.
            <br />
            <br />
            <br />
            <br />
            5. Ограничение Ответственности.
            <br /> <br />
            5.1. Ни в коем случае Лицензиар не несет ответственности за любые
            потери использования, потерянные данные, отказ механизмов
            безопасности, прерывание бизнеса или любые косвенные, специальные,
            случайные или косвенные убытки любого рода (включая упущенную
            выгоду), возникающие в результате или связанные с настоящим
            Лицензионным договором или использованием Лицензиатом Сервиса.
            <br />
            5.2. В соответствии с условиями настоящего Лицензионного договора
            Сервис не контролирует информацию и контент, размещенный,
            передаваемый, хранимый Лицензиатом, его работниками, клиентами и
            третьими лицами со стороны Лицензиата, полученные с помощью Сервиса
            и, следовательно, не гарантирует их точность, полноту, качество и
            Лицензиар не несет никакой ответственности за их содержание;
            <br />
            5.3. Лицензиат соглашается и признает, что Сервис может не
            контролировать, не редактировать или иным образом не проверять
            данные, полученные Лицензиатом посредством использования Сервиса.
            Данные, получаемые Лицензиатом, являются информацией, размещенной
            третьими лицами. Поскольку данные индексируются автоматически,
            Лицензиар не несет какой-либо ответственности за такие данные, их
            достоверность, полноту и актуальность.
            <br />
            <br />
            <br />
            <br />
            6. Права на интеллектуальную собственность.
            <br />
            6.1. Все исключительные права на результаты интеллектуальной
            деятельности в отношении Сайта, Сервиса, в том числе элементы
            дизайна, текст, графические изображения, иллюстрации и другие
            объекты, размещенные на Сайте, а равно составные части и их
            элементы, информацию, принадлежат исключительно Лицензиару;
            <br />
            6.2. Лицензиату предоставляется право использовать Сервис на
            условиях, определенных в настоящем Лицензионном договоре.
            <br />
            <br />
            <br />
            <br />
            7. Конфиденциальность.
            <br />
            <br />
            7.1. Стороны обязуются не разглашать конфиденциальную информацию и
            не использовать ее иначе, чем для выполнения своих соответствующих
            обязательств по настоящему Лицензионному договору. Сторона,
            получившая конфиденциальную информацию, обязуется обеспечить ей по
            меньшей мере такой же уровень защиты, как и уровень защиты ее
            собственной конфиденциальной информации;
            <br />
            7.2. Конфиденциальная информация - информация, полученная в ходе
            исполнения настоящего Лицензионного договора и содержащая, в
            частности, юридически защищенную информацию и/ или информацию,
            которая в момент ее передачи маркируется раскрывающей Стороной как
            “конфиденциальная” или “строго конфиденциальная”, с указанием
            полного наименования и адреса ее владельца, а также ключевых слов,
            наименований тем, их параметров и содержания, сформированных в
            процессе использования Сервиса.
            <br />
            7.3. Также Стороны оговорили, что к конфиденциальной информации
            относиться учетные данные, через которые производиться доступ к
            Сервису.
            <br />
            <br />
            <br />
            <br />
            8. Правовые отношения. Срок действия Лицензионного договора.
            <br /> <br />
            8.1. Срок действия настоящего Лицензионного договора является
            бессрочным. Если Лицензиат желает прекратить использование Сервиса,
            Лицензиат должен уведомить Лицензиара путем отправки электронного
            письма на почту info@radar-analytica.ru за 30 (тридцать) календарных
            дней до окончания использования Сервиса.
            <br />
            <br />
            <br />
            <br />
            9. Интерпретация.
            <br />
            <br />
            9.1. Когда возможно, положения настоящего Лицензионного договора
            интерпретируются таким образом, чтобы оставаться правомерными и
            имеющими силу по применимому закону. Если какое-либо из положений
            будет признано как не имеющее законной силы, остальные положения
            остаются в силе.
            <br />
            <br />
            <br />
            <br />
            10. Применимое право и порядок рассмотрения споров.
            <br />
            <br />
            10.1. Применение и толкование настоящего Лицензионного договора,
            включая приложения и все относящиеся к нему вопросы, регулируется
            законодательством Российской Федерации. Все споры и разногласия,
            вытекающие из настоящего Лицензионного договора и/или связанные с
            ним, Стороны будут стремиться разрешить посредством переговоров.
            <br />
            10.2. Претензионный порядок рассмотрения споров является
            обязательным. Срок рассмотрения претензии – 10 (десять) календарных
            дней с момента получения претензии. Любые иски или судебные
            разбирательства, возникающие по предмету Лицензионного договора или
            в связи с ним, рассматриваются в следующе порядке. Экономические
            споры разрешаются Арбитражным судом г. Москвы, гражданские дела
            рассматриваются по месту нахождения истца.
            <br />
            <br />
            <br />
            <br />
            11. Ответственность Сторон. Форс-мажор.
            <br />
            <br />
            11.1. За нарушение положений настоящего Лицензионного договора
            Стороны несут ответственность в соответствии с требованиями
            действующего законодательства Российской Федерации.
            <br />
            11.2. Стороны освобождаются от ответственности за полное или
            частичное неисполнение обязательств по настоящему Лицензионному
            договору вследствие наступления обстоятельств непреодолимой силы,
            непосредственно влияющих на исполнение обязательств по настоящему
            Лицензионному договору, при условии, что Сторона, ссылающаяся на
            обстоятельства непреодолимой силы, (а) незамедлительно письменно
            уведомила другую Сторону о таких обстоятельствах и (b) предприняла
            все необходимые меры для устранения последствий таких обстоятельств
            непреодолимой силы и возобновления исполнения своих обязательств по
            настоящему Договору.
            <br />
            <br />
            <br />
            <br /> 12. Прочие условия.
            <br />
            <br />
            12.1. Оператор до начала осуществления трансграничной передачи
            персональных данных обязан убедиться в том, что иностранным
            государством, на территорию которого предполагается осуществлять
            передачу персональных данных, обеспечивается надежная защита прав
            субъектов персональных данных.
            <br />
            12.2. Во всем, что не урегулировано настоящим Лицензионному
            договору, Стороны руководствуются действующим законодательством РФ.
            <br />
            <br />
            <br />
            <br />
            13. Реквизиты Лицензиара.
            <br />
            <br />
            ОГРНИП: 322237500349495
            <br />
            ИНН: 230307181320
            <br />
            Адрес: 125171, Россия, г. Москва, 5-ый Проезд Войковский, д.14
            <br />
            Реквизиты:
            <br />
            р/с 40802810400003763468
            <br />
            АО «ТБанк»
            <br />
            к/с 30101810145250000974
            <br />
            БИК банка 044525974
            <br />
            ИНН банка 7710140679
            <br />
            e-mail: info@radar-analytica.ru
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
      <FooterNewVersion />
    </div>
  );
};

export default PublicOffer;
