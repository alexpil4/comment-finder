import { expect, test, describe, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import SearchPage from '@/app/page';
import { Comment } from '@/types/Comment';

import { TestQueryClientProvider } from '../utils/testQueryClientProvider';
import comments from '../mocks/comments.json';

// Fetch method mocking
vi.mock('node-fetch', async () => {
  const originalModule = await vi.importActual('node-fetch');
  return {
    ...originalModule,
    default: vi.fn(),
  };
});

describe('The SearchPage test', () => {
  let searchInput: HTMLElement, searchSubmitButton: HTMLElement;

  // Reset before each test run
  beforeEach(() => {
    // Mock fetch method with vitest
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' },
      json: async (): Promise<Comment[]> => comments,
    });

    // Page render
    render(
      <TestQueryClientProvider>
        <SearchPage />
      </TestQueryClientProvider>,
    );

    // Get search input
    searchInput = screen.getByRole('textbox', { name: /search for a comment/i });
    // Get search button
    searchSubmitButton = screen.getByRole('button', { name: /search button/i });
  });

  // Unmount react rendered element
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // 1.
  test('should render the search input and submit button', () => {
    expect(searchInput).not.toBeNull();
    expect(searchSubmitButton).not.toBeNull();
  });

  // 2.
  test('should show tooltip when an empty search query is submitted', () => {
    // Simulate the click event of search button
    fireEvent.click(searchSubmitButton);

    // Get the tooltip content
    const tooltip = screen.queryByText(/search requires more than 3 characters/i);

    // Check if the tooltip exist within the page
    expect(tooltip).not.toBeNull();
  });

  // 3.
  test('should not start request and show the proper tooltip when search query is <= 3 characters', async () => {
    // Simulate the click event of search button
    fireEvent.change(searchInput, { target: { value: 'abc' } });

    // Simulate the click event of search button
    fireEvent.click(searchSubmitButton);

    // Get the tooltip content
    const tooltip = screen.queryByText(/search requires more than 3 characters/i);
    // Check if the tooltip exist within the page
    expect(tooltip).not.toBeNull();

    // Check the card
    const cards = screen.queryAllByRole('article');
    // Result should be 0, no result cards exist
    expect(cards.length).toBe(0);
  });

  // 4.
  test('should render results with comments characters less than or equal to 64 ', async () => {
    // Simulated query
    const query = /enim/i;

    // Simulate query type
    fireEvent.change(searchInput, { target: { value: query } });

    // Simulate the click event of search button
    fireEvent.click(searchSubmitButton);

    // Get the tooltip content
    const tooltip = screen.queryByText(/search requires more than 3 characters/i);

    // Check if the tooltip exist within the page
    expect(tooltip).toBeNull();

    // Wait for result (card)
    const cards = await screen.findAllByRole('article');

    // Results should be exists
    cards.forEach((card) => {
      expect(card).not.toBeNull();
    });

    // Get comments preview element
    const paragraphs = screen.getAllByRole('paragraph', { name: /Comment preview/i });

    // For each comment:
    // 1. Get the comment length
    // 2. Check if the comment characters are less than or equal to 64
    paragraphs.forEach((paragraph) => {
      const charCount = paragraph.textContent?.length;
      expect(charCount).toBeLessThanOrEqual(64);
    });
  });
});
