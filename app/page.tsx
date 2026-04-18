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
        setMessage("You’re on the list. We’ll text the table when it’s ready.");
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
        <div className="floating-ring ring-one" />
        <div className="floating-ring ring-two" />
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

        <main>
          <section className="hero">
            <div className="hero-copy">
              <div className="hero-pill">
                <span className="hero-pill-dot" />
                Made for college students who want better plans
              </div>

              <div className="hero-logo-wrap">
                <div className="hero-logo-glow" />
                <TablrLogo size={104} />
              </div>

              <h1>
                Meet up over food,
                <br />
                <span>not small talk.</span>
              </h1>

              <p className="hero-text">
                Tablr helps you meet new people, try new spots, and turn “we should hang sometime” into dinner plans that actually happen.
              </p>

              <p className="tagline">Fork it, lets go</p>

              <div className="hero-stats">
                <div>
                  <strong>Shared tastes</strong>
                  <span>Match on cuisines, budgets, and vibe</span>
                </div>
                <div>
                  <strong>Easy plans</strong>
                  <span>Pick a place, build a table, invite the crew</span>
                </div>
              </div>
            </div>

            <div className="waitlist-shell" id="waitlist">
              <div className="waitlist-card">
                <p className="waitlist-kicker">Get early access</p>
                <h2>Your next favorite dinner group is waiting</h2>
                <p className="waitlist-text">
                  Join the launch list for invites, campus drops, and first access when Tablr opens near you.
                </p>

                <form onSubmit={handleSubmit} className="waitlist-form">
                  <label className="input-shell">
                    <span>Email address</span>
                    <input
                      type="email"
                      required
                      placeholder="you@school.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading" || status === "success"}
                      className="email-input"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="cta-btn"
                  >
                    {status === "loading" ? "Saving your seat…" : status === "success" ? "You’re in" : "Join the waitlist"}
                  </button>
                </form>

                {message && (
                  <p className={`feedback ${status === "success" ? "feedback-success" : "feedback-error"}`}>
                    {message}
                  </p>
                )}

                <div className="micro-proof">
                  <span>🍜 Match with people who love the same food</span>
                  <span>📍 Discover restaurants together</span>
                  <span>🎓 Built for college students</span>
                </div>
              </div>
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
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :root {
          color-scheme: light;
        }

        html {
          scroll-behavior: smooth;
        }

        html, body {
          min-height: 100%;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #f8fff8;
          color: #0d2614;
          overflow-x: hidden;
        }

        body {
          position: relative;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button, input {
          font: inherit;
        }

        .background-scene {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background:
            radial-gradient(circle at top left, rgba(255, 255, 255, 0.95), transparent 34%),
            linear-gradient(180deg, #f4fff5 0%, #effff1 48%, #f8fff8 100%);
        }

        .mesh,
        .floating-dot,
        .floating-ring,
        .grid-fade {
          position: absolute;
          pointer-events: none;
        }

        .mesh {
          filter: blur(36px);
          opacity: 0.7;
          border-radius: 999px;
          animation: drift 16s ease-in-out infinite alternate;
        }

        .mesh-one {
          top: -8%;
          left: -8%;
          width: 28rem;
          height: 28rem;
          background: radial-gradient(circle, rgba(52, 199, 89, 0.24) 0%, rgba(52, 199, 89, 0.06) 58%, transparent 72%);
        }

        .mesh-two {
          top: 24%;
          right: -10%;
          width: 26rem;
          height: 26rem;
          background: radial-gradient(circle, rgba(52, 199, 89, 0.18) 0%, rgba(52, 199, 89, 0.05) 58%, transparent 72%);
          animation-duration: 20s;
        }

        .mesh-three {
          bottom: -14%;
          left: 28%;
          width: 24rem;
          height: 24rem;
          background: radial-gradient(circle, rgba(255, 149, 0, 0.14) 0%, rgba(255, 149, 0, 0.04) 55%, transparent 75%);
          animation-duration: 22s;
        }

        .floating-dot {
          border-radius: 999px;
          opacity: 0.55;
          animation: bob 10s ease-in-out infinite;
        }

        .dot-one {
          top: 16%;
          left: 12%;
          width: 14px;
          height: 14px;
          background: rgba(52, 199, 89, 0.45);
        }

        .dot-two {
          top: 42%;
          right: 14%;
          width: 10px;
          height: 10px;
          background: rgba(255, 149, 0, 0.5);
          animation-delay: -2s;
        }

        .dot-three {
          bottom: 18%;
          left: 22%;
          width: 12px;
          height: 12px;
          background: rgba(52, 199, 89, 0.32);
          animation-delay: -4s;
        }

        .floating-ring {
          border-radius: 999px;
          border: 1px solid rgba(52, 199, 89, 0.18);
          animation: bob 13s ease-in-out infinite;
        }

        .ring-one {
          right: 22%;
          top: 18%;
          width: 100px;
          height: 100px;
        }

        .ring-two {
          left: 10%;
          bottom: 20%;
          width: 64px;
          height: 64px;
          border-color: rgba(255, 149, 0, 0.2);
          animation-delay: -3s;
        }

        .grid-fade {
          inset: 0;
          background-image:
            linear-gradient(rgba(13, 38, 20, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13, 38, 20, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at center, black 26%, transparent 80%);
          opacity: 0.32;
          animation: pulse 10s ease-in-out infinite alternate;
        }

        .splash-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background: rgba(248, 255, 248, 0.96);
          backdrop-filter: blur(16px);
          transition: opacity 0.65s ease, visibility 0.65s ease;
        }

        .splash-fade {
          opacity: 0;
          visibility: hidden;
        }

        .splash-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          text-align: center;
        }

        .splash-text {
          max-width: 28rem;
          color: #1a5a2c;
          font-size: clamp(1.45rem, 3vw, 2.4rem);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.04em;
        }

        .dots-row {
          display: flex;
          gap: 0.65rem;
          align-items: center;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #34C759;
          transition: opacity 0.24s ease;
        }

        .page-wrapper {
          position: relative;
          z-index: 1;
          min-height: 100vh;
        }

        .navbar {
          width: min(1180px, calc(100% - 2rem));
          margin: 0 auto;
          padding: 1.25rem 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .nav-logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
        }

        .wordmark {
          display: block;
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #12331d;
        }

        .wordmark-sub {
          font-size: 0.78rem;
          color: rgba(18, 51, 29, 0.62);
        }

        .nav-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0.7rem 1rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(18, 51, 29, 0.08);
          box-shadow: 0 10px 30px rgba(21, 62, 32, 0.08);
          font-size: 0.92rem;
          font-weight: 600;
          color: #174825;
          backdrop-filter: blur(16px);
        }

        .hero {
          width: min(1180px, calc(100% - 2rem));
          margin: 0 auto;
          padding: 4.5rem 0 3.5rem;
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
          gap: 2rem;
          align-items: center;
          min-height: calc(100vh - 5rem);
        }

        .hero-copy {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          margin-bottom: 1.2rem;
          padding: 0.68rem 0.95rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(52, 199, 89, 0.18);
          box-shadow: 0 14px 34px rgba(52, 199, 89, 0.08);
          color: #1f5d31;
          font-size: 0.92rem;
          font-weight: 600;
          backdrop-filter: blur(14px);
        }

        .hero-pill-dot {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: #FF9500;
          box-shadow: 0 0 0 6px rgba(255, 149, 0, 0.14);
        }

        .hero-logo-wrap {
          position: relative;
          display: inline-flex;
          margin-bottom: 1.5rem;
        }

        .hero-logo-glow {
          position: absolute;
          inset: 12%;
          background: radial-gradient(circle, rgba(52, 199, 89, 0.28), transparent 70%);
          filter: blur(24px);
          z-index: -1;
        }

        .hero h1 {
          font-size: clamp(3.2rem, 8vw, 6.6rem);
          line-height: 0.94;
          letter-spacing: -0.08em;
          color: #0d2614;
          max-width: 9.3ch;
        }

        .hero h1 span {
          color: #34C759;
        }

        .hero-text {
          margin-top: 1.3rem;
          max-width: 34rem;
          font-size: clamp(1rem, 2vw, 1.16rem);
          line-height: 1.65;
          color: rgba(13, 38, 20, 0.74);
        }

        .tagline {
          margin-top: 1.3rem;
          color: #FF9500;
          font-size: 0.98rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .hero-stats {
          margin-top: 2rem;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.95rem;
          width: 100%;
          max-width: 38rem;
        }

        .hero-stats div {
          padding: 1rem 1.05rem;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.62);
          border: 1px solid rgba(18, 51, 29, 0.08);
          box-shadow: 0 18px 40px rgba(13, 38, 20, 0.06);
          backdrop-filter: blur(18px);
        }

        .hero-stats strong {
          display: block;
          margin-bottom: 0.35rem;
          font-size: 0.98rem;
          color: #13371f;
        }

        .hero-stats span {
          display: block;
          color: rgba(13, 38, 20, 0.64);
          font-size: 0.92rem;
          line-height: 1.45;
        }

        .waitlist-shell {
          position: relative;
        }

        .waitlist-card {
          padding: 1.5rem;
          border-radius: 32px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.76) 100%);
          border: 1px solid rgba(255, 255, 255, 0.75);
          box-shadow:
            0 24px 80px rgba(17, 48, 26, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(22px);
        }

        .waitlist-kicker {
          margin-bottom: 0.8rem;
          color: #34C759;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .waitlist-card h2 {
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          line-height: 1.02;
          letter-spacing: -0.06em;
          color: #102d19;
        }

        .waitlist-text {
          margin-top: 0.85rem;
          font-size: 1rem;
          line-height: 1.65;
          color: rgba(16, 45, 25, 0.72);
        }

        .waitlist-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.4rem;
        }

        .input-shell {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          color: #245132;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .email-input {
          width: 100%;
          min-height: 56px;
          padding: 0.95rem 1rem;
          border-radius: 18px;
          border: 1px solid rgba(52, 199, 89, 0.22);
          background: rgba(250, 255, 250, 0.98);
          color: #0d2614;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }

        .email-input::placeholder {
          color: rgba(13, 38, 20, 0.34);
        }

        .email-input:focus {
          border-color: rgba(52, 199, 89, 0.7);
          box-shadow: 0 0 0 5px rgba(52, 199, 89, 0.12);
          transform: translateY(-1px);
        }

        .email-input:disabled {
          opacity: 0.62;
        }

        .cta-btn {
          min-height: 56px;
          border: none;
          border-radius: 18px;
          background: linear-gradient(135deg, #34C759 0%, #1fbf57 100%);
          color: white;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          cursor: pointer;
          box-shadow: 0 18px 36px rgba(52, 199, 89, 0.24);
          transition: transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease;
        }

        .cta-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 22px 40px rgba(52, 199, 89, 0.3);
        }

        .cta-btn:disabled {
          opacity: 0.72;
          cursor: default;
        }

        .feedback {
          margin-top: 0.9rem;
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .feedback-success {
          color: #15803d;
        }

        .feedback-error {
          color: #dc2626;
        }

        .micro-proof {
          display: grid;
          gap: 0.7rem;
          margin-top: 1.3rem;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(16, 45, 25, 0.08);
          color: rgba(16, 45, 25, 0.72);
          font-size: 0.92rem;
        }

        .proof-section {
          width: min(1180px, calc(100% - 2rem));
          margin: 0 auto;
          padding: 1.5rem 0 4.5rem;
        }

        .proof-intro {
          max-width: 42rem;
          margin-bottom: 1.75rem;
        }

        .section-label {
          margin-bottom: 0.85rem;
          color: #34C759;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .proof-intro h2 {
          font-size: clamp(2rem, 4vw, 3.4rem);
          line-height: 1;
          letter-spacing: -0.06em;
          color: #102d19;
        }

        .proof-intro p:last-child {
          margin-top: 0.95rem;
          color: rgba(16, 45, 25, 0.72);
          font-size: 1.02rem;
          line-height: 1.7;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .feature-card {
          padding: 1.3rem;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.64);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 18px 50px rgba(13, 38, 20, 0.08);
          backdrop-filter: blur(18px);
        }

        .feature-eyebrow {
          margin-bottom: 0.85rem;
          color: #FF9500;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .feature-card h3 {
          font-size: 1.28rem;
          line-height: 1.15;
          letter-spacing: -0.04em;
          color: #12331d;
        }

        .feature-card p:last-child {
          margin-top: 0.8rem;
          color: rgba(18, 51, 29, 0.7);
          font-size: 0.98rem;
          line-height: 1.65;
        }

        .footer {
          padding: 1.25rem 1rem 2rem;
          text-align: center;
          color: rgba(13, 38, 20, 0.42);
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        @keyframes drift {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(2%, 3%, 0) scale(1.08);
          }
        }

        @keyframes bob {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -16px, 0);
          }
        }

        @keyframes pulse {
          0% {
            opacity: 0.18;
            transform: scale(1);
          }
          100% {
            opacity: 0.34;
            transform: scale(1.02);
          }
        }

        @media (max-width: 960px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding-top: 3.2rem;
            min-height: auto;
          }

          .hero-copy {
            align-items: center;
            text-align: center;
          }

          .hero-text {
            max-width: 40rem;
          }

          .hero-stats {
            max-width: 100%;
          }

          .proof-section {
            padding-top: 0.5rem;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .navbar {
            width: min(100%, calc(100% - 1rem));
            padding-top: 0.75rem;
          }

          .wordmark-sub {
            display: none;
          }

          .nav-cta {
            min-height: 38px;
            padding: 0.62rem 0.88rem;
            font-size: 0.84rem;
          }

          .hero {
            width: min(100%, calc(100% - 1rem));
            padding: 2.6rem 0 2.5rem;
          }

          .hero-pill {
            font-size: 0.82rem;
            padding: 0.62rem 0.85rem;
          }

          .hero h1 {
            max-width: 100%;
            font-size: clamp(2.65rem, 15vw, 4rem);
          }

          .hero-stats {
            grid-template-columns: 1fr;
          }

          .waitlist-card {
            padding: 1.2rem;
            border-radius: 26px;
          }

          .waitlist-card h2 {
            font-size: 1.85rem;
          }

          .proof-section {
            width: min(100%, calc(100% - 1rem));
            padding-bottom: 3rem;
          }

          .proof-intro h2 {
            font-size: 2rem;
          }

          .feature-card {
            padding: 1.15rem;
            border-radius: 24px;
          }

          .splash-text {
            font-size: 1.85rem;
          }
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
