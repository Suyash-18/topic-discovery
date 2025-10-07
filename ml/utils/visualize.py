import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
import numpy as np

def plot_clusters(X, labels, anomalies, save_path="cluster_plot.png"):
    # Reduce dimensions to 2D
    pca = PCA(n_components=2)
    reduced = pca.fit_transform(X)

    # Convert to numpy for safety
    reduced = np.array(reduced)

    plt.figure(figsize=(8, 6))

    # Plot clusters
    unique_labels = set(labels)
    for lbl in unique_labels:
        if lbl == -1:
            continue  # skip DBSCAN noise (will be handled separately)
        idxs = [i for i, l in enumerate(labels) if l == lbl]
        plt.scatter(reduced[idxs, 0], reduced[idxs, 1], label=f"Cluster {lbl}", alpha=0.7)

    # Plot anomalies separately (red crosses)
    anomaly_idxs = [i for i, a in enumerate(anomalies) if a == -1]
    if anomaly_idxs:
        plt.scatter(
            reduced[anomaly_idxs, 0],
            reduced[anomaly_idxs, 1],
            color="red",
            marker="x",
            s=80,
            label="Anomalies"
        )

    plt.title("Cluster Visualization (with anomalies)")
    plt.xlabel("PCA 1")
    plt.ylabel("PCA 2")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(save_path)
    plt.close()

    return save_path
