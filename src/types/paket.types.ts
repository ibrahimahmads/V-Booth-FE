export interface Paket{
    id:string;
    name:string;
    description:string;
    eventActivePeriod:number;
    galeryActivePeriod:number;
    maxGuest:number;
    price:number;
    isCanPhotoAndVoice:boolean;
    isUrlSlug:boolean;
}

export interface PaketRequest{
    name:string;
    description:string;
    eventActivePeriod:number;
    galeryActivePeriod:number;
    maxGuest:number;
    price:number;
}