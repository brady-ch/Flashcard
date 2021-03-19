import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";
// This is the component that is used by DisplayCards to list the deck items
export default function ListDeckItems(props) {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();

    try {
      listDecks(abortController.signal).then((elements) => setDecks(elements));
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted", decks);
      } else {
        throw error;
      }
    }
  });

  return (
    <section>
      {decks.map((deck, index) => {
        return (
          <div key={index} className="card my-3">
            <div className="card-body">
              <h5 className="card-title">
                {deck.name}
                <span className="float-right">{`${deck.cards.length} cards`}</span>{" "}
              </h5>
              <p className="card-text">{deck.description}</p>
              <div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                  View
                </Link>
                <Link
                  to={`/decks/${deck.id}/study`}
                  className="btn btn-primary mx-2"
                >
                  Study
                </Link>
                <span className="float-right">
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      window.confirm("Confirm Delete?")
                        ? deleteDeck(deck.id)
                        : null
                    }
                  >
                    Delete
                  </button>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
