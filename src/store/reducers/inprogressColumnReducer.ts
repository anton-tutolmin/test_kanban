import { IColumnState, ICard } from '../../types/types';
import { localStorageAgent } from '../../agent/LocalStorageAgent';
import {
  ADD_INPROGRESS_CARD,
  LOAD_INPROGRESS,
  UPDATE_TITLE_INPROGRESS,
  UPDATE_CARD,
  DELETE_CARD
} from "../actions/actionTypes";

const inProgress = localStorageAgent.loadInProgress();

const initialState: IColumnState = {
  title: inProgress ? inProgress.title : 'in progress',
  cards: inProgress ? inProgress.cards : []
}

export default function doneCardReducer(state = initialState, action: any): IColumnState {
  switch(action.type) {
    case LOAD_INPROGRESS:
      return {...action.payload};
    case ADD_INPROGRESS_CARD:
      return {...state, cards: state.cards.concat(action.payload)};
    case UPDATE_TITLE_INPROGRESS: {
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
      const cards = state.cards.filter((card: ICard) => card.id !== action.payload);
      return { ...state, cards };
    };
    default: return state;
  }
}