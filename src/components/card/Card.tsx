import React, { useRef } from "react";
import { ICard } from "../../ifaces/ICard";
import { PencilIcon } from "../icons/PencilIcon";
import "./Card.scss";

interface CardProps {
  card: ICard;
}

export const Card: React.FC<CardProps> = (props) => {
  const btnEl = useRef<HTMLButtonElement>(null);

  function showBtn() {
    btnEl.current?.classList.add("active");
  }

  function hideBtn() {
    btnEl.current?.classList.remove("active");
  }

  return (
    <div
      className="task-card d-flex justify-content-between my-md-2 px-md-2 py-md-1 shadow-sm rounded"
      onMouseEnter={showBtn}
      onMouseLeave={hideBtn}
    >
      <div>{props.card.title}</div>
      <button
        type="button"
        className="task-card__chng-title-btn text-secondary rounded"
        ref={btnEl}
      >
        <PencilIcon />
      </button>
    </div>
  );
};
