import styles from './blogItem.module.css'

const BlogItem = function({title, category, preview, date }){
  return (
    <div className={styles.item}>
      <div className='d-flex gap-3'>
        <div className={styles.preview}><img src={preview} alt={title} /></div>
        <div>
          <div className={styles.category}>{category}</div>
          <div className={styles.title}>{title}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-center gap-2">
        <button className={styles.btn}>Выключить</button>
        <button className={styles.btn}>Редактировать</button>
        <button className={styles.btn}>Удалить</button>
      </div>
    </div>
  )
}

export default BlogItem;