import styles from './RadarMainPageBanner.module.css'
import { Link } from 'react-router-dom'

interface IBannerProps {
    title: string,
    subtitle?: string,
    altSubtitle?: string,
    hasBackBullet?: boolean,
    hasLeadBlock?: boolean,
    hasSeoPlate?: boolean,
    leadBlockTitle?: string,
    leadBlockSubtitle?: string,
    leadBlockButtonText?: string,
    leadBlockButtonType: 'button' | 'link',
    leadBlockButtonLink?: string,
    leadBlockButtonAction?: () => void
    background: string,
    mainImage: Array<string>,
    plainText?: string,
    headerButtons?: any[],
    attentionText?: string
    smallTitle?: string,
    imageOverflow?: boolean,
}


export const RadarMainPageBanner: React.FC<IBannerProps> = ({
    title,
    subtitle,
    hasBackBullet,
    hasLeadBlock = false,
    leadBlockTitle,
    leadBlockSubtitle,
    leadBlockButtonText,
    leadBlockButtonType = 'link',
    leadBlockButtonLink,
    leadBlockButtonAction,
    background,
    mainImage,
    plainText,
    headerButtons,
    attentionText,
    hasSeoPlate = false,
    smallTitle = false,
    altSubtitle,
    imageOverflow = true,
}) => {

    return (
        <div className={styles.banner}>
            <div className={styles.banner__header}>
                <p className={smallTitle ? `${styles.banner__title} ${styles.banner__title_small}` : styles.banner__title}>{title}</p>
                {attentionText &&
                    <div className={styles.banner__attentionBar}>
                        {attentionText}
                    </div>
                }
                {subtitle && <p className={styles.banner__subtitle}>{subtitle}</p>}
                {altSubtitle && <p className={styles.banner__altSubtitle}>{altSubtitle}</p>}
                {hasBackBullet &&
                    <div className={styles.banner__backBullet}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flex: '0 0 auto' }}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM8.03033 8.53033C8.32322 8.23744 8.32322 7.76256 8.03033 7.46967C7.73744 7.17678 7.26256 7.17678 6.96967 7.46967L4.96967 9.46967C4.67678 9.76256 4.67678 10.2374 4.96967 10.5303L6.96967 12.5303C7.26256 12.8232 7.73744 12.8232 8.03033 12.5303C8.32322 12.2374 8.32322 11.7626 8.03033 11.4697L7.31066 10.75H14.5C14.9142 10.75 15.25 10.4142 15.25 10C15.25 9.58579 14.9142 9.25 14.5 9.25H7.31066L8.03033 8.53033Z" fill="#5329FF" />
                        </svg>
                        <span>
                            Вернуться сюда можно в любой момент,
                            нажав на логотип «Радара» в левом верхнем углу
                        </span>
                    </div>
                }
                {hasSeoPlate &&
                    <div className={styles.banner__seoPlate}>
                        <svg width="39" height="25" viewBox="0 0 39 25" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flex: '0 0 auto' }}>
                            <rect x="1.20373" width="37.1694" height="23" rx="6" transform="rotate(3 1.20373 0)" fill="#5329FF" />
                            <path d="M5.79948 16.473L6.24224 8.02456L7.40464 8.08548L11.9737 14.6816L11.6621 14.6653L11.9943 8.32602L13.4324 8.40138L12.9896 16.8498L11.8272 16.7889L7.27014 10.1933L7.56973 10.209L7.2375 16.5483L5.79948 16.473ZM17.6435 17.2139C16.6289 17.1607 15.8487 16.8394 15.3028 16.25C14.7569 15.6607 14.5094 14.8786 14.5605 13.904C14.5936 13.2728 14.7463 12.7281 15.0187 12.2697C15.291 11.8113 15.6538 11.4618 16.1071 11.2212C16.5683 10.981 17.0944 10.8764 17.6856 10.9074C18.2688 10.938 18.7497 11.0874 19.1282 11.3555C19.5066 11.6237 19.784 11.9867 19.9603 12.4446C20.1446 12.9028 20.221 13.4316 20.1896 14.0307L20.1689 14.4262L15.7589 14.1951L15.8004 13.4042L19.1438 13.5794L18.9313 13.7365C18.9606 13.1773 18.8632 12.7436 18.639 12.4354C18.4228 12.1277 18.091 11.9621 17.6436 11.9386C17.1483 11.9127 16.7556 12.0683 16.4656 12.4056C16.1835 12.7433 16.0259 13.2277 15.9929 13.8589L15.9847 14.0147C15.9504 14.6698 16.0844 15.1695 16.3868 15.5138C16.6976 15.8505 17.1486 16.0343 17.7398 16.0653C18.0833 16.0833 18.4052 16.0561 18.7054 15.9837C19.014 15.9038 19.3095 15.7671 19.592 15.5736L19.9827 16.6034C19.6829 16.8201 19.33 16.9818 18.9238 17.0887C18.5177 17.1956 18.0909 17.2373 17.6435 17.2139ZM22.8751 17.3679L20.8315 11.1924L22.3774 11.2735L23.8322 16.0722L23.5207 16.0559L25.4931 11.4368L26.5596 11.4926L28.0265 16.292L27.7509 16.2775L29.6873 11.6566L31.1493 11.7332L28.4714 17.6612L27.1532 17.5921L25.5962 12.6799L26.2313 12.7131L24.2053 17.4376L22.8751 17.3679ZM32.1236 15.3411L31.9677 9.37278L33.8132 9.4695L33.0344 15.3888L32.1236 15.3411ZM31.6089 17.8256L31.6962 16.1599L33.3739 16.2478L33.2866 17.9135L31.6089 17.8256Z" fill="white" />
                        </svg>

                        <p className={styles.banner__seoPlateText}>
                            В сервисе Радар-Аналитика представлено более <span>5 новых инструментов</span> для эффективной SEO-работы, включая 
                            <span>«Трекинг позиций»</span>, который позволяет автоматически отслеживать ваши органические позиции и позиции конкурентов на ежедневной основе.
                        </p>
                    </div>
                }
                {headerButtons && Array.isArray(headerButtons) &&
                    <div className={styles.banner__buttons}>
                        {headerButtons.map(_ => (
                            <button className={styles.banner__button} key={_}>
                                {_}
                            </button>
                        ))}
                    </div>
                }
                {plainText && <p className={styles.banner__plainText}>{plainText}</p>}
            </div>
            <div className={styles.banner__footer}>
                {hasLeadBlock && (
                    <div className={styles.banner__leadBlock}>
                        <div className={styles.banner__leadBlockTitleWrapper}>
                            <p className={styles.banner__leadBlockTitle}>{leadBlockTitle}</p>
                            {leadBlockSubtitle && <p className={styles.banner__leadBlockSubtitle}>{leadBlockSubtitle}</p>}
                        </div>
                        {leadBlockButtonType === 'button' && (
                            <button className={styles.banner__leadBlockButton} onClick={leadBlockButtonAction}>
                                {leadBlockButtonText}
                            </button>
                        )}
                        {leadBlockButtonType === 'link' && (
                            <Link to={leadBlockButtonLink || '/'} className={styles.banner__leadBlockButton}>
                                {leadBlockButtonText}
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <div className={styles.banner__mainImageWrapper} style={imageOverflow ? {} : {right: 0}}>
                <picture>
                    {mainImage[2] && (
                        <source 
                            media="(min-width: 1701px)" 
                            srcSet={`/main_page_banners/${mainImage[2]}.png 1200w`}
                        />
                    )}
                    {mainImage[1] && mainImage[2] && (
                        <source 
                            media="(min-width: 1391px) and (max-width: 1700px)" 
                            srcSet={`/main_page_banners/${mainImage[1]}.png 800w, /main_page_banners/${mainImage[2]}.png 1200w`}
                        />
                    )}
                    {mainImage[0] && mainImage[1] && (
                        <source 
                            media="(max-width: 1390px)" 
                            srcSet={`/main_page_banners/${mainImage[0]}.png 400w, /main_page_banners/${mainImage[1]}.png 800w`}
                        />
                    )}
                    <img 
                        src={mainImage[0] ? `/main_page_banners/${mainImage[0]}.png` : ''} 
                        alt='' 
                    />
                </picture>
            </div>
            <div className={styles.banner__backgroundWrapper}>
                <img src={background} alt='' />
            </div>
        </div>
    )
}
