import React from "react";
import { connect } from "react-redux";
import { Column } from "./Column";
import { IColumnState, ICard } from "../../types/types";

interface StateProps {
  done: IColumnState;
}

interface DispatchProps {
  addDoneCard: (card: ICard) => void;
  updateColumnTitle: (newTitle: string) => void;
}

interface OwnProps {
  username: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const TodoColumn: React.FC<Props> = (props) => {
  function addCardHandler(title: string) {
    props.addDoneCard({
      id: `${Math.random() + title}`,
      title,
      author: props.username,
      description: "",
      column: "done",
      comments: [],
    });
  }

  function updateColumnTitleHandler(newTitle: string) {
    props.updateColumnTitle(newTitle);
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
  addDoneCard: (card: ICard) => ({ type: "ADD_DONE_CARD", payload: card }),
  updateColumnTitle: (newTitle: string) => ({
    type: "UPDATE_DONE_TITLE",
    payload: newTitle,
  }),
};

export default connect<StateProps, DispatchProps>(
  mapState,
  mapDispatch
)(TodoColumn);
