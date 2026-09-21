import Link from 'next/link';

export default function WomenCommunitiesPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/student-center" className="hover:text-blue-600">Student Center</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Women's Communities</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Women's Communities Cell</h1>
          <p className="text-xl text-blue-100">Empowering women students for a brighter future</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Women's Welfare Cell</h2>
            
            <div className="bg-pink-50 border-l-4 border-pink-400 p-6 rounded mb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">🏠 Girls Hostel Available</h3>
              <p className="text-gray-700">Safe and comfortable hostel facilities available for female students with 24/7 security and supervision.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-3">👩‍🎓 Women's Cell</h3>
                <p className="text-gray-600">Dedicated cell for women's welfare and grievance redressal.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-3">🛡️ Safety & Security</h3>
                <p className="text-gray-600">Safe campus environment with CCTV surveillance.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-3">💼 Career Support</h3>
                <p className="text-gray-600">Special career guidance and placement support for women.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-3">🏋️ Health & Wellness</h3>
                <p className="text-gray-600">Health camps and wellness programs for female students.</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Contact Women's Cell</h3>
              <p className="text-gray-700">For women's welfare and hostel-related queries.</p>
              <p className="text-gray-600 mt-2">📞 +91-92654-63335</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}