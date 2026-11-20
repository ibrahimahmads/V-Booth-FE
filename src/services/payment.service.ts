import type { CheckoutResponse, OrderResponse, Orders, OrderStatus } from "@/types/payment.types";
import { api } from "./api";
import { BASE_URL } from "../utils/constant/constant-api";
import type { PageResponse, QueryParams } from "@/types/page.types";

export async function order(paket:string): Promise<CheckoutResponse> {
  const res = await api.post<CheckoutResponse>("/order/checkout/qris",null,{params:{paket}});
  return res.data;
}

export async function getAllOrder(param:QueryParams={}):Promise<PageResponse<OrderResponse>> {
  const res = await api.get<PageResponse<OrderResponse>>("order/all",{params:{
    page:param.page??1,
    size: param.size ?? 20,
    sortBy: param.sortBy ?? "createdAt",
    direction: param.direction ?? "DESC",
  }});
  return res.data;
}

export async function getAllMyOrder(param:QueryParams={}):Promise<PageResponse<OrderResponse>> {
  const res = await api.get<PageResponse<OrderResponse>>("order/me/all",{params:{
    page:param.page??1,
    size: param.size ?? 5,
    sortBy: param.sortBy ?? "createdAt",
    direction: param.direction ?? "DESC",
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