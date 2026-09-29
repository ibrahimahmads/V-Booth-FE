import NavLink from "../atoms/NavLink";

export default function Navbar() {
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Fitur', href: '#features' },
    { name: 'Cara Kerja', href: '#how-it-works' },
    { name: 'Demo', href: '#demo' },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md border border-surface-border/50 rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm transition-all">
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link)=>(
            <NavLink textSize="lg" href={link.href} name={link.name} />
          ))}
        </nav>
      </div>
    </header>
  )
}