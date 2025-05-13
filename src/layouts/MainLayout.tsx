
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import SearchResults from '@/components/SearchResults';
import { documents } from '@/data/mockData';

const MainLayout = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Filter documents based on search query
  const searchResults = documents.filter(doc => {
    return doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const handleSearchClear = () => {
    setShowSearchResults(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />
      
      <div className="flex flex-1">
        <Sidebar activePage={location.pathname} />
        
        <main className="flex-1 p-6 overflow-auto">
          {showSearchResults ? (
            <div className="mb-6">
              <button 
                onClick={handleSearchClear}
                className="text-primary hover:underline mb-4 inline-flex items-center text-sm"
              >
                ← Back to previous page
              </button>
              <SearchResults results={searchResults} query={searchQuery} />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
