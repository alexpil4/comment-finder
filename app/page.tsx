'use client';

import { useEffect, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { getCommentsByQuery } from './actions';
import Tooltip from '@/components/custom-ui/tooltip';
import ResultItemCard from '@/components/custom-ui/resultItemCard';
import LoaderItemCard from '@/components/custom-ui/loaderItemCard';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [isFirstResearch, setIsFirstResearch] = useState(false);
  const [showInformativeTooltip, setShowInformativeTooltip] = useState(false);

  const {
    data: comments,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['comments', query],
    queryFn: () => getCommentsByQuery(query, 20),
    enabled: query.length > 3,
  });

  useEffect(() => {
    // Set a flag only at the first research
    if ((isLoading || isSuccess) && !isFirstResearch) {
      setIsFirstResearch(true);
    }
  }, [isSuccess, isLoading, isFirstResearch]);

  // Update input state
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowInformativeTooltip(false);
    setSearchTerm(event.target.value);
  };

  const handleCloseTooltip = () => setShowInformativeTooltip(false);

  // Handle the submit
  const handleSearch = useCallback(() => {
    // Check if tooltip must be shown
    if (searchTerm.length <= 3) {
      setShowInformativeTooltip(true);
      return;
    }
    // Enable the useQuery (request to the API)
    setQuery(searchTerm);
  }, [searchTerm]);

  return (
    <main
      className={`flex flex-col items-center min-h-screen ${
        isFirstResearch ? 'justify-top' : 'justify-center'
      } `}
    >
      <div
        className={`relative flex w-full max-w-sm items-center space-x-2 transition-all duration-500 ease-out-in pt-8 pb-12 ${
          isFirstResearch ? 'top-0' : 'top-4' // Search bar vertical animation
        }`}
      >
        <Tooltip
          isVisible={showInformativeTooltip}
          text="Search requires more than 3 characters."
          onClose={handleCloseTooltip}
          arrowPosition="left"
        >
          <Input
            aria-label="Search for a comment"
            aria-describedby="search-tooltip"
            name="search"
            type="text"
            placeholder='Search for a comment (e.g., "enim")'
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </Tooltip>

        <Button onClick={handleSearch} type="submit" aria-label="Search button">
          SEARCH
        </Button>
      </div>

      <div
        aria-live="polite"
        role="status"
        className={`max-w-3xl px-8 transition-opacity duration-500 ease-out-in ${
          isFirstResearch ? 'opacity-100' : 'opacity-0' // Results animation
        }`}
      >
        {isSuccess && comments?.length > 0 && (
          <ul className="w-full">
            {isSuccess &&
              comments?.length > 0 &&
              comments.map((comment) => (
                <li key={comment.id} className="py-2">
                  <ResultItemCard comment={comment} query={query} />
                </li>
              ))}
          </ul>
        )}
      </div>

      {isLoading && (
        <div
          className={`space-y-4 transition-opacity duration-500 ease-out-in ${
            isFirstResearch ? 'opacity-100' : 'opacity-0' // Loader animation
          }`}
        >
          {[...Array(5)].map((_, index) => (
            <LoaderItemCard key={index} />
          ))}
        </div>
      )}

      {isSuccess && comments?.length === 0 && (
        <div className="flex items-center justify-center flex-grow">
          <p role="alert" aria-live="assertive" className="text-center text-gray-500">
            {`Sorry, no comments were found for "${query}".`}
          </p>
        </div>
      )}
    </main>
  );
}
