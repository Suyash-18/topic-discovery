import Card from './Card';

export default function ClusterCard({ id, sentences, isAnomalous }) {
  const status = isAnomalous ? 'Anomalous' : 'Normal';
  const summaryText = sentences.join(' '); // Combine sentences for the summary

  return (
    <Card className="flex flex-col gap-4">
      {/* Card Header with Status */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">Cluster {id}</h3>
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full ${
            isAnomalous ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {status}
        </span>
      </div>

      {/* Summary Section */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Summary</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{summaryText}</p>
      </div>

      {/* Footer with Sentence Count */}
      <div className="border-t border-gray-200 pt-3 flex justify-between text-sm text-gray-500">
        <span>Size: {sentences.length}</span>
        {/* You can add p-value here later if the API provides it */}
      </div>
    </Card>
  );
}