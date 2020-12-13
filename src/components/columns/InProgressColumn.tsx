import React from 'react';
import { connect } from 'react-redux';
import { localStorageAgent } from '../../agent/LocalStorageAgent';
import { Column } from './Column';
import { IColumnState, ICard } from '../../types/types';
import { addInProgressCard, updateInProgressTitle, loadInProgress } from '../../store/actions/actions';

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

const InProgressColumn: React.FC<Props> = ({ inProgress, addInProgressCard, updateColumnTitle, username }) => {
  function addCardHandler(card: ICard): void {
    card.key = 'inProgress';
    card.column = inProgress.title;
    card.author = username;

    const cards = [...inProgress.cards, card];

    localStorageAgent.saveInProgress({ ...inProgress, cards });

    addInProgressCard(card);
  }

  function updateColumnTitleHandler(title: string): void {
    localStorageAgent.saveInProgress({ ...inProgress, title });
    updateColumnTitle(title);
  }

  return (
    <Column
      title={inProgress.title}
      cards={inProgress.cards}
      addCard={addCardHandler}
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

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(InProgressColumn);
