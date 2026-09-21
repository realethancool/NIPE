'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const courses = [
  'Computer Physical Education',
  'Civil Physical Education',
  'Mechanical Physical Education',
  'Information Technology',
  'Bachelor of Business Administration',
];

const documentFields = [
  { key: 'tenthMarksheet', label: '10th Marksheet (SSC)', required: true },
  { key: 'twelfthMarksheet', label: '12th Marksheet (HSC)', required: false },
  { key: 'schoolLeaving', label: 'School Leaving Certificate', required: true },
  { key: 'incomeCertificate', label: 'Income Certificate', required: false },
  { key: 'aadharCard', label: 'Aadhar Card', required: true },
  { key: 'allotmentLetter', label: 'Gujarat CET/ACPC Allotment Letter', required: false },
  { key: 'nonCreamyLayer', label: 'Non-Creamy Layer Certificate', required: false },
];

function AdmissionApplyForm() {
  const searchParams = useSearchParams();
  const initialCourse = searchParams.get('course') || '';
  const [form, setForm] = useState({ name: '', age: '', phone: '', email: '', preferredCourse: courses.includes(initialCourse) ? initialCourse : '', caste: '' });
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{ applicationNumber: string; pdfUrl: string } | null>(null);

  const casteCertificateRequired = useMemo(() => form.caste === 'SC' || form.caste === 'ST', [form.caste]);
  const setField = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const setFile = (key: string, file: File | null) => setFiles((current) => ({ ...current, [key]: file }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true); setError('');
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => body.append(key, value));
      Object.entries(files).forEach(([key, value]) => { if (value) body.append(key, value); });
      const response = await fetch('/api/admissions/application', { method: 'POST', body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to submit application.');
      setSuccess({ applicationNumber: data.applicationNumber, pdfUrl: data.pdfUrl });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return <main className="min-h-screen bg-slate-50 py-16 px-4"><div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-blue-100 p-8 md:p-12 text-center"><div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-4xl">✓</div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Application Submitted</p><h1 className="mt-3 text-4xl font-bold text-slate-900">Thank you for applying to Noble Institute of Physical Education</h1><p className="mt-4 text-slate-600">Your application number is <strong>{success.applicationNumber}</strong>. Keep this number for future communication.</p><div className="mt-8 flex flex-col sm:flex-row justify-center gap-3"><a href={success.pdfUrl} className="rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800">Download Application PDF</a><a href="/courses" className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50">Back to Courses</a></div></div></main>;
  }

  return <main className="min-h-screen bg-slate-50 py-10 md:py-16 px-4"><div className="max-w-5xl mx-auto"><div className="mb-8"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Noble Institute of Physical Education</p><h1 className="mt-2 text-4xl md:text-5xl font-bold text-slate-900">Admission Application</h1><p className="mt-3 text-slate-600 max-w-3xl">Complete the form carefully. Your information and uploaded documents will be securely submitted to the institute for admission processing.</p></div><form onSubmit={submit} className="space-y-8"><section className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-8"><h2 className="text-2xl font-bold text-slate-900">1. Student Details</h2><div className="mt-6 grid md:grid-cols-2 gap-5"><label className="block md:col-span-2"><span className="label">Full Name *</span><input required value={form.name} onChange={(e) => setField('name', e.target.value)} className="input" placeholder="Enter student's full name" /></label><label className="block"><span className="label">Age *</span><input required type="number" min="14" max="60" value={form.age} onChange={(e) => setField('age', e.target.value)} className="input" placeholder="Age" /></label><label className="block"><span className="label">Mobile Number *</span><input required inputMode="numeric" value={form.phone} onChange={(e) => setField('phone', e.target.value)} className="input" placeholder="10-digit mobile number" /></label><label className="block"><span className="label">Email ID *</span><input required type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} className="input" placeholder="student@example.com" /></label><label className="block"><span className="label">Preferred Course *</span><select required value={form.preferredCourse} onChange={(e) => setField('preferredCourse', e.target.value)} className="input"><option value="">Select a course</option>{courses.map((course) => <option key={course}>{course}</option>)}</select></label><label className="block"><span className="label">Caste Category *</span><select required value={form.caste} onChange={(e) => setField('caste', e.target.value)} className="input"><option value="">Select category</option><option>SC</option><option>ST</option><option>OBC</option><option>General</option></select></label></div>{casteCertificateRequired && <div className="mt-5 rounded-2xl bg-amber-50 border border-amber-200 p-5"><FileInput label="Caste Certificate *" required file={files.casteCertificate} onChange={(file) => setFile('casteCertificate', file)} accept="image/*,.pdf" /><p className="mt-2 text-xs text-amber-800">Required for SC/ST applicants.</p></div>}</section><section className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-8"><h2 className="text-2xl font-bold text-slate-900">2. Required Documents</h2><p className="mt-2 text-sm text-slate-500">PDF, JPG, JPEG and PNG are accepted. Documents are limited in size for secure submission.</p><div className="mt-6 grid md:grid-cols-2 gap-5">{documentFields.map((item) => <FileInput key={item.key} label={`${item.label}${item.required ? ' *' : ' (optional)'}`} required={item.required} file={files[item.key] || null} onChange={(file) => setFile(item.key, file)} accept="image/*,.pdf" />)}</div></section><section className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-8"><h2 className="text-2xl font-bold text-slate-900">3. Passport Size Photo</h2><p className="mt-2 text-sm text-slate-500">Upload one recent passport-size photograph.</p><div className="mt-6 max-w-md"><FileInput label="Passport Size Photo *" required file={files.passportPhoto1 || null} onChange={(file) => setFile('passportPhoto1', file)} accept="image/*" /></div></section>{error && <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">{error}</div>}<button disabled={submitting} type="submit" className="w-full rounded-2xl bg-blue-900 px-6 py-4 text-lg font-bold text-white shadow-lg hover:bg-blue-800 disabled:opacity-60">{submitting ? 'Submitting Application…' : 'Submit Admission Application'}</button><p className="text-center text-xs text-slate-500">By submitting, you confirm that the information and documents provided are accurate.</p></form></div><style jsx>{`.label{display:block;margin-bottom:.5rem;font-size:.875rem;font-weight:600;color:#334155}.input{width:100%;border:1px solid #cbd5e1;border-radius:.75rem;padding:.8rem .9rem;background:#fff;outline:none}.input:focus{border-color:#1e3a8a;box-shadow:0 0 0 3px rgba(30,58,138,.1)}`}</style></main>;
}

export default function AdmissionApplyPage() {
  return <Suspense fallback={<main className="min-h-screen bg-slate-50 flex items-center justify-center px-4"><div className="rounded-2xl bg-white px-6 py-5 shadow-lg text-slate-700">Loading admission application…</div></main>}><AdmissionApplyForm /></Suspense>;
}

function FileInput({ label, required, file, onChange, accept }: { label: string; required?: boolean; file: File | null; onChange: (file: File | null) => void; accept: string }) {
  return <label className="block rounded-2xl border border-dashed border-slate-300 p-4 hover:border-blue-500 transition cursor-pointer"><span className="block text-sm font-semibold text-slate-800">{label}</span><span className="block mt-2 text-xs text-slate-500">{file ? file.name : 'Choose file'}</span><input required={required} type="file" accept={accept} onChange={(e) => onChange(e.target.files?.[0] || null)} className="sr-only" /></label>;
}
