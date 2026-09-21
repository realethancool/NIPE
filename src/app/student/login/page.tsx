'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentLoginPage() {
  const router = useRouter();
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/student/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentNumber, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      router.push('/student/dashboard');
      router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : 'Login failed'); }
    finally { setLoading(false); }
  }

  return <main className="min-h-screen flex items-center justify-center bg-cream px-4 py-10">
    <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-line">
      <h1 className="text-3xl font-bold text-ink">Student Login</h1>
      <p className="mt-2 text-muted">Sign in with your enrollment number.</p>
      {error && <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <label className="block mt-6 text-sm font-medium">Enrollment Number</label>
      <input required value={enrollmentNumber} onChange={e => setEnrollmentNumber(e.target.value)} className="mt-2 w-full rounded-lg border border-line px-4 py-3" autoComplete="username" />
      <label className="block mt-4 text-sm font-medium">Password</label>
      <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-line px-4 py-3" autoComplete="current-password" />
      <button disabled={loading} className="mt-6 w-full rounded-lg bg-gold px-4 py-3 font-semibold text-ink disabled:opacity-50">{loading ? 'Signing in…' : 'Login'}</button>
    </form>
  </main>;
}
