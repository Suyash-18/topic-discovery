import { useNavigate } from 'react-router-dom';
import { useScan } from '../context/ScanContext';
import ClusterCard from '../components/ClusterCard';
import Button from '../components/Button';

export default function ClustersPage() {
  const navigate = useNavigate();
  const { scanResult } = useScan();

  const handleExport = () => {
    if (!scanResult || !scanResult.clusters) {
      alert("No cluster data available to export.");
      return;
    }

    // 1. Define CSV Headers based on your sample image
    const headers = ["id", "keywords", "size", "p_value", "created_at"];
    
    // 2. Transform the cluster data into an array of arrays (rows)
    const rows = Object.entries(scanResult.clusters).map(([clusterId, sentences]) => {
      // NOTE: Your API provides global keywords, not per cluster.
      // We are using the top 5 global keywords as a placeholder here.
      const keywords = scanResult.keywords.slice(0, 5).join(' ');
      const size = sentences.length;
      // NOTE: p-value and created_at are not in your API response.
      // We are adding placeholder data.
      const p_value = (Math.random() * 0.05).toFixed(4);
      const created_at = new Date().toISOString();

      return [
        `c-job-${clusterId}`, // Mimicking your sample ID format
        `"${keywords}"`,     // Wrap keywords in quotes to handle commas
        size,
        p_value,
        created_at
      ];
    });

    // 3. Combine headers and rows into a single CSV string
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // 4. Create a Blob and trigger a download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'clusters_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  if (!scanResult) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700">No Cluster Data Available</h2>
        <p className="mt-2 text-gray-500">Please run a scan on the dashboard first.</p>
        <div className="mt-6">
          <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const clusterEntries = Object.entries(scanResult.clusters || {});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Detected Clusters</h1>
        <div>
          {/* Add the onClick handler to the export button */}
          <Button onClick={handleExport}>Export Anomalies</Button>
        </div>
      </div>
      
      {/* ... rest of your JSX for summary and cluster cards ... */}
       <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Summary</h3>
        <p className="mt-1 text-gray-700">{scanResult.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clusterEntries.map(([clusterId, sentences]) => {
          const isAnomalous = scanResult.anomalies.includes(parseInt(clusterId));
          return (
            <ClusterCard
              key={clusterId}
              id={clusterId}
              sentences={sentences}
              isAnomalous={isAnomalous}
            />
          );
        })}
      </div>
    </div>
  );
}