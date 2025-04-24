import styles from './groupsMainWidget.module.css'
import HowToLink from '../../../../components/sharedComponents/howToLink/howToLink';

const GroupsMainWidget = ({ setIsAddGroupModalVisible }) => {

    return (
        <div className={styles.widget}>
            <div className={styles.widget__controlsWrapper}>
                <HowToLink
                    text='Как использовать?'
                    target='_blank'
                    url='/'
                />
                <button className={styles.widget__addButton} onClick={() => setIsAddGroupModalVisible(true)}>
                    Создать группу
                </button>
            </div>
        </div>
    )
}

export default GroupsMainWidget;