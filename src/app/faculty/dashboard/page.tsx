'use client';

import { useEffect, useState } from 'react';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

type Subject = { id: string; code: string; name: string; credits: number; departmentId: string; semester: { id: string; number: number } };
type Student = { id: string; enrollmentNumber: string; name: string; email?: string | null; phone?: string | null; departmentId: string; programme: { name: string; code: string }; department: { name: string; code: string }; semester: { number: number } };
type ResultRow = { studentId: string; enrollmentNumber: string; name: string; marks: string; grade: string; gradePoint: string; credits: string };

export default function FacultyDashboard() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [timetable, setTimetable] = useState<any[]>([]);
  const [tab, setTab] = useState('overview');
  const [subjectId, setSubjectId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [period, setPeriod] = useState('1');
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [resultRows, setResultRows] = useState<ResultRow[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const selectedSubject = subjects.find((s) => s.id === subjectId);
  const classStudents = selectedSubject ? students.filter((s) => s.semester.number === selectedSubject.semester.number && s.departmentId === selectedSubject.departmentId) : [];

  useEffect(() => {
    Promise.all([fetch('/api/faculty/attendance').then((r) => r.json()), fetch('/api/faculty/students').then((r) => r.json()), fetch('/api/faculty/timetable').then((r) => r.json())]).then(([s, st, tt]) => {
      if (s.subjects) setSubjects(s.subjects);
      if (st.students) setStudents(st.students);
      if (tt.timetable) setTimetable(tt.timetable);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!subjectId || !selectedSubject) { setResultRows([]); return; }
    fetch(`/api/faculty/results?subjectId=${encodeURIComponent(subjectId)}`).then((r) => r.json()).then((d) => {
      const existing = new Map<string, any>();
      (d.results || []).forEach((r: any) => existing.set(r.student.id, r.subjects?.[0] || {}));
      setResultRows(classStudents.map((s) => { const row = existing.get(s.id) || {}; return { studentId: s.id, enrollmentNumber: s.enrollmentNumber, name: s.name, marks: row.marks ?? '', grade: row.grade ?? '', gradePoint: row.gradePoint ?? '', credits: row.credits ?? selectedSubject.credits ?? 0 }; }));
    });
  }, [subjectId, students]);

  useEffect(() => {
    if (!subjectId || !date || !period) { setAttendance({}); return; }
    fetch(`/api/faculty/attendance?subjectId=${encodeURIComponent(subjectId)}&date=${encodeURIComponent(date)}&period=${encodeURIComponent(period)}`).then((r) => r.json()).then((d) => {
      const next: Record<string, string> = {};
      (d.records || []).forEach((r: any) => { next[r.studentId] = r.status; });
      setAttendance(next);
    });
  }, [subjectId, date, period]);

  async function saveAttendance() {
    if (!subjectId) return setMessage('Select a subject first.');
    const r = await fetch('/api/faculty/attendance', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subjectId, date, period, records: classStudents.map((s) => ({ studentId: s.id, status: attendance[s.id] || 'PRESENT' })) }) });
    const d = await r.json();
    setMessage(r.ok ? `Saved ${d.count} attendance records.` : d.error || 'Unable to save attendance.');
  }

  async function saveResults() {
    if (!subjectId) return setMessage('Select a subject first.');
    const r = await fetch('/api/faculty/results', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subjectId, records: resultRows }) });
    const d = await r.json();
    setMessage(r.ok ? `Saved ${d.count} result records as draft.` : d.error || 'Unable to save results.');
  }

  if (loading) return <main className="min-h-screen bg-cream p-6"><div className="mx-auto max-w-6xl animate-pulse rounded-3xl bg-white p-8 shadow">Loading faculty workspace…</div></main>;

  const nav = [['overview', 'Overview'], ['students', 'My Students'], ['attendance', 'Attendance'], ['results', 'Results'], ['timetable', 'Timetable']];
  return <main className="min-h-screen bg-cream p-4 md:p-8"><div className="mx-auto max-w-7xl">
    <header className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 p-6 text-white shadow-xl md:p-8"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Faculty ERP</p><h1 className="mt-2 text-3xl font-bold md:text-4xl">Academic Workspace</h1><p className="mt-2 max-w-2xl text-blue-100">Manage the academic work assigned to you — students, attendance, results and timetable — without institution-wide administration.</p></header>
    <nav className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-white p-2 shadow md:grid-cols-5">{nav.map(([key, label]) => <button key={key} onClick={() => setTab(key)} className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${tab === key ? 'bg-blue-900 text-white shadow' : 'text-gray-600 hover:bg-blue-50'}`}>{label}</button>)}</nav>
    {message && <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">{message}</div>}
    {tab === 'overview' && <section className="grid gap-5 md:grid-cols-3"><Stat title="Assigned Subjects" value={subjects.length} detail="Subjects linked to your faculty account"/><Stat title="My Students" value={students.length} detail="Active students in assigned classes"/><Stat title="Timetable Entries" value={timetable.length} detail="Your scheduled teaching periods"/><div className="md:col-span-3 rounded-2xl bg-white p-6 shadow"><h2 className="text-xl font-bold text-blue-950">Faculty academic tools</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{['View assigned students', 'Mark class attendance', 'Enter subject results', 'View your timetable'].map((x) => <div key={x} className="rounded-xl border border-gray-100 bg-gray-50 p-4 font-medium text-gray-700">✓ {x}</div>)}</div></div></section>}
    {tab === 'students' && <section className="rounded-2xl bg-white p-5 shadow"><div className="mb-5"><h2 className="text-2xl font-bold text-blue-950">My Students</h2><p className="text-sm text-gray-500">Only students in the department and semesters of your assigned subjects are shown.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-gray-50 text-gray-500"><tr><th className="p-3">Enrollment</th><th>Name</th><th>Programme</th><th>Semester</th><th>Email</th><th>Phone</th></tr></thead><tbody>{students.map((s) => <tr key={s.id} className="border-t hover:bg-blue-50/40"><td className="p-3 font-medium">{s.enrollmentNumber}</td><td>{s.name}</td><td>{s.programme.code} — {s.programme.name}</td><td>Sem {s.semester.number}</td><td>{s.email || '—'}</td><td>{s.phone || '—'}</td></tr>)}</tbody></table></div></section>}
    {tab === 'attendance' && <section className="rounded-2xl bg-white p-5 shadow"><div className="mb-5"><h2 className="text-2xl font-bold text-blue-950">Attendance</h2><p className="text-sm text-gray-500">Record or edit attendance only for your assigned subjects and classes.</p></div><div className="grid gap-3 md:grid-cols-3"><select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="rounded-xl border p-3"><option value="">Select assigned subject</option>{subjects.map((s) => <option key={s.id} value={s.id}>{s.code} — {s.name} · Sem {s.semester.number}</option>)}</select><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-xl border p-3"/><select value={period} onChange={(e) => setPeriod(e.target.value)} className="rounded-xl border p-3">{[1,2,3,4,5,6,7].map((x) => <option key={x}>{x}</option>)}</select></div>{subjectId && <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[650px] text-left"><thead className="bg-gray-50 text-gray-500"><tr><th className="p-3">Enrollment</th><th>Name</th><th>Programme</th><th>Status</th></tr></thead><tbody>{classStudents.map((s) => <tr key={s.id} className="border-t"><td className="p-3">{s.enrollmentNumber}</td><td>{s.name}</td><td>{s.programme.code}</td><td><select value={attendance[s.id] || 'PRESENT'} onChange={(e) => setAttendance({ ...attendance, [s.id]: e.target.value })} className="rounded-lg border p-2"><option>PRESENT</option><option>ABSENT</option></select></td></tr>)}</tbody></table></div>}{subjectId && <button onClick={saveAttendance} className="mt-5 rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-800">Save Attendance</button>}</section>}
    {tab === 'results' && <section className="rounded-2xl bg-white p-5 shadow"><div className="mb-5"><h2 className="text-2xl font-bold text-blue-950">Subject Results</h2><p className="text-sm text-gray-500">Enter marks and grades for subjects assigned to you. Results are saved as drafts for administrative publishing.</p></div><select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="mb-5 w-full rounded-xl border p-3 md:max-w-xl"><option value="">Select assigned subject</option>{subjects.map((s) => <option key={s.id} value={s.id}>{s.code} — {s.name} · Sem {s.semester.number}</option>)}</select>{subjectId && <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-gray-50 text-gray-500"><tr><th className="p-3">Enrollment</th><th>Name</th><th>Marks</th><th>Grade</th><th>Grade Point</th><th>Credits</th></tr></thead><tbody>{resultRows.map((row, i) => <tr key={row.studentId} className="border-t"><td className="p-3">{row.enrollmentNumber}</td><td>{row.name}</td><td><input type="number" min="0" max="100" value={row.marks} onChange={(e) => setResultRows(resultRows.map((x, n) => n === i ? { ...x, marks: e.target.value } : x))} className="w-24 rounded-lg border p-2"/></td><td><input value={row.grade} onChange={(e) => setResultRows(resultRows.map((x, n) => n === i ? { ...x, grade: e.target.value.toUpperCase() } : x))} className="w-20 rounded-lg border p-2 uppercase"/></td><td><input type="number" min="0" max="10" step="0.01" value={row.gradePoint} onChange={(e) => setResultRows(resultRows.map((x, n) => n === i ? { ...x, gradePoint: e.target.value } : x))} className="w-24 rounded-lg border p-2"/></td><td><input type="number" min="0" value={row.credits} onChange={(e) => setResultRows(resultRows.map((x, n) => n === i ? { ...x, credits: e.target.value } : x))} className="w-20 rounded-lg border p-2"/></td></tr>)}</tbody></table></div>}{subjectId && <button onClick={saveResults} className="mt-5 rounded-xl bg-gold px-5 py-3 font-semibold text-blue-950 transition hover:brightness-95">Save Results as Draft</button>}</section>}
    {tab === 'timetable' && <section className="rounded-2xl bg-white p-5 shadow"><div className="mb-5"><h2 className="text-2xl font-bold text-blue-950">My Timetable</h2><p className="text-sm text-gray-500">Your scheduled teaching periods from the ERP.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{timetable.map((t) => <div key={t.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:-translate-y-1 hover:shadow"><div className="text-sm font-semibold text-blue-700">{days[t.dayOfWeek] || `Day ${t.dayOfWeek}`}</div><div className="mt-2 text-lg font-bold text-blue-950">{t.subject.code} — {t.subject.name}</div><div className="mt-2 text-sm text-gray-600">{t.startTime} – {t.endTime} · Sem {t.subject.semester.number}</div><div className="mt-1 text-sm text-gray-500">Room: {t.room || 'Not assigned'}</div></div>)}{!timetable.length && <div className="rounded-xl bg-gray-50 p-5 text-gray-500">No timetable entries have been assigned yet.</div>}</div></section>}
  </div></main>;
}

function Stat({ title, value, detail }: { title: string; value: number; detail: string }) { return <div className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"><p className="text-sm font-semibold text-gray-500">{title}</p><p className="mt-2 text-4xl font-bold text-blue-950">{value}</p><p className="mt-2 text-sm text-gray-500">{detail}</p></div>; }
