import React, { useState, useRef } from 'react';
import styles from './usersWidget.module.css';
import { Modal, Input, Select, ConfigProvider, MenuProps, Dropdown } from 'antd';
import { Table as RadarTable } from 'radar-ui'

const inputTheme = {
    token: {
        colorBgContainer: 'white',
        colorBorder: '#5329FF1A',
        borderRadius: 8,
        fontFamily: 'Manrope',
        fontSize: 12,
        fontWeight: 500,
        controlHeightLG: 38,
    },
    components: {
        Input: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            activeOutlineColor: 'transparent',
            hoverBg: 'white',
            activeShadow: 'transparent',
            activeBg: 'white',
        },
        Select: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            activeOutlineColor: 'transparent',
        }
    }
}

const tableConfig = [
    {
        key: 'name',
        dataIndex: 'name',
        title: 'Имя'
    },
    {
        key: 'email',
        dataIndex: 'email',
        title: 'Почта'
    },
    {
        key: 'role',
        dataIndex: 'role',
        title: 'Роль'
    },
    {
        key: 'created_at',
        dataIndex: 'created_at',
        title: 'Дата добавления'
    },
    {
        key: 'status',
        dataIndex: 'status',
        title: 'Статус'
    },
    {
        key: 'actions',
        dataIndex: 'actions',
        title: 'Действия'
    },
]

const customCellRender = (value, record, index, dataIndex): React.ReactNode => {

    const menuItems: MenuProps['items'] = [
        {
            key: 'edit',
            label: (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 0'
                }}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 1.03553L0.292893 11.2426C0.105357 11.4302 0 11.6845 0 11.9497V15.5355C0 16.0878 0.447715 16.5355 1 16.5355H4.58579C4.851 16.5355 5.10536 16.4302 5.29289 16.2426L15.5 6.03554C16.8807 4.65482 16.8807 2.41625 15.5 1.03553C14.1193 -0.345179 11.8807 -0.345178 10.5 1.03553Z" fill="#363538" />
                        <path d="M9 14.7855C8.58579 14.7855 8.25 15.1213 8.25 15.5355C8.25 15.9497 8.58579 16.2855 9 16.2855H16C16.4142 16.2855 16.75 15.9497 16.75 15.5355C16.75 15.1213 16.4142 14.7855 16 14.7855H9Z" fill="#363538" />
                    </svg>

                    <span style={{ fontSize: '14px', fontWeight: 500 }}>Редактировать</span>
                </div>
            ),
            // onClick: handleOpenEditModal
        },
        {
            key: 'changePassword',
            label: (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 0'
                }}>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.147 15.8803L2.78958 7.65963C2.76716 7.14406 3.14051 6.69686 3.65289 6.63527C4.88096 6.48765 7.11233 6.25 8.75003 6.25C10.3703 6.25 12.5716 6.48261 13.8076 6.63052C14.3365 6.69382 14.7138 7.16658 14.6677 7.69731L13.9448 16.0099C13.81 17.5602 12.5122 18.75 10.9561 18.75H6.14417C4.53799 18.75 3.21677 17.485 3.147 15.8803ZM5.00003 15.75C5.00003 15.3358 5.33582 15 5.75003 15H11.75C12.1642 15 12.5 15.3358 12.5 15.75C12.5 16.1642 12.1642 16.5 11.75 16.5H5.75003C5.33582 16.5 5.00003 16.1642 5.00003 15.75Z" fill="#F93C65" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.46407 3.25646C3.52291 3.23224 3.58583 3.21517 3.65189 3.20645L3.67993 3.20275C4.33109 3.1168 4.88569 2.68723 5.13175 2.07825C5.63922 0.822252 6.85827 0 8.21292 0H9.56011C10.9329 0 12.1684 0.833292 12.6826 2.10615L12.7731 2.32999C12.9609 2.7949 13.3774 3.12837 13.8721 3.21001C13.9296 3.21948 13.9844 3.23524 14.036 3.25646C14.8225 3.3179 15.5126 3.37899 16.0095 3.42508C16.2637 3.44865 16.4675 3.46831 16.608 3.4821L16.7696 3.49815L16.8267 3.50392C17.2387 3.54623 17.5384 3.91456 17.4961 4.3266C17.4538 4.73865 17.0848 5.03831 16.6727 4.99601L16.6196 4.99062L16.4614 4.97493C16.3233 4.96137 16.1222 4.94197 15.871 4.91867C15.3684 4.87206 14.6656 4.80989 13.8658 4.74775C12.2607 4.62302 10.2847 4.5 8.75004 4.5C7.21542 4.5 5.23942 4.62302 3.63429 4.74775C2.83446 4.80989 2.13174 4.87206 1.62911 4.91867C1.37785 4.94197 1.17674 4.96137 1.03868 4.97493L0.880513 4.99062L0.82665 4.99608C0.414603 5.03838 0.0462755 4.73865 0.00396827 4.3266C-0.0383389 3.91456 0.262475 3.54612 0.674522 3.50381L0.730486 3.49815L0.892131 3.4821C1.03261 3.46831 1.2364 3.44865 1.49059 3.42508C1.98751 3.379 2.67759 3.3179 3.46407 3.25646ZM8.21292 1.5C7.46973 1.5 6.80093 1.95111 6.52252 2.64018C6.46208 2.78976 6.39142 2.93341 6.3115 3.07039C7.16078 3.02787 8.00243 3 8.75004 3C9.57974 3 10.5252 3.03433 11.4685 3.0849C11.4376 3.02191 11.4088 2.95755 11.3823 2.89191L11.2919 2.66808C11.0067 1.96214 10.3215 1.5 9.56011 1.5H8.21292Z" fill="#F93C65" />
                    </svg>


                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#F93C65' }}>Изменить пароль</span>
                </div>
            ),
            // onClick: handleOpenChangePasswordModal
        }
    ];
    return (
        <div className={styles.actionCell}>
            <Dropdown
                menu={{ items: menuItems }}
                trigger={['click']}
                placement="bottomRight"
            >
                <button className={styles.widget__settingsButton}>
                    <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="1.5" cy="1.5" r="1.5" fill="#8C8C8C" />
                        <circle cx="1.5" cy="7.5" r="1.5" fill="#8C8C8C" />
                        <circle cx="1.5" cy="13.5" r="1.5" fill="#8C8C8C" />
                    </svg>
                </button>
            </Dropdown>
        </div>
    )
}

