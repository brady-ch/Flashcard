import Header from "./Header";
import NotFound from "./NotFound";
import DisplayCards from "./DisplayCards";
import { Switch, Route } from "react-router-dom";
import React, { Fragment } from "react";
import StudyDeck from "./StudyDeck";
import Form from "./Form";
import Deck from "./Deck";

//This creates all the routes for the application
function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DisplayCards />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route path="/decks/new">
            <Form newItem={true} isDeck={true} />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <Form newItem={false} isDeck={true} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <Form newItem={true} isDeck={false} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <Form newItem={false} isDeck={false} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
