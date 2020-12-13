import React from 'react';
import { connect } from 'react-redux';
import { localStorageAgent } from '../../agent/LocalStorageAgent';
import { Column } from './Column';
import { IColumnState, ICard } from '../../types/types';
import { addTodoCard, updateTodoTitle, loadTodo } from '../../store/actions/actions';

interface StateProps {
  todo: IColumnState;
}

interface DispatchProps {
  addTodoCard: (card: ICard) => void;
  updateColumnTitle: (newTitle: string) => void;
}

interface OwnProps {
  username: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const TodoColumn: React.FC<Props> = ({ todo, addTodoCard, updateColumnTitle, username }) => {
  function addCardHandler(card: ICard): void {
    card.author = username;
    card.column = todo.title;
    card.key = 'todo';

    const cards = [...todo.cards, card];

    localStorageAgent.saveTodo({ ...todo, cards });

    addTodoCard(card);
  }

  function updateColumnTitleHandler(title: string): void {
    updateColumnTitle(title);
    localStorageAgent.saveTodo({ ...todo, title });
  }

  return (
    <Column title={todo.title} cards={todo.cards} addCard={addCardHandler} onUpdateTitle={updateColumnTitleHandler} />
  );
};

const mapState = (state: any) => ({
  todo: state.todo,
});

const mapDispatch = {
  addTodoCard: (card: ICard) => addTodoCard(card),
  updateColumnTitle: (newTitle: string) => updateTodoTitle(newTitle),
  loadTodo: (todo: IColumnState) => loadTodo(todo),
};

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(TodoColumn);
