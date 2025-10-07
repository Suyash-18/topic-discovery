from sklearn.cluster import DBSCAN
from sklearn.neighbors import LocalOutlierFactor

def cluster_dbscan(X, eps=0.5, min_samples=2):
    clustering = DBSCAN(eps=eps, min_samples=min_samples, metric="cosine").fit(X)
    return clustering.labels_

def anomaly_lof(X, n_neighbors=5):
    lof = LocalOutlierFactor(n_neighbors=n_neighbors, metric="cosine")
    outliers = lof.fit_predict(X)
    return outliers
