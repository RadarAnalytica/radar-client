import noSubsBg from './assets/noSubsBanner_bg.png';
import onboardingBg from './assets/onboardingBanner_bg.png';
import regUser1Bg from './assets/regUser1_bg.png'
import regUser2Bg from './assets/regUser2_bg.png'
import regUser3Bg from './assets/regUser3_bg.png'
import regUser4Bg from './assets/regUser4_bg.png'
import regUser5Bg from './assets/regUser5_bg.png'


export const noSubBanners = [
    {
        cardKey: 'noSubBanner1',
        title: 'Добро пожаловать в «Радар-Аналитику» и спасибо за регистрацию!',
        subtitle: 'Вы находитесь на главной странице сервиса — здесь публикуются новости, видеообзоры и важная информация.',
        hasBackBullet: true,
        leadBlockTitle: 'Сейчас в сервисе отображаются демо-данные, демонстрирующие его возможности. ',
        leadBlockSubtitle: 'Для полноценного тестирования активируйте пробный период на 3 дня — вы получите полный доступ без ограничений.',
        leadBlockButtonText: 'Активировать тестовый период',
        leadBlockButtonType: 'button',
        hasLeadBlock: true,
        leadBlockButtonAction: () => {},
        background: noSubsBg,
        mainImage: ['nosub_main-400w', 'nosub_main-800w', 'nosub_main-1200w'],
        imageOverflow: false,
        backgroundGradient: 'linear-gradient(76.56deg, #D8CFFC 8.09%, #FEF0E7 89.79%)'

    }
]

export const onboardingBanners = [
    {
        cardKey: 'onboardingBanner1',
        title: 'Ваш тестовый доступ активирован! Теперь вам доступны все разделы сервиса «Радар-Аналитика»',
        subtitle: 'Один из ключевых модулей — «Мои финансы». В нём доступно более 5 видов отчётов и детализаций, а также свыше 60 бизнес-метрик для анализа вашего бизнеса.',
        hasBackBullet: false,
        leadBlockTitle: 'Подключите API-ключ, чтобы мы смогли загрузить и оцифровать ваши данные.',
        leadBlockSubtitle: 'Это займёт всего несколько минут и мы выдадим вам все инструкции.',
        leadBlockButtonText: 'Подключить API',
        leadBlockButtonType: 'link',
        leadBlockButtonLink: '/onboarding',
        hasLeadBlock: true,
        background: onboardingBg,
        mainImage: ['onboard_main-400w', 'onboard_main-800w', 'onboard_main-1200w'],
        imageOverflow: false,
        backgroundGradient: 'linear-gradient(299.24deg, #D8CFFC 18.67%, #FEF0E7 66.13%)'

    }
]

