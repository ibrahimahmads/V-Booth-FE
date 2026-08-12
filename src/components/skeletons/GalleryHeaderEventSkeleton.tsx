export default function GalleryHeaderEventSkeleton(){
    return (
      <div className="text-center py-6 px-4 space-y-2.5 border-b border-[#e2e8f0]/60 bg-white flex flex-col items-center justify-center animate-pulse">
          {/* Subtitle Skeleton (WEDDING MEMORIES OF) */}
          <div className="h-3 w-36 bg-slate-200 rounded-md" />

          {/* Title Skeleton (Rina & Farhan) */}
          <div className="h-8 w-56 bg-slate-200 rounded-lg my-1" />

          {/* Date Skeleton (16 AGUSTUS 2026) */}
          <div className="h-3 w-28 bg-slate-200 rounded-md" />
        </div>
    )
}