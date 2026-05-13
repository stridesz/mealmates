"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Journey = "onboarding" | "daily";
type OnboardingStep =
  | "welcome"
  | "campus"
  | "profile"
  | "interests"
  | "animal"
  | "matched"
  | "details"
  | "confirmed";
type DailyTab = "discover" | "my-tablrs" | "messages" | "profile";

const onboardingSteps: Array<{ key: OnboardingStep; label: string }> = [
  { key: "welcome", label: ".edu" },
  { key: "campus", label: "Campus" },
  { key: "profile", label: "Profile" },
  { key: "interests", label: "Taste" },
  { key: "animal", label: "Vibe" },
  { key: "matched", label: "Tables" },
  { key: "details", label: "Details" },
  { key: "confirmed", label: "Chat" },
];

const interestTags = ["Ramen", "Startups", "Fashion", "Study grind", "K-BBQ", "Deep talks", "Coffee walks", "Night plans"];

const spiritAnimals = [
  { emoji: "🦦", name: "Otter", text: "Social, chaotic, somehow always down." },
  { emoji: "🦉", name: "Owl", text: "Deep talks, late dinners, good questions." },
  { emoji: "🐆", name: "Cheetah", text: "Spontaneous plans. Decide fast, go faster." },
  { emoji: "🐼", name: "Panda", text: "Low-key, cozy, food-first energy." },
];

function PreviewStatusBar() {
  return (
    <div className="preview-status">
      <span>9:41</span>
      <div className="preview-status-icons">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function ProgressDots({ current }: { current: OnboardingStep }) {
  const index = onboardingSteps.findIndex((step) => step.key === current);
  return (
    <div className="preview-progress" aria-label="Onboarding progress">
      {onboardingSteps.map((step, i) => (
        <span key={step.key} className={i <= index ? "active" : ""} title={step.label} />
      ))}
    </div>
  );
}

function MiniAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span className="preview-mini-avatar" style={{ background: color }}>
      {initials}
    </span>
  );
}

function TableCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="preview-table-card">
      <div className="preview-table-topline">
        <span>92% match</span>
        <span>1 spot left</span>
      </div>
      <h3>Ramen Night at Ippudo</h3>
      <p>Tonight · 7:00 PM · East Village · ~$18</p>
      <div className="preview-avatar-row">
        <MiniAvatar initials="NK" color="#22C55E" />
        <MiniAvatar initials="JL" color="#A855F7" />
        <MiniAvatar initials="AM" color="#F97316" />
        <span className="preview-plus">+1</span>
      </div>
      {!compact && <p className="preview-match-copy">Matched because you picked ramen, founder energy, and spontaneous plans.</p>}
      <button className="preview-primary small">Join table</button>
    </div>
  );
}

