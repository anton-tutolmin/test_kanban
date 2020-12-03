import React from "react";
import { connect } from "react-redux";
import { localStorageAgent } from "../../agent/LocalStorageAgent";
import { Column } from "./Column";
import { IColumnState, ICard } from "../../types/types";
import {
  addInProgressCard,
  updateInProgressTitle,
  loadInProgress,
} from "../../store/actions/actions";

interface StateProps {
  inProgress: IColumnState;
}

interface DispatchProps {
  addInProgressCard: (card: ICard) => void;
  updateColumnTitle: (newTitle: string) => void;
  loadInProgress: (inProgress: IColumnState) => void;
}

interface OwnProps {
  username: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const InProgressColumn: React.FC<Props> = (props) => {
  function addCardHandler(title: string): void {
    const newCard = {
      id: `${Math.random() + title}`,
      key: "inProgress",
      title,
      author: props.username,
      description: "",
      column: props.inProgress.title,
      comments: [],
    };

    const cards = [...props.inProgress.cards, newCard];

    localStorageAgent.saveInProgress({ ...props.inProgress, cards });

    props.addInProgressCard(newCard);
  }

  function updateColumnTitleHandler(title: string): void {
    localStorageAgent.saveInProgress({ ...props.inProgress, title });
    props.updateColumnTitle(title);
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
  addInProgressCard: (card: ICard) => addInProgressCard(card),
  updateColumnTitle: (newTitle: string) => updateInProgressTitle(newTitle),
  loadInProgress: (inProgress: IColumnState) => loadInProgress(inProgress),
};

export default connect<StateProps, DispatchProps>(
  mapState,
  mapDispatch
)(InProgressColumn);
