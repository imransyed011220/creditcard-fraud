# ─────────────────────────────────────────────────────────────────────────────
# Credit Card Fraud Detection — Test New Transaction Data
# ML Lab Project · B.Tech CSE (AI&ML) · 2026
# ─────────────────────────────────────────────────────────────────────────────
# Use this script during your viva/lab demo to show your examiner/mam how
# the trained SVM classifies brand new, unseen credit card transactions.
# ─────────────────────────────────────────────────────────────────────────────

import numpy as np
import pandas as pd
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
import os
import joblib

MODEL_FILE = "svm_model.joblib"

def get_trained_model():
    """Load pre-trained model or train and cache it."""
    if os.path.exists(MODEL_FILE):
        print(" Loading existing trained SVM model from disk...")
        return joblib.load(MODEL_FILE)
    
    print("Training SVM model on creditcard.csv (one-time setup, ~30s)...")
    if not os.path.exists("creditcard.csv"):
        raise FileNotFoundError("creditcard.csv not found in current folder.")
        
    df = pd.read_csv("creditcard.csv")
    fraud_df = df[df["Class"] == 1].sample(n=87, random_state=42)
    legit_df = df[df["Class"] == 0].sample(n=4913, random_state=42)
    df_sample = pd.concat([fraud_df, legit_df]).sample(frac=1, random_state=42).reset_index(drop=True)
    
    X = df_sample.drop("Class", axis=1)
    y = df_sample["Class"]
    
    model = make_pipeline(
        StandardScaler(),
        SVC(kernel="rbf", class_weight="balanced", probability=True, random_state=42)
    )
    model.fit(X, y)
    joblib.dump(model, MODEL_FILE)
    print(" Model trained and saved as svm_model.joblib!")
    return model


def test_transaction(model, name, time_sec, amount_usd, v_features=None):
    """
    Classify a single new transaction using the trained SVM.
    Features: [Time, V1...V28, Amount]
    """
    if v_features is None:
        # Default normal PCA features centered near 0
        v_features = [0.0] * 28
    
    feature_row = [time_sec] + list(v_features) + [amount_usd]
    feature_df = pd.DataFrame([feature_row], columns=[
        "Time", "V1","V2","V3","V4","V5","V6","V7","V8","V9","V10",
        "V11","V12","V13","V14","V15","V16","V17","V18","V19","V20",
        "V21","V22","V23","V24","V25","V26","V27","V28", "Amount"
    ])
    
    pred = model.predict(feature_df)[0]
    prob = model.predict_proba(feature_df)[0]
    decision_dist = model.decision_function(feature_df)[0]
    
    fraud_prob = prob[1] * 100
    
    print("=" * 65)
    print(f"TRANSACTION: {name}")
    print(f"  * Amount: ${amount_usd:.2f} | Time: {time_sec}s")
    print(f"  * SVM Decision Function Distance: {decision_dist:.4f}")
    print(f"  * Fraud Risk Probability: {fraud_prob:.2f}%")
    
    if pred == 1 or fraud_prob > 50.0:
        print("  * CLASSIFICATION: [!] FRAUD DETECTED (Alert Flagged)")
        print("    -> Action: Transaction blocked & SMS sent to cardholder.")
    else:
        print("  * CLASSIFICATION: [OK] LEGITIMATE (Normal Transaction)")
        print("    -> Action: Transaction approved.")
    print("=" * 65)
    print()


def main():
    print("\n" + "=" * 65)
    print("   CREDIT CARD FRAUD DETECTION — LIVE NEW DATA TEST BENCH")
    print("   Algorithm: Support Vector Machine (RBF Kernel)")
    print("=" * 65 + "\n")
    
    model = get_trained_model()
    
    print("\n--- RUNNING AUTOMATED BENCHMARK TESTS ON NEW TRANSACTIONS ---")
    
    # Test 1: Normal grocery transaction
    test_transaction(
        model,
        name="Test 1: Regular Grocery Store Purchase",
        time_sec=42000,
        amount_usd=34.50,
        v_features=[0.1, -0.2, 0.05, 0.1, -0.1, 0.2, 0.0, 0.1, -0.05, 0.1,
                    0.0, -0.1, 0.05, 0.0, 0.1, -0.05, 0.1, 0.0, 0.05, -0.02,
                    0.01, 0.02, -0.01, 0.03, -0.02, 0.01, -0.01, 0.0]
    )
    
    # Test 2: Known Fraud pattern (anomalous negative V14, V12, V10 and high V4)
    fraud_v = [ -1.8, 2.1, -2.4, 3.8, -1.5, -0.8, -2.3, 0.9, -2.1, -4.2,
                 3.1, -4.5, 0.2, -6.1, -0.3, -2.2, -3.1, 0.4, 0.6, 0.5,
                 0.6, 0.2, -0.3, 0.1, 0.2, 0.1, 0.4, 0.2 ]
    test_transaction(
        model,
        name="Test 2: Midnight High-Risk Overseas Withdrawal",
        time_sec=84120,
        amount_usd=1950.00,
        v_features=fraud_v
    )

    # Test 3: Micro Card-Testing Fraud Attack ($1.00 amount with anomalous V14)
    micro_fraud_v = [ -0.9, 1.2, -1.5, 2.7, -0.8, -0.4, -1.6, 0.5, -1.2, -3.1,
                       2.0, -3.4, 0.1, -4.8, -0.1, -1.5, -2.1, 0.3, 0.4, 0.3,
                       0.4, 0.1, -0.2, 0.1, 0.1, 0.1, 0.3, 0.1 ]
    test_transaction(
        model,
        name="Test 3: Card Testing Micro-Fraud ($1.00)",
        time_sec=1200,
        amount_usd=1.00,
        v_features=micro_fraud_v
    )
    
    print("\nAll automated tests completed successfully.")
    print("You can call test_transaction(model, ...) with any custom transaction data!\n")

if __name__ == "__main__":
    main()
