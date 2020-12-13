export interface IComment {
  id: string;
  cardId: string;
  author: string;
  text: string;
}

export interface ICard {
  id: string;
  key: string;
  title: string;
  column: string;
  description: string;
  author: string;
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
  cardId: string,
  cardKey: string,
  cardTitle: string;
  columnTitle: string;
  cardAuthor: string;
  cardDescription: string;
  cardComments: IComment[];
}