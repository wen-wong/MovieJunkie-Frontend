<script>
import AccountDropdown from '@/components/AccountDropdown.vue';
import axios from 'axios';

export default {

  components: {
    AccountDropdown,
  },
  data() {
    return {
      "showModal": false,
      "edit": false,
      "del": false,
      "username": "",
      "password": "",
      "email": "",
    }
  },
  methods: {
    handleOptionSelected(option) {
      if(option == "Edit Account"){
        //add logic to redirect to popup (once popup is implemented)
        this.showModal = true;
        this.edit = true;
        this.del = false;
        console.log("Redirecting to edit account popup")
      }
      if(option == "Delete Account"){
        //add logic to redirect to popup (once popup is implemented)
        this.showModal = true;
        this.del = true;
        this.edit = false;
        console.log("Redirecting to delete account popup")
      }
    },

    editAccount(username, email, password){
      console.log("Editing account with username, email, password:" + username + " " + email + " " + password);
      this.edit = false;
      this.showModal = false;
      axios.post('http://localhost:8080/account/edit/', {
        username: username,
        password: password,
        email: email
      })
          .catch(error => {
            console.log(error)
          })
    },

    deleteAccount(username, password){
      console.log("Deleting account with username and password: " + username + " " + password)
      this.del = false;
      this.showModal = false;
      axios.post('http://localhost:8080/account/delete/', {
        username: username,
        password: password
      })
          .catch(error => {
            console.log(error)
          })
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
  <div v-if="showModal" id="modal-overlay" ref="modalOverlay">
    <div id="modal" ref="modal">
      <div v-if="edit">
        <h1> Edit Account </h1>
        <div class="NameInput">
          <p>Username*</p>
          <input v-model="username" placeholder="Enter your username"/>
        </div>
        <div class="EmailInput">
          <p>Email*</p>
          <input v-model="email" placeholder="Enter your new email"/>
        </div>
        <div class="PasswordInput">
          <p>Password*</p>
          <input v-model="password" placeholder="Enter your password"/>
        </div>
        <div class="SignUpButton">
          <button class="button" @click="editAccount(username, email, password)">Confirm Changes</button>
        </div>
      </div>
      <div v-if="del">
        <h1> Delete Account </h1>
        <div class="NameInput">
          <p>Username*</p>
          <input v-model="username" placeholder="Enter your username"/>
        </div>
        <div class="PasswordInput">
          <p>Password*</p>
          <input v-model="password" placeholder="Enter your password"/>
        </div>
        <div class="SignUpButton">
          <button class="button" @click="deleteAccount(username, password)">Confirm Changes</button>
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

#modal-overlay #modal {
  max-width: 35rem;
  width: 100%;
  background: white;
  height: 40rem;
  border-radius: 8px;
}

#modal{
  position: center;
}

.button{
  cursor: pointer;
}
</style>
