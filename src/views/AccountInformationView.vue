<template>
  <div class="user-account">
    <img class="user-account__photo" :src="photoUrl" alt="User Photo">
    <div class="user-account__info">
      <h2 class="user-account__name">{{ firstname }} {{ lastname }}</h2>
      <p class="user-account__email">{{ email }}</p>
      <button class="user-account__edit-btn" @click="editAccount">Edit Account</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountInformationView",
  data(){
    return {
      firstname: "John",
      lastname: "Doe",
      username: "johndooooe",
      email: "jdoe@gmail.com",
      password: "jdjd"
    }
  },

  props: {
    photoUrl: {
      type: String,
      default: 'https://via.placeholder.com/150', // default stock photo
    }
  },

  methods: {
    editAccount() {
      console.log('you are now editing your account');
    },
  },
};
</script>

<style>

.user-account {
  display: flex;
  align-items: center;
  justify-content: center; /* center horizontally */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.user-account__photo {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-right: 1rem;
}
.user-account__info {
  flex: 1;
}
.user-account__name {
  font-size: 2rem;
  margin: 0;
}
.user-account__email {
  margin: 0;
  color: #888;
}
.user-account__edit-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #0074d9;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
</style>