export const UsersWidget = () => {

    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [users, setUsers] = useState<null | any[]>(null)
    const [newUserData, setNewUserData] = useState({
        name: '',
        email: '',
        role: ''
    })
    const tableContainerRef = useRef(null)

    const handleOpenAddModal = () => {
        setIsAddModalVisible(true)
    }

    const handleCloseAddModal = () => {
        setIsAddModalVisible(false)
        // Сброс формы
        setNewUserData({
            name: '',
            email: '',
            role: ''
        })
    }

    const handleInputChange = (field: string, value: string) => {
        setNewUserData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleAddUser = async () => {
        try {
            // Здесь будет API запрос для добавления пользователя
            // const response = await fetchApi('/api/user/add', {
            //     method: "POST",
            //     headers: {
            //         "content-type": "application/json",
            //         authorization: "JWT " + authToken,
            //     },
            //     body: JSON.stringify(newUserData)
            // });

            console.log('Добавление пользователя:', newUserData)
            setIsAddModalVisible(false)
            setNewUserData({
                name: '',
                email: '',
                role: ''
            })
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error)
        }
    }

    return (
        <>
            {(!users || users?.length === 0) &&
                <div className={styles.addUser}>
                    <div className={styles.addUser__block}>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="60" height="60" rx="10" fill="#5329FF" fillOpacity="0.15" />
                            <path d="M30.5004 30C33.8141 30 36.5004 27.3137 36.5004 24C36.5004 20.6863 33.8141 18 30.5004 18C27.1867 18 24.5004 20.6863 24.5004 24C24.5004 27.3137 27.1867 30 30.5004 30Z" fill="#5329FF" />
                            <path d="M30.5004 42C35.8023 42 40.1004 39.5823 40.1004 36.6C40.1004 33.6177 35.8023 31.2 30.5004 31.2C25.1985 31.2 20.9004 33.6177 20.9004 36.6C20.9004 39.5823 25.1985 42 30.5004 42Z" fill="#5329FF" />
                            <path d="M39.1671 24.0001C39.1671 23.4128 38.9772 22.8698 38.6555 22.4292C38.3594 22.0237 37.9516 21.7049 37.4774 21.5181L37.4435 21.5044C37.3832 21.4793 37.3236 21.4511 37.2655 21.4199C37.2043 21.387 37.1447 21.3507 37.0875 21.3114C36.7508 21.0794 36.5004 20.7395 36.5004 20.3334C36.5004 19.7812 36.9534 19.3223 37.4931 19.4393C39.0915 19.7855 40.3847 20.9506 40.9116 22.4734C41.0772 22.9518 41.1671 23.4654 41.1671 24.0001C41.1671 24.5348 41.0772 25.0485 40.9116 25.5268C40.3847 27.0496 39.0915 28.2147 37.4931 28.561C36.9534 28.6779 36.5004 28.2191 36.5004 27.6668C36.5004 27.2607 36.7508 26.9208 37.0875 26.6888C37.1447 26.6495 37.2043 26.6132 37.2655 26.5803C37.3236 26.5491 37.3832 26.5209 37.4436 26.4958L37.4774 26.4821C37.9516 26.2953 38.3594 25.9765 38.6555 25.571C38.9772 25.1304 39.1671 24.5874 39.1671 24.0001Z" fill="#5329FF" />
                            <path d="M41.8337 36.0001C41.8337 36.1164 41.7727 36.3791 41.4665 36.7165C41.3537 36.841 41.2075 36.9755 41.0187 37.1166C40.9841 37.1424 40.9508 37.1698 40.9187 37.1984C40.886 37.2278 40.8547 37.2585 40.825 37.2906C40.6267 37.5048 40.5004 37.7771 40.5004 38.0721C40.5004 38.8351 41.2834 39.3506 41.9179 38.9268C42.0205 38.8583 42.1195 38.7882 42.2148 38.7167L42.2531 38.6877C42.5406 38.4683 42.7939 38.235 43.0087 37.9899C43.5378 37.3864 43.8337 36.7118 43.8337 36.0001C43.8337 35.2884 43.5378 34.6139 43.0087 34.0103C42.7939 33.7653 42.5406 33.5319 42.2531 33.3126L42.2148 33.2836C42.1195 33.212 42.0205 33.1419 41.9179 33.0734C41.2834 32.6496 40.5004 33.1652 40.5004 33.9281C40.5004 34.2232 40.6267 34.4955 40.825 34.7097C40.8547 34.7417 40.886 34.7725 40.9187 34.8018C40.9508 34.8305 40.9841 34.8578 41.0187 34.8837C41.2075 35.0247 41.3537 35.1593 41.4665 35.2837C41.7727 35.6211 41.8337 35.8839 41.8337 36.0001Z" fill="#5329FF" />
                            <path d="M21.8337 23.9998C21.8337 23.4124 22.0235 22.8695 22.3453 22.4289C22.6414 22.0234 23.0491 21.7046 23.5233 21.5178L23.5572 21.5041C23.6176 21.479 23.6771 21.4508 23.7352 21.4196C23.7965 21.3866 23.8561 21.3504 23.9132 21.3111C24.25 21.0791 24.5003 20.7392 24.5003 20.3331C24.5003 19.7808 24.0474 19.322 23.5076 19.4389C21.9093 19.7852 20.6161 20.9503 20.0891 22.4731C19.9236 22.9514 19.8337 23.4651 19.8337 23.9998C19.8337 24.5345 19.9236 25.0481 20.0891 25.5265C20.6161 27.0493 21.9093 28.2144 23.5076 28.5606C24.0474 28.6776 24.5003 28.2187 24.5003 27.6664C24.5003 27.2604 24.25 26.9205 23.9132 26.6885C23.8561 26.6492 23.7965 26.6129 23.7352 26.58C23.6771 26.5488 23.6176 26.5206 23.5572 26.4955L23.5233 26.4818C23.0491 26.295 22.6414 25.9762 22.3453 25.5707C22.0235 25.1301 21.8337 24.5871 21.8337 23.9998Z" fill="#5329FF" />
                            <path d="M19.167 35.9998C19.167 36.116 19.2281 36.3788 19.5342 36.7162C19.6471 36.8406 19.7933 36.9752 19.982 37.1163C20.0166 37.1421 20.05 37.1694 20.082 37.1981C20.1147 37.2274 20.146 37.2582 20.1757 37.2903C20.3741 37.5044 20.5003 37.7767 20.5003 38.0718C20.5003 38.8348 19.7173 39.3503 19.0828 38.9265C18.9803 38.858 18.8813 38.7879 18.7859 38.7163L18.7476 38.6874C18.4601 38.468 18.2069 38.2346 17.992 37.9896C17.4629 37.386 17.167 36.7115 17.167 35.9998C17.167 35.2881 17.4629 34.6135 17.9921 34.01C18.2069 33.7649 18.4601 33.5316 18.7476 33.3122L18.7859 33.2833C18.8813 33.2117 18.9803 33.1416 19.0828 33.0731C19.7173 32.6493 20.5003 33.1648 20.5003 33.9278C20.5003 34.2228 20.3741 34.4952 20.1757 34.7093C20.146 34.7414 20.1147 34.7721 20.082 34.8015C20.05 34.8302 20.0166 34.8575 19.982 34.8833C19.7933 35.0244 19.6471 35.159 19.5342 35.2834C19.2281 35.6208 19.167 35.8836 19.167 35.9998Z" fill="#5329FF" />
                        </svg>

                        <div className={styles.addUser__titleWrapper}>
                            <h3 className={styles.addUser__title}>Здесь пока нет ни одного пользователя</h3>
                            <p className={styles.addUser__subtitle}>Добавьте пользователей в свой аккаунт</p>
                        </div>

                        <button
                            className={styles.addUser__addButton}
                            onClick={handleOpenAddModal}
                        >
                            Добавить
                        </button>
                    </div>
                </div>
            }

            {users && users?.length > 0 &&
                <>
                    <div className={styles.page__titleWrapper}>
                        <h2 className={styles.page__title}>Пользователи</h2>
                        <button className={styles.addUser__addButton} onClick={handleOpenAddModal}>
                            Добавить нового
                        </button>
                    </div>

                    <div className={styles.widget__tableBlock}>
                        <div className={styles.widget__tableWrapper} ref={tableContainerRef}>
                            <RadarTable
                                config={tableConfig}
                                dataSource={[]}
                                scrollContainerRef={tableContainerRef}
                                preset='radar-table-default'
                                style={{ width: '100%', tableLayout: 'fixed' }}
                                paginationContainerStyle={{
                                    display: 'none'
                                }}
                                customCellRender={{
                                    idx: ['actions'],
                                    renderer: customCellRender
                                }}
                            />
                        </div>
                    </div>
                </>
            }

            <AddUserModal
                isAddModalVisible={isAddModalVisible}
                handleCloseAddModal={handleCloseAddModal}
                newUserData={newUserData}
                handleInputChange={handleInputChange}
                handleAddUser={handleAddUser}
            />
        </>
    )
}



