export interface NavItem {
  label: string;
  href: string;
}

// Primary nav, from the sitemap in docs/site-blueprint.md.
export const PRIMARY_NAV: NavItem[] = [
  { label: 'Springspot', href: '/what-is-springspot' },
  { label: 'The Score', href: '/score' },
  { label: 'The Path', href: '/path' },
  { label: 'Startup', href: '/startup' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

/**
 * Whether a nav href is the current section. `base` is the site's base path
 * (import.meta.env.BASE_URL), stripped from the pathname first so the check still
 * works when the site is served from a subdirectory such as /springspot.
 */
export function isCurrent(href: string, pathname: string, base = '/'): boolean {
  const prefix = base.replace(/\/$/, '');
  const inBase = prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`));
  const local = inBase ? pathname.slice(prefix.length) : pathname;
  const path = local.replace(/\/$/, '') || '/';
  return path === href || path.startsWith(`${href}/`);
}
