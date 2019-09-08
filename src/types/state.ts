import { Decklist } from '@/types/decklist';
import { NavigationStatus } from '@/types/network';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

// Root state specific
export interface RootState {
  windowWidth: number;
  sets: PokemonTCG.Set[];
  postRotationSets: PokemonTCG.Set[];
  standardSets: PokemonTCG.Set[];
  expandedSets: PokemonTCG.Set[];
  supertypes: string[];
  pokemonSubtypes: string[];
  trainerSubtypes: string[];
  energySubtypes: string[];
  types: string[];
}

export interface DecklistState {
  decklist: Decklist;
  slots: string[];
}

export interface SearchState {
  status: NavigationStatus;
  searchedCards: PokemonTCG.Card[];
  name: string;
  text: string;
  sets: PokemonTCG.Set[];
  supertypes: string[];
  subtypes: string[];
  types: string[];
}
