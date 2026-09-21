'use client';

import { useEffect, useState } from 'react';

interface Announcement {
  id: string;
  title: string;
  shortDescription: string;
  ctaText?: string | null;
  ctaUrl?: string | null;
}

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/public/announcement', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled) setAnnouncement(data?.announcement ?? null);
      })
      .catch(() => {
        if (!cancelled) setAnnouncement(null);
      });
    return () => { cancelled = true; };
  }, []);

  if (!announcement || !visible) return null;

  return (
    <div className="bg-gold text-ink py-2 px-4">
      <div className="container mx-auto flex items-center justify-center gap-3 text-sm font-mono text-center">
        <span className="w-2 h-2 bg-coral rounded-full animate-pulse shrink-0"></span>
        <span className="font-semibold">📢 {announcement.title}</span>
        {announcement.shortDescription && <span className="hidden md:inline">— {announcement.shortDescription}</span>}
        {announcement.ctaText && announcement.ctaUrl && (
          <a href={announcement.ctaUrl} className="font-bold underline underline-offset-2 hover:text-coral transition shrink-0">{announcement.ctaText} →</a>
        )}
        <button onClick={() => setVisible(false)} className="ml-2 hover:text-coral transition shrink-0" aria-label="Close announcement">×</button>
      </div>
    </div>
  );
}
