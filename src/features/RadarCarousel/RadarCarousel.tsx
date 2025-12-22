import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import styles from './RadarCarousel.module.css';

interface ICarouselProps {
    carouselStyles: React.CSSProperties,
    scrollable?: boolean,
    arrowControls?: boolean,
    dotControls?: boolean,
    loop?: boolean,
    //data: Array<{key: string, render: React.ReactNode}>
    data: any[],
    autoScroll?: boolean,
}


// const mock = ['lightgray', 'blue']


export const RadarCarousel: React.FC<ICarouselProps> = ({
    carouselStyles,
    scrollable = true,
    arrowControls = true,
    dotControls = true,
    loop = true,
    data,
    autoScroll = true
}) => {
    const [carouselContent, setCarouselContent] = useState([...data])
    // console.log(carouselContent)
    const [activeItem, setActiveItem] = useState(null)
    const [isScrollBlocked, setIsScrollBlocked] = useState(false)
    const carouselMainContainerRef = useRef<HTMLDivElement>(null)
    const carouselScrollContainerRef = useRef<HTMLDivElement>(null)
    const carouselItemRefs = useRef<HTMLDivElement[]>([])
    // console.log(carouselItemRefs?.current)
    const timeoutRef = useRef<number | null>(null)
    const isUpdatedFromControls = useRef<boolean>(false)
    const [isAutoScrollActive, setIsAutocsrollActive] = useState(autoScroll)

    const controlsHandler = (elIndex: number) => {
        // if (!carouselScrollContainerRef?.current) return;
        // if (!carouselItemRefs?.current) return;
        // const scrollContainer = carouselScrollContainerRef?.current
        // const items = carouselItemRefs?.current
        // const currentItem = items.find((_, index) => index === elIndex)
        // const currInitialItem = carouselContent[elIndex]

        // if (currentItem) {
        //     setActiveItem(currInitialItem)
        //     scrollContainer.scrollTo({
        //         left: currentItem.offsetLeft,
        //         behavior: 'smooth'
        //     })
        // }

    };

    const arrowHandler = (direction: 'left' | 'right') => {
        isUpdatedFromControls.current = true
        if (direction === 'right') {
            let nextActiveItemIndex = carouselContent.findIndex(_ => _ === activeItem) + 1
            if (!carouselContent[nextActiveItemIndex]) {
                if (!loop) {
                    nextActiveItemIndex = 0
                } else {
                    const firstItem = carouselContent[0];
                    const newCarouselContent = carouselContent;
                    newCarouselContent.shift()
                    newCarouselContent.push(firstItem)
                    setCarouselContent(() => newCarouselContent)
                    setActiveItem(firstItem)
                    return
                }

            }
            setActiveItem(carouselContent[nextActiveItemIndex])
        }
        if (direction === 'left') {
            let nextActiveItemIndex = carouselContent.findIndex(_ => _ === activeItem) - 1
            if (!carouselContent[nextActiveItemIndex]) {
                if (!loop) {
                    nextActiveItemIndex = carouselContent?.length - 1
                } else {
                    const lastItem = carouselContent[carouselContent.length - 1];
                    const newCarouselContent = carouselContent;
                    newCarouselContent.pop()
                    newCarouselContent.unshift(lastItem)
                    setCarouselContent(() => newCarouselContent)
                    setActiveItem(lastItem)
                    return
                }

            }
            setActiveItem(carouselContent[nextActiveItemIndex])
        }
    };

    const timeoutFunction = () => {
        isUpdatedFromControls.current = true
        let nextActiveItemIndex = carouselContent.findIndex(_ => _ === activeItem) + 1
        if (!carouselContent[nextActiveItemIndex]) {
            if (!loop) {
                nextActiveItemIndex = 0
            } else {
                const firstItem = carouselContent[0];
                const newCarouselContent = carouselContent;
                newCarouselContent.shift()
                newCarouselContent.push(firstItem)
                setCarouselContent(newCarouselContent)
                setActiveItem(firstItem)
                return
            }

        }
        setActiveItem(carouselContent[nextActiveItemIndex])
    }

    useEffect(() => {
        if (data) {
            setActiveItem(data[0])
        }
    }, [data])

    useEffect(() => {
        if (!timeoutRef?.current && isAutoScrollActive) {
            timeoutRef.current = setInterval(timeoutFunction, 2000);
        }
        if (activeItem) {
            if (!carouselScrollContainerRef?.current) return;
            if (!carouselItemRefs?.current) return;
            const container = carouselScrollContainerRef?.current;
            const items = carouselItemRefs?.current
            const nextItemFromRef = items?.find(_ => _.id === `carousel-card-${activeItem}`)
            container.scrollTo({ left: nextItemFromRef?.offsetLeft, behavior: 'smooth' })
            isUpdatedFromControls.current = false
        }
        return () => {
            if (timeoutRef?.current) {
                clearInterval(timeoutRef?.current);
                timeoutRef.current = null
            }
        }
    }, [activeItem, isAutoScrollActive])



    return (
        <div
            className={styles.carousel}
            style={carouselStyles}
            ref={carouselMainContainerRef}
            onMouseOver={() => {
                if (timeoutRef?.current) {
                    clearInterval(timeoutRef.current)
                    timeoutRef.current = null
                    setIsAutocsrollActive(false)
                }
            }}
            onMouseLeave={() => {
                if (!timeoutRef?.current) {
                    setIsAutocsrollActive(true)
                }
            }}
        >
            <div
                className={styles.carousel__container}
                ref={carouselScrollContainerRef}
                onScroll={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }}
            >
                {carouselContent.map((_, index) => (
                    <div
                        key={_}
                        className={styles.carosuel__contentWrapper}
                        style={{ background: _ }}
                        id={`carousel-card-${_}`}
                        ref={(el) => {
                            if (el) {
                                carouselItemRefs.current[index] = el
                            }
                        }}
                    >
                    </div>
                ))}
                {/* controls */}
            </div>
            {arrowControls &&
                <>
                    <button
                        className={`${styles.carousel_arrowControlButton} ${styles.carousel_arrowControlButton_left}`}
                        onClick={() => arrowHandler('left')}
                    >
                        <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.37109 0.541016L0.764822 4.14729L4.37109 7.75356" stroke="#1A1A1A" strokeWidth="1.08188" strokeLinecap="round" />
                        </svg>
                    </button>
                    <button
                        className={`${styles.carousel_arrowControlButton} ${styles.carousel_arrowControlButton_right}`}
                        onClick={() => arrowHandler('right')}
                    >
                        <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.37109 0.541016L0.764822 4.14729L4.37109 7.75356" stroke="#1A1A1A" strokeWidth="1.08188" strokeLinecap="round" />
                        </svg>
                    </button>
                </>
            }
            {dotControls &&
                <div className={styles.carousel__controls}>
                    {[...data].map((_, index) => (
                        <button
                            key={_}
                            className={activeItem === _ ? `${styles.carousel__controlButton} ${styles.carousel__controlButton_active}` : styles.carousel__controlButton}
                            onClick={() => { controlsHandler(index); }}

                        >
                            <div>
                                {activeItem === _ && isAutoScrollActive && <div className={styles.carousel__progressBar}></div>}
                            </div>
                        </button>
                    ))}
                </div>
            }
        </div>
    )
}