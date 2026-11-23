import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, CreditCard, Search, X, Receipt } from 'lucide-react';
import DashboardLayout from '../../components/templates/DashboardLayout';
import OrderStatusBadge from '@/components/atoms/OrderStatusBadge';
import Button from '@/components/atoms/Button';
import Pagination from '@/components/molecules/Pagination';
import OrderDetailModal from '@/components/organisms/OrderDetailModal';
import { getAllMyOrder, getMyOrderById } from '@/services/payment.service';
import type { OrderResponse, OrderStatus } from '@/types/payment.types';
import { setOrderState } from '@/utils/helper/storage';
import { errorAlert } from '@/utils/alert/alert';

const PAGE_SIZE = 10;

const STATUS_OPTIONS: { value: OrderStatus | ''; label: string }[] = [
  { value: '', label: 'Semua' },
  { value: 'PENDING', label: 'Menunggu' },
  { value: 'PAID', label: 'Lunas' },
  { value: 'EXPIRED', label: 'Kedaluwarsa' },
  { value: 'CANCELLED', label: 'Dibatalkan' },
  { value: 'FAILED', label: 'Gagal' },
  { value: 'REFUNDED', label: 'Dikembalikan' },
];

// Kolom: Paket | Tanggal | Metode | Jumlah | Status | Aksi
const ROW_GRID =
  'md:grid md:grid-cols-[minmax(0,2.4fr)_1.1fr_1fr_1.2fr_1.5fr_9rem] md:items-center md:gap-4';

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);

