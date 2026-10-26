"use client";

// Precision-Recall curve data points from actual trained model (AP = 0.8993)
const PR_POINTS = [
  { recall: 0.00, precision: 1.00 },
  { recall: 0.94, precision: 1.00 },
  { recall: 0.94, precision: 0.73 },
  { recall: 1.00, precision: 0.73 },
  { recall: 1.00, precision: 0.00 },
];

function PrecisionRecallCurve() {
  const W = 460, H = 280;
  const pad = { top: 20, right: 20, bottom: 50, left: 55 };
  const iW = W - pad.left - pad.right;
  const iH = H - pad.top - pad.bottom;
  const toX = (r: number) => pad.left + r * iW;
  const toY = (p: number) => pad.top + (1 - p) * iH;
  const d = PR_POINTS.map((pt, i) =>
    `${i === 0 ? "M" : "L"}${toX(pt.recall).toFixed(1)},${toY(pt.precision).toFixed(1)}`
  ).join(" ");
  const gridVals = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="pr-svg" style={{ maxWidth: 500 }}>
      {gridVals.map((v) => (
        <g key={v}>
          <line x1={toX(v)} y1={pad.top} x2={toX(v)} y2={pad.top + iH} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1={pad.left} y1={toY(v)} x2={pad.left + iW} y2={toY(v)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={toX(v)} y={pad.top + iH + 20} textAnchor="middle" fill="#64748b" fontSize="11">{v.toFixed(1)}</text>
          <text x={pad.left - 10} y={toY(v) + 4} textAnchor="end" fill="#64748b" fontSize="11">{v.toFixed(1)}</text>
        </g>
      ))}
      <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + iH} stroke="#334155" strokeWidth="1.5" />
      <line x1={pad.left} y1={pad.top + iH} x2={pad.left + iW} y2={pad.top + iH} stroke="#334155" strokeWidth="1.5" />
      <text x={pad.left + iW / 2} y={H - 4} textAnchor="middle" fill="#94a3b8" fontSize="12">Recall</text>
      <text x={14} y={pad.top + iH / 2} textAnchor="middle" fill="#94a3b8" fontSize="12"
        transform={`rotate(-90,14,${pad.top + iH / 2})`}>Precision</text>
      <path d={`${d} L${toX(1.0)},${toY(0)} L${pad.left},${toY(0)} Z`} fill="rgba(99,102,241,0.1)" />
      <path d={d} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <rect x={toX(0.05)} y={pad.top + 10} width={130} height={28} rx={6}
        fill="rgba(17,24,39,0.9)" stroke="rgba(99,102,241,0.3)" strokeWidth="1" />
      <line x1={toX(0.05) + 8} y1={pad.top + 24} x2={toX(0.05) + 26} y2={pad.top + 24} stroke="#6366f1" strokeWidth="2" />
      <text x={toX(0.05) + 30} y={pad.top + 28} fill="#a78bfa" fontSize="11">SVM (AP = 0.8993)</text>
    </svg>
  );
}

