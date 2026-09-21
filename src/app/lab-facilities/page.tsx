import Link from 'next/link';

export default function LabFacilitiesPage() {
  const facilities = [
    { 
      name: 'Activity Arena', 
      image: '/images/facility/ACTIVITY ARENA.png',
      description: 'Multipurpose activity arena for sports, cultural events, and recreational activities.'
    },
    { 
      name: 'Admission Cell', 
      image: '/images/facility/ADMISSION CELL.png',
      description: 'Dedicated admission cell with experienced counselors to guide students through the admission process.'
    },
    { 
      name: 'Cafeteria', 
      image: '/images/facility/cafe1.png',
      description: 'Modern cafeteria serving nutritious and hygienic food to students and staff.'
    },
    { 
      name: 'Chemistry Laboratory', 
      image: '/images/facility/CHEMISTRY LAB.JPG',
      description: 'Well-equipped chemistry laboratory with modern equipment for practical learning and research.'
    },
    { 
      name: 'Civil Physical Education Laboratory', 
      image: '/images/facility/CIVIL Physical Education LAB.jpeg',
      description: 'Advanced civil Physical Education lab with surveying equipment, testing machines, and construction materials.'
    },
    { 
      name: 'Garden', 
      image: '/images/facility/garden1.png',
      description: 'Beautiful landscaped garden providing a peaceful environment for relaxation and study.'
    },
    { 
      name: 'Campus Garden', 
      image: '/images/facility/garden2.jpeg',
      description: 'Serene campus garden with lush greenery for students to enjoy nature and unwind.'
    },
    { 
      name: 'Hostel', 
      image: '/images/facility/Hostel.png',
      description: 'Comfortable and secure hostel facilities with 24/7 security, spacious rooms, and modern amenities.'
    },
    { 
      name: 'Library', 
      image: '/images/facility/LIBRARY.JPG',
      description: 'Extensive library with a vast collection of books, journals, and digital resources for academic excellence.'
    },
    { 
      name: 'Mechanical Physical Education Laboratory', 
      image: '/images/facility/mechanical Physical Education lab.png',
      description: 'State-of-the-art mechanical Physical Education lab with CNC machines, lathe, welding, and fabrication equipment.'
    },
    { 
      name: 'Physics Laboratory', 
      image: '/images/facility/PHYSICS LAB.JPG',
      description: 'Modern physics laboratory equipped with the latest instruments for experimental learning.'
    },
    { 
      name: 'Play & Recreation Area', 
      image: '/images/facility/PLAY&RECREATION AREA.png',
      description: 'Dedicated play and recreation area for students to relax, unwind, and engage in recreational activities.'
    },
    { 
      name: 'Reception', 
      image: '/images/facility/RECEPTION.png',
      description: 'Professional reception area with friendly staff to assist visitors, students, and parents.'
    },
    { 
      name: 'Transportation', 
      image: '/images/facility/transport.png',
      description: 'Reliable transportation service with comfortable buses for commuting students and staff.'
    },
    { 
      name: 'Workshop', 
      image: '/images/facility/workshop.png',
      description: 'Fully equipped workshop for practical training in manufacturing processes and mechanical operations.'
    },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Lab Facilities</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Laboratory Facilities</h1>
          <p className="text-xl text-blue-100">State-of-the-art facilities and facilities for practical learning</p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <img 
                    src={facility.image} 
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{facility.name}</h3>
                  <p className="text-gray-600 text-sm">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Facility Features</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-3">🖥️</div>
              <h3 className="font-bold text-blue-900">Modern Equipment</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-3">👨‍🏫</div>
              <h3 className="font-bold text-blue-900">Expert Staff</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="font-bold text-blue-900">Extended Hours</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-blue-900">Safety First</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
