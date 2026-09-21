'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FacultyPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const faculty = [
    { 
      name: 'Prof. Dayma Aamir Raza Dilawar Khan', 
      designation: 'Professor', 
      department: 'Computer Physical Education', 
      image: '/images/faculty/PROF DAYMA AAMIR RAZA DILAWAR KHAN.png' 
    },
    { 
      name: 'Prof. Dhokiya Rohit', 
      designation: 'Professor', 
      department: 'Civil Physical Education', 
      image: '/images/faculty/PROF DHOKIYA ROHIT.png' 
    },
    { 
      name: 'Prof. Ketan Arvindbhai Panchal', 
      designation: 'Professor', 
      department: 'All Department', 
      image: '/images/faculty/PROF KETAN ARVINDBHAI PANCHAL.png' 
    },
    { 
      name: 'Prof. Kirtan jitendrakumar Patel', 
      designation: 'Professor', 
      department: 'Information Technology', 
      image: '/images/faculty/PROF KIRTAN JITENDRAKUMAR PATEL.png' 
    },
    { 
      name: 'Prof. Mona Hemantbhai Chavda', 
      designation: 'Professor', 
      department: 'Computer Physical Education', 
      image: '/images/faculty/PROF MONA HEMANTHBHAI CHAVDA.png' 
    },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Faculty</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Faculty</h1>
          <p className="text-xl text-blue-100">Experienced educators dedicated to student success</p>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition text-center">
                <div className="mb-4 cursor-pointer" onClick={() => setSelectedImage(member.image)}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover rounded-lg border-2 border-blue-200 hover:border-blue-500 transition"
                  />
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-1">{member.name}</h3>
                <p className="text-yellow-600 font-semibold mb-1 text-sm">{member.designation}</p>
                <p className="text-gray-600 text-sm">{member.department}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">5+</div>
              <div className="text-gray-600">Faculty Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">15+</div>
              <div className="text-gray-600">Years Avg Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">50+</div>
              <div className="text-gray-600">Research Papers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">100%</div>
              <div className="text-gray-600">Dedication</div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-screen">
            <img 
              src={selectedImage} 
              alt="Full size faculty photo"
              className="max-w-full max-h-screen object-contain"
            />
            <button 
              className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
