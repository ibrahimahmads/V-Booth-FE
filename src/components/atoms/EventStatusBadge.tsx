import { CheckCircle2, AlertCircle, NotebookPen, CalendarCheck, Archive, XCircle } from 'lucide-react';
import type { EventStatus } from '@/types/event.types';

interface EventStatusBadgeProps {
  status: EventStatus;
  className?: string;
}

export default function EventStatusBadge({ status, className = '' }: EventStatusBadgeProps) {
  const statusConfig = {
    DRAFT: {
      label: 'Draft',
      styles: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: <NotebookPen className="w-3.5 h-3.5" />,
    },
    COMPLETED: {
      label: 'Acara selesai',
      styles: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5 animate-pulse" />,
    },
    ACTIVE: {
      label: 'Acara siap',
      styles: 'bg-green-100 text-green-700 border-green-200',
      icon: <CalendarCheck className="w-3.5 h-3.5" />,
    },
    ARCHIVED: {
      label: 'Arsip acara',
      styles: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: <Archive className="w-3.5 h-3.5" />,
    },
    CANCELLED: {
      label: 'Acara dibatalkan',
      styles: 'bg-red-50 text-red-700 border-red-200',
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
