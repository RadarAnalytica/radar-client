import styles from './icon.module.css'
import { alertIcon, menuIcon } from './svgIcons';
// type: 'alert' | 'menu'
// counter: number 
const Icon = ({ type, counter }) => {

    switch (type) {
        case 'alert': {
            return (
                <div className={styles.icon}>
                    {alertIcon}
                    {counter &&
                        <div className={styles.icon__messageCounter}>
                            {counter > 100 ? '99+' : counter}
                        </div>
                    }
                </div>
            )
        }

        case 'menu': {
            return (
                <div className={styles.icon}>
                    {menuIcon}
                </div>
            )
        }
    }
}

export default Icon;