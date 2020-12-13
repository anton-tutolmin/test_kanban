import React from 'react';
import { connect } from 'react-redux';
import { localStorageAgent } from '../../agent/LocalStorageAgent';
import { Column } from './Column';
import { IColumnState, ICard } from '../../types/types';
import { addTestCard, updateTestTitle, loadTest } from '../../store/actions/actions';

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

const TestColumn: React.FC<Props> = ({ test, addTestCard, updateColumnTitle, username }) => {
  function addCardHandler(card: ICard): void {
    card.author = username;
    card.column = test.title;
    card.key = 'test';

    const cards = [...test.cards, card];

    localStorageAgent.saveTest({ ...test, cards });

    addTestCard(card);
  }

  function updateColumnTitleHandler(title: string): void {
    localStorageAgent.saveTest({ ...test, title });
    updateColumnTitle(title);
  }

  return (
    <Column title={test.title} cards={test.cards} addCard={addCardHandler} onUpdateTitle={updateColumnTitleHandler} />
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

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(TestColumn);
