import React, { useState, useEffect } from "react";
import classes from "./index.module.css";
import PokemonCard from "../../components/PokemonCard";
import axios from "axios";

const getCards = async () => {
  const response = await axios.get("/api/cards");
  return response.data.cards;
};

function Explore() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getCards().then((res) => {
      const karte = res;
      setCards(karte);
    });
  }, []);

  console.log(`vanSWAGa - ${cards}`);
  console.log(`array - ${cards2}`);
  return (
    <div className={classes.body}>
      <h2 className={classes.h2}>{(cards && cards.length>0) ? "EXPLORE" : "No cards found :("}</h2>
      <br />
      <ul className={classes.grid}>
        {cards.map((card) => (
          <li key={card.id}>
            <PokemonCard card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* export async function getStaticProps() {
    const filePath = path.join(process.cwd(), "data", "cards.json")
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)

    return ( {
        props: {
            cards: data.cards
        }
    })
} */

export default Explore;
