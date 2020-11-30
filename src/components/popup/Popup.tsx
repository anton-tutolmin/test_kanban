import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { localStorageAgent } from "../../agent/LocalStorageAgent";
import { ICard, IComment } from "../../types/types";
import { PopupDescription } from "./PopupDescription";
import { PopupComments } from "./PopupComments";
import {
  updatePopupTitle,
  updatePopupDescription,
  updatePopupComments,
  updateCard,
  clearPopup,
  deleteCard,
} from "../../store/actions/actions";
import "./Popup.scss";

interface StateProps {
  card: ICard;
  username: string;
}

interface DispatchProps {
  updateTitle: (newTitle: string) => void;
  updateDescription: (newDescription: string) => void;
  updateComments: (comments: IComment[]) => void;
  updateCard: (card: ICard) => void;
  clearPopup: () => void;
  deleteCard: (cardId: string) => void;
}

type Props = StateProps & DispatchProps;

const Popup: React.FC<Props> = (props) => {
  if (props.card.title === "") return null;

  const [cardTitle, setCardTitle] = useState<string>(props.card.title);

  const cardTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function closePopupOnEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        props.clearPopup();
      }
    }

    window.addEventListener("keydown", closePopupOnEsc);

    return () => {
      window.removeEventListener("keydown", closePopupOnEsc);
    };
  }, []);

  function closePopup() {
    props.clearPopup();
  }

  function changeTitleHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setCardTitle(e.target.value);
  }

  function keyPressHandler(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      if (cardTitle.length > 0) {
        cardTitleRef.current?.blur();
        props.updateTitle(cardTitle);
        props.updateCard({ ...props.card, title: cardTitle });
        localStorageAgent.updateCard({ ...props.card, title: cardTitle });
      } else {
        setCardTitle(props.card.title);
      }
    }
  }

  function updateDescriptionHandler(newDescription: string) {
    props.updateDescription(newDescription);
    props.updateCard({ ...props.card, description: newDescription });
    localStorageAgent.updateCard({
      ...props.card,
      description: newDescription,
    });
  }

  function addCommentHandler(text: string) {
    const newComment = {
      id: `${Math.random() + text.length}`,
      cardId: props.card.id,
      author: props.username,
      text,
    };

    const comments = [...props.card.comments, newComment];

    props.updateComments(comments);
    props.updateCard({ ...props.card, comments });
    localStorageAgent.updateCard({ ...props.card, comments });
  }

  function updateCommentHandler(commentId: string, text: string) {
    const comments = props.card.comments.map((comment) => {
      return comment.id === commentId ? { ...comment, text } : comment;
    });

    props.updateComments(comments);
    props.updateCard({ ...props.card, comments });
    localStorageAgent.updateCard({ ...props.card, comments });
  }

  function deleteCommentHandler(commentId: string) {
    const comments = props.card.comments.filter(
      (comment) => comment.id !== commentId
    );

    props.updateComments(comments);
    props.updateCard({ ...props.card, comments });
    localStorageAgent.updateCard({ ...props.card, comments });
  }

  function deleteCardHandler() {
    props.deleteCard(props.card.id);
    localStorageAgent.deleteCard(props.card);
    props.clearPopup();
  }

  return (
    <>
      <div className="popup__wrapper">
        <div className="popup bg-light rounded">
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closePopup}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div>
            <input
              type="text"
              value={cardTitle}
              className="popup__title h4"
              onChange={changeTitleHandler}
              ref={cardTitleRef}
              onKeyDown={keyPressHandler}
            />
          </div>
          <div className="title__column-name">
            <span className="text-secondary">in column</span>
            <strong>{` ${props.card.column}`}</strong>
          </div>
          <div className="title__author">
            <span className="text-secondary">author</span>
            <strong>{` ${props.card.author}`}</strong>
          </div>
          <div className="title__delete-btn">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteCardHandler}
            >
              Delete
            </button>
          </div>
          <PopupDescription
            description={props.card.description}
            onUpdate={updateDescriptionHandler}
          />
          <PopupComments
            comments={props.card.comments}
            username={props.username}
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
  updateTitle: (newTitle: string) => updatePopupTitle(newTitle),
  updateDescription: (newDescription: string) =>
    updatePopupDescription(newDescription),
  updateComments: (comments: IComment[]) => updatePopupComments(comments),
  updateCard: (card: ICard) => updateCard(card),
  clearPopup: () => clearPopup(),
  deleteCard: (cardId: string) => deleteCard(cardId),
};

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(Popup);
