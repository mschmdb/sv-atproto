<script lang="ts">
	import { page } from '$app/stores';
	import { marked, Renderer } from 'marked';
	import MarkdownImage from '$lib/components/MarkdownImage.svelte';
	$inspect($page);

	// Retrieve the blog post data from SSR state
	let blog = $state($page.data.props.blog);
	$inspect('blog', blog);

	// Function to extract the first image URL from the Markdown content
	function extractFirstImage(content: string): string | null {
		const match = content.match(/!\[.*?\]\((.*?)\)/);
		return match ? match[1] : null;
	}

	// Get the first image URL to display as the header image if available
	const blogImage = extractFirstImage(blog.content);

	// Custom renderer for marked to replace images with <MarkdownImage /> component placeholders
	const renderer = new Renderer();
	renderer.image = ({ href, title, text }) => {
		// Replace image markdown with a placeholder component marker
		return `<markdown-image src="${href}" alt="${text || ''}"></markdown-image>`;
	};

	// Parse the blog content using the custom renderer
	const parsedContent = marked(blog.content, { renderer });
</script>

<main class="min-h-screen bg-gray-100 p-8">
	<article class="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-4xl font-bold text-gray-800">{blog.title}</h1>

		<!-- Display the extracted blog image at the top if available -->
		{#if blogImage}
			<MarkdownImage src={blogImage} alt="Blog image" />
		{/if}

		<!-- Render the parsed content and replace placeholders with components -->
		<div class="prose prose-blue mb-4 max-w-none">
			{@html parsedContent}
		</div>

		<p class="mt-4 text-sm text-gray-500">
			<em>Posted on {new Date(blog.createdAt).toLocaleDateString()}</em>
		</p>
	</article>
</main>

<!-- Replace markdown-image placeholders with actual MarkdownImage components -->
<svelte:head>
	<script>
		document.querySelectorAll('markdown-image').forEach(node => {
			const src = node.getAttribute('src');
			const alt = node.getAttribute('alt');
			const imageComponent = new MarkdownImage({ target: node, props: { src, alt } });
		});
	</script>
</svelte:head>
