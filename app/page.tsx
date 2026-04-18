"use client";

import { useEffect, useState } from "react";

function TablrLogo({ size = 40, badge = true }: { size?: number; badge?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="76" height="76" rx="24" fill="#34C759" />
      <path
        d="M29 29C29 25.6863 31.6863 23 35 23H61C64.3137 23 67 25.6863 67 29V31C67 34.3137 64.3137 37 61 37H54V63C54 66.3137 51.3137 69 48 69C44.6863 69 42 66.3137 42 63V37H35C31.6863 37 29 34.3137 29 31V29Z"
        fill="white"
      />
      {badge && <circle cx="76" cy="76" r="12" fill="#FF9500" stroke="white" strokeWidth="4" />}
    </svg>
  );
}

// ── Discover phone mockup ───────────────────────────────────────────────
type Tag = { kind: string; label: string };
type Person = { initials: string; color: string };
type Meet = {
  title: string;
  meta: string;
  people: Person[];
  extra: number | null;
  tags: Tag[];
};

const TAG_STYLES: Record<string, { bg: string; fg: string }> = {
  marketing: { bg: "#FFE4D6", fg: "#C2410C" },
  startups: { bg: "#DCFCE7", fg: "#166534" },
  cdrama: { bg: "#EDE9FE", fg: "#6D28D9" },
  foodie: { bg: "#FEF3C7", fg: "#B45309" },
  fashion: { bg: "#FEF9C3", fg: "#854D0E" },
  alert: { bg: "#FEE2E2", fg: "#B91C1C" },
  neutral: { bg: "#F1F5F9", fg: "#475569" },
};

const FEEDS: Record<string, Meet[]> = {
  "For you": [
    {
      title: "Ramen Night · Founders",
      meta: "Tonight · 7pm · Ippudo NYC · $7",
      people: [
        { initials: "NK", color: "#22C55E" },
        { initials: "JL", color: "#A855F7" },
        { initials: "AM", color: "#F97316" },
      ],
      extra: 1,
      tags: [
        { kind: "marketing", label: "Marketing" },
        { kind: "startups", label: "Startups" },
        { kind: "alert", label: "1 spot left" },
      ],
    },
    {
      title: "Afternoon café · C-drama fans",
      meta: "Sat · 3pm · Blank Street · Free",
      people: [
        { initials: "HY", color: "#A855F7" },
        { initials: "MJ", color: "#EAB308" },
      ],
      extra: null,
      tags: [
        { kind: "cdrama", label: "C-dramas" },
        { kind: "neutral", label: "3 spots left" },
      ],
    },
    {
      title: "Sunday Brunch Squad",
      meta: "Sun · 11am · Egg Shop · $5",
      people: [
        { initials: "SR", color: "#EAB308" },
        { initials: "TK", color: "#EF4444" },
        { initials: "BC", color: "#22C55E" },
      ],
      extra: null,
      tags: [
        { kind: "foodie", label: "Foodie" },
        { kind: "fashion", label: "Fashion" },
        { kind: "neutral", label: "2 spots" },
      ],
    },
  ],
  Tonight: [
    {
      title: "Ramen Night · Founders",
      meta: "Tonight · 7pm · Ippudo NYC · $7",
      people: [
        { initials: "NK", color: "#22C55E" },
        { initials: "JL", color: "#A855F7" },
        { initials: "AM", color: "#F97316" },
      ],
      extra: 1,
      tags: [
        { kind: "marketing", label: "Marketing" },
        { kind: "startups", label: "Startups" },
        { kind: "alert", label: "1 spot left" },
      ],
    },
    {
      title: "Late-night pizza crawl",
      meta: "Tonight · 10pm · Joe\u2019s Pizza · $6",
      people: [
        { initials: "DR", color: "#F97316" },
        { initials: "LP", color: "#22C55E" },
      ],
      extra: 2,
      tags: [
        { kind: "foodie", label: "Foodie" },
        { kind: "neutral", label: "4 spots" },
      ],
    },
    {
      title: "Film nerds · burgers after screening",
      meta: "Tonight · 9:30pm · Black Tap · $15",
      people: [
        { initials: "EV", color: "#EAB308" },
        { initials: "CM", color: "#A855F7" },
        { initials: "JT", color: "#EF4444" },
      ],
      extra: null,
      tags: [
        { kind: "cdrama", label: "Cinema" },
        { kind: "neutral", label: "2 spots left" },
      ],
    },
  ],
  "This week": [
    {
      title: "Afternoon café · C-drama fans",
      meta: "Sat · 3pm · Blank Street · Free",
      people: [
        { initials: "HY", color: "#A855F7" },
        { initials: "MJ", color: "#EAB308" },
      ],
      extra: null,
      tags: [
        { kind: "cdrama", label: "C-dramas" },
        { kind: "neutral", label: "3 spots left" },
      ],
    },
    {
      title: "Econ majors · Thai on Thursday",
      meta: "Thu · 7:30pm · Thai Villa · $12",
      people: [
        { initials: "PK", color: "#22C55E" },
        { initials: "AH", color: "#F97316" },
      ],
      extra: 3,
      tags: [
        { kind: "startups", label: "Econ" },
        { kind: "foodie", label: "Foodie" },
      ],
    },
    {
      title: "Design crew · matcha walk",
      meta: "Fri · 4pm · Cha Cha Matcha · $8",
      people: [
        { initials: "RE", color: "#A855F7" },
        { initials: "IN", color: "#EAB308" },
        { initials: "MK", color: "#22C55E" },
      ],
      extra: 1,
      tags: [
        { kind: "fashion", label: "Design" },
        { kind: "neutral", label: "5 spots" },
      ],
    },
  ],
};

