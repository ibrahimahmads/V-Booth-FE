interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({children}:BadgeProps){
  return (
    <span className="bg-white/90 backdrop-blur-sm text-primary font-bold text-xs px-3 py-1.5 rounded-lg tracking-wider shadow-sm uppercase">
      {children}
    </span>
  );
};