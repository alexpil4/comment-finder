'use client';

import { useEffect, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoaderIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { getCommentsByQuery } from './actions';
import Tooltip from '@/components/custom/tooltip';
import TooltipProvider from '@/components/custom/tooltip';

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
    if (isSuccess && !isFirstResearch) {
      setIsFirstResearch(true);
    }
  }, [isSuccess, isFirstResearch]);

  // Update input state
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowInformativeTooltip(false);
    setSearchTerm(event.target.value);
  };

  const handleCloseTooltip = () => setShowInformativeTooltip(false);

  const handleSearch = useCallback(() => {
    if (searchTerm.length <= 3) {
      setShowInformativeTooltip(true);
      return;
    }
    setQuery(searchTerm);
  }, [searchTerm]);

  return (
    <main
      className={`flex flex-col items-center min-h-screen ${
        isFirstResearch ? 'justify-top' : 'justify-center'
      } pt-8`}
    >
      <TooltipProvider
        isVisible={showInformativeTooltip}
        text="Search requires more than 3 characters."
        onClose={handleCloseTooltip}
      >
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
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
          <Button onClick={handleSearch} type="submit">
            SEARCH
          </Button>
        </div>
      </TooltipProvider>

      <div
        aria-live="polite"
        className={`max-w-[950px] px-8 transition-opacity duration-500 ease-in-out ${
          isFirstResearch ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {isSuccess && comments?.length > 0 && (
          <ul className="mt-4 w-full">
            {comments.map((comment) => (
              <li key={comment.id} className="border-b py-2">
                {comment.body}
              </li>
            ))}
          </ul>
        )}
      </div>

      {isSuccess && comments?.length === 0 && (
        <div className="flex items-center justify-center flex-grow">
          <p className="text-center text-gray-500">{`No comments with "${query}" found.`}</p>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center flex-grow">
          <LoaderIcon className="animate-spin text-primary w-12 h-12" />
        </div>
      )}
    </main>
  );
}
