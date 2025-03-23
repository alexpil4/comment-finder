import { useMemo } from 'react';

import { CommentPreviewProps } from '@/types/Comment';

export default function CommentPreview({ body, query }: CommentPreviewProps) {
  const normalizedComment = useMemo(() => {
    const lowerBody = body.toLowerCase();
    const lowerQuery = query.toLowerCase();
    // Find the position of the query in the body
    const index = lowerBody.indexOf(lowerQuery);
    // Comment summary limited to 64 characters
    const maxLength = 64;
    const queryLength = query.length;
    // Subtract the query length from 64 characters, then divide by 2
    // to correctly calculate the available space without including the query length
    const remainingLength = maxLength - queryLength;

    // Calculate the start and the end positions for the substring (64 characters total as requested):
    const beforeChars = Math.floor(remainingLength / 2);
    const afterChars = remainingLength - beforeChars;
    // 32 characters before the query
    const start = Math.max(0, index - beforeChars);
    // 32 characters after the query
    const end = Math.min(body.length, index + queryLength + afterChars);

    // Extract the substring and include the query portion
    const snippet = body.substring(start, end);

    // Highlight the query in the substring
    const regex = new RegExp(`(${query})`, 'gi');
    return snippet
      .split(regex)
      .map((part, i) =>
        part.toLowerCase() === lowerQuery ? <b key={i}>{part}</b> : part,
      );
  }, [body, query]);

  return (
    <p aria-live="polite" aria-label="Comment preview">
      {normalizedComment}
    </p>
  );
}
