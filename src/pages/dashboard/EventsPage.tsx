import { Calendar, MapPin, Link2, Eye, Edit, PartyPopper, Search, X, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import DashboardLayout from '../../components/templates/DashboardLayout';
import { useEffect, useState } from 'react';
import type { EventResponse, EventStatus } from '@/types/event.types';
import type { ApiErrorResponse } from '@/services/api';
import { errorAlert, errorAlertWithTitle } from '@/utils/alert/alert';
import { getAllMyEvents } from '@/services/event.service';
import EventStatusBadge from '@/components/atoms/EventStatusBadge';
import Pagination from '@/components/molecules/Pagination';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import EditEventModal from '@/components/organisms/EditEventModal';

const PAGE_SIZE = 5;

type SortBy = 'createdAt' | 'eventName' | 'eventDate';
type Direction = 'ASC' | 'DESC';

const STATUS_OPTIONS: { value: EventStatus | ''; label: string }[] = [
  { value: '', label: 'Semua' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'ACTIVE', label: 'Aktif' },
  { value: 'COMPLETED', label: 'Selesai' },
  { value: 'ARCHIVED', label: 'Diarsipkan' },
  { value: 'CANCELLED', label: 'Dibatalkan' },
];

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'createdAt', label: 'Terbaru dibuat' },
  { value: 'eventName', label: 'Nama event' },
  { value: 'eventDate', label: 'Tanggal event' },
];

const getDirectionLabels = (sortBy: SortBy): Record<Direction, string> =>
  sortBy === 'eventName'
    ? { ASC: 'A → Z', DESC: 'Z → A' }
    : { ASC: 'Terlama dulu', DESC: 'Terbaru dulu' };

