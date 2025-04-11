import React, { useEffect, useState, useContext } from 'react';
import styles from './AdminPage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Button, Divider, ConfigProvider } from 'antd';
import { BlogAdd, BlogList, BlogUpdate } from '../blog';
import { fetchPosts, fetchCategories } from '../../redux/blog/blogActions';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import AuthContext from '../../service/AuthContext';
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'



const AdminPage = () => {
    const { authToken } = useContext(AuthContext)
    const [activePage, setActivePage] = useState('articlesList')
    const [ postIdForUpdate, setPostIdForUpdate ] = useState()
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
                    <Header title='Админ панель' />
                </div>
                {/* !header */}
                <div className={styles.page__wrapper}>
                    <div className={styles.page__additionalMenu}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorBorder: '#00000033',
                                    colorPrimary: '#5329FF',
                                },
                                components: {
                                    Button: {
                                        primaryColor: 'white',
                                        //paddingInline: 8,
                                        paddingBlockLG: 10,
                                        paddingInlineLG: 8,
                                    }
                                }
                            }}
                        >
                            <Button
                                type='primary'
                                id='articlesList'
                                onClick={switchButtonsClickHandler}
                                disabled={activePage === 'articlesList'}
                            >
                                Список статей
                            </Button>
                            <Button
                                type='primary'
                                id='addArticle'
                                onClick={switchButtonsClickHandler}
                                disabled={activePage === 'addArticle'}
                            >
                                Добавить статью
                            </Button>
                        </ConfigProvider>
                    </div>
                    <Divider />

                    {activePage === 'articlesList' && !postIdForUpdate && <BlogList posts={posts} categories={categories} setPostIdForUpdate={setPostIdForUpdate} />}
                    {activePage === 'articlesList' && postIdForUpdate !== undefined && <BlogUpdate post={posts.find(_ => _.id === postIdForUpdate)} categories={categories} setPostIdForUpdate={setPostIdForUpdate} token={authToken} />}
                    {activePage === 'addArticle' && <BlogAdd categories={categories} token={authToken} />}
                </div>
            </section>
            {/* ---------------------- */}
        </main>

    )
}

export default AdminPage;