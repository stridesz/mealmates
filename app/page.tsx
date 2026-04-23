"use client";

import { useEffect, useState } from "react";

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
    eyebrow: "Campus-only",
    title: "Your .edu keeps it exclusive",
    text: "No randos, no creeps. Every match is verified through their university email, so you know exactly who you're meeting.",
  },
  {
    eyebrow: "Actually organized",
    title: "Plans that don't fall apart",
    text: "Stop waiting for 12 people to agree on a time. We cap tables, lock in RSVPs, and handle the details so the hang actually happens.",
  },
  {
    eyebrow: "Expand your circle",
    title: "Meet people you'd never run into",
    text: "Not your major, not your dorm, not your frat. Just someone who also thinks Ippudo hits at midnight.",
  },
  {
    eyebrow: "Smart matching",
    title: "We find your people, you just show up",
    text: "Tell us what you're into — startups, K-dramas, vintage thrifting — and we'll surface the tables where you'll actually fit in.",
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
  const [splashFading, setSplashFading] = useState(false);
  const [splashGone, setSplashGone] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashFading(true);
      setTimeout(() => setSplashGone(true), 500);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
            <img src="/logo.png" alt="Tablr" width={72} height={72} className="splash-logo" />
            <p className="splash-text">Tablr</p>
            <p className="splash-sub">social dining, on campus</p>
          </div>
        </div>
      )}

      <div className="page-wrapper">
        <nav className="navbar">
          <div className="nav-logo">
            <div className="nav-logo-icon">
              <img src="/logo.png" alt="Tablr" width={36} height={36} className="nav-logo-img" />
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

              <p className="tagline">Fork it, let&apos;s go</p>

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

          <section className="proof-section reveal">
            <div className="proof-intro">
              <p className="section-label">Why it hits different</p>
              <h2>Less awkward planning, more actually going out</h2>
              <p>
                Tablr brings social-app energy to real-world hangs, so finding people to grab food with feels natural, fun, and low pressure.
              </p>
            </div>

            <div className="feature-grid">
              {features.map((feature, i) => (
                <article className={`feature-card reveal reveal-delay-${i}`} key={feature.title}>
                  <p className="feature-eyebrow">{feature.eyebrow}</p>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer className="footer">
          <p>Built by students, for students.</p>
          <p>© 2026 Tablr.</p>
        </footer>
      </div>

    </>
  );
}
