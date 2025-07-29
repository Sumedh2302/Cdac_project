import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import InstantAnswer from './components/InstantAnswer';
import { searchApi } from './services/api';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [instantAnswer, setInstantAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreResults, setHasMoreResults] = useState(false);

  const handleSearch = async (query, page = 0) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setCurrentQuery(query);
    setCurrentPage(page);

    try {
      const results = await searchApi.search(query, page, 10);
      setSearchResults(results);
      
      // Check if there are more results available
      setHasMoreResults(results.length === 10);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
      setHasMoreResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstantAnswer = (answer) => {
    setInstantAnswer(answer);
  };

  const handlePageChange = (page) => {
    if (currentQuery) {
      handleSearch(currentQuery, page);
    }
  };

  const clearInstantAnswer = () => {
    setInstantAnswer(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Search Engine</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Search the Web
            </h2>
            <p className="text-lg text-gray-600">
              Find information from multiple search providers with instant answers
            </p>
          </div>
          
          <SearchBar 
            onSearch={handleSearch}
            onInstantAnswer={handleInstantAnswer}
          />
        </div>

        {/* Instant Answer */}
        {instantAnswer && (
          <InstantAnswer 
            instantAnswer={instantAnswer}
            onClose={clearInstantAnswer}
          />
        )}

        {/* Search Results */}
        {currentQuery && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Search Results for "{currentQuery}"
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {searchResults.length > 0 && (
                  <span>{searchResults.length} results</span>
                )}
                {currentPage > 0 && (
                  <span>Page {currentPage + 1}</span>
                )}
              </div>
            </div>
            
            <SearchResults 
              results={searchResults}
              isLoading={isLoading}
              currentQuery={currentQuery}
            />
          </div>
        )}

        {/* Pagination */}
        {currentQuery && (
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0 || isLoading}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous Page
            </button>
            
            <div className="text-sm text-gray-500">
              {currentPage > 0 && `Page ${currentPage + 1}`}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasMoreResults || isLoading}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Page →
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>Powered by multiple search providers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 