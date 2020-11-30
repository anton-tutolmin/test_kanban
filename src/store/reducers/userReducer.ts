import { LOAD_USER, LOGOUT } from "../actions/actionTypes";
import { IUserState } from '../../types/types';

const initialState: IUserState = {
  username: ''
}

export default function userReducer(state = initialState, action: any): IUserState {
  switch(action.type) {
    case LOAD_USER:
      return {
        username: action.payload
      };
    case LOGOUT:
      return {
        username: ''
      };
    default: return state;
  }
}