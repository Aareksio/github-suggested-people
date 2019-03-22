<template>
  <div class="suggested-person">
    <div class="suggested-person__avatar">
      <img src="https://placehold.it/100x100" alt="avatar" v-if="isLoading">
      <img :src="person.avatar_url" alt="avatar" v-else>
    </div>

    <div class="suggested-person__name">
      <span v-if="isLoading">Loading...</span>
      <span v-else>{{ person.login }}</span>
    </div>

    <div class="suggested-person__follow">
      <button class="suggested-person__follow-button">
        Follow
      </button>
    </div>

    <div class="suggested-person__close" @click="$emit('close')">
      <span>+</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'suggested-person',
    props: {
      person: {
        type: Object
      }
    },
    computed: {
      isLoading() {
        return !this.person;
      }
    }
  }
</script>

<style lang="scss">
  .suggested-person {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    grid-template-areas: 'avatar name close' 'avatar follow close';
    height: 3rem;
    margin: 0.5rem;
    grid-column-gap: 1rem;

    > div {
      min-height: 0;
    }
  }

  .suggested-person__avatar {
    grid-area: avatar;

    > img {
      height: 3rem;
      width: 3rem;
    }
  }

  .suggested-person__name {
    grid-area: name;
    display: flex;
    align-items: center;
    font-weight: 500;
  }

  .suggested-person__follow {
    grid-area: follow;
    display: flex;
    align-items: center;
  }

  .suggested-person__close {
    grid-area: close;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 3rem;
    width: 3rem;

    > span {
      transform: rotate(45deg);
      display: block;
      font-size: 2rem;
    }
  }
</style>
