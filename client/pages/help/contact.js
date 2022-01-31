import React from 'react'
import { Card, Image } from 'react-bootstrap'
import classes from "./contact.module.css"
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faPhone)
library.add(faEnvelopeSquare)

function ContactPage() {
    return (
        <div className={classes.div}>
            <Card className={classes.card}>
                <Card.Title style={{"fontSize":"30px", "fontWeight":"bolder"}}>Contact Us</Card.Title>
                <Card.Text>
                    For any more information contact us via:
                    <ul style={{"listStyleType":"none"}}>
                        <li>
                            <FontAwesomeIcon icon={["fas", "phone"]} style={{"color":"blue", "marginRight":"1rem"}} /> phone: <span style={{"fontWeight":"bolder"}}>098/4206-988</span>
                        </li>
                        <li>
                            or
                        </li>
                        <li>
                        <FontAwesomeIcon icon={["fas", "envelope-square"]} style={{"color":"red", "marginRight":"1rem"}} /> email: <span style={{"fontWeight":"bolder"}}>contact@pokeballz.org</span>
                        </li>
                    </ul>
                </Card.Text>
            </Card>
            <Image width={450} height={350} src="/images/group.png" />
        </div>
    )
}

export default ContactPage
