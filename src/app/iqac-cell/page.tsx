import Link from 'next/link';

export default function IqacCellPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/student-center" className="hover:text-blue-600">Student Center</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">IQAC Cell</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Internal Quality Assurance Cell</h1>
          <p className="text-xl text-blue-100">Ensuring academic excellence through quality assurance</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">IQAC Overview</h2>
            
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              The Internal Quality Assurance Cell (IQAC) at Noble Institute of Physical Education is responsible for ensuring and enhancing the quality of education through continuous evaluation and improvement.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-3">📊 Quality Monitoring</h3>
                <p className="text-gray-600">Regular monitoring of academic and administrative quality.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-3">📈 Accreditation Support</h3>
                <p className="text-gray-600">Support for NBA and NAAC accreditation processes.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-3">📝 Feedback System</h3>
                <p className="text-gray-600">Systematic feedback collection from students and stakeholders.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-3">🎯 Improvement Planning</h3>
                <p className="text-gray-600">Strategic planning for continuous quality improvement.</p>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded mb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Vision</h3>
              <p className="text-gray-700">To be a center of excellence in quality assurance, promoting academic and institutional development.</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Contact IQAC</h3>
              <p className="text-gray-700">For quality assurance and accreditation-related queries.</p>
              <p className="text-gray-600 mt-2">📞 +91-92654-63335</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}