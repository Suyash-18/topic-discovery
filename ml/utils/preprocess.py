# ml/utils/preprocess.py
import re
from nltk.tokenize import sent_tokenize

def clean_text(text: str) -> str:
    """Remove unnecessary symbols, URLs, and extra spaces."""
    text = re.sub(r"http\S+|www\S+|https\S+", '', text)
    text = re.sub(r"[^A-Za-z0-9.,!?;:\s]", '', text)
    text = re.sub(r"\s+", ' ', text).strip()
    return text

def split_into_sentences(text: str):
    """Split text into sentences for analysis."""
    try:
        sentences = sent_tokenize(text)
        if len(sentences) == 0:
            sentences = [text]
        return sentences
    except LookupError:
        import nltk
        nltk.download('punkt')
        return sent_tokenize(text)
