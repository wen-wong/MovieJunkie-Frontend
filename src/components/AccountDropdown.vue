<template>
  <div class="dropdown">
    <button class="dropdown-toggle" @click="toggleDropdown">
      <div>
        <h2>Account</h2>
      </div>
    </button>
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
}
.dropdown-toggle {
  display: inline-block;
  padding: 0.5rem;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: #fff;
  width: 15rem;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ccc;
  width: 100%;
}
.dropdown-menu li {
  padding: 0.5rem;
  cursor: pointer;
}
.dropdown-menu li:hover {
  background-color: #f5f5f5;
}


</style>