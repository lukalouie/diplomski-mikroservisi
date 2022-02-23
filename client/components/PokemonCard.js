import Image from 'next/image'
import React from 'react'
import { Card } from 'react-bootstrap'
import Link from "next/link"
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faTags, faBolt, faCodeBranch, faCartPlus, faScrollOld, faMicroscope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from "./PokemonCard.module.css"

library.add(faTags)
library.add(faBolt)
library.add(faCodeBranch)
library.add(faCartPlus)
library.add(faMicroscope)

function PokemonCard(props) {

    const {id, title, image, description, evolution, type, condition, price} = props.card

    console.log(title)

    function getFit() {
        if (condition === "mint") {
            return "lawnGreen"
        } else if (condition === "good") {
            return "yellow"
        } else {
            return "red"
        }
    }

    const colorFit = getFit()

    function getEvolution() {
        if (evolution) {
            return "gold"
        } else {
            return "silver"
        }
    }

    const colorEvo = getEvolution()

    return (
        <>
        {<Link href={`/pokecards/${id}`}>
        <Card className={classes.card}>
            <Card.Title className={classes.title}>{title}</Card.Title>
            <Image src={image} width={215} height={300} />
            <div>
                <ul style={{"textAlign":"left", "listStyleType":"none", "padding":"0", "margin":"0"}}>
                    <li><FontAwesomeIcon icon={["fas", "bolt"]} color={colorEvo}/>&nbsp;{evolution ? "This is an evolution pokemon" : "This is a basic non evolution pokemon"}</li>
                    <li><FontAwesomeIcon icon={["fas", "code-branch"]} style={{"color":"blue"}}/>&nbsp;It is a <u>{type}</u> category pokemon</li>
                    <li><FontAwesomeIcon icon={["fas", "microscope"]} color={colorFit}/>&nbsp;Card is in a {condition} condition</li>
                    <li><FontAwesomeIcon icon={["fas", "tags"]} style={{"color":"green"}}/>&nbsp;<span style={{"color":"green"}}>${price.toString()}</span></li>
                </ul>
            </div>
        </Card>
        </Link> }
        </>
    )
}

export default PokemonCard
