import React from "react";
import Plot from "react-plotly.js";

const SimilarityHeatmap = ({ simMatrix, documents }) => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow mt-6">
      <h2 className="text-lg font-bold mb-2">Similarity Heatmap</h2>
      <Plot
        data={[
          {
            z: simMatrix,
            x: documents.map((d, i) => `Doc ${i + 1}`),
            y: documents.map((d, i) => `Doc ${i + 1}`),
            type: "heatmap",
            colorscale: "Viridis"
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

export default SimilarityHeatmap;
