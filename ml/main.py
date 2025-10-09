import os
import json
import numpy as np
from utils.preprocess import clean_text
from utils.vectorize import get_tfidf_vectors
from utils.cluster import cluster_dbscan, anomaly_lof
from utils.visualize import plot_clusters

# Create output directory if not exists
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def process_documents(docs):
    cleaned_docs = [clean_text(d) for d in docs]
    
    # Unpack (X, vectorizer) if tuple is returned
    vectors = get_tfidf_vectors(cleaned_docs)
    if isinstance(vectors, tuple):
        X, _ = vectors
    else:
        X = vectors

    labels = cluster_dbscan(X.toarray(), eps=0.5, min_samples=2)
    anomalies = anomaly_lof(X.toarray(), n_neighbors=3)

    results = []
    for i, doc in enumerate(docs):
        results.append({
            "document": str(doc),
            "cluster": int(labels[i]),
            # convert to native Python bool
            "anomaly": bool(anomalies[i] == -1)
        })

    # Save JSON
    json_path = os.path.join(OUTPUT_DIR, "results.json")
    with open(json_path, "w") as f:
        json.dump(results, f, indent=2)

    # Save plot
    plot_path = os.path.join(OUTPUT_DIR, "clusters.png")
    plot_clusters(X.toarray(), labels, anomalies, plot_path)

    return {"results": results, "json_file": json_path, "plot_file": plot_path}

if __name__ == "__main__":
    sample_docs = [
        "The stock market crashed due to global inflation",
        "Football players are training hard for the world cup",
        "Deep learning models improve with more data",
        "Banana is a fruit with high potassium"
    ]
    output = process_documents(sample_docs)
    print(json.dumps(output, indent=2))
