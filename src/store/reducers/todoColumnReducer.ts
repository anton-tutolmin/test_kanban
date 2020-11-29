import { LOAD_TODO, ADD_TODO_CARD, REMOVE_TODO_CARD, UPDATE_TITLE_TODO, UPDATE_CARD } from '../actions/actionTypes';
import { IColumnState } from '../../types/types'

const initialState: IColumnState = {
  title: 'todo',
  cards: []
}

export default function doneCardReducer(state = initialState, action: any): IColumnState {
  switch(action.type) {
    case LOAD_TODO:
      return {...action.payload};
    case ADD_TODO_CARD:
      return {...state, cards: state.cards.concat(action.payload)};
    case REMOVE_TODO_CARD:
      return {...state, cards: state.cards.filter((c:any) => c !== action.payload)};
    case UPDATE_TITLE_TODO:
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
    default: return state;
  }
}