import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon } from '../icons/PlusIcon';
import Card from '../card/Card';
import { ICard } from '../../types/types';
import './Column.scss';

interface ColumnProps {
  title: string;
  cards: ICard[];
  addCard(card: ICard): void;
  onUpdateTitle(newTitle: string): void;
}

export const Column: React.FC<ColumnProps> = ({ title, cards, addCard, onUpdateTitle }) => {
  const [newTitle, setNewTitle] = useState<string>(title);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);

  function titleChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(e.target.value);
  }

  function keyPressHandler(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      if (title.length === 0) {
        setNewTitle(title);
      } else {
        onUpdateTitle(newTitle);
        titleRef.current?.blur();
      }
    }
  }

  function blurHandler() {
    if (title.length === 0) {
      setNewTitle(title);
    } else {
      onUpdateTitle(newTitle);
    }
  }

  function addCardHandler(newCardTitle: string) {
    setIsCreating(false);
    addCard({
      id: `${Date.now()}`,
      key: '',
      column: '',
      title: newCardTitle,
      author: '',
      description: '',
      comments: [],
    });
  }

  function closeCreatingViewHandler() {
    setIsCreating(false);
  }

  function dragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();

    const tmp = e.dataTransfer?.getData('card');

    const card = JSON.parse(tmp) as ICard;

    addCard(card);
  }

  return (
    <>
      <div className="cards_column bg-light mx1 px1" onDragOver={dragOver} onDrop={onDrop}>
        <input
          className="column__title text-dark"
          type="text"
          value={newTitle}
          onChange={titleChangeHandler}
          onKeyPress={keyPressHandler}
          onBlur={blurHandler}
          ref={titleRef}
        />
        {cards.map((c) => (
          <Card card={c} key={Math.random()} draggable />
        ))}
        {isCreating ? (
          <CreatingView onClose={closeCreatingViewHandler} onAddCard={addCardHandler} />
        ) : (
          <button type="button" className="column__add-card-btn text-danger" onClick={() => setIsCreating(true)}>
            <PlusIcon />
            Add card
          </button>
        )}
      </div>
    </>
  );
};

interface CreatingViewProps {
  onClose(): void;
  onAddCard(newCardTitle: string): void;
}

const CreatingView: React.FC<CreatingViewProps> = (props) => {
  const [title, setTitle] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setTitle(e.target.value);
  }

  function keyPressHandler(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && title.length !== 0) {
      props.onAddCard(title);
    }
  }

  return (
    <>
      <textarea
        className="form-control"
        id="card-title"
        value={title}
        placeholder="Enter card's title"
        onChange={changeHandler}
        onKeyDown={keyPressHandler}
        ref={textareaRef}
      />
      <div className="cards_column__control_btns">
        <button type="button" className="btn btn btn-success" onClick={() => props.onAddCard(title)}>
          Add
        </button>
        <button type="button" className="close" aria-label="Close" onClick={() => props.onClose()}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </>
  );
};
