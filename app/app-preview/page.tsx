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
type DiscoverMode = "For you" | "Today" | "This week" | "Create";

type TableOption = {
  id: string;
  emoji: string;
  title: string;
  time: string;
  place: string;
  price: string;
  area: string;
  match: number;
  spots: string;
  vibe: string;
  reason: string;
  people: Array<{ initials: string; color: string }>;
  tags: string[];
};

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

const interestTags = ["Ramen", "Startups", "Fashion", "Study grind", "K-BBQ", "Deep talks", "Coffee walks", "Night plans", "Sushi", "Finance"];

const spiritAnimals = [
  { emoji: "🦦", name: "Otter", text: "Social, chaotic, somehow always down." },
  { emoji: "🦉", name: "Owl", text: "Deep talks, late dinners, good questions." },
  { emoji: "🐆", name: "Cheetah", text: "Spontaneous plans. Decide fast, go faster." },
  { emoji: "🐼", name: "Panda", text: "Low-key, cozy, food-first energy." },
];

const tableOptions: TableOption[] = [
  {
    id: "ramen-founders",
    emoji: "🍜",
    title: "Ramen Night at Ippudo",
    time: "Tonight · 7:00 PM",
    place: "Ippudo NYC",
    price: "~$18",
    area: "East Village",
    match: 96,
    spots: "1 spot left",
    vibe: "Founder energy, easy banter",
    reason: "You picked ramen, startups, otter energy, and spontaneous plans.",
    people: [
      { initials: "NK", color: "#22C55E" },
      { initials: "JL", color: "#A855F7" },
      { initials: "AM", color: "#F97316" },
    ],
    tags: ["Startups", "Ramen", "NYC Scholar"],
  },
  {
    id: "matcha-design",
    emoji: "🍵",
    title: "Matcha Walk + Design Talk",
    time: "Tomorrow · 3:30 PM",
    place: "Cha Cha Matcha",
    price: "~$9",
    area: "NoHo",
    match: 91,
    spots: "3 spots",
    vibe: "Creative, casual, low pressure",
    reason: "Matched on fashion, coffee walks, and wanting plans that do not feel forced.",
    people: [
      { initials: "RE", color: "#A855F7" },
      { initials: "IN", color: "#EAB308" },
      { initials: "MK", color: "#22C55E" },
    ],
    tags: ["Fashion", "Design", "Coffee"],
  },
  {
    id: "kbbq-finance",
    emoji: "🥩",
    title: "K-BBQ Finance Table",
    time: "Thu · 8:00 PM",
    place: "Jongro BBQ",
    price: "~$32",
    area: "K-Town",
    match: 88,
    spots: "2 spots",
    vibe: "Loud table, career talk optional",
    reason: "You picked business, finance, food exploration, and group dinners.",
    people: [
      { initials: "PK", color: "#0EA5E9" },
      { initials: "AH", color: "#F97316" },
      { initials: "SV", color: "#EF4444" },
    ],
    tags: ["Finance", "K-BBQ", "Group"],
  },
  {
    id: "cafe-study",
    emoji: "☕",
    title: "Café Study Table",
    time: "Fri · 2:00 PM",
    place: "Blank Street",
    price: "~$7",
    area: "Washington Sq.",
    match: 84,
    spots: "4 spots",
    vibe: "Quiet start, talk after grind",
    reason: "Matched on study grind, coffee, and meeting people without killing productivity.",
    people: [
      { initials: "HY", color: "#A855F7" },
      { initials: "MJ", color: "#EAB308" },
      { initials: "CA", color: "#22C55E" },
    ],
    tags: ["Study", "Coffee", "Chill"],
  },
];

