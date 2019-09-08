import { Module } from 'vuex';
import { DecklistState, RootState } from '@/types/state';
import { DECKLIST } from '@/store/actions';
import { Decklist } from '@/types/decklist';

export const module: Module<DecklistState, RootState> = {
  state: {
    decklist: Decklist.fromJSON(localStorage.getItem('decklist')),
    slots: Decklist.slotsFromJSON(localStorage.getItem('slots')),
  },
  getters: {},
  mutations: {
    [DECKLIST.TITLE]: (state, title) => {
      state.decklist.title = title;
      localStorage.setItem('decklist', JSON.stringify(state.decklist));
    },

    [DECKLIST.ADD_CARD]: (state, card) => {
      state.decklist.addCard(card);
      localStorage.setItem('decklist', JSON.stringify(state.decklist));
    },

    [DECKLIST.REMOVE_CARD]: (state, card) => {
      state.decklist.removeCard(card);
      localStorage.setItem('decklist', JSON.stringify(state.decklist));
    },

    [DECKLIST.EMPTY]: (state) => {
      state.decklist.empty();
      localStorage.setItem('decklist', JSON.stringify(state.decklist));
    },

    [DECKLIST.SAVE]: (state) => {
      state.slots.push(state.decklist.title);
      localStorage.setItem('slots', JSON.stringify(state.slots));
      localStorage.setItem(`decklist-${state.decklist.title}`, JSON.stringify(state.decklist));
    },

    [DECKLIST.LOAD]: (state, newTitle) => {
      state.decklist = Decklist.fromJSON(localStorage.getItem(`decklist-${newTitle}`));
    },
  },
  actions: {
  },
};
