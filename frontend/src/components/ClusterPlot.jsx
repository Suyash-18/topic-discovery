import React from "react";
import Plot from "react-plotly.js";

const ClusterPlot = ({ pcaPoints, documents }) => {
  const x = pcaPoints.map(p => p[0]);
  const y = pcaPoints.map(p => p[1]);
  const labels = documents.map(d => d.cluster);
  const texts = documents.map(
    (d, i) => `${d.document}\nCluster: ${d.cluster}\nAnomaly: ${d.anomaly}`
  );
  const colors = documents.map(d => (d.anomaly ? "red" : d.cluster));

  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-bold mb-2">Cluster Visualization</h2>
      <Plot
        data={[
          {
            x,
            y,
            text: texts,
            mode: "markers",
            marker: { color: colors, size: 12, symbol: "circle" },
            type: "scatter"
          }
        ]}
        layout={{
          autosize: true,
          height: 500,
          margin: { t: 40 },
          hovermode: "closest"
        }}
        config={{ responsive: true }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default ClusterPlot;
