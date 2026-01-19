type ISODateString = `${number}-${number}-${number}T${number}:${number}:${number}`;

export interface ISubscription {
    id: number;
    name: string;
    active: boolean;
    validity_period: ISODateString;
}