export default function PaymentsPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(0);

  // searchInput = isi kotak ketik, searchText = nilai yang sudah di-debounce & dikirim ke backend
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<OrderStatus | ''>('');

  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [detailOrderId, setDetailOrderId] = useState<string | null>(null);
  const [processingOrderId, setProcessingOrderId] = useState<string | null>(null);

  // Debounce input pencarian + reset ke halaman 1
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchText(searchInput.trim());
      setPage(1);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Ambil data setiap page / search / status berubah
  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      try {
        const res = await getAllMyOrder({
          page,
          size: PAGE_SIZE,
          sortBy: 'createdAt',
          direction: 'DESC',
          search: {
            keyword: searchText || undefined,
            status: filterStatus || undefined,
          },
        });
        if (ignore) return;
        setOrders(res.data ?? []);
        setTotalPages(res.totalPages);
        setTotalElements(res.totalElement);
      } catch {
        if (!ignore) errorAlert('Gagal memuat riwayat pembayaran');
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    // mencegah response lama menimpa response baru (race condition)
    return () => {
      ignore = true;
    };
  }, [page, searchText, filterStatus]);

  const hasFilter = searchText !== '' || filterStatus !== '';

  const handleStatusChange = (value: OrderStatus | '') => {
    setFilterStatus(value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchText('');
    setPage(1);
  };

  const handleResetFilter = () => {
    setSearchInput('');
    setSearchText('');
    setFilterStatus('');
    setPage(1);
  };

  const handleViewDetail = (id: string) => {
    setDetailOrderId(id);
    setShowDetailModal(true);
  };

  const handlePay = async (order: OrderResponse) => {
    setProcessingOrderId(order.id);
    try {
      const detail = await getMyOrderById(order.id);
      setOrderState({
        order: {
          orderId: detail.id,
          orderNumber: detail.orderNumber,
          amount: detail.amount,
          orderStatus: detail.status,
          paymentMethod: order.paymentMethod,
          qrUrl: detail.qrUrl,
          expiredAt: detail.expiredAt,
        },
        paket: detail.paket,
      });
      navigate('/dashboard/payment');
    } catch {
      errorAlert('Gagal memulai pembayaran');
    } finally {
      setProcessingOrderId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 space-y-1">
          <h1 className="text-3xl font-serif text-text-main">History Pembayaran</h1>
          <p className="text-text-muted">Lihat semua transaksi pembayaran paket Anda.</p>
        </div>

        {/* Search & Filter */}
        <div className="mb-5 space-y-3 rounded-2xl border border-canvas-border bg-white p-3 sm:p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari nomor order..."
              className="w-full rounded-xl border border-canvas-border bg-canvas-bg/60 py-3 pl-11 pr-10 text-sm text-text-main placeholder:text-canvas-muted transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Hapus pencarian"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-text-muted transition hover:bg-canvas-placeholder"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
              {STATUS_OPTIONS.map((opt) => {
                const active = filterStatus === opt.value;
                return (
                  <button
                    key={opt.value || 'ALL'}
                    type="button"
                    onClick={() => handleStatusChange(opt.value)}
                    className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? 'border-primary bg-primary text-white'
                        : 'border-canvas-border bg-white text-text-muted hover:border-primary/40 hover:text-text-main'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ringkasan hasil */}
        <div className="mb-3 flex items-center justify-between px-1 text-sm text-text-muted">
          <span>
            {loading ? 'Memuat...' : `${totalElements} transaksi`}
            {hasFilter && !loading ? ' ditemukan' : ''}
          </span>
          {hasFilter && (
            <button
              type="button"
              onClick={handleResetFilter}
              className="font-medium text-primary hover:text-primary-hover"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Daftar (baris) */}
        <div className="overflow-hidden rounded-2xl border border-canvas-border bg-white">
          {/* Header kolom (desktop saja) */}
          <div
            className={`hidden border-b border-canvas-border bg-canvas-bg px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted ${ROW_GRID}`}
          >
            <span>Paket</span>
            <span>Tanggal</span>
            <span>Metode</span>
            <span>Jumlah</span>
            <span>Status</span>
            <span className="text-right">Aksi</span>
          </div>

          <div className="divide-y divide-canvas-border/60">
            {/* Skeleton saat loading pertama */}
            {loading &&
              orders.length === 0 &&
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex animate-pulse items-center gap-4 px-5 py-5">
                  <div className="h-10 w-10 rounded-lg bg-canvas-placeholder" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-1/3 rounded bg-canvas-placeholder" />
                    <div className="h-3 w-1/4 rounded bg-canvas-placeholder" />
                  </div>
                  <div className="hidden h-4 w-24 rounded bg-canvas-placeholder md:block" />
                </div>
              ))}

            {/* Baris data */}
            {orders.map((order) => (
              <div
                key={order.id}
                className={`flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-canvas-bg/60 ${ROW_GRID} ${
                  loading ? 'opacity-60' : ''
                }`}
              >
                {/* Paket + nomor order */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-text-main">
                      {order.paketName || 'Paket'}
                    </p>
                    <p className="truncate font-mono text-xs text-text-muted">
                      {order.orderNumber}
                    </p>
                  </div>
                </div>

                {/* Tanggal + metode */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-muted md:contents">
                  <div className="md:block">
                    {order.paidAtDay ? (
                      <>
                        <span className="text-text-main">{order.paidAtDay}</span>
                        <span className="mx-1.5 md:hidden">•</span>
                        <span className="text-xs md:block">{order.paidAtTime}</span>
                      </>
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="h-4 w-4 shrink-0" />
                    <span className="truncate">{order.paymentMethod || '-'}</span>
                  </div>
                </div>

                {/* Jumlah + status */}
                <div className="flex items-center justify-between gap-3 md:contents">
                  <span className="font-mono text-base font-bold text-text-main">
                    {formatRupiah(order.amount)}
                  </span>
                  <div>
                    <OrderStatusBadge status={order.orderStatus} />
                  </div>
                </div>

                {/* Aksi */}
                <div className="flex gap-2 md:justify-end">
                  {order.orderStatus === 'PENDING' && (
                    <Button
                      variant="primary"
                      onClick={() => handlePay(order)}
                      disabled={processingOrderId === order.id}
                      className="px-3 py-2 text-xs"
                    >
                      {processingOrderId === order.id ? 'Memproses...' : 'Bayar'}
                    </Button>
                  )}
                  {(order.orderStatus === 'PAID' || order.orderStatus === 'PENDING') && (
                    <Button
                      variant="secondary"
                      onClick={() => handleViewDetail(order.id)}
                      className="px-3 py-2 text-xs"
                    >
                      Detail
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {/* Kosong */}
            {!loading && orders.length === 0 && (
              <div className="flex flex-col items-center gap-3 px-5 py-16 text-center text-text-muted">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-canvas-placeholder">
                  <Receipt className="h-6 w-6" />
                </div>
                <p className="font-medium text-text-main">
                  {hasFilter ? 'Tidak ada transaksi yang cocok' : 'Belum ada riwayat pembayaran'}
                </p>
                <p className="text-sm">
                  {hasFilter
                    ? 'Coba ubah kata kunci atau filter status.'
                    : 'Transaksi Anda akan muncul di sini.'}
                </p>
                {hasFilter && (
                  <button
                    type="button"
                    onClick={handleResetFilter}
                    className="text-sm font-medium text-primary hover:text-primary-hover"
                  >
                    Reset filter
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalElements > 0 && (
          <div className="mt-5">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalElements={totalElements}
              pageSize={PAGE_SIZE}
            />
          </div>
        )}

        {/* Detail Modal */}
        <OrderDetailModal
          orderId={detailOrderId}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          isAdmin={false}
        />
      </div>
    </DashboardLayout>
  );
}