function OnboardingScreen({ step, setStep }: { step: OnboardingStep; setStep: (step: OnboardingStep) => void }) {
  const currentIndex = onboardingSteps.findIndex((s) => s.key === step);
  const nextStep = onboardingSteps[Math.min(currentIndex + 1, onboardingSteps.length - 1)].key;
  const previousStep = onboardingSteps[Math.max(currentIndex - 1, 0)].key;

  return (
    <div className="preview-screen-content">
      <ProgressDots current={step} />

      {step === "welcome" && (
        <section className="preview-panel hero-panel">
          <div className="preview-badge">College students only</div>
          <h2>Find your next table.</h2>
          <p>Sign up with your .edu, tell Tablr your vibe, and we&apos;ll surface tables you&apos;d actually join.</p>
          <label className="preview-input-label">
            University email
            <span>victor@northeastern.edu</span>
          </label>
          <button className="preview-primary" onClick={() => setStep("campus")}>Continue with .edu</button>
        </section>
      )}

      {step === "campus" && (
        <section className="preview-panel">
          <div className="preview-badge">Campus detected</div>
          <h2>Looks like Northeastern.</h2>
          <p>We&apos;ll use your school to keep tables campus-relevant and student-only.</p>
          <div className="campus-card">
            <span>🐾</span>
            <div>
              <strong>Northeastern University</strong>
              <p>Boston + NYC Scholar network</p>
            </div>
          </div>
          <button className="preview-primary" onClick={() => setStep("profile")}>That&apos;s right</button>
          <button className="preview-ghost">Choose another school</button>
        </section>
      )}

      {step === "profile" && (
        <section className="preview-panel">
          <div className="preview-badge">Profile setup</div>
          <h2>Give the table a face.</h2>
          <div className="profile-builder">
            <div className="preview-photo">VQ</div>
            <div className="fake-fields">
              <span>Victor Qi</span>
              <span>First-year · Business</span>
              <span>Into food, startups, and real plans</span>
            </div>
          </div>
          <p className="preview-note">Phone number stays optional. Year beats age here — less weird, more college-native.</p>
          <button className="preview-primary" onClick={() => setStep("interests")}>Looks good</button>
        </section>
      )}

      {step === "interests" && (
        <section className="preview-panel">
          <div className="preview-badge">Taste profile</div>
          <h2>What should we match you on?</h2>
          <div className="tag-cloud">
            {interestTags.map((tag, i) => (
              <button key={tag} className={i < 5 ? "selected" : ""}>{tag}</button>
            ))}
          </div>
          <button className="preview-primary" onClick={() => setStep("animal")}>Next: vibe check</button>
        </section>
      )}

      {step === "animal" && (
        <section className="preview-panel animal-panel">
          <div className="preview-badge">Fun match question</div>
          <h2>What&apos;s your table spirit animal?</h2>
          <p>Not a personality test. Just enough signal to avoid painfully dry dinners.</p>
          <div className="animal-grid">
            {spiritAnimals.map((animal, i) => (
              <button key={animal.name} className={i === 0 ? "selected" : ""}>
                <span>{animal.emoji}</span>
                <strong>{animal.name}</strong>
                <small>{animal.text}</small>
              </button>
            ))}
          </div>
          <button className="preview-primary" onClick={() => setStep("matched")}>Find my table</button>
        </section>
      )}

      {step === "matched" && (
        <section className="preview-panel table-results">
          <div className="preview-badge">Your matches</div>
          <h2>Tables you&apos;d actually join.</h2>
          <TableCard />
          <button className="preview-primary" onClick={() => setStep("details")}>View table</button>
        </section>
      )}

      {step === "details" && (
        <section className="preview-panel details-panel">
          <div className="preview-badge">Table details</div>
          <h2>Ramen Night</h2>
          <p>Ippudo NYC · Tonight at 7:00 PM</p>
          <div className="why-card">
            <strong>Why you matched</strong>
            <span>Otter energy + ramen + startups + open to meeting new people.</span>
          </div>
          <div className="detail-list">
            <span>4/5 students confirmed</span>
            <span>Group chat unlocks after joining</span>
            <span>Meet outside at 6:55 PM</span>
          </div>
          <button className="preview-primary" onClick={() => setStep("confirmed")}>Join this table</button>
        </section>
      )}

      {step === "confirmed" && (
        <section className="preview-panel confirmed-panel">
          <div className="preview-badge">You&apos;re in</div>
          <h2>Group chat unlocked.</h2>
          <div className="chat-bubble left">yo, anyone taking the train?</div>
          <div className="chat-bubble right">I&apos;m coming from campus — can meet at 6:30</div>
          <div className="chat-bubble left">bet. see everyone outside Ippudo 🍜</div>
          <button className="preview-primary" onClick={() => setStep("welcome")}>Replay flow</button>
        </section>
      )}

      <div className="preview-step-controls">
        <button onClick={() => setStep(previousStep)} disabled={currentIndex === 0}>Back</button>
        <button onClick={() => setStep(nextStep)} disabled={currentIndex === onboardingSteps.length - 1}>Next</button>
      </div>
    </div>
  );
}

