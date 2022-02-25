import { React, useContext } from "react"
import { useRouter } from "next/router"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import Image from "next/image"
import { library, icon } from "@fortawesome/fontawesome-svg-core"
import {
  faTags,
  faBolt,
  faCodeBranch,
  faCartPlus,
  faMicroscope,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classes from "./[cardId].module.css"
import CartContext from "../../store/CartContext"
import axios from "axios"

library.add(faTags)
library.add(faBolt)
library.add(faCodeBranch)
library.add(faCartPlus)
library.add(faMicroscope)

function CardDetails(props) {
  const router = useRouter()
  const cartContext = useContext(CartContext)
  const pid = router.query
  const { cardId } = pid

  const card = props.cards.filter((card) => card.id === cardId)[0]


  const handleCartClick = () => {
    cartContext.addCartItem(card)
    console.log(cartContext.cartItems)
    router.push("/cart")
  }

  const { title, image, evolution, description, type, condition, price } = card
  console.log(type)
  return (
    <Container className={classes.container}>
      <h2>{title}</h2>
      <br />
      <Row>
        <Col style={{ textAlign: "center" }}>
          <Image src={image} width={215} height={300} />
          <br />
          <Button
            variant="outline-success"
            style={{ fontSize: "20px" }}
            onClick={handleCartClick}
          >
            Add to Cart <FontAwesomeIcon icon={["fas", "cart-plus"]} />
          </Button>
        </Col>
        <Col>
          <div>
            {description}
            <ul style={{ textAlign: "left" }} className={classes.ul}>
              <li>
                <FontAwesomeIcon
                  icon={["fas", "bolt"]}
                  style={{ marginRight: "2rem" }}
                />
                {evolution
                  ? "This is an evolution pokemon"
                  : "This is a basic non evolution pokemon"}
              </li>
              <li>
                <FontAwesomeIcon
                  icon={["fas", "code-branch"]}
                  style={{ marginRight: "2rem" }}
                />
                It is a <u>{type}</u> category pokemon
              </li>
              <li>
                <FontAwesomeIcon
                  icon={["fas", "microscope"]}
                  style={{ marginRight: "2rem" }}
                />
                Card is in a {condition} condition
              </li>
              <li>
                <FontAwesomeIcon
                  icon={["fas", "tags"]}
                  style={{ marginRight: "2rem" }}
                />
                <span style={{ color: "green" }}>${price}</span>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export async function getStaticProps() {
  try {
    const response = await axios.get("http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/cards")
    console.log(response.data.cards)

    return {
      props: {
        cards: response.data.cards,
      },

      
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getStaticPaths() {
    try { 
    // na kojem portu slusa taj mikroservis? 
    const response = await axios.get("http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/cards");
     
    const ids = response.data.cards.map((c) => c.id)
    const params = ids.map((id) => ({ params: { cardId: id } }))
    console.log(params)
    console.log("prosao sve")

    return {
      paths: params,
      fallback: false
      
    }
  } catch (error) {
    console.log(error)
  }
}

export default CardDetails
