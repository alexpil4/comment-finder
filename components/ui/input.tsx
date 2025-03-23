import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & {
    suggestions: string[];
    handleSuggestionClick: (suggestion: string) => void;
  }
>(({ className, type, suggestions, handleSuggestionClick, ...props }, ref) => {
  return (
    <>
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 top-[80px] mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 ">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
});
Input.displayName = 'Input';

export { Input };
