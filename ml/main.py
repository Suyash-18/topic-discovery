import os
import sys
import json
import argparse
import traceback # Import traceback for detailed error logging

# import your utils
from utils.preprocess import clean_text, split_into_sentences
from utils.embedder import get_embeddings
from utils.cluster import cluster_texts, similarity_matrix
from utils.summarize import summarize_text
from utils.keywords import extract_keywords
from utils.visualize import plot_similarity_heatmap, plot_clusters
from utils.anomaly import detect_anomalies
from utils.file_reader import read_file

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def analyze_text(input_text: str, n_clusters=5):
    """
    Analyzes the input text by performing cleaning, embedding, clustering,
    and other NLP tasks. It dynamically adjusts the number of clusters
    if the sentence count is too low.
    """
    cleaned = clean_text(input_text)
    sentences = split_into_sentences(cleaned)

    # ❗️ FIX: Dynamically adjust n_clusters if there are too few sentences.
    if len(sentences) < n_clusters:
        n_clusters = len(sentences)

    # ✅ Defensive Check: If there are no sentences, return an error message.
    if n_clusters == 0:
        # Returning a dictionary, so the frontend can handle it gracefully.
        return { "error": "Input text is empty or contains no valid sentences to analyze." }

    embeddings = get_embeddings(sentences)

    labels, centers = cluster_texts(embeddings, n_clusters)
    sim_matrix = similarity_matrix(embeddings)
    anomalies = detect_anomalies(embeddings)
    keywords = extract_keywords(cleaned)
    summary = summarize_text(cleaned)

    # Save visualizations
    heatmap_path = os.path.join(OUTPUT_DIR, "heatmap.png")
    clusters_path = os.path.join(OUTPUT_DIR, "clusters.png")
    plot_similarity_heatmap(sim_matrix, heatmap_path)
    plot_clusters(embeddings, labels, clusters_path)

    # Build results dict
    result = {
        "num_sentences": len(sentences),
        "keywords": keywords,
        "summary": summary,
        "clusters": {str(i): [] for i in range(n_clusters)},
        "anomalies": anomalies.tolist(),
        "files": {
            "heatmap": heatmap_path,
            "clusters": clusters_path,
            "results": os.path.join(OUTPUT_DIR, "results.json")
        }
    }

    for i, label in enumerate(labels):
        result["clusters"][str(label)].append(sentences[i])

    # Save results.json
    with open(result["files"]["results"], "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    return result

def run_from_stdin():
    """Reads JSON payload from stdin and triggers analysis."""
    payload = json.load(sys.stdin)
    text = ""
    if "file" in payload and payload["file"]:
        text = read_file(payload["file"])
    elif "text" in payload and payload["text"]:
        text = payload["text"]
    else:
        raise ValueError("Provide either 'text' or 'file' in the JSON stdin payload.")

    n_clusters = int(payload.get("n_clusters", 5))
    result = analyze_text(text, n_clusters=n_clusters)
    print(json.dumps(result))

def run_from_args():
    """Parses command-line arguments and triggers analysis."""
    parser = argparse.ArgumentParser(description="Analyze text for topics, keywords, and anomalies.")
    parser.add_argument("--file", type=str, help="Path to input file (.pdf, .csv, .txt)")
    parser.add_argument("--text", type=str, help="Direct text input")
    parser.add_argument("--n_clusters", type=int, default=5, help="Number of clusters to create.")
    args = parser.parse_args()
    
    text = ""
    if args.file:
        text = read_file(args.file)
    elif args.text:
        text = args.text
    else:
        # Fallback for interactive mode
        text = input("Enter text to analyze: ")
        
    result = analyze_text(text, n_clusters=args.n_clusters)
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    try:
        # This logic determines whether the script is being fed data from another process
        # (like your Node.js server) or being run directly in the terminal.
        if not sys.stdin.isatty():
            run_from_stdin()
        else:
            run_from_args()
    except Exception as e:
        # This is a crucial block for debugging. It catches ANY error,
        # prints a detailed traceback to stderr (which Node.js will log),
        # and exits with an error code.
        print(f"🔥 An error occurred in main.py: {str(e)}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)