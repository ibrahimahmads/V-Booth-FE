import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Gift, PartyPopper } from 'lucide-react';
import DashboardLayout from '../../components/templates/DashboardLayout';
import { useAuthStore } from '../../stores/useAuthStore';
import { useLoadingStore } from '../../stores/useLoadingStore';
import { getMyAccount } from '../../services/account.service';
import type { ApiErrorResponse } from '../../services/api';
import { errorAlertWithTitle } from '../../utils/alert/alert';
import DashboardSkeleton from './components/DashboardSkeleton';

interface Event {
  id: string;
  name: string;
  date: string;
  greetingCount: number;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useLoadingStore();
  const { account, setAccount, reset } = useAuthStore();

  const fetchDataAccount = async () => {
      try {
        setIsLoading(true);
        const data = await getMyAccount();
        setAccount(data);
      } catch (error:unknown) {
        const err = error as ApiErrorResponse;
        const message = err.response?.data?.message||"Tolong login kembali";
        errorAlertWithTitle("Gagal mengambil data",message);
        reset();
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    if(account == null){
      fetchDataAccount();
    }
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  const mockEvents: Event[] = [
    { id: '1', name: 'Pernikahan Rina & Farhan', date: '16 Agustus 2026', greetingCount: 24 },
    { id: '2', name: 'Ulang Tahun Rina', date: '20 Oktober 2026', greetingCount: 12 },
  ];

  const mockRecentGreetings = [
    { id: '1', guestName: 'Budi Santoso', event: 'Pernikahan Rina & Farhan', time: '2 jam lalu' },
    { id: '2', guestName: 'Siti Nurhaliza', event: 'Pernikahan Rina & Farhan', time: '5 jam lalu' },
    { id: '3', guestName: 'Rizki Pratama', event: 'Ulang Tahun Rina', time: '1 hari lalu' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-serif text-text-main">Selamat datang, {account?.name}!</h1>
          <p className="text-text-muted">Kelola event dan lihat ucapan dari tamu-tamu Anda.</p>
        </div>

        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard/packages')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Buat Event Baru</span>
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Event Saya</h2>
          </div>

          <div className="space-y-3">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => navigate('/dashboard/events')}
                className="flex items-start justify-between p-4 bg-white rounded-lg border border-canvas-border hover:border-primary hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-text-main">{event.name}</h3>
                  <p className="text-sm text-text-muted mt-1">{event.date}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-primary font-semibold">
                    <PartyPopper className="w-4 h-4" />
                    {event.greetingCount}
                  </div>
                  <p className="text-xs text-text-muted">ucapan</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Ucapan Terbaru</h2>
          </div>

          <div className="space-y-2">
            {mockRecentGreetings.map((greeting) => (
              <div
                key={greeting.id}
                onClick={() => navigate('/dashboard/events')}
                className="p-3 bg-white rounded-lg border border-canvas-border hover:border-primary transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm text-text-main">{greeting.guestName}</p>
                    <p className="text-xs text-text-muted mt-1">{greeting.event}</p>
                  </div>
                  <p className="text-xs text-text-muted">{greeting.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
