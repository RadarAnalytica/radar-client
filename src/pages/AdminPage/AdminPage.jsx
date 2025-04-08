import React, { useEffect, useState, useContext } from 'react';
import styles from './AdminPage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Button, Divider, ConfigProvider } from 'antd';
import { BlogAdd, BlogList } from '../blog';
import { fetchPosts, fetchCategories } from '../../redux/blog/blogActions';
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug';
import AuthContext from '../../service/AuthContext';


const AdminPage = () => {
    const { authToken } = useContext(AuthContext)
    const [activePage, setActivePage] = useState('articlesList')
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
            <section></section>
            <section className={styles.page__content}>

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

                {activePage === 'articlesList' && <BlogList posts={posts} />}
                {activePage === 'addArticle' && <BlogAdd categories={categories} token={authToken} />}

            </section>
        </main>
    )
}

export default AdminPage;