import { useEffect } from 'react';
import styles from './AlertWidget.module.css';

interface AlertWidgetProps {
    message: string;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    type?: 'success' | 'error';
    timeout?: number;
}

const AlertWidget = ({ message, isVisible, setIsVisible, type = 'success', timeout = 2000 }: AlertWidgetProps) => {
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (isVisible) {
            timeoutId = setTimeout(() => setIsVisible(false), timeout);
        }

        return () => clearTimeout(timeoutId);
    }, [isVisible]);

    if (!isVisible) return null;
    
    return (
        <div className={styles.alertWidget}>
            {type === 'success' && (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6.4" fill="#00B69B" fillOpacity="0.1" />
                    <path d="M14.1999 19.1063L23.1548 10.1333L24.5333 11.5135L14.1999 21.8666L8 15.6549L9.37753 14.2748L14.1999 19.1063Z" fill="#00B69B" />
                </svg>
            )}
            {type === 'error' && (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="5" fill="#F93C65" fillOpacity="0.1" />
                    <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F93C65" />
                </svg>
            )}
            {message}
        </div>
    )
};

export default AlertWidget;