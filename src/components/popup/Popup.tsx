import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { localStorageAgent } from '../../agent/LocalStorageAgent';
import { ICard, IComment, IPopupState } from '../../types/types';
import { PopupDescription } from './PopupDescription';
import { PopupComments } from './PopupComments';
import {
  updatePopupTitle,
  updatePopupDescription,
  updatePopupComments,
  updateCard,
  clearPopup,
  deleteCard,
} from '../../store/actions/actions';
import './Popup.scss';

interface StateProps {
  popupData: IPopupState;
  username: string;
}

interface DispatchProps {
  updateTitle: (newTitle: string) => void;
  updateDescription: (newDescription: string) => void;
  updateComments: (comments: IComment[]) => void;
  updateInState: (popupData: IPopupState) => void;
  deleteFromState: (cardId: string) => void;
  clearPopup: () => void;
}

type Props = StateProps & DispatchProps;

const Popup: React.FC<Props> = ({
  popupData,
  username,
  updateTitle,
  updateDescription,
  updateComments,
  updateInState,
  deleteFromState,
  clearPopup,
}) => {
  if (popupData.cardTitle === '') return null;

  const [popupTitle, setPopupTitle] = useState<string>(popupData.cardTitle);

  const cardTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.addEventListener('keydown', closePopupOnEsc);

    return () => {
      window.removeEventListener('keydown', closePopupOnEsc);
    };
  }, []);

  function closePopupOnEsc(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      clearPopup();
    }
  }

  function closePopup() {
    clearPopup();
  }

  function changeTitleHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPopupTitle(e.target.value);
  }

  function updateTitleHandler(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      if (popupTitle.length > 0) {
        cardTitleRef.current?.blur();
        updateTitle(popupTitle);
        updateInState({ ...popupData, cardTitle: popupTitle });
        localStorageAgent.updateCard({ ...popupData, cardTitle: popupTitle });
      } else {
        setPopupTitle(popupData.cardTitle);
      }
    }
  }

  function updateDescriptionHandler(newDescription: string) {
    updateDescription(newDescription);
    updateInState({ ...popupData, cardDescription: newDescription });
    localStorageAgent.updateCard({
      ...popupData,
      cardDescription: newDescription,
    });
  }

  function addCommentHandler(text: string) {
    const newComment: IComment = {
      id: `${Date.now()}`,
      cardId: popupData.cardId,
      author: username,
      text,
    };

    const cardComments: IComment[] = [...popupData.cardComments, newComment];

    updateComments(cardComments);
    updateInState({ ...popupData, cardComments });
    localStorageAgent.updateCard({ ...popupData, cardComments });
  }

  function updateCommentHandler(commentId: string, text: string) {
    const comments = popupData.cardComments.map((comment) => {
      return comment.id === commentId ? { ...comment, text } : comment;
    });

    updateComments(comments);
    updateInState({ ...popupData, cardComments: comments });
    localStorageAgent.updateCard({ ...popupData, cardComments: comments });
  }

  function deleteCommentHandler(commentId: string) {
    const cardComments = popupData.cardComments.filter((comment) => comment.id !== commentId);

    updateComments(cardComments);
    updateInState({ ...popupData, cardComments });
    localStorageAgent.updateCard({ ...popupData, cardComments });
  }

  function deleteCardHandler() {
    deleteFromState(popupData.cardId);
    localStorageAgent.deleteCard(popupData.cardId, popupData.cardKey);
    clearPopup();
  }

  return (
    <>
      <div className="popup__wrapper">
        <div className="popup bg-light rounded">
          <button type="button" className="close" aria-label="Close" onClick={closePopup}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div>
            <input
              type="text"
              value={popupTitle}
              className="popup__title h4"
              onChange={changeTitleHandler}
              ref={cardTitleRef}
              onKeyDown={updateTitleHandler}
            />
          </div>
          <div className="title__author">
            <span className="text-secondary">author</span>
            <strong>{` ${popupData.cardAuthor}`}</strong>
          </div>
          <div className="title__author">
            <span className="text-secondary">column</span>
            <strong>{` ${popupData.columnTitle}`}</strong>
          </div>
          <div className="title__delete-btn">
            <button type="button" className="btn btn-danger" onClick={deleteCardHandler}>
              Delete
            </button>
          </div>
          <PopupDescription description={popupData.cardDescription} onUpdate={updateDescriptionHandler} />
          <PopupComments
            comments={popupData.cardComments}
            username={username}
            onAdd={addCommentHandler}
            onUpdate={updateCommentHandler}
            onDelete={deleteCommentHandler}
          />
        </div>
      </div>
      <div className="popup__backlog" />
    </>
  );
};

const mapState = (state: any) => ({
  popupData: state.popup,
  username: state.user.username,
});

const mapDispatch = {
  updateTitle: (newTitle: string) => updatePopupTitle(newTitle),
  updateDescription: (newDescription: string) => updatePopupDescription(newDescription),
  updateComments: (comments: IComment[]) => updatePopupComments(comments),
  updateInState: (popupDate: IPopupState) => updateCard(popupDate),
  deleteFromState: (cardId: string) => deleteCard(cardId),
  clearPopup: () => clearPopup(),
};

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(Popup);
