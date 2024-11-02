<!-- src/lib/components/MarkdownImage.svelte -->
<script lang="ts">
	import { Image } from '@unpic/svelte';

	export let src: string;
	export let alt: string = '';
</script>

<Image
	src={src}
	alt={alt}
	layout="constrained"
	width={800}
	height={600}
	style="width: 100%; height: auto; margin-bottom: 1em;"
/>
