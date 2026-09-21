'use client';

import Link from 'next/link';
import { useState } from 'react';

const programmes = [
  { code:'B.P.Ed.', title:'Bachelor of Physical Education', text:'Build professional knowledge in physical education, sports, fitness, coaching and educational practice.', href:'/courses/bachelor-of-physical-education' },
];

const pillars = [
  ['01','Physical Education','Learn through movement, coaching, discipline and evidence-based practice.'],
  ['02','Sports & Fitness','Develop practical skills across training, games, fitness and activity.'],
  ['03','Leadership','Prepare to guide learners, teams and communities with confidence.'],
];

const facilities = [
  ['⚽','Sports & Activity Spaces','Purpose-led spaces for practical physical education and student activities.'],
  ['🎓','Academic Learning','Structured teaching, practical learning and faculty guidance.'],
  ['📚','Student Resources','A connected academic environment for study, records and campus services.'],
  ['🏃','Active Campus Life','A culture that keeps movement, participation and wellbeing at the centre.'],
];

export default function HomePage(){
  const [open,setOpen]=useState(false);
  const [form,setForm]=useState({name:'',email:'',phone:'',programme:''});
  const [status,setStatus]=useState('');
  const [busy,setBusy]=useState(false);

  async function submit(e:React.FormEvent){
    e.preventDefault(); setBusy(true); setStatus('');
    try{
      const r=await fetch('/api/admissions/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
      const data=await r.json();
      if(!r.ok) throw new Error(data.error||'Unable to submit enquiry');
      setStatus(data.message||'Your enquiry has been submitted.');
      setForm({name:'',email:'',phone:'',programme:''});
    }catch(err){setStatus(err instanceof Error?err.message:'Unable to submit enquiry. Please try again.')}
    finally{setBusy(false)}
  }

  return <main>
    <header className="nipe-nav sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e0af43]/60 bg-white text-xl font-black text-[#0b1736]">N</span>
          <span><strong className="block text-sm tracking-[.16em] text-[#e0af43]">NOBLE GROUP</strong><small className="block text-[9px] font-semibold tracking-[.13em] text-white/90">INSTITUTE OF PHYSICAL EDUCATION</small></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {[
            ['About','/about'],['Academics','/courses'],['Sports & Activities','/activities'],['Admissions','/admissions'],['Faculty','/faculty']
          ].map(([label,href])=><Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-[#f3c969]">{label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/student/login" className="rounded-lg border border-[#e0af43] px-4 py-2 text-sm font-semibold text-[#f3c969] hover:bg-[#e0af43] hover:text-[#0b1736]">Student Login</Link>
          <Link href="/admissions" className="rounded-lg bg-[#e0af43] px-5 py-2 text-sm font-bold text-[#0b1736] hover:bg-[#f3c969]">Apply Now →</Link>
        </div>
        <button className="nipe-mobile rounded-lg border border-white/15 px-3 py-2 text-white" onClick={()=>setOpen(!open)} aria-label="Open menu">{open?'✕':'☰'}</button>
      </div>
      {open&&<div className="nipe-mobile border-t border-white/10 px-4 pb-4 pt-2">
        {[
          ['About','/about'],['Academics','/courses'],['Sports & Activities','/activities'],['Admissions','/admissions'],['Faculty','/faculty'],['Student Login','/student/login']
        ].map(([label,href])=><Link key={href} onClick={()=>setOpen(false)} href={href} className="block border-b border-white/10 py-3 font-semibold text-white">{label}</Link>)}
      </div>}
    </header>

    <section className="nipe-hero nipe-grid">
      <div className="nipe-orbit"/><div className="nipe-ball"/>
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div className="max-w-3xl text-white">
          <span className="nipe-kicker">Future-focused physical education</span>
          <h1 className="nipe-title mt-7 text-5xl font-semibold leading-[.98] md:text-7xl">Move with purpose.<br/><span className="text-[#e0af43] italic">Lead with confidence.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100">Noble Institute of Physical Education brings academic learning, practical sport and leadership development together in one connected campus experience.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/admissions" className="nipe-btn-primary rounded-xl px-6 py-3.5 font-bold">Explore Admissions →</Link>
            <Link href="/courses" className="nipe-btn-ghost rounded-xl px-6 py-3.5 font-semibold">View Programme</Link>
          </div>
          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/15 pt-7">
            <div className="nipe-stat"><strong className="nipe-display text-3xl text-[#f3c969]">B.P.Ed.</strong><span className="mt-1 block text-xs text-blue-100">Core programme</span></div>
            <div className="nipe-stat"><strong className="nipe-display text-3xl text-[#f3c969]">2026–27</strong><span className="mt-1 block text-xs text-blue-100">Admission cycle</span></div>
            <div className="nipe-stat"><strong className="nipe-display text-3xl text-[#f3c969]">NIPE</strong><span className="mt-1 block text-xs text-blue-100">Noble campus</span></div>
          </div>
        </div>
        <div className="nipe-card relative p-6 md:p-8">
          <div className="mb-6"><span className="nipe-section-label">Admissions desk</span><h2 className="nipe-display mt-2 text-3xl font-bold text-[#0b1736]">Start your enquiry</h2><p className="mt-2 text-sm leading-6 text-slate-500">Share your details and the admissions team can follow up with you.</p></div>
          {status&&<div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{status}</div>}
          <form className="nipe-form space-y-3" onSubmit={submit}>
            <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            <input required type="email" placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            <input required pattern="[0-9]{10}" type="tel" placeholder="10-digit phone number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
            <select required value={form.programme} onChange={e=>setForm({...form,programme:e.target.value})}><option value="">Select programme</option><option value="B.P.Ed.">B.P.Ed. — Bachelor of Physical Education</option></select>
            <button disabled={busy} className="nipe-btn-primary w-full rounded-xl py-3.5 font-bold disabled:opacity-60">{busy?'Submitting…':'Submit Enquiry →'}</button>
          </form>
        </div>
      </div>
    </section>

    <section className="bg-[#f8f5ed] px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl"><span className="nipe-section-label">The NIPE approach</span><h2 className="nipe-title mt-3 text-4xl font-semibold md:text-5xl">Education that happens beyond the classroom.</h2><div className="nipe-line mt-6 w-32"/><p className="mt-5 leading-7 text-[#66728a]">A focused identity for physical education: practical learning, active participation and the confidence to take responsibility.</p></div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">{pillars.map(([n,t,d])=><article key={n} className="nipe-card p-7"><span className="text-sm font-black text-[#e0af43]">{n}</span><h3 className="nipe-display mt-5 text-2xl font-bold">{t}</h3><p className="mt-3 text-sm leading-6 text-[#66728a]">{d}</p></article>)}</div>
      </div>
    </section>

    <section className="bg-white px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="nipe-dark rounded-[28px] p-8 md:p-10">
          <span className="nipe-section-label !text-[#f3c969]">Campus life</span>
          <h2 className="nipe-title mt-3 text-4xl font-semibold">An active environment for active learners.</h2>
          <p className="mt-5 leading-7 text-blue-100">Explore an academic setting designed around physical education, sport, participation and student development.</p>
          <Link href="/lab-facilities" className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-[#0b1736] hover:bg-[#f3c969]">Explore Facilities →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">{facilities.map(([icon,title,text])=><article key={title} className="nipe-card p-6"><span className="text-3xl">{icon}</span><h3 className="mt-4 text-lg font-bold text-[#0b1736]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#66728a]">{text}</p></article>)}</div>
      </div>
    </section>

    <section className="nipe-dark px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="nipe-section-label !text-[#f3c969]">Academic programme</span><h2 className="nipe-title mt-3 text-4xl font-semibold">Build your path in physical education.</h2></div><Link href="/courses" className="text-sm font-bold text-[#f3c969] hover:text-white">View all academics →</Link></div>
        <div className="mt-10 grid gap-5">{programmes.map(p=><Link key={p.code} href={p.href} className="nipe-dark-card group rounded-2xl p-7 md:flex md:items-center md:justify-between"><div><span className="text-sm font-black tracking-widest text-[#f3c969]">{p.code}</span><h3 className="nipe-display mt-2 text-2xl font-bold">{p.title}</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">{p.text}</p></div><span className="mt-6 inline-block text-[#f3c969] md:mt-0 md:text-2xl">→</span></Link>)}</div>
      </div>
    </section>

    <footer className="bg-[#071128] px-4 py-10 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e0af43]/60 bg-white font-black text-[#0b1736]">N</span><strong className="tracking-[.14em] text-[#f3c969]">NIPE</strong></div><p className="mt-4 max-w-sm text-sm leading-6 text-blue-100">Noble Institute of Physical Education — academic learning, sport and leadership in one connected campus.</p></div>
        <div><h3 className="font-bold text-[#f3c969]">Explore</h3><div className="mt-3 grid gap-2 text-sm text-blue-100"><Link href="/about" className="hover:text-white">About NIPE</Link><Link href="/courses" className="hover:text-white">Academics</Link><Link href="/activities" className="hover:text-white">Sports & Activities</Link><Link href="/admissions" className="hover:text-white">Admissions</Link></div></div>
        <div><h3 className="font-bold text-[#f3c969]">Digital Campus</h3><div className="mt-3 grid gap-2 text-sm text-blue-100"><Link href="/student/login" className="hover:text-white">Student Portal</Link><Link href="/faculty/login" className="hover:text-white">Faculty Portal</Link><Link href="/admin/login" className="hover:text-white">Administration</Link></div></div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-5 text-xs text-blue-200">© 2026 Noble Institute of Physical Education. All rights reserved.</div>
    </footer>
  </main>
}
