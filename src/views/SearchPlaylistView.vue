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
			isPlaylistList: true
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
		<div class="play-background"></div>
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
		<div v-else class="play-list-container">
			<div class="play-list-error">
				<div class="play-list-title-error">
					No playlist found. Click on the refresh button
				</div>
			</div>
		</div>
		<button class="playlist-refresh" v-on:click="fetchPlaylist()">Refresh</button>
	</div>
</template>
<style>
.play-background {
	position: absolute;
	top: 0;
	width: 100vw;
	height: 24rem;
	background-color: hsl(260, 50%, 70%, 0.25);
	z-index: 0;
}
.play-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	width: 100%;
	background-color: white;
	z-index: -1;
}
.play-title {
	max-width: 60rem;
	width: 60%;
	margin-top: 10.5rem;
	margin-bottom: 1rem;
	display: flex;
	justify-content: center;
	font-weight: bold;
	font-size: 1.953rem;
	z-index: 1;
}
.play-list-container {
	margin: 4rem 0rem 0rem;
	width: 60rem;
	display: flex;
	flex-direction: column;
	z-index: 1;
}

.play-list-item:hover {
	box-shadow: 0px 5px 10px hsl(0, 0%, 50%);
	border: none;
}

.play-list-item,
.play-list-error {
	width: 55rem;
	min-height: 6rem;
	margin: 0.5rem 0rem;
	padding: 1.5rem 2rem;
	border-radius: 1rem;
	background-color: white;
	border: 1px rgb(224, 224, 224) solid;
}
.play-list-card {
	color: black;
}
.play-list-title {
	font-size: 1.5rem;
	font-weight: bold;
}
.play-list-title-error {
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
.playlist-refresh {
	margin: 1rem;
	padding: 1rem 0rem;
	font-size: 1rem;
	border-radius: 0.5rem;
	color: white;
	background-color: black;
}
</style>
