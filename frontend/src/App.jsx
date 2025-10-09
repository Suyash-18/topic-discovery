import React, { useEffect, useState } from "react";
import ClusterPlot from "./components/ClusterPlot";
import SimilarityHeatmap from "./components/SimilarityHeatmap";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Replace with real backend call later
    fetch("/sample-results.json")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Anomalous Topic Discovery</h1>
      {data && (
        <>
          <ClusterPlot
            pcaPoints={data.pca_points}
            documents={data.documents}
          />
          <SimilarityHeatmap
            simMatrix={data.similarity_matrix}
            documents={data.documents}
          />
        </>
      )}
    </div>
  );
}

export default App;
