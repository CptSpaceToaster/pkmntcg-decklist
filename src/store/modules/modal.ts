import { Module } from 'vuex';
import { RootState, ModalState } from '@/types/state';
import { MODAL } from '@/store/actions';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

function clear(state: ModalState) {
  for (const key in state) {
    if (!!key) {
      if (typeof (state as any)[key] === 'boolean') {
        (state as any)[key] = false;
      }
    }
  }
}

export const module: Module<ModalState, RootState> = {
  state: {
    loadDecklist: false,
    card: {} as PokemonTCG.Card, // hacks
    cardInfo: false,
  },
  getters: {
  },
  mutations: {
    [MODAL.CLEAR]: (state) => {
      clear(state);
    },
    [MODAL.LOAD_DECKLIST]: (state, value: boolean = true) => {
      clear(state);
      state.loadDecklist = value;
    },
    [MODAL.SET_CARD_INFO]: (state, card: PokemonTCG.Card) => {
      clear(state);
      state.card = card;
      // state.cardInfo = true;
    },
    [MODAL.SHOW_CARD_INFO]: (state, value: boolean = true) => {
      clear(state);
      state.cardInfo = value;
    },
  },
  actions: {
  },
};
