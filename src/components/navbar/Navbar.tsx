import React from "react";

interface NavparProps {
  logout(): void;
}

export const Navbar: React.FC<NavparProps> = (props) => {
  function logout() {
    localStorage.removeItem("username");
    props.logout();
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand">KANvaBANga</a>
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="button"
        onClick={logout}
      >
        Log out
      </button>
    </nav>
  );
};
