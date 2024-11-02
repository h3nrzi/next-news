"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  children: string;
}

export default function NavLink({ children, href }: Props) {
  const path: string = usePathname();

  return (
    <Link href={href} className={path.startsWith(href) ? "active" : ""}>
      {children}
    </Link>
  );
}
