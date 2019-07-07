import Vue from 'vue';
import Vuex from 'vuex';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { modules } from '@/store/modules';
import { ROOT } from '@/store/actions';
import { RootState } from '@/types/state';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    sets: [],
    types: [],
    subtypes: [],
    supertypes: [],
  },
  getters: {},
  mutations: {
    [ROOT.SETS]: (state, sets: PokemonTCG.Set[]) => {
      state.sets = sets;
    },

    [ROOT.TYPES]: (state, types: string[]) => {
      state.types = types;
    },

    [ROOT.SUBTYPES]: (state, subtypes: string[]) => {
      state.subtypes = subtypes;
    },

    [ROOT.SUPERTYPES]: (state, supertypes: string[]) => {
      state.supertypes = supertypes;
    },
  },
  actions: {
    [ROOT.INITIALIZE_SETS]: ({ commit, dispatch }) => {
      PokemonTCG.Set.all()
        .then((sets) => {
          commit(ROOT.SETS, sets);
        })
        .catch((error) => {
          if (!!error.response && error.response.status >= 500 && error.response.status < 600) {
            setTimeout(() => { dispatch(ROOT.INITIALIZE_SETS); }, 5000);
          }
        });
    },

    [ROOT.INITIALIZE_TYPES]: ({ commit, dispatch }) => {
      PokemonTCG.Meta.allTypes()
        .then((types) => {
          commit(ROOT.TYPES, types);
        })
        .catch((error) => {
          if (!!error.response && error.response.status >= 500 && error.response.status < 600) {
            setTimeout(() => { dispatch(ROOT.INITIALIZE_TYPES); }, 5000);
          }
        });
    },

    [ROOT.INITIALIZE_SUBTYPES]: ({ commit, dispatch }) => {
      PokemonTCG.Meta.allSubtypes()
        .then((subtypes) => {
          commit(ROOT.SUBTYPES, subtypes);
        })
        .catch((error) => {
          if (!!error.response && error.response.status >= 500 && error.response.status < 600) {
            setTimeout(() => { dispatch(ROOT.INITIALIZE_SUBTYPES); }, 5000);
          }
        });
    },

    [ROOT.INITIALIZE_SUPERTYPES]: ({ commit, dispatch }) => {
      PokemonTCG.Meta.allSupertypes()
        .then((supertypes) => {
          commit(ROOT.SUPERTYPES, supertypes);
        })
        .catch((error) => {
          if (!!error.response && error.response.status >= 500 && error.response.status < 600) {
            setTimeout(() => { dispatch(ROOT.INITIALIZE_SUPERTYPES); }, 5000);
          }
        });
    },
  },
  modules,
});
