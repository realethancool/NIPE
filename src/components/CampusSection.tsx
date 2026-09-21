export default function CampusSection() {
  const facilities = [
    { name: 'Modern Labs', icon: '🔬', description: 'State-of-the-art laboratories' },
    { name: 'Digital Library', icon: '📚', description: 'Extensive digital resources' },
    { name: 'Sports Complex', icon: '⚽', description: 'Multi-sport facilities' },
    { name: 'Smart Classrooms', icon: '🎓', description: 'Technology-enabled learning' },
    { name: 'Hostel', icon: '🏠', description: 'Comfortable accommodation' },
    { name: 'Cafeteria', icon: '🍽️', description: 'Nutritious meal options' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-display font-bold text-blue-900 mb-6">
              Life at Noble
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Experience a vibrant campus life with world-class facilities that support both academic excellence and personal growth. Our modern infrastructure provides the perfect environment for learning and development.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {facilities.map((facility) => (
                <div key={facility.name} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{facility.icon}</span>
                  <div>
                    <h4 className="font-semibold text-blue-900">{facility.name}</h4>
                    <p className="text-sm text-gray-600">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Explore Campus →
            </button>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-yellow-100 rounded-3xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🏫</div>
                <p className="text-blue-900 font-semibold">Campus Gallery</p>
                <p className="text-gray-600 text-sm">Interactive Tour Coming Soon</p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}