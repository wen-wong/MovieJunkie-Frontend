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
		/* fetchMovies - Fetches latest movies from the TMDB API */
		async fetchMovies() {
			const movieResponse = await axios.get(`http://localhost:8080/discover/1`);
			this.movieList = movieResponse.data.results;
			this.isMovieList = this.movieList.length != null && this.movieList.length > 0;
		},
		/* searchMovies - Fetches movies based on the user's query */
		async searchMovies(event) {
			if (!event.target.value) {
				this.isMovieList = false;
				return;
			}
			const movieResponse = await axios.get(
				`http://localhost:8080/search?query=${event.target.value}`
			);
			this.movieList = movieResponse.data.results;
			this.isMovieList = this.movieList.length != null && this.movieList.length > 0;
		}
	},
	async mounted() {
		await this.fetchMovies();
	}
};
</script>

<template>
	<div class="search-container">
		<div class="hero-container">
			<div class="hero-title">What would you like to watch?</div>
		</div>
		<div class="search-bar-container">
			<div class="search-bar">
				<div class="search-bar-content">
					<!-- Search Bar to query movies -->
					<label for="movie-search">Search for a movie</label>
					<input
						type="search"
						id="movie-search"
						name="movie-search"
						placeholder="Search for your favorite movie"
						@input="searchMovies"
					/>
				</div>
			</div>
		</div>
		<div class="movie-container">
			<!-- If movies have been found -->
			<div v-if="isMovieList" class="movie-content">
				<MovieCard
					v-for="movie in movieList"
					:title="movie.title"
					:description="movie.overview"
					:id="movie.id"
					:image_url="movie.poster_path"
				/>
			</div>
			<!-- If no movies have been found -->
			<div v-else class="movie-error">
				<div>No Movies Found. Would you like to refresh the list of movies?</div>
				<button class="movie-refresh" v-on:click="fetchMovies">Refresh</button>
			</div>
		</div>
	</div>
</template>

<style>
.search-container {
	display: flex;
	flex-direction: column;
	justify-items: center;
	min-height: 100vh;
	width: 100%;
}

.hero-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	vertical-align: middle;
	min-height: 24rem;
	background-color: hsl(260, 50%, 70%, 0.25);
}

.hero-title {
	display: flex;
	justify-content: center;
	font-weight: bold;
	font-size: 1.953rem;
}

.search-bar-container {
	display: flex;
	justify-content: center;
	transform: translate(0%, -50%);
}

.search-bar {
	width: 60rem;
	min-height: 10rem;
	background-color: white;
	border-radius: 1rem;
	box-shadow: 0px 5px 10px hsl(0, 0%, 50%);
}

.search-bar-content {
	display: flex;
	flex-direction: column;
	margin: 2rem;
}

label {
	font-size: 1rem;
	font-weight: bold;
	padding-bottom: 0.5rem;
}

input {
	font-size: 1rem;
	padding: 0.75rem;
	border: 0.01rem solid grey;
	border-radius: 0.5rem;
	color: var(--color-text);
	background-color: var(--background-color);
}

.movie-container {
	display: flex;
	justify-content: center;
	transform: translate(0%, -2%);
}

.movie-content {
	width: 60rem;
	display: grid;
	grid-template-columns: repeat(4, auto);
	justify-content: space-between;
}

.movie-error {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 2rem;
	font-size: 1.25rem;
	font-weight: bold;
}

.movie-refresh {
	margin: 1rem;
	padding: 1rem 3rem;
	font-size: 1rem;
	border-radius: 0.5rem;
	color: white;
	background-color: black;
}
</style>
