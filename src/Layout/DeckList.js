import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api";
import { useNavigate } from "react-router-dom";
import DeckDelete from "../Delete/DeckDelete";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const deckAbort = new AbortController();

    async function deckList() {
      try {
        const list = await listDecks(deckAbort.signal);
        console.log("list is ", list);
        setDecks(list);
      } catch (error) {
        console.log("error creating deck list");
      }
    }

    deckList();

    return () => {
      deckAbort.abort();
    };
  }, []);

  const printList = decks.map((deck) => {
    return (
      <div className="card mb-3" key={deck.id}>
        <div className="card-body">
          <h5 className="card-title">
            {deck.name}
            <p className="card-text">
              <small className="text-muted float-right">{deck.cards.length} cards</small>
            </p>
          </h5>
          <br />
          <p className="card-text">{deck.description}</p>
          <button type="button" className="btn btn-secondary mx-2" onClick={() => navigate(`/decks/${deck.id}`)}>View</button>
          <button type="button" className="btn btn-primary" onClick={() => navigate(`/decks/${deck.id}/study`)}>Study</button>
          <DeckDelete deckId={deck.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="decks">
      {printList}
    </div>
  );
}

export default DeckList;