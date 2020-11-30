import React, { useEffect } from "react";
import { connect } from "react-redux";
import { localStorageAgent } from "../../agent/LocalStorageAgent";
import { Column } from "./Column";
import { IColumnState, ICard } from "../../types/types";
import {
  addDoneCard,
  updateDoneTitle,
  loadDone,
} from "../../store/actions/actions";

interface StateProps {
  done: IColumnState;
}

interface DispatchProps {
  addDoneCard: (card: ICard) => void;
  updateColumnTitle: (newTitle: string) => void;
  loadDone: (done: IColumnState) => void;
}

interface OwnProps {
  username: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const DoneColumn: React.FC<Props> = (props) => {
  useEffect(() => {
    const done = localStorageAgent.loadDone();

    if (done) {
      props.loadDone(done);
    }
  }, []);

  function addCardHandler(title: string) {
    const newCard = {
      id: `${Math.random() + title}`,
      key: "done",
      title,
      author: props.username,
      description: "",
      column: props.done.title,
      comments: [],
    };

    const cards = [...props.done.cards, newCard];

    localStorageAgent.saveDone({ ...props.done, cards });

    props.addDoneCard(newCard);
  }

  function updateColumnTitleHandler(title: string) {
    localStorageAgent.saveDone({ ...props.done, title });
    props.updateColumnTitle(title);
  }

  return (
    <Column
      title={props.done.title}
      cards={props.done.cards}
      onAddCard={addCardHandler}
      onUpdateTitle={updateColumnTitleHandler}
    />
  );
};

const mapState = (state: any) => ({
  done: state.done,
});

const mapDispatch = {
  addDoneCard: (card: ICard) => addDoneCard(card),
  updateColumnTitle: (newTitle: string) => updateDoneTitle(newTitle),
  loadDone: (done: IColumnState) => loadDone(done),
};

export default connect<StateProps, DispatchProps>(
  mapState,
  mapDispatch
)(DoneColumn);
