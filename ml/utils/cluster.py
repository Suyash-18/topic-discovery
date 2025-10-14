# ml/utils/cluster.py
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def cluster_texts(embeddings, n_clusters=5):
    """Cluster text embeddings into groups."""
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    labels = kmeans.fit_predict(embeddings)
    centers = kmeans.cluster_centers_
    return labels, centers

def similarity_matrix(embeddings):
    """Compute cosine similarity matrix for visualization."""
    return cosine_similarity(embeddings)
