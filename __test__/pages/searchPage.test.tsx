import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { TestQueryClientProvider } from '../utils/testQueryClientProvider';
import SearchPage from '@/app/page';

test('renders SearchPage correctly', () => {
  render(
    <TestQueryClientProvider>
      <SearchPage />
    </TestQueryClientProvider>,
  );

  expect(screen.getByRole('textbox', { name: 'Search for a comment' })).toBeDefined();
});
