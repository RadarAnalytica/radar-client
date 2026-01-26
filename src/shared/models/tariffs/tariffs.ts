export interface ITariffCard {
    title: string;
    id: string;
    priceList: {
        "1 месяц": { price: number; oldPrice: number | null };
        "3 месяца": { price: number; oldPrice: number | null };
        "6 месяцев": { price: number; oldPrice: number | null };
        "12 месяцев": { price: number; oldPrice: number | null };
    };
    discount: string | null;
    price: number;
    oldPrice: number | null;
    value: string;
    primaryColor: string;
    secondaryColor: string;
    newFeatures: Array<{
        title: string;
        text: string;
        iconIndex: number;
    }>;
    whatsInside?: Array<{
        title: string;
        children: Array<{
            title: string;
            isIncluded: boolean;
        }>;
    }>;
    description?: string;
    buttonType: 'link' | 'modal'
}


export interface IPaymentItem {
    title: string,
    price: number, // first charge - (with promocode's discount and othre bonuses)
    fullPrice: number, // reccurent charge - (no promo, other bonuses)
    period: '1month' | '3month' | '6month' | '12month'
}

export interface IPromocode {
    type: 'discount' | 'time',
    amount: number
}