export default function EventsPage() {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<boolean>(false);

  // searchInput = isi kotak ketik, searchText = nilai yang sudah di-debounce & dikirim ke backend
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<EventStatus | ''>('');
  const [sortBy, setSortBy] = useState<SortBy>('createdAt');
  const [direction, setDirection] = useState<Direction>('DESC');

  // Debounce input pencarian + reset ke halaman 1
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchText(searchInput.trim());
      setPage(1);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Ambil data setiap page / search / status / sorting berubah
  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      try {
        const res = await getAllMyEvents({
          page,
          size: PAGE_SIZE,
          sortBy,
          direction,
          search: {
            keyword: searchText || undefined,
            status: filterStatus || undefined,
          },
        });
        if (ignore) return;
        setEvents(res.data ?? []);
        setTotalPages(res.totalPages);
        setTotalElements(res.totalElement);
      } catch (error: unknown) {
        if (ignore) return;
        const err = error as ApiErrorResponse;
        const msg = err.response?.data?.message || 'Gagal dapat data event';
        errorAlert(msg);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    // mencegah response lama menimpa response baru (race condition)
    return () => {
      ignore = true;
    };
  }, [page, searchText, filterStatus, sortBy, direction, refreshKey]);

  const hasFilter = searchText !== '' || filterStatus !== '';

  const handleStatusChange = (value: EventStatus | '') => {
    setFilterStatus(value);
    setPage(1);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value as SortBy);
    setPage(1);
  };

  const handleDirectionChange = (value: string) => {
    setDirection(value as Direction);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchText('');
    setPage(1);
  };

  const handleResetFilter = () => {
    setSearchInput('');
    setSearchText('');
    setFilterStatus('');
    setPage(1);
  };

  const handleEditEvent = (eventId: string) => {
    console.log('Edit event:', eventId);
    setEditEventId(eventId);
    // TODO: buka modal/page edit event
  };

  const handleViewGallery = (slug: string) => {
    console.log('View gallery:', slug);
    if(!slug){
      errorAlertWithTitle("Lengkapi data event terlebih dahulu","Galeri akan aktif setelah detail event Anda isi. Klik Edit Detail untuk melengkapinya.");
      return;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-text-main">Event Saya</h1>
          <p className="text-text-muted mt-2">Kelola semua event yang sudah kamu buat.</p>
        </div>

        {/* Search, Filter & Sorting */}
        <div className="mb-5 space-y-3 rounded-2xl border border-canvas-border bg-white p-3 sm:p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari event..."
              className="w-full rounded-xl border border-canvas-border bg-canvas-bg/60 py-3 pl-11 pr-10 text-sm text-text-main placeholder:text-canvas-muted transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Hapus pencarian"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-text-muted transition hover:bg-canvas-placeholder"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Filter status */}
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
              {STATUS_OPTIONS.map((opt) => {
                const active = filterStatus === opt.value;
                return (
                  <button
                    key={opt.value || 'ALL'}
                    type="button"
                    onClick={() => handleStatusChange(opt.value)}
                    className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? 'border-primary bg-primary text-white'
                        : 'border-canvas-border bg-white text-text-muted hover:border-primary/40 hover:text-text-main'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Sorting */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="flex w-full shrink-0 items-center gap-2 rounded-xl border border-canvas-border bg-white px-3.5 py-2 text-xs font-medium transition hover:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 data-popup-open:border-primary data-popup-open:ring-2 data-popup-open:ring-primary/20 md:w-auto"
                  />
                }
              >
                <ArrowUpDown className="h-4 w-4 text-text-muted" />
                <span className="text-text-muted">Urutkan:</span>
                <span className="text-text-main">
                  {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                </span>
                {direction === 'ASC' ? (
                  <ArrowUp className="ml-auto h-3.5 w-3.5 text-primary md:ml-0" />
                ) : (
                  <ArrowDown className="ml-auto h-3.5 w-3.5 text-primary md:ml-0" />
                )}
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-[11px] uppercase tracking-wide text-text-muted">
                    Urutkan berdasarkan
                  </DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSortByChange}>
                    {SORT_OPTIONS.map((opt) => (
                      <DropdownMenuRadioItem
                        key={opt.value}
                        value={opt.value}
                        className="focus:bg-primary/10 focus:text-primary"
                      >
                        {opt.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-[11px] uppercase tracking-wide text-text-muted">
                    Arah urutan
                  </DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={direction} onValueChange={handleDirectionChange}>
                    {(['DESC', 'ASC'] as Direction[]).map((dir) => (
                      <DropdownMenuRadioItem
                        key={dir}
                        value={dir}
                        className="focus:bg-primary/10 focus:text-primary"
                      >
                        {getDirectionLabels(sortBy)[dir]}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Ringkasan hasil */}
        <div className="mb-3 flex items-center justify-between px-1 text-sm text-text-muted">
          <span>
            {loading ? 'Memuat...' : `${totalElements} event`}
            {hasFilter && !loading ? ' ditemukan' : ''}
          </span>
          {hasFilter && (
            <button
              type="button"
              onClick={handleResetFilter}
              className="font-medium text-primary hover:text-primary-hover"
            >
              Reset filter
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* Skeleton saat loading pertama */}
          {loading &&
            events.length === 0 &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-lg border border-canvas-border p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-48 rounded bg-canvas-placeholder" />
                      <div className="h-5 w-16 rounded-full bg-canvas-placeholder" />
                    </div>
                    <div className="h-4 w-40 rounded bg-canvas-placeholder" />
                    <div className="h-4 w-56 rounded bg-canvas-placeholder" />
                    <div className="h-4 w-44 rounded bg-canvas-placeholder" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="h-5 w-14 rounded bg-canvas-placeholder" />
                    <div className="h-3 w-16 rounded bg-canvas-placeholder" />
                    <div className="h-3 w-20 rounded bg-canvas-placeholder" />
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-canvas-border">
                  <div className="h-9 w-32 rounded-lg bg-canvas-placeholder" />
                  <div className="h-9 w-32 rounded-lg bg-canvas-placeholder" />
                </div>
              </div>
            ))}

          {events.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-lg border border-canvas-border p-5 hover:shadow-md transition-shadow ${
                loading ? 'opacity-60' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-text-main">{event.eventName}</h3>
                    <EventStatusBadge status={event.eventStatus}/>
                  </div>
                  <div className="space-y-1.5 text-sm text-text-muted">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.eventDate?event.eventDate:"_"}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.eventLocation?event.eventLocation:"_"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link2 className="w-4 h-4" />
                      <code className="text-xs bg-canvas-placeholder px-2 py-0.5 rounded">
                        {event.slug?"vbooth.my.id/"+event.slug:"Url belum di update"} 
                      </code>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-primary font-semibold mb-1">
                    <PartyPopper className="w-5 h-5" />
                    {event.numberOfGreetings} / {event.paket.maxGreetings}
                  </div>
                  <p className="text-xs text-text-muted">ucapan tamu</p>
                  <p className="text-xs text-text-muted mt-2">{event.paket.name}</p>
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

        {!loading && events.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>
              {hasFilter
                ? 'Tidak ada event yang cocok dengan pencarian atau filter.'
                : 'Belum ada event. Pilih paket untuk membuat event baru.'}
            </p>
            {hasFilter && (
              <button
                type="button"
                onClick={handleResetFilter}
                className="mt-3 text-sm font-medium text-primary hover:text-primary-hover"
              >
                Reset filter
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalElements > 0 && (
          <div className="mt-5">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalElements={totalElements}
              pageSize={PAGE_SIZE}
            />
          </div>
        )}
      </div>

      <EditEventModal
        isOpen={editEventId !== null}
        eventId={editEventId}
        onClose={() => setEditEventId(null)}
        onSuccess={() => setRefreshKey((prev) => !prev)}
      />
    </DashboardLayout>
  );
}