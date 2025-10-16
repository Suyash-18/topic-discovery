import { createContext, useState, useContext } from 'react';

const ScanContext = createContext();

export const useScan = () => useContext(ScanContext);

export const ScanProvider = ({ children }) => {
  const [scanResult, setScanResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    scanResult,
    setScanResult,
    isLoading,
    setIsLoading,
  };

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
};