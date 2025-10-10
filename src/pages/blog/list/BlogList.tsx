import React from 'react';
import styles from './BlogList.module.css';
import BlogItem from '../components/blogItem/BlogItem';

interface BlogListProps {
  posts: any[];
  categories: any[];
  setPostIdForUpdate: (id: string) => void;
}

const BlogList = ({ posts, categories, setPostIdForUpdate }: BlogListProps) => {
  return (
    <div className={styles.page} >
      {posts.map( (el, i) => {
        const category = categories.find(_ => _.id === el.category_id);
        return (
          <BlogItem
            key={i}
            title={el.title}
            category={category}
            preview={el.image_url}
            date={el.date}
            description={el.description}
            is_published={el.is_published}
            is_recommended={el.is_recommended}
            is_popular={el.is_popular}
            slug={el.slug}
            allData={el}
            setPostIdForUpdate={setPostIdForUpdate}
            {...el}
          />
        )
      })}
    </div>
  );
};

export default BlogList;
