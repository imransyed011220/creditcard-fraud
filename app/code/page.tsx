export default function CodePage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>

      <div className="fade-in" style={{ marginBottom: 40 }}>
        <div className="badge badge-purple" style={{ marginBottom: 16 }}>Section 7</div>
        <h1 className="gradient-text" style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: 12 }}>
          Python Implementation
        </h1>
        <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>
          Complete implementation using <strong style={{ color: "#e2e8f0" }}>scikit-learn</strong>.
          Copy this into a Jupyter Notebook or .py file and place your <code style={{ color: "#c084fc" }}>creditcard.csv</code> in the same directory.
        </p>
      </div>

      {/* Model Config Table */}
      <div className="card fade-in-2" style={{ marginBottom: 32 }}>
        <div className="section-title" style={{ marginBottom: 16 }}>Model Configuration</div>
        <table className="report-table">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Setting</th>
              <th style={{ textAlign: "left" }}>Value Used</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Classifier",        "Support Vector Classifier (SVC)"],
              ["Kernel",            "RBF (Radial Basis Function)"],
              ["Class Weighting",   "balanced"],
              ["Feature Scaling",   "StandardScaler inside a Pipeline"],
              ["Test Fraction",     "0.20 (20%)"],
              ["Random Seed",       "42"],
              ["Training Data Size","16,000 rows (sampled subset)"],
              ["Testing Data Size", "4,000 rows"],
              ["Sampling",          "Random 20,000-row stratified sample from full dataset"],
            ].map(([k, v]) => (
              <tr key={k}>
                <td style={{ fontWeight: 600 }}>{k}</td>
                <td style={{ textAlign: "left" }}>
                  <code style={{ color: "#86efac", background: "rgba(134,239,172,0.08)", padding: "2px 8px", borderRadius: 4 }}>
                    {v}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full Code */}
      <div className="card fade-in-3">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div className="section-title" style={{ margin: 0 }}>Complete Python Code</div>
          <span className="badge badge-purple">creditcard_svm.py</span>
        </div>

        <div className="code-block">
          <div><span className="comment"># ─────────────────────────────────────────────────────────────────────</span></div>
          <div><span className="comment"># Credit Card Fraud Detection — SVM with RBF Kernel</span></div>
          <div><span className="comment"># ML Lab Project · B.Tech CSE (AI&ML) · 2026</span></div>
          <div><span className="comment"># ─────────────────────────────────────────────────────────────────────</span></div>
          <br />
          <div>
            <span className="keyword">import</span> pandas <span className="keyword">as</span> pd
          </div>
          <div>
            <span className="keyword">from</span> sklearn.model_selection <span className="keyword">import</span> train_test_split
          </div>
          <div>
            <span className="keyword">from</span> sklearn.pipeline <span className="keyword">import</span> make_pipeline
          </div>
          <div>
            <span className="keyword">from</span> sklearn.preprocessing <span className="keyword">import</span> StandardScaler
          </div>
          <div>
            <span className="keyword">from</span> sklearn.svm <span className="keyword">import</span> SVC
          </div>
          <div>
            <span className="keyword">from</span> sklearn.metrics <span className="keyword">import</span> (
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;confusion_matrix, classification_report,</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;average_precision_score, precision_recall_curve</div>
          <div>)</div>
          <div>
            <span className="keyword">import</span> matplotlib.pyplot <span className="keyword">as</span> plt
          </div>
          <br />
          <div><span className="comment"># ── Step 1: Load Dataset ──────────────────────────────────────────────</span></div>
          <div>
            df = pd.<span className="fn-name">read_csv</span>(<span className="string">&quot;creditcard.csv&quot;</span>)
          </div>
          <div>
            <span className="fn-name">print</span>(<span className="string">&quot;Dataset shape:&quot;</span>, df.shape)
          </div>
          <div>
            <span className="fn-name">print</span>(<span className="string">&quot;Class distribution:&quot;</span>)
          </div>
          <div>
            <span className="fn-name">print</span>(df[<span className="string">&quot;Class&quot;</span>].<span className="fn-name">value_counts</span>())
          </div>
          <br />
          <div><span className="comment"># ── Step 2: Sample (RBF SVM is slow on 284k rows) ───────────────────</span></div>
          <div>
            df_sample = df.<span className="fn-name">sample</span>(n=<span className="number">20000</span>, random_state=<span className="number">42</span>, stratify=df[<span className="string">&quot;Class&quot;</span>])
          </div>
          <br />
          <div><span className="comment"># ── Step 3: Separate Features and Target ─────────────────────────────</span></div>
          <div>
            X = df_sample.<span className="fn-name">drop</span>(<span className="string">&quot;Class&quot;</span>, axis=<span className="number">1</span>)
          </div>
          <div>
            y = df_sample[<span className="string">&quot;Class&quot;</span>]
          </div>
          <br />
          <div><span className="comment"># ── Step 4: Train / Test Split (80% / 20%) ───────────────────────────</span></div>
          <div>
            X_train, X_test, y_train, y_test = <span className="fn-name">train_test_split</span>(
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;X, y, test_size=<span className="number">0.2</span>, random_state=<span className="number">42</span>, stratify=y
          </div>
          <div>)</div>
          <div>
            <span className="fn-name">print</span>(<span className="string">f&quot;Train size: {"{"}len(X_train){"}"}, Test size: {"{"}len(X_test){"}"}&quot;</span>)
          </div>
          <br />
          <div><span className="comment"># ── Step 5: Build Pipeline (Scaler + SVM) ────────────────────────────</span></div>
          <div>
            model = <span className="fn-name">make_pipeline</span>(
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="fn-name">StandardScaler</span>(),
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="fn-name">SVC</span>(kernel=<span className="string">&quot;rbf&quot;</span>, class_weight=<span className="string">&quot;balanced&quot;</span>, random_state=<span className="number">42</span>)
          </div>
          <div>)</div>
          <br />
          <div><span className="comment"># ── Step 6: Train the Model ───────────────────────────────────────────</span></div>
          <div>
            model.<span className="fn-name">fit</span>(X_train, y_train)
          </div>
          <div>
            <span className="fn-name">print</span>(<span className="string">&quot;Training complete!&quot;</span>)
          </div>
          <br />
          <div><span className="comment"># ── Step 7: Predict on Test Set ──────────────────────────────────────</span></div>
          <div>
            y_pred = model.<span className="fn-name">predict</span>(X_test)
          </div>
          <br />
          <div><span className="comment"># ── Step 8: Evaluate ─────────────────────────────────────────────────</span></div>
          <div>
            <span className="fn-name">print</span>(<span className="string">&quot;\nConfusion Matrix:&quot;</span>)
          </div>
          <div>
            cm = <span className="fn-name">confusion_matrix</span>(y_test, y_pred)
          </div>
          <div>
            <span className="fn-name">print</span>(cm)
          </div>
          <br />
          <div>
            <span className="fn-name">print</span>(<span className="string">&quot;\nClassification Report:&quot;</span>)
          </div>
          <div>
            <span className="fn-name">print</span>(<span className="fn-name">classification_report</span>(y_test, y_pred, zero_division=<span className="number">0</span>))
          </div>
          <br />
          <div><span className="comment"># ── Step 9: Average Precision & PR Curve ─────────────────────────────</span></div>
          <div>
            scores = model.<span className="fn-name">decision_function</span>(X_test)
          </div>
          <div>
            ap = <span className="fn-name">average_precision_score</span>(y_test, scores)
          </div>
          <div>
            <span className="fn-name">print</span>(<span className="string">f&quot;\nAverage Precision: {"{"}ap:.6f{"}"}&quot;</span>)
          </div>
          <br />
          <div>
            precision, recall, _ = <span className="fn-name">precision_recall_curve</span>(y_test, scores)
          </div>
          <div>
            plt.<span className="fn-name">figure</span>(figsize=(<span className="number">8</span>, <span className="number">5</span>))
          </div>
          <div>
            plt.<span className="fn-name">plot</span>(recall, precision, label=<span className="string">f&quot;SVM (AP={"{"}ap:.4f{"}"})&quot;</span>)
          </div>
          <div>
            plt.<span className="fn-name">xlabel</span>(<span className="string">&quot;Recall&quot;</span>)
          </div>
          <div>
            plt.<span className="fn-name">ylabel</span>(<span className="string">&quot;Precision&quot;</span>)
          </div>
          <div>
            plt.<span className="fn-name">title</span>(<span className="string">&quot;Precision-Recall Curve - SVM&quot;</span>)
          </div>
          <div>
            plt.<span className="fn-name">legend</span>()
          </div>
          <div>
            plt.<span className="fn-name">grid</span>(<span className="keyword">True</span>)
          </div>
          <div>
            plt.<span className="fn-name">savefig</span>(<span className="string">&quot;precision_recall_curve.png&quot;</span>)
          </div>
          <div>
            plt.<span className="fn-name">show</span>()
          </div>
        </div>
      </div>

      {/* Expected Output */}
      <div className="card fade-in-3" style={{ marginTop: 24 }}>
        <div className="section-title" style={{ marginBottom: 16 }}>Expected Output</div>
        <div className="code-block" style={{ background: "#060d14" }}>
          <div style={{ color: "#64748b" }}>Dataset shape: (284807, 31)</div>
          <div style={{ color: "#64748b" }}>Class distribution:</div>
          <div style={{ color: "#10b981" }}>0    284315</div>
          <div style={{ color: "#ef4444" }}>1       492</div>
          <div style={{ color: "#64748b" }}>Train size: 16000, Test size: 4000</div>
          <div style={{ color: "#86efac" }}>Training complete!</div>
          <br />
          <div style={{ color: "#e2e8f0" }}>Confusion Matrix:</div>
          <div style={{ color: "#93c5fd" }}>[[ 3993    0]</div>
          <div style={{ color: "#93c5fd" }}> [    6    1]]</div>
          <br />
          <div style={{ color: "#e2e8f0" }}>Classification Report:</div>
          <div style={{ color: "#64748b" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;precision&nbsp;&nbsp;recall&nbsp;f1-score&nbsp;&nbsp;support</div>
          <div style={{ color: "#10b981" }}>&nbsp;&nbsp;Legitimate&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.00&nbsp;&nbsp;&nbsp;&nbsp;1.00&nbsp;&nbsp;&nbsp;&nbsp;1.00&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3993</div>
          <div style={{ color: "#ef4444" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fraud&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.00&nbsp;&nbsp;&nbsp;&nbsp;0.14&nbsp;&nbsp;&nbsp;&nbsp;0.25&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7</div>
          <div style={{ color: "#6366f1" }}>&nbsp;&nbsp;&nbsp;accuracy&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.00&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4000</div>
          <br />
          <div style={{ color: "#06b6d4" }}>Average Precision: 0.625491</div>
        </div>
      </div>

    </div>
  );
}
