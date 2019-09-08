import { Module } from 'vuex';
import { RootState, ModalState } from '@/types/state';
import { MODAL } from '@/store/actions';

function clear(state: ModalState) {
  for (const key in state) {
    if (!!key) {
      (state as any)[key] = false;
    }
  }
}

export const module: Module<ModalState, RootState> = {

  state: {
    loadDecklist: false,
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
  },
  actions: {
  },
};
