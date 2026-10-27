import { useState } from 'react';
import { Calendar, MapPin, Link2, Eye, Edit, PartyPopper } from 'lucide-react';
import DashboardLayout from '../components/templates/DashboardLayout';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  slug: string;
  greetingCount: number;
  status: 'active' | 'upcoming' | 'ended';
  packageName: string;
}

export default function EventsPage() {
  // Mock data - event yang sudah dibayar
  const [events] = useState<Event[]>([
    {
      id: '1',
      name: 'Pernikahan Rina & Farhan',
      date: '16 Agustus 2026',
      location: 'Gedung Graha Sativa, Jakarta',
      slug: 'rina-farhan-wedding',
      greetingCount: 24,
      status: 'active',
      packageName: 'Paket 02',
    },
    {
      id: '2',
      name: 'Ulang Tahun Rina',
      date: '20 Oktober 2026',
      location: 'Rumah Pribadi',
      slug: 'rina-birthday-2026',
      greetingCount: 12,
      status: 'upcoming',
      packageName: 'Paket 01',
    },
    {
      id: '3',
      name: 'Anniversary Perusahaan PT. Maju',
      date: '5 Mei 2026',
      location: 'Hotel Santika, Surabaya',
      slug: 'pt-maju-anniversary',
      greetingCount: 48,
      status: 'ended',
      packageName: 'Paket 03',
    },
  ]);

  const handleEditEvent = (eventId: string) => {
    console.log('Edit event:', eventId);
    // TODO: buka modal/page edit event
  };

  const handleViewGallery = (slug: string) => {
    console.log('View gallery:', slug);
    // TODO: nanti ke /{slug}/galery setelah backend ready
    // Untuk sekarang redirect ke /galery
    window.location.href = '/galery';
  };

  const getStatusBadge = (status: Event['status']) => {
    const styles = {
      active: 'bg-green-50 text-green-700 border-green-200',
      upcoming: 'bg-blue-50 text-blue-700 border-blue-200',
      ended: 'bg-gray-50 text-gray-600 border-gray-200',
    };
    const labels = {
      active: 'Berlangsung',
      upcoming: 'Akan Datang',
      ended: 'Selesai',
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-text-main">Event Saya</h1>
          <p className="text-text-muted mt-2">Kelola semua event yang sudah kamu buat.</p>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg border border-canvas-border p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-text-main">{event.name}</h3>
                    {getStatusBadge(event.status)}
                  </div>
                  <div className="space-y-1.5 text-sm text-text-muted">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link2 className="w-4 h-4" />
                      <code className="text-xs bg-canvas-placeholder px-2 py-0.5 rounded">
                        vbooth.my.id/{event.slug}
                      </code>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-primary font-semibold mb-1">
                    <PartyPopper className="w-5 h-5" />
                    {event.greetingCount}
                  </div>
                  <p className="text-xs text-text-muted">ucapan tamu</p>
                  <p className="text-xs text-text-muted mt-2">{event.packageName}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-canvas-border">
                <button
                  onClick={() => handleViewGallery(event.slug)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Lihat Galeri
                </button>
                <button
                  onClick={() => handleEditEvent(event.id)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-canvas-border text-text-main hover:bg-canvas-placeholder transition-colors text-sm font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Edit Detail
                </button>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>Belum ada event. Pilih paket untuk membuat event baru.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
