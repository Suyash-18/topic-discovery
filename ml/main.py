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

    # Define filenames for the output files
    heatmap_filename = "heatmap.png"
    clusters_filename = "clusters.png"
    results_filename = "results.json"

    # Create full paths for saving the files locally
    heatmap_path = os.path.join(OUTPUT_DIR, heatmap_filename)
    clusters_path = os.path.join(OUTPUT_DIR, clusters_filename)
    results_path = os.path.join(OUTPUT_DIR, results_filename)
    
    # Save visualizations using the full local paths
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
            # Return URL-friendly paths for the frontend
            "heatmap": f"/output/{heatmap_filename}",
            "clusters": f"/output/{clusters_filename}",
            "results": f"/output/{results_filename}"
        }
    }
    
    for i, label in enumerate(labels):
        result["clusters"][str(label)].append(sentences[i])

    # Save results.json using the full local path
    with open(results_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    return result

def run_from_stdin():
    """Reads JSON payload from stdin and triggers analysis."""
    payload = json.load(sys.stdin)
    text = ""
    
    # --- 🔽 MODIFICATION START 🔽 ---
    # Check for the new keys from the Node.js controller to handle file uploads correctly
    if "filePath" in payload and "originalName" in payload:
        file_path = payload["filePath"]
        original_name = payload["originalName"]
        # Pass both the temp path and original name to the file reader
        text = read_file(file_path, original_name)
    # --- 🔼 MODIFICATION END 🔼 ---

    elif "text" in payload and payload["text"]:
        text = payload["text"]
    else:
        raise ValueError("Provide either 'text' or ('filePath' and 'originalName') in the JSON stdin payload.")

    n_clusters = int(payload.get("n_clusters", 5))
    result = analyze_text(text, n_clusters=n_clusters)
    print(json.dumps(result))

def run_from_args():
    """Parses command-line arguments and triggers analysis."""
    parser = argparse.ArgumentParser(description="Analyze text for topics, keywords, and anomalies.")
    # The read_file function now requires two arguments when called from here
    parser.add_argument("--file", type=str, help="Path to input file (.pdf, .csv, .txt)")
    parser.add_argument("--text", type=str, help="Direct text input")
    parser.add_argument("--n_clusters", type=int, default=5, help="Number of clusters to create.")
    args = parser.parse_args()
    
    text = ""
    if args.file:
        # When running from command line, the file path and name are the same
        text = read_file(args.file, args.file)
    elif args.text:
        text = args.text
    else:
        # Fallback for interactive mode
        text = input("Enter text to analyze: ")
        
    result = analyze_text(text, n_clusters=args.n_clusters)
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    try:
        if not sys.stdin.isatty():
            run_from_stdin()
        else:
            run_from_args()
    except Exception as e:
        print(f"🔥 An error occurred in main.py: {str(e)}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)