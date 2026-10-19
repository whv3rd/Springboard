export interface NavItem {
  label: string;
  href: string;
}

// Primary nav, from the sitemap in docs/site-blueprint.md.
export const PRIMARY_NAV: NavItem[] = [
  { label: 'Springboard', href: '/springboard' },
  { label: 'The Score', href: '/score' },
  { label: 'The Path', href: '/path' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

export function isCurrent(href: string, pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/';
  return path === href || path.startsWith(`${href}/`);
}
