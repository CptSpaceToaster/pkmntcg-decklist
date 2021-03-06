import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { modules } from '@/store/modules';
import { ROOT, SEARCH } from '@/store/actions';
import { RootState } from '@/types/state';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    sets: [],
    postRotationSets: [],
    standardSets: [],
    expandedSets: [],
    supertypes: [
      'Pokémon',
      'Trainer',
      'Energy',
    ],
    pokemonSubtypes: [
      'Basic',
      'Stage 1',
      'Stage 2',
      'Restored',
      'TAG TEAM',
      'GX',
      'EX',
      'MEGA',
      'BREAK',
      'Level Up',
      'LEGEND',
    ],
    trainerSubtypes: [
      'Item',
      'Supporter',
      'Stadium',
      'Pokémon Tool',
      'Technical Machine',
      'Rocket\'s Secret Machine',
    ],
    energySubtypes: [
      'Basic', // (again!)
      'Special',
    ],
    types: [
      'Fighting',
      'Grass',
      'Fire',
      'Psychic',
      'Lightning',
      'Darkness',
      'Water',
      'Fairy',
      'Metal',
      'Dragon',
      'Colorless',
    ],
  },
  getters: {
    allSets: (state): PokemonTCG.Set[] => {
      return state.sets;
    },
  },
  mutations: {
    [ROOT.SETS]: (state, sets: PokemonTCG.Set[]) => {
      state.sets = sets;
      state.sets.sort((a: PokemonTCG.Set, b: PokemonTCG.Set) => {
        return moment.utc(b.releaseDate).diff(moment.utc(a.releaseDate));
      });

      state.standardSets = state.sets.filter((set) => set.standardLegal);
      state.postRotationSets = state.standardSets.filter((set) => !['sm1', 'sm2', 'sm3', 'sm35', 'sm4'].includes(set.code));
      state.expandedSets = state.sets.filter((set) => set.expandedLegal);
    },
  },
  actions: {
    [ROOT.INITIALIZE_SETS]: ({ commit, dispatch }) => {
      PokemonTCG.Set.all()
        .then((sets) => {
          commit(ROOT.SETS, sets);
          commit(SEARCH.SORT);
        })
        .catch((error) => {
          if (!!error.response && error.response.status >= 500 && error.response.status < 600) {
            setTimeout(() => { dispatch(ROOT.INITIALIZE_SETS); }, 5000);
          }
        });
    },
  },
  modules,
});
