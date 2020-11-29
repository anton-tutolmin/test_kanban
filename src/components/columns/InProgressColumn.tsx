import React from "react";
import { connect } from "react-redux";
import { Column } from "./Column";
import { IColumnState, ICard } from "../../types/types";

interface StateProps {
  inProgress: IColumnState;
}

interface DispatchProps {
  addInProgressCard: (card: ICard) => void;
  updateColumnTitle: (newTitle: string) => void;
}

interface OwnProps {
  username: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const TodoColumn: React.FC<Props> = (props) => {
  function addCardHandler(title: string) {
    props.addInProgressCard({
      id: `${Math.random() + title}`,
      title,
      author: props.username,
      description: "",
      column: "in progress",
      comments: [],
    });
  }

  function updateColumnTitleHandler(newTitle: string) {
    props.updateColumnTitle(newTitle);
  }

  return (
    <Column
      title={props.inProgress.title}
      cards={props.inProgress.cards}
      onAddCard={addCardHandler}
      onUpdateTitle={updateColumnTitleHandler}
    />
  );
};

const mapState = (state: any) => ({
  inProgress: state.inProgress,
});

const mapDispatch = {
  addInProgressCard: (card: ICard) => ({
    type: "ADD_INPROGRESS_CARD",
    payload: card,
  }),
  updateColumnTitle: (newTitle: string) => ({
    type: "UPDATE_INPROGRESS_TITLE",
    payload: newTitle,
  }),
};

export default connect<StateProps, DispatchProps>(
  mapState,
  mapDispatch
)(TodoColumn);
