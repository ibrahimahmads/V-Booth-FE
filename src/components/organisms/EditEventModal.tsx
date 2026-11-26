import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X } from 'lucide-react';
import type {
  EditEventFormValues,
  EventResponse,
  EventType,
  EventUpdateRequest,
} from '@/types/event.types';
import type { ApiErrorResponse } from '@/services/api';
import { getMyDetailEvent, updateEvent } from '@/services/event.service';
import { errorAlert } from '@/utils/alert/alert';
import EditEventFormSkeleton from '../skeletons/EditFormSkeleton';
import InputTime24Hour from '../molecules/InputTime24Hour';

interface EditEventModalProps {
  isOpen: boolean;
  eventId: string | null;
  onClose: () => void;
  onSuccess: (updated: EventResponse) => void;
}

const EVENT_TYPE_OPTIONS: { value: EventType; label: string }[] = [
  { value: 'WEDDING', label: 'Pernikahan' },
  { value: 'BIRTHDAY', label: 'Ulang Tahun' },
  { value: 'GRADUATION', label: 'Wisuda' },
  { value: 'SEMINAR', label: 'Seminar' },
];

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Tanggal hari ini (zona waktu lokal) dalam format yyyy-MM-dd
const getToday = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
};

// "HH:mm:ss" -> "HH:mm" (untuk input type="time")
const toInputTime = (t?: string | null) => (t ? t.slice(0, 5) : '');

// "HH:mm" -> "HH:mm:ss" (untuk backend)
const toApiTime = (t: string) => (t ? (t.length === 5 ? `${t}:00` : t) : undefined);

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

const inputClass =
  'w-full rounded-xl border border-canvas-border bg-white px-4 py-2.5 text-sm text-text-main placeholder:text-canvas-muted transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60';

const errorInputClass = 'border-red-400 focus:border-red-500 focus:ring-red-200';

