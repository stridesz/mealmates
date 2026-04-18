"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setSplashFading(true), 2500);
    const hideTimer = setTimeout(() => setSplashVisible(false), 3300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
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
        setMessage("You're on the list. We'll be in touch.");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <>
      {/* Animated background */}
      <div className="tablr-bg" aria-hidden="true" />

      {/* Splash screen */}
      {splashVisible && (
        <div
          className="splash-overlay"
          style={{ opacity: splashFading ? 0 : 1 }}
          aria-hidden="true"
        >
          <p className="splash-text">Every meal is better shared</p>
        </div>
      )}

      {/* Main page */}
      <div
        className="page-wrapper"
        style={{ opacity: splashVisible ? 0 : 1, transition: "opacity 0.6s ease" }}
      >
        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-logo">
            <Image
              src="/tablr-logo.png"
              alt="Tablr"
              width={32}
              height={32}
              className="logo-img"
              priority
            />
            <span className="wordmark">Tablr</span>
          </div>
        </nav>

        {/* Hero */}
        <main className="hero">
          <div className="hero-logo">
            <Image
              src="/tablr-logo.png"
              alt="Tablr logo"
              width={80}
              height={80}
              className="hero-logo-img"
              priority
            />
          </div>

          <p className="tagline">Fork it, lets go</p>

          <form onSubmit={handleSubmit} className="waitlist-form">
            <input
              type="email"
              required
              placeholder="your@email.com"
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
              {status === "loading" ? "Joining…" : status === "success" ? "You're in" : "Join Waitlist"}
            </button>
          </form>

          {message && (
            <p className={`feedback ${status === "success" ? "feedback-success" : "feedback-error"}`}>
              {message}
            </p>
          )}
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>© 2026 Tablr.</p>
        </footer>
      </div>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
          height: 100%;
          font-family: 'Inter', system-ui, sans-serif;
          background: #1a1008;
          overflow-x: hidden;
        }

        /* ── Animated background ── */
        .tablr-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse 80% 60% at 30% 40%, #3d1f00 0%, #1a1008 55%, #0d0804 100%);
          animation: bgDrift 18s ease-in-out infinite alternate;
        }

        @keyframes bgDrift {
          0%   { background: radial-gradient(ellipse 80% 60% at 30% 40%, #3d1f00 0%, #1a1008 55%, #0d0804 100%); }
          33%  { background: radial-gradient(ellipse 70% 65% at 65% 30%, #4a2200 0%, #1a1008 55%, #0a0703 100%); }
          66%  { background: radial-gradient(ellipse 90% 55% at 20% 70%, #2e1800 0%, #1c1209 55%, #0d0804 100%); }
          100% { background: radial-gradient(ellipse 75% 70% at 55% 55%, #3a1b00 0%, #1a1008 50%, #0b0703 100%); }
        }

        /* ── Splash ── */
        .splash-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0e0905;
          transition: opacity 0.8s ease;
          pointer-events: none;
        }

        .splash-text {
          color: #fff;
          font-size: clamp(1.5rem, 4vw, 2.8rem);
          font-weight: 300;
          letter-spacing: 0.02em;
          text-align: center;
          padding: 0 2rem;
          font-family: Georgia, 'Times New Roman', serif;
        }

        /* ── Page wrapper ── */
        .page-wrapper {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ── Navbar ── */
        .navbar {
          width: 100%;
          padding: 1.25rem 2rem;
          display: flex;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-img {
          object-fit: contain;
          border-radius: 6px;
        }

        .wordmark {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── Hero ── */
        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 1.5rem 6rem;
          text-align: center;
        }

        .hero-logo {
          margin-bottom: 1.25rem;
        }

        .hero-logo-img {
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 0 40px rgba(168, 230, 163, 0.08);
        }

        .tagline {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.12em;
          text-transform: lowercase;
          margin-bottom: 2.5rem;
        }

        /* ── Waitlist form ── */
        .waitlist-form {
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        @media (min-width: 480px) {
          .waitlist-form {
            flex-direction: row;
          }
        }

        .email-input {
          flex: 1;
          padding: 0.8rem 1rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          color: #fff;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .email-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .email-input:focus {
          border-color: #a8e6a3;
        }

        .email-input:disabled {
          opacity: 0.5;
        }

        .cta-btn {
          padding: 0.8rem 1.5rem;
          background: #a8e6a3;
          color: #0e1f0d;
          font-size: 0.9rem;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s, opacity 0.2s;
          white-space: nowrap;
        }

        .cta-btn:hover:not(:disabled) {
          background: #8fda8a;
        }

        .cta-btn:disabled {
          opacity: 0.6;
          cursor: default;
        }

        /* ── Feedback ── */
        .feedback {
          margin-top: 1rem;
          font-size: 0.8rem;
          letter-spacing: 0.02em;
        }

        .feedback-success {
          color: #a8e6a3;
        }

        .feedback-error {
          color: #f87171;
        }

        /* ── Footer ── */
        .footer {
          padding: 1.5rem;
          text-align: center;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.2);
          letter-spacing: 0.04em;
        }
      `}</style>
    </>
  );
}
