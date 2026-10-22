interface NavLinkProps {
  textSize?: 'sm' | 'md' | 'lg';
  href: string;
  name: string;
}

export default function NavLink({
  textSize = 'sm',
  href,
  name
}: NavLinkProps) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };
  return (
    <a
      href={href}
      className={`${sizes[textSize]} font-medium text-text-muted hover:text-primary border-b-2 border-transparent hover:border-primary transition-all py-1`}
    >
      {name}
    </a>
  );
}
