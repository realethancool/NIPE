'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    programme: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/admissions/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setFormData({ name: '', email: '', phone: '', programme: '' });
      } else {
        setMessage(data.error || 'Failed to submit enquiry');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to submit enquiry. Please try again.');
      setMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[600px] bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: 'url(/images/hero.png)' }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-700/70"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="flex items-center gap-2 mb-6 text-sm font-mono text-yellow-400 uppercase tracking-wider">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              <span>Future-Focused Education</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Shape Your
              <span className="text-yellow-400 italic"> Future</span>
            </h1>
            
            <p className="text-lg text-blue-100 mb-8 max-w-lg leading-relaxed">
              Noble Institute of Physical Education — a future-focused institution for ambitious learners seeking excellence in technical education.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/admissions" className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition inline-flex items-center gap-2">
                Apply Now
                <span>→</span>
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition inline-flex items-center gap-2">
                <span>▶</span>
                Watch Video
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-display font-bold text-yellow-400">2025</div>
                <div className="text-sm text-blue-100">Established</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-blue-300">95%</div>
                <div className="text-sm text-blue-100">Placement Rate</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-yellow-400">50+</div>
                <div className="text-sm text-blue-100">Recruiters</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-white">100%</div>
                <div className="text-sm text-blue-100">ST/SC Scholarship</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Form */}
          <div className="relative">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-yellow-400/20 to-blue-400/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-display font-bold text-blue-900 mb-2">
                  Quick Inquiry
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Get in touch with our admissions team
                </p>
                
                {message && (
                  <div className={`p-4 rounded-lg mb-4 ${
                    messageType === 'success' 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    {message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <select 
                    name="programme"
                    value={formData.programme}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Select Programme</option>
                    <option value="B.P.Ed.">B.P.Ed.</option>
                    <option value="B.P.Ed.">B.P.Ed.</option>
                    <option value="Mechanical Physical Education">Mechanical Physical Education</option>
                    <option value="B.P.Ed.">B.P.Ed.</option>
                  </select>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </form>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -left-8 top-20 bg-white rounded-xl p-4 shadow-xl">
              <div className="text-xs font-mono text-gray-500 uppercase">Ranking</div>
              <div className="text-2xl font-bold text-blue-900">#1</div>
              <div className="text-xs text-gray-500">in Gujarat</div>
            </div>
            
            <div className="absolute -right-4 bottom-20 bg-blue-600 rounded-xl p-4 shadow-xl">
              <div className="text-xs font-mono text-white uppercase">New Batch</div>
              <div className="text-xl font-bold text-white">2026-27</div>
              <div className="text-xs text-blue-100">Admissions Open</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
