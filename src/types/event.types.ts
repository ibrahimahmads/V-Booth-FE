import type { Account } from "./account.types";
import type { FrameItem } from "./frame.types";
import type { GreetingResponse } from "./greeting.types";
import type { Paket } from "./paket.types";

export type EventStatus = "DRAFT"| "COMPLETED"| "ARCHIVED"| "CANCELLED"|"ACTIVE";
type EventType = "WEDDING"| "BIRTHDAY"| "GRADUATION"| "SEMINAR";

export interface Event{
    id:string;
    eventName:string;
    slug:string;
    eventDate:string;
    eventStartTime:string;
    eventEndTime:string;
    eventStatus:EventStatus;
    eventDescription:string;
    eventType:EventType;
    account:Account;
    frameList:FrameItem[];
    greetingsList:GreetingResponse[];
    paket:Paket;
}

export interface EventSearch{
    keyword?: string;
    status?: EventStatus;
}

export interface EventResponse{
    id:string;
    eventName:string;
    slug:string;
    numberOfGreetings:number;
    eventDate:string;
    eventStartTime:string;
    eventEndTime:string;
    eventStatus:EventStatus;
    eventDescription:string;
    eventType:EventType;
    eventLocation:string;
    paket:PaketInfo
}

interface PaketInfo{
    id:string;
    name:string;
    maxGuest:number;
}

