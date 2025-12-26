import noSubsBg from './assets/noSubsBanner_bg.png';
import noSubsMain from './assets/noSubsBanner_main.png';
import onboardingBg from './assets/onboardingBanner_bg.png';
import onboardingMain from './assets/onboardingBanner_main.png'
import regUser1Bg from './assets/regUser1_bg.png'
import regUser2Bg from './assets/regUser2_bg.png'
import regUser3Bg from './assets/regUser3_bg.png'
import regUser1Main from './assets/regUser1_main.png'
import regUser2Main from './assets/regUser2_main.png'
import regUser3Main from './assets/regUser3_main.png'


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
        leadBlockButtonAction: () => console.log('action'),
        background: noSubsBg,
        mainImage: ['nosub_main-400w', 'nosub_main-800w', 'nosub_main-1200w']
    }
]

export const onboardingBanners = [
    {
        cardKey: 'onboardingBanner1',
        title: 'Ваш тестовый доступ активирован! Теперь вам доступны все разделы сервиса «Радар-Аналитика',
        subtitle: 'Один из ключевых модулей — «Мои финансы». В нём доступно более 5 видов отчётов и детализаций, а также свыше 60 бизнес-метрик для анализа вашего бизнеса.',
        hasBackBullet: false,
        leadBlockTitle: 'Подключите API-ключ, чтобы мы смогли загрузить и оцифровать ваши данные.',
        leadBlockSubtitle: 'Это займёт всего несколько минут и мы выдадим вам все инструкции.',
        leadBlockButtonText: 'Подключить API',
        leadBlockButtonType: 'link',
        leadBlockButtonLink: '/onboarding',
        hasLeadBlock: true,
        background: onboardingBg,
        mainImage: ['onboard_main-400w', 'onboard_main-800w', 'onboard_main-1200w']
    }
]

export const regularUserBanners = [
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
    },
]