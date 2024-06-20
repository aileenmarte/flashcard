import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CardList({ cards }) {
  const initialState = {
    index: 0,
    text: "",
    length: 0,
    next: false,
    isFront: true,
  };

  const [cardInfo, setCardInfo] = useState({
    ...initialState,
    length: cards.length,
    text: cards[0].front,
  });

  const navigate = useNavigate();

  // flip handler
  const flipHandler = () => {
    setCardInfo({
      ...cardInfo,
      text: cards[cardInfo.index].back,
      isFront: false,
      next: true,
    });
  };

  const nextCard = () => {
    if (cardInfo.index === cardInfo.length - 1) {
      if (window.confirm(`Restart cards?\n\nClick 'cancel' to return to the home page`)) {
        setCardInfo({
          ...initialState,
          length: cards.length,
          text: cards[0].front,
        });
      } else {
        navigate("/");
      }
    } else {
      setCardInfo({
        ...cardInfo,
        index: cardInfo.index + 1,
        isFront: true,
        next: false,
        text: cards[cardInfo.index].front,
      });
    }
  };

  return (
    <div>
      <h1>CardList</h1>
      <div className="card w-75">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardInfo.index + 1} of {cardInfo.length}
          </h5>
          <p className="card-text">{cardInfo.text}</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={flipHandler}
          >
            Flip
          </button>
          {cardInfo.next && (
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={nextCard}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardList;