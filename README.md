# SvelteKit Blog with AT Protocol and Vercel ISR

This repository hosts a SvelteKit 5 blog project that integrates with the AT Protocol to fetch and display blog posts. The project uses Vercel's Incremental Static Regeneration (ISR) to ensure blog content remains fresh without requiring full redeployments. 

> [!IMPORTANT]  
> **This repository is still under development.** Basic functionalities are in place, but additional features are actively being worked on.

## Features

- **SvelteKit 5** for modern frontend development.
- **AT Protocol** integration to fetch and display blog posts from a compatible backend.
- **Incremental Static Regeneration (ISR)** on Vercel to cache and revalidate pages periodically.
- **`unpic` Image Optimization** for optimized image delivery.
- **Markdown Rendering** with `marked` to render rich content.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [pnpm](https://pnpm.io/) package manager

## Getting Started

### 1. Clone the Repository
### 2. Install Dependencies

This project uses `pnpm`. Install dependencies with:

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the root of your project based on the provided `.env.example` file:

```bash
cp .env.example .env
```

Edit `.env` with the following environment variables:

```plaintext
ATP_SERVICE=https://bsky.social
ATP_IDENTIFIER=your-handle.bsky.social
ATP_PASSWORD=your-app-specific-password
```

- **`ATP_SERVICE`**: The URL of the AT Protocol service (default: `https://bsky.social`).
- **`ATP_IDENTIFIER`**: Your AT Protocol handle (e.g., `afaikfyi.bsky.social`).
- **`ATP_PASSWORD`**: Your app-specific password for authentication with the AT Protocol service.

### 4. Configure Vercel ISR

This project uses Vercel’s caching headers for ISR. Pages are cached for 5 minutes and revalidated in the background for up to 10 minutes. No additional setup is required for ISR if you deploy on Vercel, as the headers are managed in the code.

## Project Structure

- **`src/lib/atprotoClient.js`**: Contains functions to authenticate and fetch blog posts from the AT Protocol service.
- **`src/routes/+page.server.js`**: Fetches and caches the blog list page with ISR.
- **`src/routes/[slug]/+page.server.js`**: Handles fetching a single blog post based on the slug with ISR.

## Running the Project

To start the development server:

```bash
pnpm dev
```

This command will launch the SvelteKit app at `http://localhost:5173` by default.

## Deployment

This project is configured to work with [Vercel](https://vercel.com/). You can deploy it directly by linking your repository to Vercel.

### Deploying to Vercel

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Go to [Vercel](https://vercel.com/) and create a new project.
3. Link your repository and select the correct settings.
4. Add the environment variables (`ATP_SERVICE`, `ATP_IDENTIFIER`, `ATP_PASSWORD`) in the Vercel project settings under **Environment Variables**.
5. Deploy the project.

### Vercel ISR

This project uses Vercel’s ISR to automatically revalidate content. The ISR configuration is set directly in SvelteKit’s load functions using the config export with the following settings:

```export const config = {
isr: {
    expiration: 60, // 1-minute revalidation interval
  },
};
```


This tells Vercel to revalidate the page every 60 seconds, ensuring fresh content while minimizing server load.

## Usage and Configuration

### Blog List Page

- **Route**: `/`
- **Data Fetching**: `+page.server.js` fetches a list of blogs from the AT Protocol service and caches it with ISR.
- **Image Optimization**: The first image in each blog post is extracted and optimized with `unpic`.

### Individual Blog Post Page

- **Route**: `/[slug]`
- **Data Fetching**: `+page.server.js` in the `[slug]` directory fetches a specific blog post based on its slug and caches it with ISR.
- **Markdown Parsing**: The content is rendered as HTML using `marked`.
- **Image Optimization**: The header image and any images within the content are rendered using `unpic` for optimized delivery.

## Development Notes

- **pnpm**: This project uses `pnpm` for faster, disk space-efficient package management.
- **SvelteKit 5**: Make sure you’re familiar with SvelteKit 5’s Runes for state management.
- **Error Handling**: Error handling is basic; consider adding more detailed error responses and fallback content for production use.

## Troubleshooting

1. **Authentication Issues**: Make sure your `ATP_IDENTIFIER` and `ATP_PASSWORD` are correct. If you’re having trouble logging in, try regenerating your app-specific password.
2. **Cache Not Updating**: Remember that ISR may take up to 10 minutes to revalidate. For immediate cache clearing, you can trigger a redeployment on Vercel or use Vercel’s API to purge the cache manually.

## Contributing

Feel free to open issues and pull requests for improvements. Please ensure any contributions follow the coding standards and include relevant documentation updates.
