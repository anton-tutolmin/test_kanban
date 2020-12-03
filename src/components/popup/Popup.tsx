import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { localStorageAgent } from '../../agent/LocalStorageAgent';
import { ICard, IComment } from '../../types/types';
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
  card: ICard;
  username: string;
}

interface DispatchProps {
  updateCardTitle: (newTitle: string) => void;
  updateCardDescription: (newDescription: string) => void;
  updateCardComments: (comments: IComment[]) => void;
  updateCard: (card: ICard) => void;
  clearPopup: () => void;
  deleteCard: (cardId: string) => void;
}

type Props = StateProps & DispatchProps;

const Popup: React.FC<Props> = ({
  card,
  username,
  updateCardTitle,
  updateCardDescription,
  updateCardComments,
  updateCard,
  clearPopup,
  deleteCard,
}) => {
  if (card.title === '') return null;

  const [cardTitle, setCardTitle] = useState<string>(card.title);

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
    setCardTitle(e.target.value);
  }

  function updateCardTitleHandler(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      if (cardTitle.length > 0) {
        cardTitleRef.current?.blur();
        updateCardTitle(cardTitle);
        updateCard({ ...card, title: cardTitle });
        localStorageAgent.updateCard({ ...card, title: cardTitle });
      } else {
        setCardTitle(card.title);
      }
    }
  }

  function updateDescriptionHandler(newDescription: string) {
    updateCardDescription(newDescription);
    updateCard({ ...card, description: newDescription });
    localStorageAgent.updateCard({
      ...card,
      description: newDescription,
    });
  }

  function addCommentHandler(text: string) {
    const newComment = {
      id: `${Math.floor(Math.random() * 10000)}`,
      cardId: card.id,
      author: username,
      text,
    };

    const comments = [...card.comments, newComment];

    updateCardComments(comments);
    updateCard({ ...card, comments });
    localStorageAgent.updateCard({ ...card, comments });
  }

  function updateCommentHandler(commentId: string, text: string) {
    const comments = card.comments.map((comment) => {
      return comment.id === commentId ? { ...comment, text } : comment;
    });

    updateCardComments(comments);
    updateCard({ ...card, comments });
    localStorageAgent.updateCard({ ...card, comments });
  }

  function deleteCommentHandler(commentId: string) {
    const comments = card.comments.filter((comment) => comment.id !== commentId);

    updateCardComments(comments);
    updateCard({ ...card, comments });
    localStorageAgent.updateCard({ ...card, comments });
  }

  function deleteCardHandler() {
    deleteCard(card.id);
    localStorageAgent.deleteCard(card);
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
              value={cardTitle}
              className="popup__title h4"
              onChange={changeTitleHandler}
              ref={cardTitleRef}
              onKeyDown={updateCardTitleHandler}
            />
          </div>
          <div className="title__column-name">
            <span className="text-secondary">in column</span>
            <strong>{` ${card.column}`}</strong>
          </div>
          <div className="title__author">
            <span className="text-secondary">author</span>
            <strong>{` ${card.author}`}</strong>
          </div>
          <div className="title__delete-btn">
            <button type="button" className="btn btn-danger" onClick={deleteCardHandler}>
              Delete
            </button>
          </div>
          <PopupDescription description={card.description} onUpdate={updateDescriptionHandler} />
          <PopupComments
            comments={card.comments}
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
  card: state.popup,
  username: state.user.username,
});

const mapDispatch = {
  updateCardTitle: (newTitle: string) => updatePopupTitle(newTitle),
  updateCardDescription: (newDescription: string) => updatePopupDescription(newDescription),
  updateCardComments: (comments: IComment[]) => updatePopupComments(comments),
  updateCard: (card: ICard) => updateCard(card),
  clearPopup: () => clearPopup(),
  deleteCard: (cardId: string) => deleteCard(cardId),
};

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(Popup);
