import type { OrderStatus } from "./payment.types";

export interface PageResponse<T>{
    data: T[];
    page:number;
    size:number;
    totalElement:number;
    totalPages:number;
}

export interface QueryParams <T>{
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: "ASC" | "DESC";
  search?:T;
}

export interface OrderSearch{
  keyword?: string;
  status?: OrderStatus;
}