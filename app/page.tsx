import Link from "next/link";

const stats = [
  { label: "Total Transactions", value: "284,807",  color: "#6366f1", icon: "💳" },
  { label: "Fraud Cases",        value: "492",       color: "#ef4444", icon: "🚨" },
  { label: "Fraud Rate",         value: "0.173%",    color: "#f59e0b", icon: "📊" },
  { label: "Model Accuracy",     value: "99.8%",     color: "#10b981", icon: "✅" },
  { label: "Avg Precision (AP)", value: "0.6255",    color: "#8b5cf6", icon: "🎯" },
  { label: "Features Used",      value: "30",        color: "#06b6d4", icon: "🔢" },
];

const pages = [
  { href: "/dataset",   icon: "🗄️",  title: "Dataset",   desc: "Explore the 284k transaction dataset and class distribution." },
  { href: "/algorithm", icon: "🧠",  title: "Algorithm",  desc: "SVM with RBF kernel — margin, kernel trick & class weighting." },
  { href: "/results",   icon: "📈",  title: "Results",    desc: "Confusion matrix, precision-recall curve & classification report." },
  { href: "/code",      icon: "💻",  title: "Code",       desc: "Full Python implementation with scikit-learn pipeline." },
];

export default function Home() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>

      {/* Hero */}
      <div className="fade-in" style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 16px", borderRadius: 20,
          background: "rgba(99,102,241,0.1)",
          border: "1px solid rgba(99,102,241,0.3)",
          marginBottom: 24, fontSize: 13, color: "#a78bfa",
        }}>
          🎓 ML Lab Project · B.Tech CSE (AI&ML) · 2026
        </div>

        <h1 className="gradient-text" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          Credit Card Fraud Detection
        </h1>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 400, color: "#94a3b8", marginBottom: 24 }}>
          Using Support Vector Machine (SVM) with RBF Kernel
        </h2>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          <span className="badge badge-purple">Roll: 24P61A66G7</span>
          <span className="badge badge-purple">Roll: 24P61A66G8</span>
          <span className="badge badge-purple">Roll: 24P61A66G9</span>
        </div>

        <p style={{ maxWidth: 640, margin: "0 auto", color: "#94a3b8", lineHeight: 1.7, fontSize: 15 }}>
          A binary classification system that distinguishes fraudulent credit card transactions
          from legitimate ones using a Support Vector Machine trained on anonymised transaction data.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="fade-in-2" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 16, marginBottom: 48,
      }}>
        {stats.map((s) => (
          <div key={s.label} className="stat-card glow-pulse">
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Navigation Cards */}
      <div className="fade-in-3" style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20,
      }}>
        {pages.map((p) => (
          <Link key={p.href} href={p.href} style={{ textDecoration: "none" }}>
            <div className="card" style={{ cursor: "pointer", height: "100%" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: "#e2e8f0" }}>{p.title}</div>
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{p.desc}</div>
              <div style={{ marginTop: 16, color: "#6366f1", fontSize: 13, fontWeight: 600 }}>Explore →</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Problem Statement */}
      <div className="card fade-in" style={{ marginTop: 40 }}>
        <div className="section-title">📋 Problem Statement</div>
        <p style={{ color: "#94a3b8", lineHeight: 1.8, marginTop: 12 }}>
          Given transaction-related features from the Kaggle Credit Card Fraud Detection dataset,
          build and evaluate an SVM-based binary classifier that predicts whether a transaction
          is <span style={{ color: "#10b981", fontWeight: 600 }}>legitimate (Class 0)</span> or{" "}
          <span style={{ color: "#ef4444", fontWeight: 600 }}>fraudulent (Class 1)</span>.
          Fraud examples are rare (~0.173%), so the model must be evaluated on recall and precision,
          not just accuracy.
        </p>
      </div>
    </div>
  );
}
