export default function DatasetPage() {
  const attributes = [
    { name: "Time",   meaning: "Seconds elapsed since the first transaction in the dataset.",                             used: "Input feature" },
    { name: "V1–V28", meaning: "PCA-transformed numerical features (anonymised to protect privacy).",                    used: "Input features" },
    { name: "Amount", meaning: "Transaction amount in the original currency.",                                            used: "Input feature" },
    { name: "Class",  meaning: "Target label — 0 = Legitimate transaction, 1 = Fraud transaction.",                      used: "Prediction target" },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>

      <div className="fade-in" style={{ marginBottom: 40 }}>
        <div className="badge badge-purple" style={{ marginBottom: 16 }}>Section 3</div>
        <h1 className="gradient-text" style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: 12 }}>
          Dataset Description
        </h1>
        <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>
          The project uses the <strong style={{ color: "#e2e8f0" }}>Credit Card Fraud Detection</strong> dataset
          hosted on Kaggle by MLG-ULB. It contains <strong style={{ color: "#6366f1" }}>284,807 transactions</strong> and 31 columns.
        </p>
      </div>

      {/* Key numbers */}
      <div className="fade-in-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 40 }}>
        {[
          { label: "Total Rows",       value: "284,807", color: "#6366f1" },
          { label: "Total Columns",    value: "31",       color: "#8b5cf6" },
          { label: "Legitimate (0)",   value: "284,315",  color: "#10b981" },
          { label: "Fraud (1)",        value: "492",      color: "#ef4444" },
          { label: "Fraud Rate",       value: "0.173%",   color: "#f59e0b" },
          { label: "Input Features",   value: "30",       color: "#06b6d4" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Class Distribution Bar */}
      <div className="card fade-in-2" style={{ marginBottom: 32 }}>
        <div className="section-title" style={{ marginBottom: 20 }}>Class Distribution</div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 14, color: "#10b981", fontWeight: 600 }}>Legitimate (Class 0)</span>
            <span style={{ fontSize: 14, color: "#94a3b8" }}>284,315 — 99.83%</span>
          </div>
          <div style={{ background: "#1a2235", borderRadius: 8, height: 28, overflow: "hidden" }}>
            <div style={{
              width: "99.83%", height: "100%",
              background: "linear-gradient(90deg, #10b981, #34d399)",
              borderRadius: 8, display: "flex", alignItems: "center", paddingLeft: 12,
              fontSize: 12, fontWeight: 600, color: "#0d1117",
              transition: "width 1s ease",
            }}>99.83%</div>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 14, color: "#ef4444", fontWeight: 600 }}>Fraud (Class 1)</span>
            <span style={{ fontSize: 14, color: "#94a3b8" }}>492 — 0.17%</span>
          </div>
          <div style={{ background: "#1a2235", borderRadius: 8, height: 28, overflow: "hidden" }}>
            <div style={{
              width: "0.17%", height: "100%", minWidth: 80,
              background: "linear-gradient(90deg, #ef4444, #f87171)",
              borderRadius: 8, display: "flex", alignItems: "center", paddingLeft: 12,
              fontSize: 12, fontWeight: 600, color: "#fff",
            }}>0.17%</div>
          </div>
        </div>

        <div style={{
          marginTop: 20, padding: "12px 16px",
          background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
          borderRadius: 10, fontSize: 13, color: "#fbbf24",
        }}>
          ⚠️ <strong>Severely Imbalanced Dataset</strong> — A naive model that predicts every transaction
          as legitimate would still achieve 99.83% accuracy while detecting zero fraud.
          That's why we use <strong>precision, recall, and F1-score</strong> as primary metrics.
        </div>
      </div>

      {/* Attributes Table */}
      <div className="card fade-in-3" style={{ marginBottom: 32 }}>
        <div className="section-title" style={{ marginBottom: 20 }}>Column Descriptions</div>
        <table className="report-table">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Attribute</th>
              <th style={{ textAlign: "left" }}>Meaning</th>
              <th style={{ textAlign: "left" }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((a) => (
              <tr key={a.name}>
                <td>
                  <code style={{ color: "#c084fc", background: "rgba(192,132,252,0.1)", padding: "2px 8px", borderRadius: 4 }}>
                    {a.name}
                  </code>
                </td>
                <td style={{ textAlign: "left", color: "#94a3b8" }}>{a.meaning}</td>
                <td style={{ textAlign: "left" }}>
                  <span className={a.name === "Class" ? "badge badge-red" : "badge badge-green"}>
                    {a.used}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Suitability */}
      <div className="card fade-in-3">
        <div className="section-title" style={{ marginBottom: 16 }}>Dataset Suitability & Limitations</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ color: "#10b981", fontWeight: 600, marginBottom: 10 }}>✅ Suitable Because</div>
            <ul style={{ color: "#94a3b8", fontSize: 14, lineHeight: 2, listStyle: "none" }}>
              <li>• Binary classification with clear labels</li>
              <li>• Numeric features — no encoding needed</li>
              <li>• Large enough for train/test split</li>
              <li>• Widely used benchmark dataset</li>
            </ul>
          </div>
          <div>
            <div style={{ color: "#ef4444", fontWeight: 600, marginBottom: 10 }}>⚠️ Limitations</div>
            <ul style={{ color: "#94a3b8", fontSize: 14, lineHeight: 2, listStyle: "none" }}>
              <li>• Severe class imbalance (0.17% fraud)</li>
              <li>• Anonymised — original features unknown</li>
              <li>• Historical data — patterns may have changed</li>
              <li>• Not a live production payment dataset</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
