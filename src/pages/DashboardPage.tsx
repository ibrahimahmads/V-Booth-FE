import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Settings, LogOut, Calendar, Gift, PartyPopper } from 'lucide-react';
import Header from '../components/molecules/Header';

interface Event {
  id: string;
  name: string;
  date: string;
  greetingCount: number;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [userName] = useState('Ahmad Ibrahim');

  // Mock data - nanti ganti dengan API call
  const mockEvents: Event[] = [
    { id: '1', name: 'Pernikahan Rina & Farhan', date: '16 Agustus 2026', greetingCount: 24 },
    { id: '2', name: 'Ulang Tahun Rina', date: '20 Oktober 2026', greetingCount: 12 },
  ];

  const mockRecentGreetings = [
    { id: '1', guestName: 'Budi Santoso', event: 'Pernikahan Rina & Farhan', time: '2 jam lalu' },
    { id: '2', guestName: 'Siti Nurhaliza', event: 'Pernikahan Rina & Farhan', time: '5 jam lalu' },
    { id: '3', guestName: 'Rizki Pratama', event: 'Ulang Tahun Rina', time: '1 hari lalu' },
  ];

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-canvas-bg text-text-main font-sans antialiased">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8 pb-12">
        {/* Welcome Section */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-serif text-text-main">Selamat datang, {userName}!</h1>
          <p className="text-text-muted">Kelola event dan lihat ucapan dari tamu-tamu Anda.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate('/booth/step-1')}
            className="flex items-center gap-3 p-4 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <div className="text-left">
              <p className="font-semibold text-sm">Buat Event Baru</p>
              <p className="text-xs opacity-90">Mulai photo booth</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/galery')}
            className="flex items-center gap-3 p-4 rounded-lg bg-white border border-canvas-border text-text-main hover:border-primary transition-colors shadow-sm"
          >
            <Gift className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="font-semibold text-sm">Lihat Galeri</p>
              <p className="text-xs text-text-muted">Semua ucapan</p>
            </div>
          </button>
        </div>

        {/* My Events */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Event Saya</h2>
          </div>

          <div className="space-y-3">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => navigate('/galery')}
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

        {/* Recent Greetings */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Ucapan Terbaru</h2>
          </div>

          <div className="space-y-2">
            {mockRecentGreetings.map((greeting) => (
              <div
                key={greeting.id}
                onClick={() => navigate('/galery')}
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

        {/* Actions Footer */}
        <div className="flex gap-3 pt-4 border-t border-canvas-border">
          <button
            onClick={() => navigate('/settings')}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white border border-canvas-border text-text-main hover:bg-canvas-placeholder transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Pengaturan</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Keluar</span>
          </button>
        </div>
      </main>
    </div>
  );
}
