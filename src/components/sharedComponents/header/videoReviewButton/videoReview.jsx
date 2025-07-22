import { useState, useRef, useEffect } from 'react'
import styles from './videoReview.module.css'

export const VideoReview = ({ link }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    return (
        <>
            <button className={styles.button} onClick={() => setIsModalVisible(true)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.5 7.61309V12.3869C6.5 14.0718 8.42608 15.0768 9.86404 14.1422L13.5365 11.7552C14.8212 10.9202 14.8212 9.07976 13.5365 8.24475L9.86404 5.85784C8.42608 4.92324 6.5 5.92821 6.5 7.61309ZM8.33667 12.917C8.11715 12.8024 8 12.6124 8 12.3869V7.61309C8 7.38758 8.11715 7.19756 8.33666 7.08302C8.55828 6.96739 8.8183 6.96715 9.0466 7.11554L12.719 9.50245C13.0937 9.74594 13.0937 10.2541 12.719 10.4976L9.0466 12.8845C8.8183 13.0328 8.55828 13.0326 8.33667 12.917Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10Z" fill="white" />
                </svg>
                Видеообзор
            </button>

            <div
                className={isModalVisible ? `${styles.modal__backdrop} ${styles.modal__backdrop_active}` : styles.modal__backdrop}
                id='video_backdrop'
                onClick={(e) => {
                    if (e.target.id === 'video_backdrop') {
                        setIsModalVisible(false);
                    }
                }}
            >
                <div className={isModalVisible ? `${styles.modal} ${styles.modal_active}` : styles.modal}>
                    <button className={styles.modal__closeButton} onClick={() => {setIsModalVisible(false)}}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 7.77813L17.7781 0L20 2.22187L12.2219 10L20 17.7781L17.7781 20L10 12.2219L2.22187 20L0 17.7781L7.77813 10L0 2.22187L2.22187 0L10 7.77813Z" fill="#FFFFFF" fillOpacity="0.5" />
                        </svg>
                    </button>
                    {link && isModalVisible && 
                        <iframe
                            //key={isModalVisible}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                            }}
                            className={isModalVisible ? `${styles.frame} ${styles.frame_active}` : styles.frame}
                            src={link}
                            allowFullScreen
                            allow="autoplay"
                        ></iframe>
                    }
                </div>
            </div>
        </>
    )
}