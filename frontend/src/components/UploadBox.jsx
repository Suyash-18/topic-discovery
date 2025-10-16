import { useState } from 'react';
import Button from './Button';
import Card from './Card';

export default function UploadBox({ onScan, isLoading }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setText(''); // Clear text input when a file is selected
    }
  };

  const handleScanClick = () => {
    if (!text && !file) {
      alert('Please enter text or upload a file to scan.');
      return;
    }
    onScan(text, file);
  };

  return (
    <Card>
      <div className="flex flex-col h-full">
        <p className="block text-sm font-medium text-gray-700 mb-2">
          Upload Documents
        </p>
        
        {/* --- 🔽 MODIFICATION START 🔽 --- */}
        {/* The entire clickable area is now the label */}
        <label
          htmlFor="file-upload"
          className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-500 bg-gray-50"
        >
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
          />
          <p className="text-sm text-gray-500">
            {file ? `Selected: ${file.name}` : 'Click to upload text, CSV, PDF, or Word documents'}
          </p>
        </label>
        {/* --- 🔼 MODIFICATION END 🔼 --- */}

        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (file) setFile(null); // Clear file if user starts typing
          }}
          placeholder="Paste your text here..."
          className="w-full flex-grow p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          rows="10"
        ></textarea>
        <div className="mt-4 text-right">
          <Button onClick={handleScanClick} isLoading={isLoading}>
            Start Scan
          </Button>
        </div>
      </div>
    </Card>
  );
}