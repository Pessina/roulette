export type Item = {
  id: string;
  item: string;
  probability: number;
};

export interface Result<T> {
  data?: T;
  error?: string;
}

export type ProfileData = {
  companyName: string;
  logo: string;
  rouletteColors: { hex: string }[];
};
