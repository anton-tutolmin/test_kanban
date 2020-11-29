import React, { useState } from "react";
import { Comment } from "../comment/Comment";
import { IComment } from "../../types/types";

interface CommentsProps {
  comments: IComment[];
  username: string;
  onAdd(comment: string): void;
  onUpdate(commentId: string, text: string): void;
  onDelete(commentId: string): void;
}

export const PopupComments: React.FC<CommentsProps> = (props) => {
  const [comment, setComment] = useState<string>("");

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    setComment(e.target.value);
  }

  function addCommentHandler(e: React.MouseEvent<HTMLButtonElement>) {
    if (comment.length > 0) {
      props.onAdd(comment);
      setComment("");
    }
  }

  return (
    <div className="comments mt-md-2">
      <div className="h4">
        <strong>Comments:</strong>
      </div>
      <div className="comments__form">
        <input
          type="text"
          className="w-100"
          placeholder="Write your comment..."
          value={comment}
          onChange={changeHandler}
        />
        <button
          type="button"
          className="btn btn-success mt-md-1"
          onClick={addCommentHandler}
        >
          Add
        </button>
      </div>
      <div className="comments__list">
        {props.comments.map((c) => (
          <Comment
            key={c.id}
            comment={c}
            username={props.username}
            onUpdate={props.onUpdate}
            onDelete={props.onDelete}
          />
        ))}
      </div>
    </div>
  );
};
