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
        mainImage: noSubsMain
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
        mainImage: onboardingMain
    }
]

export const regularUserBanners = [
    {
        cardKey: 'regUserBanner1',
        title: 'Ознакомьтесь с нашим отчетом РНП — «Рука на пульсе»',
        subtitle: 'Это 40+ ключевых метрик для ежедневного контроля ваших данных и оперативного анализа показателей:',
        hasBackBullet: false,
        leadBlockTitle: 'Найти отчет очень просто: раздел «Мои финансы» → «Рука на пульсе (РНП)».',
        leadBlockSubtitle: 'Желаем удобной работы и успешного использования отчета!',
        leadBlockButtonText: 'Перейти в раздел',
        leadBlockButtonType: 'link',
        leadBlockButtonLink: '/rnp',
        hasLeadBlock: true,
        background: regUser1Bg,
        mainImage: regUser1Main,
        plainText: 'и многое другое, что помогает принимать взвешенные управленческие решения.',
        headerButtons: ['Прогноз маржинальности', 'Плановый процент выкупа', 'ДРР по продажам и заказам', 'Рекламные показатели']
    },
    {
        cardKey: 'regUserBanner2',
        title: 'Хотите держать под контролем все рекламные показатели и управлять ими максимально эффективно?',
        plainText: 'В разделе «Моя реклама» → «Статистика» вы получите подробную аналитику по всем рекламным кампаниям, которая поможет:',
        hasBackBullet: false,
        leadBlockTitle: 'Найти раздел очень просто: «Моя реклама» → «Статистика».',
        leadBlockSubtitle: 'Желаем успешной работы и высоких результатов!',
        leadBlockButtonText: 'Перейти в раздел',
        leadBlockButtonType: 'link',
        leadBlockButtonLink: '/my-adv',
        hasLeadBlock: true,
        background: regUser2Bg,
        mainImage: regUser2Main,
        headerButtons: ['Глубже понять их результативность', 'Отследить динамику показателей', 'Оценить реальное влияние рекламы на ваши продажи и бизнес в целом'],
        attentionText: 'В сервисе Радар-Аналитика есть всё необходимое для этого.'
    },
    {
        cardKey: 'regUserBanner3',
        title: 'Выдача на Wildberries сегодня формируется не только за счёт рекламы, но и за счёт органического поиска',
        hasBackBullet: false,
        leadBlockTitle: 'Обязательно протестируйте наши инструменты — найти их очень просто: раздел «SEO» → вкладка «Трекинг позиций».',
        leadBlockButtonText: 'Перейти в раздел',
        leadBlockButtonType: 'link',
        leadBlockButtonLink: '/position-tracking',
        hasLeadBlock: true,
        background: regUser3Bg,
        mainImage: regUser3Main,
        attentionText: 'Поэтому работа с SEO становится важным элементом продвижения.',
        hasSeoPlate: true
    },
]