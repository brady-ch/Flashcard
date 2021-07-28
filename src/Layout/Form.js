import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import FormBreadcrumb from "./FormBreadcrumb";
import {
  readDeck,
  readCard,
  updateCard,
  updateDeck,
  createCard,
  createDeck,
} from "../utils/api";
// This component makes every input form needed for this app
export default function Form(props) {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const { newItem, isDeck } = props;
  const [deck, setDeck] = useState({ cards: [] });
  const [card, setCard] = useState({});
  const [inputsFromForm, setInputsFromForm] = useState({});
  const [formNames, setFormNames] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    if (deckId) {
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
    }
    if (cardId) {
      try {
        readCard(cardId, abortController.signal).then((element) => {
          setCard(element);
        });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", card);
        } else {
          throw error;
        }
      }
    }
  }, []);

  useEffect(() => {
    isDeck
      ? newItem
        ? setFormNames({
            titleNewOrEdit: "Create",
            labelFirst: "Name",
            labelSecond: "Description",
            titleCardOrDeck: "Deck",
          })
        : setFormNames({
            titleNewOrEdit: "Edit",
            labelFirst: "Name",
            labelSecond: "Description",
            titleCardOrDeck: "Deck",
          })
      : newItem
      ? setFormNames({
          titleNewOrEdit: "New",
          labelFirst: "Front",
          labelSecond: "Back",
          titleCardOrDeck: "Card",
        })
      : setFormNames({
          titleNewOrEdit: "Edit",
          labelFirst: "Front",
          labelSecond: "Back",
          titleCardOrDeck: "Card",
        });
  }, [isDeck, !newItem]);

  useEffect(() => {
    if (isDeck && !newItem)
      setInputsFromForm({
        firstInput: deck.name,
        secondInput: deck.description,
      });
    if (!isDeck && !newItem)
      setInputsFromForm({ firstInput: card.front, secondInput: card.back });
  }, [deck, card]);

  function submitHandler(event) {
    event.preventDefault();
    if (newItem && isDeck) {
      createDeck({
        name: inputsFromForm.firstInput,
        description: inputsFromForm.secondInput,
      });
      history.push(`/`);
    } else if (!newItem && isDeck) {
      updateDeck({
        name: inputsFromForm.firstInput,
        description: inputsFromForm.secondInput,
        id: deckId,
      });
      history.push(`/decks/${deckId}`);
    } else if (newItem && !isDeck) {
      createCard(deckId, {
        front: inputsFromForm.firstInput,
        back: inputsFromForm.secondInput,
      });
      history.go(0);
    } else {
      updateCard({
        ...card,
        front: inputsFromForm.firstInput,
        back: inputsFromForm.secondInput,
      });
      history.push(`/decks/${deckId}`);
    }
  }

  function textAreaOrNot(whatIsIt, formNames) {
    if (whatIsIt) {
      return (
        <div className="form-group">
          <label for="deckName">{formNames.labelFirst}</label>
          <input
            placeholder="Deck Name"
            className="form-control"
            type="text"
            id="deckName"
            value={inputsFromForm.firstInput}
            onChange={(event) =>
              setInputsFromForm({
                ...inputsFromForm,
                firstInput: event.target.value,
              })
            }
          ></input>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <label for="firstTextArea">{formNames.labelFirst}</label>
          <textarea
            className="form-control"
            id="firstTextArea"
            placeholder="Front side of card"
            value={inputsFromForm.firstInput}
            onChange={(event) =>
              setInputsFromForm({
                ...inputsFromForm,
                firstInput: event.target.value,
              })
            }
          ></textarea>
        </div>
      );
    }
  }

  return (
    <section className="container">
      <FormBreadcrumb
        newItem={newItem}
        isDeck={isDeck}
        deckId={deckId}
        cardId={cardId}
        deck={deck}
      />
      <h1>{`${formNames.titleNewOrEdit} ${formNames.titleCardOrDeck}`}</h1>
      <form>
        {textAreaOrNot(isDeck, formNames)}
        <div className="form-group">
          <label for="secondTextArea">{formNames.labelSecond}</label>
          <textarea
            className="form-control"
            id="secondTextArea"
            placeholder={isDeck ? "Description of deck" : "Back side of card"}
            value={inputsFromForm.secondInput}
            onChange={(event) =>
              setInputsFromForm({
                ...inputsFromForm,
                secondInput: event.target.value,
              })
            }
          ></textarea>
        </div>
        <div>
          <button
            className="btn btn-secondary"
            onClick={() =>
              isDeck ? history.push("/") : history.push(`/decks/${deckId}`)
            }
          >
            {newItem ? "Done" : "Cancel"}
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={(event) => submitHandler(event)}
            type="submit"
          >
            {newItem ? "Save" : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
