import { Progress } from 'antd';
import styles from './Loader.module.css';

interface LoaderProps {
    loading: boolean;
    progress?: number;
}

const Loader = ({ loading, progress }: LoaderProps) => {
    if (!loading) return null;

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center h-100 w-100 p-3'>
            <span className='loader'></span>
            {progress !== null && 
                <div className={styles.loadingProgress}>
                    <Progress
                        percent={progress}
                        size='small'
                        showInfo={false}
                        strokeColor='#5329FF'
                    />
                </div>
            }
        </div>
    )
}

export default Loader;