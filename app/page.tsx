'use client';

import { useEffect, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { getCommentsByQuery } from './actions';
import Tooltip from '@/components/customUI/tooltip';
import ResultItemCard from '@/components/customUI/resultItemCard';
import LoaderItemCard from '@/components/customUI/loaderItemCard';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [isFirstSearchDone, setIsFirstSearchDone] = useState(false);
  const [showInformativeTooltip, setShowInformativeTooltip] = useState(false);

  const {
    data: comments,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['comments', query],
    queryFn: () => getCommentsByQuery(query, 20),
    enabled: query.length > 3,
    // I decided to avoid the cache timing and cache stale because in real life
    // comment could be created in any time, so updates must be fresh
  });

  useEffect(() => {
    // This flag helps manage positioning and animations of the page based
    // on whether it's the first time a search has been performed.
    if ((isLoading || isSuccess) && !isFirstSearchDone) {
      setIsFirstSearchDone(true);
    }
  }, [isSuccess, isLoading, isFirstSearchDone]);

  // Update state on input change and reset the tooltip visibility if it's open
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowInformativeTooltip(false);
    setSearchTerm(event.target.value);
  };

  // Handle the manual close of the tooltip
  const handleCloseTooltip = () => setShowInformativeTooltip(false);

  // Handle the submit
  const handleSearch = useCallback(() => {
    // Check if the tooltip should be shown
    if (searchTerm.length <= 3) {
      setShowInformativeTooltip(true);
      return;
    }
    // Enable the useQuery (request to the API)
    setQuery(searchTerm);
  }, [searchTerm]);

  return (
    <main
      className={`flex flex-col mb-8 items-center min-h-screen ${
        isFirstSearchDone ? 'justify-top' : 'justify-center'
      } `}
    >
      {!isFirstSearchDone && (
        <>
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Welcome to{' '}
            <span className="text-rose-600">Super Comment Finder</span>
          </h1>
          <p className="text-lg text-gray-600 text-center mb-2">
            Search for comments across all posts worldwide.
          </p>
        </>
      )}

      <div
        className={`relative flex w-full max-w-sm items-center space-x-2 transition-all duration-500 ease-out-in pt-8 pb-12 ${
          isFirstSearchDone ? 'top-0' : 'top-4' // Search bar vertical animation
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
        className={`md:w-[768px] px-8 transition-opacity duration-500 ease-out-in ${
          isFirstSearchDone ? 'opacity-100' : 'opacity-0' // Results animation
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
            isFirstSearchDone ? 'opacity-100' : 'opacity-0' // Loader animation
          }`}
        >
          <LoaderItemCard />
        </div>
      )}

      {isSuccess && comments?.length === 0 && (
        <div className="flex items-center justify-center flex-grow">
          <p
            role="alert"
            aria-live="assertive"
            className="text-center text-gray-500"
          >
            {`Sorry, no comments were found for "${query}".`}
          </p>
        </div>
      )}
    </main>
  );
}
