import matplotlib.pyplot as plt
import numpy as np

def plot_clusters(X, labels, anomalies, save_path):
    plt.figure(figsize=(8, 6))

    for i, point in enumerate(X):
        label = labels[i]
        if label == -1:  
            # DBSCAN marks noise/anomaly as -1 → plot in black
            plt.scatter(point[0], point[1], c="black", marker="x", label="Noise" if "Noise" not in plt.gca().get_legend_handles_labels()[1] else "")
        else:
            plt.scatter(
                point[0], point[1],
                c=f"C{label % 10}",  # cycle through C0–C9 safely
                marker="o",
                label=f"Cluster {label}" if f"Cluster {label}" not in plt.gca().get_legend_handles_labels()[1] else ""
            )

    plt.title("DBSCAN Clustering with Anomaly Detection")
    plt.legend()
    plt.savefig(save_path)
    plt.close()
