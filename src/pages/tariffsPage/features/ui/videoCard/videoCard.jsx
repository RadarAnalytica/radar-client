import styles from './videoCard.module.css'

export const VideoCard = ({ item, id }) => {

    return (
        <div className={styles.card} id={`card-${id}`}>
            <div className={styles.card__cover}>
                {/* <Image src={item.video} alt='Обложка карточки' /> */}
                <iframe
                  width="100%"
                  height="100%"
                  src={item.videoSrc}
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                  title={item.name}
                ></iframe>
            </div>

            {/* <div className={cx('card__dataBlock')}>
                    <Title.Quaternary>
                        {item.name}
                    </Title.Quaternary>
                    <Text>
                        {item.description}
                    </Text>
            </div> */}
        </div>
    )
}