<template>
      <NavBar>
      </NavBar>
</template>

<script>

import NavBar from "@/components/NavBar.vue";

export default {
  name: "AccountInformationView",
  components: {NavBar},
  data(){
    return {
      firstname: "John",
      lastname: "Doe",
      username: "johndooooe",
      email: "jdoe@gmail.com",
      password: "jdjd",
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

</style>