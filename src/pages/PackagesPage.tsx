import { ArrowUpRight, Sparkles } from 'lucide-react';
import DashboardLayout from '../components/templates/DashboardLayout';

const PACKAGES = [
  {
    id: 'paket-1',
    label: 'Paket 01',
    name: 'Paket Intim',
    tagline: 'Cocok untuk acara kecil',
    price: null as string | null,
    specs: ['Masa aktif acara', 'Jumlah tamu', 'Foto & pesan suara', 'URL slug kustom'],
  },
  {
    id: 'paket-2',
    label: 'Paket 02',
    name: 'Paket Pernikahan',
    tagline: 'Untuk resepsi & acara besar',
    price: null as string | null,
    specs: ['Masa aktif acara', 'Jumlah tamu', 'Foto & pesan suara', 'URL slug kustom'],
  },
  {
    id: 'paket-3',
    label: 'Paket 03',
    name: 'Paket Corporate',
    tagline: 'Untuk gathering & acara perusahaan',
    price: null as string | null,
    specs: ['Masa aktif acara', 'Jumlah tamu', 'Foto & pesan suara', 'URL slug kustom'],
  },
];

export default function PackagesPage() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-serif text-text-main">Pilih Paket</h1>
          <p className="text-text-muted">Pilih paket yang sesuai untuk acara Anda.</p>
        </div>

        <div className="border-t border-canvas-border">
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-8 py-8 sm:py-10 border-b border-canvas-border ${
                i === 1 ? 'lg:bg-white lg:px-8 lg:-mx-8 lg:border-x lg:border-[#e7e2d8]' : ''
              }`}
            >
              <div className="lg:col-span-4">
                <span className="text-[10px] uppercase tracking-[0.24em] text-text-muted">{pkg.label}</span>
                <h3 className="font-serif text-2xl sm:text-[27px] text-text-main mt-1.5">{pkg.name}</h3>
                <p className="text-sm text-text-muted mt-1">{pkg.tagline}</p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-3">
                {pkg.specs.map((spec) => (
                  <div key={spec} className="text-xs">
                    <span className="block text-text-muted">{spec}</span>
                    <span className="block mt-0.5 text-text-main/40 font-serif text-base leading-none">—</span>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-4">
                <div>
                  <span className="font-serif text-3xl text-text-main/45">Rp —</span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-text-muted mt-1">
                    harga menyusul
                  </span>
                </div>
                <button
                  className="rounded-sm px-5 py-3 text-sm border border-canvas-border text-text-main hover:bg-canvas-placeholder transition-colors whitespace-nowrap inline-flex items-center justify-center gap-2"
                >
                  Pilih paket
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-text-muted">
          <Sparkles size={12} className="inline mr-1" />
          Harga & fitur: data sementara. Paket resmi akan ditetapkan oleh tim V-Booth.
        </p>
      </div>
    </DashboardLayout>
  );
}
