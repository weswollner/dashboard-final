'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/dashboard' },
  { name: 'Courses', href: '/dashboard/courses' },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`navbar-item ${pathname === link.href ? 'has-background-white-ter' : ''}`}
          >
            <span>{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}