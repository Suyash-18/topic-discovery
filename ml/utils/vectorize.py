from sklearn.feature_extraction.text import TfidfVectorizer
from sentence_transformers import SentenceTransformer

# TF-IDF Vectorizer
def get_tfidf_vectors(docs):
    vectorizer = TfidfVectorizer(max_features=5000)
    X = vectorizer.fit_transform(docs)
    return X, "tfidf"

# Semantic Embeddings
def get_embeddings(docs):
    model = SentenceTransformer("all-MiniLM-L6-v2")  # light + fast
    embeddings = model.encode(docs, show_progress_bar=False)
    return embeddings, "embeddings"
