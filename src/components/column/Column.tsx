import React, { useState, useRef, useEffect } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../card/Card";
import "./Column.scss";

const card = {
  title: "test",
  description: "test",
  author: "test",
  column: "TODO",
  comments: [],
};

interface ColumnProps {
  title: string;
}

export const Column: React.FC<ColumnProps> = (props) => {
  const [title, setTitle] = useState<string>(props.title);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const [cards, setCards] = useState<any[]>([]);

  function titleChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function keyPressHandler(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      if (title.length === 0) {
        // TODO
        setTitle(props.title);
      } else {
        // TODO
      }
    }
  }

  function blurHandler(e: React.FocusEvent<HTMLInputElement>) {
    setTitle(props.title);
  }

  function addCardHandler(newCardTitle: string) {
    const newCard = {
      title: newCardTitle,
      description: "",
      author: "",
      column: "",
      comments: [],
    };

    setIsCreating(false);
    setCards([...cards, newCard]);
  }

  return (
    <>
      <div className="cards_column bg-light mx1 px1">
        <input
          className="column__title text-dark"
          type="text"
          value={title}
          onChange={titleChangeHandler}
          onKeyPress={keyPressHandler}
          onBlur={blurHandler}
        />
        {cards.map((c) => (
          <Card card={c} />
        ))}
        {isCreating ? (
          <CreatingView
            onClose={() => {
              setIsCreating(false);
            }}
            onAddCard={addCardHandler}
          />
        ) : (
          <button
            type="button"
            className="column__add-card-btn text-danger"
            onClick={() => setIsCreating(true)}
          >
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
  const [title, setTitle] = useState<string>("");
  const textareaEl = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaEl.current?.focus();
  }, []);

  function titleChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setTitle(e.target.value);
  }

  function keyPressHandler(e: React.KeyboardEvent) {
    if (e.key === "Enter" && title.length !== 0) {
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
        onChange={titleChangeHandler}
        onKeyDown={keyPressHandler}
        ref={textareaEl}
      />
      <div className="cards_column__control_btns">
        <button
          type="button"
          className="btn btn btn-success"
          onClick={() => props.onAddCard(title)}
        >
          Add
        </button>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => props.onClose()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </>
  );
};
