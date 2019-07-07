import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export class Decklist {
  public title: string = '';
  public count: number = 0;
  public bundles: CardBundle[] = [];

  public addCard(card: PokemonTCG.Card): boolean {
    if (this.count >= 60) {
      return false;
    }
    if (this.countMatchingNames(card.name) >= this.cardLimit(card)) {
      return false;
    }

    const bundle = this.findMatchingBundle(card.id);
    this.count++;
    if (bundle) {
      bundle.count++;
      return true;
    } else {
      this.bundles.push({ card, count: 1 });
      return true;
    }
  }

  public removeCard(card: PokemonTCG.Card): boolean {
    const bundle = this.findMatchingBundle(card.id);
    if (bundle) {
      this.count--;
      if (bundle.count > 1) {
        bundle.count--;
        return true;
      } else {
        this.bundles.splice(this.bundles.indexOf(bundle), 1);
        return true;
      }
    } else {
      return false;
    }
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

  public cardLimit(card: PokemonTCG.Card): number {
    if (card.supertype === 'Energy' && card.subtype === 'Basic') {
      return 59;
    }
    if (card.name.endsWith('◇')) {
      return 1;
    }
    if (this.isStarCard(card)) {
      for (const bundle of this.bundles) {
        if (this.isStarCard(bundle.card)) {
          return 0;
        }
      }
      return 1;
    }
    if (card.rarity.includes('ACE')) {
      return 1;
    }
    return 4;
  }

  public isStarCard(card: PokemonTCG.Card): boolean {
    return (card.name.endsWith(' Star') || card.name.endsWith(' Star δ'));
  }
}

export interface CardBundle {
  card: PokemonTCG.Card;
  count: number;
}
