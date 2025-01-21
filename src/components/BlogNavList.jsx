import React from 'react';
import styles from './BlogNavList.module.css';

const BlogNavList = ({ blogNavElements, activeCategory, onCategoryClick }) => {
  return (
    <div className={styles.blogNavList}>
      {blogNavElements.map((item, index) => {
        const isActive = activeCategory === item.title;
        return (
          <div
            key={index}
            className={styles.blogNavItem}
            onClick={() => onCategoryClick(item.title)}
            style={{
              backgroundColor: isActive
                ? 'rgba(26, 26, 26, 0.03)'
                : 'transparent',
              cursor: 'pointer',
              minWidth: '264px',
              borderRadius: '9.6px',
            }}
          >
            <img
              src={item.icon}
              alt={item.title}
              style={{
                filter: isActive
                  ? 'invert(23%) sepia(92%) saturate(7048%) hue-rotate(251deg) brightness(101%) contrast(109%)'
                  : 'none',
              }}
            />
            <span
              className={styles.blogNavItemTitle}
              style={{
                color: isActive ? 'rgba(83, 41, 255, 1)' : 'inherit',
              }}
            >
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BlogNavList;
