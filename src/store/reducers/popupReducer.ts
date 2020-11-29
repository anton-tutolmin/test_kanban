import { CLEAR_POPUP, LOAD_POPUP, SET_POPUP_COMMENTS, SET_POPUP_DESCRIPTION, SET_POPUP_TITLE } from "../actions/actionTypes";
import { IPopupState } from '../../types/types'

const initialState: IPopupState = {
  title: '',
  column: '',
  author: '',
  description: '',
  comments: [],
}

export default function popupReducer(state = initialState, action: any): IPopupState {
  switch(action.type) {
    case LOAD_POPUP: return { ...action.payload };
    case CLEAR_POPUP: return { ...initialState };
    case SET_POPUP_DESCRIPTION: return { ...state, description: action.payload };
    case SET_POPUP_COMMENTS: return { ...state, comments: action.payload };
    case SET_POPUP_TITLE: return { ...state, title: action.payload };
    default: return state;
  }
}