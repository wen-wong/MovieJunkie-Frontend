<script>
export default {
	props: ["title"]
};
</script>

<template>
	<div class="card" pa="4">{{ title }}</div>
</template>

<style>
.card {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	margin: 0.5rem 0.25rem;
	padding: 0.75rem 1rem;
	border: 0.01rem solid grey;
	color: grey;
	border-radius: 5rem;
	pointer-events: none;
	height: 1rem;
	width: fit-content;
}
</style>
