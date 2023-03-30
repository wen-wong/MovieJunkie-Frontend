<template>
	<NavBar> </NavBar>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
	name: "AccountInformationView",
	components: { NavBar },

	props: {
		photoUrl: {
			type: String,
			default: "https://via.placeholder.com/150" // default stock photo
		}
	},

	methods: {
		editAccount() {
			console.log("you are now editing your account");
		}
	}
};
</script>

<style></style>
