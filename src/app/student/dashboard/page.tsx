'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StudentDashboardPage() {
  const [student, setStudent] = useState<any>(null);
  const [error, setError] = useState('');
  useEffect(() => { fetch('/api/student/me').then(async r => { const d = await r.json(); if (!r.ok) throw new Error(d.error || 'Unable to load profile'); setStudent(d.student); }).catch(e => setError(e.message)); }, []);
  if (error) return <main className="p-8"><p className="text-red-600">{error}</p><Link href="/student/login" className="underline">Return to login</Link></main>;
  if (!student) return <main className="p-8">Loading student dashboard…</main>;
  const cards = [['📅','Attendance','/student/attendance'],['📊','Results','/student/results'],['💰','Fees','/student/fees'],['🗓️','Timetable','/student/timetable']];
  return <main className="min-h-screen bg-cream p-4 md:p-8"><div className="mx-auto max-w-6xl"><div className="rounded-2xl bg-white p-6 shadow"><p className="text-sm text-muted">Student Dashboard</p><h1 className="mt-1 text-3xl font-bold text-ink">Welcome, {student.name}</h1><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div><b>Enrollment</b><p>{student.enrollmentNumber}</p></div><div><b>Department</b><p>{student.department?.name || '—'}</p></div><div><b>Programme</b><p>{student.programme?.name || '—'}</p></div><div><b>Semester</b><p>{student.semester}</p></div></div></div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([icon,title,href]) => <Link key={href} href={href} className="rounded-2xl bg-white p-6 shadow hover:-translate-y-0.5 transition"><div className="text-3xl">{icon}</div><h2 className="mt-3 font-semibold">{title}</h2><p className="text-sm text-muted">Open {title.toLowerCase()}</p></Link>)}</div></div></main>;
}
