import React from 'react';
import { ExternalLink } from 'lucide-react';

const SearchResults = ({ results, isLoading, currentQuery }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          {currentQuery ? `No results found for "${currentQuery}"` : 'Start searching to see results'}
        </div>
      </div>
    );
  }

  const formatUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return url;
    }
  };

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div key={result.id || index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-medium text-primary-600 hover:text-primary-700 hover:underline"
                >
                  {result.title}
                </a>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              
              <div className="text-sm text-green-600 mb-2">
                {formatUrl(result.url)}
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                {result.description}
              </p>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                {result.source && (
                  <div className="flex items-center space-x-1">
                    <span>Source:</span>
                    <span className="font-medium">{result.source}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults; 