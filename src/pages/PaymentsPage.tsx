import { useState } from 'react';
import { CreditCard, Receipt, CheckCircle2, XCircle, Calendar, Package } from 'lucide-react';
import DashboardLayout from '../components/templates/DashboardLayout';

interface Payment {
  id: string;
  eventName: string;
  packageName: string;
  amount: string;
  status: 'success' | 'failed' | 'pending';
  date: string;
  method: string;
}

export default function PaymentsPage() {
  const [payments] = useState<Payment[]>([
    {
      id: '1',
      eventName: 'Pernikahan Rina & Farhan',
      packageName: 'Paket 02',
      amount: 'Rp 850.000',
      status: 'success',
      date: '1 Agustus 2026',
      method: 'Transfer Bank',
    },
    {
      id: '2',
      eventName: 'Ulang Tahun Rina',
      packageName: 'Paket 01',
      amount: 'Rp 450.000',
      status: 'success',
      date: '10 Oktober 2026',
      method: 'E-Wallet',
    },
    {
      id: '3',
      eventName: 'Gathering PT Maju',
      packageName: 'Paket 03',
      amount: 'Rp 1.200.000',
      status: 'failed',
      date: '12 April 2026',
      method: 'Transfer Bank',
    },
    {
      id: '4',
      eventName: 'Lamaran Ahmad & Siti',
      packageName: 'Paket 02',
      amount: 'Rp 850.000',
      status: 'pending',
      date: '25 Oktober 2026',
      method: 'Transfer Bank',
    },
  ]);

  const getStatusBadge = (status: Payment['status']) => {
    const styles = {
      success: 'bg-green-50 text-green-700 border-green-200',
      failed: 'bg-red-50 text-red-700 border-red-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    };
    const labels = {
      success: 'Berhasil',
      failed: 'Gagal',
      pending: 'Menunggu',
    };
    const icons = {
      success: <CheckCircle2 className="w-3.5 h-3.5" />,
      failed: <XCircle className="w-3.5 h-3.5" />,
      pending: <Receipt className="w-3.5 h-3.5" />,
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border ${styles[status]}`}>
        {icons[status]}
        {labels[status]}
      </span>
    );
  };

  const totalSuccess = payments.filter((p) => p.status === 'success').length;
  const totalFailed = payments.filter((p) => p.status === 'failed').length;
  const totalPending = payments.filter((p) => p.status === 'pending').length;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-serif text-text-main">History Pembayaran</h1>
          <p className="text-text-muted">Lihat semua transaksi pembayaran paket Anda.</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-canvas-border p-4">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">Berhasil</span>
            </div>
            <p className="text-2xl font-bold text-text-main">{totalSuccess}</p>
          </div>
          <div className="bg-white rounded-lg border border-canvas-border p-4">
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <XCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Gagal</span>
            </div>
            <p className="text-2xl font-bold text-text-main">{totalFailed}</p>
          </div>
          <div className="bg-white rounded-lg border border-canvas-border p-4">
            <div className="flex items-center gap-2 text-yellow-600 mb-1">
              <Receipt className="w-5 h-5" />
              <span className="text-sm font-medium">Menunggu</span>
            </div>
            <p className="text-2xl font-bold text-text-main">{totalPending}</p>
          </div>
        </div>

        {/* Payment List */}
        <div className="space-y-3">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white rounded-lg border border-canvas-border p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <CreditCard className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-text-main">{payment.eventName}</h3>
                      <p className="text-sm text-text-muted">{payment.packageName}</p>
                    </div>
                  </div>
                  <div className="ml-8 space-y-1 text-sm text-text-muted">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {payment.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      {payment.method}
                    </div>
                  </div>
                </div>

                <div className="text-right sm:text-right ml-8 sm:ml-0">
                  <p className="font-semibold text-lg text-text-main mb-1">{payment.amount}</p>
                  {getStatusBadge(payment.status)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {payments.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            <Receipt className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>Belum ada riwayat pembayaran.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
