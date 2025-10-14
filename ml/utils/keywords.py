# ml/utils/keywords.py
from keybert import KeyBERT

def extract_keywords(text, num_keywords=10):
    kw_model = KeyBERT('all-MiniLM-L6-v2')
    keywords = kw_model.extract_keywords(text, top_n=num_keywords)
    return [kw[0] for kw in keywords]
