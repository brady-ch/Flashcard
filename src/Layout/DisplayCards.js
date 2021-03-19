import React from "react";
import { Link } from "react-router-dom";

import ListDeckItems from "./ListDeckItems";
//This is the main page to display the deck items
function DisplayCards(props) {
  return (
    <div>
      <div>
        <Link to="/decks/new" className="btn btn-secondary m-3">
          Create Deck
        </Link>
      </div>
      <div className="container">
        <ListDeckItems />
      </div>
    </div>
  );
}

export default DisplayCards;
