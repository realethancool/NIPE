import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-display font-bold text-yellow-400 mb-4">NOBLE</h3>
            <p className="text-blue-100 text-sm mb-4">A future-focused institution committed to excellence in technical education and holistic development.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition">f</a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition">𝕏</a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition">in</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><Link href="/about" className="hover:text-yellow-400 transition">About Us</Link></li>
              <li><Link href="/courses" className="hover:text-yellow-400 transition">Programmes</Link></li>
              <li><Link href="/admissions" className="hover:text-yellow-400 transition">Admissions</Link></li>
              <li><Link href="/placements" className="hover:text-yellow-400 transition">Placements</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Programmes</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><Link href="/courses" className="hover:text-yellow-400 transition">Computer Engineering</Link></li>
              <li><Link href="/courses" className="hover:text-yellow-400 transition">Civil Engineering</Link></li>
              <li><Link href="/courses" className="hover:text-yellow-400 transition">Mechanical Engineering</Link></li>
              <li><Link href="/courses" className="hover:text-yellow-400 transition">Information Technology</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>📍 Dabhoi Karjan Road, Mota Habipura</li>
              <li>📍 Gujarat - 391110</li>
              <li>📞 +91-92654-63335</li>
              <li>📞 +91-92654-15454</li>
              <li>✉️ nobleinstituteoftechnology2025@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-blue-100">© 2026 Noble Institute of Technology. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-blue-100">
            <Link href="/about" className="hover:text-yellow-400 transition">Privacy Policy</Link>
            <Link href="/courses" className="hover:text-yellow-400 transition">Terms of Service</Link>
            <Link href="/" className="hover:text-yellow-400 transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
