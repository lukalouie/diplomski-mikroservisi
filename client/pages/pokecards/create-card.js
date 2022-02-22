import React, { useState } from "react"
import { Button } from "react-bootstrap"
import axios from "axios"
import classes from "./create-card.module.css"
import PopUp from "../../components/Warning"
import {useRouter} from "next/router"

function CreateCard() {

  const router = useRouter()

  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [price, setPrice] = useState(0)
  const [evolution, setEvolution] = useState(false)
  const [condition, setCondition] = useState("good")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState(null)

  const handleEvo = () => {
    if(evolution) {
        setEvolution(false)
    } else {
        setEvolution(true)
    }
  }


  const onSubmit = async event => {
    event.preventDefault()

    let era = null
    await axios.post("/api/cards/create", {title: title, type: type,price: price, evolution: evolution, condition: condition, image: image, description: description})
    .catch(error => {setError(error.response.data.error)
        era = error.response.data.error
    })
      if (era === null) {
        console.log(error)
        router.push("/pokecards/create-landing")
      }
      era = null

  }

  return (
    <div className={classes.div}>
      <h2>Add a card?</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
        <label>Evolution&nbsp;&nbsp;&nbsp;</label>  
          <input 
            type="checkbox" 
            label="Evolution"
            onChange={() => handleEvo()} 
          />
        </div>
        <br/>
        <div className="form-group" style={{"margin-left": "35vh", "margin-right":"35vh", "border":"2px solid grey", "border-radius":"5px"}}>
            Condition<br/>
            <input 
                type="radio" 
                id="mint" 
                name="condition" 
                value="mint"
                onClick={(e) => setCondition(e.target.value)}
            />
           <label for="mint">Mint</label><br/>
           <input 
                type="radio" 
                id="good" 
                name="condition" 
                value="good"
                onClick={(e) => setCondition(e.target.value)}
            />
           <label for="good">Good</label><br/>
           <input 
                type="radio" 
                id="bad" 
                name="condition" 
                value="bad"
                onClick={(e) => setCondition(e.target.value)}
            />
           <label for="bad">Bad</label>
        </div>
        <br/>
        <div className="form-group">
          <label>Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>
        <br />
        {error ? <PopUp message={error} /> : null}
        <Button type="submit" variant="outline-info">
          Add Card
        </Button>
      </form>
    </div>
  )
}

export default CreateCard
