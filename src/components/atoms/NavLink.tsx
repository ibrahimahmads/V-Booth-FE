interface NavLinkProp{
  textSize?:'sm'|'md'|'lg';
  href:string;
  name:string;
}

export default function NavLink({
  textSize='sm',
  href,
  name
}:NavLinkProp) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl"
  };
  return (
    <a href={href} className={`${sizes[textSize]} font-medium text-primary border-b-2 border-transparent hover:border-primary transition-colors`}>
      {name}
    </a>
  )
}
