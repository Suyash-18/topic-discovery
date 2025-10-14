import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from sklearn.decomposition import PCA

def plot_similarity_heatmap(similarity_matrix, output_path):
    """
    Generate and save similarity heatmap to a specified path.
    """
    plt.figure(figsize=(10, 8))
    sns.heatmap(similarity_matrix, xticklabels=False, yticklabels=False, cmap="viridis")
    plt.title("Text Similarity Heatmap")
    plt.tight_layout()
    # ✅ Use the provided path to save the file
    plt.savefig(output_path)
    plt.close()

def plot_clusters(embeddings, labels, output_path):
    """
    Visualize clusters in 2D using PCA and save to a specified path.
    """
    # Reduce dimensions for plotting if embeddings are high-dimensional
    if embeddings.shape[1] > 2:
        pca = PCA(n_components=2)
        reduced = pca.fit_transform(embeddings)
    else:
        reduced = embeddings

    plt.figure(figsize=(8, 6))
    sns.scatterplot(x=reduced[:, 0], y=reduced[:, 1], hue=labels, palette="tab10", s=80, legend="full")
    plt.title("Cluster Visualization")
    plt.tight_layout()
    # ✅ Use the provided path to save the file
    plt.savefig(output_path)
    plt.close()