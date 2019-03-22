<template>
  <div class="suggested-people">
    <div class="suggested-people__header">
      <span>Who to follow</span>
      <span class="suggested-people__refresh" @click="$emit('refresh')">Refresh</span>
    </div>

    <div class="suggested-people__list">
      <suggested-person
          :person="person"
          :key="index"
          v-for="(person, index) in people"
          @close="$emit('replace', index)">
      </suggested-person>
    </div>
  </div>
</template>

<script>
  import SuggestedPerson from './suggested-person';

  export default {
    name: 'suggested-people',
    components: { SuggestedPerson },
    props: {
      people: {
        type: Array
      }
    }
  };
</script>

<style lang="scss">
  .suggested-people {
    border: 2px solid rgba(black, 0.1);
  }

  .suggested-people__header {
    background: rgba(black, 0.1);
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
  }

  .suggested-people__refresh {
    cursor: pointer;
    color: rgba(black, 0.8);
  }
</style>
