import { PartyPopper } from 'lucide-react';

interface HeaderProps {
  showProfile?: boolean;
}

export default function Header({ showProfile = true }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-canvas-bg/90 backdrop-blur-sm border-b border-canvas-border">
      <div className="flex items-center gap-2">
        <PartyPopper className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-bold text-primary tracking-tight">V-Booth</h1>
      </div>
      {showProfile && (
        <div className="w-9 h-9 rounded-full bg-surface-secondary-border border border-canvas-border flex items-center justify-center overflow-hidden">
          <span className="text-xs font-bold text-primary">VB</span>
        </div>
      )}
    </header>
  );
}