import { PartyPopper } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#f7f9fb] border-b border-[#e2e8f0]">
      <div className="flex items-center gap-2">
        <PartyPopper className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-bold text-primary">V-Booth</h1>
      </div>
      <div className="w-9 h-9 rounded-full bg-[#e1e0ff] border border-primary/30 flex items-center justify-center overflow-hidden">
        <span className="text-xs font-bold text-primary">VB</span>
      </div>
    </header>
  );
}