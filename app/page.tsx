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

function Avatar({ initials, color, size = 26 }: { initials: string; color: string; size?: number }) {
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
        boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function AvatarStack({ people, extra }: { people: Person[]; extra: number | null }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {people.map((p, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : -9, zIndex: people.length - i }}>
          <Avatar initials={p.initials} color={p.color} />
        </div>
      ))}
      {extra != null && (
        <div style={{ marginLeft: -9, zIndex: 0 }}>
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
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        background: s.bg,
        color: s.fg,
        whiteSpace: "nowrap",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </span>
  );
}

function MeetCard({ meet }: { meet: Meet }) {
  const accentColor = meet.tags[0]?.kind === "alert" ? "#FF9500" : meet.people[0]?.color || "#34C759";
  return (
    <div
      className="phone-card"
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "14px 16px",
        border: "1px solid rgba(0,0,0,0.04)",
        boxShadow: "0 2px 12px rgba(13,38,20,0.06), 0 0 1px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 14, bottom: 14, width: 3, borderRadius: "0 4px 4px 0", background: accentColor }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingLeft: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: "#0d2614", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
            {meet.title}
          </div>
          <div style={{ color: "rgba(13,38,20,0.55)", fontSize: 12, marginTop: 3, fontWeight: 500 }}>{meet.meta}</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(13,38,20,0.15)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </div>
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8, paddingLeft: 8 }}>
        <AvatarStack people={meet.people} extra={meet.extra} />
      </div>
      <div style={{ marginTop: 9, display: "flex", gap: 5, flexWrap: "wrap", paddingLeft: 8 }}>
        {meet.tags.map((t, i) => (
          <TagChip key={i} kind={t.kind}>
            {t.label}
          </TagChip>
        ))}
      </div>
    </div>
  );
}