interface AddUserModalProps {
    isAddModalVisible: boolean;
    handleCloseAddModal: () => void;
    newUserData: {
        name: string;
        email: string;
        role: string;
    };
    handleInputChange: (field: string, value: string) => void;
    handleAddUser: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
    isAddModalVisible,
    handleCloseAddModal,
    newUserData,
    handleInputChange,
    handleAddUser
}) => {
    const roleOptions = [
        { value: 'admin', label: 'Администратор' },
        { value: 'manager', label: 'Менеджер' },
        { value: 'viewer', label: 'Наблюдатель' }
    ];

    return (
        <Modal
            open={isAddModalVisible}
            onCancel={handleCloseAddModal}
            footer={null}
            centered
            width={600}
            closeIcon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#1A1A1A" fillOpacity="0.5" />
                </svg>
            }
            title={<span style={{ fontSize: '22px', fontWeight: 600 }}>Новый пользователь</span>}
        >

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
                <ConfigProvider
                    theme={inputTheme}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '12px', color: '#1A1A1A', fontWeight: 500 }}>
                            Имя пользователя
                        </label>
                        <Input
                            value={newUserData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Например, Иван"
                            style={{
                                height: '38px',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '12px', color: '#1A1A1A', fontWeight: 500 }}>
                            Почта, на которую отправить приглашение
                        </label>
                        <Input
                            value={newUserData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="hello@radar-analytica.ru"
                            type="email"
                            style={{
                                height: '38px',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '12px', color: '#1A1A1A', fontWeight: 500 }}>
                            Роль пользователя
                        </label>
                        <Select
                            value={newUserData.role || undefined}
                            onChange={(value) => handleInputChange('role', value)}
                            placeholder="Не выбрано"
                            options={roleOptions}
                            style={{
                                width: '100%',
                                height: '38px',
                                fontSize: '14px'
                            }}
                            suffixIcon={
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            }
                        />
                    </div>
                </ConfigProvider>

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={handleCloseAddModal}
                        style={{
                            flex: '0 0 auto',
                            height: '46px',
                            border: 'none',
                            borderRadius: '8px',
                            background: '#5329FF1A',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#5329FF',
                            cursor: 'pointer',
                            padding: '0 16px'
                        }}
                    >
                        Отменить
                    </button>
                    <button
                        onClick={handleAddUser}
                        style={{
                            flex: '0 0 auto',
                            height: '46px',
                            border: 'none',
                            borderRadius: '8px',
                            background: '#5329FF',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: 'white',
                            cursor: 'pointer',
                            padding: '0 16px'
                        }}
                    >
                        Добавить
                    </button>
                </div>
            </div>
        </Modal>
    )
}