import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck({
      name,
      description,
    }).then((newDeck) => {
      navigate(`/decks/${newDeck.id}`);
    }).catch((error) => {
      console.error("Error creating deck:", error);
    });
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            placeholder="Deck Name"
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
            placeholder="Brief description of the deck"
            rows="3"
            value={description} 
            onChange={handleDescriptionChange}
            required 
          ></textarea>
        </div>
        <button className="btn btn-secondary mx-1" onClick={() => navigate(`/`)}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mx-1">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;