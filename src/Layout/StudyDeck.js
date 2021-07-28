import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

// Creates the study deck component
export default function StudyDeck() {
  const { deckId } = useParams();
  const [flip, setFlip] = useState(true);
  const [index, setIndex] = useState(0);
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    const abortController = new AbortController();
    try {
      readDeck(deckId, abortController.signal).then((element) => {
        setDeck(element);
      });
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted", deck);
      } else {
        throw error;
      }
    }
  }, [deckId]);

  return (
    <section className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {" "}
            Study
          </li>
        </ol>
      </nav>
      <h1>{`${deck.name}: Study`}</h1>
      {deck.cards.length < 3 ? (
        <div>
          <h2>Not enough cards.</h2>
          <p>{`You need at least 3 cards to study. There are ${deck.cards.length} in this deck.`}</p>
          <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>
            Add Cards
          </Link>
        </div>
      ) : flip ? (
        <div className="card" key={index}>
          <div className="card-body">
            <h5 className="card-title">
              Card {`${index + 1} of ${deck.cards.length}`}
            </h5>
            <p className="card-text">{deck.cards[index].front}</p>
            <button
              className="btn btn-secondary"
              onClick={() => setFlip(!flip)}
            >
              Flip
            </button>
          </div>
        </div>
      ) : (
        <div className="card" key={index}>
          <div className="card-body">
            <h5 className="card-title">
              Card {`${index + 1} of ${deck.cards.length}`}
            </h5>
            <p className="card-text">{deck.cards[index].back}</p>
            <button
              className="btn btn-secondary"
              onClick={() => setFlip(!flip)}
            >
              Flip
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (index + 1 === deck.cards.length) {
                  if (window.confirm("Restart cards?")) {
                    setIndex(0);
                  }
                } else {
                  setIndex(index + 1);
                  setFlip(true);
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
