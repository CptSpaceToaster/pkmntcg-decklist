import { ModuleTree } from 'vuex';
import { module as decklist } from '@/store/modules/decklist';
import { module as search } from '@/store/modules/search';
import { RootState } from '@/types/state';

export const modules: ModuleTree<RootState> = {
  decklist,
  search,
};
