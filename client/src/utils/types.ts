export type Nullable<T> = T | null;

export interface Letter {
  value: string;
  color: string;
}

export interface User {}

export interface Player {
  _id: string;
  isPartyLeader: boolean;
  user: {
    _id: string;
    username: string;
    tag: number;
  };
  color: string;
  currentPercentage: boolean;
  finalPosition: number;
  WPM: number;
}

export interface Room {
  _id: string;
  paragraph: string;
  gameStarted: boolean;
  players: Player[];
}
