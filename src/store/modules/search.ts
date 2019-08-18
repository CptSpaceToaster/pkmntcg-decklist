import { Module } from 'vuex';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { RootState, SearchState } from '@/types/state';
import { SEARCH } from '@/store/actions';
import { NavigationStatus } from '@/types/network';

const nHack: string[] =  [
  'bw3-92',
  'bw3-101',
  'xy10-105a',
  'bw5-96',
  'xy10-105',
  'bwp-BW100',
];

export const module: Module<SearchState, RootState> = {
  state: {
    status: NavigationStatus.NONE,
    searchedCards: [],
    name: '',
    text: '',
    sets: [],
    supertypes: [],
    subtypes: [],
    types: [],
  },
  getters: {
    searchQuery: (state) => {
      const query: PokemonTCG.IQuery[] = [];
      if (!!state.name && state.name.length > 0) {
        if (state.name === 'N' && state.sets.length === 0 || ['bw3', 'bw5', 'bwp', 'xy10'].some((code) => state.sets.map((set) => set.code).includes(code))) {
          // Yep >.>
          query.push({ name: 'id', value: nHack.join('|') });
        } else {
          query.push({ name: 'name', value: state.name });
        }
      }
      if (!!state.text && state.text.length > 0) {
        // query.push({ name: 'text', value: state.text});
        query.push({ name: 'attackText', value: state.text});
        // query.push({ name: 'abilityText', value: state.text});
      }
      if (!!state.sets && state.sets.length > 0) {
        query.push({ name: 'setCode', value: state.sets.map((set) => set.code).join('|')});
      }
      if (!!state.types && state.types.length > 0) {
        query.push({ name: 'types', value: state.types.join('|')});
      }
      if (!!state.subtypes && state.subtypes.length > 0) {
        query.push({ name: 'subtype', value: state.subtypes.join('|')});
      }
      if (!!state.supertypes && state.supertypes.length > 0) {
        query.push({ name: 'supertype', value: state.supertypes.join('|')});
      }
      return query;
    },
  },
  mutations: {
    [SEARCH.LOAD]: (state) => {
      state.status = NavigationStatus.LOADING;
    },

    [SEARCH.SUCCESS]: (state, cards: PokemonTCG.Card[]) => {
      state.status = NavigationStatus.NONE;
      state.searchedCards = cards;
    },

    [SEARCH.FAILURE]: (state) => {
      state.status = NavigationStatus.ERROR;
    },

    [SEARCH.NAME]: (state, name: string) => {
      state.name = name;
    },

    [SEARCH.TEXT]: (state, text: string) => {
      state.text = text;
    },

    [SEARCH.SETS]: (state, sets: PokemonTCG.Set[]) => {
      state.sets = sets;
    },

    [SEARCH.TYPES]: (state, types: string[]) => {
      state.types = types;
    },

    [SEARCH.SUBTYPES]: (state, subtypes: string[]) => {
      state.subtypes = subtypes;
    },

    [SEARCH.SUPERTYPES]: (state, supertypes: string[]) => {
      state.supertypes = supertypes;
    },
  },
  actions: {
    [SEARCH.REQUEST]: ({ commit, getters }) => {
      commit(SEARCH.LOAD);

      const query = getters.searchQuery;

      PokemonTCG.Card.where(query)
        .then((cards) => {
          commit(SEARCH.SUCCESS, cards);
        })
        .catch((error) => {
          commit(SEARCH.FAILURE);
        });
    },
  },
};
