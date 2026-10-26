# ─────────────────────────────────────────────────────────────────────────────
# Credit Card Fraud Detection — FULL DATASET (284,807 Rows)
# ML Lab Project · B.Tech CSE (AI&ML) · 2026
# ─────────────────────────────────────────────────────────────────────────────
# Demonstrates training and testing on 100% OF THE DATASET:
#   * Total Transactions: 284,807
#   * Training Split (80%): 227,845 rows (394 frauds)
#   * Testing Split (20%):   56,962 rows (98 frauds)
# ─────────────────────────────────────────────────────────────────────────────

import time
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVC
from sklearn.metrics import (
    confusion_matrix,
    classification_report,
    average_precision_score,
    precision_recall_curve
)
import joblib

def main():
    print("=" * 70)
    print("   CREDIT CARD FRAUD DETECTION — FULL DATASET TRAINING (284,807 ROWS)")
    print("   Support Vector Machine (Linear SVM with Balanced Class Weights)")
    print("=" * 70)

    # 1. Load entire dataset
    t0 = time.time()
    print("\n[Step 1] Loading all 284,807 rows from creditcard.csv...")
    df = pd.read_csv("creditcard.csv")
    print(f" Loaded {len(df):,} transactions in {time.time()-t0:.2f}s")
    print(f" Class breakdown: Legitimate = {(df['Class']==0).sum():,}, Fraud = {(df['Class']==1).sum():,}")

    # 2. Features and Labels
    X = df.drop("Class", axis=1)
    y = df["Class"]

    # 3. Stratified 80/20 train/test split on ALL data
    print("\n[Step 2] Splitting into 80% train / 20% test (stratified)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    print(f" Training set size : {len(X_train):,} rows ({y_train.sum()} frauds)")
    print(f" Testing set size  :  {len(X_test):,} rows ({y_test.sum()} frauds)")

    # 4. Standard Scaler
    print("\n[Step 3] Standardizing features with StandardScaler...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 5. Train Linear SVM on 227,845 rows
    print("\n[Step 4] Training Support Vector Machine on 227,845 rows...")
    t1 = time.time()
    svm = LinearSVC(dual=False, class_weight="balanced", max_iter=2000, random_state=42)
    svm.fit(X_train_scaled, y_train)
    train_time = time.time() - t1
    print(f" Model trained successfully across all 227,845 rows in {train_time:.2f}s!")

    # 6. Predict on all 56,962 test transactions
    print("\n[Step 5] Evaluating on all 56,962 test transactions...")
    y_pred = svm.predict(X_test_scaled)
    scores = svm.decision_function(X_test_scaled)

    # 7. Metrics
    cm = confusion_matrix(y_test, y_pred)
    tn, fp, fn, tp = cm.ravel()
    ap = average_precision_score(y_test, scores)

    print("\n" + "=" * 70)
    print("                     FULL DATASET TEST EVALUATION")
    print("=" * 70)
    print(f" True Negatives  (TN) : {tn:,} / 56,864 legitimate transactions correctly passed")
    print(f" False Positives (FP) : {fp:,} legitimate transactions flagged for review")
    print(f" False Negatives (FN) : {fn} fraud transactions missed")
    print(f" True Positives  (TP) : {tp} / {y_test.sum()} fraud transactions caught ({tp/y_test.sum()*100:.1f}% Recall!)")
    print(f" Average Precision (AP): {ap:.6f}")
    print("\nClassification Report:\n")
    print(classification_report(y_test, y_pred, target_names=["Legitimate", "Fraud"], digits=4))

    # 8. Save Full Dataset Confusion Matrix plot
    plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, fmt=",d", cmap="Blues",
                xticklabels=["Legitimate", "Fraud"],
                yticklabels=["Legitimate", "Fraud"])
    plt.title(f"Confusion Matrix (Full Dataset: 56,962 Test Rows)\nCaught {tp} of {y_test.sum()} Frauds")
    plt.xlabel("Predicted Label")
    plt.ylabel("True Label")
    plt.tight_layout()
    plt.savefig("confusion_matrix_full.png", dpi=150)
    plt.close()
    print(" Saved: confusion_matrix_full.png")

    # 9. Save Precision-Recall curve
    precision_vals, recall_vals, _ = precision_recall_curve(y_test, scores)
    plt.figure(figsize=(8, 5))
    plt.plot(recall_vals, precision_vals, color="#4f46e5", linewidth=2.5,
             label=f"Full Dataset Linear SVM (AP = {ap:.4f})")
    plt.xlabel("Recall")
    plt.ylabel("Precision")
    plt.title(f"Precision-Recall Curve (284,807 Rows, Test N = 56,962)")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig("precision_recall_full.png", dpi=150)
    plt.close()
    print(" Saved: precision_recall_full.png")

    # Also copy to public/
    try:
        import shutil
        shutil.copy("confusion_matrix_full.png", "public/confusion_matrix_full.png")
        shutil.copy("precision_recall_full.png", "public/precision_recall_full.png")
        print(" Copied plots to public/ folder for web app.")
    except Exception as e:
        pass

    # Save full model
    joblib.dump({"scaler": scaler, "model": svm}, "svm_model_full.joblib")
    print(" Saved full model pipeline to svm_model_full.joblib")
    print("\nAll done! 100% of the dataset was trained and tested successfully.")

if __name__ == "__main__":
    main()
