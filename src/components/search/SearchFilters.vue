<template>
  <div class="search-bar">
    <span class="search-filters">
      <label>Search</label>
      <input @input="searchCards" class="search-input"/>
      <multiselect
        placeholder="Supertypes"
        v-model="filterSupertypes"
        :options="availableSupertypes"/>
      <multiselect
        placeholder="Subtypes"
        v-model="filterSubtypes"
        :options="availableSubtypes"
        :multiple="true"/>
      <multiselect
        placeholder="Types"
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
  public sets: PokemonTCG.Set[] = [];
  public types: string[] = [];
  public subtypes: string[] = [];
  public supertypes: string[] = [];

  get availableSets(): PokemonTCG.Set[] {
    return this.$store.state.sets;
  }

  get availableSupertypes(): string[] {
    return this.$store.state.supertypes;
  }
  get filterSupertypes(): string {
    return this.$store.state.search.supertypes[0];
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
    if (event.target.value) {
      this.$store.commit(SEARCH.NAME, event.target.value);
      this.dispatchSearch();
    }
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
</style>
