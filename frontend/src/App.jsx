import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import ClustersPage from './pages/ClustersPage';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-50 min-h-screen text-gray-800">
        <Header />
        <main className="container mx-auto p-4 sm:p-6 md:p-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/clusters" element={<ClustersPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;