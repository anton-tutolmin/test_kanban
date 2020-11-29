import React, { useRef } from "react";
import { connect } from "react-redux";
import { PencilIcon } from "../icons/PencilIcon";
import { ICard } from "../../types/types";
import "./Card.scss";

interface DispatchProps {
  setPopup: (card: ICard) => void;
}

interface OwnProps {
  card: ICard;
}

type Props = DispatchProps & OwnProps;

const Card: React.FC<Props> = (props) => {
  const btnEl = useRef<HTMLButtonElement>(null);

  function showBtn() {
    btnEl.current?.classList.add("active");
  }

  function hideBtn() {
    btnEl.current?.classList.remove("active");
  }

  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    props.setPopup(props.card);
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
        onClick={clickHandler}
      >
        <PencilIcon />
      </button>
    </div>
  );
};

const mapDispatch = {
  setPopup: (card: ICard) => ({ type: "LOAD_POPUP", payload: card }),
};

export default connect<null, DispatchProps>(null, mapDispatch)(Card);
