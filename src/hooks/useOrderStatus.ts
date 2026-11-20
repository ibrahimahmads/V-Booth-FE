import { useEffect, useState } from "react";
import { streamOrder } from "@/services/payment.service";
import type { OrderStatus } from "@/types/payment.types";

const MAX_RETRY = 8;

export function useOrderStatus(orderNumber: string | undefined, initial: OrderStatus): OrderStatus {
  const [status, setStatus] = useState<OrderStatus>(initial);

  useEffect(() => {
    // tidak perlu stream kalau order tidak ada atau sudah final
    if (!orderNumber || initial !== "PENDING") return;

    let es: EventSource | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let retries = 0;
    let stopped = false;

    const connect = () => {
      if (stopped) return;

      es = streamOrder(
        orderNumber,
        (s) => {
          retries = 0;
          setStatus(s);
          if (s !== "PENDING") {
            // status final: tutup, jangan biarkan EventSource menyambung ulang sendiri
            stopped = true;
            es?.close();
          }
        },
        () => {
          // koneksi putus atau ditutup server: tutup, lalu sambung lagi dengan jeda
          es?.close();
          if (stopped || retries >= MAX_RETRY) return;
          retries += 1;
          timer = setTimeout(connect, Math.min(1000 * 2 ** retries, 15000));
        }
      );
    };

    connect();

    return () => {
      stopped = true;
      es?.close();
      if (timer) clearTimeout(timer);
    };
  }, [orderNumber, initial]);

  return status;
}