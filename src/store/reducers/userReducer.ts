import { IUserState } from '../../types/types';
import { localStorageAgent } from '../../agent/LocalStorageAgent';
import { LOAD_USER, LOGOUT } from "../actions/actionTypes";

const username = localStorageAgent.loadUsername();

const initialState: IUserState = {
  username: username ? username : '',
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