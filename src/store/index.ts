import Vue from 'vue';
import Vuex from 'vuex';
import { modules } from '@/store/modules';
import { RootState } from '@/types/state';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {

  },
  modules,
});
