import React, { useEffect, useState, useContext } from 'react';
import styles from './BlogPage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Button, Divider, ConfigProvider, Segmented } from 'antd';
import { BlogAdd, BlogList, BlogUpdate } from '../blog';
import { fetchPosts, fetchCategories } from '../../redux/blog/blogActions';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import AuthContext from '../../service/AuthContext';
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'



const BlogPage = () => {
    const { authToken } = useContext(AuthContext)
    const [activePage, setActivePage] = useState('Список статей')
    const [postIdForUpdate, setPostIdForUpdate] = useState()
    const dispatch = useAppDispatch()
    const { categories, posts } = useAppSelector(store => store.blog);

    const switchButtonsClickHandler = (e) => {
        setActivePage(e.currentTarget.id)
    }

    useEffect(() => {
        try {
            dispatch(fetchPosts(authToken));
            dispatch(fetchCategories(authToken));
        } catch (error) {
            console.error("Error fetching initial data:", error);
        } finally {
        }
    }, [authToken])

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header title='Блог' titlePrefix='Админ панель' />
                </div>
                {/* !header */}
                <div className={styles.page__additionalMenu}>
                    <ConfigProvider
                        theme={{
                            token: {
                                fontSize: '18px',
                                fontFamily: 'Mulish'
                            },
                            components: {
                                Segmented: {
                                    itemActiveBg: '#E7E1FE',
                                    itemSelectedBg: '#E7E1FE',
                                    trackBg: 'transparent',
                                    itemColor: '#1A1A1A80',
                                    itemHoverBg: 'transparent',
                                    itemHoverColor: '#1A1A1A',
                                    itemSelectedColor: '#1A1A1A',
                                    trackPadding: 0
                                }
                            }
                        }}
                    >
                        <Segmented
                            options={['Список статей', 'Добавить статью']}
                            size='large'
                            value={activePage}
                            onChange={(value) => setActivePage(value)}
                        />
                    </ConfigProvider>
                </div>

                {activePage === 'Список статей' && !postIdForUpdate && <BlogList posts={posts} categories={categories} setPostIdForUpdate={setPostIdForUpdate} />}
                {activePage === 'Список статей' && postIdForUpdate !== undefined && <BlogUpdate post={posts.find(_ => _.id === postIdForUpdate)} categories={categories} setPostIdForUpdate={setPostIdForUpdate} token={authToken} />}
                {activePage === 'Добавить статью' && <BlogAdd categories={categories} token={authToken} setActivePage={setActivePage} />}
            </section>
            {/* ---------------------- */}
        </main>

    )
}

export default BlogPage;