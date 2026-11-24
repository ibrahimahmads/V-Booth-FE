import type { Account } from "./account.types";
import type { Event, EventStatus } from "./event.types";
import type { Paket } from "./paket.types";

export type OrderStatus = "PENDING"|"PAID"|"EXPIRED"|"CANCELLED"|"REFUNDED"|"FAILED";

export interface CheckoutResponse{
    orderId:string;
    orderNumber:string;
    amount:number;
    orderStatus:OrderStatus;
    paymentMethod:string;
    qrUrl:string;
    expiredAt:string;
}

export interface Orders{
    id:string;
    orderNumber:string;
    amount:number;
    status:OrderStatus;
    qrUrl:string;
    paidAt?:string;
    expiredAt:string;
    account:Account;
    event:Event;
    paket:Paket;
}

export interface OrderState{
    order:CheckoutResponse;
    paket?:Paket;
}

export interface OrderResponse{
    id:string;
    amount:number;
    orderNumber:string;
    orderStatus:OrderStatus;
    paidAtDay:string;
    paidAtTime:string;
    paymentMethod:string;
    qrUrl:string;
    accountId:string;
    eventId?:string;
    paketName:string;
}

export interface OrderDetailResponse{
    id:string;
    orderNumber:string;
    amount:number;
    status:OrderStatus;
    qrUrl:string;
    paidAt:string;
    expiredAt:string;
    paymentMethod:string;
    accountId:string;
    accountName:string;
    accountEmail:string;
    paket:PaketInfo;
    event?:EventInfo;
}

interface PaketInfo{
    id:string;
    name:string;
    price:number;
}

interface EventInfo{
    id:string;
    name:string;
    status:EventStatus;
}