import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import { Card, Row, Col, Container } from 'react-bootstrap'
import classes from "./faq.module.css"
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

library.add(faPlus)
library.add(faMinus)

function Faq() {
    const [q1, setQ1] = useState(false)
    const [q2, setQ2] = useState(false)
    const [q3, setQ3] = useState(false)
    const [q4, setQ4] = useState(false)
    const [q5, setQ5] = useState(false)

    function clickedFirst() {
        if (q1) {
            setQ1(false)    
        } else {
            setQ1(true)    
        }
    }

    function clickedSecond() {
        if (q2) {
            setQ2(false)    
        } else {
            setQ2(true)    
        }
    }

    function clickedThird() {
        if (q3) {
            setQ3(false)    
        } else {
            setQ3(true)    
        }
    }

    function clickedFourth() {
        if (q4) {
            setQ4(false)    
        } else {
            setQ4(true)    
        }
    }

    function clickedFifth() {
        if (q5) {
            setQ5(false)    
        } else {
            setQ5(true)    
        }
    }

    return (
        <div className={classes.div}>
            <br/>
            <h2>FAQ</h2>
            <br/>
            <br/>
            <Container>
            <Row>
            <Col sm>
            <Card style={{ width: '100vh', "backgroundColor":"white", "color":"black", "border":"2px solid black" }}>
                <Card.Body>
                    <Card.Title>What is f v n r l?</Card.Title>
                    <button type="submit" className={classes.btnfaq} onClick={clickedFirst}><FontAwesomeIcon style={{"color":"black"}} icon={q1 ? ["fas", "minus"] : ["fas", "plus"]}></FontAwesomeIcon></button>
                    <Card.Text style={{display: q1 ? "" : "none"}} >
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <br/>
            <Card style={{ width: '100vh', "backgroundColor":"white", "color":"black", "border":"2px solid black" }}>
                <Card.Body>
                    <Card.Title>What is our return policy?</Card.Title>
                    <button type="submit" className={classes.btnfaq} onClick={clickedSecond}><FontAwesomeIcon style={{"color":"black"}} icon={q2 ? ["fas", "minus"] : ["fas", "plus"]}></FontAwesomeIcon></button>
                    <Card.Text style={{display: q2 ? "" : "none"}} >
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <br/>
            <Card style={{ width: '100vh', "backgroundColor":"white", "color":"black", "border":"2px solid black" }}>
                <Card.Body>
                    <Card.Title>Shipping?</Card.Title>
                    <button type="submit" className={classes.btnfaq} onClick={clickedThird}><FontAwesomeIcon style={{"color":"black"}} icon={q3 ? ["fas", "minus"] : ["fas", "plus"]}></FontAwesomeIcon></button>
                    <Card.Text style={{display: q3 ? "" : "none"}} >
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <br/>
            <Card style={{ width: '100vh', "backgroundColor":"white", "color":"black", "border":"2px solid black" }}>
                <Card.Body>
                    <Card.Title>Can't find product?</Card.Title>
                    <button type="submit" className={classes.btnfaq} onClick={clickedFourth}><FontAwesomeIcon style={{"color":"black"}} icon={q4 ? ["fas", "minus"] : ["fas", "plus"]}></FontAwesomeIcon></button>
                    <Card.Text style={{display: q4 ? "" : "none"}} >
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <br/>
            <Card style={{ width: '100vh', "backgroundColor":"white", "color":"black", "border":"2px solid black" }}>
                <Card.Body>
                    <Card.Title>More Questions?</Card.Title>
                    <button type="submit" className={classes.btnfaq} onClick={clickedFifth}><FontAwesomeIcon style={{"color":"black"}} icon={q5 ? ["fas", "minus"] : ["fas", "plus"]}></FontAwesomeIcon></button>
                    <Card.Text style={{display: q5 ? "" : "none"}} >
                        Got more questions? <a className={classes.linkfaq}  style={{"color":"black"}} href="/contact">Contact us!</a>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <br/>
            </Col>
            <Col sm>
                    <Image src="/images/pika.png" width={223} height={275} alt=""/>
            </Col>
            </Row>
            </Container>
        </div>
    )
}


export default Faq
