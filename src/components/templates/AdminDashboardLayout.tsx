import { useState, type ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Package,
  Receipt,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  AlertCircle,
} from 'lucide-react';
import Button from '../atoms/Button';
import ConfirmDialog from '../organisms/ConfirmDialog';

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

const MENU_ITEMS = [
  { path: '/admin/dashboard', label: 'Beranda', icon: LayoutDashboard },
  { path: '/admin/users', label: 'Pengguna', icon: Users },
  { path: '/admin/events', label: 'Event', icon: CalendarDays },
  { path: '/admin/packages', label: 'Paket', icon: Package },
  { path: '/admin/payments', label: 'Pembayaran', icon: Receipt },
  { path: '/admin/reports', label: 'Laporan', icon: ChartNoAxesCombined },
  { path: '/admin/settings', label: 'Pengaturan', icon: Settings },
];

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Mobile warning
  if (isMobile) {
    return (
      <div className="min-h-screen bg-canvas-bg flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-lg p-6 border border-canvas-border space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="font-serif text-xl text-text-main">Desktop Only</h2>
            <p className="text-sm text-text-muted">
              Dashboard admin hanya dapat diakses melalui desktop atau laptop. Silakan buka kembali menggunakan perangkat desktop untuk melanjutkan.
            </p>
          </div>

          <Button
            variant="primary"
            fullWidth
            className="rounded-sm px-5 py-3"
            onClick={handleLogout}
            icon={<LogOut className="w-4 h-4" />}
          >
            Keluar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas-bg text-text-main font-sans antialiased">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-canvas-border flex-col flex">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-canvas-border">
          <span className="text-[11px] uppercase tracking-[0.24em] text-primary font-semibold">
            V-Booth Admin
          </span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  active ? 'bg-primary text-white' : 'text-text-main hover:bg-canvas-placeholder'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-canvas-border">
          <button
            onClick={() => setIsLogoutDialogOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-canvas-border px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-text-main">Admin Dashboard</h1>
          <div className="w-9 h-9 rounded-full bg-surface-secondary-border border border-canvas-border flex items-center justify-center">
            <span className="text-xs font-bold text-primary">AD</span>
          </div>
        </header>

        {children}
      </main>

      <ConfirmDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        title="Apakah Anda yakin ingin keluar?"
        onAction={handleLogout}
        variant="danger"
      />
    </div>
  );
}
