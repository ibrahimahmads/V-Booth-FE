import type { Account } from "./account.types";
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
    orderStatus:OrderStatus;
    paidAtDay:string;
    paidAtTime:string;
    paymentMethod:string;
    qrUrl:string;
    accountId:string;
    eventId:string;
    paketName:string;
}