function Avatar({ initials, color, size = 24 }: { initials: string; color: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: color,
        color: "#fff",
        fontSize: size * 0.38,
        fontWeight: 700,
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function AvatarStack({ people, extra }: { people: Person[]; extra: number | null }) {
  return (
    <div style={{ display: "flex" }}>
      {people.map((p, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : -8 }}>
          <Avatar initials={p.initials} color={p.color} />
        </div>
      ))}
      {extra != null && (
        <div style={{ marginLeft: -8 }}>
          <Avatar initials={`+${extra}`} color="#94a3b8" />
        </div>
      )}
    </div>
  );
}

function TagChip({ kind, children }: { kind: string; children: React.ReactNode }) {
  const s = TAG_STYLES[kind] || TAG_STYLES.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 9px",
        borderRadius: 8,
        fontSize: 11.5,
        fontWeight: 600,
        background: s.bg,
        color: s.fg,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function MeetCard({ meet }: { meet: Meet }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: 14,
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 8px rgba(13,38,20,0.06)",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 14.5, color: "#0d2614", letterSpacing: "-0.01em" }}>
        {meet.title}
      </div>
      <div style={{ color: "rgba(13,38,20,0.6)", fontSize: 12.5, marginTop: 2 }}>{meet.meta}</div>
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
        <AvatarStack people={meet.people} extra={meet.extra} />
      </div>
      <div style={{ marginTop: 9, display: "flex", gap: 5, flexWrap: "wrap" }}>
        {meet.tags.map((t, i) => (
          <TagChip key={i} kind={t.kind}>
            {t.label}
          </TagChip>
        ))}
      </div>
    </div>
  );
}

