import React from 'react';
import styles from './BlogList.module.css'
import BlogItem from '../components/blogItem/BlogItem';

const BlogList = ({ posts, categories, setPostIdForUpdate }) => {

  return (
    <div className={styles.page} >
          {posts.map( (el, i) => {
            const category = categories.find(_ => _.id === el.category_id)
            return <BlogItem 
                      key={i} 
                      title={el.title} 
                      category={category} 
                      preview={el.preview} 
                      date={el.date} 
                      description={el.description} 
                      is_published={el.is_published}
                      allData={el}
                      setPostIdForUpdate={setPostIdForUpdate}
                      {...el}
                    />
          })}
    </div>
  );
};

export default BlogList;
