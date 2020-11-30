import React from "react";
import { connect } from "react-redux";
import { localStorageAgent } from "../../agent/LocalStorageAgent";
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
  loadTest: (test: IColumnState) => void;
}

interface OwnProps {
  username: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const TestColumn: React.FC<Props> = (props) => {
  function addCardHandler(title: string) {
    const newCard = {
      id: `${Math.random() + title}`,
      key: "test",
      title,
      author: props.username,
      description: "",
      column: props.test.title,
      comments: [],
    };

    const cards = [...props.test.cards, newCard];

    localStorageAgent.saveTest({ ...props.test, cards });

    props.addTestCard(newCard);
  }

  function updateColumnTitleHandler(title: string) {
    localStorageAgent.saveTest({ ...props.test, title });
    props.updateColumnTitle(title);
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
)(TestColumn);
