import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../service/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminSideNav from '../../../components/AdminSideNav';
import TopNav from '../../../components/TopNav';
import BlogItem from '../components/blogItem/BlogItem';

const BlogList = () => {
  const { user, authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const test = [
    {title: 'title', category: 'category', preview: 'https://basket-12.wbbasket.ru/vol1794/part179405/179405722/images/c246x328/1.webp', date:'01.01.2021', file:'file'},
    {title: 'title', category: 'category', preview: 'https://basket-12.wbbasket.ru/vol1794/part179405/179405722/images/c246x328/1.webp', date:'01.01.2021', file:'file'},
    {title: 'title', category: 'category', preview: 'https://basket-12.wbbasket.ru/vol1794/part179405/179405722/images/c246x328/1.webp', date:'01.01.2021', file:'file'},
  ]
  
  const [list, setList] = useState(test);

  

  // const [unreadMessageCounts, setUnreadMessageCounts] = useState({});

  // const getArticleList = async (authToken) => {
    // try {
      // setTimeout( () => {
      // }, 1000)
      // <BlogItem title={'title'} category={'category'} preview={'https://basket-12.wbbasket.ru/vol1794/part179405/179405722/images/c246x328/1.webp'} date={'01.01.2021'} file ={'file'} />
    // } catch (error) {
      // console.error('Error fetching messages:', error);
    // }
  // };

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const itemList = list.map( (el, i) => <BlogItem key={i} title={el.title} category={el.category} preview={el.preview} date={el.date}/>)

  return (
    <div className='d-flex' >
      <AdminSideNav />
      <div className='col'>
        <TopNav title={'Блог cписок'} />
        <div className='container dash-container'>
          {itemList}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
