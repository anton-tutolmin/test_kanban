export interface IComment {
  id: string;
  cardId: string;
  author: string;
  text: string;
}

export interface ICard {
  id: string;
  title: string;
  description: string;
  author: string;
  column: string;
  comments: IComment[];
}

export interface IColumnState {
  title: string;
  cards: ICard[];
}

export interface IUserState {
  username: string;
}

export interface IPopupState {
  title: string;
  column: string;
  author: string;
  description: string;
  comments: IComment[];
}