import type { OrderState, OrderStatus } from "@/types/payment.types";

const GREETING_ID_KEY = 'vbooth_guest_greeting_id';
const ORDER_STATE = 'vbooth_active_checkout';

export const getStoredGreetingId = (): string | null => {
  return localStorage.getItem(GREETING_ID_KEY);
};

export const setStoredGreetingId = (id: string): void => {
  localStorage.setItem(GREETING_ID_KEY, id);
};

export const removeStoredGreetingId = (): void => {
  localStorage.removeItem(GREETING_ID_KEY);
};

export const setOrderState = (orderState:OrderState):void=>{
  sessionStorage.setItem(ORDER_STATE,JSON.stringify(orderState));
}

export const getOrderState = ():OrderState|null=>{
  const saved = sessionStorage.getItem(ORDER_STATE);
  if(saved == null) return null;
  try {
    return JSON.parse(saved) as OrderState;
  } catch {
    sessionStorage.removeItem(ORDER_STATE);
    return null;
  }
}

export const updateOrderStatus = (status: OrderStatus): void => {
  const current = getOrderState();
  if (!current) return;
  setOrderState({ ...current, order: { ...current.order, orderStatus: status } });
};

export const removeOrderState = (): void => {
  sessionStorage.removeItem(ORDER_STATE);
};