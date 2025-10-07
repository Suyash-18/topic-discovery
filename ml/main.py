import sys
import json
from utils.preprocess import clean_text
from utils.vectorize import get_tfidf_vectors, get_embeddings
from utils.cluster import cluster_dbscan, anomaly_lof

def process_documents(docs, method="embeddings"):
    # Step 1: Clean
    cleaned_docs = [clean_text(d) for d in docs]

    # Step 2: Vectorize (choose method)
    if method == "tfidf":
        X, vec_type = get_tfidf_vectors(cleaned_docs)
        X = X.toarray()
    else:  # default: embeddings
        X, vec_type = get_embeddings(cleaned_docs)

    # Step 3: Clustering
    labels = cluster_dbscan(X, eps=0.5, min_samples=2)

    # Step 4: Anomaly Detection
    anomalies = anomaly_lof(X, n_neighbors=3)

    # Step 5: Pack results
    results = []
    for i, doc in enumerate(docs):
        results.append({
            "document": doc,
            "vector_type": vec_type,
            "cluster": int(labels[i]),
            "anomaly": True if anomalies[i] == -1 else False
        })

    return results

if __name__ == "__main__":
    # Example test
    sample_docs = [
        "The stock market crashed due to global inflation",
        "Football players are training hard for the world cup",
        "Deep learning models improve with more data",
        "Banana is a fruit with high potassium"
    ]

    # Run with embeddings
    output = process_documents(sample_docs, method="embeddings")
    print(json.dumps(output, indent=2))
