<template>
  <suggested-people-list
      :people="people$"
      v-stream:replace="replace$"
      v-stream:refresh="refresh$"></suggested-people-list>
</template>

<script>
  import * as Observable from 'rxjs';

  import suggestedPeopleService from '../services/SuggestedPeopleService';
  import SuggestedPeopleList from './suggested-people/suggested-people-list';
  import { mergeMap, startWith, zip, flatMap, tap, concatMap, scan, filter, pluck, shareReplay } from 'rxjs/operators';

  export default {
    name: 'suggested-people',
    components: { SuggestedPeopleList },
    data() {
      return {
        peopleToShow: 3,
        lastId: 0,
        perPage: 20
      };
    },
    domStreams: ['refresh$', 'replace$'],
    subscriptions() {
      const replace$ = Observable.merge(
        this.replace$
          .pipe(
            pluck('event'),
            pluck('msg')
          ),
        this.refresh$
          .pipe(
            startWith('start'),
            mergeMap(() => Observable.from(
              Array.from({ length: this.peopleToShow })
                .map((_, index) => index)
            ))
          )
      );

      const people$ = replace$.pipe(
        scan(acc => acc + 1, 0),
        filter(index => (index - 1) % this.perPage === 0),
        concatMap(() => this.loadPeople(this.lastId)),
        zip(replace$, (person, slotId) => ({ person, slotId })),
        shareReplay()
      );

      return {
        people$: Observable.combineLatest(
          Array
            .from({ length: this.peopleToShow })
            .map((_, index) => people$.pipe(
              filter(({ slotId }) => slotId === index),
              pluck('person'),
              tap(person => this.lastId = person.id)
            ))
        )
      };
    },
    methods: {
      loadPeople(since = 0) {
        return Observable
          .from(suggestedPeopleService.get(since))
          .pipe(
            flatMap(people => Observable.from(people))
          );
      }
    }
  };
</script>
