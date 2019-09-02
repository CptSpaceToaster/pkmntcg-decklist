import store from '@/store';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export interface CardBundle {
  card: PokemonTCG.Card;
  count: number;
}

export function bundleCompare(a: CardBundle, b: CardBundle): number {
  if (a.count === b.count) {
    return cardCompare(a.card, b.card);
  }
  return b.count - a.count;
}

export function cardCompare(a: PokemonTCG.Card, b: PokemonTCG.Card): number {
  if (a.setCode === b.setCode) {
    return parseInt(a.number, 10) - parseInt(b.number, 10);
  }
  const sets = store.state.sets;
  const setA = sets.find((set) => set.code === a.setCode);
  const setB = sets.find((set) => set.code === b.setCode);
  if (!!setA && !!setB) {
    return Date.parse(setA.releaseDate) - Date.parse(setB.releaseDate);
  }
  return 0;
}
