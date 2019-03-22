<template>
  <div class="suggested-people">
    <div class="suggested-people__header">
      <span>Who to follow</span>
      <span class="suggested-people__refresh" @click="refresh">Refresh</span>
    </div>

    <div class="suggested-people__list">
      <suggested-person
          :person="person"
          :key="index"
          v-for="(person, index) in suggestedPeople"
          @close="replace(index)">
      </suggested-person>
    </div>
  </div>
</template>

<script>
  import suggestedPeopleService from '../services/SuggestedPeopleService';
  import SuggestedPerson from './suggested-person';

  export default {
    name: 'suggested-people',
    components: { SuggestedPerson },
    data() {
      return {
        queue: [],
        suggestedPeople: [],
        peopleToShow: 3,
        lastId: 0,
        loadingPeople: null
      }
    },
    computed: {
      requiresLoading() {
        return !this.queue.length;
      }
    },
    async created() {
      this.suggestedPeople = Array.from({ length: this.peopleToShow }).map(() => null);
      this.refresh();
    },
    methods: {
      async replace(slotId) {
        if (this.requiresLoading) this.suggestedPeople.splice(slotId, 1, null);

        const person = await this.getNextPerson();
        this.suggestedPeople.splice(slotId, 1, person);
      },
      async getNextPerson() {
        if (this.requiresLoading) await this.loadPeople();

        const person = this.queue.shift();
        this.lastId = person.id;
        return person;
      },
      async loadPeople() {
        if (!this.loadingPeople) this.loadingPeople = this.loadPeopleFromApi();
        return this.loadingPeople
      },
      async loadPeopleFromApi() {
        const people = await suggestedPeopleService.get(this.lastId);
        this.queue.push(...people);
        this.loadingPeople = null;
      },
      async refresh() {
        for (let i = 0; i < this.peopleToShow; ++i) {
          this.replace(i);
        }
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
