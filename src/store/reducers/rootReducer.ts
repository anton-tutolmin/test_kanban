import {combineReducers} from 'redux'
import user from './userReducer';
import popup from './popupReducer';
import todo from './todoColumnReducer';
import inProgress from './inprogressColumnReducer';
import test from './testColumnReducer';
import done from './doneColumnReducer';

export const rootReducer = combineReducers({
  user,
  popup,
  todo,
  inProgress,
  test,
  done
})

export type RootState = ReturnType<typeof rootReducer>