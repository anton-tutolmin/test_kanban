import { IColumnState, ICard } from '../../types/types';
import { localStorageAgent } from '../../agent/LocalStorageAgent';
import {
  ADD_DONE_CARD,
  LOAD_DONE,
  UPDATE_TITLE_DONE,
  UPDATE_CARD,
  DELETE_CARD
} from "../actions/actionTypes";

const done = localStorageAgent.loadDone();

const initialState: IColumnState = {
  title: done ? done.title : 'done',
  cards: done ? done.cards : [],
}

export default function doneCardReducer(state = initialState, action: any): IColumnState {
  switch(action.type) {
    case LOAD_DONE:
      return {...action.payload};
    case ADD_DONE_CARD:
      return {...state, cards: state.cards.concat(action.payload)};
    case UPDATE_TITLE_DONE: {
      const cards = state.cards.map((card: ICard) => {
        card.column = action.payload;
        return card;
      });
      return { title: action.payload, cards };
    };
    case UPDATE_CARD: {
      const cards = state.cards.map((card: ICard) => {
        if (card.id === action.payload.id) {
          return {...action.payload}
        } else {
          return card;
        }
      });
      return {...state, cards};
    };
    case DELETE_CARD: {
      const cards = state.cards.filter(card => card.id !== action.payload);
      return { ...state, cards };
    };
    default: return state;
  }
}