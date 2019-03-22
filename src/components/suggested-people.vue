<template>
  <suggested-people-list
      :people="suggestedPeople"
      @replace="replace"
      @refresh="refresh"></suggested-people-list>
</template>

<script>
  import suggestedPeopleService from '../services/SuggestedPeopleService';
  import SuggestedPeopleList from './suggested-people/suggested-people-list';

  export default {
    name: 'suggested-people',
    components: { SuggestedPeopleList },
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
