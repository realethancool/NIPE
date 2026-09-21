'use client';

import Link from 'next/link';

const learningAreas=[
  ['01','🏃','Physical Education','Foundations, movement, teaching principles and practical learning.'],
  ['02','🏅','Sports & Games','Participation, skills, rules, practice and coaching-oriented learning.'],
  ['03','🏋️','Fitness & Conditioning','Training, physical development, endurance and active wellbeing.'],
  ['04','🧠','Sports Psychology','Motivation, behaviour, confidence and performance awareness.'],
  ['05','🩺','Health & Wellness','Healthy living, wellbeing and responsible physical activity.'],
  ['06','👨‍🏫','Teaching Methodology','Planning, demonstration, communication and educational practice.'],
  ['07','📊','Assessment','Observation, feedback, evaluation and reflective learning.'],
  ['08','🌱','Leadership','Teamwork, discipline, responsibility and communication.'],
];

const journey=[
  ['01','Foundation','Build a strong understanding of physical education and human movement.'],
  ['02','Theory','Connect academic concepts with sport, health and educational practice.'],
  ['03','Practical','Learn through activity, demonstration, participation and structured practice.'],
  ['04','Teaching','Develop the confidence to plan, communicate and guide learners.'],
  ['05','Professional Preparation','Bring knowledge, practical skills and leadership together.'],
];

const skills=['Communication','Leadership','Teamwork','Discipline','Coaching','Planning','Observation','Confidence'];

