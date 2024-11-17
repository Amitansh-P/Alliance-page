import React, { useState } from "react";
import styled from "styled-components";
import Form from "./components/Form";
import Leaderboard from "./components/Leaderboard";
import "./App.css";

const Header = styled.header`
  background: linear-gradient(90deg, #1abc9c, #3498db);
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 24px;
`;

const App = () => {
  const [suggestions, setSuggestions] = useState([]);

  return (
    <div>
      <Header>AI Community Platform</Header>
      <Form setSuggestions={setSuggestions} />
      <Leaderboard suggestions={suggestions} />
    </div>
  );
};

export default App;
