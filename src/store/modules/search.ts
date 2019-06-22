import { Module } from 'vuex';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { RootState, SearchState } from '@/types/state';
import { SEARCH } from '@/store/actions';
import { NavigationStatus } from '@/types/network';

export const module: Module<SearchState, RootState> = {
  state: {
    status: NavigationStatus.NONE,
    searchedCards: [],
    name: '',
  },
  getters: {
    searchQuery: (state) => {
      const query: PokemonTCG.IQuery[] = [];
      query.push({ name: 'name', value: state.name });
      return query;
    },
  },
  mutations: {
    [SEARCH.REQUEST]: (state) => {
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
  },
  actions: {
    [SEARCH.CARD]: ({ commit, getters }) => {
      commit(SEARCH.REQUEST);

      const querry = getters.searchQuery;

      PokemonTCG.Card.where(querry)
        .then((cards) => {
          commit(SEARCH.SUCCESS, cards);
        })
        .catch((error) => {
          commit(SEARCH.FAILURE);
          console.error('Search failure: ', error);
        });
    },
  },
};
