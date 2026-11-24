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
import { errorAlert, errorAlertWithTitle } from '@/utils/alert/alert';
import type { ApiErrorResponse } from '@/services/api';
import { getAllPaket } from '@/services/paket.service';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { usePaketStore } from '@/stores/usePaketStore';

const PAGE_SIZE = 10;

const STATUS_OPTIONS: { value: OrderStatus | ''; label: string }[] = [
  { value: '', label: 'Semua' },
  { value: 'PENDING', label: 'Menunggu' },
  { value: 'PAID', label: 'Lunas' },
  { value: 'EXPIRED', label: 'Kedaluwarsa' },
  { value: 'REFUNDED', label: 'Dikembalikan' },
];

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);

export default function PaymentsPage() {
  const navigate = useNavigate();
  const {setIsLoading} = useLoadingStore();
  const {listPaket, setListPaket,getPaketById} = usePaketStore();

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

  const fetchListPaket = async()=>{
    try {
      setIsLoading(true);
      const res = await getAllPaket();
      setListPaket(res);
    } catch (error:unknown) {
          const err = error as ApiErrorResponse;
          const msg = err.response?.data?.message||"Gagal ambil data paket";
          errorAlertWithTitle("Failed Fetch List Paket",msg)
        }finally{
          setIsLoading(false);
        }
      }

  useEffect(()=>{
      if(listPaket.length == 0){
        fetchListPaket();
      }
    },[])


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
      const paket = getPaketById(detail.paket.id);
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
        paket: paket,
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
              placeholder="Cari history pembayaran..."
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
          <div className="md:overflow-x-auto">
            <table className="block w-full text-left text-sm md:table md:min-w-190">
              <thead className="hidden border-b border-canvas-border bg-canvas-bg text-xs font-semibold uppercase tracking-wide text-text-muted md:table-header-group">
                <tr>
                  <th scope="col" className="px-5 py-3">Paket</th>
                  <th scope="col" className="px-4 py-3">Tanggal Bayar</th>
                  <th scope="col" className="px-4 py-3">Metode Pembayaran</th>
                  <th scope="col" className="px-4 py-3">Jumlah</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>

              <tbody className="block divide-y divide-canvas-border/60 md:table-row-group">
                {/* Skeleton saat loading pertama */}
                {loading &&
                  orders.length === 0 &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="block animate-pulse px-4 py-5 md:table-row md:p-0">
                      <td className="block md:table-cell md:px-5 md:py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-canvas-placeholder" />
                          <div className="flex-1 space-y-2">
                            <div className="h-3.5 w-24 rounded bg-canvas-placeholder" />
                            <div className="h-3 w-32 rounded bg-canvas-placeholder" />
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-4 py-5 md:table-cell"><div className="h-4 w-20 rounded bg-canvas-placeholder" /></td>
                      <td className="hidden px-4 py-5 md:table-cell"><div className="h-4 w-16 rounded bg-canvas-placeholder" /></td>
                      <td className="hidden px-4 py-5 md:table-cell"><div className="h-4 w-20 rounded bg-canvas-placeholder" /></td>
                      <td className="hidden px-4 py-5 md:table-cell"><div className="h-4 w-24 rounded bg-canvas-placeholder" /></td>
                      <td className="hidden px-5 py-5 md:table-cell"><div className="ml-auto h-4 w-16 rounded bg-canvas-placeholder" /></td>
                    </tr>
                  ))}

                {/* Baris data */}
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className={`flex flex-wrap items-center gap-y-3 px-4 py-4 transition-colors hover:bg-canvas-bg/60 md:table-row md:p-0 ${
                      loading ? 'opacity-60' : ''
                    }`}
                  >
                    {/* Paket + nomor order */}
                    <td className="w-full md:table-cell md:w-auto md:max-w-65 md:px-5 md:py-4">
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
                    </td>

                    {/* Tanggal bayar */}
                    <td className="w-1/2 pr-2 text-text-muted md:table-cell md:w-auto md:px-4 md:py-4">
                      <span className="block text-[11px] uppercase tracking-wide md:hidden">Tanggal Bayar</span>
                      {order.paidAtDay ? (
                        <>
                          <span className="block text-text-main">{order.paidAtDay}</span>
                          <span className="block text-xs">{order.paidAtTime} WIB</span>
                        </>
                      ) : (
                        '-'
                      )}
                    </td>

                    {/* Metode pembayaran */}
                    <td className="w-1/2 pl-2 text-text-muted md:table-cell md:w-auto md:px-4 md:py-4">
                      <span className="block text-[11px] uppercase tracking-wide md:hidden">Metode</span>
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="h-4 w-4 shrink-0" />
                        <span className="truncate">{order.paymentMethod || '-'}</span>
                      </div>
                    </td>

                    {/* Jumlah */}
                    <td className="w-1/2 pr-2 font-mono text-base font-bold text-text-main md:table-cell md:w-auto md:px-4 md:py-4">
                      {formatRupiah(order.amount)}
                    </td>

                    {/* Status */}
                    <td className="w-1/2 pl-2 md:table-cell md:w-auto md:px-4 md:py-4">
                      <OrderStatusBadge status={order.orderStatus} />
                    </td>

                    {/* Aksi */}
                    <td className="w-full md:table-cell md:w-auto md:px-5 md:py-4">
                      <div className="flex gap-2 md:justify-end *:flex-1 md:*:flex-none">
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
                    </td>
                  </tr>
                ))}

                {/* Kosong */}
                {!loading && orders.length === 0 && (
                  <tr className="block md:table-row">
                    <td colSpan={6} className="block px-5 py-16 md:table-cell">
                      <div className="flex flex-col items-center gap-3 text-center text-text-muted">
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
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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