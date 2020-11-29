import React, { useState } from "react";
import { Comment } from "../comment/Comment";
import { IComment } from "../../ifaces/IComment";

interface CommentsProps {
  comments: IComment[];
}

export const PopupComments: React.FC<CommentsProps> = (props) => {
  const [comment, setComment] = useState<string>("");

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    setComment(e.target.value);
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
        <button type="button" className="btn btn-success mt-md-1">
          Add
        </button>
      </div>
      <div className="comments__list">
        {props.comments.map((c) => (
          <Comment comment={c} />
        ))}
      </div>
    </div>
  );
};
