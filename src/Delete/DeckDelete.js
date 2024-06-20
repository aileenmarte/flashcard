import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

function DeckDelete({ deckId }) {
  const navigate = useNavigate();

  function handleDeckDelete() {
    const deleteDeckPrompt = window.confirm("Delete this Deck? You will not be able to recover it.");

    if (deleteDeckPrompt) {
      deleteDeck(deckId)
        .then(() => {
          navigate("/");
          window.location.reload(); //reloads page to show deck deleted
        })
        .catch((error) => {
          console.error("Error deleting deck:", error);
        });
    }
  }

  return (
    <div>
      <button className="btn btn-danger float-right" onClick={handleDeckDelete}>
        Delete
      </button>
    </div>
  );
}

export default DeckDelete;