export default function AcademicsPage(){
 return <main className="min-h-screen bg-[#fbfaf6] text-[#182426]">
  <header className="nipe-nav sticky top-0 z-50">
   <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
    <Link href="/" className="flex min-w-0 items-center gap-3">
     <img src="/images/logo.png" alt="Noble Institute of Physical Education Logo" className="h-11 w-auto object-contain md:h-14"/>
     <strong className="hidden max-w-xs text-sm tracking-[.12em] text-[#e0af43] sm:block">Noble Institute of Physical Education</strong>
    </Link>
    <nav className="flex items-center gap-1">
     <Link href="/" className="rounded-lg px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white">Home</Link>
     <span className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-[#f3c969]">Academics</span>
    </nav>
   </div>
  </header>

  <section className="nipe-dark relative overflow-hidden px-4 py-20 md:px-8 md:py-28">
   <div className="nipe-academic-orbit"/>
   <div className="relative mx-auto max-w-7xl">
    <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
     <div className="text-white">
      <span className="nipe-kicker">Academic programme · 2026–27</span>
      <h1 className="nipe-title mt-6 max-w-4xl text-5xl font-semibold leading-[.98] sm:text-6xl md:text-7xl">Learn. Move.<br/><span className="text-[#d2a06b] italic">Lead.</span></h1>
      <p className="mt-7 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg md:text-xl md:leading-8">The academic experience at Noble Institute of Physical Education connects knowledge, practical activity, teaching practice and leadership through one focused undergraduate programme.</p>
      <div className="mt-9 flex flex-wrap gap-3">
       <span className="rounded-full border border-[#d2a06b]/40 bg-[#d2a06b]/10 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-[#f3c969]">B.P.Ed.</span>
       <span className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-white/80">Undergraduate</span>
       <span className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-white/80">NIPE</span>
      </div>
     </div>
     <div className="nipe-academic-feature rounded-[28px] border border-[#d2a06b]/25 bg-white/10 p-7 text-white backdrop-blur md:p-9">
      <span className="text-5xl">🎓</span>
      <span className="mt-7 block text-xs font-black uppercase tracking-[.2em] text-[#f3c969]">Current programme</span>
      <h2 className="nipe-display mt-3 text-3xl font-bold md:text-4xl">Bachelor of Physical Education</h2>
      <p className="mt-4 text-sm leading-7 text-blue-100">A focused academic path combining physical education, sport, fitness, teaching and professional development.</p>
      <div className="mt-7 grid grid-cols-2 gap-3">
       <div className="rounded-2xl bg-white/10 p-4"><strong className="block text-xl text-[#f3c969]">B.P.Ed.</strong><span className="text-xs text-blue-100">Programme</span></div>
       <div className="rounded-2xl bg-white/10 p-4"><strong className="block text-xl text-[#f3c969]">2026–27</strong><span className="text-xs text-blue-100">Admission cycle</span></div>
      </div>
     </div>
    </div>
   </div>
  </section>

  <section className="bg-[#f5f7f3] px-4 py-16 md:px-8 md:py-24">
   <div className="mx-auto max-w-7xl">
    <div className="max-w-3xl"><span className="nipe-section-label">Programme overview</span><h2 className="nipe-title mt-3 text-4xl font-semibold sm:text-5xl">Education that connects the classroom with movement.</h2><div className="nipe-line mt-6 w-36"/><p className="mt-6 leading-7 text-[#667574]">B.P.Ed. brings together academic understanding and practical physical education. The learning experience can be viewed through four connected dimensions: knowledge, activity, teaching and leadership.</p></div>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
     {[
      ['01','Knowledge','Understand principles, concepts and educational practice.','📖'],
      ['02','Activity','Learn through movement, participation and practical experience.','🏃'],
      ['03','Teaching','Develop planning, demonstration and communication skills.','👨‍🏫'],
      ['04','Leadership','Build responsibility, teamwork and confidence.','🏆']
     ].map(([n,t,d,i])=><article key={n} className="nipe-academic-card rounded-[24px] bg-white p-6"><span className="text-3xl">{i}</span><span className="mt-6 block text-xs font-black tracking-[.16em] text-[#b9824b]">{n}</span><h3 className="nipe-display mt-2 text-2xl font-bold">{t}</h3><p className="mt-3 text-sm leading-6 text-[#667574]">{d}</p></article>)}
    </div>
   </div>
  </section>

  <section className="bg-white px-4 py-16 md:px-8 md:py-24">
   <div className="mx-auto max-w-7xl">
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><span className="nipe-section-label">Learning areas</span><h2 className="nipe-title mt-3 text-4xl font-semibold sm:text-5xl">A broad foundation for physical education.</h2></div><span className="text-xs font-bold uppercase tracking-[.16em] text-[#8b6239]">08 learning domains</span></div>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
     {learningAreas.map(([n,icon,title,text])=><article key={n} className="nipe-academic-card group rounded-[22px] border border-[#dfe9df] bg-[#fbfaf6] p-6"><div className="flex items-start justify-between"><span className="text-3xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6">{icon}</span><span className="text-xs font-black text-[#b9824b]">{n}</span></div><h3 className="nipe-display mt-7 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#667574]">{text}</p></article>)}
    </div>
   </div>
  </section>

  <section className="nipe-dark px-4 py-16 md:px-8 md:py-24">
   <div className="mx-auto max-w-7xl">
    <div className="max-w-3xl text-white"><span className="nipe-section-label !text-[#f3c969]">Academic journey</span><h2 className="nipe-title mt-3 text-4xl font-semibold sm:text-5xl">From foundation to professional preparation.</h2><p className="mt-5 leading-7 text-blue-100">The journey is designed as a progression: understand the discipline, experience it practically, learn to teach it and grow into responsible leadership.</p></div>
    <div className="mt-12 grid gap-4 md:grid-cols-5">
     {journey.map(([n,t,d])=><article key={n} className="nipe-journey-card relative rounded-[22px] border border-white/10 bg-white/5 p-6"><span className="text-sm font-black text-[#f3c969]">{n}</span><h3 className="nipe-display mt-5 text-2xl font-bold text-white">{t}</h3><p className="mt-3 text-sm leading-6 text-blue-100">{d}</p></article>)}
    </div>
   </div>
  </section>

  <section className="bg-[#fbfaf6] px-4 py-16 md:px-8 md:py-24">
   <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
    <div><span className="nipe-section-label">Learning in action</span><h2 className="nipe-title mt-3 text-4xl font-semibold sm:text-5xl">Theory meets the ground.</h2><div className="nipe-line mt-6 w-28"/><p className="mt-6 leading-7 text-[#667574]">Physical education is an active discipline. Academic understanding becomes more meaningful when students can observe, practise, demonstrate, communicate and reflect.</p></div>
    <div className="grid gap-4 sm:grid-cols-2">
     {[
      ['📚','Classroom','Concepts, principles and educational understanding.'],
      ['⚽','Ground','Movement, sport, activity and practical participation.'],
      ['🎯','Practice','Demonstration, repetition, observation and feedback.'],
      ['🧭','Reflection','Planning, responsibility and continuous improvement.']
     ].map(([i,t,d])=><div key={t} className="nipe-academic-card rounded-[24px] bg-white p-7 shadow-sm"><span className="text-4xl">{i}</span><h3 className="nipe-display mt-5 text-2xl font-bold">{t}</h3><p className="mt-3 text-sm leading-6 text-[#667574]">{d}</p></div>)}
    </div>
   </div>
  </section>

  <section className="bg-[#dfe9df] px-4 py-16 md:px-8 md:py-24">
   <div className="mx-auto max-w-7xl">
    <div className="text-center"><span className="nipe-section-label">Skills &amp; development</span><h2 className="nipe-title mt-3 text-4xl font-semibold sm:text-5xl">More than a subject. A way of working.</h2><p className="mx-auto mt-5 max-w-2xl leading-7 text-[#667574]">The academic environment supports the habits and interpersonal skills that make practical learning effective.</p></div>
    <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
     {skills.map((skill,i)=><div key={skill} className="nipe-skill rounded-2xl bg-white px-3 py-5 text-center shadow-sm"><span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#173f3a] text-sm font-bold text-[#f3c969]">{String(i+1).padStart(2,'0')}</span><span className="mt-4 block text-xs font-bold leading-5 text-[#182426]">{skill}</span></div>)}
    </div>
   </div>
  </section>

  <section className="bg-white px-4 py-16 md:px-8 md:py-24">
   <div className="mx-auto max-w-7xl rounded-[30px] bg-[#102a2e] p-8 text-white md:p-12 lg:p-16">
    <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
     <div><span className="nipe-section-label !text-[#f3c969]">Academic identity</span><h2 className="nipe-title mt-3 text-4xl font-semibold sm:text-5xl">One programme. A multidimensional learning experience.</h2><p className="mt-5 max-w-2xl leading-7 text-blue-100">Noble Institute of Physical Education keeps its academic identity focused: building knowledge, practical capability, teaching confidence and leadership through physical education.</p></div>
     <Link href="/" className="inline-flex rounded-xl bg-[#b9824b] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#d2a06b]">Back to NIPE Home →</Link>
    </div>
   </div>
  </section>

  <footer className="bg-[#071128] px-4 py-8 text-center text-xs text-blue-200 md:px-8">© 2026 Noble Institute of Physical Education · Academic Programme</footer>
 </main>
}