import { IColumnState, ICard } from '../../types/types';
import { localStorageAgent } from '../../agent/LocalStorageAgent';
import { LOAD_TEST, ADD_TEST_CARD, UPDATE_TITLE_TEST, UPDATE_CARD, DELETE_CARD } from '../actions/actionTypes';

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
    case UPDATE_TITLE_TEST: {
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