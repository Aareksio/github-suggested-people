<template>
  <div id="app">
    <suggested-people></suggested-people>
  </div>
</template>

<script>
  import SuggestedPeople from './components/suggested-people.vue';

  export default {
    name: 'app',
    components: {
      SuggestedPeople
    }
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 20px;
  }
</style>