function CreateTablePanel({ created, onCreate }: { created: boolean; onCreate: () => void }) {
  return (
    <div className="daily-panel create-panel">
      <h2>Create a table</h2>
      <p>Pick the plan, set the vibe, and let Tablr fill the seats.</p>
      <div className="create-fields">
        <span>🍣 Sushi after class</span>
        <span>Today · 8:00 PM</span>
        <span>4 seats · chill but social</span>
      </div>
      <button className="preview-primary" onClick={onCreate}>Create table</button>
      {created && (
        <div className="confetti-card">
          <div className="confetti-burst" aria-hidden="true">🎉 ✨ 🥳</div>
          First table created. Confetti earned.
        </div>
      )}
    </div>
  );
}

function DailyScreen({ tab, setTab }: { tab: DailyTab; setTab: (tab: DailyTab) => void }) {
  const [discoverMode, setDiscoverMode] = useState<"For you" | "Today" | "This week" | "Create">("For you");
  const [created, setCreated] = useState(false);

  const body = useMemo(() => {
    if (tab === "discover") {
      if (discoverMode === "Create") {
        return <CreateTablePanel created={created} onCreate={() => setCreated(true)} />;
      }
      return (
        <div className="daily-panel">
          <div className="daily-header-row">
            <div>
              <h2>{discoverMode === "For you" ? "Your tables" : discoverMode}</h2>
              <p>{discoverMode === "For you" ? "Personalized by food, school, and vibe." : "Plans worth leaving campus for."}</p>
            </div>
            <span className="daily-count">12</span>
          </div>
          <TableCard compact={discoverMode !== "For you"} />
          <div className="preview-table-card muted-card">
            <h3>Café study table</h3>
            <p>Tomorrow · 3:00 PM · Blank Street · 3 spots</p>
            <p className="preview-match-copy">Matched with business majors and coffee-walk people.</p>
          </div>
        </div>
      );
    }

    if (tab === "my-tablrs") {
      return (
        <div className="daily-panel">
          <h2>My Tablrs</h2>
          <div className="timeline-card active"><strong>Tonight · Ramen Night</strong><span>4/5 filled · chat open</span></div>
          <div className="timeline-card"><strong>Friday · Matcha walk</strong><span>Pending · 2 invites out</span></div>
          <div className="timeline-card"><strong>Past · Brunch Squad</strong><span>5 people · saved to connections</span></div>
        </div>
      );
    }

    if (tab === "messages") {
      return (
        <div className="daily-panel messages-panel">
          <h2>Messages</h2>
          {[
            ["Ramen Night 🍜", "JL: see you at 7", "2"],
            ["Sunday Brunch Squad", "Nina: Egg Shop confirmed", ""],
            ["Café Study Table", "Ari: bringing my laptop", "1"],
          ].map(([name, msg, unread]) => (
            <div className="message-row" key={name}>
              <MiniAvatar initials={name.slice(0, 1)} color="#22C55E" />
              <div><strong>{name}</strong><span>{msg}</span></div>
              {unread && <em>{unread}</em>}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="daily-panel profile-panel-preview">
        <div className="preview-photo large">VQ</div>
        <h2>Victor Qi</h2>
        <p>Northeastern · First-year · Business</p>
        <div className="profile-stat-grid">
          <span><strong>8</strong> tables</span>
          <span><strong>21</strong> connections</span>
          <span><strong>Otter</strong> vibe</span>
        </div>
        <button className="preview-ghost">Edit profile & settings</button>
      </div>
    );
  }, [created, discoverMode, tab]);

  const bottomTabs: Array<{ key: DailyTab; label: string }> = [
    { key: "discover", label: "Discover" },
    { key: "my-tablrs", label: "My Tablrs" },
    { key: "messages", label: "Messages" },
    { key: "profile", label: "Profile" },
  ];

  return (
    <div className="preview-screen-content daily-content">
      {tab === "discover" && (
        <div className="discover-pills">
          {["For you", "Today", "This week", "Create"].map((mode) => (
            <button key={mode} className={discoverMode === mode ? "active" : ""} onClick={() => setDiscoverMode(mode as typeof discoverMode)}>
              {mode}
            </button>
          ))}
        </div>
      )}
      {body}
      <div className="daily-bottom-nav">
        {bottomTabs.map((item) => (
          <button key={item.key} className={tab === item.key ? "active" : ""} onClick={() => setTab(item.key)}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AppPreviewPhone() {
  const [journey, setJourney] = useState<Journey>("onboarding");
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("welcome");
  const [dailyTab, setDailyTab] = useState<DailyTab>("discover");

  return (
    <div className="app-preview-phone">
      <div className="app-preview-screen">
        <PreviewStatusBar />
        <div className="preview-app-header">
          <div>
            <span>Tablr preview</span>
            <strong>{journey === "onboarding" ? "New user flow" : "Daily hub"}</strong>
          </div>
          <img src="/logo.png" alt="Tablr" />
        </div>
        <div className="journey-switch">
          <button className={journey === "onboarding" ? "active" : ""} onClick={() => setJourney("onboarding")}>Onboarding</button>
          <button className={journey === "daily" ? "active" : ""} onClick={() => setJourney("daily")}>Daily Hub</button>
        </div>
        {journey === "onboarding" ? (
          <OnboardingScreen step={onboardingStep} setStep={setOnboardingStep} />
        ) : (
          <DailyScreen tab={dailyTab} setTab={setDailyTab} />
        )}
      </div>
    </div>
  );
}

export default function AppPreviewPage() {
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

      <div className="page-wrapper app-preview-page">
        <nav className="navbar">
          <Link href="/" className="nav-logo" aria-label="Tablr home">
            <div className="nav-logo-icon">
              <img src="/logo.png" alt="Tablr" width={36} height={36} className="nav-logo-img" />
            </div>
            <div>
              <span className="wordmark">Tablr</span>
              <p className="wordmark-sub">social dining, on campus</p>
            </div>
          </Link>
          <div className="nav-actions">
            <Link href="/app-preview" className="nav-link active">App Preview</Link>
            <Link href="/#waitlist" className="nav-cta">Join waitlist</Link>
          </div>
        </nav>

        <main className="app-preview-main">
          <section className="app-preview-hero">
            <div className="app-preview-copy">
              <p className="section-label">Interactive prototype</p>
              <h1>See Tablr from first signup to first table.</h1>
              <p>
                A deeper app preview for the website: onboarding, match questions, personalized tables, My Tablrs,
                messages, profile, and the first-create confetti moment.
              </p>
              <div className="preview-flow-list">
                <span>.edu signup</span>
                <span>Campus + profile</span>
                <span>Spirit animal vibe check</span>
                <span>Join table + chat</span>
              </div>
            </div>
            <div className="app-preview-phone-wrap">
              <AppPreviewPhone />
            </div>
          </section>

          <section className="preview-notes-section">
            <div>
              <p className="section-label">Flow logic</p>
              <h2>Two journeys, one story.</h2>
            </div>
            <div className="preview-note-grid">
              <article>
                <strong>New user onboarding</strong>
                <p>Tablr learns school, profile, interests, food taste, and a playful vibe signal before showing matched tables.</p>
              </article>
              <article>
                <strong>Daily Hub</strong>
                <p>After login, the app centers around Discover, My Tablrs, Messages, and Profile & Settings.</p>
              </article>
              <article>
                <strong>Payoff screen</strong>
                <p>The demo does not stop at form fields. It shows table details, joining, and group chat unlocking.</p>
              </article>
            </div>
          </section>
        </main>

        <footer className="footer">
          <p>Prototype preview — ready for edits.</p>
          <p>© 2026 Tablr.</p>
        </footer>
      </div>
    </>
  );
}