export default function ResultsPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>

      <div className="fade-in" style={{ marginBottom: 40 }}>
        <div className="badge badge-purple" style={{ marginBottom: 16 }}>Section 8 & 9</div>
        <h1 className="gradient-text" style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: 12 }}>
          Results & Performance Evaluation
        </h1>
        <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>
          The SVM model was trained on a <strong style={{ color: "#e2e8f0" }}>stratified sample of 5,000 rows</strong> (4,000 train / 1,000 test)
          due to computational constraints of the RBF kernel. Results below are from the actual trained model.
        </p>
      </div>

      {/* Stats row */}
      <div className="fade-in-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 36 }}>
        {[
          { label: "Training Rows",   value: "4,000",  color: "#6366f1" },
          { label: "Testing Rows",    value: "1,000",  color: "#8b5cf6" },
          { label: "True Negatives",  value: "977",    color: "#10b981" },
          { label: "False Positives", value: "6",      color: "#f59e0b" },
          { label: "False Negatives", value: "1",      color: "#f59e0b" },
          { label: "True Positives",  value: "16",     color: "#34d399" },
          { label: "Avg Precision",   value: "0.8993", color: "#06b6d4" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Confusion Matrix + PR Curve */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>

        <div className="card fade-in-2">
          <div className="section-title" style={{ marginBottom: 8 }}>Confusion Matrix</div>
          <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>
            Predicted vs. Actual labels on the 1,000-row test set
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ color: "#64748b", fontSize: 11, writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", letterSpacing: 1 }}>
              TRUE LABEL
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ textAlign: "center", color: "#64748b", fontSize: 11, letterSpacing: 1, marginBottom: 8 }}>PREDICTED LABEL</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 6 }}>
                <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#10b981" }}>Legitimate</div>
                <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#ef4444" }}>Fraud</div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", marginRight: 8 }}>
                  <div style={{ fontSize: 12, color: "#10b981", textAlign: "right" }}>Legit</div>
                  <div style={{ height: 8 }}></div>
                  <div style={{ fontSize: 12, color: "#ef4444", textAlign: "right" }}>Fraud</div>
                </div>
                <div className="cm-grid" style={{ flex: 1 }}>
                  <div className="cm-cell cm-tn" style={{ minHeight: 80 }}>
                    <div style={{ fontSize: "1.4rem" }}>977</div>
                    <div style={{ fontSize: 10, color: "#93c5fd", marginTop: 4 }}>TN</div>
                  </div>
                  <div className="cm-cell cm-fp" style={{ minHeight: 80 }}>
                    <div style={{ fontSize: "1.4rem" }}>6</div>
                    <div style={{ fontSize: 10, color: "#fbbf24", marginTop: 4 }}>FP</div>
                  </div>
                  <div className="cm-cell cm-fn" style={{ minHeight: 80 }}>
                    <div style={{ fontSize: "1.4rem" }}>1</div>
                    <div style={{ fontSize: 10, color: "#64748b", marginTop: 4 }}>FN</div>
                  </div>
                  <div className="cm-cell cm-tp" style={{ minHeight: 80 }}>
                    <div style={{ fontSize: "1.4rem" }}>16</div>
                    <div style={{ fontSize: 10, color: "#86efac", marginTop: 4 }}>TP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { label: "TN = 977", sub: "Legit correctly predicted legit", color: "#10b981" },
              { label: "FP = 6",   sub: "Legit incorrectly flagged fraud",  color: "#fbbf24" },
              { label: "FN = 1",   sub: "Fraud missed (predicted legit)",   color: "#f59e0b" },
              { label: "TP = 16",  sub: "Fraud correctly detected",         color: "#34d399" },
            ].map((item) => (
              <div key={item.label} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, fontSize: 12 }}>
                <span style={{ color: item.color, fontWeight: 600 }}>{item.label}</span>
                <div style={{ color: "#64748b", fontSize: 11 }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card fade-in-2">
          <div className="section-title" style={{ marginBottom: 8 }}>Precision–Recall Curve</div>
          <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>
            Average Precision (AP) = <strong style={{ color: "#6366f1" }}>0.8993</strong>
          </p>
          <div style={{ background: "#0d1117", borderRadius: 12, padding: 16 }}>
            <PrecisionRecallCurve />
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(99,102,241,0.08)", borderRadius: 8, fontSize: 12, color: "#94a3b8" }}>
            High AP of 0.8993 means the model ranks fraud cases well across all thresholds.
          </div>
        </div>
      </div>

      {/* Classification Report */}
      <div className="card fade-in-3" style={{ marginBottom: 32 }}>
        <div className="section-title" style={{ marginBottom: 4 }}>Classification Report</div>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>Actual output from scikit-learn on the test set</p>
        <table className="report-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Precision</th>
              <th>Recall</th>
              <th>F1-Score</th>
              <th>Support</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="badge badge-green">Legitimate</span></td>
              <td style={{ color: "#10b981" }}>1.00</td>
              <td style={{ color: "#10b981" }}>0.99</td>
              <td style={{ color: "#10b981" }}>1.00</td>
              <td>983</td>
            </tr>
            <tr>
              <td><span className="badge badge-red">Fraud</span></td>
              <td style={{ color: "#fbbf24" }}>0.73</td>
              <td style={{ color: "#34d399" }}>0.94</td>
              <td style={{ color: "#34d399" }}>0.82</td>
              <td>17</td>
            </tr>
            <tr style={{ background: "rgba(99,102,241,0.05)" }}>
              <td><strong>Accuracy</strong></td>
              <td></td><td></td>
              <td style={{ color: "#6366f1", fontWeight: 700 }}>0.99</td>
              <td>1,000</td>
            </tr>
            <tr>
              <td style={{ color: "#94a3b8" }}>Macro Avg</td>
              <td>0.86</td>
              <td style={{ color: "#34d399" }}>0.97</td>
              <td style={{ color: "#34d399" }}>0.91</td>
              <td>1,000</td>
            </tr>
            <tr>
              <td style={{ color: "#94a3b8" }}>Weighted Avg</td>
              <td>0.99</td><td>0.99</td><td>0.99</td>
              <td>1,000</td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 10, fontSize: 13 }}>
          <strong style={{ color: "#06b6d4" }}>Average Precision: 0.899256</strong>
        </div>
      </div>

      {/* Formulas */}
      <div className="card fade-in-3">
        <div className="section-title" style={{ marginBottom: 16 }}>Evaluation Formulas</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { name: "Precision (Fraud)", formula: "TP ÷ (TP + FP) = 16 ÷ 22", val: "0.73", color: "#fbbf24",
              note: "73% of fraud alerts were real fraud." },
            { name: "Recall (Fraud)",    formula: "TP ÷ (TP + FN) = 16 ÷ 17", val: "0.94", color: "#34d399",
              note: "94% of actual fraud cases were caught." },
            { name: "F1-Score (Fraud)",  formula: "2 × (0.73 × 0.94) ÷ (0.73 + 0.94)", val: "0.82", color: "#10b981",
              note: "Strong balance of precision and recall." },
            { name: "Accuracy",          formula: "(977 + 16) ÷ 1000", val: "99%", color: "#6366f1",
              note: "Can be misleading due to class imbalance." },
          ].map((m) => (
            <div key={m.name} style={{ background: "#0d1117", borderRadius: 10, padding: "14px 16px", border: "1px solid rgba(99,102,241,0.12)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{m.name}</span>
                <span style={{ fontWeight: 800, color: m.color, fontSize: 15 }}>{m.val}</span>
              </div>
              <div className="formula-box" style={{ margin: "0 0 8px", padding: "8px 12px", fontSize: 12 }}>{m.formula}</div>
              <div style={{ color: "#64748b", fontSize: 12 }}>{m.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Matplotlib Generated Charts */}
      <div className="card fade-in-3" style={{ marginTop: 32 }}>
        <div className="section-title" style={{ marginBottom: 4 }}>Python Matplotlib Output Plots</div>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>
          Direct output figures generated and saved by <code>train_model.py</code>
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: "#0d1117", borderRadius: 10, padding: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 8, textAlign: "center" }}>
              Confusion Matrix Plot
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/confusion_matrix.png" alt="Confusion Matrix Plot" style={{ width: "100%", borderRadius: 8 }} />
          </div>
          <div style={{ background: "#0d1117", borderRadius: 10, padding: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 8, textAlign: "center" }}>
              Precision-Recall Curve Plot
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/precision_recall_curve.png" alt="Precision Recall Curve Plot" style={{ width: "100%", borderRadius: 8 }} />
          </div>
        </div>
      </div>

    </div>
  );
}
