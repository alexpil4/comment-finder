'use server';

import { Comment } from '@/Types/Comment';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// I read the assignment and than I noticed that the API at https://jsonplaceholder.typicode.com/
// is currently powered by the stable version of JSON Server (v0),
// as documented in the official docs. Therefore, the filter to use
// is the one documented here: https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#filter.
//
// Additionally, Mockend is a similar API service, but it uses a different filtering method
// that doesn't match the one used by jsonplaceholder API. I just wanted to point this out
// to avoid any potential confusion. Thanks!

export async function getCommentsByQuery(
  query: string,
  resultsLimit: number,
): Promise<Comment[]> {
  try {
    const res = await fetch(
      // The call is not explicitly visible on console because it is executed by the server that masks the requests.
      // If there is a review, we can view it using the directive: 'use client'.
      `${API_URL}/comments?body_like=${encodeURIComponent(
        query,
      )}&_limit=${resultsLimit}`,
      {
        cache: 'no-store',
      },
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch comments: ${res.status} ${res.statusText}`,
      );
    }
    return res.json();
  } catch (error) {
    console.error(
      'Error fetching comments:',
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}
