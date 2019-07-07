<template>
  <div class="search-bar">
    <span class="search-filters">
      <label>Search</label>
      <input @input="searchCards" class="search-input"/>
      <multiselect
        :class="{'sets': true, 'empty': filterSets.length === 0}"
        v-model="filterSets"
        label="name"
        track-by="code"
        :placeholder="placeholderSets"
        :multiple="true"
        :options="availableSets"
        :close-on-select="false"/>
      <multiselect
        placeholder="Card Type"
        v-model="filterSupertypes"
        :options="availableSupertypes"/>
      <multiselect
        placeholder="Subtypes"
        v-model="filterSubtypes"
        :multiple="true"
        :options="availableSubtypes"
        :close-on-select="false"/>
      <multiselect
        placeholder="Pokemon Types"
        v-model="filterTypes"
        :options="availableTypes"
        :multiple="true"
        :disabled="disableTypes"/>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import globals from '@/globals';
import Multiselect from 'vue-multiselect';
import { Component } from 'vue-property-decorator';
import { debounce } from 'lodash';
import { SEARCH } from '@/store/actions';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

@Component({
  components: {
    Multiselect,
  },
})
export default class SearchFilters extends Vue {

  get availableSets(): PokemonTCG.Set[] {
    return [{
        code: '',
        expandedLegal: true,
        logoUrl: '',
        name: 'Standard',
        ptcgoCode: '',
        releaseDate: '',
        series: '',
        standardLegal: true,
        symbolUrl: '',
        totalCards: -1,
        updatedAt: '',
        resource: () => '',
      }, {
        code: '',
        expandedLegal: true,
        logoUrl: '',
        name: 'Expanded',
        ptcgoCode: '',
        releaseDate: '',
        series: '',
        standardLegal: true,
        symbolUrl: '',
        totalCards: -1,
        updatedAt: '',
        resource: () => '',
      }, {
        code: '',
        expandedLegal: true,
        logoUrl: '',
        name: 'None',
        ptcgoCode: '',
        releaseDate: '',
        series: '',
        standardLegal: true,
        symbolUrl: '',
        totalCards: -1,
        updatedAt: '',
        resource: () => '',
      },
    ].concat(this.$store.state.sets);
  }
  get placeholderSets(): string {
    // TODO: This is not how localization works
    if (!!this.filterSets && this.filterSets.length > 0) {
      if (this.filterSets.length === this.availableSets.length - 3 || this.filterSets.length === 0) {
        return 'All Sets';
      } else if (this.filterSets.length === 1) {
        return `${this.filterSets[0].name}`;
      } else {
        return `${this.filterSets.length} Sets`;
      }
    }
    return 'Sets';
  }
  get filterSets(): PokemonTCG.Set[] {
    return this.$store.state.search.sets;
  }
  set filterSets(sets: PokemonTCG.Set[]) {
    const names = sets.map((set) => set.name);
    if (names.indexOf('Standard') !== -1) {
      this.$store.commit(SEARCH.SETS, this.$store.state.standardSets);
    } else if (names.indexOf('Expanded') !== -1) {
      this.$store.commit(SEARCH.SETS, this.$store.state.expandedSets);
    } else if (names.indexOf('None') !== -1) {
      this.$store.commit(SEARCH.SETS, []);
    } else {
      this.$store.commit(SEARCH.SETS, sets);
    }
    this.dispatchSearch();
  }

  get availableSupertypes(): string[] {
    return this.$store.state.supertypes;
  }
  get filterSupertypes(): string {
    if (!!this.$store.state.search.supertypes && this.$store.state.search.supertypes.length > 0) {
      return this.$store.state.search.supertypes[0];
    }
    return '';
  }
  set filterSupertypes(supertypes: string) {
    this.$store.commit(SEARCH.SUPERTYPES, [supertypes]);
    if (this.filterSubtypes.some((subtype) => this.availableSubtypes.indexOf(subtype) === -1)) {
      this.$store.commit(SEARCH.SUBTYPES, []);
    }
    if (this.disableTypes) {
      this.$store.commit(SEARCH.TYPES, []);
    }
    this.dispatchSearch();
  }

  get availableSubtypes(): string[] {
    switch (this.filterSupertypes) {
      case 'Pokémon':
        return this.$store.state.pokemonSubtypes;
      case 'Trainer':
        return this.$store.state.trainerSubtypes;
      case 'Energy':
        return this.$store.state.energySubtypes;
      default:
        return [].concat.apply([], [
          this.$store.state.pokemonSubtypes,
          this.$store.state.trainerSubtypes,
          this.$store.state.energySubtypes,
        ]);
    }
  }
  get filterSubtypes(): string[] {
    return this.$store.state.search.subtypes;
  }
  set filterSubtypes(subtypes: string[]) {
    this.$store.commit(SEARCH.SUBTYPES, subtypes);
    this.dispatchSearch();
  }

  get availableTypes(): string[] {
    return this.$store.state.types;
  }
  get filterTypes(): string[] {
    return this.$store.state.search.types;
  }
  set filterTypes(types: string[]) {
    this.$store.commit(SEARCH.TYPES, types);
    this.dispatchSearch();
  }

  get disableTypes(): boolean {
    return this.filterSupertypes === 'Trainer' || this.filterSupertypes === 'Energy';
  }

  public dispatchSearch = debounce(() => {
    this.$store.dispatch(SEARCH.REQUEST);
  }, globals.debounceInterval);

  public searchCards(event: any) {
    this.$store.commit(SEARCH.NAME, event.target.value);
    this.dispatchSearch();
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.search-bar {
  @include row($align: stretch);
  background: $secondary;
}

.search-filters {
  margin: 20px;
  flex: 1 1 auto;
  @include row($spacing: 5px);
}

input {
  padding: 10px;
  border: 1px solid $border-color;
}


.sets {
  .multiselect__tags {
    margin-right: 0 !important;

    .multiselect__input {
      // Evil Hacks for Good
      position: inherit !important;
      height: 100%;
      width: 100% !important;
      padding: 0;
    }
  }
  .multiselect__select {
    margin-right: 0 !important;
  }

  .multiselect__single {
    display: none;
  }

  .multiselect__tag {
    display: none;
  }

  .multiselect__placeholder {
    display: none;
  }
}

.empty {
  .multiselect__tags {
    .multiselect__input::placeholder {
      opacity: 0.4;
      font-size: 14px;
      color: black;
    }
  }
}
</style>
