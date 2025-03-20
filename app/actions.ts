'use server';

import { Comment } from '@/types/Comment';

const API_URL = process.env.API_URL;

// Hi, I noticed that the API at https://jsonplaceholder.typicode.com/
// is currently powered by the stable version of JSON Server (v0),
// as documented in the official docs. Therefore, the filter to use
// is the one documented here: https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#filter.
//
// Additionally, Mockend is a similar API service, but it uses a different filtering method
// that doesn't match the one used by jsonplaceholder API. I just wanted to point this out
// to avoid any potential confusion. Thanks!

export async function getCommentsByQuery(query: string, resultsLimit: number): Promise<Comment[]> {
  try {
    const res = await fetch(`${API_URL}/comments?body_like=${query}&_limit=${resultsLimit}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error();
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