export const regularUserBanners = [
    {
        cardKey: 'regUserBanner4',
        title: 'Полная картина бизнеса по\u00A0неделям, чтобы видеть динамику, а\u00A0не\u00A0отдельные цифры',
        subtitle: 'Отчёт по\u00A0неделям помогает понять, как\u00A0реально работает бизнес на\u00A0Wildberries.',
        altSubtitle: 'Здесь собраны 37 метрик, среди которых:',
        hasBackBullet: false,
        leadBlockTitle: 'Доступен в разделе: «Мои финансы» → «Отчёт по неделям»',
        leadBlockButtonText: 'Перейти к отчету',
        leadBlockButtonType: 'link',
        leadBlockButtonLink: '/report-week',
        hasLeadBlock: true,
        background: regUser4Bg,
        mainImage: ['week_main-400w', 'week_main-800w', 'week_main-1200w'],
        // plainText: ' — всё, что влияет на итоговый результат.',
        headerButtons: ['Продажи', 'Выручка', 'Комиссии', 'Логистика', 'Возвраты', 'Реклама', 'ДРР', '— всё, что влияет на итоговый результат.'],
        noBgforThelastHeaderButton: true,
        smallTitle: true,
        bottomAttentionText: 'Так проще находить точки роста, замечать проблемы на\u00A0раннем этапе и\u00A0принимать решения на\u00A0основе данных.',
        backgroundGradient: 'linear-gradient(299.24deg, #D8CFFC 18.67%, #FEF0E7 66.13%)',
    },
    {
        cardKey: 'regUserBanner5',
        title: 'ABC-анализ: фокус на\u00A0том, что\u00A0реально влияет на\u00A0выручку и\u00A0прибыль',
        altSubtitle: 'ABC-анализ помогает быстро оценить вклад каждого товара в\u00A0общий результат. Вы\u00A0видите:',
        hasBackBullet: false,
        leadBlockTitle: 'Найти инструмент можно в разделе: «Мои товары» → «ABC-анализ».',
        leadBlockButtonText: 'Перейти к анализу',
        leadBlockButtonType: 'link',
        leadBlockButtonLink: '/abc-data',
        hasLeadBlock: true,
        background: regUser5Bg,
        mainImage: ['abc_main-400w', 'abc_main-800w', 'abc_main-1200w'],
        headerButtons: [
            <span>Какие позиции формируют основную выручку <span style={{color: '#00B69B'}}>(группа A)</span></span>, 
            <span>Какие поддерживают оборот <span style={{color: '#F0AD00'}}>(B)</span></span>, 
            <span>А какие не дают ощутимого эффекта <span style={{color: '#F93C65'}}>(C)</span></span>, 
            '— с учётом выручки, маржинальности и ROI.'
        ],
        noBgforThelastHeaderButton: true,
        smallTitle: true,
        bottomAttentionText: 'Так проще расставлять приоритеты в ассортименте, рекламе и закупках.',
        backgroundGradient: 'linear-gradient(111.39deg, #D8CFFC 15.88%, #FEF0E7 69.04%)',
    },
    {
        cardKey: 'regUserBanner1',
        title: 'Ознакомьтесь с нашим отчетом РНП — «Рука\u00A0на\u00A0пульсе»',
        subtitle: 'Это 40+ ключевых метрик для ежедневного контроля ваших данных и оперативного анализа показателей:',
        hasBackBullet: false,
        leadBlockTitle: 'Найти отчет очень просто: раздел «Мои финансы» → «Рука на пульсе (РНП)».',
        leadBlockSubtitle: 'Желаем удобной работы и успешного использования отчета!',
        leadBlockButtonText: 'Перейти в раздел',
        leadBlockButtonType: 'link',
        leadBlockButtonLink: '/rnp',
        hasLeadBlock: true,
        background: regUser1Bg,
        mainImage: ['rnp_main-400w', 'rnp_main-800w', 'rnp_main-1200w'],
        plainText: 'и многое другое, что помогает принимать взвешенные управленческие решения.',
        headerButtons: ['Прогноз маржинальности', 'Плановый процент выкупа', 'ДРР по продажам и заказам', 'Рекламные показатели'],
        smallTitle: true,
        backgroundGradient: 'linear-gradient(111.39deg, #D8CFFC 15.88%, #FEF0E7 69.04%)',


    },
    {
        cardKey: 'regUserBanner2',
        title: 'Хотите держать под\u00A0контролем все\u00A0рекламные показатели и\u00A0управлять ими максимально эффективно?',
        altSubtitle: 'В разделе «Моя реклама» → «Статистика» вы получите подробную аналитику по всем рекламным кампаниям, которая поможет:',
        hasBackBullet: false,
        leadBlockTitle: 'Найти раздел очень просто: «Моя реклама» → «Статистика».',
        leadBlockSubtitle: 'Желаем успешной работы и высоких результатов!',
        leadBlockButtonText: 'Перейти в раздел',
        leadBlockButtonType: 'link',
        leadBlockButtonLink: '/my-adv',
        hasLeadBlock: true,
        background: regUser2Bg,
        mainImage: ['stat_main-400w', 'stat_main-800w', 'stat_main-1200w'],
        headerButtons: ['Глубже понять их результативность', 'Отследить динамику показателей', 'Оценить реальное влияние рекламы на ваши продажи и бизнес в целом'],
        attentionText: 'В сервисе Радар-Аналитика есть всё необходимое для этого.',
        smallTitle: true,
        backgroundGradient: 'linear-gradient(238.39deg, #D8CFFC 29.29%, #FEF0E7 81.96%)'

    },
    {
        cardKey: 'regUserBanner3',
        title: 'Выдача на\u00A0Wildberries сегодня формируется не\u00A0только за\u00A0счёт рекламы, но\u00A0и\u00A0за\u00A0счёт органического поиска',
        hasBackBullet: false,
        leadBlockTitle: 'Обязательно протестируйте наши инструменты — найти их очень просто: раздел «SEO» → вкладка «Трекинг позиций».',
        leadBlockButtonText: 'Перейти в раздел',
        leadBlockButtonType: 'link',
        leadBlockButtonLink: '/position-tracking',
        hasLeadBlock: true,
        background: regUser3Bg,
        mainImage: ['track_main-400w', 'track_main-800w', 'track_main-1200w'],
        attentionText: 'Поэтому работа с SEO становится важным элементом продвижения.',
        hasSeoPlate: true,
        smallTitle: true,
        backgroundGradient: 'linear-gradient(102.51deg, #D8CFFC 0.42%, #FEF0E7 72.52%)'

    },
]