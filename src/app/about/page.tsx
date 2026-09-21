import Image from 'next/image';
import Link from 'next/link';

const futureFocus = [
  'Technology-driven and practical learning environments',
  'Modern laboratories, digital infrastructure, and project-based education',
  'Innovation, research, entrepreneurship, and problem-solving',
  'Stronger industry exposure, internships, and career readiness',
  'Future-ready learning across emerging areas of technology',
  'Developing responsible professionals who contribute to society',
];

const values = [
  'Excellence in education and continuous learning',
  'Integrity, discipline, and ethical responsibility',
  'Innovation, curiosity, and creative thinking',
  'Student-centric growth and individual potential',
  'Practical skills and real-world problem solving',
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-white text-gray-900">
      <div className="border-b border-gray-200 bg-gray-50 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-sm text-gray-600 sm:px-6 lg:px-8">
          <Link href="/" className="transition-colors hover:text-blue-700">Home</Link><span>/</span><span className="font-medium text-gray-900">About Noble</span>
        </div>
      </div>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-20 text-white sm:py-24">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" /><div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-3xl animate-[fadeInUp_.7s_ease-out]"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Noble Institute of Physical Education</p><h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">About Noble</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100 sm:text-xl">Building an educational environment where knowledge, technology, character, and ambition come together to prepare students for the future.</p></div></div>
      </section>
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div className="animate-[fadeInUp_.7s_ease-out]"><span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Our Vision</span><h2 className="mt-3 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">A future built through education</h2><p className="mt-6 text-lg leading-8 text-gray-700">Noble Institute of Physical Education envisions becoming a forward-looking centre of technical education where students learn beyond textbooks and develop the confidence to create, innovate, and solve real-world problems.</p><p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">Our long-term direction is to build an ecosystem that connects strong academic foundations with practical experience, emerging technologies, innovation, industry exposure, and responsible citizenship. We want every learner to leave Noble with knowledge they can apply, skills they can demonstrate, and the mindset to keep learning throughout their career.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{futureFocus.map((item, index) => <div key={item} className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"><div className="flex gap-3"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-950 text-xs font-bold text-amber-300">{String(index + 1).padStart(2, '0')}</span><p className="text-sm font-medium leading-6 text-gray-700">{item}</p></div></div>)}</div></div>
            <div className="relative animate-[fadeInUp_.9s_ease-out] lg:pt-2">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-100 via-white to-amber-50 opacity-80 blur-xl" />
              <div className="relative rounded-[2rem] border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
                <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Leadership</p>
                <div className="mt-6 grid gap-8 sm:grid-cols-2">
                  <div className="flex flex-col items-center text-center"><div className="relative"><div className="absolute -inset-2 rounded-full bg-gradient-to-br from-amber-300 via-white to-blue-300 opacity-90" /><div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-lg"><Image src="/images/vision/president.jpg" alt="A.A. MADHWANI, Founder and Chairman of Noble Institute of Physical Education" fill sizes="144px" className="object-cover" priority /></div></div><h2 className="mt-5 text-xl font-bold text-blue-950">A.A. MADHWANI</h2><p className="mt-1 text-sm font-semibold text-blue-800">Founder &amp; Chairman</p><p className="mt-3 text-sm leading-6 text-gray-600">Guided by a commitment to meaningful education, institutional growth, and opportunities that help students build purposeful careers.</p></div>
                  <div className="flex flex-col items-center text-center"><div className="relative"><div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-300 via-white to-amber-300 opacity-90" /><div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-lg"><Image src="/images/vision/campus_director.png" alt="Naina Solanki, Campus Director of Noble Institute of Physical Education" fill sizes="144px" className="object-cover" /></div></div><h2 className="mt-5 text-xl font-bold text-blue-950">NAINA SOLANKI</h2><p className="mt-1 text-sm font-semibold text-blue-800">Campus Director</p><p className="mt-3 text-sm leading-6 text-gray-600">Supporting the academic and institutional environment with a focus on student development, campus growth, and a positive learning experience.</p></div>
                </div>
                <div className="my-7 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /><blockquote className="text-center text-lg font-medium leading-8 text-gray-800 sm:text-xl">“Education should not only prepare students for examinations; it should prepare them to understand the world, face challenges, and create a better future.”</blockquote><p className="mt-4 text-center text-sm font-semibold text-blue-900">Noble Institute of Physical Education</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-gray-200 bg-gray-50 py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-8 lg:grid-cols-2"><div className="rounded-3xl bg-blue-950 p-7 text-white shadow-lg sm:p-9"><span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">Our Mission</span><h2 className="mt-3 text-3xl font-bold">Learning that connects with life</h2><p className="mt-5 leading-8 text-blue-100">To provide quality education that combines sound fundamentals, practical skills, technology, mentorship, and ethical values. We aim to create an environment where students can discover their strengths, gain confidence through hands-on learning, and become capable professionals ready to contribute to their communities and the wider world.</p></div><div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9"><span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Our Values</span><h2 className="mt-3 text-3xl font-bold text-blue-950">What we stand for</h2><div className="mt-6 space-y-4">{values.map((value) => <div key={value} className="flex items-start gap-3"><span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">✓</span><span className="leading-6 text-gray-700">{value}</span></div>)}</div></div></div></div></section>
      <section className="py-16 sm:py-20 lg:py-24"><div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"><span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Looking Ahead</span><h2 className="mt-3 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">Preparing students for what comes next</h2><p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">Noble Institute of Physical Education aims to continuously evolve with the changing world of technology and education. Our future focus is on stronger practical learning, better digital experiences, innovation-led student projects, meaningful industry exposure, and an academic culture that encourages curiosity and lifelong learning.</p><div className="mt-8 inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-900">Learn today. Build tomorrow.</div></div></section>
    </div>
  );
}
