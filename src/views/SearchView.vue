<script>
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";

export default {
	components: {
		MovieCard
	},
	data() {
		return {
			movieList: [],
			isMovieList: [false]
		};
	},
	methods: {
		async fetchMovies() {
			const movieResponse = await axios.get(
				`https://api.themoviedb.org/3/discover/movie?api_key=f4a943efca00a3cd96ac56ff8ad1ea3c`
			);
			this.movieList = movieResponse.data.results;
		},
		async searchMovies(event) {
			if (!event.target.value) return;
			const movieResponse = await axios.get(
				`https://api.themoviedb.org/3/search/movie?api_key=f4a943efca00a3cd96ac56ff8ad1ea3c&query=${event.target.value}`
			);
			this.movieList = movieResponse.data.results;
		}
	},
	async mounted() {
		await this.fetchMovies();
	}
};
</script>

<template>
	<div class="search">
		<div class="search-bar">
			<label for="movie-search">Search for a movie</label>
			<input
				type="search"
				id="movie-search"
				name="movie-search"
				placeholder="Search for your favorite movie"
				@input="searchMovies"
			/>
		</div>
		<div v-if="(movieList.length = 0)" class="movie-container">
			<MovieCard
				v-for="movie in movieList"
				:title="movie.title"
				:description="movie.overview"
				:id="movie.id"
			/>
		</div>
		<div v-else class="movie-error">No Movies Found. Please change your request...</div>
	</div>
</template>

<style>
.search {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.search-bar {
	display: flex;
	flex-direction: column;
}

.movie-container {
	margin: 1rem 0rem;
}

label {
	font-size: 1rem;
	font-weight: bold;
	line-height: 2rem;
}

input {
	font-size: 1.25rem;
	width: 100vh;
	padding: 0.75rem;
	border: 0.01rem solid grey;
	border-radius: 0.5rem;
	color: var(--color-text);
	background-color: var(--background-color);
}

.movie-error {
	margin: 2rem;
	font-size: 1.25rem;
	font-weight: bold;
}
</style>
