# ml/utils/anomaly.py
from sklearn.ensemble import IsolationForest
import numpy as np

def detect_anomalies(embeddings):
    """Detect outliers using Isolation Forest."""
    iso = IsolationForest(contamination=0.1, random_state=42)
    preds = iso.fit_predict(embeddings)
    return np.where(preds == -1)[0]  # indices of anomalies
