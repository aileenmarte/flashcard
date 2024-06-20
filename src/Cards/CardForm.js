import React from "react";
import { useNavigate } from "react-router-dom";

function CardForm({ front, back, setFront, setBack, handleSubmit, deck }) {
  const navigate = useNavigate();

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          id="front"
          rows="3"
          placeholder="Front side of card"
          required
          onChange={handleFrontChange}
          value={front}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          className="form-control"
          id="back"
          rows="3"
          placeholder="Back side of card"
          required
          onChange={handleBackChange}
          value={back}
        ></textarea>
      </div>
      <button
        type="button"
        className="btn btn-secondary mx-1"
        onClick={() => navigate(`/decks/${deck.id}`)}
      >
        Done
      </button>
      <button type="submit" className="btn btn-primary mx-1">
        Save
      </button>
    </form>
  );
}

export default CardForm;