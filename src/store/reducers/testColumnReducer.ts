import {
  LOAD_TEST,
  ADD_TEST_CARD,
  REMOVE_TEST_CARD,
  UPDATE_TITLE_TEST,
  UPDATE_CARD,
  DELETE_CARD
} from '../actions/actionTypes';
import { IColumnState } from '../../types/types';
import { localStorageAgent } from '../../agent/LocalStorageAgent';

const test = localStorageAgent.loadTest();

const initialState: IColumnState = {
  title: test ? test.title : 'test',
  cards: test ? test.cards : []
}

export default function doneCardReducer(state = initialState, action: any): IColumnState {
  switch(action.type) {
    case LOAD_TEST:
      return {...action.payload};
    case ADD_TEST_CARD:
      return {...state, cards: state.cards.concat(action.payload)};
    case REMOVE_TEST_CARD:
      return {...state, cards: state.cards.filter((c:any) => c !== action.payload)};
    case UPDATE_TITLE_TEST:
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