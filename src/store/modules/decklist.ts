import { Module } from 'vuex';
import { DecklistState, RootState } from '@/types/state';
import { DECKLIST } from '@/store/actions';
import { Decklist } from '@/types/decklist';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export async function asyncForEach<T>(array: T[], callback: (item: T, index: number, allItems: T[]) => void) {
  await Promise.all(array.map(callback));
}

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
      if (state.decklist.title !== '') {
        localStorage.setItem(`decklist-${state.decklist.title}`, JSON.stringify(state.decklist));
        if (state.slots.indexOf(state.decklist.title) === -1) {
          state.slots.push(state.decklist.title);
          localStorage.setItem('slots', JSON.stringify(state.slots));
        }
      }
    },

    [DECKLIST.LOAD]: (state, newTitle) => {
      state.decklist = Decklist.fromJSON(localStorage.getItem(`decklist-${newTitle}`));
    },

    [DECKLIST.DELETE]: (state, oldTitle) => {
      localStorage.removeItem(`decklist-${oldTitle}`);
      state.slots = state.slots.filter((e) => e !== oldTitle);
      localStorage.setItem('slots', JSON.stringify(state.slots));
    },
  },
  actions: {
    [DECKLIST.LOAD_FROM_STRING]: async ({ state, rootGetters }, decklistText: string) => {
      const res = new Decklist();
      const lines = decklistText.split('\n').filter((line: string) => !(line.includes('**') && !line.includes('##')));

      await Promise.all(lines.map(async (line: string) => {
        const tokens = line.split(' ');
        if (tokens.length <= 2) {
          return;
        }

        const quantity = parseInt(tokens[0], 10);
        if (isNaN(quantity)) {
          return;
        }

        const setNum = tokens[tokens.length - 1];
        const ptcgoCode = tokens[tokens.length - 2];
        const set = rootGetters.allSets.find((set: PokemonTCG.Set) => ptcgoCode === set.ptcgoCode);

        if (set === undefined) {
          const energyID = parseInt(setNum, 10);
          if (isNaN(energyID) || (energyID > 9)) {
            return;
          }
          const card = await PokemonTCG.Card.find(`sm1-${163 + energyID}`);
          res.addCard(card, quantity);
        } else {
          const results = await PokemonTCG.Card.where([{name: 'setCode', value: set.code}, {name: 'number', value: setNum}]);
          const card = results.find(() => true);
          if (card !== undefined) {
            res.addCard(card, quantity);
          }
        }
      }));

      res.sort();
      state.decklist = res;
    },
  },
};
