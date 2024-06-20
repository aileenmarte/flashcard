import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const [deck, setDeck] = useState([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { deckId } = useParams();

  // pulls the correct deck in order to add cards
  useEffect(() => {
    const deckAbort = new AbortController();

    async function loadDeck() {
      try {
        const pullDeck = await readDeck(deckId, deckAbort.signal);
        setDeck(pullDeck);
      } catch (error) {
        console.log("error creating deck list");
      }
    }

    loadDeck();

    return () => {
      deckAbort.abort();
    };
  }, [deckId]);

  // when the form is saved, the card will be added to the deck and the user will be able to add new cards
  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(deckId, {
      front: front,
      back: back,
    });
    setFront("");
    setBack("");
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home mx-1"></span>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>
      <h3>{deck.name}: Add Card</h3>
      <div className="card-info">
        <CardForm 
          front={front} 
          back={back} 
          deck={deck}
          setFront={setFront} 
          setBack={setBack} 
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default AddCard;