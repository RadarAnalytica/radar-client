import styles from './howToLink.module.css';
import { Link } from 'react-router-dom';

const HowToLink = ({
    text = 'no text',
    url = '/main',
    target = '_self'
}) => {

    return (
        <Link
            className={styles.link}
            to={url}
            target={target}
            onClick={(e) => e.stopPropagation()}
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="#5329FF" strokeOpacity="0.1" strokeWidth="1.5" />
                <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#5329FF" fillOpacity="0.5" />
            </svg>

            {text}
        </Link>
    );
};

const Button = ({
    text = 'no text',
    action
}) => {
    return (
        <button
            className={styles.link}
            onClick={action}
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="#5329FF" strokeOpacity="0.1" strokeWidth="1.5" />
                <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#5329FF" fillOpacity="0.5" />
            </svg>

            {text}
        </button>
    );
}

export default Object.assign(HowToLink, { Button: Button });
