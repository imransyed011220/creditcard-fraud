"use client";

import { useState } from "react";

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState<"full" | "lab_manual">("full");

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>

      {/* Header */}
      <div className="fade-in" style={{ marginBottom: 32 }}>
        <div className="badge badge-purple" style={{ marginBottom: 14 }}>Section 8 & 9 · Comprehensive Evaluation</div>
        <h1 className="gradient-text" style={{ fontSize: "2.3rem", fontWeight: 800, marginBottom: 12 }}>
          Results & Performance Evaluation
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.6 }}>
          Explore the model performance across the <strong style={{ color: "#e2e8f0" }}>Full 284,807 Dataset</strong> as well
          as the <strong style={{ color: "#e2e8f0" }}>20,000 Lab Report Benchmark (Section 8.3)</strong>.
        </p>
      </div>

      {/* Dataset Scale Switcher */}
      <div className="card fade-in-2" style={{ padding: "12px 16px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>
          Select Evaluation Scale:
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setActiveTab("full")}
            style={{
              padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer",
              transition: "all 0.2s ease",
              background: activeTab === "full" ? "#6366f1" : "rgba(255,255,255,0.05)",
              color: activeTab === "full" ? "#ffffff" : "#94a3b8",
              border: activeTab === "full" ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            🔥 Full Dataset (284,807 Rows — 100%)
          </button>
          <button
            onClick={() => setActiveTab("lab_manual")}
            style={{
              padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer",
              transition: "all 0.2s ease",
              background: activeTab === "lab_manual" ? "#8b5cf6" : "rgba(255,255,255,0.05)",
              color: activeTab === "lab_manual" ? "#ffffff" : "#94a3b8",
              border: activeTab === "lab_manual" ? "1px solid #8b5cf6" : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            📑 Lab Manual Benchmark (20,000 Rows)
          </button>
        </div>
      </div>

      {/* TAB 1: FULL DATASET (284,807 ROWS) */}
      {activeTab === "full" && (
        <div className="fade-in">
          
          {/* Banner */}
          <div style={{ padding: "14px 20px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 12, marginBottom: 28 }}>
            <span style={{ fontWeight: 800, color: "#a78bfa", fontSize: 14 }}>100% DATASET COVERAGE:</span>
            <span style={{ color: "#cbd5e1", fontSize: 13, marginLeft: 8 }}>
              Trained on <strong>227,845 transactions</strong> and evaluated against <strong>56,962 test transactions</strong>. 
              Successfully detected <strong>90 out of 98 fraud attacks (91.8% Recall)</strong>.
            </span>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 14, marginBottom: 32 }}>
            {[
              { label: "Total Rows",       value: "284,807", color: "#6366f1" },
              { label: "Training Split",   value: "227,845", color: "#8b5cf6" },
              { label: "Testing Split",    value: "56,962",  color: "#3b82f6" },
              { label: "True Negatives",   value: "55,696",  color: "#10b981" },
              { label: "False Positives",  value: "1,168",   color: "#f59e0b" },
              { label: "False Negatives",  value: "8",       color: "#ef4444" },
              { label: "True Positives",   value: "90",      color: "#34d399" },
              { label: "Fraud Recall",     value: "91.8%",   color: "#06b6d4" },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Confusion Matrix + Explanation */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>

            <div className="card">
              <div className="section-title" style={{ marginBottom: 8 }}>Full Dataset Confusion Matrix</div>
              <p style={{ color: "#64748b", fontSize: 13, marginBottom: 18 }}>
                56,962 held-out transactions tested with balanced SVM
              </p>
              
              <div className="cm-grid" style={{ marginBottom: 18 }}>
                <div className="cm-cell cm-tn" style={{ minHeight: 75 }}>
                  <div style={{ fontSize: "1.3rem" }}>55,696</div>
                  <div style={{ fontSize: 10, color: "#93c5fd", marginTop: 4 }}>TN (Legit Passed)</div>
                </div>
                <div className="cm-cell cm-fp" style={{ minHeight: 75 }}>
                  <div style={{ fontSize: "1.3rem" }}>1,168</div>
                  <div style={{ fontSize: 10, color: "#fbbf24", marginTop: 4 }}>FP (Review Alert)</div>
                </div>
                <div className="cm-cell cm-fn" style={{ minHeight: 75 }}>
                  <div style={{ fontSize: "1.3rem" }}>8</div>
                  <div style={{ fontSize: 10, color: "#ef4444", marginTop: 4 }}>FN (Missed Fraud)</div>
                </div>
                <div className="cm-cell cm-tp" style={{ minHeight: 75 }}>
                  <div style={{ fontSize: "1.3rem" }}>90</div>
                  <div style={{ fontSize: 10, color: "#86efac", marginTop: 4 }}>TP (Fraud Caught)</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12 }}>
                <div style={{ padding: "8px 12px", background: "rgba(16,185,129,0.1)", borderRadius: 8, color: "#10b981" }}>
                  <strong>TN = 55,696</strong>: 97.9% of normal cards unaffected
                </div>
                <div style={{ padding: "8px 12px", background: "rgba(52,211,153,0.1)", borderRadius: 8, color: "#34d399" }}>
                  <strong>TP = 90</strong>: 91.8% of actual fraud stopped!
                </div>
              </div>
            </div>

            {/* Classification Report Table */}
            <div className="card">
              <div className="section-title" style={{ marginBottom: 8 }}>Classification Report (Full Test Set)</div>
              <p style={{ color: "#64748b", fontSize: 13, marginBottom: 18 }}>
                Detailed metrics on all 56,962 test transactions
              </p>
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
                    <td><span className="badge badge-green">Legitimate (0)</span></td>
                    <td style={{ color: "#10b981" }}>0.9999</td>
                    <td style={{ color: "#10b981" }}>0.9795</td>
                    <td style={{ color: "#10b981" }}>0.9896</td>
                    <td>56,864</td>
                  </tr>
                  <tr>
                    <td><span className="badge badge-red">Fraud (1)</span></td>
                    <td style={{ color: "#fbbf24" }}>0.0715</td>
                    <td style={{ color: "#34d399", fontWeight: 800 }}>0.9184</td>
                    <td style={{ color: "#a78bfa" }}>0.1327</td>
                    <td>98</td>
                  </tr>
                  <tr style={{ background: "rgba(99,102,241,0.06)" }}>
                    <td><strong>Overall Accuracy</strong></td>
                    <td colSpan={2}></td>
                    <td style={{ color: "#6366f1", fontWeight: 800 }}>97.94%</td>
                    <td>56,962</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(6,182,212,0.08)", borderRadius: 8, fontSize: 12 }}>
                <strong style={{ color: "#06b6d4" }}>Average Precision (AP): 0.734335</strong> across all 56,962 test points.
              </div>
            </div>

          </div>

          {/* Matplotlib Output Plots */}
          <div className="card" style={{ marginBottom: 32 }}>
            <div className="section-title" style={{ marginBottom: 4 }}>Full Dataset High-Res Python Plots</div>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>
              Generated directly by <code>train_full_dataset.py</code> running across all 284,807 transactions:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "#0d1117", borderRadius: 10, padding: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 8, textAlign: "center" }}>
                  Confusion Matrix (N = 56,962)
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/confusion_matrix_full.png" alt="Full Dataset Confusion Matrix" style={{ width: "100%", borderRadius: 8 }} />
              </div>
              <div style={{ background: "#0d1117", borderRadius: 10, padding: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 8, textAlign: "center" }}>
                  Precision-Recall Curve (AP = 0.7343)
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/precision_recall_full.png" alt="Full Dataset PR Curve" style={{ width: "100%", borderRadius: 8 }} />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: LAB MANUAL BENCHMARK (20,000 ROWS — SECTION 8.3) */}
      {activeTab === "lab_manual" && (
        <div className="fade-in">
          
          {/* Banner */}
          <div style={{ padding: "14px 20px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 12, marginBottom: 28 }}>
            <span style={{ fontWeight: 800, color: "#c084fc", fontSize: 14 }}>LAB MANUAL BENCHMARK (PAGE 13):</span>
            <span style={{ color: "#cbd5e1", fontSize: 13, marginLeft: 8 }}>
              Trained on <strong>16,000 rows</strong> and tested on <strong>4,000 rows</strong> with the RBF kernel.
              Matches the exact numbers presented in Section 8.3 of your lab syllabus.
            </span>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 14, marginBottom: 32 }}>
            {[
              { label: "Training Rows",    value: "16,000", color: "#8b5cf6" },
              { label: "Testing Rows",     value: "4,000",  color: "#6366f1" },
              { label: "True Negatives",   value: "3,993",  color: "#10b981" },
              { label: "False Positives",  value: "0",      color: "#10b981" },
              { label: "False Negatives",  value: "6",      color: "#f59e0b" },
              { label: "True Positives",   value: "1",      color: "#34d399" },
              { label: "Fraud Precision",  value: "1.00",   color: "#34d399" },
              { label: "Avg Precision",    value: "0.6255", color: "#06b6d4" },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Confusion Matrix + Report */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
            
            <div className="card">
              <div className="section-title" style={{ marginBottom: 8 }}>Section 8.3 Confusion Matrix</div>
              <p style={{ color: "#64748b", fontSize: 13, marginBottom: 18 }}>
                Predicted vs. Actual on 4,000 held-out test rows
              </p>
              <div className="cm-grid" style={{ marginBottom: 18 }}>
                <div className="cm-cell cm-tn" style={{ minHeight: 75 }}>
                  <div style={{ fontSize: "1.3rem" }}>3,993</div>
                  <div style={{ fontSize: 10, color: "#93c5fd", marginTop: 4 }}>TN (0 False Positives!)</div>
                </div>
                <div className="cm-cell cm-fp" style={{ minHeight: 75 }}>
                  <div style={{ fontSize: "1.3rem" }}>0</div>
                  <div style={{ fontSize: 10, color: "#fbbf24", marginTop: 4 }}>FP</div>
                </div>
                <div className="cm-cell cm-fn" style={{ minHeight: 75 }}>
                  <div style={{ fontSize: "1.3rem" }}>6</div>
                  <div style={{ fontSize: 10, color: "#ef4444", marginTop: 4 }}>FN</div>
                </div>
                <div className="cm-cell cm-tp" style={{ minHeight: 75 }}>
                  <div style={{ fontSize: "1.3rem" }}>1</div>
                  <div style={{ fontSize: 10, color: "#86efac", marginTop: 4 }}>TP</div>
                </div>
              </div>
              <div style={{ padding: "10px 14px", background: "rgba(16,185,129,0.1)", borderRadius: 8, fontSize: 12, color: "#10b981" }}>
                <strong>Perfect Precision (1.00):</strong> Every transaction flagged as fraud was indeed fraudulent (0 false alarms).
              </div>
            </div>

            <div className="card">
              <div className="section-title" style={{ marginBottom: 8 }}>Section 8.3 Classification Report</div>
              <p style={{ color: "#64748b", fontSize: 13, marginBottom: 18 }}>
                Values documented in the lab report syllabus (Page 15)
              </p>
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
                    <td style={{ color: "#10b981" }}>1.00</td>
                    <td style={{ color: "#10b981" }}>1.00</td>
                    <td>3,993</td>
                  </tr>
                  <tr>
                    <td><span className="badge badge-red">Fraud</span></td>
                    <td style={{ color: "#34d399", fontWeight: 800 }}>1.00</td>
                    <td style={{ color: "#fbbf24" }}>0.14</td>
                    <td style={{ color: "#fbbf24" }}>0.25</td>
                    <td>7</td>
                  </tr>
                  <tr style={{ background: "rgba(99,102,241,0.06)" }}>
                    <td><strong>Overall Accuracy</strong></td>
                    <td colSpan={2}></td>
                    <td style={{ color: "#6366f1", fontWeight: 800 }}>1.00 (100%)</td>
                    <td>4,000</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(139,92,246,0.1)", borderRadius: 8, fontSize: 12 }}>
                <strong style={{ color: "#c084fc" }}>Average Precision (AP): 0.6255</strong>
              </div>
            </div>

          </div>

          {/* Matplotlib Output Plots */}
          <div className="card" style={{ marginBottom: 32 }}>
            <div className="section-title" style={{ marginBottom: 4 }}>Standard RBF Model Visualizations</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 16 }}>
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
      )}

      {/* Comparison Analysis Card for Viva */}
      <div className="card fade-in-3">
        <div className="section-title" style={{ marginBottom: 16 }}>
          💡 Viva Insight: Why Compare Full Dataset vs. Sample?
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          <div style={{ background: "#0d1117", borderRadius: 10, padding: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontWeight: 700, color: "#6366f1", marginBottom: 6, fontSize: 14 }}>
              1. Computational Trade-off
            </div>
            <p style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.6 }}>
              Non-linear RBF SVM has $O(n^2)$ complexity. Running it on 284,807 rows requires significant memory and hours.
              Using <strong>Linear SVM</strong> scales in $O(n)$ time, allowing us to train all 227,845 training rows in just 2.68 seconds!
            </p>
          </div>
          <div style={{ background: "#0d1117", borderRadius: 10, padding: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontWeight: 700, color: "#10b981", marginBottom: 6, fontSize: 14 }}>
              2. Fraud Recall (91.8%)
            </div>
            <p style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.6 }}>
              When trained on the full dataset with <code>class_weight=&apos;balanced&apos;</code>, the model caught <strong>90 out of 98 frauds</strong> on the test set,
              minimizing financial risk from false negatives.
            </p>
          </div>
          <div style={{ background: "#0d1117", borderRadius: 10, padding: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontWeight: 700, color: "#8b5cf6", marginBottom: 6, fontSize: 14 }}>
              3. Lab Manual Compliance
            </div>
            <p style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.6 }}>
              Section 8.3 explicitly documents a 20,000-row benchmark (16k train / 4k test). We provide both evaluations so you can demonstrate comprehensive mastery to your evaluator.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
