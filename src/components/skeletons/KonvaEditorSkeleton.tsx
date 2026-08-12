const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 533;

/**
 * Skeleton Loader khusus untuk Konva Frame Editor Canvas.
 */
export default function KonvaEditorSkeleton() {
  return (
    <div className="w-full flex flex-col items-center gap-3 animate-pulse">
      {/* Box Kanvas Konva (Ukuran Sesuai 300 x 533 px) */}
      <div 
        style={{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }} 
        className="rounded-2xl bg-slate-200 shadow-xl border-4 border-white flex flex-col items-center justify-center p-4 relative overflow-hidden"
      >
        <div className="w-12 h-12 rounded-full border-4 border-slate-300 border-t-indigo-500 animate-spin mb-3" />
        <p className="text-xs font-medium text-slate-400">Memuat Frame Canvas...</p>
      </div>

      {/* Mock Bar Toolbar Kontrol Foto di Bawah Canvas */}
      <div className="h-10 w-64 bg-slate-200 rounded-xl border border-slate-100" />
    </div>
  );
}