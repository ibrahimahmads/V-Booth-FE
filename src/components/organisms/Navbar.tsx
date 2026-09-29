import { ArrowRight, Menu, X} from "lucide-react";
import NavLink from "../atoms/NavLink";
import Button from "../atoms/Button";
import { useState } from "react";

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export default function Navbar({onLoginClick,onRegisterClick}:NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Fitur', href: '#features' },
    { name: 'Cara Kerja', href: '#how-it-works' },
    { name: 'Demo', href: '#demo' },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md border border-surface-border/50 rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm transition-all">

        <a href="#" className="flex items-center gap-2.5 group">
          <img src="/logo-vb.png?v=20260930" alt="logo virtual booth"  className="w-16 h-16"/>
          <span className="font-bold text-xl text-text-main tracking-tight">
            V-Booth
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link)=>(
            <NavLink textSize="lg" href={link.href} name={link.name} />
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" onClick={onLoginClick}>
            Masuk
          </Button>
          <Button variant="primary" onClick={onRegisterClick} icon={<ArrowRight size={18} />}>
            Mulai Gratis
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-text-main hover:bg-black/5 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-white border border-surface-border rounded-2xl p-5 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink textSize="md" href={link.href} name={link.name} />
            ))}
          </nav>
          <hr className="border-surface-border/60" />
          <div className="flex flex-col gap-2 pt-1">
            <Button variant="secondary" fullWidth onClick={onLoginClick}>
              Masuk
            </Button>
            <Button variant="primary" fullWidth onClick={onRegisterClick}>
              Mulai Gratis
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}