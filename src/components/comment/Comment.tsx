import React from "react";
import { IComment } from "../../ifaces/IComment";
import "./Comment.scss";

interface CommentProps {
  comment: IComment;
}

export const Comment: React.FC<CommentProps> = (props) => {
  const author = "anton";
  return (
    <div className="comment my-md-2">
      <div className="comment__title text-secondary">
        <i>{props.comment.author}</i>
      </div>
      <div className="comment__text p-md-1 bg-white shadow-sm rounded border">
        {props.comment.text}
      </div>
      {author === props.comment.author ? (
        <div className="comment__control">
          <button type="button" className="text-secondary">
            update
          </button>
          <button type="button" className="text-danger">
            delete
          </button>
        </div>
      ) : null}
    </div>
  );
};
