import { expect, test, describe, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import SearchPage from '@/app/page';
import { Comment } from '@/types/Comment';

import { TestQueryClientProvider } from '../utils/testQueryClientProvider';

// Fetch method mocking
vi.mock('node-fetch', async () => {
  const originalModule = await vi.importActual('node-fetch');
  return {
    ...originalModule,
    default: vi.fn(),
  };
});

describe('SearchPage', () => {
  let searchInput: HTMLElement, searchSubmitButton: HTMLElement;

  const mockCommentBody =
    'This enim is a comment This is a comment This is a comment This is a comment';

  // Reset before each test run
  beforeEach(() => {
    // Mock fetch method with vitest
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' },
      json: async (): Promise<Comment[]> => [
        {
          postId: 1,
          id: 1,
          name: 'Test Comment',
          email: 'test@example.com',
          body: mockCommentBody,
        },
      ],
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
  test('Should render the search input and submit button', () => {
    expect(searchInput).not.toBeNull();
    expect(searchSubmitButton).not.toBeNull();
  });

  // 2.
  test('Should show tooltip when an empty search query is submitted', async () => {
    // Simulate the click event of search button
    fireEvent.click(searchSubmitButton);

    // Get the tooltip content
    const tooltip = screen.queryByText(/search requires more than 3 characters/i);

    // Check if the tooltip exist within the page
    expect(tooltip).not.toBeNull();
  });

  // 3.
  test('Should check there are not results and show tooltip when search query is <= 3 characters', async () => {
    fireEvent.change(searchInput, { target: { value: '123' } });

    // Simulate the click event of search button
    fireEvent.click(searchSubmitButton);

    // Get the tooltip content
    const tooltip = screen.queryByText(/search requires more than 3 characters/i);

    // Check if the tooltip exist within the page
    expect(tooltip).not.toBeNull();

    // Get the card, so the results
    const card = screen.queryByRole('article');

    // Result should be not visible
    expect(card).toBeNull();
  });

  // 4.
  test('Should render results', async () => {
    const query = 'enim';

    fireEvent.change(searchInput, { target: { value: query } });

    // Simulate the click event of search button
    fireEvent.click(searchSubmitButton);

    // Get the tooltip content
    const tooltip = screen.queryByText(/search requires more than 3 characters/i);

    // Check if the tooltip exist within the page
    expect(tooltip).toBeNull();

    // Wait for a result (card)
    const card = await screen.findByRole('article');

    // Result should be visible
    expect(card).not.toBeNull();
  });
});
