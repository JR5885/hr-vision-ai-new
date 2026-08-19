"use client";

function SparkIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2 L14 9.5 L21.5 12 L14 14.5 L12 22 L10 14.5 L2.5 12 L10 9.5 Z" fill="#1A73E8" />
      <path d="M12 2 L13.2 8.2 L12 12 L10.8 8.2 Z" fill="#EA4335" />
      <path d="M21.5 12 L15.3 13.2 L12 12 L15.3 10.8 Z" fill="#FBBC04" />
      <path d="M12 22 L10.8 15.8 L12 12 L13.2 15.8 Z" fill="#34A853" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "#diagnostics", label: "AI 診斷" },
  { href: "#services", label: "服務領域" },
  { href: "#contact", label: "預約諮詢" },
];

export default function Header() {
  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(96%,880px)] -translate-x-1/2">
      <div className="flex items-center justify-between gap-4 rounded-full border border-gray-100 bg-white/80 px-4 py-2.5 shadow-elevate backdrop-blur-md sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight text-ink">
          <SparkIcon />
          <span className="hidden sm:inline">HR Vision AI</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink-soft md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="ripple-btn rounded-full bg-google-blue px-4 py-2 text-sm font-medium text-white shadow-elevate transition-transform hover:-translate-y-0.5 sm:px-5"
        >
          預約診斷
        </a>
      </div>
    </header>
  );
}
