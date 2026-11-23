import { useState, useEffect } from 'react';
import { X, Loader2, Calendar, User, Package, CreditCard, CircleCheck, QrCode } from 'lucide-react';
import type { Orders } from '@/types/payment.types';
import { getOrderById, getMyOrderById } from '@/services/payment.service';
import OrderStatusBadge from '@/components/atoms/OrderStatusBadge';
import Button from '@/components/atoms/Button';

interface OrderDetailModalProps {
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

export default function OrderDetailModal({
  orderId,
  isOpen,
  onClose,
  isAdmin = false,
}: OrderDetailModalProps) {
  const [orderDetail, setOrderDetail] = useState<Orders | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !orderId) {
      setOrderDetail(null);
      setErrorMsg(null);
      return;
    }

    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        setErrorMsg(null);
        const res = isAdmin
          ? await getOrderById(orderId)
          : await getMyOrderById(orderId);
        setOrderDetail(res);
      } catch {
        setErrorMsg('Gagal memuat detail transaksi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [isOpen, orderId, isAdmin]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl border border-canvas-border max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden z-10">
        {/* Header Modal */}
        <div className="p-5 border-b border-canvas-border flex items-center justify-between bg-surface-secondary/40">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-text-muted">
              Rincian Transaksi
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold font-serif text-text-main">
                {orderDetail ? `#${orderDetail.orderNumber || orderDetail.id}` : 'Detail Order'}
              </h2>
              {orderDetail && <OrderStatusBadge status={orderDetail.status} />}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-canvas-placeholder text-text-muted hover:text-text-main transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-text-muted gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm">Memuat detail transaksi...</p>
            </div>
          ) : errorMsg ? (
            <div className="py-10 text-center text-red-600 space-y-3">
              <p>{errorMsg}</p>
              <Button variant="secondary" onClick={onClose} className="mx-auto px-4 py-2 text-xs">
                Tutup
              </Button>
            </div>
          ) : orderDetail ? (
            <>
              {/* Informative Total Card */}
              <div className="bg-surface-secondary/60 rounded-xl p-4 border border-canvas-border flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-xs text-text-muted block">Total Nominal</span>
                  <span className="text-2xl font-bold font-serif text-primary">
                    Rp {(orderDetail.amount || 0).toLocaleString('id-ID')}
                  </span>
                </div>
                {orderDetail.qrUrl && orderDetail.status === 'PENDING' && (
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full font-medium">
                      <QrCode className="w-3.5 h-3.5" /> Pembayaran QRIS Aktif
                    </span>
                  </div>
                )}
              </div>

              {/* Detail Paket */}
              {orderDetail.paket && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    <Package className="w-4 h-4 text-primary" />
                    <span>Informasi Paket</span>
                  </div>
                  <div className="bg-canvas-placeholder/40 rounded-xl p-4 border border-canvas-border space-y-2">
                    <div className="flex justify-between items-center py-1 border-b border-canvas-border/50">
                      <span className="text-text-muted">Nama Paket</span>
                      <span className="font-semibold text-text-main">{orderDetail.paket.name}</span>
                    </div>
                    {orderDetail.paket.description && (
                      <p className="text-xs text-text-muted py-1 leading-relaxed">
                        {orderDetail.paket.description}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                      <div className="bg-white p-2.5 rounded-lg border border-canvas-border">
                        <span className="text-text-muted block text-[11px]">Masa Aktif Acara</span>
                        <span className="font-bold text-text-main">
                          {orderDetail.paket.eventActivePeriod} Hari
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-canvas-border">
                        <span className="text-text-muted block text-[11px]">Masa Aktif Galeri</span>
                        <span className="font-bold text-text-main">
                          {orderDetail.paket.galeryActivePeriod} Hari
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-canvas-border">
                        <span className="text-text-muted block text-[11px]">Maksimal Tamu</span>
                        <span className="font-bold text-text-main">
                          {orderDetail.paket.maxGuest} Tamu
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-canvas-border">
                        <span className="text-text-muted block text-[11px]">Foto & Pesan Suara</span>
                        <span className="font-bold text-text-main flex items-center gap-1">
                          {orderDetail.paket.isCanPhotoAndVoice ? (
                            <>
                              <CircleCheck className="w-3.5 h-3.5 text-green-600" /> Tersedia
                            </>
                          ) : (
                            '-'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Detail Transaksi & Metode Pembayaran */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span>Informasi Pembayaran</span>
                </div>
                <div className="bg-canvas-placeholder/40 rounded-xl p-4 border border-canvas-border space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-canvas-border/50">
                    <span className="text-text-muted">ID Transaksi</span>
                    <span className="font-mono text-text-main text-[11px] select-all">
                      {orderDetail.id}
                    </span>
                  </div>
                  {orderDetail.paidAt && (
                    <div className="flex justify-between py-1 border-b border-canvas-border/50">
                      <span className="text-text-muted">Waktu Pembayaran</span>
                      <span className="font-medium text-text-main">{orderDetail.paidAt}</span>
                    </div>
                  )}
                  {orderDetail.expiredAt && orderDetail.status === 'PENDING' && (
                    <div className="flex justify-between py-1 border-b border-canvas-border/50">
                      <span className="text-text-muted">Batas Waktu Pembayaran</span>
                      <span className="font-medium text-amber-700">{orderDetail.expiredAt}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Detail Account (khusus Admin atau jika ada account) */}
              {orderDetail.account && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    <User className="w-4 h-4 text-primary" />
                    <span>Informasi Pelanggan</span>
                  </div>
                  <div className="bg-canvas-placeholder/40 rounded-xl p-4 border border-canvas-border space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-canvas-border/50">
                      <span className="text-text-muted">Nama</span>
                      <span className="font-medium text-text-main">{orderDetail.account.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-canvas-border/50">
                      <span className="text-text-muted">Email</span>
                      <span className="font-medium text-text-main">{orderDetail.account.email}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-text-muted">Username</span>
                      <span className="font-medium text-text-main">{orderDetail.account.username}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Detail Event (jika ada) */}
              {orderDetail.event && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Informasi Event</span>
                  </div>
                  <div className="bg-canvas-placeholder/40 rounded-xl p-4 border border-canvas-border space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-canvas-border/50">
                      <span className="text-text-muted">Nama Event</span>
                      <span className="font-medium text-text-main">{orderDetail.event.eventName}</span>
                    </div>
                    {orderDetail.event.eventDate && (
                      <div className="flex justify-between py-1">
                        <span className="text-text-muted">Tanggal Event</span>
                        <span className="font-medium text-text-main">{orderDetail.event.eventDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* Footer Modal */}
        <div className="p-4 border-t border-canvas-border bg-surface-secondary/30 flex justify-end">
          <Button
            variant="secondary"
            onClick={onClose}
            className="px-6 py-2 text-xs font-medium"
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}
