import styles from './cellRender.module.css'
import { Link } from 'react-router-dom'
import { Rate, ConfigProvider } from 'antd'
import { formatPrice } from '../../../../service/utils'



const getRateStarColor = (value) => {
    let color = '#F93C65'

    if (value > 2 && value <= 3) {
        color = '#BDBDBD'
    }
    if (value > 3 && value <= 4) {
        color = '#FEC53D'
    }
    if (value > 4 && value <= 5) {
        color = '#00B69B'
    }

    return color
}

export const cellRender = (value, context) => {
    //console.log('value', value)
    //console.log('context', context)


    if (context.dataIndex === 'query') {
        const url = `/monitoring/request?query=${encodeURIComponent(value)}`
        return (
            <Link
                className={styles.cell__query}
                to={url}
                target='_blank'
                title='Смотреть подробнее'
                key={context.dataIndex}
            >
                <p className={styles.cell__title}>{value}</p>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }}>
                    <path d="M14.4999 0.75C14.0857 0.75 13.7499 1.08579 13.7499 1.5C13.7499 1.91421 14.0857 2.25 14.4999 2.25H18.4999C18.5746 2.25 18.6478 2.25656 18.7189 2.26913L12.0184 8.96967C11.7255 9.26256 11.7255 9.73744 12.0184 10.0303C12.3113 10.3232 12.7861 10.3232 13.079 10.0303L19.7428 3.36653C19.7475 3.41038 19.7499 3.45491 19.7499 3.5V7.5C19.7499 7.91421 20.0857 8.25 20.4999 8.25C20.9141 8.25 21.2499 7.91421 21.2499 7.5V3.5C21.2499 2.7588 20.9567 2.08609 20.4799 1.59155L20.4765 1.58807C19.9765 1.07129 19.2757 0.75 18.4999 0.75H14.4999Z" fill="currentColor" />
                    <path d="M10.5 1.75018L10.4624 1.75018C8.81192 1.75018 7.52215 1.75017 6.49047 1.84368C5.44067 1.93883 4.58471 2.13551 3.825 2.57413C2.89008 3.1139 2.11372 3.89026 1.57394 4.82518C1.13532 5.5849 0.938642 6.44085 0.843495 7.49066C0.749991 8.52233 0.749995 9.81211 0.75 11.4626V11.5378C0.749995 13.1883 0.749991 14.478 0.843495 15.5097C0.938642 16.5595 1.13532 17.4155 1.57394 18.1752C2.11372 19.1101 2.89008 19.8865 3.825 20.4262C4.58471 20.8649 5.44067 21.0615 6.49047 21.1567C7.52214 21.2502 8.81191 21.2502 10.4624 21.2502H10.5376C12.1881 21.2502 13.4779 21.2502 14.5095 21.1567C15.5593 21.0615 16.4153 20.8649 17.175 20.4262C18.1099 19.8865 18.8863 19.1101 19.4261 18.1752C19.8647 17.4155 20.0614 16.5595 20.1565 15.5097C20.25 14.478 20.25 13.1883 20.25 11.5378V11.5002C20.25 11.086 19.9142 10.7502 19.5 10.7502C19.0858 10.7502 18.75 11.086 18.75 11.5002C18.75 13.1963 18.7493 14.4182 18.6626 15.3743C18.5769 16.3201 18.4119 16.9318 18.127 17.4252C17.7189 18.1321 17.1319 18.7191 16.425 19.1272C15.9316 19.412 15.3199 19.5771 14.3741 19.6628C13.418 19.7495 12.1961 19.7502 10.5 19.7502C8.80389 19.7502 7.58195 19.7495 6.62587 19.6628C5.6801 19.5771 5.06836 19.412 4.575 19.1272C3.86811 18.7191 3.28111 18.1321 2.87298 17.4252C2.58814 16.9318 2.42309 16.3201 2.33737 15.3743C2.25072 14.4182 2.25 13.1963 2.25 11.5002C2.25 9.80407 2.25072 8.58213 2.33737 7.62605C2.42309 6.68028 2.58814 6.06855 2.87298 5.57518C3.2811 4.86829 3.86811 4.28129 4.575 3.87316C5.06836 3.58832 5.6801 3.42327 6.62587 3.33755C7.58195 3.2509 8.80389 3.25018 10.5 3.25018C10.9142 3.25018 11.25 2.9144 11.25 2.50018C11.25 2.08597 10.9142 1.75018 10.5 1.75018Z" fill="currentColor" />
                </svg>
            </Link>
        )
    }

    if (context.dataIndex === 'niche_rating') {
        let v = value + 1;
        return (
            <div
                className={`${styles.cell} ${styles.cell_rate}`}
                key={context.dataIndex}
            >
                {[1, 2, 3, 4, 5].map(_ => {
                    if (_ <= v) {
                        return (
                            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#5329FF" />
                            </svg>
                        )
                    } else {
                        return (
                            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#8C8C8C" />
                            </svg>
                        )

                    }
                })}
                {/* <ConfigProvider
                    theme={{
                        components: {
                            Rate: {
                                starColor: '#5329FF'
                            }
                        }
                    }}
                >
                    <Rate
                        value={v}
                        //allowHalf
                        disabled
                    />
                </ConfigProvider> */}
            </div>
        )
    }


    if (context.dataIndex === 'g30' || context.dataIndex === 'g60' || context.dataIndex === 'g90') {
        return (
            <div
                className={styles.cell}
                key={context.dataIndex}
            >
                <div className={styles.cell__wrapper}>
                    {context.units ? formatPrice(value, context.units) : formatPrice(value, '')}
                </div>
            </div>
        )
    }

    // default
    return (
        <div
            className={styles.cell}
            key={context.dataIndex}
        >
            {context.units ? formatPrice(value, context.units) : formatPrice(value, '')}
        </div>
    )
}