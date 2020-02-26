import { AxiosInstance } from 'axios';
import { Client } from '@/network';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { CardPrice } from '@/types/network';

export function getCardPrice(
  id: string,
  client: AxiosInstance = Client,
): Promise<CardPrice> {
  return new Promise((resolve, reject) => {
    client.get(`/card/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
