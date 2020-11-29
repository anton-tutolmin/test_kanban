import React from "react";
import "./App.scss";
import { Column } from "../components/column/Column";
import { Popup } from "../components/popup/Popup";

const card = {
  title: "test",
  column: "TODO",
  author: "anton",
  description: "test",
  comments: [],
};

export const App: React.FC = () => {
  return (
    <>
      <div className="container desk">
        <Column title="TODO" />
        <Column title="In progress" />
        <Column title="Testing" />
        <Column title="Done" />
      </div>
      <Popup card={card} />
    </>
  );
};
