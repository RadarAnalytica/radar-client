import { useState, useEffect, useRef, forwardRef } from 'react'
import styles from './videoReviews.module.css'
import { VideoCard } from '../../features'


export const VIDEO_CARDS_CONFIG = [
    {
        name: 'Мария Фёдорова',
        description: 'CEO & Co-Founder',
        // video: cover,
        videoSrc: "https://play.boomstream.com/gKgcdLiT?color=transparent&title=0&size=cover"
    },
    {
        name: 'Мария Фёдорова',
        description: 'CEO & Co-Founder',
        // video: cover,
        videoSrc: "https://play.boomstream.com/MRKkbSYL?color=transparent&title=0&size=cover"
    },
    {
        name: 'Мария Фёдорова',
        description: 'CEO & Co-Founder',
        // video: cover,
         videoSrc: "https://play.boomstream.com/6pVJWEgn?color=transparent&title=0&size=cover"
    },
    {
        name: 'Мария Фёдорова',
        description: 'CEO & Co-Founder',
        // video: cover,
        videoSrc: "https://play.boomstream.com/wDxNUSog?color=transparent&title=0&size=cover"
    },
    {
        name: 'Мария Фёдорова',
        description: 'CEO & Co-Founder',
        // video: cover,
        videoSrc: "https://play.boomstream.com/YdvSIQ0U?color=transparent&title=0&size=cover"
    },
]

export const VideoReviews = () => {

    const [cards, setCards] = useState(VIDEO_CARDS_CONFIG)
    const containerRef = useRef(null)

    const handleScroll = (direction) => {
        const card = document.querySelector('#card-0') // searching for the first card
        if (containerRef?.current && card) {
            const cardWidth = card.offsetWidth; // width of the card

            // scrolling to the right/left
            containerRef.current.scrollBy({
                left: direction === 'left' ? -cardWidth : cardWidth,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        let observer;
        let el;
        if (containerRef?.current) {
            observer = new IntersectionObserver((entries) => {
                entries.forEach(_ => {
                    if (_.isIntersecting && containerRef.current) {
                        const scrollWidth = containerRef.current?.scrollWidth; // getting scroll width of the container
                        const scrollPosition = containerRef.current?.scrollLeft // getting scroll position
                        const containerWidth = containerRef.current?.offsetWidth // width of the container
                        const isScrolledToTheLastScreen = (scrollPosition + containerWidth) >= containerWidth * 3
                        let backScrollTrigger = Math.round(scrollWidth / containerWidth) >= 3

                        if (backScrollTrigger && isScrolledToTheLastScreen) {
                            return
                        } else {
                            setCards([...cards, ...VIDEO_CARDS_CONFIG])
                        }

                    }
                })
            }, {
                root: containerRef.current,
                rootMargin: '0px',
            })
            el = document.querySelector(`#card-${cards.length - 1}`)
            if (el) {
                observer.observe(el)
            }
        }
        return () => {
            if (observer && el) {
                observer.unobserve(el)
            }
        }
    }, [cards])

    return (
        <section className={styles.screen}>
            <div className={styles['screen__mainWrapper']}>
                <header className={styles['screen__blockHeader']}>
                    <h2 className={styles['screen__title']}>
                        О нас говорят
                    </h2>
                    <menu className={styles['screen__buttonsWrapper']}>
                        <li>
                            <button className={styles['screen__controlButton']}
                                onClick={() => handleScroll('left')}
                                aria-label='Прокрутить карусель влево'
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.46094 18.4609L1.00007 10.0001L9.46094 1.5392" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1.00009 10L19 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button className={styles['screen__controlButton']}
                                onClick={() => handleScroll('right')}
                                aria-label='Прокрутить карусель вправо'
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5391 1.53906L18.9999 9.99993L10.5391 18.4608" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.9999 10L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </li>
                    </menu>
                </header>
                <div className={styles['screen__carouselWrapper']}>
                    <CarouselContainer
                        ref={containerRef}
                        isCenteredOn1920plus={false}
                    >
                        {cards.map((_, id) => {
                            return (
                                <VideoCard item={_} key={id} id={id.toString()} />
                            )
                        })}
                    </CarouselContainer>
                </div>
            </div>
        </section>
    )
}


const CarouselContainer = forwardRef(({ children, isCenteredOn1920plus }, ref) => {
    // const isCenteredOn1920Style = isCenteredOn1920plus ? 'centeredOn1920' : 'notCenteredOn1920'
    const [isScrolling, setIsScrolling] = useState(false)

    return (
        <div className={isScrolling ? `${styles.wrapper} ${styles.wrapper_shadow}` : styles.wrapper}>
            <div
                // className={cx('slider', `slider--${isCenteredOn1920Style}`)}
                className={`${styles.slider} ${styles.slider_notCenteredOn1920}`}
                ref={ref}
                onScroll={() => {
                    setIsScrolling(true)
                }}
                onScrollEnd={() => setIsScrolling(false)}
            >
                {children}
            </div>
        </div>
    )
})