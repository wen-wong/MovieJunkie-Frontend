<script>
import axios from "axios";

import AccountDropdown from "@/components/AccountDropdown.vue";
export default {
	components: {
		AccountDropdown
	},
	data() {
		return {
			showModal: false,
			edit: false,
			del: false,
			createPlaylist: false,
			username: "",
			password: "",
			email: "",
			isEditError: false,
			editErrorMessage: "",
			isDeleteError: false,
			deleteErrorMessage: ""
		};
	},
	methods: {
		handleOptionSelected(option) {
			if (option == "Edit Account") {
				//add logic to redirect to popup (once popup is implemented)
				this.showModal = true;
				this.edit = true;
				this.del = false;
				this.createPlaylist = false;
			}
			if (option == "Delete Account") {
				//add logic to redirect to popup (once popup is implemented)
				this.showModal = true;
				this.del = true;
				this.edit = false;
				this.createPlaylist = false;
			}
			if (option == "Create Playlist") {
				this.showModal = true;
				this.del = false;
				this.edit = false;
				this.createPlaylist = true;
			}
		},

		async editAccount(username, email, password) {
			const editResponse = await axios
				.post("http://localhost:8080/account/edit/", {
					username: username,
					password: password,
					email: email
				})
				.then(() => {
					this.isEditError = false;
					this.$cookies.set("username", username);
					this.edit = false;
					this.showModal = false;
				})
				.catch((error) => {
					this.editErrorMessage = error.response.data;
					this.isEditError = true;
				});
		},

		deleteAccount(username, password) {
			axios
				.post("http://localhost:8080/account/delete/", {
					username: username,
					password: password
				})
				.then(() => {
					this.del = false;
					this.showModal = false;
					this.$cookies.set("username", null);
					this.isDeleteError = false;
					this.$router.push("/signup");
				})
				.catch((error) => {
					this.deleteErrorMessage = error.response.data;
					this.isDeleteError = true;
				});
		},
		createPlaylist1(title, description) {
			this.createPlaylist = false;
			const cookie = decodeURIComponent(document.cookie).split("=")[1];
			this.showModal = false;
			axios
				.post(
					`http://localhost:8080/${cookie}/playlist/create?title=${title}&description=${description}`
				)
				.catch((error) => {
					console.log(error);
				});
		},
		logout() {
			this.$cookies.set("username", null);
			this.$router.push("/login");
		},

		returnHome() {}
	}
};
</script>

