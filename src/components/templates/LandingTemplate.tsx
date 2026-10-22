import {
  ArrowUpRight,
  Camera,
  Check,
  CreditCard,
  Play,
  SlidersHorizontal,
  Sparkles,
  User,
  Users,
  Volume2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import Navbar from "../organisms/Navbar";

import couplePhoto from "../../assets/landing/photo-1519741497674-611481863552.jpg";
import ringsPhoto from "../../assets/landing/photo-1465495976277-4387d4b0b4c6.jpg";

/**
 * ponytail: katalog paket masih placeholder.
 * Harga, fitur, dan batas penggunaan belum ditetapkan oleh bisnis.
 * Ganti isi array ini saja saat data resmi tersedia — markup tidak perlu diubah.
 */
const PACKAGES = [
  {
    id: "paket-1",
    label: "Paket 01",
    name: "Nama paket menyusul",
    tagline: "Cocok untuk acara intim",
    price: null as string | null,
    specs: ["Masa aktif acara", "Jumlah tamu", "Foto & pesan suara", "URL slug kustom"],
  },
  {
    id: "paket-2",
    label: "Paket 02",
    name: "Nama paket menyusul",
    tagline: "Untuk resepsi & acara besar",
    price: null as string | null,
    specs: ["Masa aktif acara", "Jumlah tamu", "Foto & pesan suara", "URL slug kustom"],
  },
  {
    id: "paket-3",
    label: "Paket 03",
    name: "Nama paket menyusul",
    tagline: "Untuk gathering & acara perusahaan",
    price: null as string | null,
    specs: ["Masa aktif acara", "Jumlah tamu", "Foto & pesan suara", "URL slug kustom"],
  },
];

export default function LandingTemplate() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8f3] text-text-main flex flex-col font-sans antialiased">
      <Navbar
        onLoginClick={() => navigate("/login")}
        onRegisterClick={() => navigate("/register")}
      />

      {/* ---------- HERO ---------- */}
      <section className="pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-primary" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-primary font-semibold">
                Buku tamu digital untuk acara spesial
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[68px] leading-[1.06] tracking-[-0.02em] text-text-main">
              Tamu cukup buka
              <br />
              satu tautan.
              <br />
              Kenangannya{" "}
              <span className="italic text-primary">tinggal selamanya</span>.
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-text-muted">
              V-Booth mengubah ucapan tamu menjadi galeri digital berisi foto, rekaman suara,
              dan pesan hangat. Kamu membuat acara, memilih tautannya, lalu membagikannya —
              tamu tidak perlu login atau memasang aplikasi.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <Button
                variant="primary"
                className="rounded-sm px-7 py-4 shadow-lg shadow-primary/20"
                onClick={() => navigate("/register")}
                icon={<Camera size={18} />}
              >
                Mulai Buat Acara
              </Button>
              <Button
                variant="secondary"
                className="rounded-sm px-6 py-4 border-[#e7e2d8] hover:border-primary/50"
                onClick={() => navigate("/demo")}
                icon={<Play size={15} className="text-primary" />}
              >
                Demo V-Booth
              </Button>
            </div>

            <div className="mt-10 pt-6 border-t border-[#e7e2d8] flex flex-wrap gap-x-8 gap-y-3 text-xs text-text-muted">
              <span>Tamu tanpa login</span>
              <span>Foto &amp; pesan suara</span>
              <span>Tautan acara milikmu sendiri</span>
            </div>
          </div>

          {/* Photo composition */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <figure className="relative rotate-[-1.5deg] bg-white p-2 sm:p-2.5 border border-[#e7e2d8] shadow-[0_24px_60px_-32px_rgba(25,28,30,0.45)]">
                <div className="aspect-4/5 overflow-hidden bg-[#efeae0]">
                  <img
                    src={couplePhoto}
                    alt="Momen hangat pasangan di hari pernikahan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="flex items-baseline justify-between gap-2 pt-2 px-1">
                  <span className="font-serif italic text-sm text-text-muted">Vio &amp; Rangga</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    vbooth.my.id
                  </span>
                </figcaption>
              </figure>

              <figure className="absolute -bottom-8 -left-4 sm:-left-8 w-32 sm:w-40 rotate-3 bg-white p-1.5 border border-[#e7e2d8] shadow-[0_16px_40px_-24px_rgba(25,28,30,0.5)]">
                <div className="aspect-square overflow-hidden bg-[#efeae0]">
                  <img src={ringsPhoto} alt="Cincin pernikahan" className="w-full h-full object-cover" />
                </div>
              </figure>

              <div className="absolute -top-5 -right-2 sm:-right-5 bg-white border border-[#e7e2d8] shadow-[0_16px_40px_-24px_rgba(25,28,30,0.4)] px-4 py-3 w-45">
                <div className="flex items-center gap-2 text-primary">
                  <Volume2 size={15} />
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">Pesan suara tamu</span>
                </div>
                <div className="mt-2.5 flex items-end gap-0.75 h-7" aria-hidden="true">
                  {[3, 6, 9, 12, 8, 15, 11, 14, 7, 10, 13, 6, 9, 5, 11, 8, 12, 4].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h * 1.8}px` }}
                      className={`w-0,75 rounded-full ${i < 5 ? "bg-primary" : "bg-[#ddd7cc]"}`}
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-[11px] text-text-muted leading-tight">
                  “Bahagia selalu buat kalian berdua!”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- OCCASION STRIP ---------- */}
      <section className="border-y border-[#e7e2d8] bg-surface-secondary-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-6 whitespace-nowrap overflow-x-auto text-[11px] uppercase tracking-[0.22em] text-text-muted">
          <span>Pernikahan</span>
          <span className="text-primary">·</span>
          <span>Akad nikah</span>
          <span className="text-primary">·</span>
          <span>Lamaran</span>
          <span className="text-primary">·</span>
          <span>Ulang tahun</span>
          <span className="text-primary">·</span>
          <span>Gathering perusahaan</span>
          <span className="text-primary">·</span>
          <span>Acara spesial</span>
        </div>
      </section>

      {/* ---------- BUSINESS WORKFLOW ---------- */}
      <section id="cara-kerja" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-primary" />
                <span className="text-[11px] uppercase tracking-[0.24em] text-primary font-semibold">
                  Alur Acara
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.12] tracking-[-0.01em]">
                Lima langkah dari akun baru
                <br className="hidden sm:block" /> sampai tautan siap dibagikan.
              </h2>
            </div>
            <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed text-text-muted">
              Acara dikelola lewat akun dan paket berbayar, jadi setiap tautan hanya dibuat
              untuk acara yang benar-benar milikmu — lengkap dengan slug pilihan sendiri.
            </p>
          </div>

          <ol className="mt-14 border-t border-[#e7e2d8]">
            {[
              {
                icon: <User size={17} />,
                title: "Daftar akun",
                desc: "Buat akun pemilik acara. Satu akun untuk mengelola semua acaramu.",
              },
              {
                icon: <CreditCard size={17} />,
                title: "Pilih & bayar paket",
                desc: "Tentukan paket pembuatan acara, lalu selesaikan pembayaran.",
              },
              {
                icon: <SlidersHorizontal size={17} />,
                title: "Atur detail acara",
                desc: "Isi nama acara, tanggal, dan pilih URL slug selama masih tersedia.",
              },
              {
                icon: <Users size={17} />,
                title: "Bagikan tautan",
                desc: "Kirim satu tautan ke tamu lewat undangan digital, grup, atau QR di meja resepsi.",
              },
              {
                icon: <Camera size={17} />,
                title: "Tamu mengirim ucapan",
                desc: "Tanpa login: tamu memotret, merekam suara, menulis pesan, lalu mengirim.",
              },
            ].map((item, i) => (
              <li
                key={item.title}
                className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_auto_1fr] gap-x-4 sm:gap-x-8 gap-y-2 items-baseline py-6 sm:py-7 border-b border-[#e7e2d8] group"
              >
                <span className="font-serif italic text-lg text-primary/70 sm:w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-[#e7e2d8] text-primary group-hover:border-primary/40 transition-colors">
                  {item.icon}
                </span>
                <div className="sm:flex sm:items-baseline sm:justify-between sm:gap-10">
                  <h3 className="font-medium text-base sm:text-lg text-text-main">{item.title}</h3>
                  <p className="mt-1 sm:mt-0 sm:max-w-md text-xs sm:text-sm leading-relaxed text-text-muted">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- BENEFITS ---------- */}
      <section id="fitur" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-surface-secondary-border scroll-mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-primary" />
                <span className="text-[11px] uppercase tracking-[0.24em] text-primary font-semibold">
                  Yang kamu dapatkan
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] tracking-[-0.01em]">
                Dibuat untuk tuan rumah,
                <br className="hidden lg:block" /> dinikmati oleh tamu.
              </h2>
              <p className="text-sm leading-relaxed text-text-muted">
                Bukan sekadar filter foto. V-Booth menyimpan ucapan orang-orang terdekat
                dalam satu tempat yang bisa kamu buka kapan saja.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0">
            {[
              {
                title: "Tamu tanpa login",
                desc: "Tidak ada formulir panjang di depan pintu. Tamu membuka tautan, langsung ikut mengisi buku tamu.",
              },
              {
                title: "Foto berbingkai + pesan suara",
                desc: "Setiap kiriman bisa berisi potret dan rekaman ucapan, jadi suara orang tersayang ikut tersimpan.",
              },
              {
                title: "Satu tautan milikmu",
                desc: "Acara punya slug pilihan sendiri, mudah diingat dan rapi saat dicetak di undangan.",
              },
              {
                title: "Semua kenangan di satu galeri",
                desc: "Foto dan ucapan tamu terkumpul di galeri acara, bukan tersebar di puluhan chat.",
              },
            ].map((f) => (
              <div key={f.title} className="py-7 border-t border-[#ddd7cc] first:border-t-0 sm:&:nth-child(2):border-t-0">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Check size={16} strokeWidth={2.5} />
                  <h3 className="font-medium text-base text-text-main">{f.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PRICING CATALOG ---------- */}
      <section id="paket" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-primary" />
                <span className="text-[11px] uppercase tracking-[0.24em] text-primary font-semibold">
                  Katalog paket
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.12] tracking-[-0.01em]">
                Bayar sekali per acara.
                <br className="hidden sm:block" /> Tidak ada langganan bulanan.
              </h2>
            </div>
            <div className="lg:col-span-5 space-y-3">
              <p className="text-sm sm:text-base leading-relaxed text-text-muted">
                Setiap acara dibuat setelah paket dibayar, lalu aktif selama masa acara
                berlangsung. Pilih paket sesuai skala perayaanmu.
              </p>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#8a6d1f] bg-[#f6ecd2] border border-[#e6d3a3] px-3 py-1.5">
                <Sparkles size={12} /> Harga &amp; fitur: data sementara
              </p>
            </div>
          </div>

          <div className="mt-14 border-t border-[#e7e2d8]">
            {PACKAGES.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-8 py-8 sm:py-10 border-b border-[#e7e2d8] ${
                  i === 1 ? "lg:bg-white lg:px-8 lg:-mx-8 lg:border-x lg:border-[#e7e2d8]" : ""
                }`}
              >
                <div className="lg:col-span-4">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-text-muted">{pkg.label}</span>
                  <h3 className="font-serif text-2xl sm:text-[27px] text-text-main mt-1.5">{pkg.name}</h3>
                  <p className="text-sm text-text-muted mt-1">{pkg.tagline}</p>
                </div>

                <div className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-3 self-center">
                  {pkg.specs.map((spec) => (
                    <div key={spec} className="text-xs">
                      <span className="block text-text-muted">{spec}</span>
                      <span className="block mt-0.5 text-text-main/40 font-serif text-base leading-none">—</span>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-4 self-center">
                  <div className="lg:text-right">
                    <span className="font-serif text-3xl text-text-main/45">Rp —</span>
                    <span className="block text-[10px] uppercase tracking-[0.16em] text-text-muted mt-1">
                      harga menyusul
                    </span>
                  </div>
                  <Button
                    variant={i === 1 ? "primary" : "secondary"}
                    className="rounded-sm px-5 py-3 text-sm border-[#e7e2d8] whitespace-nowrap"
                    onClick={() => navigate("/register")}
                    icon={<ArrowUpRight size={15} />}
                  >
                    Pilih paket
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-text-muted">
            Catatan: nama paket, harga, rincian fitur, dan batas penggunaan di atas belum
            ditetapkan — semuanya placeholder. Data resmi akan menggantikan blok{" "}
            <code className="font-mono text-[11px] bg-surface-secondary-border px-1 py-0.5">PACKAGES</code> di{" "}
            <code className="font-mono text-[11px] bg-surface-secondary-border px-1 py-0.5">LandingTemplate.tsx</code>.
          </p>
        </div>
      </section>

      {/* ---------- CLOSING CTA ---------- */}
      <section className="bg-text-main text-white px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#a7a3ff] font-semibold">
              Mulai dari satu tautan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[54px] leading-[1.08] tracking-[-0.02em]">
              Acaramu berlangsung sekali.
              <br className="hidden sm:block" /> Ucapannya bisa{" "}
              <span className="italic text-[#a7a3ff]">dibuka berkali-kali</span>.
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Button
              variant="primary"
              className="rounded-sm px-7 py-4 font-semibold"
              onClick={() => navigate("/register")}
              icon={<Camera size={18} />}
            >
              Mulai Buat Acara
            </Button>
            <Button
              variant="ghost"
              className="text-white/85 hover:text-white hover:bg-white/10 border border-white/25 rounded-sm px-7 py-4"
              onClick={() => navigate("/demo")}
            >
              Coba Demo V-Booth
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-text-main text-white/60 border-t border-white/10 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <img src="/logo-vb.png" alt="V-Booth" className="w-7 h-7 object-contain" />
            <span className="font-serif text-white text-base">V-Booth</span>
            <span>· © 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate("/login")} className="hover:text-white transition-colors">
              Masuk
            </button>
            <button onClick={() => navigate("/register")} className="hover:text-white transition-colors">
              Daftar
            </button>
            <button onClick={() => navigate("/galery")} className="hover:text-white transition-colors">
              Galeri Tamu
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
