export default function GalleryHeaderEventSkeleton(){
    return (
      <div className="text-center py-6 px-4 space-y-2.5 border-b border-canvas-border/60 bg-white flex flex-col items-center justify-center animate-pulse">
          {/* Subtitle Skeleton (WEDDING MEMORIES OF) */}
          <div className="h-3 w-36 bg-surface-secondary-border rounded-md" />

          {/* Title Skeleton (Rina & Farhan) */}
          <div className="h-8 w-56 bg-surface-secondary-border rounded-lg my-1" />

          {/* Date Skeleton (16 AGUSTUS 2026) */}
          <div className="h-3 w-28 bg-surface-secondary-border rounded-md" />
        </div>
    )
}