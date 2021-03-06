import React, { useState } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../store/actions/actions";
import { localStorageAgent } from "../../agent/LocalStorageAgent";
import "./Login.scss";

interface DispatchProps {
  loadUser: (username: string) => void;
}

const Login: React.FC<DispatchProps> = (props) => {
  const [username, setUsername] = useState<string>("");

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function loginHandler() {
    localStorageAgent.saveUsername(username);
    props.loadUser(username);
  }

  function keyPressHandler(e: React.KeyboardEvent) {
    if (e.key === "Enter" && username.length > 0) {
      props.loadUser(username);
    }
  }

  return (
    <>
      <div className="login__wrapper">
        <div className="login bg-light w-25 p-md-3 rounded">
          <div>Enter your name</div>
          <input
            type="text"
            className="w-100"
            placeholder="Please, enter your name..."
            value={username}
            onChange={changeHandler}
            onKeyDown={keyPressHandler}
          />
          <button
            type="button"
            className="btn btn-success mt-md-1"
            onClick={loginHandler}
          >
            Log in
          </button>
        </div>
      </div>
    </>
  );
};

const mapDispatch = {
  loadUser: (username: string) => loadUser(username),
};

export default connect(null, mapDispatch)(Login);
