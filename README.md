# Credit Card Fraud Detection Using Support Vector Machine (SVM)

**Department of Computer Science and Engineering (AI & ML)**  
**Academic Year:** 2026 | **Batch:** 13  
**Roll Numbers:** `24P61A66G7`, `24P61A66G8`, `24P61A66G9`  

---

## 🌐 Live Web Application Demo
* **Deployed URL:** [https://creditcard-fraud.vercel.app](https://creditcard-fraud.vercel.app)
* **Results Dashboard:** [https://creditcard-fraud.vercel.app/results](https://creditcard-fraud.vercel.app/results)
* **Interactive Live Detector:** [https://creditcard-fraud.vercel.app/predict](https://creditcard-fraud.vercel.app/predict)

---

## 1. Project Title & Problem Statement
* **Project Title:** Credit Card Fraud Detection Using Support Vector Machine (SVM)
* **Problem Statement:** Identify potentially fraudulent credit card transactions based on transaction-related numerical features, combating financial losses and preserving customer trust.

---

## 2. Objectives
1. Implement a Support Vector Machine (SVM) classification model in Python to accurately detect credit card fraud.
2. Address extreme class imbalance (0.172% fraud) using balanced class weights ($w_j = \frac{N}{2 \times N_j}$).
3. Evaluate model performance using domain-appropriate metrics: Confusion Matrix, Precision, Recall, F1-Score, and Precision-Recall Curve.
4. Provide an interactive live test bench to evaluate new, unseen transactions in real-time.

---

## 3. Dataset Description
* **Source:** Credit Card Fraud Detection Dataset (Kaggle / MLG-ULB).
* **Total Transactions:** 284,807 transactions.
* **Columns (31 total):**
  * `Time`: Seconds elapsed since the first transaction in the dataset.
  * `V1` – `V28`: 28 numerical features obtained via Principal Component Analysis (PCA) to protect cardholder privacy.
  * `Amount`: Transaction amount in USD.
  * `Class`: Target ground truth (0 = Legitimate: 284,315 [99.828%], 1 = Fraud: 492 [0.172%]).

---

## 4. Algorithm: Support Vector Machine (SVM)
Support Vector Machine constructs an optimal separating hyperplane in high-dimensional feature space that maximizes the geometric margin between normal and fraudulent transactions:

$$\min_{w, b} \frac{1}{2} ||w||^2 + C \sum_{i=1}^{n} \xi_i$$

* **Kernel Options:**
  * **Linear Kernel:** $K(x, x') = x \cdot x'$ (Scales in $O(n)$ time across all 284,807 rows).
  * **Radial Basis Function (RBF) Kernel:** $K(x, x') = \exp(-\gamma ||x - x'||^2)$ (Captures complex non-linear boundaries).
* **Class Weighting:** `class_weight='balanced'` gives the rare fraud cases 580× higher penalty when misclassified.

---

## 5. Methodology & Workflow
```
[ Kaggle Dataset: creditcard.csv (284,807 rows) ]
                       │
                       ▼
      [ Feature Scaling (StandardScaler) ]
                       │
                       ▼
    [ Stratified Train/Test Split (80% / 20%) ]
      ├── Train: 227,845 rows (394 frauds)
      └── Test:   56,962 rows (98 frauds)
                       │
                       ▼
  [ Model Training: SVM (Balanced Class Weights) ]
                       │
                       ▼
  [ Performance Evaluation & Decision Function ]
  ├── Confusion Matrix & Classification Report
  ├── Precision-Recall Curve (AP = 0.7343)
  └── Live Transaction Detector & Web App
```

---

## 6. Performance Evaluation & Results

### Full Dataset Evaluation (100% Data — 56,962 Test Transactions)

| Metric | Full Dataset Result (284,807 Rows) |
|---|---|
| **Training Split** | 227,845 rows (80%) |
| **Testing Split** | 56,962 rows (20%) |
| **True Negatives (TN)** | **55,696** (97.9% normal transactions passed) |
| **False Positives (FP)** | **1,168** (flagged for review) |
| **False Negatives (FN)** | **8** (missed fraud) |
| **True Positives (TP)** | **90 / 98** (**91.84% Fraud Recall**) |
| **Average Precision (AP)** | **0.7343** |
| **Overall Accuracy** | **97.94%** |

---

## 7. Project File Structure

```
creditcard-fraud/
├── Credit_Card_Fraud_Detection_SVM.ipynb  # Jupyter Notebook for lab submission
├── train_full_dataset.py                 # Full 284,807-row SVM training script
├── train_model.py                        # Standard RBF SVM training script
├── test_new_data.py                      # Interactive test bench for new transactions
├── confusion_matrix_full.png             # Full dataset confusion matrix plot
├── precision_recall_full.png             # Full dataset precision-recall curve
├── svm_model_full.joblib                 # Serialized model pipeline
├── app/                                  # Next.js web application frontend
│   ├── page.tsx                          # Project Home & Team credentials
│   ├── dataset/page.tsx                  # Dataset inspection & PCA descriptions
│   ├── algorithm/page.tsx                # SVM theory & mathematical formulas
│   ├── results/page.tsx                  # Dual scale results (284k vs 20k)
│   ├── predict/page.tsx                  # Interactive live transaction detector
│   └── code/page.tsx                     # Syntax-highlighted code viewer
└── public/                               # Static plots and web assets
```

---

## 8. How to Run Locally

### 1. Run Python Training & Testing
```powershell
# Full 284k dataset evaluation:
python train_full_dataset.py

# Live test new transactions:
python test_new_data.py
```

### 2. Run the Web Application
```powershell
npm run dev
# Open http://localhost:3000 in your browser
```

---

## 9. Conclusion
The SVM model successfully navigates the severe 0.172% class imbalance using balanced sample weights. By optimizing for Recall and Precision-Recall AUC rather than raw accuracy, the model stopped **91.8% of actual fraud attacks** while preserving legitimate transaction flow.
