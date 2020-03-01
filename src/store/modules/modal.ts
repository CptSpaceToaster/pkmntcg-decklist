import { Module } from 'vuex';
import { RootState, ModalState } from '@/types/state';
import { CardPrice } from '@/types/network';
import { MODAL } from '@/store/actions';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

import { getCardPrice } from '@/network/endpoints';

function clear(state: ModalState) {
  for (const key in state) {
    if (!!key) {
      if (typeof (state as any)[key] === 'boolean' && key !== 'closeNormal') {
        (state as any)[key] = false;
      }
    }
  }
}

export const module: Module<ModalState, RootState> = {
  state: {
    loadDecklist: false,
    importDecklist: false,
    cardInfo: false,
    closeNormal: false,
    card: {} as PokemonTCG.Card, // hacks
    cardPrice: {
      normal_marketPrice: null,
      holofoil_marketPrice: null,
      reverse_holofoil_marketPrice: null,
    } as CardPrice,
  },
  getters: {
  },
  mutations: {
    [MODAL.LOAD_DECKLIST]: (state, value: boolean = true) => {
      clear(state);
      state.loadDecklist = value;
    },
    [MODAL.IMPORT_DECKLIST]: (state, value: boolean = true) => {
      clear(state);
      state.importDecklist = value;
    },
    [MODAL.SHOW_CARD_INFO]: (state, value: boolean = true) => {
      clear(state);
      state.cardInfo = value;
    },
    [MODAL.SET_CLOSE_INFO_NORMAL]: (state, value: boolean = true) => {
      state.closeNormal = value;
    },
    [MODAL.SET_CARD_INFO]: (state, card: PokemonTCG.Card) => {
      state.card = card;
    },
    [MODAL.SET_CARD_PRICE]: (state, cardPrice: CardPrice) => {
      state.cardPrice = cardPrice;
    },
  },
  actions: {
    [MODAL.CLEAR]: ({ state }) => {
      clear(state);
    },
    [MODAL.LOAD_CARD_INFO]: ({ state, commit }, id: string) => {
      if (state.card.id === id) {
        return;
      }

      PokemonTCG.Card.find(id)
        .then((card: PokemonTCG.Card) => {
          commit(MODAL.SET_CARD_INFO, card);
        });
    },
    [MODAL.LOAD_CARD_PRICE]: ({ state, commit }, id: string) => {
      if (state.cardPrice.id === id) {
        return;
      }
      commit(MODAL.SET_CARD_PRICE, {
        normal_marketPrice: null,
        holofoil_marketPrice: null,
        reverse_holofoil_marketPrice: null,
      } as CardPrice);
      getCardPrice(id)
        .then((cardPrice: CardPrice) => {
          commit(MODAL.SET_CARD_PRICE, cardPrice);
        });
    },
  },
};
