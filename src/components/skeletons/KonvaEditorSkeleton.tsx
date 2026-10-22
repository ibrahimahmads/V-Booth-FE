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
        className="rounded-2xl bg-surface-secondary-border shadow-xl border-4 border-white flex flex-col items-center justify-center p-4 relative overflow-hidden"
      >
        <div className="w-12 h-12 rounded-full border-4 border-canvas-border border-t-primary animate-spin mb-3" />
        <p className="text-xs font-medium text-text-muted">Memuat Frame Canvas...</p>
      </div>

      {/* Mock Bar Toolbar Kontrol Foto di Bawah Canvas */}
      <div className="h-10 w-64 bg-surface-secondary-border rounded-xl border border-canvas-border" />
    </div>
  );
}