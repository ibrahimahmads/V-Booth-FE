export default function LandingPageSkeleton() {
  return (
    <div className="min-h-screen bg-canvas-bg text-text-main flex flex-col font-sans antialiased animate-pulse">
      {/* Header/Navbar */}
      <div className="h-16 bg-white border-b border-canvas-border" />

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Hero label */}
            <div className="h-4 w-56 bg-surface-secondary-border rounded-lg mb-6" />

            {/* Hero heading */}
            <div className="space-y-3 mb-6">
              <div className="h-14 w-full bg-surface-secondary-border rounded-lg" />
              <div className="h-14 w-5/6 bg-surface-secondary-border rounded-lg" />
            </div>

            {/* Hero description */}
            <div className="space-y-2 mb-8 max-w-xl">
              <div className="h-4 w-full bg-surface-secondary-border rounded-lg" />
              <div className="h-4 w-full bg-surface-secondary-border rounded-lg" />
              <div className="h-4 w-4/5 bg-surface-secondary-border rounded-lg" />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="h-12 w-40 bg-surface-secondary-border rounded-sm" />
              <div className="h-12 w-40 bg-surface-secondary-border rounded-sm" />
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-canvas-border flex flex-wrap gap-x-8 gap-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-3 w-24 bg-surface-secondary-border rounded-md" />
              ))}
            </div>
          </div>

          {/* Hero images area */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="max-w-md mx-auto lg:max-w-none space-y-4">
              <div className="w-full aspect-4/5 bg-surface-secondary-border rounded-lg" />
              <div className="w-32 h-32 bg-surface-secondary-border rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Occasion Strip */}
      <section className="border-y border-canvas-border bg-surface-secondary-border py-4 px-4">
        <div className="max-w-7xl mx-auto flex gap-6 whitespace-nowrap overflow-x-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-3 w-24 bg-canvas-border rounded-md flex-shrink-0" />
          ))}
        </div>
      </section>

      {/* Business Workflow Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="h-4 w-20 bg-surface-secondary-border rounded-lg" />
              <div className="space-y-3">
                <div className="h-10 w-full bg-surface-secondary-border rounded-lg" />
                <div className="h-10 w-4/5 bg-surface-secondary-border rounded-lg" />
              </div>
            </div>

            {/* Right description */}
            <div className="lg:col-span-5 space-y-2">
              <div className="h-4 w-full bg-surface-secondary-border rounded-lg" />
              <div className="h-4 w-full bg-surface-secondary-border rounded-lg" />
              <div className="h-4 w-3/4 bg-surface-secondary-border rounded-lg" />
            </div>
          </div>

          {/* Steps list */}
          <div className="mt-14 border-t border-canvas-border pt-6 space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="grid grid-cols-[auto_1fr] gap-4 pb-6 border-b border-canvas-border">
                <div className="h-6 w-8 bg-surface-secondary-border rounded-lg" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-surface-secondary-border rounded-lg" />
                  <div className="h-3 w-full bg-surface-secondary-border rounded-lg" />
                  <div className="h-3 w-5/6 bg-surface-secondary-border rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-surface-secondary-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left sticky content */}
          <div className="lg:col-span-4 space-y-4">
            <div className="h-4 w-20 bg-canvas-border rounded-lg" />
            <div className="space-y-3">
              <div className="h-10 w-full bg-canvas-border rounded-lg" />
              <div className="h-10 w-4/5 bg-canvas-border rounded-lg" />
            </div>
            <div className="h-3 w-full bg-canvas-border rounded-lg" />
          </div>

          {/* Benefits grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="py-6 border-t border-canvas-border">
                <div className="flex gap-3 mb-3">
                  <div className="h-4 w-4 bg-canvas-border rounded-full flex-shrink-0" />
                  <div className="h-4 w-32 bg-canvas-border rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-canvas-border rounded-lg" />
                  <div className="h-3 w-4/5 bg-canvas-border rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
            <div className="lg:col-span-7 space-y-4">
              <div className="h-4 w-20 bg-surface-secondary-border rounded-lg" />
              <div className="space-y-3">
                <div className="h-10 w-full bg-surface-secondary-border rounded-lg" />
                <div className="h-10 w-4/5 bg-surface-secondary-border rounded-lg" />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-2">
              <div className="h-4 w-full bg-surface-secondary-border rounded-lg" />
              <div className="h-4 w-full bg-surface-secondary-border rounded-lg" />
              <div className="h-4 w-3/4 bg-surface-secondary-border rounded-lg" />
            </div>
          </div>

          {/* Package items */}
          <div className="border-t border-canvas-border">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-8 py-8 sm:py-10 border-b border-canvas-border ${
                  i === 2 ? 'lg:bg-white lg:px-8 lg:-mx-8 lg:border-x lg:border-canvas-border' : ''
                }`}
              >
                <div className="lg:col-span-4 space-y-3">
                  <div className="h-3 w-16 bg-surface-secondary-border rounded-lg" />
                  <div className="h-8 w-32 bg-surface-secondary-border rounded-lg" />
                  <div className="h-4 w-full bg-surface-secondary-border rounded-lg" />
                </div>

                <div className="lg:col-span-5 grid grid-cols-3 gap-x-6 gap-y-4">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="space-y-2">
                      <div className="h-3 w-16 bg-surface-secondary-border rounded-lg" />
                      <div className="h-4 w-12 bg-surface-secondary-border rounded-lg" />
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-3 space-y-3">
                  <div className="h-8 w-24 bg-surface-secondary-border rounded-lg" />
                  <div className="h-10 w-full bg-surface-secondary-border rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-text-main text-white px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8 space-y-4">
            <div className="h-4 w-32 bg-white/20 rounded-lg" />
            <div className="space-y-3">
              <div className="h-10 w-full bg-white/20 rounded-lg" />
              <div className="h-10 w-4/5 bg-white/20 rounded-lg" />
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="h-10 w-full bg-white/20 rounded-lg" />
            <div className="h-10 w-full bg-white/20 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text-main text-white/60 border-t border-white/10 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto h-10 bg-white/10 rounded-lg" />
      </footer>
    </div>
  );
}
