export default function DashboardSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
      {/* Greeting Header */}
      <div className="mb-8 space-y-2">
        <div className="h-8 w-64 bg-surface-secondary-border rounded-lg" />
        <div className="h-4 w-80 bg-surface-secondary-border rounded-lg" />
      </div>

      {/* Buat Event Button */}
      <div className="mb-8">
        <div className="w-full sm:w-auto h-12 bg-surface-secondary-border rounded-lg" />
      </div>

      {/* Event Saya Section */}
      <div className="mb-8">
        <div className="h-6 w-32 bg-surface-secondary-border rounded-lg mb-4" />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-start justify-between p-4 bg-white rounded-lg border border-canvas-border">
              <div className="flex-1">
                <div className="h-4 w-56 bg-surface-secondary-border rounded-lg mb-2" />
                <div className="h-3 w-32 bg-surface-secondary-border rounded-lg" />
              </div>
              <div className="text-right ml-4">
                <div className="h-4 w-12 bg-surface-secondary-border rounded-lg mb-1" />
                <div className="h-3 w-16 bg-surface-secondary-border rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ucapan Terbaru Section */}
      <div>
        <div className="h-6 w-40 bg-surface-secondary-border rounded-lg mb-4" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 bg-white rounded-lg border border-canvas-border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="h-3 w-40 bg-surface-secondary-border rounded-lg mb-2" />
                  <div className="h-3 w-56 bg-surface-secondary-border rounded-lg" />
                </div>
                <div className="h-3 w-20 bg-surface-secondary-border rounded-lg ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
