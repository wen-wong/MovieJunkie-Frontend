<template>
  <div>

    <b-container class="bv-example-row">
      <b-row>
        <b-col>1 of 2</b-col>
        <b-col>2 of 2</b-col>
      </b-row>

      <b-row>
        <b-col>1 of 3</b-col>
        <b-col>2 of 3</b-col>
        <b-col>3 of 3</b-col>
      </b-row>
    </b-container>



    <!--    the world's shittiest and most useless navbar -->

<!--    <div>-->
<!--      <b-container class="navbar">-->
<!--        <b-navbar toggleable="lg" type="dark" variant="dark">-->
<!--          <b-navbar-brand href="#">-->
<!--            <img src="https://placekitten.com/g/30/30" alt="kitten">-->
<!--            NavBar-->
<!--          </b-navbar-brand>-->

<!--          <b-navbar-nav>-->
<!--            <b-nav-item href="#"> Link 1</b-nav-item>-->
<!--            <b-nav-item href="#" disabled> Disabled</b-nav-item>-->
<!--            <b-nav-item-dropdown text="Profile">-->
<!--              <b-dropdown-item>Edit Account</b-dropdown-item>-->
<!--              <b-dropdown-item>Delete Account</b-dropdown-item>-->
<!--            </b-nav-item-dropdown>-->
<!--          </b-navbar-nav>-->
<!--        </b-navbar>-->
<!--      </b-container>-->
<!--    </div>-->


    <!--    The part below was me trying to set up the structure to display some of the user's information, which worked - ish-->


    <!--    <div class="user-account">-->
<!--      <img class="user-account__photo" :src="photoUrl" alt="User Photo">-->
<!--      <div class="user-account__info">-->
<!--        <h2 class="user-account__name">{{ firstname }} {{ lastname }}</h2>-->
<!--        <p class="user-account__email">{{ email }}</p>-->
<!--        <button class="user-account__edit-btn" @click="editAccount">Edit Account</button>-->
<!--      </div>-->
<!--    </div>-->
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

.user-account {
  display: flex;
  align-items: center;
  vertical-align: center;
  justify-content: center; /* center horizontally */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.user-account__photo {
  border-radius: 50%;
  width: 50px;
  height: 50px;
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

.navbar{
  width: 100%;
  background-color: #888888;
}
</style>