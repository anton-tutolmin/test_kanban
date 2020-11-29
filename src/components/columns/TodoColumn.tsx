import React, { useEffect } from "react";
import { connect } from "react-redux";
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
  function addCardHandler(title: string) {
    props.addTodoCard({
      id: `${Math.random() + title}`,
      title,
      author: props.username,
      description: "",
      column: "todo",
      comments: [],
    });
  }

  function updateColumnTitleHandler(newTitle: string) {
    props.updateColumnTitle(newTitle);
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
