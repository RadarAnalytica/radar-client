import { Progress } from 'antd';
import styles from './Loader.module.css';

interface LoaderProps {
    loading: boolean;
    progress?: number;
}

const Loader = ({ loading, progress }: LoaderProps) => {
    if (!loading) return null;

    return (
        <div className='loader-container container d-flex flex-column justify-content-center align-items-center h-100 w-100 p-3'>
            <span className='loader'></span>
            <div className={`${styles.loadingProgress} ${progress === null ? 'opacity-0' : ''}`}>
                <Progress
                    percent={progress}
                    size='small'
                    showInfo={false}
                    strokeColor='#5329FF'
                />
            </div>
        </div>
    );
};

export default Loader;
