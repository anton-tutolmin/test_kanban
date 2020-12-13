import React from 'react';
import { connect } from 'react-redux';
import { localStorageAgent } from '../../agent/LocalStorageAgent';
import { Column } from './Column';
import { IColumnState, ICard } from '../../types/types';
import { addDoneCard, updateDoneTitle, loadDone } from '../../store/actions/actions';

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

const DoneColumn: React.FC<Props> = ({ done, addDoneCard, updateColumnTitle, loadDone, username }) => {
  function addCardHandler(card: ICard): void {
    card.key = 'done';
    card.column = done.title;
    card.author = username;

    const cards = [...done.cards, card];

    localStorageAgent.saveDone({ ...done, cards });

    addDoneCard(card);
  }

  function updateColumnTitleHandler(title: string): void {
    localStorageAgent.saveDone({ ...done, title });
    updateColumnTitle(title);
  }

  return (
    <Column title={done.title} cards={done.cards} addCard={addCardHandler} onUpdateTitle={updateColumnTitleHandler} />
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

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(DoneColumn);
