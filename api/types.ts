export type Item = {
  id: string;
  item: string;
  probability: number;
};

export interface Result<T> {
  data?: T;
  error?: string;
}

export interface ProfileData {
  companyName: string;
  rouletteColors: string;
  logo?: string;
}
