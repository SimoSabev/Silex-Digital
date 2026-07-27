type MarqueeStripProps = {
  items: string[];
  className?: string;
};

/**
 * Full-width scrolling keyword ticker. The track is rendered twice and
 * translated -50% for a seamless loop; animation pauses under
 * prefers-reduced-motion (see .animate-marquee in globals.css).
 */
export default function MarqueeStrip({ items, className = "" }: MarqueeStripProps) {
  const track = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden border-y border-[var(--accent)]/15 bg-[var(--bg-page)]/60 py-4 backdrop-blur-sm ${className}`}
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center gap-10">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-sm font-bold tracking-[0.18em] whitespace-nowrap text-[var(--text-sub)] uppercase"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]/60" />
          </span>
        ))}
      </div>
      {/* Edge fade so the loop enters/exits softly */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-page)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-page)] to-transparent" />
    </div>
  );
}
