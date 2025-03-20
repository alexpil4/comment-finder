'use server';

import { Comment } from '@/types/Comment';

const API_URL = process.env.API_URL;

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
