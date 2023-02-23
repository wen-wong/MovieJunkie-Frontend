<script>
import AccountDropdown from "@/components/AccountDropdown.vue";
export default {
	components: {
		AccountDropdown
	},
	data() {
		return {
			showModal: false,
			edit: false,
			del: false
		};
	},
	methods: {
		handleOptionSelected(option) {
			if (option == "Edit Account") {
				//add logic to redirect to popup (once popup is implemented)
				this.showModal = true;
				this.edit = true;
				this.del = false;
				console.log("Redirecting to edit account popup");
			}
			if (option == "Delete Account") {
				//add logic to redirect to popup (once popup is implemented)
				this.showModal = true;
				this.del = true;
				this.edit = false;
				console.log("Redirecting to delete account popup");
			}
		},

		editAccount() {
			this.edit = false;
			this.showModal = false;
		},

		deleteAccount() {
			this.del = false;
			this.showModal = false;
		},

		logout() {
			console.log("Logging out");
		},

		returnHome() {
			console.log("Returning to home page");
		}
	}
};
</script>

<template>
	<div class="nav-container">
		<div class="nav-item-container">
			<img
				class="nav-item"
				src="../assets/icons/camera_roll_30px.svg"
				alt="moviejunkie-logo"
				@click="returnHome"
			/>
			<div class="nav-item item-left" @click="returnHome">Movie Junkie</div>
		</div>
		<div class="nav-item-container">
			<!--			<button class="nav-item item-right">Account-->
			<AccountDropdown
				:options="['Edit Account', 'Delete Account']"
				@optionSelected="handleOptionSelected"
			/>
			<!--      </button>-->
			<img
				class="nav-item"
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
					<label for="username">Username*</label>
					<input
						type="username"
						class="modal-input"
						v-model="text"
						placeholder="Enter your username"
					/>
				</div>
				<div class="modal-input-container">
					<label for="email">Email*</label>
					<input
						type="email"
						class="modal-input"
						v-model="text"
						placeholder="Enter your new email"
					/>
				</div>
				<div class="modal-input-container">
					<label for="password">Password*</label>
					<input
						type="password"
						class="modal-input"
						v-model="text"
						placeholder="Enter your password"
					/>
				</div>
				<div class="modal-submit-container">
					<button class="button" @click="editAccount">Confirm Changes</button>
				</div>
			</div>
			<div class="modal-container" v-if="del">
				<div class="modal-title">Delete Account</div>
				<div class="modal-input-container">
					<label for="username">Username*</label>
					<input
						class="modal-input"
						type="username"
						v-model="text"
						placeholder="Enter your username"
					/>
				</div>
				<div class="modal-input-container">
					<label for="password">Password*</label>
					<input
						class="modal-input"
						type="password"
						v-model="text"
						placeholder="Enter your password"
					/>
				</div>
				<div class="modal-submit-container">
					<button class="button" @click="deleteAccount">Confirm Changes</button>
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
}

.nav-item-container {
	display: flex;
	flex-direction: row;
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
}

#modal {
	width: 30rem;
	background: white;
	border-radius: 8px;
	position: center;
	padding: 0rem 3rem 2rem;
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
}

.modal-icon {
	width: 30px;
	height: 30px;
	position: relative;
	left: 30rem;
	top: 1rem;
	z-index: 10;
}
</style>
