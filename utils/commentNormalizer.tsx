export function commentNormalize(body: string, query: string) {
  // Find the position of the query in the body
  const index = body.toLowerCase().indexOf(query.toLowerCase());

  // Calculate the start and the end positions for the substring (64 characters total as requested):

  // 32 characters before the query
  const start = Math.max(0, index - 32);
  // and 32 characters after the query
  const end = Math.min(body.length, index + query.length + 32);

  // Extract the substring and include the query portion
  const snippet = body.substring(start, end);

  // Highlight the query in the substring
  const regex = new RegExp(`(${query})`, 'gi');
  return snippet.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="bg-teal-400 text-white">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
