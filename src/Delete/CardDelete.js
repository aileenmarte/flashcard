import React from "react";
import { deleteCard } from "../utils/api/index";

function CardDelete({cardId, deckId}) {
  
  //Function invoked when delete button is clicked for specific card ID
  function handleCardDelete() {
    //Display delete message in alert box
    const deleteCardPrompt = window.confirm("Delete this Card? You will not be able to recover it.");

    if (deleteCardPrompt) {
      deleteCard(cardId) 
        .then(window.location.reload()) //reloads pg to show card was deleted
    }
  }
  return (
    <div>
      <button className="btn btn-danger float-right" onClick={handleCardDelete}>
        Delete
      </button>
    </div>
  )
}

export default CardDelete;