import Link from 'next/link';
import Navbar from '../components/NavbarBlue';
import Hero from '../components/HeroBlue';
import ProgrammesSection from '../components/ProgrammesSection';
import CampusSection from '../components/CampusSection';
import StatsSection from '../components/StatsSectionBlue';
import Footer from '../components/FooterBlue';
import AnnouncementBar from '../components/AnnouncementBar';

const portals = [
  { title: 'Student Portal', description: 'Access your academic dashboard, attendance records, fee details, examination results and timetable in one place.', href: '/student/login', label: 'Enter Student Portal' },
  { title: 'Faculty Portal', description: 'Faculty access for academic activities, assigned subjects and student attendance management.', href: '/faculty/login', label: 'Enter Faculty Portal' },
];

export default function HomePage() {
  return <main className="min-h-screen"><AnnouncementBar /><Navbar /><Hero />
    <section className="px-4 py-10 md:px-8 md:py-14"><div className="mx-auto max-w-7xl"><div className="mb-7"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Noble Digital Campus</p><h2 className="mt-2 text-2xl font-bold md:text-3xl">Student & Faculty Portals</h2><p className="mt-2 max-w-2xl text-muted">Secure access to academic information and day-to-day campus services for students and faculty.</p></div><div className="grid gap-4 sm:grid-cols-2">{portals.map(p=><Link key={p.href} href={p.href} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><h3 className="text-lg font-bold">{p.title}</h3><p className="mt-2 min-h-[72px] text-sm leading-6 text-muted">{p.description}</p><span className="mt-5 inline-flex items-center font-semibold text-gold transition group-hover:translate-x-1">{p.label} →</span></Link>)}</div></div></section>
    <ProgrammesSection /><CampusSection /><StatsSection /><Footer />
  </main>;
}
