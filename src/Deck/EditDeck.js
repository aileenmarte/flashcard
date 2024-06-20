import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setDeck(deckData);
        setName(deckData.name);
        setDescription(deckData.description);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck({
      ...deck,
      name,
      description,
    }).then((updatedDeck) => {
      navigate(`/decks/${updatedDeck.id}`);
    }).catch((error) => {
      console.error("Error updating deck:", error);
    });
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-secondary mb-2 mx-1"
          onClick={() => navigate(`/decks/${deck.id}`)}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mb-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;