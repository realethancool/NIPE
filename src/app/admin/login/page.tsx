'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) router.push('/admin/dashboard');
      else setError(data.error || 'Login failed');
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink via-ink-2 to-ink flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-ink mb-2">Noble Institute of Physical Education</h1>
            <p className="text-muted text-sm uppercase tracking-widest">Administration Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">Email / Username</label>
              <input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-line bg-cream/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition" placeholder="admin@noble.edu.in" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink mb-2">Password</label>
              <input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-line bg-cream/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition" placeholder="••••••••" required />
            </div>
            {error && <div className="bg-coral/10 border border-coral/30 text-coral px-4 py-3 rounded-lg text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-gold text-ink font-semibold py-3 px-4 rounded-lg hover:bg-gold/90 transition disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <a href="/admin/forgot-password" className="text-sm text-muted hover:text-ink transition">Forgot password?</a>
            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" id="remember" className="rounded border-line" />
              <label htmlFor="remember" className="text-sm text-muted">Remember me</label>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <a href="/" className="text-muted hover:text-ink text-sm transition">← Back to website</a>
        </div>
      </div>
    </div>
  );
}
