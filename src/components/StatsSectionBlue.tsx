export default function StatsSection() {
  const stats = [
    { value: '2025', label: 'Year Established', color: 'text-yellow-400' },
    { value: '95%', label: 'Placement Rate', color: 'text-blue-300' },
    { value: '50+', label: 'Industry Partners', color: 'text-yellow-400' },
    { value: '100%', label: 'ST/SC Scholarship', color: 'text-white' },
  ];

  return (
    <section className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4">Our Impact</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">Transforming lives through quality education and industry partnerships</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-5xl font-display font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-blue-100">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>AICTE Approved • GTU Affiliated</span>
          </div>
        </div>
      </div>
    </section>
  );
}
