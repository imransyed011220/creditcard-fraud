export default function AlgorithmPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>

      <div className="fade-in" style={{ marginBottom: 40 }}>
        <div className="badge badge-purple" style={{ marginBottom: 16 }}>Section 4</div>
        <h1 className="gradient-text" style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: 12 }}>
          Algorithm Description: SVM
        </h1>
        <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>
          A <strong style={{ color: "#e2e8f0" }}>Support Vector Machine (SVM)</strong> is a supervised learning algorithm
          that finds an optimal decision boundary (hyperplane) between classes by maximising the margin between support vectors.
        </p>
      </div>

      {/* 4.1 Linear Boundary */}
      <div className="card fade-in" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{
            width: 32, height: 32, background: "rgba(99,102,241,0.2)",
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, color: "#a78bfa", fontSize: 14,
          }}>4.1</span>
          <div className="section-title" style={{ margin: 0 }}>Linear Decision Boundary</div>
        </div>
        <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: 12 }}>
          For a two-class problem, the SVM finds a hyperplane that separates the two classes.
          Points closest to the boundary are called <strong style={{ color: "#6366f1" }}>support vectors</strong>.
        </p>
        <div className="formula-box">w · x + b = 0</div>
        <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>
          <strong style={{ color: "#94a3b8" }}>x</strong> = input feature vector &nbsp;|&nbsp;
          <strong style={{ color: "#94a3b8" }}>w</strong> = weight vector &nbsp;|&nbsp;
          <strong style={{ color: "#94a3b8" }}>b</strong> = bias / offset
        </p>
      </div>

      {/* 4.2 Maximum Margin */}
      <div className="card fade-in-2" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{
            width: 32, height: 32, background: "rgba(99,102,241,0.2)",
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, color: "#a78bfa", fontSize: 14,
          }}>4.2</span>
          <div className="section-title" style={{ margin: 0 }}>Maximum Margin</div>
        </div>
        <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>
          SVM seeks the decision boundary with the <strong style={{ color: "#6366f1" }}>largest possible margin</strong> between
          the classes. A larger margin generally helps the classifier generalise better to unseen data.
          Real transaction data is not linearly separable, so SVM uses a kernel to create a flexible boundary.
        </p>
        {/* Visual margin illustration */}
        <div style={{
          marginTop: 16, background: "#0d1117", borderRadius: 12, padding: "20px",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 24,
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              display: "flex", gap: 8, alignItems: "center", justifyContent: "center",
              marginBottom: 8,
            }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }}></div>
              <span style={{ color: "#10b981", fontSize: 13 }}>Legitimate</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
              {[1,1,0,0,1,0,0,1,1].map((v, i) => (
                <div key={i} style={{
                  width: 14, height: 14, borderRadius: "50%",
                  background: v ? "#10b981" : "#0d1117",
                  border: v ? "none" : "1px solid #1a2235",
                }}></div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 4, height: 80,
              background: "linear-gradient(180deg, #6366f1, #8b5cf6)",
              borderRadius: 4, margin: "0 auto",
              boxShadow: "0 0 20px rgba(99,102,241,0.5)",
            }}></div>
            <div style={{ color: "#6366f1", fontSize: 11, marginTop: 6 }}>Hyperplane</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{
              display: "flex", gap: 8, alignItems: "center", justifyContent: "center",
              marginBottom: 8,
            }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }}></div>
              <span style={{ color: "#ef4444", fontSize: 13 }}>Fraud</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
              {[0,0,1,1,0,1,1,0,0].map((v, i) => (
                <div key={i} style={{
                  width: 14, height: 14, borderRadius: "50%",
                  background: v ? "#ef4444" : "#0d1117",
                  border: v ? "none" : "1px solid #1a2235",
                }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4.3 RBF Kernel */}
      <div className="card fade-in-2" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{
            width: 32, height: 32, background: "rgba(99,102,241,0.2)",
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, color: "#a78bfa", fontSize: 14,
          }}>4.3</span>
          <div className="section-title" style={{ margin: 0 }}>RBF Kernel</div>
        </div>
        <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: 12 }}>
          This project uses the <strong style={{ color: "#6366f1" }}>Radial Basis Function (RBF) kernel</strong>.
          It measures similarity between two examples based on their distance in feature space,
          allowing the SVM to learn a <strong style={{ color: "#e2e8f0" }}>non-linear decision boundary</strong>.
        </p>
        <div className="formula-box">K(x, z) = exp(−γ ‖x − z‖²)</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 12 }}>
          {[
            { sym: "x, z", desc: "Two training examples being compared" },
            { sym: "‖x−z‖²", desc: "Squared Euclidean distance between them" },
            { sym: "γ (gamma)", desc: "Controls how quickly similarity drops with distance" },
          ].map((item) => (
            <div key={item.sym} style={{
              background: "#0d1117", borderRadius: 8, padding: "12px 14px",
              border: "1px solid rgba(99,102,241,0.15)",
            }}>
              <div className="mono" style={{ color: "#c084fc", fontSize: 13, marginBottom: 6 }}>{item.sym}</div>
              <div style={{ color: "#64748b", fontSize: 12 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4.4 & 4.5 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div className="card fade-in-3">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ width: 28, height: 28, background: "rgba(99,102,241,0.2)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#a78bfa", fontSize: 12 }}>4.4</span>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Class Weighting</div>
          </div>
          <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7 }}>
            The classifier is configured with <code style={{ color: "#c084fc" }}>class_weight=&quot;balanced&quot;</code>.
            This gives <strong style={{ color: "#ef4444" }}>greater weight to fraud errors</strong> during training,
            helping the model not ignore the rare class.
          </p>
          <div style={{ marginTop: 12, padding: "10px", background: "#0d1117", borderRadius: 8, border: "1px solid rgba(99,102,241,0.15)" }}>
            <code style={{ color: "#86efac", fontSize: 12 }}>SVC(class_weight=&quot;balanced&quot;)</code>
          </div>
        </div>

        <div className="card fade-in-3">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ width: 28, height: 28, background: "rgba(99,102,241,0.2)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#a78bfa", fontSize: 12 }}>4.5</span>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Feature Scaling</div>
          </div>
          <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7 }}>
            SVM is sensitive to feature scale. <strong style={{ color: "#6366f1" }}>StandardScaler</strong> standardises
            each feature using training data only to prevent data leakage.
          </p>
          <div className="formula-box" style={{ fontSize: 12, marginTop: 8 }}>
            z = (x − μ_train) / σ_train
          </div>
        </div>
      </div>

      {/* Why SVM */}
      <div className="card fade-in-3">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ width: 32, height: 32, background: "rgba(99,102,241,0.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#a78bfa", fontSize: 14 }}>4.6</span>
          <div className="section-title" style={{ margin: 0 }}>Why SVM?</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ color: "#10b981", fontWeight: 600, marginBottom: 8 }}>✅ Advantages</div>
            <ul style={{ color: "#94a3b8", fontSize: 13, lineHeight: 2, listStyle: "none" }}>
              <li>• Clear margin-based geometric principle</li>
              <li>• Handles high-dimensional feature spaces</li>
              <li>• Non-linear boundaries via kernel trick</li>
              <li>• Effective with class weighting for imbalance</li>
            </ul>
          </div>
          <div>
            <div style={{ color: "#f59e0b", fontWeight: 600, marginBottom: 8 }}>⚠️ Considerations</div>
            <ul style={{ color: "#94a3b8", fontSize: 13, lineHeight: 2, listStyle: "none" }}>
              <li>• RBF SVM is computationally expensive</li>
              <li>• Training on 284k rows requires sampling</li>
              <li>• Hyperparameters (C, γ) need tuning</li>
              <li>• No probability output by default</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
