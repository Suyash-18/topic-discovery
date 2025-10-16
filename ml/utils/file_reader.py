# ml/utils/file_reader.py
import os
import pandas as pd
from PyPDF2 import PdfReader

# --- 🔽 MODIFICATION START 🔽 ---
def read_file(file_path: str, original_name: str) -> str:
    """
    Reads content from a file, determining the file type from the original_name.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")

    # Use the original_name to get the correct file extension
    ext = os.path.splitext(original_name)[1].lower()
    text_data = ""
# --- 🔼 MODIFICATION END 🔼 ---

    if ext == ".pdf":
        reader = PdfReader(file_path)
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text_data += page_text + "\n"

    elif ext == ".csv":
        df = pd.read_csv(file_path, dtype=str, keep_default_na=False)
        text_data = " ".join(df.fillna("").astype(str).values.flatten().tolist())

    elif ext == ".txt":
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            text_data = f.read()

    else:
        # This error check is now reliable
        raise ValueError(f"Unsupported file format '{ext}'. Supported: .pdf, .csv, .txt")

    return text_data.strip()