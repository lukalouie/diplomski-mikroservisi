import React from 'react'
import path from 'path'
import fs from "fs/promises"
import classes from "./index.module.css"
import PokemonCard from '../../components/PokemonCard'

function Explore(props) {
    return (
        <div className={classes.body}>
            <h2 className={classes.h2}>EXPLORE</h2>
            <br/>
            <ul className={classes.grid}>
                {props.cards.map((card) => 
                    <li key={card.id}><PokemonCard card={card}/></li>
                )}
            </ul>
        </div>
    )
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), "data", "cards.json")
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)

    return ( {
        props: {
            cards: data.cards
        }
    })
}

export default Explore
