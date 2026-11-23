import type { CheckoutResponse, OrderResponse, Orders, OrderStatus } from "@/types/payment.types";
import { api } from "./api";
import { BASE_URL } from "../utils/constant/constant-api";
import type { OrderSearch, PageResponse, QueryParams } from "@/types/page.types";
import { cleanParams } from "@/utils/helper/params";

export async function order(paket:string): Promise<CheckoutResponse> {
  const res = await api.post<CheckoutResponse>("/order/checkout/qris",null,{params:{paket}});
  return res.data;
}

export async function getAllOrder(param:QueryParams<OrderSearch>={}):Promise<PageResponse<OrderResponse>> {
  const { page, size, sortBy, direction, search } = param;
  const res = await api.get<PageResponse<OrderResponse>>("order/all",{params:{
    page: page??1,
    size: size ?? 20,
    sortBy: sortBy ?? "createdAt",
    direction: direction ?? "DESC",
    ...cleanParams(search)
  }});
  return res.data;
}

export async function getAllMyOrder(param:QueryParams<OrderSearch>={}):Promise<PageResponse<OrderResponse>> {
  const { page, size, sortBy, direction, search } = param;
  const res = await api.get<PageResponse<OrderResponse>>("order/me/all",{params:{
    page: page??1,
    size: size ?? 5,
    sortBy: sortBy ?? "createdAt",
    direction: direction ?? "DESC",
    ...cleanParams(search)
  }});
  return res.data;
}

export async function getOrderById(id:string):Promise<Orders> {
  const res = await api.get<Orders>(`order/${id}`);
  return res.data;
}

export async function getMyOrderById(id:string):Promise<Orders> {
  const res = await api.get<Orders>(`order/me/${id}`);
  return res.data;
}

export function streamOrder(
  orderNumber: string,
  onStatus: (status: OrderStatus) => void,
  onError?: (event: Event) => void
): EventSource {
  const eventSource = new EventSource(
    `${BASE_URL}/api/v1/order/me/${orderNumber}/stream`,
    { withCredentials: true }
  );

  eventSource.addEventListener("order-status", (e) => {
    try {
      const data = JSON.parse((e as MessageEvent).data) as { status: OrderStatus };
      onStatus(data.status);
    } catch {
      // abaikan data yang tidak valid
    }
  });

  if (onError) {
    eventSource.onerror = onError;
  }

  return eventSource;
}