function PreviewStatusBar() {
  return (
    <div className="preview-status">
      <span>9:41</span>
      <div className="preview-status-icons" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function ProgressDots({ current, setStep }: { current: OnboardingStep; setStep: (step: OnboardingStep) => void }) {
  const index = onboardingSteps.findIndex((step) => step.key === current);
  return (
    <div className="preview-progress" aria-label="Onboarding progress">
      {onboardingSteps.map((step, i) => (
        <button
          type="button"
          key={step.key}
          className={i <= index ? "active" : ""}
          onClick={() => setStep(step.key)}
          aria-label={`Go to ${step.label}`}
          title={step.label}
        />
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

function TableCard({ table, compact = false, selected = false, onSelect }: { table: TableOption; compact?: boolean; selected?: boolean; onSelect?: () => void }) {
  return (
    <button type="button" className={`preview-table-card table-option ${selected ? "selected" : ""}`} onClick={onSelect}>
      <div className="preview-table-topline">
        <span>{table.match}% match</span>
        <span>{table.spots}</span>
      </div>
      <div className="table-card-title-row">
        <div className="table-emoji">{table.emoji}</div>
        <div>
          <h3>{table.title}</h3>
          <p>{table.time} · {table.area} · {table.price}</p>
        </div>
      </div>
      <div className="preview-avatar-row">
        {table.people.map((person) => (
          <MiniAvatar key={person.initials} initials={person.initials} color={person.color} />
        ))}
        <span className="preview-plus">+1</span>
      </div>
      {!compact && <p className="preview-match-copy">{table.reason}</p>}
      <div className="table-tags">
        {table.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </button>
  );
}

function OnboardingScreen({ step, setStep }: { step: OnboardingStep; setStep: (step: OnboardingStep) => void }) {
  const [selectedTableId, setSelectedTableId] = useState(tableOptions[0].id);
  const selectedTable = tableOptions.find((table) => table.id === selectedTableId) ?? tableOptions[0];
  const currentIndex = onboardingSteps.findIndex((s) => s.key === step);
  const nextStep = onboardingSteps[Math.min(currentIndex + 1, onboardingSteps.length - 1)].key;
  const previousStep = onboardingSteps[Math.max(currentIndex - 1, 0)].key;
  const goNext = () => currentIndex === onboardingSteps.length - 1 ? setStep("welcome") : setStep(nextStep);
  const goBack = () => setStep(previousStep);

  return (
    <div className="preview-screen-content onboarding-content">
      <ProgressDots current={step} setStep={setStep} />

      {step === "welcome" && (
        <section className="preview-panel hero-panel">
          <div className="preview-badge">College students only</div>
          <h2>Find your next table.</h2>
          <p>Sign up with your .edu, tell Tablr your vibe, and we&apos;ll surface tables you&apos;d actually join.</p>
          <label className="preview-input-label">
            University email
            <span>victor@northeastern.edu</span>
          </label>
          <div className="mini-trust-row">
            <span>Verified campus</span>
            <span>No randoms</span>
          </div>
          <button type="button" className="preview-primary" onClick={() => setStep("campus")}>Continue with .edu</button>
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
          <button type="button" className="preview-primary" onClick={() => setStep("profile")}>That&apos;s right</button>
          <button type="button" className="preview-ghost">Choose another school</button>
        </section>
      )}

      {step === "profile" && (
        <section className="preview-panel profile-card-panel">
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
          <div className="profile-preview-strip">
            <span>Major</span>
            <strong>Business</strong>
            <span>Year</span>
            <strong>First-year</strong>
          </div>
          <p className="preview-note">Phone number stays optional. Year beats age here — less weird, more college-native.</p>
          <button type="button" className="preview-primary" onClick={() => setStep("interests")}>Looks good</button>
        </section>
      )}

      {step === "interests" && (
        <section className="preview-panel">
          <div className="preview-badge">Taste profile</div>
          <h2>What should we match you on?</h2>
          <p>Pick a few. The demo preselects the strongest signals.</p>
          <div className="tag-cloud">
            {interestTags.map((tag, i) => (
              <button type="button" key={tag} className={i < 6 ? "selected" : ""}>{tag}</button>
            ))}
          </div>
          <button type="button" className="preview-primary" onClick={() => setStep("animal")}>Next: vibe check</button>
        </section>
      )}

      {step === "animal" && (
        <section className="preview-panel animal-panel">
          <div className="preview-badge">Fun match question</div>
          <h2>What&apos;s your table spirit animal?</h2>
          <p>Not a personality test. Just enough signal to avoid painfully dry dinners.</p>
          <div className="animal-grid">
            {spiritAnimals.map((animal, i) => (
              <button type="button" key={animal.name} className={i === 0 ? "selected" : ""}>
                <span>{animal.emoji}</span>
                <strong>{animal.name}</strong>
                <small>{animal.text}</small>
              </button>
            ))}
          </div>
          <button type="button" className="preview-primary" onClick={() => setStep("matched")}>Find my table</button>
        </section>
      )}

      {step === "matched" && (
        <section className="preview-panel table-results">
          <div className="preview-badge">Your matches</div>
          <h2>Tables you&apos;d actually join.</h2>
          <p>Tap a table, then view the details.</p>
          <div className="table-stack">
            {tableOptions.map((table) => (
              <TableCard
                key={table.id}
                table={table}
                selected={table.id === selectedTableId}
                compact={table.id !== selectedTableId}
                onSelect={() => setSelectedTableId(table.id)}
              />
            ))}
          </div>
          <button type="button" className="preview-primary" onClick={() => setStep("details")}>View {selectedTable.emoji} table</button>
        </section>
      )}

      {step === "details" && (
        <section className="preview-panel details-panel">
          <div className="preview-badge">Table details</div>
          <div className="detail-hero">
            <span>{selectedTable.emoji}</span>
            <div>
              <h2>{selectedTable.title.replace(" at Ippudo", "")}</h2>
              <p>{selectedTable.place} · {selectedTable.time}</p>
            </div>
          </div>
          <div className="why-card">
            <strong>Why you matched</strong>
            <span>{selectedTable.reason}</span>
          </div>
          <div className="detail-list">
            <span>{selectedTable.spots} · {selectedTable.vibe}</span>
            <span>Group chat unlocks after joining</span>
            <span>Meet outside 5 minutes before</span>
          </div>
          <button type="button" className="preview-primary" onClick={() => setStep("confirmed")}>Join this table</button>
        </section>
      )}

      {step === "confirmed" && (
        <section className="preview-panel confirmed-panel">
          <div className="preview-badge">You&apos;re in</div>
          <h2>Group chat unlocked.</h2>
          <div className="confirmation-card">
            <span>{selectedTable.emoji}</span>
            <div>
              <strong>{selectedTable.title}</strong>
              <small>{selectedTable.time} · calendar ready</small>
            </div>
          </div>
          <div className="chat-bubble left">yo, anyone coming from campus?</div>
          <div className="chat-bubble right">I&apos;m heading out at 6:30</div>
          <div className="chat-bubble left">bet. see everyone there {selectedTable.emoji}</div>
          <button type="button" className="preview-primary" onClick={() => setStep("welcome")}>Replay flow</button>
        </section>
      )}

      <div className="preview-step-controls">
        <button type="button" onClick={goBack} disabled={currentIndex === 0}>Back</button>
        <button type="button" onClick={goNext}>{currentIndex === onboardingSteps.length - 1 ? "Restart" : "Next"}</button>
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
        <span>Invite: same school + shared tags</span>
      </div>
      <button type="button" className="preview-primary" onClick={onCreate}>Create table</button>
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
  const [discoverMode, setDiscoverMode] = useState<DiscoverMode>("For you");
  const [created, setCreated] = useState(false);

  const visibleTables = useMemo(() => {
    if (discoverMode === "Today") return tableOptions.slice(0, 2);
    if (discoverMode === "This week") return tableOptions.slice(1);
    return tableOptions;
  }, [discoverMode]);

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
            <span className="daily-count">{visibleTables.length}</span>
          </div>
          <div className="daily-table-list">
            {visibleTables.map((table, index) => (
              <TableCard key={table.id} table={table} compact={index > 0} />
            ))}
          </div>
        </div>
      );
    }

    if (tab === "my-tablrs") {
      return (
        <div className="daily-panel">
          <h2>My Tablrs</h2>
          <div className="timeline-card active"><strong>Tonight · Ramen Night</strong><span>4/5 filled · chat open · leave at 6:30</span></div>
          <div className="timeline-card"><strong>Friday · Matcha walk</strong><span>Pending · 2 invites out</span></div>
          <div className="timeline-card"><strong>Past · Brunch Squad</strong><span>5 people · saved to connections</span></div>
          <button type="button" className="preview-ghost">Create another Tablr</button>
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
            ["Matcha Walk", "Rei: anyone bringing a camera?", ""],
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
        <div className="profile-tags-preview">
          {interestTags.slice(0, 6).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <button type="button" className="preview-ghost">Edit profile & settings</button>
      </div>
    );
  }, [created, discoverMode, tab, visibleTables]);

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
          {(["For you", "Today", "This week", "Create"] as DiscoverMode[]).map((mode) => (
            <button type="button" key={mode} className={discoverMode === mode ? "active" : ""} onClick={() => setDiscoverMode(mode)}>
              {mode}
            </button>
          ))}
        </div>
      )}
      {body}
      <div className="daily-bottom-nav">
        {bottomTabs.map((item) => (
          <button type="button" key={item.key} className={tab === item.key ? "active" : ""} onClick={() => setTab(item.key)}>
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
          <button type="button" className={journey === "onboarding" ? "active" : ""} onClick={() => setJourney("onboarding")}>Onboarding</button>
          <button type="button" className={journey === "daily" ? "active" : ""} onClick={() => setJourney("daily")}>Daily Hub</button>
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
                <span>More table options</span>
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
