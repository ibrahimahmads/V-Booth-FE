import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";

/**
 * Halaman placeholder untuk route yang belum punya implementasi
 * (login, register, demo). Bukan alur fungsional — hanya menunjukkan
 * bahwa tujuan navigasinya sudah disiapkan.
 */
export default function PlaceholderPage({ title, note }: { title: string; note?: string }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8f3] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-[11px] uppercase tracking-[0.24em] text-primary font-semibold mb-4">
        V-Booth
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl text-text-main tracking-tight">{title}</h1>
      <p className="mt-3 text-sm text-text-muted max-w-sm leading-relaxed">
        {note ?? "Halaman ini masih disiapkan. Fitur terkait belum tersedia di versi ini."}
      </p>
      <Button
        variant="secondary"
        className="mt-8 rounded-sm px-5 py-3 border-[#e7e2d8] text-sm"
        onClick={() => navigate("/")}
      >
        Kembali ke Beranda
      </Button>
    </div>
  );
}
