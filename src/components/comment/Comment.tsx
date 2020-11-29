import React, { useState } from "react";
import { IComment } from "../../types/types";
import "./Comment.scss";

interface CommentProps {
  comment: IComment;
  username: string;
  onUpdate(commentId: string, text: string): void;
  onDelete(commentId: string): void;
}

export const Comment: React.FC<CommentProps> = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);

  function openUpdatingView() {
    setIsUpdating(true);
  }

  function closeUpdatingView() {
    setIsUpdating(false);
  }

  function updateCommentHandler(text: string) {
    props.onUpdate(props.comment.id, text);
    setIsUpdating(false);
  }

  function deleteCommentHandler() {
    props.onDelete(props.comment.id);
  }

  return (
    <div className="comment my-md-2">
      <div className="comment__title text-secondary">
        <i>{props.comment.author}</i>
      </div>
      {isUpdating ? (
        <UpdatingView
          text={props.comment.text}
          onSave={updateCommentHandler}
          onClose={closeUpdatingView}
        />
      ) : (
        <>
          <div className="comment__text p-md-1 bg-white shadow-sm rounded border">
            {props.comment.text}
          </div>
          {props.username === props.comment.author ? (
            <div className="comment__control">
              <button
                type="button"
                className="text-secondary"
                onClick={openUpdatingView}
              >
                update
              </button>
              <button
                type="button"
                className="text-danger"
                onClick={deleteCommentHandler}
              >
                delete
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

interface UpdatingViewProps {
  text: string;
  onSave(text: string): void;
  onClose(): void;
}

const UpdatingView: React.FC<UpdatingViewProps> = (props) => {
  const [text, setText] = useState(props.text);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function saveHandler() {
    props.onSave(text);
  }

  function cancelHandler() {
    props.onClose();
  }

  return (
    <div>
      <input
        value={text}
        type="text"
        className="w-100 mb-md-1"
        onChange={changeHandler}
      />
      <button
        type="button"
        className="btn btn-success mr-md-1"
        onClick={saveHandler}
      >
        Save
      </button>
      <button
        type="button"
        className="btn btn-danger mr-md-1"
        onClick={cancelHandler}
      >
        Cancel
      </button>
    </div>
  );
};
