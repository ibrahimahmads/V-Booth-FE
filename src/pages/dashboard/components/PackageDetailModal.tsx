import { useState } from 'react';
import { CircleCheck, X, Loader2, ArrowRight } from 'lucide-react';
import type { Paket } from '@/types/paket.types';
import Button from '@/components/atoms/Button';
import { order } from '@/services/payment.service';
import type { ApiErrorResponse } from '@/services/api';
import { errorAlertWithTitle } from '@/utils/alert/alert';
import { useNavigate } from 'react-router-dom';
import type { OrderState } from '@/types/payment.types';
import { setOrderState } from '@/utils/helper/storage';

interface PackageDetailModalProps {
  isOpen: boolean;
  paket: Paket | null;
  onClose: () => void;
}

export default function PackageDetailModal({ isOpen, paket, onClose }: PackageDetailModalProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !paket) return null;

  const handleCheckout = async () => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const checkoutRes = await order(paket.id);
      
      // Simpan data ke sessionStorage agar bertahan saat page refresh
      const orderState:OrderState = {
        order: checkoutRes,
        paket: paket,
      };
      setOrderState(orderState);
      onClose();
      navigate('/dashboard/payment');
    } catch (error: unknown) {
      const err = error as ApiErrorResponse;
      const msg = err.response?.data?.message || 'Gagal membuat order checkout';
      errorAlertWithTitle('Checkout Gagal', msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-canvas-border max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="p-6 border-b border-canvas-border flex items-center justify-between bg-surface-secondary/30">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-text-muted">
              Detail Paket
            </span>
            <h2 className="text-2xl font-serif text-text-main mt-0.5">{paket.name}</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 rounded-full hover:bg-canvas-placeholder text-text-muted hover:text-text-main transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Detail */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <p className="text-sm text-text-muted leading-relaxed">{paket.description}</p>

          <div className="bg-canvas-placeholder/50 rounded-xl p-4 space-y-3 text-sm">
            <div className="flex justify-between items-center py-1 border-b border-canvas-border/50">
              <span className="text-text-muted">Masa Aktif Acara</span>
              <span className="font-semibold text-text-main">{paket.eventActivePeriod} Hari</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-canvas-border/50">
              <span className="text-text-muted">Masa Aktif Galeri</span>
              <span className="font-semibold text-text-main">{paket.galeryActivePeriod} Hari</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-canvas-border/50">
              <span className="text-text-muted">Kapasitas Tamu</span>
              <span className="font-semibold text-text-main">{paket.maxGuest} Tamu</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-canvas-border/50">
              <span className="text-text-muted">Foto & Pesan Suara</span>
              <span className="font-semibold text-text-main flex items-center gap-1">
                {paket.isCanPhotoAndVoice ? (
                  <>
                    <CircleCheck className="w-4 h-4 text-green-600" />
                    <span>Tersedia</span>
                  </>
                ) : (
                  <span>-</span>
                )}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-text-muted">URL Slug Custom</span>
              <span className="font-semibold text-text-main flex items-center gap-1">
                {paket.isUrlSlug ? (
                  <>
                    <CircleCheck className="w-4 h-4 text-green-600" />
                    <span>Tersedia</span>
                  </>
                ) : (
                  <span>-</span>
                )}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-baseline pt-2">
            <span className="text-sm text-text-muted">Total Pembayaran:</span>
            <span className="text-2xl font-serif font-bold text-primary">
              Rp {paket.price.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-canvas-border bg-surface-secondary/20 flex gap-3">
          <Button
            variant="secondary"
            className="rounded-sm px-4 py-2.5"
            fullWidth
            onClick={onClose}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button
            variant="primary"
            className="rounded-sm px-4 py-2.5"
            fullWidth
            onClick={handleCheckout}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                Checkout
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