export default function EditEventModal({ isOpen, eventId, onClose, onSuccess }: EditEventModalProps) {
  const [loadingDetail, setLoadingDetail] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditEventFormValues>({
    defaultValues: {
      eventName: '',
      slug: '',
      eventDescription: '',
      eventDate: '',
      eventStartTime: '',
      eventEndTime: '',
      eventLocation: '',
      eventType: '',
    },
  });

  // Isi form dengan data event setiap modal dibuka
  useEffect(() => {
  if (!isOpen || !eventId) return;
  let ignore = false;

  const load = async () => {
    setLoadingDetail(true);
    try {
      const event = await getMyDetailEvent(eventId);
      if (ignore) return;
      reset({
        eventName: event.eventName ?? '',
        slug: event.slug ?? '',
        eventDescription: event.eventDescription ?? '',
        eventDate: event.eventDate ?? '',
        eventStartTime: toInputTime(event.eventStartTime),
        eventEndTime: toInputTime(event.eventEndTime),
        eventLocation: event.eventLocation ?? '',
        eventType: event.eventType ?? '',
      });
    } catch {
      if (!ignore) {
        errorAlert('Gagal memuat data event');
        onClose();
      }
    } finally {
      if (!ignore) setLoadingDetail(false);
    }
  };

  load();
  return () => { ignore = true; };
}, [isOpen, eventId, reset, onClose]);

  // Tutup dengan Escape (kecuali sedang menyimpan)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen || !event) return null;

  const startTime = watch('eventStartTime');
  const eventName = watch('eventName');

  const onSubmit = async (values: EditEventFormValues) => {
    const payload: EventUpdateRequest = {
      eventName: values.eventName.trim(),
      slug: values.slug.trim(),
      eventDescription: values.eventDescription.trim() || undefined,
      eventDate: values.eventDate,
      eventStartTime: toApiTime(values.eventStartTime),
      eventEndTime: toApiTime(values.eventEndTime),
      eventLocation: values.eventLocation.trim(),
      eventType: values.eventType || undefined,
    };

    try {
      if(!eventId) return;
      const updated = await updateEvent(eventId, payload);
      onSuccess(updated);
      onClose();
    } catch (error: unknown) {
      const err = error as ApiErrorResponse;
      errorAlert(err.response?.data?.message || 'Gagal memperbarui event');
    }
  };

  const handleBackdropClick = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
      {loadingDetail ? (
        <EditEventFormSkeleton />
      ) : (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
          onMouseDown={handleBackdropClick}
          >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-event-title"
            onMouseDown={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-canvas-border px-5 py-4 sm:px-6">
              <div>
                <h2 id="edit-event-title" className="font-serif text-xl text-text-main">
                  Edit Detail Event
                </h2>
                <p className="mt-0.5 text-sm text-text-muted">
                  Lengkapi data event agar galeri bisa diakses.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                aria-label="Tutup"
                className="rounded-full p-1.5 text-text-muted transition hover:bg-canvas-placeholder disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
                {/* Nama event */}
                <div>
                  <label htmlFor="eventName" className="mb-1.5 block text-xs font-medium text-text-muted">
                    Nama Event <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="eventName"
                    type="text"
                    placeholder="Contoh: Pernikahan Andi & Sinta"
                    className={`${inputClass} ${errors.eventName ? errorInputClass : ''}`}
                    {...register('eventName', {
                      required: 'Nama event wajib diisi',
                      validate: (v) => v.trim() !== '' || 'Nama event wajib diisi',
                    })}
                  />
                  {errors.eventName && <p className="mt-1 text-xs text-red-500">{errors.eventName.message}</p>}
                </div>

                {/* Slug */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label htmlFor="slug" className="block text-xs font-medium text-text-muted">
                      Slug (alamat galeri) <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setValue('slug', slugify(eventName), { shouldValidate: true, shouldDirty: true })
                      }
                      disabled={!eventName.trim()}
                      className="text-xs font-medium text-primary hover:text-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Buat dari nama event
                    </button>
                  </div>
                  <div
                    className={`flex items-center rounded-xl border bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${
                      errors.slug ? 'border-red-400' : 'border-canvas-border'
                    }`}
                  >
                    <span className="select-none pl-4 text-sm text-text-muted">vbooth.my.id/</span>
                    <input
                      id="slug"
                      type="text"
                      placeholder="andi-sinta"
                      className="w-full bg-transparent py-2.5 pr-4 text-sm text-text-main placeholder:text-canvas-muted focus:outline-none"
                      {...register('slug', {
                        required: 'Slug wajib diisi',
                        minLength: { value: 3, message: 'Slug minimal 3 karakter' },
                        maxLength: { value: 60, message: 'Slug maksimal 60 karakter' },
                        pattern: {
                          value: SLUG_REGEX,
                          message: 'Hanya huruf kecil, angka, dan tanda hubung (contoh: andi-sinta)',
                        },
                      })}
                    />
                  </div>
                  {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>}
                </div>

                {/* Jenis event */}
                <div>
                  <label htmlFor="eventTypes" className="mb-1.5 block text-xs font-medium text-text-muted">
                    Jenis Event
                  </label>
                  <select id="eventTypes" className={inputClass} {...register('eventType')}>
                    <option value="">Pilih jenis event</option>
                    {EVENT_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tanggal + waktu */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="eventDate" className="mb-1.5 block text-xs font-medium text-text-muted">
                      Tanggal <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="eventDate"
                      type="date"
                      min={getToday()}
                      className={`${inputClass} ${errors.eventDate ? errorInputClass : ''}`}
                      {...register('eventDate', {
                        required: 'Tanggal event wajib diisi',
                        validate: (v) => v >= getToday() || 'Tanggal event tidak boleh tanggal yang sudah lewat',
                      })}
                    />
                    {errors.eventDate && <p className="mt-1 text-xs text-red-500">{errors.eventDate.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="eventStartTime" className="mb-1.5 block text-xs font-medium text-text-muted">
                      Waktu Mulai
                    </label>
                    <Controller
                      name="eventStartTime"
                      control={control}
                      render={({ field }) => (
                        <InputTime24Hour id="eventStartTime" value={field.value} onChange={field.onChange} />
                      )}
                    />
                  </div>

                  <div>
                    <label htmlFor="eventEndTime" className="mb-1.5 block text-xs font-medium text-text-muted">
                      Waktu Selesai
                    </label>
                    <Controller
                      name="eventEndTime"
                      control={control}
                      rules={{
                        validate: (v) =>
                          !v || !startTime || v > startTime || 'Waktu selesai harus setelah waktu mulai',
                      }}
                      render={({ field }) => (
                        <InputTime24Hour
                          id="eventEndTime"
                          value={field.value}
                          onChange={field.onChange}
                          hasError={!!errors.eventEndTime}
                        />
                      )}
                    />
                    {errors.eventEndTime && (
                      <p className="mt-1 text-xs text-red-500">{errors.eventEndTime.message}</p>
                    )}
                  </div>
                </div>

                {/* Lokasi */}
                <div>
                  <label htmlFor="eventLocation" className="mb-1.5 block text-xs font-medium text-text-muted">
                    Lokasi Event <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="eventLocation"
                    type="text"
                    placeholder="Contoh: Gedung Serbaguna, Semarang"
                    className={`${inputClass} ${errors.eventLocation ? errorInputClass : ''}`}
                    {...register('eventLocation', {
                      required: 'Lokasi event wajib diisi',
                      validate: (v) => v.trim() !== '' || 'Lokasi event wajib diisi',
                    })}
                  />
                  {errors.eventLocation && (
                    <p className="mt-1 text-xs text-red-500">{errors.eventLocation.message}</p>
                  )}
                </div>

                {/* Deskripsi */}
                <div>
                  <label htmlFor="eventDescription" className="mb-1.5 block text-xs font-medium text-text-muted">
                    Deskripsi
                  </label>
                  <textarea
                    id="eventDescription"
                    rows={3}
                    placeholder="Ceritakan singkat tentang event Anda"
                    className={`${inputClass} resize-none`}
                    {...register('eventDescription')}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse gap-2 border-t border-canvas-border bg-canvas-bg/50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="rounded-lg border border-canvas-border bg-white px-5 py-2.5 text-sm font-medium text-text-main transition-colors hover:bg-canvas-placeholder disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}