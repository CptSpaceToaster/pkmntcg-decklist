export enum NavigationStatus {
  LOADING, ERROR, NONE,
}

export interface CardPrice {
  id: string;
  tcg_player_id: string;

  normal_directLowPrice: number | null;
  normal_highPrice: number | null;
  normal_lowPrice: number | null;
  normal_marketPrice: number | null;
  normal_midPrice: number | null;

  holofoil_directLowPrice: number | null;
  holofoil_highPrice: number | null;
  holofoil_lowPrice: number | null;
  holofoil_marketPrice: number | null;
  holofoil_midPrice: number | null;

  reverse_holofoil_directLowPrice: number | null;
  reverse_holofoil_highPrice: number | null;
  reverse_holofoil_lowPrice: number | null;
  reverse_holofoil_marketPrice: number | null;
  reverse_holofoil_midPrice: number | null;
}
