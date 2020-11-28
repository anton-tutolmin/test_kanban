import React from "react";
import "./App.scss";
import { Column } from "../components/column/Column";

export const App: React.FC = () => {
  return (
    <div className="container desk">
      <Column title="TODO" />
      <Column title="In progress" />
      <Column title="Testing" />
      <Column title="Done" />
    </div>
  );
};
