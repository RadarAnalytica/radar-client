import img1 from './inTheses1.png';
import img2 from './inTheses2.png';
import img3 from './inTheses3.png';
import img4 from './inTheses4.png';
import img01 from './onTheses1.png';
import img02 from './onTheses2.png';
import img03 from './onTheses3.png';
import img04 from './onTheses4.png';

const inTheses = [
  {
    img: <img src={img1} alt='Block Main Page' className='imgTheses' />,
    txt: 'Следите за всеми показателями ваших магазинов в одном удобном дашборде',
  },
  {
    img: <img src={img2} alt='Block Main Page' className='imgTheses' />,
    txt: 'Автоматическое формирование поставок товара на основе вашей статистики продаж',
  },
  {
    img: <img src={img3} alt='Block Main Page' className='imgTheses' />,
    txt: 'Определяйте точки роста с помощью финансовых метрик',
  },
  {
    img: <img src={img4} alt='Block Main Page' className='imgTheses' />,
    txt: 'Анализируйте географию заказов и избавляйтесь от нелеквидного товара',
  },
];

const onTheses = [
  {
    img: <img src={img01} alt='Block Main Page' className='imgTheses' />,
    txt: 'Смотрите за стратегией конкурентов',
  },
  {
    img: <img src={img02} alt='Block Main Page' className='imgTheses' />,
    txt: 'Анализируйте ценовую политику',
  },
  {
    img: <img src={img03} alt='Block Main Page' className='imgTheses' />,
    txt: 'Выводите свой товар в ТОП',
  },
  {
    img: <img src={img04} alt='Block Main Page' className='imgTheses' />,
    txt: 'Смотрите за трендами и сезонными товарами',
  },
];

export default { inTheses, onTheses };
