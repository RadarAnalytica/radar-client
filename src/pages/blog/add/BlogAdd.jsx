import React, { useContext, useEffect, useState, useRef } from 'react';
import AuthContext from '../../../service/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminSideNav from '../../../components/AdminSideNav';
import TopNav from '../../../components/TopNav';
import UserDataTable from '../../../components/UserDataTable';

import styles from './BlogAdd.module.css';
import BlogForm from '../components/blogForm/BlogForm';

const BlogAdd = () => {
  const { user, authToken } = useContext(AuthContext);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className='d-flex' >
      <AdminSideNav />
      <div className='col'>
        <TopNav title={'Блог добавить'} />
        <div className='container dash-container'>
          <BlogForm />
        </div>
      </div>
    </div>
  );
};

export default BlogAdd;
