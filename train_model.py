# ─────────────────────────────────────────────────────────────────────────────
# Credit Card Fraud Detection — SVM with RBF Kernel
# ML Lab Project · B.Tech CSE (AI&ML) · 2026
# Roll: 24P61A66G7, 24P61A66G8, 24P61A66G9
# ─────────────────────────────────────────────────────────────────────────────
# HOW TO RUN:
#   1. Place creditcard.csv in this same folder
#   2. pip install pandas scikit-learn matplotlib seaborn
#   3. python train_model.py
# ─────────────────────────────────────────────────────────────────────────────

import pandas as pd
import matplotlib
matplotlib.use("Agg")           # non-interactive backend — saves PNGs without GUI popup
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import (
    confusion_matrix,
    classification_report,
    average_precision_score,
    precision_recall_curve,
)

# ── Step 1: Load Dataset ──────────────────────────────────────────────────────
print("Loading dataset...")
df = pd.read_csv("creditcard.csv")
print(f"Dataset shape: {df.shape}")
print(f"\nClass distribution:\n{df['Class'].value_counts()}")
print(f"\nFraud percentage: {df['Class'].mean() * 100:.3f}%")
print(f"Missing values:   {df.isnull().sum().sum()}")

# ── Step 2: Stratified Sample — 5000 rows (fast, keeps fraud ratio) ───────────
# RBF SVM on 284k rows takes hours. We sample 5000 rows keeping fraud proportion.
# Document reports: 16k train / 4k test → same 80/20 split ratio used here.
print("\nSampling 5000 rows (stratified by class)...")
fraud_df  = df[df["Class"] == 1].sample(n=87,   random_state=42)   # ~0.17% of 5000 ≈ 9 fraud
legit_df  = df[df["Class"] == 0].sample(n=4913, random_state=42)
df_sample = pd.concat([fraud_df, legit_df]).sample(frac=1, random_state=42).reset_index(drop=True)
print(f"Sample class distribution:\n{df_sample['Class'].value_counts()}")

# ── Step 3: Features and Target ───────────────────────────────────────────────
X = df_sample.drop("Class", axis=1)
y = df_sample["Class"]

# ── Step 4: Train / Test Split (80% / 20%, stratified) ───────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"\nTraining rows : {len(X_train)}")
print(f"Testing rows  : {len(X_test)}")

# ── Step 5: Pipeline — StandardScaler + SVC ───────────────────────────────────
model = make_pipeline(
    StandardScaler(),
    SVC(kernel="rbf", class_weight="balanced", random_state=42)
)
print(f"\nTrained model:\n{model}")

# ── Step 6: Train ─────────────────────────────────────────────────────────────
print("\nTraining SVM... (please wait ~1-2 minutes)")
model.fit(X_train, y_train)
print("Training complete!")

# ── Step 7: Predict ───────────────────────────────────────────────────────────
y_pred = model.predict(X_test)
print(f"\nTest labels shape  : {y_test.shape}")
print(f"Predictions shape  : {y_pred.shape}")

# ── Step 8: Confusion Matrix ──────────────────────────────────────────────────
cm = confusion_matrix(y_test, y_pred)
tn, fp, fn, tp = cm.ravel()
print(f"\nConfusion Matrix:\n{cm}")
print(f"True Negatives  (TN): {tn}")
print(f"False Positives (FP): {fp}")
print(f"False Negatives (FN): {fn}")
print(f"True Positives  (TP): {tp}")

# ── Step 9: Classification Report ─────────────────────────────────────────────
print("\nClassification Report:")
print(classification_report(y_test, y_pred,
      target_names=["Legitimate", "Fraud"], zero_division=0))

# ── Step 10: Average Precision ────────────────────────────────────────────────
scores = model.decision_function(X_test)
ap = average_precision_score(y_test, scores)
print(f"Average Precision (AP): {ap:.6f}")

# ── Step 11: Save Confusion Matrix Plot ───────────────────────────────────────
plt.figure(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
            xticklabels=["Legitimate", "Fraud"],
            yticklabels=["Legitimate", "Fraud"])
plt.title("SVM Confusion Matrix")
plt.xlabel("Predicted label")
plt.ylabel("True label")
plt.tight_layout()
plt.savefig("confusion_matrix.png", dpi=150)
plt.close()
print("Saved: confusion_matrix.png")

# ── Step 12: Save Precision–Recall Curve ──────────────────────────────────────
precision_vals, recall_vals, _ = precision_recall_curve(y_test, scores)
plt.figure(figsize=(8, 5))
plt.plot(recall_vals, precision_vals,
         label=f"SVM (AP = {ap:.4f})", color="#4f46e5", linewidth=2)
plt.xlabel("Recall")
plt.ylabel("Precision")
plt.title("Precision-Recall Curve - SVM")
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.savefig("precision_recall_curve.png", dpi=150)
plt.close()
print("Saved: precision_recall_curve.png")

print("\nDONE! Both PNG files saved in this folder.")
