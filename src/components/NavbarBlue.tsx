'use client';

import { useState } from 'react';
import Link from 'next/link';

const menus = [
  { name: 'About', href: '/about', items: [
    { label: 'About NIPE', href: '/about', description: 'Discover Noble Institute of Physical Education and its vision.' },
    { label: 'Faculty', href: '/faculty', description: 'Meet our academic team.' },
    { label: 'Campus', href: '/lab-facilities', description: 'Explore campus and learning facilities.' },
  ] },
  { name: 'Academics', href: '/courses', items: [
    { label: 'Bachelor of Physical Education', href: '/courses/bachelor-of-physical-education', description: 'Explore the B.P.Ed. programme.' },
    { label: 'Faculty', href: '/faculty', description: 'Academic faculty and teaching support.' },
    { label: 'Student Activities', href: '/activities', description: 'Sports, fitness and student life.' },
  ] },
  { name: 'Sports & Activities', href: '/activities', items: [
    { label: 'Sports & Activities', href: '/activities', description: 'Explore physical education and sports activities.' },
    { label: 'Facilities', href: '/lab-facilities', description: 'View campus and sports-related facilities.' },
  ] },
  { name: 'Admissions', href: '/admissions', items: [
    { label: 'Admissions 2026–27', href: '/admissions', description: 'Eligibility, process and key information.' },
    { label: 'B.P.Ed. Programme', href: '/courses/bachelor-of-physical-education', description: 'Programme details and admissions information.' },
    { label: 'Student Portal', href: '/student/login', description: 'Existing students can sign in here.' },
  ] },
  { name: 'Student Center', href: '/student/login', items: [
    { label: 'Student Login', href: '/student/login', description: 'Access attendance, fees, results and timetable.' },
    { label: 'Faculty Login', href: '/faculty/login', description: 'Faculty academic access.' },
  ] },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  return (
    <nav className="sticky top-0 z-50 bg-blue-950 shadow-lg">
      <div className="container mx-auto px-4"><div className="flex min-h-20 items-center justify-between gap-4 py-2">
        <Link href="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpenMenu(null)}>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-400/60 bg-white text-xl font-black text-blue-950">N</div>
          <div className="flex flex-col"><span className="text-sm font-bold tracking-[0.16em] text-yellow-400 md:text-base">NOBLE GROUP</span><span className="text-[10px] font-semibold tracking-[0.14em] text-white md:text-xs">INSTITUTE OF PHYSICAL EDUCATION</span></div>
        </Link>
        <div className="hidden lg:flex items-center gap-1">{menus.map((menu) => <div key={menu.name} className="group relative" onMouseEnter={() => setOpenMenu(menu.name)} onMouseLeave={() => setOpenMenu(null)}><Link href={menu.href} className="flex items-center gap-1 rounded-lg px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-yellow-400" onFocus={() => setOpenMenu(menu.name)}>{menu.name}<span className="text-[10px] opacity-70">⌄</span></Link><div className={`absolute left-1/2 top-full w-[310px] -translate-x-1/2 pt-2 transition-all duration-200 ${openMenu === menu.name ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}><div className="overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-2xl">{menu.items.map((item) => <Link key={item.href + item.label} href={item.href} className="group/item block rounded-xl px-4 py-3 transition hover:bg-blue-50" onClick={() => setOpenMenu(null)}><div className="flex items-center justify-between gap-3"><span className="font-semibold text-blue-900 group-hover/item:text-blue-700">{item.label}</span><span className="text-blue-500 transition group-hover/item:translate-x-1">→</span></div><p className="mt-1 text-xs leading-5 text-gray-500">{item.description}</p></Link>)}</div></div></div>)}</div>
        <div className="hidden lg:flex items-center gap-3"><Link href="/student/login" className="rounded-lg border border-yellow-400 px-4 py-2 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-blue-900">Student Login</Link><Link href="/admissions" className="rounded-lg bg-yellow-400 px-5 py-2 text-sm font-semibold text-blue-900 transition hover:bg-yellow-300 hover:-translate-y-0.5">Apply Now →</Link></div>
        <button className="rounded-lg p-2 lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen}><div className="w-6 space-y-1.5"><span className={`block h-0.5 bg-white transition ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} /><span className={`block h-0.5 bg-white transition ${mobileMenuOpen ? 'opacity-0' : ''}`} /><span className={`block h-0.5 bg-white transition ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} /></div></button>
      </div></div>
      {mobileMenuOpen && <div className="border-t border-blue-900 bg-blue-950 lg:hidden"><div className="container mx-auto space-y-1 px-4 py-4">{menus.map((menu) => { const expanded = openMenu === menu.name; return <div key={menu.name} className="border-b border-white/10 last:border-0"><div className="flex items-center"><Link href={menu.href} className="flex-1 py-3 font-semibold text-white" onClick={() => setMobileMenuOpen(false)}>{menu.name}</Link><button aria-label={`Expand ${menu.name}`} onClick={() => setOpenMenu(expanded ? null : menu.name)} className="px-3 py-3 text-yellow-400">{expanded ? '−' : '+'}</button></div><div className={`grid transition-all duration-200 ${expanded ? 'grid-rows-[1fr] pb-2 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden pl-3">{menu.items.map((item) => <Link key={item.href + item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-blue-100 hover:bg-white/10 hover:text-yellow-400">{item.label}</Link>)}</div></div></div>; })}<div className="grid gap-2 pt-4 sm:grid-cols-2"><Link href="/student/login" onClick={() => setMobileMenuOpen(false)} className="rounded-lg border border-yellow-400 px-4 py-3 text-center font-semibold text-yellow-400">Student Login</Link><Link href="/admissions" onClick={() => setMobileMenuOpen(false)} className="rounded-lg bg-yellow-400 px-4 py-3 text-center font-semibold text-blue-900">Apply Now</Link></div></div></div>}
    </nav>
  );
}