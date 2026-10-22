import { ArrowUpRight, Menu, X } from "lucide-react";
import NavLink from "../atoms/NavLink";
import Button from "../atoms/Button";
import { useState } from "react";

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export default function Navbar({ onLoginClick, onRegisterClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Fitur", href: "#fitur" },
    { name: "Cara Kerja", href: "#cara-kerja" },
    { name: "Paket", href: "#paket" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-[#faf8f3]/85 backdrop-blur-md border-b border-[#e7e2d8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <img src="/logo-vb.png" alt="V-Booth" className="w-9 h-9 sm:w-10 sm:h-10 object-contain" />
            <div className="hidden sm:block leading-none">
              <span className="block font-serif text-lg font-semibold text-text-main tracking-tight">V-Booth</span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-text-muted mt-0.5">
                foto & buku tamu
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.name} textSize="sm" href={link.href} name={link.name} />
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={onLoginClick}
              className="text-sm font-medium text-text-muted hover:text-primary transition-colors whitespace-nowrap"
            >
              Masuk
            </button>
            <Button
              variant="primary"
              onClick={onRegisterClick}
              icon={<ArrowUpRight size={16} />}
              className="rounded-sm"
            >
              Daftar & Buat Acara
            </Button>
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-text-main"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Buka menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-[#e7e2d8] bg-[#faf8f3] px-4 sm:px-6 py-5 flex flex-col gap-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <NavLink key={link.name} textSize="md" href={link.href} name={link.name} />
              ))}
            </nav>
            <div className="flex flex-col gap-2 pt-2 border-t border-[#e7e2d8]">
              <button
                onClick={onLoginClick}
                className="text-sm font-medium text-text-muted hover:text-primary whitespace-nowrap"
              >
                Masuk
              </button>
              <Button variant="primary" fullWidth onClick={onRegisterClick} className="rounded-sm">
                Daftar & Buat Acara
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
