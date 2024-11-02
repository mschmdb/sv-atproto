<script lang="ts">
	import { page } from '$app/stores';
	import { marked } from 'marked'; // Import marked for Markdown parsing
	import { Image } from '@unpic/svelte';
	$inspect($page);

	// Retrieve the blog post data from SSR state
	let blog = $state($page.data.props.blog);
	$inspect('blog', blog);

	// Function to extract the first image URL from the Markdown content
	function extractFirstImage(content: string): string | null {
		const match = content.match(/!\[.*?\]\((.*?)\)/);
		return match ? match[1] : null;
	}

	// Get the image URL if it exists, but keep the original content unchanged
	const blogImage = extractFirstImage(blog.content);

	// Parse the content as HTML using marked
	const parsedContent = marked(blog.content);
</script>

<main class="min-h-screen bg-gray-100 p-8">
	<article class="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-4xl font-bold text-gray-800">{blog.title}</h1>

		<!-- Display the extracted blog image at the top if available -->
		{#if blogImage}
			<Image
				src={blogImage}
				layout="constrained"
				alt="Blog image"
				width={800}
				height={600}
				class="mb-6 h-64 w-full rounded-md object-cover"
			/>
		{/if}

		<!-- Render the parsed content as HTML -->
		<div class="prose prose-blue mb-4 max-w-none">
			{@html parsedContent}
		</div>

		<p class="mt-4 text-sm text-gray-500">
			<em>Posted on {new Date(blog.createdAt).toLocaleDateString()}</em>
		</p>
	</article>
</main>
