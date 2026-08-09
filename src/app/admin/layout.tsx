'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/admin/dashboard', label: 'Dashboard' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-[#0B1220] border-b border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <span
                className="text-white text-sm font-semibold uppercase tracking-[0.25em]"
                style={{ fontFamily: 'var(--font-jost)', fontWeight: 300 }}
              >
                TRISΛRΛ
              </span>
              <span className="text-slate-500 text-xs font-medium tracking-widest uppercase">
                Admin
              </span>
            </Link>

            {/* Nav links */}
            <nav className="hidden sm:flex items-center gap-1">
              {NAV_LINKS.map(link => {
                const active = pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      active
                        ? 'bg-white/10 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: public site link + logout */}
          <div className="flex items-center gap-3">
            <Link
              href="/jobs"
              target="_blank"
              className="text-slate-400 hover:text-white text-xs transition-colors"
            >
              ↗ View Site
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
            >
              {loggingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
