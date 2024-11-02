<script lang="ts">
	import { page } from '$app/stores';
	import { Image } from '@unpic/svelte';
	$inspect($page);

	// Retrieve blogs from SSR state
	let blogs = $state($page.data.props.blogs);
	$inspect(blogs);

	// Extract the first image URL from the Markdown if needed
	function extractImage(content: string): string | null {
		const match = content.match(/!\[.*?\]\((.*?)\)/);
		return match ? match[1] : null;
	}

	// Function to create an excerpt from content
	function createExcerpt(content: string, length: number = 200): string {
		const plainText = content.replace(/!\[.*?\]\(.*?\)/g, ''); // Remove image markdown
		return plainText.length > length ? plainText.slice(0, length) + '...' : plainText;
	}
</script>

<main class="min-h-screen bg-gray-100 p-8">
	<h1 class="mb-8 text-center text-4xl font-bold text-blue-700">My Blogs</h1>

	<div class="mx-auto grid max-w-3xl gap-8">
		{#each blogs as blog}
			<article class="rounded-lg bg-white p-6 shadow-lg">
				<h2 class="mb-4 text-2xl font-semibold text-gray-800">{blog.title}</h2>

				<!-- Render the extracted image if it exists -->
				{#if extractImage(blog.content)}
					<Image
						src={extractImage(blog.content) || ''}
						layout="constrained"
						alt="Blog image"
						width={800}
						height={600}
						class="mb-6 h-64 w-full rounded-md object-cover"
					/>
				{/if}

				<!-- Render an excerpt of the content as Markdown with mdsvex syntax -->
				<div class="prose prose-blue mb-4 max-w-none">
					{createExcerpt(blog.content)}
				</div>

				<a
					href={`/${blog.uri.split('/').pop()}`}
					class="font-semibold text-blue-600 hover:underline"
				>
					Read more...
				</a>

				<p class="mt-2 text-sm text-gray-500">
					<em>Posted on {new Date(blog.createdAt).toLocaleDateString()}</em>
				</p>
			</article>
		{/each}
	</div>
</main>
