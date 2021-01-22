export type Nullable<T> = T | null;

export interface Letter {
  value: string;
  color: string;
}

export interface IUser {
  username: string;
  authToken: string;
  id: string;
}

export interface Player {
  _id: string;
  isPartyLeader: boolean;
  user: {
    _id: string;
    username: string;
    tag: number;
  };
  color: string;
  currentWordIndex: number;
  WPM: number;
}

export interface Room {
  _id: string;
  paragraph: string;
  gameStarted: boolean;
  players: Player[];
}
