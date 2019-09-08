import store from '@/store';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { CardBundle, bundleCompare } from '@/types/bundle';

export class Decklist {
  public static fromJSON(jsonText: string | null): Decklist {
    // I think there's a better way to do this ¯\_(ツ)_/¯
    const res = new Decklist();
    if (!!jsonText) {
      const stored = JSON.parse(jsonText);
      res.title = stored.title;
      res.pokemonBundles = stored.pokemonBundles;
      res.trainerBundles = stored.trainerBundles;
      res.energyBundles = stored.energyBundles;
    }
    return res;
  }
  public static slotsFromJSON(jsonText: string | null): string[] {
    if (!!jsonText) {
      return JSON.parse(jsonText);
    }
    return [];
  }

  public title: string = '';
  public pokemonBundles: CardBundle[] = [];
  public trainerBundles: CardBundle[] = [];
  public energyBundles: CardBundle[] = [];

  get bundles(): CardBundle[] {
    return ([] as CardBundle[]).concat(this.pokemonBundles, this.trainerBundles, this.energyBundles);
  }
  get pokemonCount(): number {
    return this.pokemonBundles
      .map((bundle) => bundle.count)
      .reduce((total, count) => total + count, 0);
  }
  get trainerCount(): number {
    return this.trainerBundles
      .map((bundle) => bundle.count)
      .reduce((total, count) => total + count, 0);
  }
  get energyCount(): number {
    return this.energyBundles
      .map((bundle) => bundle.count)
      .reduce((total, count) => total + count, 0);
  }
  get count(): number {
    return this.pokemonCount + this.trainerCount + this.energyCount;
  }
  public toString(): string {
    let res = `****** Pokémon Trading Card Game Deck List ******\n\n##Pokémon - ${this.pokemonCount}\n`;
    for (const bundle of this.pokemonBundles) {
      res += `\n* ${bundle.count} ${bundle.card.name} ${this.getPTCGOCode(bundle.card)} ${bundle.card.number}`;
    }
    res += `\n\n##Trainer Cards - ${this.trainerCount}\n`;
    for (const bundle of this.trainerBundles) {
      res += `\n* ${bundle.count} ${bundle.card.name} ${this.getPTCGOCode(bundle.card)} ${bundle.card.number}`;
    }
    res += `\n\n##Energy - ${this.energyCount}\n`;
    for (const bundle of this.energyBundles) {
      if (bundle.card.subtype === 'Basic') {
        res += `\n* ${bundle.count} ${bundle.card.name} ${this.getEnergyID(bundle.card)}`;
      } else {
        res += `\n* ${bundle.count} ${bundle.card.name} ${this.getPTCGOCode(bundle.card)} ${bundle.card.number}`;
      }
    }
    res += `\n\nTotal Cards - ${this.count}\n\n****** Deck List Generated at ${window.location.host + window.location.pathname + window.location.hash} ******`;
    return res;
  }

  public addCard(card: PokemonTCG.Card): boolean {
    if (this.countMatchingNames(card.name) >= this.cardLimit(card)) {
      return false;
    }

    const bundle = this.findMatchingBundle(card.id);
    if (bundle) {
      bundle.count++;
      return true;
    } else {
      switch (card.supertype) {
        case 'Trainer':
          this.trainerBundles.push({ card, count: 1 });
          break;
        case 'Energy':
          this.energyBundles.push({ card, count: 1 });
          break;
        default:
          this.pokemonBundles.push({ card, count: 1 });
      }
      return true;
    }
  }

  public removeCard(card: PokemonTCG.Card): boolean {
    const bundle = this.findMatchingBundle(card.id);
    if (bundle) {
      if (bundle.count > 1) {
        bundle.count--;
        return true;
      } else {
        this.bundles.splice(this.bundles.indexOf(bundle), 1);
        switch (card.supertype) {
          case 'Trainer':
            this.trainerBundles.splice(this.trainerBundles.indexOf(bundle), 1);
            break;
          case 'Energy':
            this.energyBundles.splice(this.energyBundles.indexOf(bundle), 1);
            break;
          default:
            this.pokemonBundles.splice(this.pokemonBundles.indexOf(bundle), 1);
        }
        return true;
      }
    } else {
      return false;
    }
  }

  public empty() {
    this.title = '';
    this.pokemonBundles = [];
    this.trainerBundles = [];
    this.energyBundles = [];
  }

  public findMatchingBundle(id: string): CardBundle|null {
    for (const bundle of this.bundles) {
      if (bundle.card.id === id) {
        return bundle;
      }
    }
    return null;
  }

  public countMatchingNames(name: string): number {
    let count = 0;
    for (const bundle of this.bundles) {
      if (bundle.card.name === name) {
        count += bundle.count;
      }
    }
    return count;
  }

  public sort() {
    this.trainerBundles.sort(bundleCompare);
    this.energyBundles.sort(bundleCompare);
    this.pokemonBundles.sort(bundleCompare);
  }

  public cardLimit(card: PokemonTCG.Card): number {
    if (card.supertype === 'Energy' && card.subtype === 'Basic') {
      return 59;
    }
    if (card.name.endsWith('◇')) {
      return 1;
    }
    if (this.isStarCard(card)) {
      for (const bundle of this.pokemonBundles) {
        if (this.isStarCard(bundle.card)) {
          return 0;
        }
      }
      return 1;
    }
    if (card.rarity.includes('ACE')) {
      for (const bundle of this.trainerBundles) {
        if (bundle.card.rarity.includes('ACE')) {
          return 0;
        }
      }
      return 1;
    }
    return 4;
  }

  public isStarCard(card: PokemonTCG.Card): boolean {
    return (card.name.endsWith(' Star') || card.name.endsWith(' Star δ'));
  }

  public getPTCGOCode(card: PokemonTCG.Card): string {
    const set = store.state.sets.find((set) => card.setCode === set.code);
    if (!!set) {
      return set.ptcgoCode || `*${set.code}`;
    }
    return '';
  }

  public getEnergyID(card: PokemonTCG.Card): number {
    // PTCGO actually cares about these ID's and not the card names
    const nrg = card.name;
    let energyID = 1;
    const energyTypes = [
      'Grass',
      'Fire',
      'Water',
      'Lightning',
      'Psychic',
      'Fighting',
      'Darkness',
      'Metal',
      'Fairy',
    ];

    for (const energy of energyTypes) {
      if (nrg.includes(energy)) {
        return energyID;
      }
      energyID++;
    }
    return 0;
  }
}
