import SkeletonBlock from "../atoms/SkeletonBlock";

export default function EditEventFormSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Memuat data event">
      {/* Nama event */}
      <div className="space-y-2">
        <SkeletonBlock className="h-3 w-24" />
        <SkeletonBlock className="h-10 w-full" />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <SkeletonBlock className="h-3 w-40" />
        <SkeletonBlock className="h-10 w-full" />
      </div>

      {/* Jenis event */}
      <div className="space-y-2">
        <SkeletonBlock className="h-3 w-20" />
        <SkeletonBlock className="h-10 w-full" />
      </div>

      {/* Tanggal + waktu */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <SkeletonBlock className="h-3 w-20" />
            <SkeletonBlock className="h-10 w-full" />
          </div>
        ))}
      </div>

      {/* Lokasi */}
      <div className="space-y-2">
        <SkeletonBlock className="h-3 w-28" />
        <SkeletonBlock className="h-10 w-full" />
      </div>

      {/* Deskripsi */}
      <div className="space-y-2">
        <SkeletonBlock className="h-3 w-20" />
        <SkeletonBlock className="h-20 w-full" />
      </div>
    </div>
  );
}