function ChatScreen() {
  const chats = [
    { name: "Ramen Night", msg: "See you at 7!", time: "2m", unread: 2, color: "#22C55E", active: true },
    { name: "Brunch Squad", msg: "Egg Shop confirmed", time: "1h", unread: 0, color: "#EAB308", active: false },
    { name: "Pizza Crawl", msg: "Joe's at 10?", time: "3h", unread: 1, color: "#F97316", active: false },
  ];
  return (
    <div style={{ padding: "10px 14px 20px" }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: "#0d2614", marginBottom: 14, letterSpacing: "-0.03em" }}>Messages</div>
      {chats.map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < chats.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
          <div style={{ width: 40, height: 40, borderRadius: 999, background: c.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
            {c.name[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 13.5, color: "#0d2614" }}>{c.name}</span>
              <span style={{ fontSize: 11, color: "rgba(13,38,20,0.4)", fontWeight: 500 }}>{c.time}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
              <span style={{ fontSize: 12.5, color: "rgba(13,38,20,0.55)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.msg}</span>
              {c.unread > 0 && (
                <span style={{ background: "#FF9500", color: "#fff", fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.unread}</span>
              )}
            </div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 16, padding: 12, borderRadius: 14, background: "rgba(52,199,89,0.06)", border: "1px solid rgba(52,199,89,0.12)", textAlign: "center" }}>
        <span style={{ fontSize: 12, color: "#34C759", fontWeight: 600 }}>+ Start a new table</span>
      </div>
    </div>
  );
}

function ProfileScreen() {
  const interests = ["Startups", "Foodie", "Barbering", "Basketball", "Drake"];
  return (
    <div style={{ padding: "10px 14px 20px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0" }}>
        <div style={{ width: 64, height: 64, borderRadius: 999, background: "linear-gradient(135deg, #22C55E, #16a34a)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 24, fontWeight: 800, border: "3px solid #fff", boxShadow: "0 4px 16px rgba(34,197,94,0.3)" }}>
          PD
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: "#0d2614", marginTop: 10, letterSpacing: "-0.02em" }}>Peter</div>
        <div style={{ fontSize: 12, color: "rgba(13,38,20,0.5)", marginTop: 2, fontWeight: 500 }}>NYU · Business</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
        {[
          { label: "Tables", val: "12" },
          { label: "Connections", val: "13" },
          { label: "Streak", val: "5" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center", padding: "10px 0", borderRadius: 14, background: "#fff", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 2px 8px rgba(13,38,20,0.04)" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0d2614" }}>{s.val}</div>
            <div style={{ fontSize: 10, color: "rgba(13,38,20,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color: "#0d2614", marginBottom: 8, letterSpacing: "0.02em" }}>Interests</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {interests.map((tag, i) => (
          <span key={i} style={{ padding: "5px 12px", borderRadius: 999, fontSize: 11.5, fontWeight: 600, background: "#f0fdf4", color: "#166534", border: "1px solid rgba(52,199,89,0.15)" }}>{tag}</span>
        ))}
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color: "#0d2614", marginBottom: 8, letterSpacing: "0.02em" }}>Upcoming</div>
      <div style={{ padding: 12, borderRadius: 14, background: "#fff", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 2px 8px rgba(13,38,20,0.04)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🍜</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0d2614" }}>Ramen Night</div>
          <div style={{ fontSize: 11, color: "rgba(13,38,20,0.5)", marginTop: 1 }}>Tonight · 7pm · Ippudo</div>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#22C55E" }}>Going</span>
      </div>
    </div>
  );
}

function DiscoverPhone() {
  const [screen, setScreen] = useState<"discover" | "chat" | "profile">("discover");
  const [tab, setTab] = useState<"For you" | "Tonight" | "This week">("For you");
  const tabs: Array<"For you" | "Tonight" | "This week"> = ["For you", "Tonight", "This week"];
  const matchLabel = {
    "For you": "matched to your interests · near NYU",
    Tonight: "3 plans tonight · near NYU",
    "This week": "12 plans this week · near NYU",
  }[tab];

  const navItems = [
    { key: "discover" as const, label: "Discover", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> },
    { key: "chat" as const, label: "Chat", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
    { key: "profile" as const, label: "Profile", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  const titleMap = { discover: "Discover", chat: "Messages", profile: "Profile" };

  return (
    <div className="phone">
      <div className="phone-inner">
        <div className="phone-notch" />
        <div className="phone-status-bar">
          <span>9:41</span>
          <div className="phone-status-icons">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M1 9h2v2H1zm3-2h2v4H4zm3-2h2v6H7zm3-2h2v8h-2zm3-3h2v11h-2z"/></svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M7 0C3.5 0 1 2 0 3.5L7 10l7-6.5C13 2 10.5 0 7 0z"/></svg>
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="1" width="17" height="8" rx="2"/><rect x="3" y="3" width="12" height="4" rx="1" fill="currentColor"/><path d="M19 3.5v3"/></svg>
          </div>
        </div>

        <div className="phone-header">
          <div className="phone-header-row">
            <div className="phone-title">{titleMap[screen]}</div>
            <button className="phone-avatar-btn" aria-label="Profile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
              </svg>
            </button>
          </div>
          {screen === "discover" && (
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
          )}
        </div>

        <div className="phone-feed">
          {screen === "discover" && (
            <>
              <div className="phone-match-label">{matchLabel}</div>
              <div className="phone-cards">
                {FEEDS[tab].map((m, i) => (
                  <MeetCard key={tab + i} meet={m} />
                ))}
              </div>
            </>
          )}
          {screen === "chat" && <ChatScreen />}
          {screen === "profile" && <ProfileScreen />}
        </div>

        <div className="phone-bottom-nav">
          {navItems.map((n) => (
            <div
              key={n.key}
              className={`phone-nav-item ${screen === n.key ? "active" : ""}`}
              onClick={() => setScreen(n.key)}
            >
              {n.icon}
              <span>{n.label}</span>
            </div>
          ))}
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
  { name: "UNC", italic: true },
  { name: "Duke", italic: false },
  { name: "USC", italic: true },
  { name: "Northeastern", italic: false },
  { name: "Georgetown", italic: true },
  { name: "Vanderbilt", italic: false },
  { name: "Michigan", italic: true },
  { name: "Florida", italic: false },
  { name: "Rutgers", italic: true },
  { name: "FIT", italic: false },
  { name: "Parsons", italic: true },
  { name: "UWash", italic: false },
  { name: "UMiami", italic: true },
  { name: "UCF", italic: false },
  { name: "UChicago", italic: true },
  { name: "Georgia Tech", italic: false },
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
        setMessage("You\u2019re on the list. We\u2019ll lyk when the table\u2019s ready.");
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
        <div className="mesh mesh-four" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="orb orb-three" />
        <div className="orb orb-four" />
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
                  className={`cta-btn ${status === "success" ? "cta-btn-success" : ""}`}
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

          <section className="how-it-works reveal">
            <div className="how-intro">
              <p className="section-label">How it works</p>
              <h2>From email to table in three steps</h2>
            </div>
            <div className="how-grid">
              <div className="how-card reveal reveal-delay-0">
                <div className="how-number">1</div>
                <h3>Drop your email & interests</h3>
                <p>Tell us your school, what you&apos;re into, and what you&apos;re looking for.</p>
              </div>
              <div className="how-card reveal reveal-delay-1">
                <div className="how-number">2</div>
                <h3>Find a table that fits your plans</h3>
                <p>Browse events happening tonight or this week. Pick one that matches your vibe, major, or cravings.</p>
              </div>
              <div className="how-card reveal reveal-delay-2">
                <div className="how-number">3</div>
                <h3>Show up, eat, and actually meet people</h3>
                <p>It&apos;s a simple way to turn food into <strong>real connections</strong>.</p>
              </div>
            </div>
          </section>

          <section className="vibe-section reveal">
            <div className="vibe-grid">
              <div className="vibe-image-wrap">
                <img src="/dinner-crew.png" alt="A group of college students laughing over pizza and pasta" className="vibe-img" />
              </div>
              <div className="vibe-copy">
                <p className="section-label vibe-label">Our <em>Vibeee</em></p>
                <h2>This is what showing up looks like</h2>
                <p>No awkward intros. No forced networking. Just people who showed up for the same reason you did. Good food, better company.</p>
              </div>
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
