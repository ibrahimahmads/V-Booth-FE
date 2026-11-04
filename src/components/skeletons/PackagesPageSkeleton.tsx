export default function PackagesPageSkeleton() {
  return (
    <div className="max-w-5xl lg:mx-auto mx-1.5 px-4 py-8 animate-pulse">
      {/* Title Section */}
      <div className="mb-8 space-y-2">
        <div className="h-8 w-48 bg-surface-secondary-border rounded-lg" />
        <div className="h-4 w-full max-w-md bg-surface-secondary-border rounded-lg" />
      </div>

      {/* Package List */}
      <div className="border-t border-canvas-border mx-1.5 lg:mx-0">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-8 py-8 sm:py-10 border-b border-canvas-border ${
              i === 2 ? 'lg:bg-white lg:px-8 lg:-mx-8 lg:border-x lg:border-canvas-border' : ''
            }`}
          >
            {/* Package Info */}
            <div className="lg:col-span-4 space-y-2">
              <div className="h-3 w-16 bg-surface-secondary-border rounded-lg" />
              <div className="h-8 w-32 bg-surface-secondary-border rounded-lg" />
              <div className="h-4 w-full bg-surface-secondary-border rounded-lg mt-3" />
              <div className="h-4 w-4/5 bg-surface-secondary-border rounded-lg" />
            </div>

            {/* Package Stats */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-x-6 gap-y-4 sm:gap-y-6">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="text-xs space-y-2">
                  <div className="h-3 w-20 bg-surface-secondary-border rounded-lg" />
                  <div className="h-5 w-12 bg-surface-secondary-border rounded-lg" />
                </div>
              ))}
            </div>

            {/* Price & Button */}
            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-4">
              <div className="h-8 w-24 bg-surface-secondary-border rounded-lg" />
              <div className="h-10 w-full sm:w-32 lg:w-full bg-surface-secondary-border rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
