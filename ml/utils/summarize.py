# ml/utils/summarize.py
from transformers import pipeline

def summarize_text(text: str, max_len=120):
    """Summarize long text using a transformer model."""
    try:
        summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
        summary = summarizer(text, max_length=max_len, min_length=50, do_sample=False)
        return summary[0]['summary_text']
    except Exception:
        # fallback: simple truncation
        return text[:300] + "..."
