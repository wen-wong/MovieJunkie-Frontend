<script>
export default {
	props: ["title"]
};
</script>

<template>
    <v-card class="card" pa="4">{{ title }}</v-card>
</template>

<style>
.card {
    margin: 0.5rem 0.25rem;
    padding: 6px;
	border: 0.01rem solid grey;
	color: grey;
	border-radius: 1rem;
    pointer-events: none;
}
</style>