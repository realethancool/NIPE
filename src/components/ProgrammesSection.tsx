import Link from 'next/link';

export default function ProgrammesSection() {
  const programmes = [
    { name: 'B.P.Ed.', code: 'CE', duration: '3 Years', seats: 120, image: '💻' },
    { name: 'B.P.Ed.', code: 'CV', duration: '3 Years', seats: 60, image: '🏗️' },
    { name: 'Mechanical Physical Education', code: 'ME', duration: '3 Years', seats: 60, image: '⚙️' },
    { name: 'B.P.Ed.', code: 'IT', duration: '3 Years', seats: 60, image: '🔧' },
    { name: 'Bachelor of Physical Education', code: 'B.P.Ed.', duration: '4 Years', seats: 120, image: '📊' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12"><h2 className="text-4xl font-display font-bold text-blue-900 mb-4">Our Programmes</h2><p className="text-gray-600 max-w-2xl mx-auto">Explore our academic programmes and current intake capacity.</p></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {programmes.map((programme) => <Link key={programme.code} href="/courses" className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"><div className="h-44 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-6xl">{programme.image}</div><div className="p-5"><div className="text-xs font-mono text-blue-600 uppercase tracking-wider mb-2">{programme.code}</div><h3 className="text-lg font-bold text-blue-900 mb-3 group-hover:text-blue-600 transition">{programme.name}</h3><div className="flex items-center justify-between text-sm text-gray-600"><span>{programme.duration}</span><span>{programme.seats} Seats</span></div></div></Link>)}
        </div>
        <div className="text-center mt-12"><Link href="/courses" className="inline-flex items-center gap-2 text-blue-900 font-semibold hover:text-blue-600 transition">View All Programmes <span>→</span></Link></div>
      </div>
    </section>
  );
}
