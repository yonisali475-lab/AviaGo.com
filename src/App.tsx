import { useState } from 'react';
import Header from './components/Header';
import SearchEngine, { SearchData } from './components/SearchEngine';
import SearchResults from './components/SearchResults';
import DealsExplorer from './components/DealsExplorer';
import Footer from './components/Footer';

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const [searchData, setSearchData] = useState<SearchData | null>(null);

  const handleSearch = (data: SearchData) => {
    setSearchData(data);
    setShowResults(true);
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setShowResults(false);
    setSearchData(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-trip-dark selection:bg-trip-blue/20">
      <Header onLogoClick={handleGoHome} />

      <main>
        {showResults && searchData ? (
          <SearchResults searchData={searchData} />
        ) : (
          <>
            <SearchEngine onSearch={handleSearch} />
            <DealsExplorer onSearch={handleSearch} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
