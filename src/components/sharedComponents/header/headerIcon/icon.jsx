import styles from './icon.module.css';
import { alertIcon, menuIcon } from './svgIcons';

// type: 'alert' | 'menu'
// counter: number
const Icon = ({ type, counter }) => {
    switch (type) {
        case 'alert': {
            return (
                <div className={styles.ringIcon}>
                    {alertIcon}
                    {counter !== undefined && counter > 0 &&
                        <div className={styles.icon__messageCounter}>
                            {counter > 100 ? '99+' : counter}
                        </div>
                    }
                </div>
            );
        }

        case 'menu': {
            return (
                <div className={styles.menuIcon}>
                    {menuIcon}
                </div>
            );
        }
    }
};

export default Icon;
