import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, QrCode, AlertCircle, Copy, Check, CheckCircle2, RefreshCw, Download, Loader2 } from 'lucide-react';
import DashboardLayout from '../../components/templates/DashboardLayout';
import Button from '@/components/atoms/Button';
import type { OrderState } from '@/types/payment.types';
import { getOrderState, removeOrderState, updateOrderStatus } from '@/utils/helper/storage';
import { useOrderStatus } from '@/hooks/useOrderStatus';


export default function PaymentPage() {
  const navigate = useNavigate();

  const [orderState] = useState<OrderState | null>(():OrderState|null=>getOrderState());
  const status = useOrderStatus(
    orderState?.order?.orderNumber,
    orderState?.order?.orderStatus ?? 'PENDING'
  );
  
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  
  const isPaid = status === 'PAID';
  const isFailed = status !== 'PENDING' && status !== 'PAID';     // EXPIRED / FAILED
  const isVerifying = isExpired && status === 'PENDING';          // waktu habis, server belum memutuskan
  const qrInactive = isExpired || status !== 'PENDING';

  useEffect(() => {
    if (status !== 'PENDING') updateOrderStatus(status);
    if (status === 'PAID') {
      navigate('/dashboard/payment/success', { replace: true });
    }
  }, [status,navigate]);

  useEffect(() => {
    if (!orderState?.order?.expiredAt) return;
    if (status !== 'PENDING') return;

    const calculateTimeLeft = () => {
      const expireTime = new Date(orderState.order.expiredAt).getTime();
      const difference = Math.floor((expireTime - Date.now()) / 1000);

      if (difference <= 0) {
        setTimeLeft(0);
        setIsExpired(true);
      } else {
        setTimeLeft(difference);
        setIsExpired(false);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [orderState,status]);

  const formatCountdown = (totalSeconds: number): string => {
    if (totalSeconds <= 0) return '00:00:00';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const handleCopyOrderNumber = () => {
    if (orderState?.order?.orderNumber) {
      navigator.clipboard.writeText(orderState.order.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadQR = async () => {
    if (!order.qrUrl) return;
    setIsDownloading(true);
    try {
      const res = await fetch(order.qrUrl, { mode: 'cors' });
      if (!res.ok) throw new Error('Failed to fetch QR image');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `QRIS-Vbooth-${order.orderNumber || order.orderId || 'checkout'}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback jika fetch terhalang CORS (cross-origin Midtrans) di browser HP/desktop
      const a = document.createElement('a');
      a.href = order.qrUrl;
      a.target = '_blank';
      a.download = `QRIS-Vbooth-${order.orderNumber || order.orderId || 'checkout'}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setIsDownloading(false);
    }
  };

  const goToPayments = () => {
    removeOrderState();
    navigate('/dashboard/payments');
  };

  const goToPackages = () => {
    if (isFailed) removeOrderState();
    navigate('/dashboard/packages');
  };

  if (!orderState || !orderState.order) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-6">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-serif text-text-main">Data Pembayaran Tidak Ditemukan</h1>
            <p className="text-sm text-text-muted">
              Tidak ada data transaksi checkout aktif. Silakan pilih paket kembali untuk melakukan pembayaran.
            </p>
          </div>
          <div className="pt-2">
            <Button variant="primary" onClick={() => navigate('/dashboard/packages')}>
              Lihat Paket
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const { order, paket } = orderState;

  return (
    <DashboardLayout>
      <div className="max-w-250 mx-auto py-8 lg:px-0 px-4 space-y-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {/* Header */}
        <div className="flex flex-row items-center justify-between gap-3">
          <button
            onClick={() => navigate('/dashboard/packages')}
            className="flex-none flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Paket
          </button>

          <div className="flex flex-col items-end gap-1 text-right md:text-right">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-text-muted">Status Transaksi</span>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
              isPaid? 'bg-green-100 text-green-700 border-green-200'
                    : isFailed ? 'bg-red-100 text-red-700 border-red-200'
                      : 'bg-amber-100 text-amber-700 border-amber-200'
                }`}>
              {isPaid ? 'LUNAS' : isFailed ? (status === 'EXPIRED' ? 'KEDALUWARSA' : 'GAGAL') : isVerifying ? 'MEMVERIFIKASI' : 'MENUNGGU PEMBAYARAN'}
            </span>
          </div>
        </div>

        {/* Expired Banner */}
        {isPaid && (
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <div className="space-y-1 text-sm">
              <h3 className="font-semibold text-green-900">Pembayaran Berhasil</h3>
              <p className="text-green-700">Terima kasih, pembayaran Anda sudah kami terima.</p>
            </div>
          </div>
        )}

        {isVerifying && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-3 animate-in fade-in">
            <Loader2 className="w-5 h-5 text-amber-600 shrink-0 animate-spin" />
            <div className="space-y-1 text-sm">
              <h3 className="font-semibold text-amber-900">Memverifikasi Pembayaran</h3>
              <p className="text-amber-700">
                Waktu QR sudah habis. Jika Anda baru saja membayar, tunggu beberapa saat, halaman ini akan diperbarui otomatis.
              </p>
            </div>
          </div>
        )}

        {isFailed && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <div className="space-y-1 text-sm">
              <h3 className="font-semibold text-red-900">
                {status === 'EXPIRED' ? 'Pembayaran Kedaluwarsa' : 'Pembayaran Gagal'}
              </h3>
              <p className="text-red-700">Silakan checkout ulang paket pilihan Anda.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* QRIS Section — dominates */}
          <div className="col-span-1 md:col-span-7 min-w-0 flex flex-col items-center space-y-6">
            {!qrInactive && (
            <div className="flex items-center gap-2 text-sm font-semibold text-text-main">
              <QrCode className="w-4 h-4 text-primary" />
              <span>Scan QRIS untuk Membayar</span>
            </div>
            )}

            <div className="relative w-full max-w-70 mx-auto p-1 bg-white rounded-xl border border-canvas-border shadow-inner">
              {order.qrUrl ? (
                <img
                  src={order.qrUrl}
                  alt="QR Code Pembayaran"
                  className="w-65 h-65 object-contain transition-opacity"
                  style={{ opacity: qrInactive ? 0.25 : 1, filter: qrInactive ? 'grayscale(1)' : 'none' }}
                />
              ) : (
                <div className="w-65 h-65 bg-canvas-placeholder flex items-center justify-center text-xs text-text-muted">
                  QR Code tidak tersedia
                </div>
              )}

              {qrInactive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md rounded-xl p-4">
                  {isPaid ? (
                    <>
                      <CheckCircle2 className="w-10 h-10 mb-2 text-green-600" />
                      <span className="font-semibold text-sm text-green-700">Pembayaran Diterima</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-10 h-10 mb-2 text-red-600" />
                      <span className="font-semibold text-sm text-red-700">
                        {isVerifying ? 'Waktu QR Habis' : 'QR Code Kedaluwarsa'}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="w-full px-2 space-y-3">
              {/* Countdown */}
              {status === "PENDING" && (
                <div className="p-3 rounded-xl bg-surface-secondary/50 border border-canvas-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Sisa Waktu</span>
                  </div>
                  <span className={`font-mono text-lg font-bold ${qrInactive ? 'text-red-600' : 'text-primary'}`}>
                    {formatCountdown(timeLeft)}
                  </span>
                </div>
              )}

              {/* Download QRIS */}
              {!qrInactive && (
                <Button
                  variant="secondary"
                  fullWidth
                  className='px-4 py-1'
                  onClick={handleDownloadQR}
                  disabled={isDownloading || qrInactive}
                >
                    {isDownloading ? (
                      <span className="flex items-center gap-2">Download <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" /></span>
                    ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download QRIS
                    </>
                  )}
                  </Button>
              )}

              {/* Cara pembayaran singkat */}
              {!qrInactive && (
              <div className="bg-canvas-placeholder/30 rounded-xl p-3 text-xs leading-relaxed space-y-2">
                <div className="flex items-start gap-2 text-text-muted">
                  <Check className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
                  <span>Buka aplikasi m-banking atau e-wallet Anda.</span>
                </div>
                <div className="flex items-start gap-2 text-text-muted">
                  <Check className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
                  <span>Pilih menu <strong className="text-text-main">Scan QRIS</strong> lalu scan kode di atas.</span>
                </div>
                <div className="flex items-start gap-2 text-text-muted">
                  <Check className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
                  <span>Periksa nominal dan selesaikan pembayaran sebelum waktu habis.</span>
                </div>
              </div>
              )}
            </div>
          </div>

          {/* Detail Transaksi */}
          <div className="col-span-1 md:col-span-5 min-w-0 flex flex-col justify-between space-y-6 -mt-8 md:mt-0">
            <div className="bg-white rounded-2xl border border-canvas-border p-6 shadow-xs">
              <h2 className="text-lg font-serif text-text-main border-b border-canvas-border pb-3 mb-4">
                Detail Transaksi
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-1 min-w-0">
                  <span className="text-text-muted">No. Order</span>
                  <div className="flex items-center gap-2 min-w-0 font-mono text-[11px] font-semibold text-text-main">
                    <span className="truncate max-w-40">{order.orderNumber || order.orderId}</span>
                    <button
                      onClick={handleCopyOrderNumber}
                      className="p-1 hover:bg-canvas-placeholder rounded transition-colors text-text-muted hover:text-text-main"
                      title="Salin Nomor Order"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-text-muted">Paket Dipilih</span>
                  <span className="font-semibold text-text-main">{paket?.name || 'Paket Vbooth'}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-text-muted">Metode Pembayaran</span>
                  <span className="font-semibold text-text-main uppercase">{order.paymentMethod || 'QRIS'}</span>
                </div>

                {paket?.eventActivePeriod && (
                  <div className="flex justify-between items-center py-1 border-t border-canvas-border/50 pt-3 text-xs text-text-muted">
                    <span>Masa Aktif Acara</span>
                    <span className="font-medium text-text-main">{paket.eventActivePeriod} Hari</span>
                  </div>
                )}

                {paket?.maxGuest && (
                  <div className="flex justify-between items-center py-1 text-xs text-text-muted">
                    <span>Kapasitas Tamu</span>
                    <span className="font-medium text-text-main">{paket.maxGuest} Tamu</span>
                  </div>
                )}

                <div className="border-t border-canvas-border pt-3 flex justify-between items-baseline">
                  <span className="font-medium text-text-main">Total Pembayaran</span>
                  <span className="text-xl font-serif font-bold text-primary">
                    Rp {(order.amount || paket?.price || 0).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {isPaid ? (
                <Button variant="primary" fullWidth className="px-4 py-2" onClick={goToPayments}>
                  <CheckCircle2 className="w-4 h-4" />
                  Lihat Riwayat Pembayaran
                </Button>
              ) : isFailed ? (
                <Button variant="primary" fullWidth className="px-4 py-2" onClick={goToPackages}>
                  <RefreshCw className="w-4 h-4" />
                  Pilih Paket Baru
                </Button>
              ) : (
                <Button variant="secondary" fullWidth className="px-4 py-2" onClick={() => navigate('/dashboard/payments')}>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Cek Riwayat Pembayaran
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
