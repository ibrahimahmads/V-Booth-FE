import { useState, useEffect, useCallback } from 'react';
import AdminDashboardLayout from '../../components/templates/AdminDashboardLayout';
import OrderStatusBadge from '@/components/atoms/OrderStatusBadge';
import Button from '@/components/atoms/Button';
import InputField from '@/components/atoms/InputField';
import Pagination from '@/components/molecules/Pagination';
import OrderDetailModal from '@/components/organisms/OrderDetailModal';
import { getAllOrder } from '@/services/payment.service';
import type { OrderResponse, OrderStatus } from '@/types/payment.types';
import { errorAlert } from '@/utils/alert/alert';

const PAGE_SIZE = 10;

export default function AdminPaymentsPage() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<OrderStatus | ''>('');
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [detailOrderId, setDetailOrderId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await getAllOrder({
        page,
        size: PAGE_SIZE,
        sortBy: 'createdAt',
        direction: 'DESC',
        search: {
          orderNumber: searchText || undefined,
          status: filterStatus || undefined,
        },
      });
      setOrders(res.content);
      setTotalPages(res.totalPages);
      setTotalElements(res.totalElements);
    } catch {
      errorAlert('Gagal memuat data pembayaran');
    }
  }, [page, searchText, filterStatus]);

  useEffect(() => {
    const load = async () => {
      await fetchOrders();
    };
    load();
  }, [fetchOrders]);

  const handlePageChange = (p: number) => setPage(p);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleViewDetail = (id: string) => {
    setDetailOrderId(id);
    setShowDetailModal(true);
  };

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);

  return (
    <AdminDashboardLayout>
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-serif text-text-main">Manajemen Pembayaran</h1>
          <p className="text-text-muted">Kelola semua transaksi pembayaran pengguna.</p>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4 border border-canvas-border rounded-xl p-4 bg-white">
          <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row items-end gap-2 w-full lg:w-1/2">
            <label className="text-xs font-medium text-text-muted">Cari Nomor Order</label>
            <InputField
              label="Nomor Order"
              placeholder="Masukkan nomor order"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus((e.target as HTMLSelectElement).value as OrderStatus | '')
            }
            className="w-full px-4 py-3 rounded-sm border border-surface-border bg-white text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Semua Status</option>
            <option value="PENDING">Menunggu Pembayaran</option>
            <option value="PAID">Lunas</option>
            <option value="EXPIRED">Kedaluwarsa</option>
            <option value="CANCELLED">Dibatalkan</option>
            <option value="FAILED">Gagal</option>
            <option value="REFUNDED">Dikembalikan</option>
          </select>
        </div>

        {/* Table (desktop only) */}
        <div className="bg-white rounded-xl border border-canvas-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-b border-canvas-border">
              <thead className="bg-surface-secondary/40">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    No. Order
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Paket
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">
                    Nominal
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">
                    Waktu
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-canvas-border/50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-secondary/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-text-main">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-main">
                      {order.paketName || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-text-main text-right font-mono">
                      {formatRupiah(order.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusBadge status={order.orderStatus} />
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted hidden sm:table-cell text-right">
                      {order.paidAtDay} • {order.paidAtTime}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="secondary"
                        onClick={() => handleViewDetail(order.id)}
                        className="px-3 py-1.5 text-xs"
                      >
                        Detil
                      </Button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                      Tidak ada data pembayaran.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination with jump input */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalElements={totalElements}
          pageSize={PAGE_SIZE}
          showJumpInput
        />

        {/* Detail Modal */}
        <OrderDetailModal
          orderId={detailOrderId}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          isAdmin={true}
        />
      </div>
    </AdminDashboardLayout>
  );
}
