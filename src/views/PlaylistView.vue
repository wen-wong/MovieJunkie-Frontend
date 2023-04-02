<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";

function swapMovies(playlist, firstIndex, secondIndex) {
	const temporary = playlist[firstIndex];
	playlist[firstIndex] = playlist[secondIndex];
	playlist[secondIndex] = temporary;
}

export default {
	components: {
		NavBar
	},
	data() {
		return {
			id: window.location.pathname.split("/")[2],
			playlist: null,
			isPlaylist: false,
			movieList: []
		};
	},
	methods: {
		findMovie(movies, movieID) {
			for (let i = 0; i < movies.length; i++) {
				if (movieID == movies[i].id) return i;
			}
			return -1;
		},
		async editPlaylistOrderUp(movieID, index) {
			if (index > this.playlist.movieDTOList.length || index == 0) return;
			const cookie = decodeURIComponent(document.cookie).split("=")[1];
			await axios
				.put(
					`http://localhost:8080/${cookie}/playlist/${this.playlist.id}/${movieID}/1/edit-order`
				)
				.then(() => {
					swapMovies(this.movieList, index - 1, index);
					swapMovies(this.playlist.movieDTOList, index - 1, index);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async editPlaylistOrderDown(movieID, index) {
			if (index == this.playlist.movieDTOList.length - 1) return;
			const cookie = decodeURIComponent(document.cookie).split("=")[1];
			await axios
				.put(
					`http://localhost:8080/${cookie}/playlist/${this.playlist.id}/${movieID}/0/edit-order`
				)
				.then(() => {
					swapMovies(this.movieList, index, index + 1);
					swapMovies(this.playlist.movieDTOList, index, index + 1);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async fetchMovies(movies) {
			movies.forEach(async (it) => {
				const response = await axios.get(`http://localhost:8080/movie/tmdb/${it.id}`);
				this.movieList.push({
					id: it.id,
					title: response.data.title,
					overview: response.data.overview,
					hashtags: it.hashtags
				});
				return;
			});
		},
		async fetchPlaylist() {
			await axios
				.get(`http://localhost:8080/playlist/${this.id}`)
				.then(async (result) => {
					this.playlist = result.data;
					this.isPlaylist = true;
					this.fetchMovies(this.playlist.movieDTOList);
				})
				.catch(() => {
					this.isPlaylist = false;
				});
		},
		async returnHome(movieID, index) {
			const cookie = decodeURIComponent(document.cookie).split("=")[1];
			await axios
				.put(
					`http://localhost:8080/${cookie}/playlist/${this.playlist.id}/remove-movie?movieId=${movieID}`
				)
				.then(() => {
					this.playlist.movieDTOList.splice(index, 1);
					this.movieList.splice(index, 1);
				});
		},
		routeToMovie(movieId) {
			this.$router.push({ name: "movie", params: { id: `${movieId}` } });
		}
	},
	async mounted() {
		this.fetchPlaylist();
	}
};
</script>
<template>
	<div class="playlist-background"></div>
	<NavBar />
	<div v-if="isPlaylist" class="playlist-container">
		<div class="playlist-content">
			<div class="playlist-title">{{ playlist.title }}</div>
			<div class="playlist-description">{{ playlist.description }}</div>
			<div class="playlist-author">Created by {{ playlist.accountDTO.username }}</div>
		</div>
		<div class="playlist-movies-container">
			<div class="playlist-movie-item" v-for="(movie, index) in movieList" :key="movie.id">
				<div class="playlist-movie-manage">
					<img
						:class="{
							'playlist-item playlist-icon': index != 0,
							'playlist-inv': index == 0
						}"
						src="../assets/icons/arrow_upward_24px.svg"
						alt="moviejunkie-logo"
						@click="editPlaylistOrderUp(movie.id, index)"
					/>

					<img
						class="playlist-item playlist-icon"
						src="../assets/icons/delete_forever_24px.svg"
						alt="moviejunkie-logo"
						@click="returnHome(movie.id, index)"
					/>
					<img
						:class="{
							'playlist-item playlist-icon':
								index != playlist.movieDTOList.length - 1,
							'playlist-inv': index == playlist.movieDTOList.length - 1
						}"
						src="../assets/icons/arrow_downward_24px.svg"
						alt="moviejunkie-logo"
						@click="editPlaylistOrderDown(movie.id, index)"
					/>
				</div>
				<div class="playlist-movie-content" @click="routeToMovie(movie.id)">
					<div class="playlist-movie-title">{{ movie.title }}</div>
					<div>{{ movie.overview }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.playlist-background {
	position: absolute;
	top: 0;
	width: 100vw;
	height: 24rem;
	z-index: -1;
	background-color: hsl(260, 50%, 70%, 0.25);
}
.playlist-container {
	width: 100vw;
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
}
.playlist-content {
	margin-top: 10.5rem;
	width: 60rem;
}
.playlist-movies-container {
	margin-top: 8rem;
}
.playlist-movie-content {
	width: 100%;
}
.playlist-movie-item {
	display: flex;
	flex-direction: row;
	width: 60rem;
	height: 10rem;
	background-color: white;
	z-index: 1;
	margin-bottom: 1rem;
	border-radius: 1rem;
	padding: 1.5rem 2rem;
	border: 1px rgb(224, 224, 224) solid;
}
.playlist-movie-item:hover {
	box-shadow: 0px 5px 10px hsl(0, 0%, 50%);
	border: none;
}
.playlist-movie-manage {
	min-width: 4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	margin-right: 2rem;
	z-index: 10;
}
.playlist-movie-title {
	font-size: 1.5rem;
	font-weight: bold;
}
.playlist-title {
	font-weight: bold;
	font-size: 1.953rem;
}
.playlist-description {
	max-height: 10rem;
	overflow: none;
}
.playlist-author {
	margin-top: 1rem;
	color: grey;
}
.playlist-item {
	z-index: 10;
}
.playlist-inv {
	visibility: hidden;
}
</style>
