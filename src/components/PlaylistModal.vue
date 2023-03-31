<script>
import axios from "axios";
export default {
	props: ["playlists"],
	methods: {
		async addMovieToPlaylist() {
			const tableRows = document.getElementsByClassName("playlist-row");
			const movieId = window.location.pathname.split("/")[2];

			for (let item of tableRows) {
				if (item.firstChild.firstChild.checked) {
					const playlistId = item.lastChild.textContent;
					const username = this.$cookies.get("username");

					const response = await axios
						.get(`http://localhost:8080/movie/${movieId}`)
						.then(
							async () =>
								await axios.put(
									"http://localhost:8080/" +
										username +
										"/playlist/" +
										playlistId +
										"/add/?movieIds=" +
										movieId
								)
						)
						.catch(async () => {
							await axios.post(`http://localhost:8080/movie/${movieId}`);
							await axios.put(
								"http://localhost:8080/" +
									username +
									"/playlist/" +
									playlistId +
									"/add/?movieIds=" +
									movieId
							);
						});
				}
			}
		},
		submitModal() {
			this.addMovieToPlaylist();
			this.$emit("close-modal", 0);
		}
	},
	async mounted() {}
};
</script>

<template>
	<div class="modal-overlay" @click="$emit('close-modal')">
		<div class="modal">
			<img
				class="playlist-modal-icon"
				src="../assets/icons/clear_24px.svg"
				alt="exit-logo"
				@click="$emit('close-modal')"
			/>
			<div class="modal-container" @click.stop>
				<div style="width: 100%">
					<div class="playlist-modal-title">Choose a Playlist</div>
					<table class="table-layout">
						<tbody slot="body" slot-scope="{ playlists }">
							<tr
								class="playlist-row playlist-modal-content"
								v-for="row in playlists"
								:row="row"
							>
								<td><input type="checkbox" name="name1" class="checkbox" /></td>
								<td>{{ row.name }}</td>
								<td>
									<span style="color: transparent">{{ row.id }}</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<button class="btn-modal" @click="submitModal()">Submit</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal-overlay {
	color: black;
	background-color: rgba(0, 0, 0, 0.7);
	width: 100vw;
	height: 100%;
	display: flex;
	justify-content: center;
}

.modal {
	width: 25rem;
	height: 30%;
	min-height: 5rem;
	background-color: white;
	margin-top: 15%;
	border-radius: 8px;
	padding: 0rem 2rem 3rem;
}
.modal-container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}
.playlist-modal-title {
	font-size: 1.953rem;
	font-weight: bold;
}
.playlist-modal-content {
	width: 100%;
	display: flex;
	flex-direction: row;
}
.modal-item {
	margin: 0.5rem 0rem;
}
.container-div {
	background-color: white;
}

.table-layout {
	table-layout: fixed;
	width: 300px;
}

.playlist-row {
	margin: 0.5rem;
	text-align: center;
}

.checkbox {
	width: 2rem;
	height: 1rem;
	vertical-align: middle;
}
.btn-modal {
	width: 100%;
	font-size: 1rem;
	color: white;
	background: black;
	margin: 0.5rem 0.25rem;
	padding: 0.75rem;
	border-radius: 0.5rem;
	cursor: pointer;
}
.playlist-modal-icon {
	width: 30px;
	height: 30px;
	position: relative;
	top: 1rem;
	left: 24rem;
	z-index: 10;
	cursor: pointer;
}
</style>
