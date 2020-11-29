import React from "react";
import { ICard } from "../../ifaces/ICard";
import { PopupDescription } from "./PopupDescription";
import { PopupComments } from "./PopupComments";
import "./Popup.scss";

interface PopupProps {
  card: ICard;
}

export const Popup: React.FC<PopupProps> = (props) => {
  return (
    <>
      <div className="test">
        <div className="popup bg-light rounded">
          <div className="popup__titile h4">
            <strong>{props.card.title}</strong>
          </div>
          <div className="title__column-name">
            <span className="text-secondary">in column</span>
            <strong>{` ${props.card.column}`}</strong>
          </div>
          <PopupDescription description="testtest" />
          <PopupComments
            comments={[
              { author: "anton", text: "It is stupid card" },
              {
                author: "pavel",
                text: "it's lame",
              },
            ]}
          />
        </div>
      </div>
      <div className="popup__backlog" />
    </>
  );
};
