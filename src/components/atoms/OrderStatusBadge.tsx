import { CheckCircle2, Clock, AlertCircle, XCircle, RefreshCw } from 'lucide-react';
import type { OrderStatus } from '@/types/payment.types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export default function OrderStatusBadge({ status, className = '' }: OrderStatusBadgeProps) {
  const statusConfig = {
    PAID: {
      label: 'Lunas',
      styles: 'bg-green-50 text-green-700 border-green-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    PENDING: {
      label: 'Menunggu Pembayaran',
      styles: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: <Clock className="w-3.5 h-3.5 animate-pulse" />,
    },
    EXPIRED: {
      label: 'Kedaluwarsa',
      styles: 'bg-gray-100 text-gray-700 border-gray-200',
      icon: <AlertCircle className="w-3.5 h-3.5" />,
    },
    CANCELLED: {
      label: 'Dibatalkan',
      styles: 'bg-red-50 text-red-700 border-red-200',
      icon: <XCircle className="w-3.5 h-3.5" />,
    },
    REFUNDED: {
      label: 'Dikembalikan',
      styles: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: <RefreshCw className="w-3.5 h-3.5" />,
    },
    FAILED: {
      label: 'Gagal',
      styles: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: <XCircle className="w-3.5 h-3.5" />,
    },
  };

  const current = statusConfig[status] || {
    label: status,
    styles: 'bg-gray-50 text-gray-700 border-gray-200',
    icon: <AlertCircle className="w-3.5 h-3.5" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border transition-colors ${current.styles} ${className}`}
    >
      {current.icon}
      <span>{current.label}</span>
    </span>
  );
}
