import { CLEAR_POPUP, LOAD_POPUP, SET_POPUP_COMMENTS, SET_POPUP_DESCRIPTION, SET_POPUP_TITLE } from "../actions/actionTypes";
import { IPopupState } from '../../types/types'

const initialState: IPopupState = {
  cardId: '-1',
  cardKey: '',
  cardTitle: '',
  columnTitle: '',
  cardAuthor: '',
  cardDescription: '',
  cardComments: [],
}

export default function popupReducer(state = initialState, action: any): IPopupState {
  switch(action.type) {
    case LOAD_POPUP: return { ...action.payload };
    case CLEAR_POPUP: return { ...initialState };
    case SET_POPUP_DESCRIPTION: return { ...state, cardDescription: action.payload };
    case SET_POPUP_COMMENTS: return { ...state, cardComments: action.payload };
    case SET_POPUP_TITLE: return { ...state, cardTitle: action.payload };
    default: return state;
  }
}