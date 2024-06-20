import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();

  // pulls correct deck in order to add cards
  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeckAndCards() {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        const cardData = await readCard(cardId, abortController.signal);
        setDeck(deckData);
        setCard(cardData);
      } catch (error) {
        console.log("error creating deck list");
      }
    }

    loadDeckAndCards();

    return () => {
      abortController.abort();
    };
  }, [deckId, cardId]);

  // when form is saved, card will be added to deck and user can add new cards
  const submitHandler = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    await updateCard(card, abortController.signal);
    navigate(`/decks/${deckId}`);
  };

  const onChangeHandler = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
        </ol>
      </nav>
      <h1>EditCard</h1>
      <div className="card-info">
        <CardForm 
          front={card.front}
          back={card.back}
          deck={deck}
          handleSubmit={submitHandler}
          handleChange={onChangeHandler}
        />
      </div>
    </div>
  );
}

export default EditCard;