import React, { useEffect, useState, useContext } from 'react';
import styles from './BlogPage.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ConfigProvider, Segmented, Button } from 'antd';
import { BlogForm, BlogList, CategoryForm, CategoryList } from '../blog';
import { fetchPosts, fetchCategories } from '@/redux/blog/blogActions';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import AuthContext from '@/service/AuthContext';
import Header from '@/components/sharedComponents/header/header';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';

const BlogPage = () => {
    const { adminToken: authToken } = useContext(AuthContext);
    const [activePage, setActivePage] = useState('Список статей');
    const [contentIdForUpdate, setContentIdForUpdate] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const dispatch = useAppDispatch();
    const { categories, posts } = useAppSelector(store => store.blog);

    useEffect(() => {
        try {
            dispatch(fetchPosts(authToken));
            dispatch(fetchCategories(authToken));
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    }, [authToken]);

    return (
        <main className={styles.page}>
            <MobilePlug />

            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>

            <section className={styles.page__content}>
                <div className={styles.page__headerWrapper}>
                    <Header title='Блог' titlePrefix='Админ панель' />
                </div>

                {!isCreating && !contentIdForUpdate && 
                    <div className={styles.page__additionalMenu}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorBorder: '#00000033',
                                    colorPrimary: '#5329FF',
                                    fontSize: 14
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
                                options={['Список статей', 'Список категорий']}
                                size='large'
                                value={activePage}
                                onChange={(value) => {
                                    setActivePage(value);
                                    setContentIdForUpdate(null);
                                    setIsCreating(false);
                                }}
                            />

                            {/* Кнопка добавления контента (статья или категория) */}
                            <Button
                                className='ms-auto'
                                type='primary'
                                size='large'
                                onClick={() => {
                                    if (activePage === 'Список категорий') {
                                        setContentIdForUpdate(null);
                                        setIsCreating(true);
                                    } else {
                                        setActivePage('Список статей');
                                        setContentIdForUpdate(null);
                                        setIsCreating(true);
                                    }
                                }}
                            >
                                <span className='small'>{activePage === 'Список категорий' ? 'Добавить категорию' : 'Добавить статью'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" fill='white' viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                                </svg>
                            </Button>
                        </ConfigProvider>
                    </div>
                }

                {activePage === 'Список статей' && (
                    contentIdForUpdate
                        ? (
                            <BlogForm
                                mode="update"
                                post={posts.find(_ => _.id === contentIdForUpdate)}
                                categories={categories}
                                token={authToken}
                                onCancel={() => setContentIdForUpdate(null)}
                                onDone={() => setContentIdForUpdate(null)}
                            />
                        )
                        : isCreating
                            ? (
                                <BlogForm
                                    mode="create"
                                    categories={categories}
                                    token={authToken}
                                    onCancel={() => setIsCreating(false)}
                                    onDone={() => setIsCreating(false)}
                                />
                            )
                            : (
                                <BlogList
                                    posts={posts}
                                    categories={categories}
                                    setPostIdForUpdate={(id) => {
                                        setIsCreating(false);
                                        setContentIdForUpdate(id);
                                    }}
                                />
                            )
                )}

                {activePage === 'Список категорий' && (
                    contentIdForUpdate
                        ? (
                            <CategoryForm
                                mode="update"
                                category={categories.find(_ => _.id === contentIdForUpdate)}
                                token={authToken}
                                onCancel={() => setContentIdForUpdate(null)}
                                onDone={() => setContentIdForUpdate(null)}
                            />
                        )
                        : isCreating
                            ? (
                                <CategoryForm
                                    mode="create"
                                    token={authToken}
                                    onCancel={() => setIsCreating(false)}
                                    onDone={() => setIsCreating(false)}
                                />
                            )
                            : (
                                <CategoryList
                                    categories={categories}
                                    token={authToken}
                                    setCategoryIdForUpdate={(id) => {
                                        setIsCreating(false);
                                        setContentIdForUpdate(id);
                                    }}
                                />
                            )
                )}
            </section>
        </main>

    );
};

export default BlogPage;
