import { Routes, Route, Navigate } from 'react-router-dom';
import GalleryPage from '../pages/GalleryPage';
import Step1CapturePage from '../pages/Step1CapturePage';
import Step2FramePage from '../pages/Step2FramePage';
import Step3AudioPage from '../pages/Step3AudioPage';
import Step4ReviewPage from '../pages/Step4ReviewPage';
import SuccessPage from '../pages/SuccessPage';
import NotFoundPage from '../pages/NotFoundPage';
import EditGreetingPage from '../pages/EditGreetingPage';
import GreetingDetailPage from '../pages/GreetingDetailPage';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PlaceholderPage from '../pages/PlaceholderPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import EventsPage from '../pages/dashboard/EventsPage';
import PackagesPage from '../pages/dashboard/PackagesPage';
import PaymentsPage from '../pages/dashboard/PaymentsPage';
import AccountPage from '../pages/dashboard/AccountPage';
import PaymentPage from '../pages/dashboard/PaymentPage';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminEventsPage from '../pages/admin/AdminEventsPage';
import AdminPackagesPage from '../pages/admin/AdminPackagesPage';
import AdminPaymentsPage from '../pages/admin/AdminPaymentsPage';
import AdminReportsPage from '../pages/admin/AdminReportsPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';
import { useAuthStore } from '@/stores/useAuthStore';
import SuccessPaymentPage from '@/pages/dashboard/SuccessPaymentPage';

// Admin route guard
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { account } = useAuthStore();
  return account?.role == "ADMIN" ? <>{children}</> : <Navigate to="/admin/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. Halaman Utama / Galeri Memori */}
      <Route path="/" element={<LandingPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/account" element={<AccountPage />} />
      <Route path="/dashboard/events" element={<EventsPage />} />
      <Route path="/dashboard/packages" element={<PackagesPage />} />
      <Route path="/dashboard/payments" element={<PaymentsPage />} />
      <Route path="/dashboard/payment" element={<PaymentPage />} />
      <Route path="/dashboard/payment/success" element={<SuccessPaymentPage />} />
      <Route path="/galery" element={<GalleryPage />} />
      <Route path="/booth/step-1" element={<Step1CapturePage />} />
      <Route path="/booth/step-2" element={<Step2FramePage />} />
      <Route path="/booth/step-3" element={<Step3AudioPage />} />
      <Route path="/booth/step-4" element={<Step4ReviewPage />} />
      <Route path="/booth/edit" element={<EditGreetingPage />} />
      <Route path="/greeting/:id" element={<GreetingDetailPage />} />

      <Route path="/booth/success" element={<SuccessPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/demo"
        element={
          <PlaceholderPage
            title="Demo V-Booth"
            note="Simulasi pengalaman tamu akan segera hadir. Saat ini kamu bisa mencoba alur tamu dari halaman beranda."
          />
        }
      />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsersPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/events"
        element={
          <AdminRoute>
            <AdminEventsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/packages"
        element={
          <AdminRoute>
            <AdminPackagesPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/payments"
        element={
          <AdminRoute>
            <AdminPaymentsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <AdminRoute>
            <AdminReportsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <AdminRoute>
            <AdminSettingsPage />
          </AdminRoute>
        }
      />

      {/* Wildcard Fallback: Jika URL tidak ditemukan, kembalikan ke Gallery */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}