
# Comment Finder App

## Overview

The **Comment Finder** app allows users to search for specific words within comments. By querying an API, the app retrieves comments and displays results that match the user's search term.

This project was built using the following technologies and tools: ShadCN/UI for UI components, ReactJS for building the user interface, Next.js as the framework, TypeScript for type safety, Vitest for testing, TanStack for query caching, TanStack Persist for data persistence, and TailwindCSS for styling.

## Installation
I used Node.js version `23.6.0` and npm version `10.9.2` for managing dependencies and running the project.

#### Locally
To start the project locally, run `npm i` and `npm run dev`.

#### Docker

To start the project in a Docker container, run `docker build -t comment_search:latest .` to build the image and `docker run -p 8080:8080 comment_search:latest` to start the container.

## Testing

The application has been tested using Vitest and React Testing Library. These tests verify that the search input renders, search validation works, and comments are displayed correctly based on the query.

Key tests are:

- **Rendering UI**: Tests whether the search input field and the search button are present.
- **Tooltip Display**: Tests that a tooltip shows up when the query is invalid (less than 3 characters).
- **Search Request**: Tests that the fetch request doesn’t happen when the search query is too short.
- **Display Comments**: Tests that comments are displayed correctly (comment with a maximum length of 64 characters) when a valid search is made.

## Error Boundary

The app includes an Error Boundary component that wraps the main UI to handle potential errors and shows an error fallback message instead.

## Bonus Track - Typeahead Feature

The Typeahead feature is a bonus track that is still in progress (not completed yet) and is available in a separate branch called `typeahead-feature`.

## Clarifications on Docker

I noticed that the command suggested in the assignment (`docker build -t comment_search:latest Dockerfile`) **does not work on Mac**. In fact, it returns `ERROR: unable to prepare context: path "Dockerfile" not found`.

To ensure Docker can find all the necessary files, I usually use `docker build -t comment_search:latest -f Dockerfile .`, where the final dot represents the context.

Alternatively, if you don't specify the `-f` option, Docker will look for a Dockerfile in the current directory by default:
`docker build -t comment_search:latest .`
This ensures Docker can find all the necessary files to build the image.

## API Fetching Note

I read the assignment and noticed that the API at [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) is currently powered by the stable version of JSON Server (v0), as documented in the official docs. Therefore, the filter to use is the one documented here: [JSON Server v0 Filtering Documentation](https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#filter).

Additionally, Mockend is a similar API service, but it uses a different filtering method that doesn't match the one used by the JSONPlaceholder API. I just wanted to point this out to avoid any potential confusion. Thanks!

## Final Notes

The code is commented, and there are additional notes explaining the choices made and the reasons behind the approach and design of the project. Thank you once again, and feel free to reach out if you have any questions. Best regards!
