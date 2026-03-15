"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
        setMessage("You're on the list! We'll be in touch soon.");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="w-full px-6 py-4 flex items-center">
        <span className="text-xl font-bold">
          <span className="text-green-500">Meal</span>
          <span className="text-orange-500">Mates</span>
        </span>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Now accepting early access
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 max-w-3xl mb-6">
          Eat out with friends.{" "}
          <span className="text-orange-500">Save every time.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-500 max-w-xl mb-12">
          MealMates unlocks exclusive restaurant discounts for college students
          who dine out in groups. The bigger the crew, the bigger the deal.
        </p>

        {/* Email form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            required
            placeholder="your@email.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-60 text-base"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-xl transition-colors duration-200 text-base whitespace-nowrap"
          >
            {status === "loading" ? "Joining…" : "Join Waitlist"}
          </button>
        </form>

        {/* Feedback */}
        {message && (
          <p
            className={`mt-4 text-sm font-medium ${
              status === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Social proof */}
        <p className="mt-8 text-sm text-gray-400">
          Join{" "}
          <span className="font-semibold text-gray-600">500+ students</span>{" "}
          already on the waitlist.
        </p>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: "👥",
                title: "Gather your crew",
                desc: "Grab 2+ friends and pick a restaurant near campus.",
              },
              {
                icon: "📱",
                title: "Check in together",
                desc: "Open MealMates, verify your group, and unlock the deal.",
              },
              {
                icon: "🎉",
                title: "Enjoy the discount",
                desc: "Save on your meal — automatically applied at checkout.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
              >
                <span className="text-4xl">{step.icon}</span>
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MealMates. Made with ❤️ for college students.
      </footer>
    </main>
  );
}
