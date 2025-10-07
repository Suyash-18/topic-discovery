import sys
import json
from utils.preprocess import clean_text
from utils.vectorize import get_tfidf_vectors
from utils.cluster import cluster_dbscan, anomaly_lof

def process_documents(docs):
    # Step 1: Clean
    cleaned_docs = [clean_text(d) for d in docs]

    # Step 2: Vectorize (TF-IDF for now)
    X = get_tfidf_vectors(cleaned_docs)

    # Step 3: Clustering
    labels = cluster_dbscan(X.toarray(), eps=0.5, min_samples=2)

    # Step 4: Anomaly Detection
    anomalies = anomaly_lof(X.toarray(), n_neighbors=3)

    # Step 5: Pack results
    results = []
    for i, doc in enumerate(docs):
        results.append({
            "document": doc,
            "cluster": int(labels[i]),
            "anomaly": True if anomalies[i] == -1 else False
        })

    return results

if __name__ == "__main__":
    # Example input for testing:
    sample_docs = [
        "The stock market crashed due to global inflation",
        "Football players are training hard for the world cup",
        "Deep learning models improve with more data",
        "Banana is a fruit with high potassium"
    ]

    output = process_documents(sample_docs)
    print(json.dumps(output, indent=2))