function DiscoverPhone() {
  const [tab, setTab] = useState<"For you" | "Tonight" | "This week">("For you");
  const tabs: Array<"For you" | "Tonight" | "This week"> = ["For you", "Tonight", "This week"];
  const matchLabel = {
    "For you": "matched to your interests · near NYU",
    Tonight: "3 plans tonight · near NYU",
    "This week": "12 plans this week · near NYU",
  }[tab];

  return (
    <div className="phone">
      <div className="phone-inner">
        <div className="phone-notch" />
        <div className="phone-status">9:41</div>

        <div className="phone-header">
          <div className="phone-header-row">
            <div className="phone-title">Discover</div>
            <button className="phone-avatar-btn" aria-label="Profile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
              </svg>
            </button>
          </div>
          <div className="phone-tabs">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`phone-tab ${tab === t ? "phone-tab-active" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="phone-feed">
          <div className="phone-match-label">{matchLabel}</div>
          <div className="phone-cards">
            {FEEDS[tab].map((m, i) => (
              <MeetCard key={tab + i} meet={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────
const features = [
  {
    eyebrow: "Find your people",
    title: "Match with students who crave the same vibe",
    text: "Late-night ramen, coffee walks, brunch squads, or trying the spot everyone keeps reposting.",
  },
  {
    eyebrow: "Actually go out",
    title: "Discover restaurants together, not alone",
    text: "Plan dinner in seconds, split the awkwardness, and turn a meal into a real connection.",
  },
  {
    eyebrow: "Built for campus life",
    title: "Social energy for college students",
    text: "Meet new people beyond your major, dorm, club, or friend group, without it feeling forced.",
  },
];

const SCHOOLS = [
  { name: "Harvard", italic: true },
  { name: "NYU", italic: false },
  { name: "Yale", italic: true },
  { name: "Stanford", italic: false },
  { name: "Columbia", italic: true },
  { name: "MIT", italic: false },
  { name: "Princeton", italic: true },
  { name: "Brown", italic: false },
  { name: "Cornell", italic: true },
  { name: "Penn", italic: false },
  { name: "Berkeley", italic: true },
  { name: "UCLA", italic: false },
];

export default function Home() {
  const [dots, setDots] = useState(3);
  const [splashFading, setSplashFading] = useState(false);
  const [splashGone, setSplashGone] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSplashFading(true);
          setTimeout(() => setSplashGone(true), 650);
          return 0;
        }
        return prev - 1;
      });
    }, 650);
    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      } else {
        setStatus("success");
        setMessage("You\u2019re on the list. We\u2019ll text the table when it\u2019s ready.");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <>
      <div className="background-scene" aria-hidden="true">
        <div className="mesh mesh-one" />
        <div className="mesh mesh-two" />
        <div className="mesh mesh-three" />
        <div className="floating-dot dot-one" />
        <div className="floating-dot dot-two" />
        <div className="floating-dot dot-three" />
        <div className="grid-fade" />
      </div>

      {!splashGone && (
        <div className={`splash-overlay ${splashFading ? "splash-fade" : ""}`} aria-hidden="true">
          <div className="splash-card">
            <TablrLogo size={60} />
            <p className="splash-text">Every meal is better shared</p>
            <div className="dots-row">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className="dot" style={{ opacity: i < dots ? 1 : 0.14 }} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="page-wrapper">
        <nav className="navbar">
          <div className="nav-logo">
            <div className="nav-logo-icon">
              <TablrLogo size={36} />
            </div>
            <div>
              <span className="wordmark">Tablr</span>
              <p className="wordmark-sub">social dining, on campus</p>
            </div>
          </div>
          <a href="#waitlist" className="nav-cta">
            Join waitlist
          </a>
        </nav>

        {/* School ticker */}
        <div className="school-bar" aria-label="Available at">
          <div className="school-track">
            {[...SCHOOLS, ...SCHOOLS].map((s, i) => (
              <span key={i} className={`school ${s.italic ? "school-italic" : ""}`}>
                {s.name}
              </span>
            ))}
          </div>
        </div>

        <main>
          <section className="hero">
            <div className="hero-copy">
              <div className="hero-pill">
                <span className="hero-pill-dot" />
                Now accepting early access — college students only
              </div>

              <h1>
                Meet up over food,
                <br />
                <span>not small talk.</span>
              </h1>

              <p className="hero-text">
                Tablr matches you with college students who share your interests, major, and vibe — then gives you a reason to actually show up.
              </p>

              <p className="tagline">Fork it, lets go</p>

              <form onSubmit={handleSubmit} className="waitlist-form-inline">
                <input
                  type="email"
                  required
                  placeholder="your@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  className="email-input"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="cta-btn"
                >
                  {status === "loading" ? "Saving\u2026" : status === "success" ? "You\u2019re in" : "Join waitlist"}
                </button>
              </form>

              {message && (
                <p className={`feedback ${status === "success" ? "feedback-success" : "feedback-error"}`}>
                  {message}
                </p>
              )}

              <div className="proof-row">
                <div className="proof-avatars">
                  {[
                    { i: "NK", c: "#22C55E" },
                    { i: "JL", c: "#A855F7" },
                    { i: "AM", c: "#F97316" },
                    { i: "SR", c: "#EAB308" },
                    { i: "+", c: "#EF4444" },
                  ].map((p, idx) => (
                    <div key={idx} className="proof-av" style={{ background: p.c, marginLeft: idx === 0 ? 0 : -8 }}>
                      {p.i}
                    </div>
                  ))}
                </div>
                <div>
                  <strong>347</strong> students already waiting
                </div>
              </div>
            </div>

            <div className="phone-wrap" id="waitlist">
              <DiscoverPhone />
            </div>
          </section>

          <section className="proof-section">
            <div className="proof-intro">
              <p className="section-label">Why it hits different</p>
              <h2>Less awkward planning, more actually going out</h2>
              <p>
                Tablr brings social-app energy to real-world hangs, so finding people to grab food with feels natural, fun, and low pressure.
              </p>
            </div>

            <div className="feature-grid">
              {features.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <p className="feature-eyebrow">{feature.eyebrow}</p>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer className="footer">
          <p>© 2026 Tablr.</p>
        </footer>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&display=swap");

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { color-scheme: light; }
        html { scroll-behavior: smooth; }
        html, body {
          min-height: 100%;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #f8fff8;
          color: #0d2614;
          overflow-x: hidden;
        }
        body { position: relative; }
        a { color: inherit; text-decoration: none; }
        button, input { font: inherit; }

        .background-scene {
          position: fixed; inset: 0; z-index: 0; overflow: hidden;
          background:
            radial-gradient(circle at top left, rgba(255,255,255,0.95), transparent 34%),
            linear-gradient(180deg, #f4fff5 0%, #effff1 48%, #f8fff8 100%);
        }
        .mesh, .floating-dot, .grid-fade { position: absolute; pointer-events: none; }
        .mesh { filter: blur(36px); opacity: 0.7; border-radius: 999px; animation: drift 16s ease-in-out infinite alternate; }
        .mesh-one { top: -8%; left: -8%; width: 28rem; height: 28rem;
          background: radial-gradient(circle, rgba(52,199,89,0.24), rgba(52,199,89,0.06) 58%, transparent 72%); }
        .mesh-two { top: 24%; right: -10%; width: 26rem; height: 26rem; animation-duration: 20s;
          background: radial-gradient(circle, rgba(52,199,89,0.18), rgba(52,199,89,0.05) 58%, transparent 72%); }
        .mesh-three { bottom: -14%; left: 28%; width: 24rem; height: 24rem; animation-duration: 22s;
          background: radial-gradient(circle, rgba(255,149,0,0.14), rgba(255,149,0,0.04) 55%, transparent 75%); }
        .floating-dot { border-radius: 999px; opacity: 0.55; animation: bob 10s ease-in-out infinite; }
        .dot-one { top: 16%; left: 12%; width: 14px; height: 14px; background: rgba(52,199,89,0.45); }
        .dot-two { top: 42%; right: 14%; width: 10px; height: 10px; background: rgba(255,149,0,0.5); animation-delay: -2s; }
        .dot-three { bottom: 18%; left: 22%; width: 12px; height: 12px; background: rgba(52,199,89,0.32); animation-delay: -4s; }
        .grid-fade {
          inset: 0;
          background-image:
            linear-gradient(rgba(13,38,20,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,38,20,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at center, black 26%, transparent 80%);
          opacity: 0.32;
          animation: pulse 10s ease-in-out infinite alternate;
        }

        .splash-overlay {
          position: fixed; inset: 0; z-index: 100;
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          background: rgba(248,255,248,0.96); backdrop-filter: blur(16px);
          transition: opacity 0.65s ease, visibility 0.65s ease;
        }
        .splash-fade { opacity: 0; visibility: hidden; }
        .splash-card { display: flex; flex-direction: column; align-items: center; gap: 1.2rem; text-align: center; }
        .splash-text { max-width: 28rem; color: #1a5a2c; font-size: clamp(1.45rem, 3vw, 2.4rem); font-weight: 700; line-height: 1.08; letter-spacing: -0.04em; }
        .dots-row { display: flex; gap: 0.65rem; align-items: center; }
        .dot { width: 10px; height: 10px; border-radius: 999px; background: #34C759; transition: opacity 0.24s ease; }

        .page-wrapper { position: relative; z-index: 1; min-height: 100vh; }

        .navbar {
          width: min(1180px, calc(100% - 2rem)); margin: 0 auto;
          padding: 1.25rem 0 0;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }
        .nav-logo { display: flex; align-items: center; gap: 0.85rem; }
        .nav-logo-icon { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; }
        .wordmark { display: block; font-size: 1.1rem; font-weight: 800; letter-spacing: -0.04em; color: #12331d; }
        .wordmark-sub { font-size: 0.78rem; color: rgba(18,51,29,0.62); }
        .nav-cta {
          display: inline-flex; align-items: center; justify-content: center;
          min-height: 42px; padding: 0.7rem 1rem; border-radius: 999px;
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(18,51,29,0.08);
          box-shadow: 0 10px 30px rgba(21,62,32,0.08);
          font-size: 0.92rem; font-weight: 600; color: #174825;
          backdrop-filter: blur(16px);
        }

        /* School ticker */
        .school-bar {
          width: min(1180px, calc(100% - 2rem));
          margin: 1.25rem auto 0;
          overflow: hidden; position: relative;
          height: 64px; border-radius: 18px;
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(18,51,29,0.08);
          box-shadow: 0 10px 30px rgba(21,62,32,0.06);
          backdrop-filter: blur(16px);
          display: flex; align-items: center;
        }
        .school-bar::before, .school-bar::after {
          content: ""; position: absolute; top: 0; bottom: 0; width: 80px; z-index: 2; pointer-events: none;
        }
        .school-bar::before { left: 0; background: linear-gradient(90deg, rgba(255,255,255,0.95), transparent); }
        .school-bar::after { right: 0; background: linear-gradient(270deg, rgba(255,255,255,0.95), transparent); }
        .school-track {
          display: flex; gap: 48px; padding-left: 32px; white-space: nowrap;
          animation: scroll 30s linear infinite;
        }
        .school {
          font-family: Inter, sans-serif;
          font-size: 1.6rem; font-weight: 700; letter-spacing: -0.03em; color: #0d2614;
        }
        .school-italic {
          font-family: "Instrument Serif", Georgia, serif;
          font-style: italic; font-weight: 400; color: #34C759; font-size: 1.9rem;
          letter-spacing: -0.02em;
        }

        .hero {
          width: min(1180px, calc(100% - 2rem));
          margin: 0 auto;
          padding: 3rem 0 3.5rem;
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);
          gap: 2.5rem;
          align-items: center;
        }
        .hero-copy { position: relative; display: flex; flex-direction: column; align-items: flex-start; }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 0.55rem;
          margin-bottom: 1.5rem;
          padding: 0.68rem 0.95rem; border-radius: 999px;
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(52,199,89,0.18);
          box-shadow: 0 14px 34px rgba(52,199,89,0.08);
          color: #1f5d31; font-size: 0.92rem; font-weight: 600;
          backdrop-filter: blur(14px);
        }
        .hero-pill-dot { width: 9px; height: 9px; border-radius: 999px; background: #34C759;
          box-shadow: 0 0 0 6px rgba(52,199,89,0.18); animation: pulseDot 2s ease-in-out infinite; }

        .hero h1 {
          font-family: Inter, sans-serif;
          font-size: clamp(3rem, 7vw, 5.6rem);
          line-height: 0.94; letter-spacing: -0.08em;
          color: #0d2614; font-weight: 800;
          max-width: 10ch;
        }
        .hero h1 span {
          font-family: "Instrument Serif", Georgia, serif;
          font-style: italic; font-weight: 400;
          color: #34C759; letter-spacing: -0.04em;
        }

        .hero-text {
          margin-top: 1.2rem; max-width: 34rem;
          font-size: clamp(1rem, 2vw, 1.12rem); line-height: 1.65;
          color: rgba(13,38,20,0.74);
        }
        .tagline {
          margin-top: 1.1rem;
          color: #FF9500; font-size: 0.92rem; font-weight: 800;
          letter-spacing: 0.22em; text-transform: uppercase;
        }

        .waitlist-form-inline {
          margin-top: 1.5rem;
          display: flex; gap: 10px; width: 100%; max-width: 34rem;
        }
        .email-input {
          flex: 1; min-height: 52px; padding: 0.95rem 1rem; border-radius: 16px;
          border: 1px solid rgba(52,199,89,0.22);
          background: rgba(250,255,250,0.98); color: #0d2614; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .email-input::placeholder { color: rgba(13,38,20,0.34); }
        .email-input:focus { border-color: rgba(52,199,89,0.7); box-shadow: 0 0 0 5px rgba(52,199,89,0.12); transform: translateY(-1px); }
        .email-input:disabled { opacity: 0.62; }
        .cta-btn {
          min-height: 52px; padding: 0 1.3rem;
          border: none; border-radius: 16px;
          background: linear-gradient(135deg, #34C759 0%, #1fbf57 100%);
          color: white; font-size: 0.98rem; font-weight: 800; letter-spacing: -0.02em;
          cursor: pointer; box-shadow: 0 18px 36px rgba(52,199,89,0.24);
          transition: transform 0.16s, box-shadow 0.16s, opacity 0.16s;
          white-space: nowrap;
        }
        .cta-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 22px 40px rgba(52,199,89,0.3); }
        .cta-btn:disabled { opacity: 0.72; cursor: default; }

        .feedback { margin-top: 0.8rem; font-size: 0.9rem; line-height: 1.5; }
        .feedback-success { color: #15803d; }
        .feedback-error { color: #dc2626; }

        .proof-row { margin-top: 1.3rem; display: flex; align-items: center; gap: 0.9rem; color: rgba(13,38,20,0.74); font-size: 0.92rem; }
        .proof-row strong { color: #0d2614; font-weight: 800; }
        .proof-avatars { display: flex; }
        .proof-av {
          width: 34px; height: 34px; border-radius: 999px;
          color: #fff; font-size: 11px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center;
          border: 2.5px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.1); flex-shrink: 0;
        }

        /* Phone mockup */
        .phone-wrap { display: flex; justify-content: center; align-items: center; position: relative; }
        .phone {
          width: 320px; height: 640px;
          background: #0a0a0a; border-radius: 44px; padding: 10px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.3);
          position: relative;
        }
        .phone-inner {
          width: 100%; height: 100%; border-radius: 36px; overflow: hidden;
          background: #F8FFF8; position: relative;
        }
        .phone-notch {
          position: absolute; top: 9px; left: 50%; transform: translateX(-50%);
          width: 100px; height: 26px; border-radius: 16px; background: #000; z-index: 50;
        }
        .phone-status {
          position: absolute; top: 12px; left: 22px;
          color: #fff; font-size: 12px; font-weight: 600;
          z-index: 51; mix-blend-mode: difference;
        }
        .phone-header {
          background: #22C55E; padding: 48px 18px 16px;
        }
        .phone-header-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .phone-title { color: #fff; font-size: 24px; font-weight: 800; letter-spacing: -0.03em; }
        .phone-avatar-btn {
          width: 32px; height: 32px; border-radius: 999px;
          background: rgba(255,255,255,0.22); border: 0;
          display: flex; align-items: center; justify-content: center;
          color: #fff; cursor: pointer;
        }
        .phone-tabs {
          display: inline-flex; padding: 4px;
          background: rgba(255,255,255,0.18); border-radius: 999px;
        }
        .phone-tab {
          padding: 6px 14px; border-radius: 999px; border: 0;
          background: transparent; color: #fff;
          font-size: 13px; font-weight: 600; cursor: pointer;
          transition: all 0.16s ease;
        }
        .phone-tab-active { background: #fff; color: #12331d; }
        .phone-feed {
          height: calc(100% - 128px); overflow-y: auto;
        }
        .phone-match-label {
          color: rgba(13,38,20,0.5); font-size: 11.5px; font-weight: 500;
          padding: 10px 18px 8px;
        }
        .phone-cards { display: flex; flex-direction: column; gap: 10px; padding: 0 14px 20px; }

        .proof-section {
          width: min(1180px, calc(100% - 2rem));
          margin: 0 auto;
          padding: 1.5rem 0 4.5rem;
        }
        .proof-intro { max-width: 42rem; margin-bottom: 1.75rem; }
        .section-label { margin-bottom: 0.85rem; color: #34C759; font-size: 0.82rem; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; }
        .proof-intro h2 { font-size: clamp(2rem, 4vw, 3.4rem); line-height: 1; letter-spacing: -0.06em; color: #102d19; font-weight: 800; }
        .proof-intro p:last-child { margin-top: 0.95rem; color: rgba(16,45,25,0.72); font-size: 1.02rem; line-height: 1.7; }
        .feature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
        .feature-card {
          padding: 1.3rem; border-radius: 28px;
          background: rgba(255,255,255,0.64);
          border: 1px solid rgba(255,255,255,0.7);
          box-shadow: 0 18px 50px rgba(13,38,20,0.08);
          backdrop-filter: blur(18px);
        }
        .feature-eyebrow { margin-bottom: 0.85rem; color: #FF9500; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; }
        .feature-card h3 { font-size: 1.28rem; line-height: 1.15; letter-spacing: -0.04em; color: #12331d; font-weight: 700; }
        .feature-card p:last-child { margin-top: 0.8rem; color: rgba(18,51,29,0.7); font-size: 0.98rem; line-height: 1.65; }

        .footer { padding: 1.25rem 1rem 2rem; text-align: center; color: rgba(13,38,20,0.42); font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; }

        @keyframes drift { 0% { transform: translate3d(0,0,0) scale(1); } 100% { transform: translate3d(2%,3%,0) scale(1.08); } }
        @keyframes bob { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-16px,0); } }
        @keyframes pulse { 0% { opacity: 0.18; transform: scale(1); } 100% { opacity: 0.34; transform: scale(1.02); } }
        @keyframes pulseDot { 0%,100% { box-shadow: 0 0 0 6px rgba(52,199,89,0.18); } 50% { box-shadow: 0 0 0 10px rgba(52,199,89,0.08); } }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        @media (max-width: 960px) {
          .hero { grid-template-columns: 1fr; gap: 2rem; padding-top: 2rem; }
          .hero-copy { align-items: center; text-align: center; }
          .hero-text { max-width: 40rem; }
          .waitlist-form-inline { max-width: 100%; }
          .proof-row { justify-content: center; }
          .feature-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .navbar { width: min(100%, calc(100% - 1rem)); padding-top: 0.75rem; }
          .wordmark-sub { display: none; }
          .nav-cta { min-height: 38px; padding: 0.62rem 0.88rem; font-size: 0.84rem; }
          .school-bar { height: 54px; }
          .school { font-size: 1.25rem; }
          .school-italic { font-size: 1.5rem; }
          .hero { width: min(100%, calc(100% - 1rem)); padding: 2rem 0 2.5rem; }
          .hero-pill { font-size: 0.82rem; padding: 0.62rem 0.85rem; }
          .hero h1 { max-width: 100%; font-size: clamp(2.4rem, 13vw, 3.6rem); }
          .waitlist-form-inline { flex-direction: column; }
          .proof-section { width: min(100%, calc(100% - 1rem)); padding-bottom: 3rem; }
          .proof-intro h2 { font-size: 2rem; }
          .feature-card { padding: 1.15rem; border-radius: 24px; }
          .splash-text { font-size: 1.85rem; }
          .phone { width: 290px; height: 580px; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </>
  );
}
