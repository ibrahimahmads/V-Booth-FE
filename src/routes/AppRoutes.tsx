import { Routes, Route} from 'react-router-dom';
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

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. Halaman Utama / Galeri Memori */}
      <Route path="/" element={<LandingPage />} />

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

      {/* Wildcard Fallback: Jika URL tidak ditemukan, kembalikan ke Gallery */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}