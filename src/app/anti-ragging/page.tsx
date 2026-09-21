import Link from 'next/link';

export default function AntiRaggingPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/student-center" className="hover:text-blue-600">Student Center</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Anti-Ragging</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Anti-Ragging Cell</h1>
          <p className="text-xl text-blue-100">Zero tolerance towards ragging - Safe campus for all</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Anti-Ragging Policy</h2>
            
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded mb-6">
              <h3 className="text-xl font-bold text-red-700 mb-3">⚠️ Zero Tolerance Policy</h3>
              <p className="text-gray-700">Noble Institute of Physical Education follows a strict zero-tolerance policy towards ragging. Any form of ragging is a criminal offense and will be dealt with severely.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-3">📞 24/7 Helpline</h3>
                <p className="text-gray-600">Round-the-clock helpline for reporting ragging incidents.</p>
                <p className="text-blue-900 font-bold mt-2">+91-92654-63335</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-3">📧 Email Support</h3>
                <p className="text-gray-600">Email for confidential reporting.</p>
                <p className="text-blue-900 font-bold mt-2">antiragging@noble.edu.in</p>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded mb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Committee Members</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Principal - Chairperson</li>
                <li>• Faculty Representatives</li>
                <li>• Student Representatives</li>
                <li>• Local Police Representative</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Important Note</h3>
              <p className="text-gray-700">Ragging is punishable under law. Students found guilty will face disciplinary action and legal proceedings.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}