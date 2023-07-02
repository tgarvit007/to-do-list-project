import React, { useState } from "react";
import Auth from "./components/Authentication";
import TodoList from "./components/homepage";
import "./App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="App">
      <h1>My Todo List</h1>
      <div className="user-profile">
        {loggedIn && <span>Logged in as: {username}</span>}
        {loggedIn && <button onClick={handleLogout}>Logout</button>}
      </div>
      <div className="auth-container">
        {loggedIn ? (
          <TodoList />
        ) : (
          <Auth onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default App;
