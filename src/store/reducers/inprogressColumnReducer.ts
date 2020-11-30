import {
  ADD_INPROGRESS_CARD,
  LOAD_INPROGRESS,
  REMOVE_PROGRESS_CARD,
  UPDATE_TITLE_INPROGRESS,
  UPDATE_CARD,
  DELETE_CARD
} from "../actions/actionTypes";
import { IColumnState } from '../../types/types'

const initialState: IColumnState = {
  title: 'in progress',
  cards: []
}

export default function doneCardReducer(state = initialState, action: any): IColumnState {
  switch(action.type) {
    case LOAD_INPROGRESS:
      return {...action.payload};
    case ADD_INPROGRESS_CARD:
      return {...state, cards: state.cards.concat(action.payload)};
    case REMOVE_PROGRESS_CARD:
      return {...state, cards: state.cards.filter((c:any) => c !== action.payload)};
    case UPDATE_TITLE_INPROGRESS:
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