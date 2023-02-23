<template>
  <div class="dropdown">
    <div class="dropdown-toggle" @click="toggleDropdown" id="circle"></div>
    <ul v-show="isOpen" class="dropdown-menu">
      <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Select an option",
    },
  },
  data() {
    return {
      isOpen: false,
      selectedOption: null,
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
      this.$emit("optionSelected", option);
    },
  },
};
</script>

<style>
.dropdown {
  position: relative;
  margin-right: 1rem;
}

.dropdown-toggle {
  display: inline-block;
  padding: 0.5rem;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: #fff;
  /*width: 15rem;*/
  width: 30px;
  height: 30px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 25px;
  background: grey;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: -130px;
  z-index: 1000;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ccc;
  width: 11rem;
}
.dropdown-menu li {
  padding: 0.5rem;
  cursor: pointer;
}
.dropdown-menu li:hover {
  background-color: #f5f5f5;
}


</style>