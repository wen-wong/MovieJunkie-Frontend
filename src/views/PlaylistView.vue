<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";

export default {
	components: {
		NavBar
	},
	data() {
		return {
			playlist: {
				id:0,
				accountDTO: {
					username: "hello"
				},
				title: "Qui tempor velit Lorem ullamco commodo proident.",
				description:
					"Anim incididunt excepteur aute fugiat exercitation nostrud. Aute velit non dolor est aute ea enim non laborum ipsum id. Quis commodo nisi exercitation in pariatur tempor amet culpa quis proident ea sunt nulla. Irure amet quis ex esse anim pariatur voluptate exercitation elit.",
				movieDTOList: [
					{
						title: "Ea aute ex ut ipsum quis dolore magna esse sunt irure in esse ad.",
						overview:
							"Cillum nulla deserunt aliqua ea aliquip ut esse in dolor aliquip. Fugiat non adipisicing officia et ad esse ipsum consectetur dolor. Occaecat Lorem ex occaecat tempor quis eiusmod laborum.",
						id: 1
					},
					{
						title: "Ea aute ex ut ipsum quis dolore magna esse sunt irure in esse ad.",
						overview:
							"Cillum nulla deserunt aliqua ea aliquip ut esse in dolor aliquip. Fugiat non adipisicing officia et ad esse ipsum consectetur dolor. Occaecat Lorem ex occaecat tempor quis eiusmod laborum.",
						id: 1
					},
					{
						title: "Ea aute ex ut ipsum quis dolore magna esse sunt irure in esse ad.",
						overview:
							"Cillum nulla deserunt aliqua ea aliquip ut esse in dolor aliquip. Fugiat non adipisicing officia et ad esse ipsum consectetur dolor. Occaecat Lorem ex occaecat tempor quis eiusmod laborum.",
						id: 1
					},
					{
						title: "Ea aute ex ut ipsum quis dolore magna esse sunt irure in esse ad.",
						overview:
							"Cillum nulla deserunt aliqua ea aliquip ut esse in dolor aliquip. Fugiat non adipisicing officia et ad esse ipsum consectetur dolor. Occaecat Lorem ex occaecat tempor quis eiusmod laborum.",
						id: 1
					},
					{
						title: "Ea aute ex ut ipsum quis dolore magna esse sunt irure in esse ad.",
						overview:
							"Cillum nulla deserunt aliqua ea aliquip ut esse in dolor aliquip. Fugiat non adipisicing officia et ad esse ipsum consectetur dolor. Occaecat Lorem ex occaecat tempor quis eiusmod laborum.",
						id: 1
					}
				]
			}
		};
	},methods: {
    editPlaylistOrderUp(playlistID, movieID) {
      const cookie = decodeURIComponent(document.cookie).split("=")[1];
      const movieIndex = this.playlist.movieDTOList.findIndex(movie => movie.id === movieID);

      if (movieIndex > 0) {
        const previousMovie = this.playlist.movieDTOList[movieIndex - 1];
        this.$set(this.playlist.movieDTOList, movieIndex - 1, this.playlist.movieDTOList[movieIndex]);
        this.$set(this.playlist.movieDTOList, movieIndex, previousMovie);
        axios.post(`http://localhost:8080/${cookie}/playlist/${playlistID}/${movieID}/1/edit-order`)
            .catch((error) => {
              console.log(error);
            });
      }
    },
    editPlaylistOrderDown(playlistID, movieID) {
      const cookie = decodeURIComponent(document.cookie).split("=")[1];
      const movieIndex = this.playlist.movieDTOList.findIndex(movie => movie.id === movieID);

      if (movieIndex < this.playlist.movieDTOList.length - 1) {
        const nextMovie = this.playlist.movieDTOList[movieIndex + 1];
        this.$set(this.playlist.movieDTOList, movieIndex + 1, this.playlist.movieDTOList[movieIndex]);
        this.$set(this.playlist.movieDTOList, movieIndex, nextMovie);
        axios.post(`http://localhost:8080/${cookie}/playlist/${playlistID}/${movieID}/0/edit-order`)
            .catch((error) => {
              console.log(error);
            });
      }
    }
  }
};
</script>
<template>
	<div class="playlist-background"></div>
	<NavBar />
	<div class="playlist-container">
		<div class="playlist-content">
			<div class="playlist-title">{{ playlist.title }}</div>
			<div class="playlist-description">{{ playlist.description }}</div>
			<div class="playlist-author">Created by {{ playlist.accountDTO.username }}</div>
		</div>
		<div class="playlist-movies-container">
			<div class="playlist-movie-item" v-for="movie in playlist.movieDTOList">
				<div class="playlist-movie-manage">
					<img
						class="nav-item nav-icon"
						src="../assets/icons/arrow_upward_24px.svg"
						alt="moviejunkie-logo"
						@click="editPlaylistOrderUp(playlist.id,movie.id)"
					/>
					<img
						class="nav-item nav-icon"
						src="../assets/icons/delete_forever_24px.svg"
						alt="moviejunkie-logo"
						@click="returnHome"
					/>
					<img
						class="nav-item nav-icon"
						src="../assets/icons/arrow_downward_24px.svg"
						alt="moviejunkie-logo"
						@click="editPlaylistOrderDown(playlist.id,movie.id)"
					/>
				</div>
				<div class="playlist-movie-content">
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
	margin-top: 6rem;
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
</style>
