import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { ICard } from '../../types/types';
import { deleteCard, loadPopup } from '../../store/actions/actions';
import { PencilIcon } from '../icons/PencilIcon';
import { localStorageAgent } from '../../agent/LocalStorageAgent';
import './Card.scss';

interface DispatchProps {
  setPopup: (card: ICard) => void;
  deleteCard: (cardId: string) => void;
}

interface OwnProps {
  card: ICard;
  draggable: boolean;
}

type Props = DispatchProps & OwnProps;

const Card: React.FC<Props> = ({ card, draggable, setPopup, deleteCard }) => {
  const btnEl = useRef<HTMLButtonElement>(null);

  function showBtn() {
    btnEl.current?.classList.add('active');
  }

  function hideBtn() {
    btnEl.current?.classList.remove('active');
  }

  function clickHandler() {
    setPopup({ ...card });
  }

  function onDragStart(e: any) {
    e.dataTransfer.setData('card', JSON.stringify(card));

    setTimeout(() => {
      deleteCard(card.id);
      localStorageAgent.deleteCard(card.id, card.key);
    }, 0);
  }

  return (
    <div
      className="task-card d-flex justify-content-between my-md-2 px-md-2 py-md-1 shadow-sm rounded"
      onMouseEnter={showBtn}
      onMouseLeave={hideBtn}
      onDragStart={onDragStart}
      draggable={draggable}
    >
      <div>{card.title}</div>
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
  setPopup: (card: ICard) => loadPopup(card),
  deleteCard: (cardId: string) => deleteCard(cardId),
};

export default connect<null, DispatchProps>(null, mapDispatch)(Card);
