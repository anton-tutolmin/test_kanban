import React, { useEffect } from "react";
import { connect } from "react-redux";
import TodoColumn from "../components/columns/TodoColumn";
import InProgressColumn from "../components/columns/InProgressColumn";
import TestColumn from "../components/columns/TestColumn";
import DoneColumn from "../components/columns/DoneColumn";
import Login from "../components/login/Login";
import Popup from "../components/popup/Popup";
import { Navbar } from "../components/navbar/Navbar";
import { localStorageAgent } from "../agent/LocalStorageAgent";
import "./App.scss";

interface StateProps {
  username: string;
}

interface DispatchProps {
  loadUser: (username: string) => void;
  logout: () => void;
}

type Props = StateProps & DispatchProps;

const App: React.FC<Props> = (props) => {
  useEffect(() => {
    const username = localStorageAgent.loadUsername();
    if (username) {
      props.loadUser(username);
    }
  }, []);

  return (
    <>
      {props.username.length ? (
        <>
          <Navbar logout={props.logout} />
          <div className="container desk">
            <TodoColumn username={props.username} />
            <InProgressColumn username={props.username} />
            <TestColumn username={props.username} />
            <DoneColumn username={props.username} />
            <Popup />
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

const mapState = (state: any) => ({
  username: state.user.username,
});

const mapDispatch = {
  loadUser: (username: string) => ({ type: "LOAD_USER", payload: username }),
  logout: () => ({ type: "LOGOUT" }),
};

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(App);
