import Card from './Card';

// Your Express backend's base URL
const API_BASE_URL = 'http://localhost:5000';

export default function SimilarityHeatmap({ heatmapUrl }) {
  // Don't render the component if the URL prop is missing
  if (!heatmapUrl) {
    return null;
  }

  // Construct the full, absolute URL for the image source
  const imageUrl = `${API_BASE_URL}${heatmapUrl}`;

  return (
    <Card>
      <h3 className="font-semibold text-gray-800 mb-4">Similarity Heatmap</h3>
      <div>
        <img
          src={imageUrl}
          alt="Similarity Heatmap"
          className="w-full h-auto rounded-lg border border-gray-200"
        />
      </div>
    </Card>
  );
}