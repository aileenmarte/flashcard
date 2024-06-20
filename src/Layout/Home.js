import React from "react";
import DeckList from "./DeckList";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <button 
        type="button" 
        className="btn btn-secondary my-2" 
        onClick={() => {
          navigate("/decks/new");
        }}
      >
        + Create Deck
      </button>
      <br />
      <DeckList />
    </div>
  );
}

export default Home;
