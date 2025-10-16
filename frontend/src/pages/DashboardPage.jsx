import { useState } from 'react';
import { useScan } from '../context/ScanContext'; // 👈 Import and use the hook
import UploadBox from '../components/UploadBox';
import ScanStatus from '../components/ScanStatus';
import SimilarityHeatmap from '../components/SimilarityHeatmap';
import AnomalyDistribution from '../components/AnomalyDistribution';

const API_URL = 'http://localhost:5000';

export default function DashboardPage() {
  // Use the shared state from the context
  const { scanResult, setScanResult, isLoading, setIsLoading } = useScan();
  const [error, setError] = useState('');

  const handleScan = async (text, file) => {
    setIsLoading(true);
    setScanResult(null); // 👈 Clear the SHARED state
    setError('');

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else {
      formData.append('text', text);
    }

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error.');
      }
      if (data.error) {
        throw new Error(data.error);
      }

      setScanResult(data); // ✅ CRITICAL: Update the shared context state

    } catch (err) {
      setError(err.message);
      console.error("Scan failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ... rest of your JSX ... */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UploadBox onScan={handleScan} isLoading={isLoading} />
        </div>
        <div>
          {/* This component will now correctly show the shared state */}
          <ScanStatus result={scanResult} error={error} isLoading={isLoading} />
        </div>
      </div>

      {scanResult && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SimilarityHeatmap heatmapUrl={scanResult.files?.heatmap} />
          </div>
          <div>
            <AnomalyDistribution result={scanResult} />
          </div>
        </div>
      )}
    </div>
  );
}