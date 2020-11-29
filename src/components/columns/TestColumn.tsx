import React from "react";
import { connect } from "react-redux";
import { Column } from "./Column";
import { IColumnState, ICard } from "../../types/types";
import {
  addTestCard,
  updateTestTitle,
  loadTest,
} from "../../store/actions/actions";

interface StateProps {
  test: IColumnState;
}

interface DispatchProps {
  addTestCard: (card: ICard) => void;
  updateColumnTitle: (newTitle: string) => void;
}

interface OwnProps {
  username: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const TodoColumn: React.FC<Props> = (props) => {
  function addCardHandler(title: string) {
    props.addTestCard({
      id: `${Math.random() + title}`,
      title,
      author: props.username,
      description: "",
      column: "test",
      comments: [],
    });
  }

  function updateColumnTitleHandler(newTitle: string) {
    props.updateColumnTitle(newTitle);
  }

  return (
    <Column
      title={props.test.title}
      cards={props.test.cards}
      onAddCard={addCardHandler}
      onUpdateTitle={updateColumnTitleHandler}
    />
  );
};

const mapState = (state: any) => ({
  test: state.test,
});

const mapDispatch = {
  addTestCard: (card: ICard) => addTestCard(card),
  updateColumnTitle: (newTitle: string) => updateTestTitle(newTitle),
  loadTest: (test: IColumnState) => loadTest(test),
};

export default connect<StateProps, DispatchProps>(
  mapState,
  mapDispatch
)(TodoColumn);
