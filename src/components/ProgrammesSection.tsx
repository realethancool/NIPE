import Link from 'next/link';

export default function ProgrammesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Academic Programme</p>
          <h2 className="mt-3 text-4xl font-display font-bold text-blue-950 mb-4">Bachelor of Physical Education</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Professional education in physical education, sports, fitness, coaching and human movement.</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Link href="/courses/bachelor-of-physical-education" className="group block bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-56 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-800 flex items-center justify-center text-8xl">🏃‍♂️</div>
            <div className="p-7">
              <div className="text-xs font-mono text-amber-600 uppercase tracking-wider mb-2">B.P.Ed.</div>
              <h3 className="text-2xl font-bold text-blue-950 mb-3 group-hover:text-blue-700 transition">Bachelor of Physical Education</h3>
              <p className="text-gray-600 leading-7">A focused undergraduate programme for aspiring physical education professionals, sports coaches and fitness educators.</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-950">Explore Programme <span>→</span></span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}