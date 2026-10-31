import { useState, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Package, Receipt, User, LogOut, PartyPopper } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';
import { logout } from '../../services/auth.service';
import type { ApiErrorResponse } from '../../services/api';
import { errorAlert } from '../../utils/alert/alert';
import ConfirmDialog from '../organisms/ConfirmDialog';

interface DashboardLayoutProps {
  children: ReactNode;
}

const MENU_ITEMS = [
  { path: '/dashboard', label: 'Beranda', icon: Home },
  { path: '/dashboard/events', label: 'Event Saya', icon: Calendar },
  { path: '/dashboard/packages', label: 'Paket', icon: Package },
  { path: '/dashboard/payments', label: 'Pembayaran', icon: Receipt },
  { path: '/dashboard/account', label: 'Akun', icon: User },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const {reset} = useAuthStore();
  const location = useLocation();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleDialogLogoutOpen = ()=>{
    setIsLogoutDialogOpen(true);
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      reset();
      navigate("/login")
    } catch (error:unknown) {
      const err = error as ApiErrorResponse;
      const message = err.response?.data?.message||"Gagal Logout";
      errorAlert(message);   
    }finally{
      setIsLoggingOut(false);
      setIsLogoutDialogOpen(false)
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-canvas-bg text-text-main font-sans antialiased">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-canvas-border flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-canvas-border">
          <PartyPopper className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold text-primary tracking-tight">V-Booth</h1>
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
                  active
                    ? 'bg-primary text-white'
                    : 'text-text-main hover:bg-canvas-placeholder'
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
            onClick={handleDialogLogoutOpen}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pb-20 lg:pb-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-canvas-border sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <PartyPopper className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary tracking-tight">V-Booth</h1>
          </div>
          <div className="w-9 h-9 rounded-full bg-surface-secondary-border border border-canvas-border flex items-center justify-center">
            <span className="text-xs font-bold text-primary">VB</span>
          </div>
        </header>

        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-canvas-border z-20">
        <div className="flex items-center justify-around px-2 py-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  active ? 'text-primary' : 'text-text-muted'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <ConfirmDialog
      open={isLogoutDialogOpen}
      onOpenChange={setIsLogoutDialogOpen}
      title='Apakah Anda yakin ingin keluar?'
      onAction={handleLogout}
      isLoading={isLoggingOut}
      variant='danger'
      />
    </div>
  );
}
