import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { ICard, IComment } from "../../types/types";
import { PopupDescription } from "./PopupDescription";
import { PopupComments } from "./PopupComments";
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
}

type Props = StateProps & DispatchProps;

const Popup: React.FC<Props> = (props) => {
  if (props.card.title === "") return null;

  const [cardTitle, setCardTitle] = useState<string>(props.card.title);

  const cardTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.addEventListener("keydown", closePopup);
    return () => {
      window.removeEventListener("keydown", closePopup);
    };
  }, []);

  function closePopup(e: KeyboardEvent) {
    if (e.key === "Escape") {
      props.clearPopup();
    }
  }

  function changeTitleHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setCardTitle(e.target.value);
  }

  function titleKeyPressHandler(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      if (cardTitle.length > 0) {
        cardTitleRef.current?.blur();
        props.updateTitle(cardTitle);
        props.updateCard({ ...props.card, title: cardTitle });
      } else {
        setCardTitle(props.card.title);
      }
    }
  }

  function updateDescriptionHandler(newDescription: string) {
    props.updateDescription(newDescription);
    props.updateCard({ ...props.card, description: newDescription });
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
  }

  function updateCommentHandler(commentId: string, text: string) {
    const comments = props.card.comments.map((comment) => {
      return comment.id === commentId ? { ...comment, text } : comment;
    });

    props.updateComments(comments);
    props.updateCard({ ...props.card, comments });
  }

  function deleteCommentHandler(commentId: string) {
    const comments = props.card.comments.filter(
      (comment) => comment.id !== commentId
    );

    props.updateComments(comments);
    props.updateCard({ ...props.card, comments });
  }

  return (
    <>
      <div className="popup__wrapper">
        <div className="popup bg-light rounded">
          <div>
            <input
              type="text"
              value={cardTitle}
              className="popup__title h4"
              onChange={changeTitleHandler}
              ref={cardTitleRef}
              onKeyDown={titleKeyPressHandler}
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
  updateTitle: (newTitle: string) => ({
    type: "SET_POPUP_TITLE",
    payload: newTitle,
  }),
  updateDescription: (newDescription: string) => ({
    type: "SET_POPUP_DESCRIPTION",
    payload: newDescription,
  }),
  updateComments: (comments: IComment[]) => ({
    type: "SET_POPUP_COMMENTS",
    payload: comments,
  }),
  updateCard: (card: ICard) => ({
    type: "UPDATE_CARD",
    payload: card,
  }),
  clearPopup: () => ({ type: "CLEAR_POPUP" }),
};

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(Popup);
