import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Plus, Pencil } from 'lucide-react';
import { getStoredGreetingId } from '../../utils/helper/storage';
import { useGreetingFormStore } from '../../stores/useGreetingStore';


export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasGreetingId, setHasGreetingId] = useState(false);
  const { resetForm } = useGreetingFormStore();

  useEffect(() => {
    const id = getStoredGreetingId();
    setHasGreetingId(!!id);
  }, [location.pathname]);

  const isGalleryActive = location.pathname === '/';
  const isBoothActive = location.pathname.startsWith('/booth');

  const handleActionClick = () => {
    if (hasGreetingId) {
      navigate('/booth/edit');
    } else {
      navigate('/booth/step-1');
    }
  };

  const handleGalery = () => {
    resetForm();
    navigate('/');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-canvas-bg/85 backdrop-blur-md border-t border-canvas-border px-6 py-2">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {/* Tombol Gallery */}
        <button
          onClick={handleGalery}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isGalleryActive ? 'text-primary font-bold' : 'text-text-muted hover:text-primary'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-[0.14em]">Gallery</span>
        </button>

        {/* Tombol Aksi (+ / Edit Pencil) */}
        <button
          onClick={handleActionClick}
          className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-sm transition-transform active:scale-95 ${
            isBoothActive
              ? 'bg-primary text-white shadow-primary/30'
              : 'bg-surface-secondary-border text-primary hover:bg-primary hover:text-white'
          }`}
        >
          {hasGreetingId ? (
            <Pencil className="w-5 h-5" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}