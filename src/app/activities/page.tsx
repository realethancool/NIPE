import Link from 'next/link';

export default function ActivitiesPage() {
  const activities = [
    {
      title: 'Technical Symposium',
      date: 'March 2026',
      description: 'Annual technical symposium with paper presentations and project exhibitions.',
      icon: '🔬',
    },
    {
      title: 'Sports Day',
      date: 'February 2026',
      description: 'Annual sports meet with various athletic competitions and games.',
      icon: '⚽',
    },
    {
      title: 'Cultural Fest',
      date: 'January 2026',
      description: 'Cultural festival showcasing music, dance, drama, and artistic talents.',
      icon: '🎭',
    },
    {
      title: 'Industrial Visit',
      date: 'December 2025',
      description: 'Visit to leading industries for practical exposure and learning.',
      icon: '🏭',
    },
    {
      title: 'Workshop on AI',
      date: 'November 2025',
      description: 'Hands-on workshop on Artificial Intelligence and Machine Learning.',
      icon: '🤖',
    },
    {
      title: 'Blood Donation Camp',
      date: 'October 2025',
      description: 'Social service activity organized in collaboration with local hospitals.',
      icon: '🩸',
    },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Activities</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Student Activities</h1>
          <p className="text-xl text-blue-100">Beyond Academics - Building Holistic Development</p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
                  <div className="text-5xl mb-2">{activity.icon}</div>
                  <h3 className="text-xl font-bold">{activity.title}</h3>
                  <p className="text-blue-200">{activity.date}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Clubs & Societies</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Technical Club', icon: '💻', desc: 'Robotics, coding, and innovation' },
              { name: 'Sports Club', icon: '⚽', desc: 'Various sports and fitness activities' },
              { name: 'Cultural Club', icon: '🎨', desc: 'Arts, music, and cultural events' },
              { name: 'Social Service Club', icon: '🤝', desc: 'Community service and outreach' },
            ].map((club) => (
              <div key={club.name} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-4xl mb-3">{club.icon}</div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">{club.name}</h3>
                <p className="text-gray-600 text-sm">{club.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}