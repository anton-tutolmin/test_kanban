import React from "react";
import { connect } from "react-redux";
import { localStorageAgent } from "../../agent/LocalStorageAgent";
import { Column } from "./Column";
import { IColumnState, ICard } from "../../types/types";
import {
  addTodoCard,
  updateTodoTitle,
  loadTodo,
} from "../../store/actions/actions";

interface StateProps {
  todo: IColumnState;
}

interface DispatchProps {
  addTodoCard: (card: ICard) => void;
  updateColumnTitle: (newTitle: string) => void;
  loadTodo: (todoData: IColumnState) => void;
}

interface OwnProps {
  username: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const TodoColumn: React.FC<Props> = (props) => {
  function addCardHandler(title: string): void {
    const newCard = {
      id: `${Math.random() + title}`,
      key: "todo",
      title,
      author: props.username,
      description: "",
      column: props.todo.title,
      comments: [],
    };

    const cards = [...props.todo.cards, newCard];

    localStorageAgent.saveTodo({ ...props.todo, cards });

    props.addTodoCard(newCard);
  }

  function updateColumnTitleHandler(title: string): void {
    localStorageAgent.saveTodo({ ...props.todo, title });
    props.updateColumnTitle(title);
  }

  return (
    <Column
      title={props.todo.title}
      cards={props.todo.cards}
      onAddCard={addCardHandler}
      onUpdateTitle={updateColumnTitleHandler}
    />
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

export default connect<StateProps, DispatchProps>(
  mapState,
  mapDispatch
)(TodoColumn);
