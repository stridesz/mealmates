"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [dots, setDots] = useState(6);
  const [, setSplashFading] = useState(false);
  const [splashGone, setSplashGone] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => setSplashFading(true), 0);
          setTimeout(() => setSplashGone(true), 600);
          return 0;
        }
        return prev - 1;
      });
    }, 333); // 6 dots × 333ms ≈ 2 seconds total

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
      {!splashGone && <div className="bg-base" aria-hidden="true" />}
      <div className="bg-overlay" aria-hidden="true" />

      {/* Splash screen */}
      {!splashGone && (
        <div className="splash-overlay" aria-hidden="true">
          <p className="splash-text">Every meal is better shared</p>
          <div className="dots-row">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="dot"
                style={{ opacity: i < dots ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main page */}
      <div className="page-wrapper">
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
          background: #ffffff;
          overflow-x: hidden;
        }

        /* ── Animated background ── */
        .bg-base {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: #ffffff;
        }

        .bg-overlay {
          position: fixed;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(circle at 50% 50%, rgba(52, 199, 89, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(52, 199, 89, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(52, 199, 89, 0.06) 0%, transparent 40%);
          animation: patternDrift 12s ease-in-out infinite alternate;
        }

        @keyframes patternDrift {
          0% {
            background:
              radial-gradient(circle at 50% 50%, rgba(52, 199, 89, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(52, 199, 89, 0.05) 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, rgba(52, 199, 89, 0.06) 0%, transparent 40%);
          }
          50% {
            background:
              radial-gradient(circle at 60% 40%, rgba(52, 199, 89, 0.10) 0%, transparent 50%),
              radial-gradient(circle at 30% 70%, rgba(52, 199, 89, 0.07) 0%, transparent 40%),
              radial-gradient(circle at 70% 30%, rgba(52, 199, 89, 0.04) 0%, transparent 40%);
          }
          100% {
            background:
              radial-gradient(circle at 40% 60%, rgba(52, 199, 89, 0.07) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(52, 199, 89, 0.06) 0%, transparent 40%),
              radial-gradient(circle at 25% 75%, rgba(52, 199, 89, 0.05) 0%, transparent 40%);
          }
        }

        /* ── Splash ── */
        .splash-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          gap: 2rem;
          transition: opacity 0.6s ease;
        }

        .splash-text {
          color: #34C759;
          font-size: clamp(1.4rem, 4vw, 2.5rem);
          font-weight: 500;
          letter-spacing: 0.01em;
          text-align: center;
          padding: 0 2rem;
          font-family: Georgia, 'Times New Roman', serif;
        }

        .dots-row {
          display: flex;
          gap: 0.6rem;
          align-items: center;
        }

        .dot {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #34C759;
          transition: opacity 0.25s ease;
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
          border-radius: 10px;
        }

        .wordmark {
          font-size: 1rem;
          font-weight: 700;
          color: #34C759;
          letter-spacing: 0.08em;
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
          border-radius: 16px;
        }

        .tagline {
          font-size: 0.8rem;
          color: rgba(52, 199, 89, 0.45);
          letter-spacing: 0.14em;
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
          background: #ffffff;
          border: 1.5px solid rgba(52, 199, 89, 0.3);
          border-radius: 10px;
          color: #1a1a1a;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .email-input::placeholder {
          color: rgba(0, 0, 0, 0.3);
        }

        .email-input:focus {
          border-color: #34C759;
          box-shadow: 0 0 0 3px rgba(52, 199, 89, 0.12);
        }

        .email-input:disabled {
          opacity: 0.5;
        }

        .cta-btn {
          padding: 0.8rem 1.5rem;
          background: #34C759;
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s, opacity 0.2s, transform 0.1s;
          white-space: nowrap;
        }

        .cta-btn:hover:not(:disabled) {
          background: #2db84e;
          transform: translateY(-1px);
        }

        .cta-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .cta-btn:disabled {
          opacity: 0.6;
          cursor: default;
        }

        /* ── Feedback ── */
        .feedback {
          margin-top: 1rem;
          font-size: 0.8rem;
        }

        .feedback-success {
          color: #34C759;
        }

        .feedback-error {
          color: #ff3b30;
        }

        /* ── Footer ── */
        .footer {
          padding: 1.5rem;
          text-align: center;
          font-size: 0.75rem;
          color: rgba(0, 0, 0, 0.2);
          letter-spacing: 0.04em;
        }
      `}</style>
    </>
  );
}
