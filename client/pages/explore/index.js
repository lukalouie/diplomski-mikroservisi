import React, {useState, useEffect} from 'react'
import classes from "./index.module.css"
import PokemonCard from '../../components/PokemonCard'
import axios from "axios"

const getCards = async () => {
    const cards = await axios.get("/api/cards").then(res => res.data.cards)
    console.log(cards)
    return cards
}

function Explore() {

    const [cards, setCards] = useState([])

    /* const getCards = async () => {
        let i = 0
        await axios.get("/api/cards").then(res => {
            cards = res.data.cards
            cards.map(card => {
                card.id = i
                i++
            })
        })
    } */

    

    useEffect(() => {

        getCards().then(res => {
            const karte = res
            setCards(karte)
        })
        /* console.log("started")
        await getCards()
        console.log(cards.length) */
        console.log(cards)
    }, [])

    return (
        <div className={classes.body}>
            <h2 className={classes.h2}>{(cards && cards.length > 0) ? "EXPLORE" : "No cards found :("}</h2>
            <br/>
            <ul className={classes.grid}>
                {(cards && cards.length > 0) ?
                    cards.map((card) => {
                        return <li key={card._id}>{card.name}</li>
                    }
                    /* <li key={card.id}><PokemonCard card={card}/></li> */
                ) : null}
            </ul>
        </div>
    )
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

export default Explore
