from sklearn.feature_extraction.text import TfidfVectorizer
from sentence_transformers import SentenceTransformer

def get_tfidf_vectors(docs):
    vectorizer = TfidfVectorizer(max_features=5000)
    X = vectorizer.fit_transform(docs)
    return X

def get_embeddings(docs):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings = model.encode(docs)
    return embeddings
