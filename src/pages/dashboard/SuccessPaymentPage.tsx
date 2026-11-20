import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  AlertCircle, CalendarDays, Check, CheckCircle2, Copy, Images, Link2, Mic, Users,
} from 'lucide-react';
import DashboardLayout from '../../components/templates/DashboardLayout';
import Button from '@/components/atoms/Button';
import type { OrderState } from '@/types/payment.types';
import { getOrderState, removeOrderState } from '@/utils/helper/storage';

export default function SuccessPaymentPage() {
  const navigate = useNavigate();
  const [orderState] = useState<OrderState | null>((): OrderState | null => getOrderState());
  const [copied, setCopied] = useState<boolean>(false);

  // Tidak ada data checkout (misalnya tab baru atau data sudah dibersihkan)
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
              Detail transaksi tidak tersedia lagi. Anda dapat melihat transaksi Anda di riwayat pembayaran.
            </p>
          </div>
          <Button variant="primary" onClick={() => navigate('/dashboard/payments')}>
            Lihat Riwayat Pembayaran
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const { order, paket } = orderState;

  // Halaman ini hanya untuk order yang sudah lunas
  if (order.orderStatus !== 'PAID') {
    return <Navigate to="/dashboard/payment" replace />;
  }

  const amount = order.amount || paket?.price || 0;

  const benefits = [
    { icon: CalendarDays, label: 'Masa aktif acara', value: paket ? `${paket.eventActivePeriod} Hari` : '-' },
    { icon: Images, label: 'Masa aktif galeri', value: paket ? `${paket.galeryActivePeriod} Hari` : '-' },
    { icon: Users, label: 'Kapasitas tamu', value: paket ? `${paket.maxGuest} Tamu` : '-' },
    { icon: Mic, label: 'Foto & pesan suara', value: paket?.isCanPhotoAndVoice ? 'Tersedia' : 'Tidak tersedia' },
    { icon: Link2, label: 'URL slug custom', value: paket?.isUrlSlug ? 'Tersedia' : 'Tidak tersedia' },
  ];

  const handleCopyOrderNumber = () => {
    if (!order.orderNumber) return;
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // data checkout dibersihkan saat user meninggalkan halaman lewat tombol
  const leave = (path: string) => {
    removeOrderState();
    navigate(path);
  };

  return (
    <DashboardLayout>
      <div className="max-w-250 mx-auto py-8 px-4 space-y-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {/* Kartu utama */}
        <div className="bg-white rounded-2xl border border-canvas-border shadow-xs px-6 py-10 md:py-12 text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-serif text-text-main">Pembayaran Berhasil</h1>
            <p className="text-sm text-text-muted">Terima kasih, pembayaran Anda sudah kami terima.</p>
          </div>

          <div className="text-3xl md:text-4xl font-serif font-bold text-primary">
            Rp {amount.toLocaleString('id-ID')}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
            <Button
              variant="primary"
              fullWidth
              className="px-4 py-2.5"
              onClick={() => leave('/dashboard/payments')}
            >
              <CheckCircle2 className="w-4 h-4" />
              Lihat Riwayat Pembayaran
            </Button>
            <Button
              variant="secondary"
              fullWidth
              className="px-4 py-2.5"
              onClick={() => leave('/dashboard/packages')}
            >
              Kembali ke Paket
            </Button>
          </div>
        </div>

        {/* Detail transaksi + fasilitas paket */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-canvas-border p-6 shadow-xs min-w-0">
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

              <div className="flex justify-between items-center py-1">
                <span className="text-text-muted">Status</span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold border bg-green-100 text-green-700 border-green-200">
                  LUNAS
                </span>
              </div>

              <div className="border-t border-canvas-border pt-3 flex justify-between items-baseline">
                <span className="font-medium text-text-main">Total Pembayaran</span>
                <span className="text-xl font-serif font-bold text-primary">
                  Rp {amount.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-canvas-border p-6 shadow-xs min-w-0">
            <h2 className="text-lg font-serif text-text-main border-b border-canvas-border pb-3 mb-4">
              Fasilitas {paket?.name || 'Paket'}
            </h2>

            <ul className="space-y-4 text-sm">
              {benefits.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3 text-text-muted">
                    <span className="w-8 h-8 rounded-lg bg-canvas-placeholder/60 flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    {label}
                  </span>
                  <span className="font-semibold text-text-main text-right">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}