<template>
	<div class="nav-container">
		<div class="nav-item-container nav-left">
			<img
				class="nav-item nav-icon"
				src="../assets/icons/camera_roll_30px.svg"
				alt="moviejunkie-logo"
				@click="returnHome"
			/>
			<div class="nav-item item-left" @click="returnHome">Movie Junkie</div>
		</div>
		<div class="nav-routes-container">
			<router-link :to="{ name: 'search' }">
				<div class="nav-route">Search</div>
			</router-link>
			<router-link :to="{ name: 'search_tag' }">
				<div class="nav-route">Hashtags</div>
			</router-link>
			<router-link :to="{ name: 'search_playlist' }">
				<div class="nav-route">Playlist</div>
			</router-link>
		</div>
		<div class="nav-item-container nav-right">
			<AccountDropdown
				:options="['Edit Account', 'Delete Account', 'Create Playlist']"
				@optionSelected="handleOptionSelected"
			/>
			<img
				class="nav-item nav-icon"
				src="../assets/icons/exit_to_app_30px.svg"
				alt="moviejunkie-logo"
				@click="logout"
			/>
		</div>
	</div>

	<div v-if="showModal" id="modal-overlay" ref="modalOverlay">
		<div id="modal" ref="modal">
			<img
				class="modal-icon"
				src="../assets/icons/clear_24px.svg"
				alt="exit-logo"
				@click="showModal = false"
			/>
			<div class="modal-container" v-if="edit">
				<div class="modal-title">Edit Account</div>
				<div class="modal-input-container">
					<label>Username*</label>
					<input
						type="text"
						class="modal-input"
						v-model="username"
						placeholder="Enter your username"
					/>
				</div>
				<div class="modal-input-container">
					<label>Email*</label>
					<input
						type="text"
						class="modal-input"
						v-model="email"
						placeholder="Enter your new email"
					/>
				</div>
				<div class="modal-input-container">
					<label>Password*</label>
					<input
						type="text"
						class="modal-input"
						v-model="password"
						placeholder="Enter your password"
					/>
				</div>
				<div class="modal-submit-container">
					<button class="button" @click="editAccount(username, email, password)">
						Confirm Changes
					</button>
				</div>
				<div class="modal-error" v-if="isEditError">
					<img src="../assets/icons/error_outline_24px_rounded.svg" alt="Error Icon" />
					<div class="modal-error-text">{{ editErrorMessage }}</div>
				</div>
			</div>
			<div class="modal-container" v-if="del">
				<div class="modal-title">Delete Account</div>
				<div class="modal-input-container">
					<label>Username*</label>
					<input
						class="modal-input"
						type="text"
						v-model="username"
						placeholder="Enter your username"
					/>
				</div>
				<div class="modal-input-container">
					<label>Password*</label>
					<input
						class="modal-input"
						type="text"
						v-model="password"
						placeholder="Enter your password"
					/>
				</div>
				<div class="modal-submit-container">
					<button class="button" @click="deleteAccount(username, password)">
						Confirm Changes
					</button>
				</div>
				<div class="modal-error" v-if="isDeleteError">
					<img src="../assets/icons/error_outline_24px_rounded.svg" alt="Error Icon" />
					<div class="modal-error-text">{{ deleteErrorMessage }}</div>
				</div>
			</div>

			<div class="modal-container" v-if="createPlaylist">
				<div class="modal-title">Create Playlist</div>
				<div class="modal-input-container">
					<label>Playlist Name*</label>
					<input
						class="modal-input"
						type="text"
						v-model="name"
						placeholder="Enter your playlist name"
					/>
				</div>
				<div class="modal-input-container">
					<label>Description</label>
					<input
						class="modal-input"
						type="text"
						v-model="description"
						placeholder="Enter a description for the playlist"
					/>
				</div>
				<div class="modal-submit-container">
					<button class="button" @click="createPlaylist1(name, description)">
						Create!
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.nav-container {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 2rem 0rem;
	padding: 1rem 4rem;
	font-size: 1.25rem;
	height: 5rem;
	z-index: 10;
	position: absolute;
	width: 90%;
}

.nav-item-container {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 15rem;
}

.nav-left {
	display: flex;
	justify-content: flex-start;
}

.nav-right {
	display: flex;
	justify-content: flex-end;
}

.nav-icon {
	height: 30px;
	width: 30px;
}

.nav-item {
	font-weight: bold;
	cursor: pointer;
}

.item-left {
	margin-left: 0.5rem;
}

.item-right {
	margin-right: 0.5rem;
}

#modal-overlay {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 20;
}

#modal {
	width: 30rem;
	background: white;
	border-radius: 8px;
	position: center;
	padding: 0rem 3rem 2rem;
	z-index: 30;
}

.modal-container {
	width: 100%;
}

.modal-title {
	font-weight: bold;
	font-size: 1.953rem;
	margin-bottom: 1rem;
}

.modal-input-container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin: 0.5rem 0rem;
}

.modal-input {
	width: 95%;
	font-size: 1rem;
	height: 1rem;
	border-radius: 0.5rem;
	padding: 0.75rem;
	border: grey solid 1px;
}

.modal-submit-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.button {
	width: 100%;
	cursor: pointer;
	font-size: 1rem;
	font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
		Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
	margin: 1rem 0rem;
	background: black;
	padding: 0.75rem 0.5rem;
	border-radius: 8px;
	color: white;
}

.modal-icon {
	width: 30px;
	height: 30px;
	position: relative;
	left: 30rem;
	top: 1rem;
	z-index: 10;
}
.nav-routes-container {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.nav-route {
	margin: 0rem 1rem;
	font-weight: normal;
}
.nav-route:hover {
	font-weight: bold;
}
.modal-error {
	display: flex;
	flex-direction: row;
	padding: 0.5rem;
	background: rgba(232, 125, 125, 0.3);
	border-radius: 8px;
}
.modal-error-text {
	margin-left: 0.5rem;
	font-weight: bold;
}
</style>
