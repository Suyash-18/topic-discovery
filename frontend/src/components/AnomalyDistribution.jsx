import Card from './Card';

export default function AnomalyDistribution({ result }) {
  if (!result) return null;
  const clusterCount = Object.keys(result.clusters).length;
  const anomalyCount = result.anomalies.length;
  const normalCount = clusterCount - anomalyCount;

  return (
    <Card className="flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Anomaly Distribution</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-center">
            <div className="text-3xl font-bold text-red-600">{anomalyCount}</div>
            <div className="text-sm text-red-700">Anomalous</div>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
            <div className="text-3xl font-bold text-green-600">{normalCount}</div>
            <div className="text-sm text-green-700">Normal</div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-500 mb-2">Top Keywords</h4>
        <p className="text-sm text-gray-600 leading-relaxed break-words">
          {result.keywords.join(', ')}
        </p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-500 mb-2">Overall Summary</h4>
        <p className="text-sm text-gray-700">{result.summary}</p>
      </div>
    </Card>
  );
}