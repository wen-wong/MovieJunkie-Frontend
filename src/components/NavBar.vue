<script>
import AccountDropdown from '@/components/AccountDropdown.vue'

export default {
  components: {
    AccountDropdown,
  },
  methods: {
    handleOptionSelected(option) {
      if(option == "Edit Account"){
        //add logic to redirect to popup (once popup is implemented)
        console.log("Redirecting to edit account popup")
      }
      if(option == "Delete Account"){
        //add logic to redirect to popup (once popup is implemented)
        console.log("Redirecting to delete account popup")
      }
    },

    logout(){
      console.log("Logging out")
    },

    returnHome(){
      console.log("Returning to home page")
    }
  },
};
</script>

<template>
	<div class="nav-container">
		<div class="nav-item-container">
			<img class="nav-item" src="../assets/icons/camera_roll_30px.svg" alt="moviejunkie-logo" @click="returnHome"/>
			<div class="nav-item item-left" @click="returnHome">Movie Junkie</div>
		</div>
		<div class="nav-item-container">
<!--			<button class="nav-item item-right">Account-->
        <AccountDropdown :options="['Edit Account', 'Delete Account']" @optionSelected="handleOptionSelected" />
<!--      </button>-->
			<img class ="nav-item" src="../assets/icons/exit_to_app_30px.svg" alt="moviejunkie-logo" @click="logout"/>
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
</style>
