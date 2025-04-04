import React from 'react';
import styles from './BlogList.module.css'
import BlogItem from '../components/blogItem/BlogItem';

const BlogList = ({ posts }) => {
  console.log(posts)
  return (
    <div className={styles.page} >
          {posts.map( (el, i) => <BlogItem key={i} title={el.title} category={el.category} preview={el.preview} date={el.date}/>)}
    </div>
  );
};

export default BlogList;
