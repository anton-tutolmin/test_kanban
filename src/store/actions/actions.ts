import { ICard, IColumnState, IComment } from '../../types/types'
import {
  ADD_DONE_CARD,
  ADD_INPROGRESS_CARD,
  ADD_TEST_CARD,
  ADD_TODO_CARD,
  CLEAR_POPUP,
  DELETE_CARD,
  LOAD_DONE,
  LOAD_INPROGRESS,
  LOAD_POPUP,
  LOAD_TEST,
  LOAD_TODO,
  LOAD_USER,
  SET_POPUP_COMMENTS,
  SET_POPUP_DESCRIPTION,
  SET_POPUP_TITLE,
  UPDATE_CARD,
  UPDATE_TITLE_DONE,
  UPDATE_TITLE_INPROGRESS,
  UPDATE_TITLE_TEST,
  UPDATE_TITLE_TODO
} from './actionTypes';

export const loadPopup = (card: ICard) => ({ type: LOAD_POPUP, payload: card });

export const loadUser = (username: string) => ({type: LOAD_USER, payload: username});

export const loadTodo = (todo: IColumnState) => ({ type: LOAD_TODO, payload: todo });
export const loadInProgress = (inProgress: IColumnState) => ({ type: LOAD_INPROGRESS, payload: inProgress });
export const loadTest = (test: IColumnState) => ({ type: LOAD_TEST, payload: test });
export const loadDone = (done: IColumnState) => ({ type: LOAD_DONE, payload: done });

export const addDoneCard = (card: ICard) => ({ type: ADD_DONE_CARD, payload: card });
export const addInProgressCard = (card: ICard) => ({ type: ADD_INPROGRESS_CARD, payload: card });
export const addTodoCard = (card: ICard) => ({ type: ADD_TODO_CARD, payload: card });
export const addTestCard = (card: ICard) => ({ type: ADD_TEST_CARD, payload: card });


export const updateDoneTitle = (title: string) => ({ type: UPDATE_TITLE_DONE,payload: title });
export const updateInProgressTitle = (title: string) => ({ type: UPDATE_TITLE_INPROGRESS, payload: title });
export const updateTodoTitle = (title: string) => ({ type: UPDATE_TITLE_TODO, payload: title });
export const updateTestTitle = (title: string) => ({ type: UPDATE_TITLE_TEST,payload: title });

export const updatePopupTitle = (title: string) => ({ type: SET_POPUP_TITLE, payload: title });

export const updatePopupDescription = (description: string) => ({
  type: SET_POPUP_DESCRIPTION, payload: description
});

export const updatePopupComments = (comments: IComment[]) => ({ type: SET_POPUP_COMMENTS, payload: comments });
export const updateCard = (card: ICard) => ({ type: UPDATE_CARD, payload: card });
export const deleteCard = (cardId: string) => ({type: DELETE_CARD, payload: cardId})

export const clearPopup = () => ({ type: CLEAR_POPUP });