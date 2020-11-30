import {
  ADD_DONE_CARD,
  LOAD_DONE,
  REMOVE_DONE_CARD,
  UPDATE_TITLE_DONE,
  UPDATE_CARD,
  DELETE_CARD
} from "../actions/actionTypes";
import { IColumnState } from '../../types/types';
import { localStorageAgent } from '../../agent/LocalStorageAgent';

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
    case REMOVE_DONE_CARD:
      return {...state, cards: state.cards.filter((c:any) => c !== action.payload)};
    case UPDATE_TITLE_DONE:
      return {...state, title: action.payload};
    case UPDATE_CARD: {
      const cards = state.cards.map(card => {
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