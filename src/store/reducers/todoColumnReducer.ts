import { IColumnState, ICard } from '../../types/types'
import { localStorageAgent } from '../../agent/LocalStorageAgent';
import { LOAD_TODO, ADD_TODO_CARD, UPDATE_TITLE_TODO, UPDATE_CARD, DELETE_CARD } from '../actions/actionTypes';

const todo = localStorageAgent.loadTodo();

const initialState: IColumnState = {
  title: todo ? todo.title : 'todo',
  cards: todo ? todo.cards : []
}

export default function doneCardReducer(state: any = initialState, action: any): IColumnState {
  switch(action.type) {
    case LOAD_TODO:
      return { ...action.payload };
    case ADD_TODO_CARD:
      return { ...state, cards: state.cards.concat(action.payload) };
    case UPDATE_TITLE_TODO: {
      const cards = state.cards.map((card: ICard) => {
        card.column = action.payload;
        return card;
      });
      return { title: action.payload, cards };
    };
    case UPDATE_CARD: {
      const cards = state.cards.map((card: ICard) => {
        if (card.id === action.payload.id) {
          return { ...action.payload }
        } else {
          return card;
        }
      });
      return { ...state, cards };
    };
    case DELETE_CARD: {
      const cards = state.cards.filter((card: ICard) => card.id !== action.payload);
      return { ...state, cards };
    };
    default: return state;
  }
}