<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";

export default {
	components: {
		NavBar
	},
	data() {
		return {
			playlistList: [],
			isPlaylistList: false
		};
	},
	methods: {
		routeToPlaylist(id) {
			this.$router.push({ name: "playlist", params: { id: `${id}` } });
		},
		async fetchPlaylist() {
			const cookie = decodeURIComponent(document.cookie).split("=")[1];
			const playlistResponse = await axios.get(`http://localhost:8080/${cookie}/playlists`);
			if (playlistResponse != undefined && playlistResponse.data.length > 0) {
				this.isPlaylistList = true;
				this.playlistList = playlistResponse.data;
			} else {
				this.isPlaylistList = false;
			}
		}
	},
	async mounted() {
		this.fetchPlaylist();
	}
};
</script>
<template>
	<NavBar />
	<div class="play-container">
		<div class="play-title">Let's see your favorite movies</div>
		<div v-if="isPlaylistList" class="play-list-container">
			<div
				v-for="play in playlistList"
				class="play-list-item"
				v-on:click="routeToPlaylist(play.id)"
			>
				<div>
					<div class="play-list-title">{{ play.title }}</div>
					<div class="play-list-description">{{ play.description }}</div>
					<div class="play-list-size">
						Number of movies: {{ play.movieDTOList.length }}
					</div>
				</div>
			</div>
		</div>
		<div v-else class="play-description">
			No movies found. Please create a movie under your Account Profile.
		</div>
	</div>
</template>
<style>
.play-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	width: 100%;
	background-color: hsl(260, 50%, 70%, 0.25);
}
.play-title {
	width: 60%;
	margin-top: 10rem;
	font-weight: bold;
	font-size: 2rem;
}
.play-list-container {
	margin: 2rem 0rem;
	width: 60%;
	display: flex;
	flex-direction: column;
}
.play-list-item {
	width: 100%;
	min-height: 6rem;
	margin: 0.5rem 0rem;
	padding: 1.5rem 2rem;
	border-radius: 0.5rem;
	background-color: white;
}
.play-list-card {
	color: black;
}
.play-list-title {
	font-size: 1.5rem;
	font-weight: bold;
}
.play-list-description {
	width: 100%;
	overflow: hidden;
	overflow-wrap: break-word;
}
.play-list-size {
	color: grey;
}
.play-description {
	width: 60%;
	font-size: 1rem;
}
</style>
