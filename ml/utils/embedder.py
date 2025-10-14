# ml/utils/embedder.py
from sentence_transformers import SentenceTransformer

def get_embeddings(texts):
    """Convert sentences/documents into dense vectors."""
    model = SentenceTransformer('all-MiniLM-L6-v2')  # fast & powerful
    embeddings = model.encode(texts, show_progress_bar=False)
    return embeddings

