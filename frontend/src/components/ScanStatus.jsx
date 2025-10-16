import Card from './Card';

export default function ScanStatus({ result, isLoading, error }) {
  const getStatusPill = () => {
    if (isLoading) return <span className="text-sm font-bold text-blue-600">PROCESSING</span>;
    if (error) return <span className="text-sm font-bold text-red-600">FAILED</span>;
    if (result) return <span className="text-sm font-bold text-green-600">SUCCESS</span>;
    return <span className="text-sm font-bold text-gray-500">IDLE</span>;
  };

  const clusterCount = result ? Object.keys(result.clusters).length : '-';
  const anomalyCount = result?.anomalies?.length ?? '-';

  return (
    <Card>
      <h3 className="font-semibold text-gray-800 mb-4">Scan Status</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Status</span>
          {getStatusPill()}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Sentences</span>
          <span className="font-mono text-gray-700">{result?.num_sentences ?? '-'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Clusters Found</span>
          <span className="font-mono text-gray-700">{clusterCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Anomalies</span>
          <span className="font-mono text-red-600 font-semibold">{anomalyCount}</span>
        </div>
        {error && <p className="text-red-600 pt-2 text-xs font-medium">Error: {error}</p>}
      </div>
    </Card>
  );
}