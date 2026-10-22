import { useState } from 'react';
import GreetingCard from '../organisms/GreetingCard';
import Header from '../molecules/Header';
import BottomNav from '../molecules/BottomNav';
import type { GreetingResponse } from '../../types/greeting.types';
import GreetingDetailModal from '../organisms/GreetingDetailModel';
import GalleryHeaderEventSkeleton from '../skeletons/GalleryHeaderEventSkeleton';

interface GalleryTemplateProps {
  greetings: GreetingResponse[];
  loading: boolean;
  onNavigateToAdd: () => void;
}

export default function GalleryTemplate({
  greetings,
  loading,
}: GalleryTemplateProps) {
  const [selectedGreeting, setSelectedGreeting] = useState<GreetingResponse | null>(null);
  const isGreetingsArray = Array.isArray(greetings);

  return (
    <div className="min-h-screen bg-canvas-bg text-text-main flex flex-col justify-between pb-24 font-sans antialiased">
      <Header />

      {loading ? (
        <GalleryHeaderEventSkeleton/>
      ) : (
        <div className="text-center py-8 px-4 space-y-1.5 border-b border-canvas-border bg-white shadow-xs">
          <span className="text-[11px] uppercase tracking-[0.24em] text-primary font-semibold">
            WEDDING MEMORIES OF
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-text-main">
            Rina & Farhan
          </h2>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">16 AGUSTUS 2026</p>
        </div>
      )}

      <main className="max-w-md w-full mx-auto px-4 py-6 flex-1">
        {loading && (
          <div className="grid grid-cols-2 gap-3.5">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-canvas-placeholder animate-pulse" />
            ))}
          </div>
        )}

        {!loading && (!isGreetingsArray || greetings.length === 0) && (
          <div className="text-center py-16 space-y-3 bg-white border border-canvas-border rounded-3xl p-6 shadow-xs">
            <p className="text-sm text-text-muted">Belum ada ucapan. Jadilah yang pertama!</p>
          </div>
        )}

        {!loading && isGreetingsArray && greetings.length > 0 && (
          <div className="grid grid-cols-2 gap-3.5">
            {greetings.map((item, index) => (
              <GreetingCard
                key={index}
                greeting={item}
                onClick={() => setSelectedGreeting(item)}
              />
            ))}
          </div>
        )}
      </main>

      <GreetingDetailModal
        isOpen={Boolean(selectedGreeting)}
        greeting={selectedGreeting}
        onClose={() => setSelectedGreeting(null)}
      />

      <BottomNav/>
    </div>
  );
}
