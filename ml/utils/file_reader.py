# ml/utils/file_reader.py
import os
import pandas as pd
from PyPDF2 import PdfReader

def read_file(file_path: str) -> str:
    file_path = os.path.abspath(file_path)
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")

    ext = os.path.splitext(file_path)[1].lower()
    text_data = ""

    if ext == ".pdf":
        reader = PdfReader(file_path)
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text_data += page_text + "\n"

    elif ext == ".csv":
        df = pd.read_csv(file_path, dtype=str, keep_default_na=False)
        # join all cells into one big string
        text_data = " ".join(df.fillna("").astype(str).values.flatten().tolist())

    elif ext == ".txt":
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            text_data = f.read()

    else:
        raise ValueError("Unsupported file format. Supported: .pdf, .csv, .txt")

    return text_data.strip()
